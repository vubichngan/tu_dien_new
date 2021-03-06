import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Word } from 'src/app/model/word';
import { AppComponent } from 'src/app/app.component';
import { FormGroup,FormControl ,Validators} from '@angular/forms';
import { ActivatedRoute, Params,Router} from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  
  
  // form: FormGroup;
  userName;
  wordL;
  idWordEdit;
  trangthai;
  tulq;
  idUser;
  imgData:String;
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = []; 
  constructor(private clientService: ClientService, private appComponent: AppComponent,private route: ActivatedRoute,private router: Router) {
  }


  ngOnInit(): void {
    this.appComponent.jquery();
    this.appComponent.getUser(this);
  }
  newForm(form){
    form.form= form.fb.group({
      tu_en:["",Validators.required],
      tu_loai:["Noun",Validators.required],
      phien_am:[""],
      nghia_en:[""],
      nghia_vi:["",Validators.required],
      tu_lienquan: form.fb.array([]),
      anh: form.fb.control(null),
    })
  }

  removeTu_lienquan(i:number,form) {
    form.tu_lienquan.removeAt(i);
  }  

  addTu_lienquan(form){
    const t=form.fb.group({
      tu_en:["",Validators.required]
    })
    form.tu_lienquan.push(t);
  }
  
  onLogout(){
    this.appComponent.onLogout(this);
  }
  
  onFileSelect(event: Event,form){
    const file=(event.target as HTMLInputElement).files[0];
    form.form.patchValue({anh:file});
    const allowedMimeTypes=["image/png","image/jpeg","image/jpg"];
    if(file && allowedMimeTypes.includes(file.type)){
      const reader = new FileReader();
      reader.onload=()=>{
        form.imgData=reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  formChangePassword(){
    this.appComponent.formChangePassword(this,this.idUser,this.userName);
  }


 async backEdit(){
  if(this.idWordEdit&&this.trangthai){
    var words =new Word();
      words.tu_lienquan=this.tulq;
      words._id=this.idWordEdit;
      words.trang_thai=this.trangthai;
      console.log(words);
      this.clientService.updateWord(this.idWordEdit,words).toPromise();
      this.trangthai=null;
      this.idWordEdit=null;
  }
 }

}
