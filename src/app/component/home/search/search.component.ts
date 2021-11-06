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
  wordListFilter:any[];
  wordSearch:String;
  isHide:boolean;
  search;
  abc: Array<any>;
  p: number = 1;
  constructor(private clientService: ClientService,private homeComponent: HomeComponent) { }

  ngOnInit(): void {
    this.reset();
    this.abc=["A","B","C","D","E","F","G","H","I","G","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  }

  getWordId(id){
    this.homeComponent.getWordId(id);
  }

  searchA_Z(a){
    this.clientService.getSearch(a).subscribe((response: any)=>{
      this.wordList=response.filter(s => s.trang_thai==="Đã duyệt");
      this.wordListFilter= this.wordList;
      });
  }

  reset(){
    if(this.homeComponent.search==""||this.homeComponent.search==" "||this.homeComponent.search==null){
      this.clientService.getWord().subscribe((response: any)=>{
        this.wordList=response.filter(s => s.trang_thai==="Đã duyệt");
        this.wordListFilter= this.wordList;
        });
    }else {
      this.wordSearch=this.homeComponent.search;
      this.clientService.getWord().subscribe((response: any)=>{
        this.wordList=response.filter(s => s.trang_thai==="Đã duyệt");
        this.wordListFilter= this.wordList.filter(
          s => s.tu_en.toLowerCase().indexOf(this.wordSearch.toLowerCase())!==-1||
          s.nghia_en.toLowerCase().indexOf(this.wordSearch.toLowerCase())!==-1||
          s.nghia_vi.toLowerCase().indexOf(this.wordSearch.toLowerCase())!==-1
        );
      });
    }
  }

  onKey(event){
    this.search = event.target.value;
    if(this.search===""){
      this.wordListFilter=this.wordList;
    }else{
      this.wordListFilter= this.wordList.filter(s => s.tu_en.toLowerCase().indexOf(this.search.toLowerCase())!==-1||
      s.nghia_en.toLowerCase().indexOf(this.search.toLowerCase())!==-1||
      s.nghia_vi.toLowerCase().indexOf(this.search.toLowerCase())!==-1
      );
    }
  }
}
