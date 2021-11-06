import{HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http:HttpClient) {
    this.ROOT_URL='https://tu-dien-chan-nuoi.herokuapp.com/api';
   }

  get(uri: String){
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  post(uri: String, payload: Object){
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  postU(uri: String, payload: Object, t:any){
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload,t);
  }

  putU(uri: String, payload: Object, t:any){
    return this.http.put(`${this.ROOT_URL}/${uri}`, payload,t);
  }

  put(uri: String, payload: Object){
    return this.http.put(`${this.ROOT_URL}/${uri}`, payload);
  }

  delete(uri: String){
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }
}
