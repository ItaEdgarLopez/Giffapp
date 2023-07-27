import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
  <h5>Buscar:</h5>
  <input type="text"
    class="form-control"
    placeholder="Buscar gifs..."
    (keyup.enter)="searchTag()"
    #Lacaja
    >

  `

})

export class SearchBoxComponent   {

  @ViewChild('Lacaja')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor( private _gifservice: GifsService) { }

  searchTag( ) {
    const newTag = this.tagInput.nativeElement.value;

    this._gifservice.searchTag(newTag);
    //Clean
    this.tagInput.nativeElement.value = '';
  }
}
