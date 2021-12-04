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
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
      s.phan_quyen.toLowerCase().indexOf(this.search.toLowerCase())!==-1||
      s.trang_thai.toLowerCase().indexOf(this.search.toLowerCase())!==-1 
      );
    }
  }


  deleteUser(id:any){
    this.clientService.deleteUser(id).subscribe((response: any)=>{
      this.reset();
      this.appComponent.alertWithSuccess("Xóa thành công");
    },err=>{
      this.appComponent.erroAlert('Lỗi: '+err);
    }
    )
  }
    reset(){
      this.clientService.getUser().subscribe((response: any)=>{
        this.userList=response.filter(s =>s._id!==this.adminComponent.idUser);
        this.userList.forEach(function(element){
          element.isChecked=false;
          if(element.phan_quyen==='0'){
            element.phan_quyen="Quản trị hệ thống";
          }else if(element.phan_quyen==='1')
                  element.phan_quyen="Quản lý";
          else element.phan_quyen="Người dùng";
  
          if(element.trang_thai==='1'){
            element.trang_thai="Kích hoạt";
          }else if(element.trang_thai==='0'){
            element.trang_thai="Khóa";
          }else element.trang_thai="Bị báo cáo";
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
      user.trang_thai=status;
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
