import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { BlogComponent } from "./blog/blog.component";
import { AuthComponent } from "./auth/auth.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./auth/auth-guard.component";
import { AddBlogComponent } from "./blog/add-blog/add-blog.component";
import { ViewBlogComponent } from "./blog/view-blog/view-blog.component";
import { EditBlogComponent } from "./blog/edit-blog/edit-blog.component";
import { ViewSingleComponent } from "./blog/view-single/view-single.component";
import { TestVisComponent } from "./test-vis/test-vis.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: "blogs",
    component: BlogComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "add", component: AddBlogComponent },
      { path: "view", component: ViewBlogComponent },
      { path: "edit", component: EditBlogComponent },
      { path: "fullview", component: ViewSingleComponent },
    ],
  },
  { path: "auth", component: AuthComponent },
  { path: "test", component: TestVisComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
