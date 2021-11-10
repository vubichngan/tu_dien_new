import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/model/word';
import { ClientService } from 'src/app/service/client.service';
import { HomeComponent } from '../home.component';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-detail-word',
  templateUrl: './detail-word.component.html',
  styleUrls: ['./detail-word.component.css']
})
export class DetailWordComponent implements OnInit {

  word:Word;
  wordListFilter;
  wordSearch:String;
  constructor(private clientService: ClientService,private homeComponent: HomeComponent,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.setWord();
  }

  speak(text){
    var u = new SpeechSynthesisUtterance();
    u.text = text;
    u.lang = 'en-US';
    u.rate = 1.2;
    speechSynthesis.speak(u);
  }

  setWord(){
    this.route.params.subscribe(
      (params: Params) => {
        if (params.id) {
          this.clientService.getWordL().subscribe((response: any)=>{
            this.word= response.filter(s => s._id==params.id);
            this.wordListFilter=this.word;
          })
        } 
      }
    )
  }
  
  getWordId(id){
    this.homeComponent.getWordId(id);
    this.setWord();
  }
    searchWord(text:any){
    this.homeComponent.searchWord(text);
    }
}
