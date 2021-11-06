import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Word } from 'src/app/model/word';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  id;
  search;
  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.search=null;
  }

  getWordId(id){
    this.id=id;
  }

  searchWord(text:any){
    this.search=text;
  }

  
}
