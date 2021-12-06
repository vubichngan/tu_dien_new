import { Component, OnInit } from '@angular/core';
import { ListWordComponent } from '../list-word.component';
import { Word } from 'src/app/model/word';
import { ClientService } from 'src/app/service/client.service';
import { UserComponent } from '../../user.component';

@Component({
  selector: 'app-unapproved',
  templateUrl: './unapproved.component.html',
  styleUrls: ['./unapproved.component.css']
})
export class UnapprovedComponent implements OnInit {

  search='';
  wordList:Word[];
  wordListFilter:any[];
  checkedUserList:any;
  isDisableBtn:boolean;
  isSelected:boolean;
  p: number = 1;
  constructor(private listWordComponent: ListWordComponent,private clientService: ClientService,private userComponent: UserComponent) { }

  ngOnInit(): void {
    this.userComponent.backEdit();
    this.listWordComponent.trang_thai=s => s.trang_thai==="Từ chối";
    this.listWordComponent.reset(this);
  }


  getWordId(id: String,trang_thai){
    this.listWordComponent.getWordId(id,trang_thai,this);
  }

  checkUncheckAll() {
    this.listWordComponent.checkUncheckAll(this);
  }

  isAllSelected(){
    this.listWordComponent.isAllSelected(this);
  }

  getCheckedItemList(){
    this.listWordComponent.getCheckedItemList(this);
  }

  deleteWord(id){
    this.listWordComponent.confirmDialogDelete(id, this);
  }

  deleteWordList(){
    this.listWordComponent.confirmDeleteWordList(this);
  }

  onKey(event: any){
    this.listWordComponent.onKey(event,this);
  }
}
