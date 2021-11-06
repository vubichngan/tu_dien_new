import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { User } from 'src/app/model/user';
import { AppComponent } from 'src/app/app.component';
import { AdminComponent } from '../admin.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { analyzeAndValidateNgModules } from '@angular/compiler';



@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  search='';
  userList:User[];
  p: number = 1;
  userListFilter:User[];
  // user_name:String;
  // password: String;
  checkedUserList:any;
  isSelected:boolean;
  status:String;
  isDisableBtn:boolean;
  serverErrorMessage:string;
  constructor(private clientService: ClientService, private appComponent:AppComponent,private adminComponent: AdminComponent) { }

  ngOnInit(): void {
    this.reset();
  }

  onKey(event: any){
    this.adminComponent.onKey(event,this);
    if(this.search===""){
      this.userListFilter=this.userList;
    }else{
      this.userListFilter= this.userList.filter(s =>s.user_name.toLowerCase().indexOf(this.search.toLowerCase())!==-1||
      s.permission.toLowerCase().indexOf(this.search.toLowerCase())!==-1||
      s.status.toLowerCase().indexOf(this.search.toLowerCase())!==-1 
      );
    }
  }


  formCreateUser(){
    Swal.fire({
      title: 'Thêm quản lý',
      html: `<input type="text" id="login" class="swal2-input" placeholder="Username">
      <input type="password" id="password" class="swal2-input" placeholder="Password">`,
      confirmButtonText: 'Save',
      focusConfirm: false,
      preConfirm: () => {
        const login = Swal.getPopup().querySelector('#login').value
        const password = Swal.getPopup().querySelector('#password').value
        const le=password.length
        if (!login || !password) {
          Swal.showValidationMessage(`Please enter username and password`)
        }else if(le<4){
          Swal.showValidationMessage(`Please enter password atleast 4 characters`)
        }
        return { login: login, password: password }
      }
    }).then((result) => {
      if ("dismiss" in result) return;
      this.createUser(result);
    })
    
  }
  
  createUser(form){
    var user=new User();
      user.user_name=form.value.login;
      user.password= form.value.password;
      user.permission="1";
      user.status="1";
    this.clientService.createUser(user).subscribe((response: any)=>{
      this.reset();
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
  
  
  deleteUser(id:any){
    this.clientService.deleteUser(id).subscribe((response: any)=>{
      this.reset();
      this.appComponent.alertWithSuccess(response);
    },err=>{
      this.appComponent.erroAlert('Delete error: '+err);
    }
    )
  }
    reset(){
      this.clientService.getUser().subscribe((response: any)=>{
        this.userList=response.filter(s =>s._id!==this.adminComponent.idUser);
        this.userList.forEach(function(element){
          element.isChecked=false;
          if(element.permission==='0'){
            element.permission="Quản trị hệ thống";
          }else if(element.permission==='1')
                  element.permission="Quản lý";
          else element.permission="Người dùng";
  
          if(element.status==='1'){
            element.status="Kích hoạt";
          }else if(element.status==='0'){
            element.status="Khóa";
          }else element.status="Bị báo cáo";
        })
        this.userListFilter=this.userList;
        this.status="1";
        this.isSelected=false;
        this.isDisableBtn=true;
      })
    

      
    }
    
  
    updateUser(id: any,status: String){
      var user=new User();
      user._id=id;
      user.status=status;
      this.clientService.updateUser(id,user).subscribe((response: any)=>{
        this.reset();
      })
    }
  
    updateUserList(){
      for(var i=0;i<this.checkedUserList.length;i++){
        this.updateUser(this.checkedUserList[i]._id,this.status);
      }
    }
  
    checkUncheckAll() {
      for (var i = 0; i < this.userList.length; i++) {
        this.userList[i].isChecked = this.isSelected;
      }
      this.getCheckedItemList();
    }
     
    isAllSelected() {
      this.isSelected = this.userList.every(function(item:any) {
          return item.isChecked == true;
        })
      this.getCheckedItemList();
    }
    
    getCheckedItemList(){
      this.checkedUserList = [];
      for (var i = 0; i < this.userList.length; i++) {
        if(this.userList[i].isChecked)
        this.checkedUserList.push(this.userList[i]);
      }
      if(this.checkedUserList.length>0){
        this.isDisableBtn=false;
      }else{
        this.isDisableBtn=true;
      }
    }

}
