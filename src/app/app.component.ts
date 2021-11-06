import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/service/client.service';
import { User } from 'src/app/model/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';
  clientService:ClientService;
  router: Router;
  User=new User();
  alertWithSuccess(title){
    Swal.fire({
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 2000,
    }) ;
  }

  erroAlert(title){  
    Swal.fire({  
      icon: 'error',  
      title:title, 
      showConfirmButton: true,
    })  
  } 
  
  onLogout(nameComponent){
    nameComponent.clientService.deleteToken();
    nameComponent.router.navigate(['/login']);
  }

  formChangePassword(component,idUser,userName){
    Swal.fire({
      title: 'Đổi mật khẩu',
      html: `<input type="password" id="currentPassword" class="swal2-input" placeholder="Mật khẩu cũ">
      <input type="password" id="newPassword" class="swal2-input" placeholder="Mật khẩu mới">
      <input type="password" id="confirmNewPassword" class="swal2-input" placeholder="Nhập lại mật khẩu mới">`,
      confirmButtonText: 'Save',
      focusConfirm: false,
      preConfirm: () => {
        const currentPassword = Swal.getPopup().querySelector('#currentPassword').value
        const newPassword = Swal.getPopup().querySelector('#newPassword').value
        const confirmNewPassword = Swal.getPopup().querySelector('#confirmNewPassword').value
        const le=newPassword.length
        if (!confirmNewPassword || !newPassword||!currentPassword) {
          Swal.showValidationMessage(`Please enter all fiels`)
        }else if(le<4){
          Swal.showValidationMessage(`Please enter password atleast 4 characters`)
        }else if(newPassword!==confirmNewPassword){
          Swal.showValidationMessage(`Confirm new password different new password`)
        }
        return {newPassword: newPassword , currentPassword:currentPassword}
      }
    }).then((result) => {
      if ("dismiss" in result) return
      this.User.user_name= userName;
      this.User.password= result.value.currentPassword;
      component.clientService.loginUser(this.User).subscribe(
        res=>{
          this.changePassword(result,idUser,component);
        },
        err=>{
          this.erroAlert(err.error.message);
        }
      )
    })
    
  }
  
  changePassword(form,idUser,component){
          var user=new User();
          user._id=idUser;
          user.password= form.value.newPassword;
          component.clientService.updateUser(idUser,user).subscribe((response: any)=>{
            this.alertWithSuccess("Successfully");
          },
          err=>{
            if(err.status===422){
              this.erroAlert(err.error.join('</br>'));
            }else{
              this.erroAlert('Something went wrong. Please contact admin');
            }
          })
  }


}
