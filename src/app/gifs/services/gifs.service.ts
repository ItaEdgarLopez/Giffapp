import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private api_key:string = 'h3Al7sanCEB0oMjBepRM8aTyx44wjfo2';
  private serviceUrl:string = 'https://api.giphy.com/v1/gifs';


  constructor( private http: HttpClient) {
    this.LoadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory( tag:string ){

    console.log(tag)
    tag = tag.toLowerCase();

    if( this._tagsHistory.includes(tag)){
      alert('Ya existe')
    this._tagsHistory = this._tagsHistory.filter( (tagExist) => tagExist !== tag )
    }
    this._tagsHistory.unshift( tag );
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.SaveLocalStorage();

  }

  private SaveLocalStorage():void {
      localStorage.setItem('history',JSON.stringify(this._tagsHistory ) );
    }

  private LoadLocalStorage(): void {

      if(!localStorage.getItem('history')) return;

      this._tagsHistory = JSON.parse( localStorage.getItem('history')! )
      console.log(this._tagsHistory)

      if( this._tagsHistory.length === 0 ) return;
      this.searchTag( this._tagsHistory[0]);

    }
  public ClearLocalStorage() {
    localStorage.removeItem('history');
  }

  searchTag( tag:string ):void {

    if(tag.length === 0 )return;
    this.organizeHistory(tag);

    const params =  new HttpParams()
      .set('api_key', this.api_key)
      .set('limit', '10')
      .set('q', tag )


    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{ params })
    .subscribe( resp =>{

      this.gifList = resp.data;

    })


  }
}
