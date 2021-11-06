import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  idUser;
  userName;
  constructor(private clientService: ClientService,private appComponent:AppComponent,private router: Router) { 
  }

  ngOnInit(): void {
    this.clientService.getUserProfile().subscribe(
      res=>{
        this.userName=res['user'].user_name;
      },
      err=>{
        console.log(err);
      });
      this.idUser=this.clientService.getUserPayload()._id
  }

  onLogout(){
    this.appComponent.onLogout(this);
  }

  onKey(event, component){
    component.search = event.target.value;
  }
  
  formChangePassword(){
    this.appComponent.formChangePassword(this,this.idUser,this.userName);
  }
}
