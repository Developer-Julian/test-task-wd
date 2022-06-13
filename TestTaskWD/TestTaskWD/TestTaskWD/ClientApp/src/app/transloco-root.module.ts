import { HttpClient } from '@angular/common/http';
import {
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule,
  HashMap,
} from '@ngneat/transloco';
import { Injectable, NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { forkJoin, Observable, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';

const localizationUrl = '/ControlPanel/GetLocalization';
const LOCALIZATION_FILE_PATH = ['ControlPanel/ControlPanel'];

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    const loadObservables = LOCALIZATION_FILE_PATH.map((item: string) =>
      getFileLoader(this.http, localizationUrl, `${item}.`)
    );

    const result = forkJoin(loadObservables).pipe(
      map((results: HashMap<any>[]) => {
        return results.reduce((accumulator, currentValue) => {
          return merge([accumulator, currentValue]);
        }, {});
      })
    );

    return result;
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: [
          'en',
          'de',
          'en-AU',
          'en-GB',
          'fr-CA',
          'it',
          'ja',
          'nl',
        ],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: environment.production,
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
  ],
})
export class TranslocoRootModule {}

function getFileLoader(
  http: HttpClient,
  url: string,
  resourcePath: string
): Observable<Translation> {
  return new Observable<Translation>((observer: Subscriber<HashMap<any>>) => {
    http.post<Translation>(url, { resourcePath }).subscribe(
      (data: HashMap<any>) => {
        observer.next(data);
        observer.complete();
      },
      () => {
        observer.next({});
        observer.complete();
      }
    );
  });
}

function merge(objects: any[]): any {
  const target = {} as any;
  // Merge the object into the target object
  const merger = (obj: any) => {
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
          // If we're doing a deep merge
          // and the property is an object
          target[prop] = merge([target[prop], obj[prop]]);
        } else {
          // Otherwise, do a regular merge
          target[prop] = obj[prop];
        }
      }
    }
  };

  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < objects.length; i++) {
    merger(objects[i]);
  }

  return target;
}
