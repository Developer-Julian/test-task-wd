import { LinkTableRouterComponent } from './link-table-router.component';
import { MaterialModule } from './../../material.module';
import { LinkTableRoutingModule } from './link-table-routing.module';
import { TranslocoRootModule } from './../../transloco-root.module';
import { HttpProxyShortenUrlService } from './../../services/http-proxy-shorten-url.service';
import { LinkTableComponent } from './app/link-table.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [LinkTableRouterComponent, LinkTableComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    LinkTableRoutingModule,
    TranslocoRootModule,
    MaterialModule,
  ],
  providers: [HttpClient, HttpProxyShortenUrlService],
  exports: [LinkTableComponent],
})
export class LinkTableModule {}
