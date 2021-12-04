import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { User } from 'src/app/model/user';
import { ClientService } from 'src/app/service/client.service';
import { AdminComponent } from '../admin.component';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.css']
})
export class AdminAccountComponent implements OnInit {

  UserName:String;
  email;
  noi_ct;
  reg = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
  sdt;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(private clientService: ClientService,private appComponent: AppComponent,private adminComponent: AdminComponent) { }

  ngOnInit(): void {
     this.setAccount();
  }

  async setAccount(){
    var user=new User();
    var t:any;
    t= await this.clientService.getUser().toPromise();
      user=t.filter(s=>s._id==this.adminComponent.idUser);
       this.email=user[0].email;
       this.UserName=user[0].user_name;
       this.noi_ct=user[0].noi_cong_tac;
       this.sdt=user[0].sdt;
    
  }

  updateAccount(form:NgForm){
    var user=new User();
    user._id=this.adminComponent.idUser;
    user.email=form.value.email;
    user.user_name=form.value.UserName;
    user.noi_cong_tac=form.value.noi_ct;
    user.sdt=form.value.sdt;
    this.clientService.updateUser(this.adminComponent.idUser,user).subscribe((response: any)=>{
      this.appComponent.alertWithSuccess("Cập nhật thông tin tài khoản thành công");
    },
    err=>{
      if(err.status===422){
        this.appComponent.erroAlert(err.error.join('</br>'));
      }else{
        this.appComponent.erroAlert('Đã xảy ra lỗi. Vui lòng liên hệ với quản trị viên');
      }
    })
  }
}
