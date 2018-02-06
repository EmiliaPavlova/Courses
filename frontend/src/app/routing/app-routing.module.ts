import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesListComponent } from '../courses/courses-list/courses-list.component';
import { CourseAddComponent } from '../courses/course-add/course-add.component';
import { CourseDetailComponent } from '../courses/course-detail/course-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full'},
  { path: 'courses', component: CoursesListComponent },
  { path: 'courses/new', component: CourseAddComponent },
  { path: 'courses/:id', component: CourseDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
