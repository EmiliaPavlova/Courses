import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux } from 'ng2-redux';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { AuthorsComponentComponent } from './inputs/authors-component/authors-component.component';
import { AuthActions } from './store/auth.actions';
import { AuthService } from './services/auth.service';
import { BorderColorDirective } from './directives/border-color.directive';
import { CourseActions } from './store/course.actions';
import { CourseAddComponent } from './courses/course-add/course-add.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { CourseService } from './services/course.service';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { DateInputComponent } from './inputs/date-input/date-input.component';
import { DurationInputComponent } from './inputs/duration-input/duration-input.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HoursPipe } from './pipes/hours.pipe';
import { Interceptor } from './login/interceptor';
import { LoaderService } from './services/loader.service';
import { LoginComponent } from './login/login.component';
import { ModalComponent } from './modal/modal.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrderByPipe } from './pipes/orderBy.pipe';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchToolboxComponent } from './search-toolbox/search-toolbox.component';
import { store, AppState } from './store';

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
    NgReduxModule,
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    AuthGuard,
    CourseActions,
    AuthActions,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor(ngRedux: NgRedux<AppState>) {
    ngRedux.provideStore(store);
  }
}
