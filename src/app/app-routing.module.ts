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
import { TimeLineViewComponent } from "./timelineview/timeline-view/timeline-view.component";
import { EditBlogNewComponent } from "./timelineview/edit-blog-new/edit-blog-new.component";
import { AddBlogNewComponent } from "./timelineview/add-blog-new/add-blog-new.component";
import { TimelineView2Component } from "./timelineview2/timeline-view2/timeline-view2.component";

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
  { path: "timelineview", component: TimeLineViewComponent, canActivate: [AuthGuard] },
  { path: "add", component: AddBlogNewComponent , canActivate: [AuthGuard]  },
  { path: "edit", component: EditBlogNewComponent, canActivate: [AuthGuard] },
  { path: "timelineview2", component: TimelineView2Component, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
