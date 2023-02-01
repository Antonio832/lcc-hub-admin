import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';


@Component({
  selector: 'app-agg-articulo-dialog',
  template: `
    <h1 matDialogTitle>
      Agrega un articulo
    </h1>
    <div matDialogContent class="cont">
      <div class="left">

        <mat-form-field appearance="outline">
          <mat-label>Titulo</mat-label>
          <input 
            [(ngModel)]="titulo"
            matInput 
            autocomplete="off" 
          />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Descripción</mat-label>
          <input 
            [(ngModel)]="desc"
            matInput 
            autocomplete="off" 
          />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Link</mat-label>
          <input 
            [(ngModel)]="link"
            matInput 
            autocomplete="off" 
          />
        </mat-form-field>

        <mat-form-field appearance="outline" style="width: 100%;">
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
      </div>
      <div class="divider"></div>
      <div class="right">
        <button mat-button (click)="file.click()">
          <mat-icon>file_download</mat-icon>
          importar
        </button>
        <input 
          type="file"
          #file
          [multiple]="false"
          (change)="onFileChange($event, file)"
          style="display:none; width: 100%; height: 100%;" 
        />
      </div>
    </div>
    <div matDialogActions>
      <button mat-button>Cerrar</button>
      <button 
        mat-raised-button
        [disabled]="
          !titulo ||
          !desc ||
          !link ||
          !tags.length
          "
      >
        Agregar
      </button>
    </div>
  `,
  styles: [`
      .cont{
        display: flex;
      }
      .left{
        width: 50%;
        display: flex;
        flex-direction: column;
      }

      .divider{
        display: flex;
        margin-inline: 1rem;
        width: 1px;
        height: auto;
        background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(120,120,120,1) 50%, rgba(255,255,255,1) 100%);
      }
    `
  ]
})
export class AggArticuloDialogComponent implements OnInit {

  titulo: string = ''
  desc: string = ''
  link: string = ''
  tagHolder: string = ''
  tags: string[] = []

  addOnBlur = true
  
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor() { }

  ngOnInit(): void {
  }

  onFileChange(files:any, ref: any){
    let input = files.path[0].files
    console.log(input)
  }

  removeTag(tag: string){
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  addTag(event: MatChipInputEvent){
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

}
