import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/model/word';
import { ClientService } from 'src/app/service/client.service';
import { ManageComponent } from '../manage.component';


@Component({
  selector: 'app-m-approved',
  templateUrl: './m-approved.component.html',
  styleUrls: ['./m-approved.component.css']
})
export class MApprovedComponent implements OnInit {

  wordList:Word[];
  wordListFilter:any[];
  p: number = 1;
  search='';
  constructor(private clientService: ClientService,private manageComponent:ManageComponent) { }

  ngOnInit(): void {
    this.clientService.getWordL().subscribe((response: any)=>{
      this.wordList= response.filter(s => s.trang_thai==="Đã duyệt");
      this.wordList= this.wordList.filter(s => s.nguoi_duyet===this.manageComponent.userName);
      this.wordListFilter=this.wordList;
    })
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
