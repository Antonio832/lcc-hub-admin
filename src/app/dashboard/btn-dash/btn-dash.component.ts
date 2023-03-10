import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dashBtn',
  templateUrl: './btn-dash.component.html',
  styleUrls: ['./btn-dash.component.scss']
})
export class BtnDashComponent implements OnInit {

  @Input() desc: string = '-';
  @Input() titulo: string = '-';
  @Input() ico: string = 'radio_button_unchecked';
  @Input() icoSize: number = 10;

  constructor() { }

  ngOnInit(): void {
  }

}
