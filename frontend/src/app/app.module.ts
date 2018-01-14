import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchToolboxComponent } from './search-toolbox/search-toolbox.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { CourseService } from './services/course.service';
import { ModalComponent } from './modal/modal.component';
import { LoginComponent } from './login/login.component';
import { CourseAddComponent } from './courses/course-add/course-add.component';
import { DateInputComponent } from './inputs/date-input/date-input.component';
import { DurationInputComponent } from './inputs/duration-input/duration-input.component';
import { AuthorsComponentComponent } from './inputs/authors-component/authors-component.component';
import { HoursPipe } from './pipes/hours.pipe';
import { OrderByPipe } from './pipes/orderBy.pipe';
import { AuthService } from './services/auth.service';
import { LoaderService } from './services/loader.service';
import { BorderColorDirective } from './directives/border-color.directive';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchToolboxComponent,
    CoursesListComponent,
    CourseDetailComponent,
    ModalComponent,
    LoginComponent,
    CourseAddComponent,
    DateInputComponent,
    DurationInputComponent,
    AuthorsComponentComponent,
    HoursPipe,
    OrderByPipe,
    BorderColorDirective,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    CourseService,
    AuthService,
    LoaderService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
