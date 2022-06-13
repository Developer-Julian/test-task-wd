import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShortUrlGrid } from '../interfaces/short-url-grid.interface';

@Injectable()
export class HttpProxyShortenUrlService {
  private readonly apiBase: string = '/short-url/short';
  constructor(private http: HttpClient) {}

  public addBatchOfLinks(urls: string[]): Observable<ShortUrlGrid> {
    return this.http.post<ShortUrlGrid>(`${this.apiBase}`, {
      fullUrls: urls.map((x) => {
        return {
          url: x,
        };
      }),
    });
  }

  public getUserLinks(
    filterText: string,
    sort: string,
    sortDirection: string,
    skip: number,
    take: number
  ): Observable<ShortUrlGrid> {
    return this.http.get<ShortUrlGrid>(
      `${this.apiBase}?filterText=${filterText}&sort=${sort}&sortDirection=${sortDirection}&skip=${skip}&take=${take}`
    );
  }

  public deleteLink(urlHash: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBase}/${urlHash}`);
  }

  public clickLink(urlHash: string): Observable<number> {
    return this.http.put<number>(`${this.apiBase}/${urlHash}`, {});
  }
}
