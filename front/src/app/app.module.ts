import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";
import {FeedComponent} from "./pages/feed/feed.component";
import {MatSelectModule} from "@angular/material/select";
import {PostFormComponent} from "./pages/post/form/post.form.component";
import {PostDetailsComponent} from "./pages/post/details/post.details.component";
import {ThemeListComponent} from "./pages/theme/list/theme.list.component";
import {SubscriptionListComponent} from "./pages/subscription/subscription.list.component";
import {CommentComponent} from "./pages/post/comment/comment.component";
import {MeComponent} from "./pages/me/me.component";
import {CommentListComponent} from "./pages/post/comment/list/comment.list.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FeedComponent,
    PostFormComponent,
    PostDetailsComponent,
    ThemeListComponent,
    SubscriptionListComponent,
    CommentComponent,
    MeComponent,
    CommentListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
