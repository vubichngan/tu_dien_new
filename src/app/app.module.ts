import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';

import { ClientService } from './service/client.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './component/user/user.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { AdminComponent } from './component/admin/admin.component';
import { RegisterComponent } from './component/register/register.component';
import { ManageComponent } from './component/manage/manage.component';
import { NewWordComponent } from './component/user/new-word/new-word.component';
import { EditWordComponent } from './component/user/edit-word/edit-word.component';
import { ListWordComponent } from './component/user/list-word/list-word.component';
import { NotApprovedYetComponent } from './component/user/list-word/not-approved-yet/not-approved-yet.component';
import { ApprovedComponent } from './component/user/list-word/approved/approved.component';
import { UnapprovedComponent } from './component/user/list-word/unapproved/unapproved.component';
import { MApprovedComponent} from './component/manage/m-approved/m-approved.component';
import { NeetToBeApprovedComponent} from './component/manage/neet-to-be-approved/neet-to-be-approved.component';
import { ListUserComponent } from './component/admin/list-user/list-user.component';
import { ANeetApprovedComponent } from './component/admin/a-neet-approved/a-neet-approved.component';
import { AApprovedComponent } from './component/admin/a-approved/a-approved.component';
import { UserResComponent } from './component/manage/user-res/user-res.component';
import { SearchComponent } from './component/home/search/search.component';
import { DetailWordComponent } from './component/home/detail-word/detail-word.component';
import { ReApprovalComponent } from './component/manage/re-approval/re-approval.component';
import { UserHomeComponent } from './component/user/user-home/user-home.component';
import { ManageHomeComponent } from './component/manage/manage-home/manage-home.component';
import { AdminHomeComponent } from './component/admin/admin-home/admin-home.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    RegisterComponent,
    ManageComponent,
    NewWordComponent,
    EditWordComponent,
    ListWordComponent,
    NotApprovedYetComponent,
    ApprovedComponent,
    UnapprovedComponent,
    MApprovedComponent,
    NeetToBeApprovedComponent,
    ListUserComponent,
    ANeetApprovedComponent,
    AApprovedComponent,
    UserResComponent,
    SearchComponent,
    DetailWordComponent,
    ReApprovalComponent,
    UserHomeComponent,
    ManageHomeComponent,
    AdminHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true
  },ClientService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
