import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Word } from 'src/app/model/word';
import { AdminComponent } from '../admin.component';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  wordList:Word[];
  word:any[];
  count_approved;
  count_user;
  count_not_approved;
  userList:any[];
  userName;
  constructor(private clientService: ClientService,private adminComponent: AdminComponent) { }

  ngOnInit(): void {
    this.clientService.getUser().subscribe((response: any)=>{
      this.userName=this.adminComponent.userName;
      this.userList=response.filter(s =>s._id!==this.adminComponent.idUser);
      this.count_user=this.userList.length;
      this.userList.sort((a, b) => {
        return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
      });
    });
    this.clientService.getWordL().subscribe((response: any)=>{
      this.wordList= response;
      this.word= this.wordList.filter(s => s.trang_thai==="Đã duyệt");
      this.count_approved=this.word.length;
      this.word= this.wordList.filter(s => s.trang_thai==="Chưa duyệt"||s.trang_thai==="Duyệt lại");
      this.count_not_approved=this.word.length;
    })
  }

}
