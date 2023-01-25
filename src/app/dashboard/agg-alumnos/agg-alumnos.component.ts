import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../admin.service';
import { PreviewCsvComponent } from '../dialogs/preview-csv.component';

@Component({
  selector: 'agg-alumnos',
  templateUrl: './agg-alumnos.component.html',
  styleUrls: ['./agg-alumnos.component.scss']
})

export class AggAlumnosComponent implements OnInit {

  constructor(private dialog: MatDialog, private adminService: AdminService) { }

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
        
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow);  

        const dialogRef =this.dialog.open(PreviewCsvComponent, {
          data: {
            tabla:[...this.records], 
            subject: 'Alumnos',
            headers: headersRow
          }
        })

        dialogRef.afterClosed().subscribe((res)=>{
          if(res){
            this.adminService.aggAlumnos(this.records)
          }
        })
      };  
    }else{
      console.log('AYOOOOO')

    }

    ref.value= ""
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headers: any) {  
    let csvArr: any = [];  
    const headerLength = headers.length
    for (let i = 1; i < csvRecordsArray.length; i++) {  
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
      
      if (curruntRecord.length == headerLength) {  
        let csvRecord: any = {} 
        for(let i = 0; i < headers.length; i++){
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
    const headers = (<string>csvRecordsArr[0]).toLowerCase().split(',');  
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      let auxHead = ""
      switch(headers[j]){
        case "nombre programa":
          auxHead = "programName"
          break

        case "clave programa":
          auxHead = "programKey"
          break

        case "plan":
          auxHead = "studyPlan"
          break

        case "expediente":
          auxHead = "studentID"
          break

        case "nombre":
          auxHead = "name"
          break

        case "status alumno":
          auxHead = "studentStatus"
          break

        case "cred.pasante":
          auxHead = "requiredCredits"
          break

        case "cred.aprob.":
          auxHead = "approvedCredits"
          break

        case "prom.kdxs":
          auxHead = "kardexGrade"
          break

        case "prom.periodo":
          auxHead = "periodGrade"
          break

        case "mat.aprob.":
          auxHead = "approvedSubjects"
          break

        case "materias acreditadas":
          auxHead = "creditedSubjects"
          break

        case "materias inscritas":
          auxHead = "enrolledSubjects"
          break

        case "materias segunda inscr":
          auxHead = "secondEnrolledSubjects"
          break

        case "materias tercera inscr":
          auxHead = "thirdEnrolledSubjects"
          break

        case "materias reprobadas":
          auxHead = "failedSubjects"
          break

        case "materias bajas voluntarias":
          auxHead = "dropedSubjects"
          break

        case "cred.insc.":
          auxHead = "enrolledCredits"
          break

        case "nivel y ciclo inglés":
          auxHead = "levelAndCycleEnglish"
          break

        case "correo":
          auxHead = "email"
          break

        case "cred cult":
          auxHead = "cultCredits"
          break

        case "cred dep":
          auxHead = "sportsCredits"
          break
          
        case "practica profesional estatus y ciclo":
          auxHead = "professionalPracticesStatusAndCycle"
          break

        case "serviciosocialmateriaestatus-ciclo":
          auxHead = "socialServiceStatusAndCycle"
          break
        
        case "estatusproyectoserviciosocial-cicloregistro":
          auxHead = "socialServiceProjectStatusAndRegisterCycle"
          break
        
        case "egel-testimonio":
          auxHead = "egel"
          break
        
        case "inscrito":
          auxHead = "isEnrolled"
          break

        default:
          auxHead = "ESTE HEADER ESTA MAL"
        
      }
      headerArray.push(auxHead);  
    }  
    return headerArray;  
  }  

}
