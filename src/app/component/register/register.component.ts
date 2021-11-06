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
   constructor(private clientService: ClientService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    var user=new User();
    user.user_name=form.value.UserName;
    user.password=form.value.Password;
    user.permission="2";
    user.status="1";
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
