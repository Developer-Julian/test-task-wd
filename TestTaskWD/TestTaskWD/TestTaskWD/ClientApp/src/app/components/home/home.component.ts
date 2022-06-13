import { ShortUrlGrid } from './../../interfaces/short-url-grid.interface';
import { ShortenUrlModel } from './../../models/shorten-url.model';
import { HttpProxyShortenUrlService } from './../../services/http-proxy-shorten-url.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  private _showErrorBlock = new BehaviorSubject<boolean>(false);
  private readonly firstShowCount: number = 5;
  public showErrorBlock$: Observable<boolean> =
    this._showErrorBlock.asObservable();
  public shortenLinkForm: FormGroup = new FormGroup({
    shortenLink: new FormControl('', [
      Validators.pattern(
        '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
      ),
    ]),
  });
  public shortenUrls: ShortenUrlModel[] = [];

  constructor(private readonly httpProxy: HttpProxyShortenUrlService) {}

  public ngOnInit(): void {
    this.loadUserUrls();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public shortUrl(): void {
    if (
      !this.shortenLinkForm.get('shortenLink')?.value ||
      this.shortenLinkForm.get('shortenLink')?.invalid
    ) {
      this.showErrorBlock();
      return;
    }

    this.httpProxy
      .addBatchOfLinks([this.shortenLinkForm.get('shortenLink')?.value])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (x: ShortUrlGrid) => {
          if (this.firstShowCount > this.shortenUrls.length) {
            this.shortenUrls.unshift(x.shortenUrls[0]);
          }
        },
        () => {}
      );
  }

  public clickByUrl(urlHash: string): void {
    this.httpProxy
      .clickLink(urlHash)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (x: number) => {
          this.shortenUrls.filter(
            (v) => v.urlHash === urlHash
          )[0].urlClickCount = x;
        },
        () => {}
      );
  }

  public deleteUrl(urlHash: string): void {
    this.httpProxy
      .deleteLink(urlHash)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        () => {
          this.shortenUrls = this.shortenUrls.filter(
            (v) => v.urlHash !== urlHash
          );
        },
        () => {}
      );
  }

  private loadUserUrls(): void {
    this.httpProxy
      .getUserLinks('', 'createdon', 'asc', 0, this.firstShowCount)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (x: ShortUrlGrid) => {
          this.shortenUrls = x.shortenUrls;
        },
        () => {}
      );
  }

  private showErrorBlock(): void {
    this._showErrorBlock.next(true);
    setTimeout(() => this._showErrorBlock.next(false), 3000);
  }
}
