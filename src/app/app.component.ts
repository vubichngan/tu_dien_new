import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/service/client.service';
import { User } from 'src/app/model/user';
import { Params} from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';
  clientService:ClientService;
  router: Router;
  User:Object;
  userList:any[];
  
  jquery(){
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
            // open sidebar
            $('#sidebar').removeClass('active');
            // fade in the overlay
            $('.overlay').addClass('active');
            $('.collapse.in').toggleClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        });
        $("#sidebar").mCustomScrollbar({
            theme: "minimal"
        });

        $('#dismiss, .overlay, .click').on('click', function () {
            // hide sidebar
            $('#sidebar').addClass('active');
            // hide overlay
            $('.overlay').removeClass('active');
        });
    });
  }


  getUser(component){
    component.route.params.subscribe(
      (params: Params) => {
        if (params.name) {
          component.clientService.getUser().subscribe((response: any)=>{
            this.userList=response.filter(s =>s.user_name==params.name);
            component.userName=this.userList[0].user_name;
            component.idUser=this.userList[0]._id;
          })
        } 
      })
  }
  
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
      title: '?????i m???t kh???u',
      html: `<input type="password" id="currentPassword" class="swal2-input" placeholder="M???t kh???u c??">
      <input type="password" id="newPassword" class="swal2-input" placeholder="M???t kh???u m???i">
      <input type="password" id="confirmNewPassword" class="swal2-input" placeholder="Nh???p l???i m???t kh???u m???i">`,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'L??u',
      focusConfirm: false,
      preConfirm: () => {
        const currentPassword = Swal.getPopup().querySelector('#currentPassword').value
        const newPassword = Swal.getPopup().querySelector('#newPassword').value
        const confirmNewPassword = Swal.getPopup().querySelector('#confirmNewPassword').value
        const le=newPassword.length
        if (!confirmNewPassword || !newPassword||!currentPassword) {
          Swal.showValidationMessage(`Nh???p t???t c??? c??c tr?????ng`)
        }else if(le<4){
          Swal.showValidationMessage(`Nh???p m???t kh???u c?? ??t nh???t 4 k?? t???`)
        }else if(newPassword!==confirmNewPassword){
          Swal.showValidationMessage(`Nh???p l???i m???t kh???u kh??c m???t kh???u m???i`)
        }
        return {newPassword: newPassword , currentPassword:currentPassword}
      }
    }).then((result) => {
      if ("dismiss" in result) return
      this.User={
        user_name:userName,
        password:result.value.currentPassword
      }
      console.log(this.User)
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
          user.mat_khau= form.value.newPassword;
          component.clientService.updateUser(idUser,user).subscribe((response: any)=>{
            this.alertWithSuccess("?????i m???t kh???u th??nh c??ng");
          },
          err=>{
            if(err.status===422){
              this.erroAlert(err.error.join('</br>'));
            }else{
              this.erroAlert('???? x???y ra l???i. Vui l??ng li??n h??? v???i qu???n tr??? vi??n');
            }
          })
  }

  
}
