import { Injectable } from '@angular/core';
import {
  CordovaInstance,
  InstanceCheck,
  IonicNativePlugin,
  Plugin
} from '@ionic-native/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

declare const cordova: Cordova & { InAppBrowser: any };

export interface InAppBrowserOptions {
  /** Set to yes or no to turn the InAppBrowser's location bar on or off. */
  location?: 'yes' | 'no';
  /* Set to yes to create the browser and load the page, but not show it. The loadstop event fires when loading is complete.
   * Omit or set to no (default) to have the browser open and load normally. */
  hidden?: 'yes' | 'no';
  /** Set to yes to have the browser's cookie cache cleared before the new window is opened. */
  clearcache?: 'yes';
  /* Set to yes to have the session cookie cache cleared before the new window is opened. */
  clearsessioncache?: 'yes';
  /* (Android) Set to a string to use as the close button's caption instead of a X. Note that you need to localize this value yourself.
   *  (iOS) Set to a string to use as the Done button's caption. Note that you need to localize this value yourself. */
  closebuttoncaption?: string;
  /* (Android) Set to a valid hex color string, for example: #00ff00, and it will change the close button color from default, regardless of being a text or default X. Only has effect if user has location set to yes.
   *  (iOS) Set as a valid hex color string, for example: #00ff00, to change from the default Done button's color. Only applicable if toolbar is not disabled. */
  closebuttoncolor?: string;
  /** (Android Only) Set to yes to show Android browser's zoom controls, set to no to hide them. Default value is yes. */
  zoom?: 'yes' | 'no';
  /* (Android & Windows Phone Only) Set to yes to use the hardware back button to navigate backwards through the InAppBrowser's history.
   * If there is no previous page, the InAppBrowser will close. The default value is yes, so you must set it to no if you want the back button to simply close the InAppBrowser. */
  hardwareback?: 'yes' | 'no';
  /** Set to yes to prevent HTML5 audio or video from autoplaying (defaults to no). */
  mediaPlaybackRequiresUserAction?: 'yes' | 'no';
  /* (Android) Set to yes to hide the navigation buttons on the location toolbar, only has effect if user has location set to yes. The default value is no.
   *  (iOS) Set to yes or no to turn the toolbar navigation buttons on or off (defaults to no). Only applicable if toolbar is not disabled.*/
  hidenavigationbuttons?: 'yes' | 'no';
  /* (Android) Set to yes to hide the url bar on the location toolbar, only has effect if user has location set to yes. The default value is no.*/
  hideurlbar?: 'yes' | 'no';
  /* (Android) Set to a valid hex color string, for example: #00ff00, and it will change the color of both navigation buttons from default. Only has effect if user has location set to yes and not hidenavigationbuttons set to yes.
   *  (iOS) Set as a valid hex color string, for example: #00ff00, to change from the default color. Only applicable if navigation buttons are visible. */
  navigationbuttoncolor?: string;
  /* (Android) Set to a valid hex color string, for example: #00ff00, and it will change the color the toolbar from default. Only has effect if user has location set to yes.
   *  (iOS) Set as a valid hex color string, for example: #00ff00, to change from the default color of the toolbar. Only applicable if toolbar is not disabled.*/
  toolbarcolor?: string;
  /** (Android Only) Set to yes to make InAppBrowser WebView to pause/resume with the app to stop background audio (this may be required to avoid Google Play issues) */
  shouldPauseOnSuspend?: 'yes' | 'no';
  /** (Android Only) Set to yes to show a close button in the footer similar to the iOS Done button. The close button will appear the same as for the header hence use closebuttoncaption and closebuttoncolor to set its properties */
  footer?: 'yes' | 'no';
  /** (Android Only) Set to a valid hex color string, for example #00ff00 or #CC00ff00 (#aarrggbb), and it will change the footer color from default. Only has effect if user has footer set to yes */
  footercolor?: string;
  /** (iOS Only) Set to yes or no (default is no). Turns on/off the UIWebViewBounce property. */
  disallowoverscroll?: 'yes' | 'no';
  /** (iOS Only) Set to yes or no to turn the toolbar on or off for the InAppBrowser (defaults to yes) */
  toolbar?: 'yes' | 'no';
  /** (iOS Only) Set to yes or no to make the toolbar translucent(semi-transparent) (defaults to yes). Only applicable if toolbar is not disabled. */
  toolbartranslucent?: 'yes' | 'no';
  /** (iOS Only)  Set to yes or no to prevent viewport scaling through a meta tag (defaults to no). */
  enableViewportScale?: 'yes' | 'no';
  /* (iOS Only) Set to yes or no to allow in-line HTML5 media playback, displaying within the browser window rather than a device-specific playback interface.
   * The HTML's video element must also include the webkit-playsinline attribute (defaults to no) */
  allowInlineMediaPlayback?: 'yes' | 'no';
  /** (iOS Only) Set to yes or no to open the keyboard when form elements receive focus via JavaScript's focus() call (defaults to yes). */
  keyboardDisplayRequiresUserAction?: 'yes' | 'no';
  /** (iOS Only) Set to yes or no to wait until all new view content is received before being rendered (defaults to no). */
  suppressesIncrementalRendering?: 'yes' | 'no';
  /** (iOS Only) Set to pagesheet, formsheet or fullscreen to set the presentation style (defaults to fullscreen). */
  presentationstyle?: 'pagesheet' | 'formsheet' | 'fullscreen';
  /** (iOS Only) Set to fliphorizontal, crossdissolve or coververtical to set the transition style (defaults to coververtical). */
  transitionstyle?: 'fliphorizontal' | 'crossdissolve' | 'coververtical';
  /** (iOS Only) Set to top or bottom (default is bottom). Causes the toolbar to be at the top or bottom of the window. */
  toolbarposition?: 'top' | 'bottom';
  /** (iOS Only) Set to yes or no to change the visibility of the loading indicator (defaults to no). */
  hidespinner?: 'yes' | 'no';
  /* (Windows only) Set to yes to create the browser control without a border around it.
   * Please note that if location=no is also specified, there will be no control presented to user to close IAB window. */
  fullscreen?: 'yes';
  /** (Android Only) Sets whether the WebView should enable support for the "viewport" HTML meta tag or should use a wide viewport. When the value of the setting is no, the layout width is always set to the width of the WebView control in device-independent (CSS) pixels. When the value is yes and the page contains the viewport meta tag, the value of the width specified in the tag is used. If the page does not contain the tag or does not provide a width, then a wide viewport will be used. (defaults to yes). */
  useWideViewPort?: 'yes' | 'no';
  /**
   * @hidden
   */
  [key: string]: any;
}
export interface InAppBrowserEvent extends Event {
  /** the eventname, either loadstart, loadstop, loaderror, or exit. */
  type: string;
  /** the URL that was loaded. */
  url: string;
  /** the error code, only in the case of loaderror. */
  code: number;
  /** the error message, only in the case of loaderror. */
  message: string;
}

/**
 * @hidden
 */
export class InAppBrowserObject {
  private _objectInstance: any;

  /**
   * Opens a URL in a new InAppBrowser instance, the current browser instance, or the system browser.
   * @param {string} url     The URL to load.
   * @param {string} [target="self"]  The target in which to load the URL, an optional parameter that defaults to _self.
   *                 _self: Opens in the WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
   *                 _blank: Opens in the InAppBrowser.
   *                 _system: Opens in the system's web browser.
   * @param {string | InAppBrowserOptions} [options] Options for the InAppBrowser. Optional, defaulting to: location=yes.
   *                 The options string must not contain any blank space, and each feature's
   *                 name/value pairs must be separated by a comma. Feature names are case insensitive.
   */
  constructor(
    url: string,
    target?: string,
    options?: string | InAppBrowserOptions
  ) {
    try {
      if (options && typeof options !== 'string') {
        options = Object.keys(options)
          .map(
            (key: string) => `${key}=${(options as InAppBrowserOptions)[key]}`
          )
          .join(',');
      }

      this._objectInstance = cordova.InAppBrowser.open(url, target, options);
    } catch (e) {
      window.open(url, target);
      console.warn(
        'Native: InAppBrowser is not installed or you are running on a browser. Falling back to window.open.'
      );
    }
  }

  /**
   * Displays an InAppBrowser window that was opened hidden. Calling this has no effect
   * if the InAppBrowser was already visible.
   */
  @CordovaInstance({ sync: true })
  show(): void {}

  /**
   * Closes the InAppBrowser window.
   */
  @CordovaInstance({ sync: true })
  close(): void {}

  /**
   * Hides an InAppBrowser window that is currently shown. Calling this has no effect
   * if the InAppBrowser was already hidden.
   */
  @CordovaInstance({ sync: true })
  hide(): void {}

  /**
   * Injects JavaScript code into the InAppBrowser window.
   * @param script {Object} Details of the script to run, specifying either a file or code key.
   * @returns {Promise<any>}
   */
  @CordovaInstance()
  executeScript(script: { file?: string; code?: string }): Promise<any> {
    return;
  }

  /**
   * Injects CSS into the InAppBrowser window.
   * @param css {Object} Details of the script to run, specifying either a file or code key.
   * @returns {Promise<any>}
   */
  @CordovaInstance()
  insertCSS(css: { file?: string; code?: string }): Promise<any> {
    return;
  }

  /**
   * A method that allows you to listen to events happening in the browser.
   * @param event {string} Name of the event
   * @returns {Observable<InAppBrowserEvent>} Returns back an observable that will listen to the event on subscribe, and will stop listening to the event on unsubscribe.
   */
  @InstanceCheck()
  on(event: string): Observable<InAppBrowserEvent> {
    return new Observable<InAppBrowserEvent>(
      (observer: Observer<InAppBrowserEvent>) => {
        this._objectInstance.addEventListener(
          event,
          observer.next.bind(observer)
        );
        return () =>
          this._objectInstance.removeEventListener(
            event,
            observer.next.bind(observer)
          );
      }
    );
  }
}

/**
 * @name In App Browser
 * @description Launches in app Browser
 * @usage
 * ```typescript
 * import { InAppBrowser } from '@ionic-native/in-app-browser';
 *
 * constructor(private iab: InAppBrowser) { }
 *
 *
 * ...
 *
 *
 * const browser = this.iab.create('https://ionicframework.com/');
 *
 * browser.executeScript(...);
 *
 * browser.insertCSS(...);
 * browser.on('loadstop').subscribe(event => {
 *    browser.insertCSS({ code: "body{color: red;" });
 * });
 *
 * browser.close();
 *
 * ```
 * @classes
 * InAppBrowserObject
 * @interfaces
 * InAppBrowserEvent
 * InAppBrowserOptions
 */
@Plugin({
  pluginName: 'InAppBrowser',
  plugin: 'cordova-plugin-inappbrowser',
  pluginRef: 'cordova.InAppBrowser',
  repo: 'https://github.com/apache/cordova-plugin-inappbrowser',
  platforms: ['AmazonFire OS', 'Android', 'Browser', 'iOS', 'macOS', 'Windows']
})
@Injectable()
export class InAppBrowser extends IonicNativePlugin {
  /**
   * Opens a URL in a new InAppBrowser instance, the current browser instance, or the system browser.
   * @param  url {string}     The URL to load.
   * @param  target {string}  The target in which to load the URL, an optional parameter that defaults to _self.
   * @param  options {string} Options for the InAppBrowser. Optional, defaulting to: location=yes.
   *                 The options string must not contain any blank space, and each feature's
   *                 name/value pairs must be separated by a comma. Feature names are case insensitive.
   * @returns {InAppBrowserObject}
   */
  create(
    url: string,
    target?: string,
    options?: string | InAppBrowserOptions
  ): InAppBrowserObject {
    return new InAppBrowserObject(url, target, options);
  }
}
