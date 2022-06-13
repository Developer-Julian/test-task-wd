import { ShortenUrlModel } from './../models/shorten-url.model';
export interface ShortUrlGrid {
  total: number;
  shortenUrls: ShortenUrlModel[];
}
