import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpProxyShortenUrlService } from './../../services/http-proxy-shorten-url.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
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
    const component = new HomeComponent(service);
    expect(component).toBeTruthy();
  });
});
