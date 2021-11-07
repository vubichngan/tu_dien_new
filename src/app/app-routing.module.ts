import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { AdminComponent } from './component/admin/admin.component';
import { HomeComponent } from './component/home/home.component'; 
import { LoginComponent } from './component/login/login.component';
import { ManageComponent } from './component/manage/manage.component';
import { RegisterComponent } from './component/register/register.component';
import { UserComponent } from './component/user/user.component';
import { NewWordComponent } from './component/user/new-word/new-word.component';
import { EditWordComponent } from './component/user/edit-word/edit-word.component';
import { ListWordComponent} from './component/user/list-word/list-word.component';
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


const routes: Routes = [
  {path:'', redirectTo: '/home/search', pathMatch: 'full'},
  {path:'home', component: HomeComponent, children:[
    {path:'detail', component: DetailWordComponent},
    {path:'search', component: SearchComponent}]},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'admin', component: AdminComponent, canActivate: [AuthGuard], children:[
    {path:'list-user', component: ListUserComponent},
    {path:'aapproved', component: AApprovedComponent},
    {path:'anapproved', component: ANeetApprovedComponent},
    {path:'admin-home', component: AdminHomeComponent},
  ]},
  {path:'manage', component: ManageComponent, canActivate: [AuthGuard], children:[
    {path:'mapproved', component: MApprovedComponent},
    {path:'napproved', component: NeetToBeApprovedComponent},
    {path:'user', component: UserResComponent},
    {path:'manage-home', component: ManageHomeComponent},
    {path:'re-approval', component: ReApprovalComponent},
  ]},
  {path:'user', component: UserComponent, canActivate: [AuthGuard], children:[
    {path:'new-word', component: NewWordComponent},
    {path:'edit-word', component: EditWordComponent},
    {path:'user-home', component: UserHomeComponent},
    {path:'list-word', component: ListWordComponent, children:[
      {path:'notApprovedYet', component: NotApprovedYetComponent},
      {path:'approved', component: ApprovedComponent},
      {path:'unapproved', component: UnapprovedComponent},
    ]},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
