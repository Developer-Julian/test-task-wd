import { ShortUrlGrid } from './../../../interfaces/short-url-grid.interface';
import { LinkTableModule } from './../link-table.module';
import { LinkTableComponent } from './link-table.component';

import { ShortenUrlModel } from './../../../models/shorten-url.model';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { rest } from 'msw';
import { RouterTestingModule } from '@angular/router/testing';

export default {
  component: LinkTableComponent,
  decorators: [
    moduleMetadata({
      imports: [LinkTableModule, RouterTestingModule],
    }),
  ],
  excludeStories: /.*Data$/,
  title: 'UrlShortenerTable',
} as Meta;
const mockUrlData = [
  {
    fullUrl: 'https://example.com/adst/sa/sdss/d3222/ssfa',
    shortUrl: 'https://twd.com/esfe443rfsfds',
    urlClickCount: 10,
    urlHash: 'esfe443rfsfds',
  } as ShortenUrlModel,
  {
    fullUrl: 'https://example.com/adst/sa/sdss/d3222/sssfa',
    shortUrl: 'https://twd.com/esfer43rfsfds',
    urlClickCount: 2,
    urlHash: 'esfer43rfsfds',
  } as ShortenUrlModel,
  {
    fullUrl: 'https://example.com/adst/sa/sdss/d3222/s2sfa',
    shortUrl: 'https://twd.com/esft443rfsfds',
    urlClickCount: 3,
    urlHash: 'esft443rfsfds',
  } as ShortenUrlModel,
  {
    fullUrl: 'https://example.com/adst/sa/sdss/d3222/s1sfa',
    shortUrl: 'https://twd.com/esfg443rfsfds',
    urlClickCount: 4,
    urlHash: 'esfg443rfsfds',
  } as ShortenUrlModel,
  {
    fullUrl: 'https://example.com/adst/sa/sdss/d3222/ss3fa',
    shortUrl: 'https://twd.com/esfez43rfsfds',
    urlClickCount: 5,
    urlHash: 'esfez43rfsfds',
  } as ShortenUrlModel,
  {
    fullUrl: 'https://example.com/adst/sa/sdss/d3222/s4sfa',
    shortUrl: 'https://twd.com/esfec43rfsfds',
    urlClickCount: 0,
    urlHash: 'esfec43rfsfds',
  } as ShortenUrlModel,
  {
    fullUrl: 'https://example.com/adst/sa/sdss/d3222/ss2fa',
    shortUrl: 'https://twd.com/esfed44rfsfds',
    urlClickCount: 0,
    urlHash: 'esfed44rfsfds',
  } as ShortenUrlModel,
  {
    fullUrl: 'https://example.com/adst/sa/sdss/d3222/s5sfa',
    shortUrl: 'https://twd.com/esfef46yfsfds',
    urlClickCount: 0,
    urlHash: 'esfef46yfsfds',
  } as ShortenUrlModel,
  {
    fullUrl: 'https://example.com/adst/sa/sdss/d3222/ss7fa',
    shortUrl: 'https://twd.com/esfeh468fsfds',
    urlClickCount: 0,
    urlHash: 'esfeh468fsfds',
  } as ShortenUrlModel,
  {
    fullUrl: 'https://example.com/adst/sa/sdss/d3222/ss8fa',
    shortUrl: 'https://twd.com/esfe44hgjsfds',
    urlClickCount: 0,
    urlHash: 'esfe44hgjsfds',
  } as ShortenUrlModel,
];

const apiBase: string = '/short-url/short';
const mocks = [
  rest.post(`${apiBase}`, (req, res, ctx) => {
    return res(
      ctx.json({
        total: 5,
        shortenUrls: [
          {
            fullUrl: 'https://example.com/adst/sa/sdss/d3222/ss3fa',
            shortUrl: 'https://twd.com/eeeeeeeeeeee',
            urlClickCount: 0,
            urlHash: 'eeeeeeeeeeee',
          } as ShortenUrlModel,
        ],
      } as ShortUrlGrid)
    );
  }),
  rest.delete(`${apiBase}/:urlHash`, (req, res, ctx) => {
    return res(ctx.json(true));
  }),
  rest.put(`${apiBase}/:urlHash`, (req, res, ctx) => {
    let result = 1;
    if (req.params.urlHash) {
      result = mockUrlData.filter((x) => x.urlHash === req.params.urlHash)[0]
        .urlClickCount++;
    }

    return res(ctx.json(result));
  }),
  rest.get(`${apiBase}`, (req, res, ctx) => {
    return res(
      ctx.json({ total: 10, shortenUrls: mockUrlData } as ShortUrlGrid)
    );
  }),
];

const templateUrlShortener: Story<LinkTableComponent> = (args: any) => ({
  props: {
    ...args,
  },
  moduleMetadata: {},
});

export const basic: Story<LinkTableComponent> = templateUrlShortener.bind({});
basic.args = {};
basic.parameters = {
  controls: {
    include: [],
  },
  msw: mocks,
  jest: ['link-table.component'],
};
