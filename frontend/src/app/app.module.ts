import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchToolboxComponent } from './search-toolbox/search-toolbox.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { ModalComponent } from './modal/modal.component';
import { LoginComponent } from './login/login.component';
import { CourseAddComponent } from './courses/course-add/course-add.component';
import { DateInputComponent } from './inputs/date-input/date-input.component';
import { DurationInputComponent } from './inputs/duration-input/duration-input.component';
import { AuthorsComponentComponent } from './inputs/authors-component/authors-component.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CourseService } from './services/course.service';
import { LoaderService } from './services/loader.service';
import { AuthService } from './services/auth.service';
import { FormsService } from './services/forms.service';
import { HoursPipe } from './pipes/hours.pipe';
import { OrderByPipe } from './pipes/orderBy.pipe';
import { BorderColorDirective } from './directives/border-color.directive';
import { Interceptor } from './login/interceptor';

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
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CourseService,
    AuthService,
    LoaderService,
    FormsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
