import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {


  @Input()
  public gif!: Gif;


  ngOnInit(): void {
    if(!this.gif ) throw new Error('Gif property is required');

  }

}
