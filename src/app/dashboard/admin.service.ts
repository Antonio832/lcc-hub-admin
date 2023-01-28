import { Injectable } from '@angular/core';
import { Firestore, collection, orderBy, limit, query, getDocs, startAt, deleteDoc, addDoc } from '@angular/fire/firestore';
import { doc, setDoc, Timestamp, getDoc, getCountFromServer } from '@firebase/firestore';

interface _Link{
  url: string,
  date: Date
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // Inyeccion del proveedor de la base de datos
  constructor(private db: Firestore) { }

  // const collectionQuery = collection(this.db, "subjects")

  // const snap = getCountFromServer(collectionQuery)

  // return console.log((await snap).data().count)

  //Perfiles
  async getUserProfile(uid: string){

    const docRef = doc(this.db,"profiles", uid)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
      return docSnap.data()
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

  // Obtiene todas las materias de 10 en 10
  getMaterias(){
    return getDocs(query(collection(this.db,"subjects"),orderBy("subjectName", "asc"), limit(10)))
  }

  // VIDEOS
  async aggVideo(link: _Link){
    let formatedLink = {...link, date: Timestamp.fromDate(link.date)}
    return await setDoc(doc(this.db,"videos", formatedLink.url), formatedLink)
  }

  getVideos(){
    return query(collection(this.db,"videos"),orderBy("date", "asc"))
  }

  deleteVid(ref: string){
    return deleteDoc(doc(this.db,"videos",ref))
  }

  // ARTICULOS 
  aggArticulo(link: _Link){
    let formatedLink = {...link, date: Timestamp.fromDate(link.date)}
    return addDoc(collection(this.db,"articulos"), formatedLink)
  }

  getArticulos(){
    return query(collection(this.db,"articulos"),orderBy("date", "asc"))
  }
}
