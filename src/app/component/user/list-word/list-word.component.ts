import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { AppComponent } from 'src/app/app.component';
import { UserComponent } from '../user.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-word',
  templateUrl: './list-word.component.html',
  styleUrls: ['./list-word.component.css']
})
export class ListWordComponent implements OnInit {

  trang_thai;
  flag;
  constructor(private clientService: ClientService,private router: Router,private appComponent: AppComponent,private userComponent: UserComponent) { }

  ngOnInit(): void {
  }

  reset(component){
    this.clientService.getWordL().subscribe((response: any)=>{
      component.wordList= response.filter(s => s.nguoi_tao==this.userComponent.userName);
      component.wordList= component.wordList.filter(this.trang_thai);
      component.wordList.forEach(function(element){element.isChecked=false;});
      component.wordListFilter=component.wordList;
      component.isDisableBtn=true;
      component.isSelected=false;
    })
  }

  getWordId(id: String){
    this.router.navigate([ '/user/'+this.userComponent.userName+'/edit-word',id ]);
  }

  checkUncheckAll(component) {
    for (var i = 0; i < component.wordList.length; i++) {
      component.wordList[i].isChecked = component.isSelected;
    }
    this.getCheckedItemList(component);
  }
   
  isAllSelected(component) {
    component.isSelected = component.wordList.every(function(item:any) {
        return item.isChecked == true;
      })
    this.getCheckedItemList(component);
  }
  
  getCheckedItemList(component){
    component.checkedUserList = [];
    for (var i = 0; i < component.wordList.length; i++) {
      if(component.wordList[i].isChecked)
      component.checkedUserList.push(component.wordList[i]);
    }
    if(component.checkedUserList.length>0){
      component.isDisableBtn=false;
    }else{
      component.isDisableBtn=true;
    }
  }

  confirmDialogDelete(id:any,component){
    Swal.fire({
      title: 'Bạn chắc chắn muốn xóa từ này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteWord(id,component);
      }
    })
  }

  deleteWord(id:any,component){
    this.clientService.deleteWord(id).subscribe((response: any)=>{
      this.appComponent.alertWithSuccess("Xóa thành công");
      this.reset(component);
    },err=>{
      this.appComponent.erroAlert('Lỗi: '+err);
    }
    )
  }

  confirmDeleteWordList(component){
    Swal.fire({
      title: 'Bạn chắc chắn muốn xóa các từ này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận'
    }).then((result) => {
      if (result.isConfirmed) {
        for(var i=0;i<component.checkedUserList.length;i++){
          this.deleteWord(component.checkedUserList[i]._id,component);
        }
      }
    })
  }

  onKey(event, component){
    component.search = event.target.value;
    if(component.search===""){
      component.wordListFilter=component.wordList;
    }else{
      component.wordListFilter= component.wordList.filter(s => s.tu_en.toLowerCase().indexOf(component.search.toLowerCase())!==-1);
    }
  }
}
