import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../admin.service';
import { BuscaMateriaDialogComponent } from '../dialogs/busca-materia-dialog.component';
import { PreviewCsvComponent } from '../dialogs/preview-csv.component';

@Component({
  selector: 'agg-materia',
  templateUrl: './agg-materia.component.html',
  styleUrls: ['./agg-materia.component.scss']
})
export class AggMateriaComponent implements OnInit {

  // Inyectando dependencias
  constructor(private dialog: MatDialog, private adminService: AdminService) { }

  // Para el formulario agregar una sola materia
  materiaForm!: FormGroup

  ngOnInit(): void {
    // Inicializando el formulario con sus controles de formulario
    this.materiaForm = new FormGroup({
      academicDivision: new FormControl(null, [Validators.required]),
      branch: new FormControl(null, [Validators.required]),
      credits: new FormControl(null, [Validators.required]),
      department: new FormControl(null, [Validators.required]),
      labHours: new FormControl(null, [Validators.required]),
      requirements: new FormControl(null),
      subjectKey: new FormControl(null, [Validators.required]),
      subjectName: new FormControl(null, [Validators.required]),
      theoryHours: new FormControl(null, [Validators.required]),
      workshopHours: new FormControl(null, [Validators.required]),
    })
  }
  
  agregaMateria(){
    
  }

  // Todas las funciones get se utilizan para obtener 
  // los valores de los input.
  get academicDivision(){
    return this.materiaForm.get('academicDivision')
  }

  get branch(){
    return this.materiaForm.get('branch')
  }

  get credits(){
    return this.materiaForm.get('credits')
  }

  get department(){
    return this.materiaForm.get('department')
  }

  get labHours(){
    return this.materiaForm.get('labHours')
  }

  get requirements(){
    return this.materiaForm.get('requirements')
  }
  
  get subjectName(){
    return this.materiaForm.get('subjectName')
  }

  get subjectKey(){
    return this.materiaForm.get('subjectKey')
  }
  
  get theoryHours(){
    return this.materiaForm.get('theoryHours')
  }

  get workshopHours(){
    return this.materiaForm.get('workshopHours')
  }

  // Para manejar las materias buscadas desde la base de datos
  materias: any[] = []
  // Indicador de si ya obtubo las materias al menos una vez
  gotMaterias: boolean = false

  // Para guardar la referencia del ultimo documento que se obtuvo,
  // esto se utiliza para la paginacion
  lastMateriaRef: any = null;

  // Obtiene materias desde el servicio que interactua con la base de datos.
  // Mirar documentacion en el archivo admin.service.ts
  getMaterias(){
    return this.adminService.getMaterias().then(res=>{
      this.lastMateriaRef = res.docs[res.docs.length - 1]
      res.docs.forEach(doc=>this.materias.push(doc.data()))
      console.log(this.materias)
      this.gotMaterias = true
    })
  }

  getMasMaterias(){

  }



  // Para el typo de gestion de datos para
  // agregar a la base de datos
  fileMode = true
 
  // Para gestionar la clase css del dropzone
  dragAreaClass = ""

  // Todos los host listeners se utilizan solo para css excepto el ultimo
  @HostListener("dragover", ["$event"]) onDragOver(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }

  @HostListener("dragenter", ["$event"]) onDragEnter(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }

  @HostListener("dragend", ["$event"]) onDragEnd(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  
  @HostListener("dragleave", ["$event"]) onDragLeave(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  
  // Para manejar el soltar un archivo sobre el dropzone
  @HostListener("drop", ["$event"]) onDrop(event: any) {
    event.preventDefault()
    this.onFileChange(event.dataTransfer.files, null, true)
  }

  onDragHandler(dpz: Element){
    return dpz.classList.add('hovering')
  }

  onLeaveDrag(dpz: Element){
    return dpz.classList.remove('hovering')
  }

  // Para toda la tabla csv, son todos los datos en forma de arreglo
  records: any[] = []

  /**
   * 
   * @param files Archivos input, deben de ser csv
   * @param ref opcional
   * @param dragged booleano para saber si fue arrastrado o importado con file manager
   */
  onFileChange(files: any, ref?: any, dragged?:boolean){
    let input
    // Por si importo con file manager
    if(!dragged) input = files.path[0].files
    // Por si solto el archivo sobre el dropzone
    if(dragged) input = files
    
    // Checando que solo sea un archivo y sea de tipo csv
    if(input.length == 1 && input[0].type == 'text/csv'){
      // Inicializando el lector del archivo
      let reader = new FileReader()
      // Leyendo como texto
      reader.readAsText(input[0])
      // Cuando se cargue
      reader.onload = () => {  
        // Toda la informacion del archivo csv
        let csvData = reader.result; 
        // Obteniendo los titulos
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
        let headersRow = this.getHeaderArray(csvRecordsArray);  

        // Ensamblamos la informacion con los titulos
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow); 
        // Abriendo preview 
        const dialogRef =this.dialog.open(PreviewCsvComponent, {
          data: {
            tabla:[...this.records], 
            subject: 'Materia',
            headers: headersRow
          }
        })

        // Despues de cerrar el preview
        dialogRef.afterClosed().subscribe((res)=>{
          // Por si los quiere arreglar despues del preview
          if(res){
            // Agrega todas las materias a la base de datos mediante el servicio
            this.adminService.aggMaterias(this.records)
          }else{ // Por si no los quiere agregar despues del preview
            // nada que hacer
          }
          // Limpia los records
          this.records = []
        })
      };  
    }else{
      // No hace nada si hay muchos archivos, o si no es un csv
    }
    
    if(ref)ref.value= ""
  }

  /**
   * 
   * @param csvRecordsArray informacion del csv
   * @param headers titulos
   * @returns Un arreglo con todos los titulos con sus respectivos datos
   */
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headers: any) {  
    let csvArr: any = [];  
    let headerLength = headers.length
    for (let i = 1; i < csvRecordsArray.length; i++) {  
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
      
      if (curruntRecord.length == headerLength) {  
        let csvRecord: any = {} 

        for(let i = 0; i < 10; i++){
          if(headers[i] === "") continue
          csvRecord[headers[i]] = curruntRecord[i].trim().normalize('NFD').replace(/[\u0300-\u036f]/g,"");
        }

        csvArr.push(csvRecord);  
      }  
    }  
    return csvArr;  
  }  

  /**
   *  Cambia los titulos a los correspondientes atributos de la base de datos
   * @param csvRecordsArr Los titulos
   * @returns Un arreglo con todos los titulos formateados para la base de datos
   */
  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {
      let auxHead = ""
      switch(headers[j]){
        case "División":
          auxHead = "academicDivision"
          break
        
        case "Eje":
          auxHead = "branch"
          break
        
        case "Creditos":
          auxHead = "credits"
          break
        
        case "Departamento":
          auxHead = "department"
          break
        
        case "HorasLab":
          auxHead = "labHours"
          break
        
        case "Requisito":
          auxHead = "requirements"
          break
        
        case "Clave":
          auxHead = "subjectKey"
          break
        
        case "Nombre":
          auxHead = "subjectName"
          break
        
        case "HorasTeoria":
          auxHead = "theoryHours"
          break
        
        case "HorasTaller":
          auxHead = "workshopHours"
          break
        
      }
      headerArray.push(auxHead);  
    }  
    return headerArray;  
  }  

  buscaMateria(){
    const dialogRef = this.dialog.open(BuscaMateriaDialogComponent)
  }

}
