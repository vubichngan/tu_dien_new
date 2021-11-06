import { WebRequestService } from './web-request.service';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  noAuthHeader={ headers: new HttpHeaders({'NoAuth':'true'}) };

  constructor(private WebReqService: WebRequestService) { }

  createWord(word:any){
    return this.WebReqService.post('word/create',word);
  }

  createImg(word:any){
    return this.WebReqService.post('word/createImg',word);
  }

  updateWord(_id:String, word: any){
    return this.WebReqService.put('word/update/'+_id,word);
  }

  updateImg(_id:String, word: any){
    return this.WebReqService.put('word/updateImg/'+_id,word);
  }

  deleteWord(_id: String){
    return this.WebReqService.delete('word/delete/'+_id);
  }

  getWord(){
    return this.WebReqService.get('word');
  }

  getWordL(){
    return this.WebReqService.get('word/getWord');
  }
  
  getSearch(a){
    return this.WebReqService.get('word/searchA_Z/'+a,);
  }

  createUser(user:any){
    return this.WebReqService.postU('user/create',user,this.noAuthHeader);
  }

  deleteUser(_id: String){
    return this.WebReqService.delete('user/delete/'+_id);
  }

  updateUser(_id:String, user: any){
    return this.WebReqService.putU('user/update/'+_id,user,this.noAuthHeader);
  }

  getUser(){
    return this.WebReqService.get('user');
  }

  loginUser(authCredentials){
    return this.WebReqService.postU('user/authenticate',authCredentials,this.noAuthHeader);
  }

  getUserProfile(){
    return this.WebReqService.get('user/userProfile');
  }

  // Helper methods
  getToken(){
    return localStorage.getItem('token');
  }

  setToken(token:string){
    localStorage.setItem('token', token);
  }

  deleteToken(){
    localStorage.removeItem('token');
  }

  getUserPayload(){
    var token=this.getToken();
    if(token){
      var userPayload=atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn(){
    var userPayload=this.getUserPayload();
    if(userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }

  

}
