import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { User } from 'src/app/model/user';
import { ClientService } from 'src/app/service/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  serverErrorMessage:string;
  user_name:String;
  Password:string;
  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.clientService.loginUser(form.value).subscribe(
      res=>{
        this.clientService.setToken(res['token']);
        console.log(this.clientService.getUserPayload());
        if(this.clientService.getUserPayload().status!=="0"){
          if(this.clientService.getUserPayload().permission==="2"){
            this.router.navigate(['/user/user-home']);
          }else if(this.clientService.getUserPayload().permission==="1"){
            this.router.navigate(['/manage/manage-home']);
          }else
            this.router.navigateByUrl('/admin/admin-home');
        }else this.serverErrorMessage="Tài khoản của bạn đã bị khóa"
      },
      err=>{
        this.serverErrorMessage=err.error.message;
      }
    )
  }

  

}
