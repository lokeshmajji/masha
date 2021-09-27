import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { MaterialModule} from './material.module'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BlogComponent } from './blog/blog.component';
import { AuthComponent } from './auth/auth.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AddBlogComponent } from './blog/add-blog/add-blog.component';

import { QuillModule } from 'ngx-quill'


import { EditorModule} from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewBlogComponent } from './blog/view-blog/view-blog.component';
import { EditBlogComponent } from './blog/edit-blog/edit-blog.component';
import { ViewSingleComponent } from './blog/view-single/view-single.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { NgxEditorModule } from 'ngx-editor';
import { EditBlogNewComponent } from './timelineview/edit-blog-new/edit-blog-new.component';
import { TimeLineViewComponent } from './timelineview/timeline-view/timeline-view.component';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { AddBlogNewComponent } from './timelineview/add-blog-new/add-blog-new.component';
import { TimelineView2Component } from './timelineview2/timeline-view2/timeline-view2.component';
import { TimelineView3Component } from './timelineview3/timeline-view3/timeline-view3.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BlogComponent,
    AuthComponent,
    SpinnerComponent,
    HomeComponent,
    AddBlogComponent,
    ViewBlogComponent,
    EditBlogComponent,
    ViewSingleComponent,
    ConfirmDialogComponent,
    TimeLineViewComponent,
    EditBlogNewComponent,
    AddBlogNewComponent,
    TimelineView2Component,
    TimelineView3Component,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    EditorModule,
    BrowserAnimationsModule,
    TableModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
    QuillModule.forRoot(),
    MaterialModule,
    ReactiveFormsModule,
    NgxEditorModule,
    HighlightModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js'),
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
