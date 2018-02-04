import { Http , Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  apiUrl  = "https://api.coinmarketcap.com/v1/ticker/";
  data : any;

  constructor(public http: Http  , public events : Events) {
    console.log('Hello RestProvider Provider');
  }


  get(){
      return this.http.get(this.apiUrl).subscribe(data => {
        this.events.publish("done",data['_body']);
      }, err => {
          return err;
      });
  }
}
