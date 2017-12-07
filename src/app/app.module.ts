import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchToolboxComponent } from './search-toolbox/search-toolbox.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { CourseService } from './services/course.service';
import { HoursPipe } from './pipes/hours.pipe';
import { ModalComponent } from './modal/modal.component';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { BorderColorDirective } from './directives/border-color.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchToolboxComponent,
    CoursesListComponent,
    CourseDetailComponent,
    HoursPipe,
    ModalComponent,
    LoginComponent,
    BorderColorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    CourseService,
    AuthService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
