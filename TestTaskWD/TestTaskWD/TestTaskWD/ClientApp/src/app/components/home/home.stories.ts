import { of } from 'rxjs';
import { ShortenUrlModel } from './../../models/shorten-url.model';
import { ShortUrlGrid } from './../../interfaces/short-url-grid.interface';
import { AppModule } from './../../app.module';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { rest } from 'msw';
import { HomeComponent } from './home.component';

export default {
  component: HomeComponent,
  decorators: [
    moduleMetadata({
      imports: [AppModule],
    }),
  ],
  excludeStories: /.*Data$/,
  title: 'UrlShortener',
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
    return res(ctx.json({ total: 0, shortenUrls: [] } as ShortUrlGrid));
  }),
];

const templateUrlShortener: Story<HomeComponent> = (args: any) => ({
  props: {
    ...args,
  },
  moduleMetadata: {},
});

const templateUrlShortenerError: Story<HomeComponent> = (args: any) => ({
  props: {
    ...args,
    showErrorBlock$: of(true),
  },
  moduleMetadata: {},
});

export const basic: Story<HomeComponent> = templateUrlShortener.bind({});
basic.args = {};
basic.parameters = {
  controls: {
    include: [],
  },
  msw: mocks,
  jest: ['home.component'],
};

export const basicWith: Story<HomeComponent> = templateUrlShortener.bind({});
const mockWithData = mocks.filter(
  (x) => x.info.path !== `${apiBase}` && x.info.method.toLowerCase() !== 'get'
);
mockWithData.push(
  rest.get(`${apiBase}`, (req, res, ctx) => {
    return res(
      ctx.json({ total: 5, shortenUrls: mockUrlData } as ShortUrlGrid)
    );
  })
);
basicWith.args = {};
basicWith.parameters = {
  controls: {
    include: [],
  },
  msw: mockWithData,
  jest: ['home.component'],
};

export const errorUrl: Story<HomeComponent> = templateUrlShortenerError.bind(
  {}
);
errorUrl.args = {};
errorUrl.argTypes = {};
errorUrl.parameters = {
  controls: {
    include: [],
  },
  msw: mocks,
  jest: ['home.component'],
};
