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
import {AuthGuard} from "./guards/auth.guard";
import {UnauthGuard} from "./guards/unauth.guard";
import {NotFoundComponent} from "./pages/not-found/not-found.component";

// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'feed',
    canActivate: [AuthGuard],
    component: FeedComponent },
  { path: 'article',
    canActivate: [AuthGuard],
    component: PostFormComponent },
  { path: 'article/:id/details',
    canActivate: [AuthGuard],
    component: PostDetailsComponent },
  { path: 'me',
    canActivate: [AuthGuard],
    component: MeComponent },
  { path: 'themes',
    canActivate: [AuthGuard],
    component: ThemeListComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
