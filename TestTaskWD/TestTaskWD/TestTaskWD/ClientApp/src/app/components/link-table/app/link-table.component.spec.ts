import { HttpProxyShortenUrlService } from './../../../services/http-proxy-shorten-url.service';
import { LinkTableComponent } from './link-table.component';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

describe('LinkTableComponent', () => {
  let service: HttpProxyShortenUrlService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    service = new HttpProxyShortenUrlService(httpClient);
  });

  it('should create', () => {
    const component = new LinkTableComponent(service);
    expect(component).toBeTruthy();
  });
});
