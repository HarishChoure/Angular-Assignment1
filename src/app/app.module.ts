import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewComponent } from './view/view.component';



const appRout: Routes = [
  
  { path: 'Add-user', component: AddUserComponent },
  { path : 'view-user', component:ViewComponent},
  { path:'',component:ViewComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    ViewComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRout)
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
