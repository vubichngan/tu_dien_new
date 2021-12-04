import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Word } from 'src/app/model/word';
import { ManageComponent } from '../manage.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-neet-to-be-approved',
  templateUrl: './neet-to-be-approved.component.html',
  styleUrls: ['./neet-to-be-approved.component.css']
})
export class NeetToBeApprovedComponent implements OnInit {
  
  search='';
  wordList:Word[];
  wordListFilter:any[];
  w:any[];
  status: String;
  comment:String;
  checkedUserList:any;
  isSelected:boolean;
  p: number = 1;
  isDisableBtn:boolean;
  constructor(private clientService: ClientService,private manageComponent:ManageComponent,private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.reset();
  }

  reset(){
    this.clientService.getWordL().subscribe((response: any)=>{
      this.wordList= response.filter(s => s.trang_thai=='Chưa duyệt');
      this.wordList.forEach(function(element){element.isChecked=false;})
      this.wordListFilter=this.wordList;
      this.status="Đã duyệt";
      this.isSelected=false;
      this.isDisableBtn=true;
      this.comment="";
    })
  }
  
  commentWord(id: any){
    Swal.fire({
      title: 'Ghi chú',
      html: `<textarea id="comment" class="swal2-textarea"></textarea>`,
      confirmButtonText: 'Xác nhận',
      focusConfirm: false,
      preConfirm: () => {
        const comment = Swal.getPopup().querySelector('#comment').value
        if (!comment) {
          Swal.showValidationMessage(`Không được để trống`)
        }
        return { comment: comment}
      }
    }).then((result) => {
      if ("dismiss" in result) return;
      this.comment=result.value.comment;
      console.log(id);
      this.updateWordStatus(id,"Từ chối");
    })
    
  }

    updateWordStatus(id: any,status: String){
      var word=new Word();
      word._id=id;
      word.trang_thai=status;
      if(this.comment!==""){
        word.ghi_chu=this.comment;
      }
      this.w=this.wordListFilter.filter(s => s._id==id);
      word.tu_lienquan=this.w[0].tu_lienquan;
      word.nguoi_duyet=this.manageComponent.userName;
      this.clientService.updateWord(id,word).subscribe((response: any)=>{
        this.appComponent.alertWithSuccess(status+" thành công")
        this.reset();
      })
      
    }
  
    updateWordList(){
      for(var i=0;i<this.checkedUserList.length;i++){
         if(this.status==="Đã duyệt"){
          this.updateWordStatus(this.checkedUserList[i]._id,this.status);
         }else this.commentWord(this.checkedUserList[i]._id);
      }
    }
  
    checkUncheckAll() {
      for (var i = 0; i < this.wordList.length; i++) {
        this.wordList[i].isChecked = this.isSelected;
      }
      this.getCheckedItemList();
    }
     
    isAllSelected() {
      this.isSelected = this.wordList.every(function(item:any) {
          return item.isChecked == true;
        })
      this.getCheckedItemList();
    }
    
    getCheckedItemList(){
      this.checkedUserList = [];
      for (var i = 0; i < this.wordList.length; i++) {
        if(this.wordList[i].isChecked)
        this.checkedUserList.push(this.wordList[i]);
      }
      if(this.checkedUserList.length>0){
        this.isDisableBtn=false;
      }else{
        this.isDisableBtn=true;
      }
    }

    onKey(event: any){
      this.search = event.target.value;
      if(this.search===""){
        this.wordListFilter=this.wordList;
      }else{
        this.wordListFilter= this.wordList.filter(s => s.tu_en.toLowerCase().indexOf(this.search.toLowerCase())!==-1);
      }
    }
}
