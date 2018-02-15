import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { CoursesListComponent } from '../courses/courses-list/courses-list.component';
import { CourseAddComponent } from '../courses/course-add/course-add.component';
import { LoginComponent } from '../login/login.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { AuthGuardService as AuthGuard } from '../services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full'},
  { path: 'courses', component: CoursesListComponent, canActivate: [AuthGuard] },
  { path: 'courses/new', component: CourseAddComponent, canActivate: [AuthGuard] },
  { path: 'courses/:id', component: CourseAddComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
