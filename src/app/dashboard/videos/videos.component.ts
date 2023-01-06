import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  link: string = ''

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }

  aggLink(){
    let givenURL
    try {
        givenURL = new URL (this.link);
    } catch (error) {
        console.log ("error is", error);
       return console.log('no fue valido carnal'); 
    }
    return this.adminService.aggVideo({url: this.link, date: new Date()});
  }

}
