import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { User } from 'src/app/model/user';
import { ClientService } from 'src/app/service/client.service';
import { AdminComponent } from '../admin.component';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  UserName:String;
  Password;
  email;
  noi_ct;
  reg = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
  sdt;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(private clientService: ClientService,private appComponent: AppComponent,private adminComponent: AdminComponent) { }

  ngOnInit(): void {
     
  }

  createUser(form:NgForm){
    var user=new User();
      user.user_name=form.value.UserName;
      user.email=form.value.email;
      user.noi_cong_tac=form.value.noi_ct;
      user.sdt=form.value.sdt;
      user.mat_khau= form.value.Password;
      user.phan_quyen="1";
      user.trang_thai="1";
    this.clientService.createUser(user).subscribe((response: any)=>{
      form.resetForm();
      this.appComponent.alertWithSuccess("Thêm quản lý thành công");
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
