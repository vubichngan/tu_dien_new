import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute, Params,Router} from '@angular/router';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  idUser;
  userName;
  constructor(private clientService: ClientService,private appComponent:AppComponent,private route: ActivatedRoute,private router: Router) { 
  }

  ngOnInit(): void {
    this.appComponent.getUser(this);
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
