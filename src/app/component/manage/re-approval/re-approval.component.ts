import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Word } from 'src/app/model/word';
import { ManageComponent } from '../manage.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-re-approval',
  templateUrl: './re-approval.component.html',
  styleUrls: ['./re-approval.component.css']
})
export class ReApprovalComponent implements OnInit {

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
  constructor(private clientService: ClientService,private manageComponent:ManageComponent) { }

  ngOnInit(): void {
    this.reset();
  }

  reset(){
    this.clientService.getWordL().subscribe((response: any)=>{
      this.wordList= response.filter(s => s.trang_thai==="Duyệt lại");
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
      confirmButtonText: 'Save',
      focusConfirm: false,
      preConfirm: () => {
        const comment = Swal.getPopup().querySelector('#comment').value
        if (!comment) {
          Swal.showValidationMessage(`Please enter comment`)
        }
        return { comment: comment}
      }
    }).then((result) => {
      if ("dismiss" in result) return;
      this.comment=result.value.comment;
      console.log(this.checkedUserList.length);
      if(this.checkedUserList.length){
        for(var i=0;i<this.checkedUserList.length;i++){
          this.updateWordStatus(this.checkedUserList[i]._id,this.status);
        }
      } else this.updateWordStatus(id,"Từ chối");
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
        this.reset();
      })
      
    }
  
    updateWordList(){
      if(this.status==="Đã duyệt"){
        for(var i=0;i<this.checkedUserList.length;i++){
            this.updateWordStatus(this.checkedUserList[i]._id,this.status);
        }
     }else {
        this.commentWord(this.checkedUserList[0]._id);
      
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
