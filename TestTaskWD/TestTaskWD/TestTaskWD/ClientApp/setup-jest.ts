import 'jest-preset-angular';
import './jest-global-mocks';
import './setup-tests';
import 'zone.js/dist/zone-node.js';
import 'zone.js/dist/zone-testing.js';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { getTestBed } from '@angular/core/testing';

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
