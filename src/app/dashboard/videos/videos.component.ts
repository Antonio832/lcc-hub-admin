import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { onSnapshot } from '@firebase/firestore';
import { AdminService } from '../admin.service';

@Component({
  selector: 'videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  link: string = ''
  titulo: string = ''

  safeVideos: any[] = []

  constructor(private adminService: AdminService, public sanitizer: DomSanitizer) { }

  unsubscribe: any = undefined

  ngOnInit(): void {
    this.unsubscribe = onSnapshot(this.adminService.getVideos(), (snap)=>{
      let auxArr: any[] = []
      snap.forEach(doc=>{
        auxArr.push(doc.data())
      })
      this.safeVideos = auxArr.map((video,index)=>{
        let untrustedUrl = 'https://www.youtube.com/embed/' + video.url
        return {...video, url: this.sanitizer.bypassSecurityTrustResourceUrl(untrustedUrl), code: video.url}
      })
    })
  }

  aggVid(){
    if(!this.link || !this.titulo) return 

    let givenURL
    
    try {
      givenURL = new URL (this.link);
    } catch (error) {
      console.log ("error is", error);
      this.link = ''
      return console.log('no fue un URL valido'); 
    }

    const splitUrl = this.link.split('www.')
    const doubleSplit = splitUrl[1].split('.')

    if(doubleSplit[0] != 'youtube') return 

    const videoCode = doubleSplit[1].split('=')[1]

    this.link = ''

    return this.adminService.aggVideo({
      url: videoCode, 
      date: new Date(), 
      titulo: this.titulo
    });
  }

  deleteVid(code: string){
    return this.adminService.deleteVid(code)
  }

}
