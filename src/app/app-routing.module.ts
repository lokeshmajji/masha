import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BlogComponent } from './blog/blog.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth-guard.component';
import { AddBlogComponent } from './blog/add-blog/add-blog.component';


const routes: Routes = [
   { path : '' , redirectTo: '/home' , pathMatch : 'full'},
   { path : 'home', component: HomeComponent , canActivate :[AuthGuard]},
   { path : 'blog' , component: BlogComponent , canActivate :[AuthGuard], 
     children : [
       { path : 'add', component: AddBlogComponent }
     ]},
   { path : 'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
