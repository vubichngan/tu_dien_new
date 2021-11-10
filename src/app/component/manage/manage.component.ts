import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Word } from 'src/app/model/word';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute, Params,Router} from '@angular/router';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  userName;
  idUser;
  constructor(private clientService: ClientService, private appComponent: AppComponent, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.appComponent.getUser(this);
  }

  onLogout(){
    this.appComponent.onLogout(this);
  }
   
  formChangePassword(){
    this.appComponent.formChangePassword(this,this.idUser,this.userName);
  }
}
