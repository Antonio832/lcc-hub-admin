import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edita-propiedad-dialog',
  template: `
    <h1 matDialogTitle>
      Actualiza {{data.parsedField}}
    </h1>
    <div matDialogContent>
      <mat-form-field appearance="outline" style="width: 100%;" *ngIf="data.type">
        <mat-label>Tags</mat-label>
        <mat-chip-list #chipList>
          <mat-chip *ngFor="let tag of tags" (removed)="removeTag(tag)">
            {{tag}}
            <button matChipRemove>
              <mat-icon>cancel</mat-icon>
            </button>
          </mat-chip>
          <input 
            [(ngModel)]="tagHolder"
            [matChipInputFor]="chipList"
            [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
            [matChipInputAddOnBlur]="addOnBlur"
            (matChipInputTokenEnd)="addTag($event)"
            matInput 
            autocomplete="off" 
          />
        </mat-chip-list>
      </mat-form-field>
      <mat-form-field appearance="outline" *ngIf="!data.type">
        <input matInput autocomplete="off" [(ngModel)]="newVal" />
      </mat-form-field>
    </div>
    <div matDialogActions>
      <button mat-stroked-button (click)="cierra()">Cerrar</button>
      <button mat-raised-button (click)="handleClose()">Actualizar</button>
    </div>
  `,
  styles: [
  ]
})
export class EditaPropiedadDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditaPropiedadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  newVal: any;
  tagHolder: string = ''
  addOnBlur = true
  tags: any[] = []
  
  readonly separatorKeysCodes = [ENTER, COMMA] as const;


  ngOnInit(): void {
    if(this.data.type){
      this.tags = this.data.prop
    }
    console.log(this.data)
  }

  handleClose(){
    if(this.data.type){
      return this.dialogRef.close(this.tags)
    }
    if(!this.newVal) return
    return this.dialogRef.close(this.newVal)
  }

  cierra(){
    return this.dialogRef.close()
  }

  removeTag(tag: string){
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
  
  addTag(event: MatChipInputEvent){
    const value = (event.value || '').trim();

    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

}
