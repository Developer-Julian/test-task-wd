import { ShortUrlGrid } from './../../../interfaces/short-url-grid.interface';
import { ShortenUrlModel } from './../../../models/shorten-url.model';
import { HttpProxyShortenUrlService } from './../../../services/http-proxy-shorten-url.service';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-link-table',
  templateUrl: './link-table.component.html',
  styleUrls: ['./link-table.component.less'],
})
export class LinkTableComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;
  @ViewChild(MatSort) sort: MatSort = {} as MatSort;
  private unsubscribe$: Subject<void> = new Subject<void>();
  public displayedColumns: string[] = [
    'shortUrl',
    'fullUrl',
    'urlClickCount',
    'delete',
  ];
  public length = 0;
  public pageSize = 10;
  public dataSource = new MatTableDataSource<ShortenUrlModel>();
  public shortenUrls: ShortenUrlModel[] = [];
  private sortState: Sort = {} as Sort;
  private paginatorState: PageEvent = {
    pageIndex: 0,
    length: 0,
  } as PageEvent;
  constructor(private readonly httpProxy: HttpProxyShortenUrlService) {}

  public ngOnInit() {
    this.loadUserUrls();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
          this.updateDataSource();
        },
        () => {}
      );
  }

  public sortChange(sortState: Sort): void {
    this.sortState = sortState;
    this.paginator.firstPage();
    this.loadUserUrls();
  }

  public changePaginator(paginatorState: PageEvent): void {
    this.paginatorState = paginatorState;
    this.pageSize = this.paginatorState.pageSize;
    this.loadUserUrls();
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
          this.updateDataSource();
        },
        () => {}
      );
  }

  private loadUserUrls(): void {
    this.httpProxy
      .getUserLinks(
        '',
        this.sortState.active,
        this.sortState.direction,
        this.pageSize * this.paginatorState.pageIndex,
        this.pageSize
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (x: ShortUrlGrid) => {
          this.shortenUrls = x.shortenUrls;
          this.length = x.total;
          this.updateDataSource();
        },
        () => {}
      );
  }

  private updateDataSource(): void {
    this.dataSource = new MatTableDataSource<ShortenUrlModel>(this.shortenUrls);
    this.dataSource.sort = this.sort;
  }
}
