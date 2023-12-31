import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PicoPreviewComponent } from './components/pico-preview/pico-preview.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { PersonComponent } from './components/person/person.component';
import { PersonsComponent } from './components/persons/persons.component';
import { PeopleComponent } from './components/people/people.component';
import { OthersComponent } from './components/others/others.component';

import { SharedModule } from './shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';


@NgModule({
  declarations: [
    AppComponent,
    PicoPreviewComponent,
    PersonComponent,
    PersonsComponent,
    PeopleComponent,
    OthersComponent,
    FooterComponent,
    BannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
