import { HttpProxyShortenUrlService } from './services/http-proxy-shorten-url.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HttpClientXsrfModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpProxyInterceptorService } from './services/http-proxy-interseptor.service';
import { AppRoutingModule } from './app-routing.module';
import { TranslocoRootModule } from './transloco-root.module';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    TranslocoRootModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
  ],
  providers: [
    HttpClient,
    HttpProxyShortenUrlService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpProxyInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
