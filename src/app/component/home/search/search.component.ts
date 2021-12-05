import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/model/word';
import { ClientService } from 'src/app/service/client.service';
import { HomeComponent } from '../home.component';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  wordList:Word[];
  wordList1:any[];
  wordListFilter:any[];
  wordSearch:String;
  isHide:boolean;
  arrayString:Array<any>;
  search:String;
  abc: Array<any>;
  p: number = 1;
  constructor(private clientService: ClientService,private homeComponent: HomeComponent) { }

  ngOnInit(): void {
    this.homeComponent.reset(this);
    this.abc=["A","B","C","D","E","F","G","H","I","G","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  }

  getWordId(id){
    this.homeComponent.getWordId(id);
  }

  searchA_Z(a){
    this.clientService.getSearch(a).subscribe((response: any)=>{
      this.wordListFilter=response.filter(s => s.trang_thai==="Đã duyệt");
      });
  }

  

 searchW(text:any){
  this.wordListFilter=[];
  this.arrayString= text.split(/\s+/);
  this.arrayString.forEach(element=>{
    this.wordList1= this.wordList.filter(s=>
      s.tu_en.toLowerCase().indexOf(element.toLowerCase())!==-1||
      s.nghia_en.toLowerCase().indexOf(element.toLowerCase())!==-1||
      s.nghia_vi.toLowerCase().indexOf(element.toLowerCase())!==-1
      );
     this.wordList1.forEach(el=>{
      this.wordListFilter.push(el);
     })
  })
  this.wordListFilter = this.wordListFilter.filter((item, index) => this.wordListFilter.indexOf(item) === index);
 }

  onKey(event){
    this.search = event.target.value;
    if(this.search===""){
      this.wordListFilter=this.wordList;
    }else{
      this.wordListFilter= this.wordList.filter(s => 
          s.tu_en.toLowerCase().indexOf(this.search.toLowerCase())!==-1||
          s.nghia_en.toLowerCase().indexOf(this.search.toLowerCase())!==-1||
          s.nghia_vi.toLowerCase().indexOf(this.search.toLowerCase())!==-1
      );
    }
  }
}
