import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  public host: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  public getResources(url: string) {
    var x = this.http.get(this.host + url);
    // console.log("############ getResources ############");
    // console.log(x);
    // console.log("############ getResources ############");
    return x;
  }
}
