import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { User } from 'src/app/model/user';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  showSuccessMessage:boolean;
  serverErrorMessage:string;
  UserName:String;
  Password:string;
  email;
  noi_ct;
  sdt;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   constructor(private clientService: ClientService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    var user=new User();
    user.email=form.value.email;
    user.user_name=form.value.UserName;
    user.noi_cong_tac=form.value.noi_ct;
    user.sdt=form.value.sdt;
    user.mat_khau=form.value.Password;
    user.phan_quyen="2";
    user.trang_thai="1";
    console.log(user);
    this.clientService.createUser(user).subscribe((response: any)=>{
      this.showSuccessMessage=true;
      setTimeout(()=>this.showSuccessMessage=false,4000);
      this.reset(form);
    },
    err=>{
      if(err.status===422){
        this.serverErrorMessage=err.error.join('</br>');
      }else{
        this.serverErrorMessage='Something went wrong. Please contact admin';
      }
    })
  }

  reset(form:NgForm){
    form.resetForm();
    this.serverErrorMessage='';
  }
}
