import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import {FeedComponent} from "./pages/feed/feed.component";
import {PostFormComponent} from "./pages/post/form/post.form.component";
import {PostDetailsComponent} from "./pages/post/details/post.details.component";
import {MeComponent} from "./pages/me/me.component";
import {ThemeListComponent} from "./pages/theme/list/theme.list.component";

// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'article', component: PostFormComponent },
  { path: 'article/:id/details', component: PostDetailsComponent },
  { path: 'me', component: MeComponent },
  { path: 'themes', component: ThemeListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
