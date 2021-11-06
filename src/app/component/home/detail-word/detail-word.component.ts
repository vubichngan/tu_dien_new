import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/model/word';
import { ClientService } from 'src/app/service/client.service';
import { HomeComponent } from '../home.component';
@Component({
  selector: 'app-detail-word',
  templateUrl: './detail-word.component.html',
  styleUrls: ['./detail-word.component.css']
})
export class DetailWordComponent implements OnInit {

  word:Word;
  wordListFilter;
  wordSearch:String;
  constructor(private clientService: ClientService,private homeComponent: HomeComponent) { }

  ngOnInit(): void {
    this.setWord();
  }

  setWord(){
    this.clientService.getWordL().subscribe((response: any)=>{
      this.word= response.filter(s => s._id==this.homeComponent.id);
      this.wordListFilter=this.word;
    })
  }
  
  getWordId(id){
    this.homeComponent.getWordId(id);
    this.setWord();
  }
    searchWord(text:any){
    this.homeComponent.searchWord(text);
    }
}
