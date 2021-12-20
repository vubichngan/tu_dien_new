import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Word } from 'src/app/model/word';
import { AppComponent } from 'src/app/app.component';
import { UserComponent } from '../user.component';
import { FormGroup, FormControl,FormBuilder,Validators,FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-edit-word',
  templateUrl: './edit-word.component.html',
  styleUrls: ['./edit-word.component.css']
})
export class EditWordComponent implements OnInit {

  form:FormGroup;
  imgData: string;
  undefined;
  id;
  img;
  comment;
  wordList:Word[];
  wordListFilter:any[];
  constructor(private router: Router,private route: ActivatedRoute,private fb: FormBuilder,private clientService: ClientService,private appComponent: AppComponent,private userComponent: UserComponent) { }

  ngOnInit(): void {
    this.userComponent.newForm(this);
    this.setWord();
  }

  get(){
      this.wordListFilter= this.wordList.filter(s => s.trang_thai==="Đã duyệt");
      this.wordListFilter= this.wordListFilter.filter(s => s._id!==this.id);
  }

  onFileSelect(event: Event){
    this.userComponent.onFileSelect(event,this);
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

  setWord(){
    this.route.params.subscribe(
      (params: Params) => {
        if (params.id) {
          this.id=params.id;
          this.undefined=this.imgData;
          var word= new Word();
          this.clientService.getWord().subscribe((response: any)=>{
            this.wordList=response;
            word= response.filter(s => s._id==params.id);
            this.comment=word[0].ghi_chu;
            this.img=word[0].anh;
            this.imgData=word[0].anh;
            this.form= this.fb.group({
              tu_en:[word[0].tu_en,Validators.required],
              tu_loai:[word[0].tu_loai,Validators.required],
              phien_am:[word[0].phien_am],
              nghia_en:[word[0].nghia_en],
              nghia_vi:[word[0].nghia_vi,Validators.required],
              tu_lienquan: this.fb.array([]),
              anh: [word[0].anh],
              trang_thai:[word[0].trang_thai],
            }) 
            for(var i=0; i<word[0].tu_lienquan.length;i++){
              const t=this.fb.group({
                tu_en:[word[0].tu_lienquan[i].tu_en,Validators.required],
              })
              this.tu_lienquan.push(t);
            }
            this.get();
          })
        } 
      }
    )
    
  }

async  updateWord(){
  var words =new Word();
    var t: Array<any> = []; 
    var w:any[];
    words=this.form.value;
    words.tu_lienquan.forEach(element=>{
      w=this.wordListFilter.filter(s => s.tu_en.toString()===element.tu_en.toString())
      if(w.length==0){
        t.push(element.tu_en);
      }
    })
    if(t.length!=0){
        Swal.fire({
          title:'Thêm không thành công',
          icon: 'error',
          text:'Từ '+t+' không có trong danh sách từ đã duyệt. Hãy thêm từ '+ t +' vào danh sách của bạn.'
        })
    }else{
      var profileData = new FormData();
      if(this.form.value.anh!=this.undefined){
        if(this.form.value.anh!=this.img){
          profileData.append("_id", this.id);
          profileData.append("anh", this.form.value.anh, this.form.value.anh.name);
        var p= await this.clientService.updateImg(this.id,profileData).toPromise();
        }
      }else words.anh=null;
      words._id=this.id;
      if(words.trang_thai=="Từ chối"){
        words.trang_thai="Duyệt lại";
      }
      this.userComponent.trangthai=null;
      words.trang_thai="Chưa duyệt";
      this.clientService.updateWord(this.id,words).subscribe(response=>{
        this.appComponent.alertWithSuccess("Sửa thành công");
        if(this.comment){
          this.router.navigateByUrl('/user/'+this.userComponent.userName+'/list-word/unapproved');
        } else this.router.navigateByUrl('/user/'+this.userComponent.userName+'/list-word/notApprovedYet');
      });
      
    }
    
  }
}
