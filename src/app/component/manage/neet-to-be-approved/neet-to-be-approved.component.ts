import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Word } from 'src/app/model/word';
import { ManageComponent } from '../manage.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AppComponent } from 'src/app/app.component';
import { Observable, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-neet-to-be-approved',
  templateUrl: './neet-to-be-approved.component.html',
  styleUrls: ['./neet-to-be-approved.component.css']
})
export class NeetToBeApprovedComponent implements OnInit {
  
  search='';
  listDa_duyet:any[];
  tuDa_duyet:any;
  wordList:Word[];
  wordListFilter:any[];
  w:any[];
  status: String;
  comment:String;
  checkedUserList:any;
  isSelected:boolean;
  p: number = 1;
  private updateSubscription: Subscription;
  isDisableBtn:boolean;
  constructor(private clientService: ClientService,private manageComponent:ManageComponent,private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.reset();
    this.updateSubscription = interval(30000).subscribe(
      (val) => { 
        this.reset();
      }
    );
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
    var word=new Word();
      word._id=id;
          word.trang_thai="Đang duyệt";
          word.tu_lienquan=this.w[0].tu_lienquan;
          this.clientService.updateWord(id,word).subscribe((response: any)=>{
            Swal.fire({
              title: 'Ghi chú',
              html: `<textarea id="comment" class="swal2-textarea"></textarea>`,
              showCancelButton: true,
              cancelButtonColor: '#d33',
              confirmButtonText: 'Xác nhận',
              focusConfirm: false,
              preConfirm: () => {
                const comment = Swal.getPopup().querySelector('#comment').value
                if (!comment) {
                  Swal.showValidationMessage(`Không được để trống`)
                }
                return { comment: comment}
              }
            }).then(async(result) => {
              if ("dismiss" in result){
                var word=new Word();
                  word._id=id;
                  word.trang_thai="Chưa duyệt"; 
                  word.tu_lienquan=this.w[0].tu_lienquan;
                  let v=await this.clientService.updateWord(id,word).toPromise();
                    return;
              } 
              this.comment=result.value.comment;
              this.updateWordStatus(id,"Từ chối");
            })
          });
  }

  testStastus(word ,status){
    this.clientService.getWord().subscribe((response: any)=>{
      this.w=response.filter(s=>s._id===word._id);
      if(this.w[0].trang_thai!=="Chưa duyệt"){
        alert("Từ "+this.w[0].tu_en+" đang được sửa!");
        this.reset();
      }else{
        if(status==="Đã duyệt"){
          this.updateWordStatus(word._id,status);
         }else this.commentWord(word._id);
      }
    })
  }
    updateWordStatus(id: any,status: String){
      var word=new Word();
      word._id=id;
      word.trang_thai=status;
      if(status==="Đã duyệt"){
        word.ghi_chu="";
      }
      if(this.comment!==""){
        word.ghi_chu=this.comment;
      }
      word.tu_lienquan=this.w[0].tu_lienquan;
      word.nguoi_duyet=this.manageComponent.userName;
      this.clientService.updateWord(id,word).subscribe((response: any)=>{
        if(status==="Đã duyệt"){
          this.updateTu_lienquan(word.tu_lienquan,this.w[0].tu_en);
        }
        this.appComponent.alertWithSuccess(status+" thành công");
        this.reset();
      })
      
    }
  
    updateTu_lienquan(listTu_lq,tu_en){
      this.clientService.getWord().subscribe((response:any)=>{
        this.listDa_duyet=response.filter(s=>s.trang_thai==="Đã duyệt");
        listTu_lq.forEach(element => {
          var tu=new Word();
          this.tuDa_duyet=this.listDa_duyet.filter(s=>s.tu_en===element.tu_en);
          tu=this.tuDa_duyet[0];
          tu.tu_lienquan.push({tu_en:tu_en});
          console.log(tu);
          this.clientService.updateWord(tu._id,tu).subscribe(res=>{
            console.log(res);
          },
          err=>{
            alert("Error! ");
          });
        });
      })
      
    }

    updateWordList(){
      for(var i=0;i<this.checkedUserList.length;i++){
        this.testStastus(this.checkedUserList[i],this.status);
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
