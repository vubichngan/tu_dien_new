import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { User } from 'src/app/model/user';
import { ClientService } from 'src/app/service/client.service';
import { AppComponent } from 'src/app/app.component';
import { UserComponent } from '../user.component';
@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  UserName:String;
  email;
  noi_ct;
  sdt;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(private clientService: ClientService,private appComponent: AppComponent,private userComponent: UserComponent) { }

  ngOnInit(): void {
     this.setAccount();
  }

  async setAccount(){
    var user=new User();
    var t:any;
    t= await this.clientService.getUser().toPromise();
      user=t.filter(s=>s._id==this.userComponent.idUser);
       this.email=user[0].email;
       this.UserName=user[0].user_name;
       this.noi_ct=user[0].noi_cong_tac;
       this.sdt=user[0].sdt;
    
  }

  updateAccount(form:NgForm){
    var user=new User();
    user._id=this.userComponent.idUser;
    user.email=form.value.email;
    user.user_name=form.value.UserName;
    user.noi_cong_tac=form.value.noi_ct;
    user.sdt=form.value.sdt;
    this.clientService.updateUser(this.userComponent.idUser,user).subscribe((response: any)=>{
      this.appComponent.alertWithSuccess("Successfully");
    },
    err=>{
      if(err.status===422){
        this.appComponent.erroAlert(err.error.join('</br>'));
      }else{
        this.appComponent.erroAlert('Something went wrong. Please contact admin');
      }
    })
  }
}
