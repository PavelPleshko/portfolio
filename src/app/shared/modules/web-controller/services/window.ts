import { isPlatformBrowser } from "@angular/common";
import {ValueProvider,ClassProvider, FactoryProvider, PLATFORM_ID, InjectionToken} from '@angular/core';



export const WINDOW = new InjectionToken('Window');

export abstract class WindowRef {

  get nativeWindow(): Window | Object {
    throw new Error('Not implemented.');
  }

}

export class BrowserWindowRef extends WindowRef {

 constructor() {
    super();
  }
 get nativeWindow(): Window | Object {
    return window;
  }

}

export function windowFactory(browserWindowRef: BrowserWindowRef, platformId: Object): Window | Object {
  if (isPlatformBrowser(platformId)) {
    return browserWindowRef.nativeWindow;
  }
  return new Object();
} 

const browserWindowProvider: ClassProvider = {
  provide: WindowRef,
  useClass: BrowserWindowRef
};
const windowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: windowFactory,
  deps: [ WindowRef, PLATFORM_ID ]
};

export const WINDOW_PROVIDERS:Array<ClassProvider | FactoryProvider | ValueProvider> = [
  browserWindowProvider,
  windowProvider
];