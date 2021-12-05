import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Word } from 'src/app/model/word';
import { ClientService } from 'src/app/service/client.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  search;
  constructor(private clientService: ClientService,private router: Router) { }

  ngOnInit(): void {
    this.search=null;
  }

  getWordId(id){
    this.router.navigate([ '/home/detail',id ]);
  }

  searchWord(text:any){
    this.search=text;
  }
  reset(component){
    console.log(this.search);
    // if(this.homeComponent.search==""||this.homeComponent.search==" "||this.homeComponent.search==null){
      this.clientService.getWord().subscribe((response: any)=>{
        component.wordList=response.filter(s => s.trang_thai==="Đã duyệt");
        component.wordListFilter= component.wordList;
        console.log(component.wordListFilter);
        });
    // }else {
      if(this.search){
        component.wordSearch=this.search;
        this.clientService.getWord().subscribe((response: any)=>{
          component.wordList=response.filter(s => s.trang_thai==="Đã duyệt");
          component.searchW(component.wordSearch);
        });
      }
      
    // }
  }
  
}
