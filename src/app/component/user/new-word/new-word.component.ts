import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Word } from 'src/app/model/word';
import { AppComponent } from 'src/app/app.component';
import { UserComponent } from '../user.component';
import{HttpClient} from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder,Validators,FormArray} from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';




@Component({
  selector: 'app-new-word',
  templateUrl: './new-word.component.html',
  styleUrls: ['./new-word.component.css']
})
export class NewWordComponent implements OnInit {

  form:FormGroup;
  imgData: string;
  wordList:Word[];
  wordListFilter:any[];
   
  constructor(private clientService: ClientService,private appComponent: AppComponent,private userComponent: UserComponent,
    private http:HttpClient,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.reset();
  }
  
  get(){
    this.clientService.getWord().subscribe((response: any)=>{
      this.wordList=response;
      this.wordList= this.wordList.filter(s => s.trang_thai!=="Từ chối");
      this.wordListFilter=this.wordList;
    })
  }

  onFileSelect(event: Event){
    this.userComponent.onFileSelect(event,this);
  }

  reset(){
    this.userComponent.newForm(this);
    this.imgData=null;
    this.get();
  }

  get tu_lienquan() : FormArray {
    return this.form.get("tu_lienquan") as FormArray
  }

  removeTu_lienquan(i){
    this.userComponent.removeTu_lienquan(i,this);
  }

  addTu_lienquan(event){
    if(event.key=="Tab"){
      this.userComponent.addTu_lienquan(this);
    }else this.userComponent.addTu_lienquan(this);
  }

  

  createWord(){
    var word =new Word();
    var t: Array<any> = []; 
    var w:any[];
    word=this.form.value;
    word.tu_lienquan.forEach(element=>{
      w=this.wordListFilter.filter(s => s.tu_en.toString()===element.tu_en)
      if(w.length==0){
        t.push(element.tu_en);
      }
    })
    if(t.length!=0){
        Swal.fire({
          title:'Thêm không thành công',
          icon: 'error',
          text:'Từ '+t+' chưa được tạo hãy thêm '+ t +' vào danh sách của bạn.'
        })
    }else{
      word.trang_thai="Chưa duyệt";
          word.nguoi_tao=this.userComponent.userName;
          console.log(word);
          console.log(this.form.value);
          if(this.form.value.anh!=null){
            const profileData = new FormData();
            profileData.append("anh", this.form.value.anh, this.form.value.anh.name);
            this.clientService.createImg(profileData).subscribe((response: any)=>{
              word._id=response._id;
              this.clientService.updateWord(response._id,word).subscribe((response: any)=>{
                this.appComponent.alertWithSuccess("Create successfully");
              },
              err=>{
                this.appComponent.erroAlert('Update error: '+err);
              })
            })
          }else {
              this.clientService.createWord(word).subscribe((response: any)=>{
                this.appComponent.alertWithSuccess("Create successfully");
              })
            }
          this.reset();
    }
    
  }
}
