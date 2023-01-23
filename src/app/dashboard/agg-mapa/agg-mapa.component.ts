import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../admin.service';
import { PreviewCsvComponent } from '../dialogs/preview-csv.component';

@Component({
  selector: 'mapa',
  templateUrl: './agg-mapa.component.html',
  styleUrls: ['./agg-mapa.component.scss']
})
export class AggMapaComponent implements OnInit {
  records: any;

  constructor(public dialog: MatDialog, private adminService: AdminService) { }

  ngOnInit(): void {
  }

  onDragHandler(dropzone: any){

  }

  onLeaveDrag(dropzone: any){

  }

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

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headers: any) {  
    let csvArr: any = [];  
    const headerLength = headers.length
    
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
        
        // Modificar para headers del mapa curricular
        
      }
      headerArray.push(auxHead);  
    }  
    return headerArray;  
  }  
}
