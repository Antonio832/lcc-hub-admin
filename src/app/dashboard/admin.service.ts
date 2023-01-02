import { Injectable } from '@angular/core';
import { Firestore, collection, orderBy, limit, query, getDocs, startAt } from '@angular/fire/firestore';
import { doc, setDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // Inyeccion del proveedor de la base de datos
  constructor(private db: Firestore) { }

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
}
