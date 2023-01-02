import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {

  constructor() { }

  @HostListener('dragover',['event'])
  dragHandler(e: Event){
    e.preventDefault()
  }
}
