import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PreviewCsvComponent } from '../dialogs/preview-csv.component';

@Component({
  selector: 'agg-alumnos',
  templateUrl: './agg-alumnos.component.html',
  styleUrls: ['./agg-alumnos.component.scss']
})

export class AggAlumnosComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getAlumnos(){
    
  }

  records: any[] = []

  onFileChange(files: any, ref: any){
    let input = files.path[0].files
    if(input.length == 1 && input[0].type == 'text/csv'){
      let reader = new FileReader()
      reader.readAsText(input[0])
      reader.onload = () => {  
        let csvData = reader.result; 
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
  
        let headersRow = this.getHeaderArray(csvRecordsArray);  
        // return console.log(headersRow)
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow);  
        const dialogRef =this.dialog.open(PreviewCsvComponent, {
          data: {
            tabla:[...this.records], 
            subject: 'Materia',
            headers: headersRow
          }
        })

        dialogRef.afterClosed().subscribe((res)=>{
          if(res){

          }
        })
        // for(let i = 0; i < 10; i++) console.dir(this.records[i])
      };  
    }else{
      console.log('AYOOOOO')

    }

    ref.value= ""
  }

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

  onDragHandler(dropzone: any){

  }

  onLeaveDrag(dropzone: any){

  }

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

}
