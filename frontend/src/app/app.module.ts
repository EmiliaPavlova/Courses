import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { FormsService } from './services/forms.service';
import { HoursPipe } from './pipes/hours.pipe';
import { OrderByPipe } from './pipes/orderBy.pipe';
import { BorderColorDirective } from './directives/border-color.directive';
import { Interceptor } from './login/interceptor';
import { AppRoutingModule } from './routing/app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';

export function getToken() {
  return localStorage.getItem('access_token');
 }

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
    PaginationComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: ['localhost:4200']
      }
    })
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
    },
    AuthGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
