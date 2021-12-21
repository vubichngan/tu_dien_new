import { Component, OnInit } from '@angular/core';
import { ListWordComponent } from '../list-word.component';
import { Word } from 'src/app/model/word';
import { ClientService } from 'src/app/service/client.service';
import { UserComponent } from '../../user.component';
import { Observable, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-not-approved-yet',
  templateUrl: './not-approved-yet.component.html',
  styleUrls: ['./not-approved-yet.component.css']
})
export class NotApprovedYetComponent implements OnInit {
  private updateSubscription: Subscription;
  search='';
  wordListFilter:any[];
  wordList:Word[];
  checkedUserList:any;
  isDisableBtn:boolean;
  isSelected:boolean;
  p: number = 1;
  btnSua:boolean;
  constructor(private listWordComponent: ListWordComponent,private clientService: ClientService,private userComponent: UserComponent) { }

   ngOnInit(): void {
    this.userComponent.backEdit();
    this.listWordComponent.trang_thai=s => s.trang_thai==='Chưa duyệt'||s.trang_thai==='Duyệt lại';
    this.listWordComponent.reset(this);
    this.updateSubscription = interval(30000).subscribe(
      (val) => { this.listWordComponent.trang_thai=s => s.trang_thai==='Chưa duyệt'||s.trang_thai==='Duyệt lại';
        this.listWordComponent.reset(this);
      }
    );
  }

  

  getWordId(word){
    this.listWordComponent.getWordId(word,this);
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

  onKey(event: any){
    this.listWordComponent.onKey(event,this);
  }

  updateWordList(){
    this.listWordComponent.confirmDeleteWordList(this);
  }

}
