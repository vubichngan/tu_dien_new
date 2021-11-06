import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { User } from 'src/app/model/user';
import { AppComponent } from 'src/app/app.component';
import { ManageComponent } from '../manage.component';


@Component({
  selector: 'app-user-res',
  templateUrl: './user-res.component.html',
  styleUrls: ['./user-res.component.css']
})
export class UserResComponent implements OnInit {

  search='';
  userList:User[];
  userListFilter:User[];
  checkedUserList:any;
  isSelected:boolean;
  p: number = 1;
  isDisableBtn:boolean;
  constructor(private clientService: ClientService, private appComponent:AppComponent,private manageComponent:ManageComponent) { }

  ngOnInit(): void {
    this.reset();
  }

  reset(){
    this.clientService.getUser().subscribe((response: any)=>{
      this.userList= response.filter(s => s.permission=='2');
      this.userList= this.userList.filter(s => s.status=='1');
      this.userList.forEach(function(element){
        element.isChecked=false;
        if(element.permission==='0'){
          element.permission="Quản trị hệ thống";
        }else if(element.permission==='1')
                element.permission="Quản lý";
        else element.permission="Người dùng thường";

        if(element.status==='1'){
          element.status="Kích hoạt";
        }else if(element.status='0'){
          element.status="Khóa";
        }else element.status="Bị báo cáo"
      })
      this.userListFilter=this.userList;
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
      this.updateUser(this.checkedUserList[i]._id,"2");
    }
  }

  onKey(event: any){
    this.search = event.target.value;
    if(this.search===""){
      this.userListFilter=this.userList;
    }else{
      this.userListFilter= this.userList.filter(s =>s.user_name.toLowerCase().indexOf(this.search.toLowerCase())!==-1);
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
