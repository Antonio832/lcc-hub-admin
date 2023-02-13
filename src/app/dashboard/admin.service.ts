import { P } from '@angular/cdk/keycodes';
import { Injectable } from '@angular/core';
import { Firestore, collection, orderBy, limit, query, getDocs, startAt, deleteDoc, addDoc, updateDoc } from '@angular/fire/firestore';
import { getBlob, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { doc, setDoc, Timestamp, getDoc, getCountFromServer } from '@firebase/firestore';
import { getStorage } from '@firebase/storage';
import { getApp } from 'firebase/app';

interface _Link{
  url: string,
  date: Date,
  titulo: string
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // Inyeccion del proveedor de la base de datos
  constructor(private db: Firestore) { }

  uid: string = ''
  userInfo: any

  async uploadPhoto(photo: File){
    const storage = getStorage()
    const imgRef = ref(storage, photo.name)
    return await uploadBytes(imgRef, photo)
  }

  aggImgGaleria(photo: File){
    const storage = getStorage()
    const imgRef = ref(storage, photo.name)
    uploadBytes(imgRef, photo).then(async res=>{
      const url = await getDownloadURL(imgRef)

      const formatedPhoto = {
        imgSrc: url,
        uid: this.uid,
        date: Timestamp.fromDate(new Date()),
        visible: true,
      }
    })
  }

  //Perfiles
  async getUserProfile(uid: string){
    this.uid = uid
    const docRef = doc(this.db,"users", uid)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
      this.userInfo = docSnap.data()
      return this.userInfo
    }else{
      return null;
    }
  }

  async isAdmin(uid: string){
    const docRef = doc(this.db,'admins', uid)
    const res = await getDoc(docRef)
    if(res.exists()){
      
      return true
    }
    return false
  }

  // Agrega un arreglo de materias a la base de datos en 
  // la coleccion "subjects"
  aggMaterias(materias: any[]){
    // Por cada una de las materias
    for(let materia of materias){
      // Agregando a la base de datos
      // Le pasamos la instancia, despues la coleccion y opcionalmente el id del nuevo documento
      // despues le pasamos la informacion
      setDoc(doc(this.db,"subjects", materia.key),materia)
    }
  }

  // Obtiene todas las materias de 10 en 10
  getMaterias(){
    return getDocs(query(collection(this.db,"subjects"),orderBy("subjectName", "asc"), limit(10)))
  }

  async buscaMateria(numMat: string){
    console.log(numMat)
    const docRef = doc(this.db, 'subjects', numMat)
    const res = await getDoc(docRef)
    return res
  }
  
  aggAlumnos(alumnos: any[]){
    for(let alumn of alumnos){
      setDoc(doc(this.db,"students", alumn.studentID),alumn)
    }
  }

  async buscaAlumno(exp: string){
    const docRef = doc(this.db, 'students', exp)
    const res = await getDoc(docRef)
    return res
  }

  // VIDEOS
  async aggVideo(link: _Link){
    const formatedLink = {...link, date: Timestamp.fromDate(link.date), uid: this.uid}
    return await setDoc(doc(this.db,"videos", formatedLink.url), formatedLink)
  }

  getVideos(){
    return query(collection(this.db,"videos"),orderBy("date", "asc"))
  }

  deleteVid(ref: string){
    return deleteDoc(doc(this.db,"videos",ref))
  }

  // ARTICULOS 
  getArticulos(){
    return query(collection(this.db,"articulos"),orderBy("date", "asc"))
  }
  
  deleteDocCol(col: string, docRef: string){
    return deleteDoc(doc(this.db,col,docRef))
  }

  updateField(collection: string, docRef: string, field: string, value: string){
    return updateDoc(doc(this.db, collection, docRef),{[field]: value})
  }

  // ANUNCIOS
  async aggAnuncioArticulo(anuncio: any, coll: string){
    return await this.uploadPhoto(anuncio.imgSrc).then(async res=>{
      
      const storage = getStorage()
      const imgRef = ref(storage, anuncio.imgSrc.name)
      
      const url: string = await getDownloadURL(imgRef)

      const formatedAnun = {
        ...anuncio, 
        date: Timestamp.fromDate(new Date()), 
        imgSrc: url,
        uid: this.uid
      }
      return addDoc(collection(this.db,coll),formatedAnun)

    })
  }

  getAnuncios(){
    return query(collection(this.db,"anuncios",), orderBy("date", "asc"))
  }
}
