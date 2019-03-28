/// <reference types="node" />
/// <reference path="./cocoa.d.ts" />

declare module "sketch-module-web-view" {
  import { EventEmitter } from "events";

  type EventMethod<
    EventListeners extends { [name: string]: (...args: any[]) => void },
    R
  > = <T extends string | symbol>(
    event: T,
    ...listeners: Array<
      T extends keyof EventListeners
        ? EventListeners[T]
        : (...args: any) => void
    >
  ) => R;

  abstract class CommonEventEmitter<
    EventListeners extends { [name: string]: (...args: any[]) => void }
  > extends EventEmitter {
    addListener: EventMethod<EventListeners, this>;
    on: EventMethod<EventListeners, this>;
    once: EventMethod<EventListeners, this>;
    prependListener: EventMethod<EventListeners, this>;
    prependOnceListener: EventMethod<EventListeners, this>;
    off: EventMethod<EventListeners, this>;
    removeListener: EventMethod<EventListeners, this>;
    emit<T extends string | symbol>(
      event: T,
      ...args: T extends keyof EventListeners
        ? Parameters<EventListeners[T]>
        : any[]
    ): boolean;
  }

  class WebContent extends CommonEventEmitter<WebContent.EventListeners> {
    /**
     * @param `url` The `url` can be a remote address (e.g. `http://`) or a path to a local HTML file using the `file://` protocol.
     * To ensure that file URLs are properly formatted, it is recommended to use `require`. */
    loadURL(url: string): void;

    /**
     * Returns `String` - The URL of the current web page.
     * ```javascript
       const BrowserWindow = require('sketch-module-web-view')
      let win = new BrowserWindow({ width: 800, height: 600 })
      win.loadURL('http://github.com')
      let currentURL = win.webContents.getURL()
      console.log(currentURL)
      ```
    */
    getURL(): string;

    /** Returns `String` - The title of the current web page. */
    getTitle(): string;

    /** Returns `Boolean` - Whether the web page is destroyed. */
    isDestroyed(): boolean;

    /** Returns `Boolean` - Whether web page is still loading resources. */
    isLoading(): boolean;

    /** Stops any pending navigation. */
    stop(): void;

    /** Reloads the current web page. */
    reload(): void;

    /** Returns `Boolean` - Whether the browser can go back to previous web page. */
    canGoBack(): boolean;

    /** Returns `Boolean` - Whether the browser can go forward to next web page. */
    canGoForward(): boolean;

    /** Makes the browser go back a web page. */
    goBack(): void;

    /** Makes the browser go forward a web page. */
    goForward(): void;

    /**
     * Evaluates `code` in page.
     * @returns The result of the executed code.
     * @throws NSException | NSError
     */
    executeJavaScript<T = unknown>(code: string): Promise<T>;

    /**
     * Evaluates `code` in page.
     * Not like `executeJavaScript(code: string)`, the result or error should be handled by the `callback`
     * @param code
     * @param callback
     */
    executeJavaScript<T = unknown>(
      code: string,
      callback: (...args: any[]) => void
    ): Promise<void>;

    /** Executes the editing command `undo` in web page. */
    undo(): void;

    /** Executes the editing command `redo` in web page. */
    redo(): void;

    /** Executes the editing command `cut` in web page. */
    cut(): void;

    /** Executes the editing command `copy` in web page. */
    copy(): void;

    /** Executes the editing command `paste` in web page. */
    paste(): void;

    /** Executes the editing command `pasteAndMatchStyle` in web page. */
    pasteAndMatchStyle(): void;

    /** Executes the editing command `delete` in web page. */
    delete(): void;

    /** Executes the editing command `replace` in web page. */
    replace(text: string): void;
  }
  namespace WebContent {
    type Events =
      | "did-finish-load"
      | "did-fail-load"
      | "did-frame-finish-load"
      | "did-start-loading"
      | "did-get-redirect-request"
      | "dom-ready"
      | "will-navigate"
      | "did-navigate-in-page";

    export type EventListeners = {
      [E in Events]: E extends "did-fail-load"
        ? (error: NSException) => void
        : E extends "will-navigate" | "did-navigate-in-page"
        ? (event: {}, url: string) => void
        : () => void
    };
  }

  class BrowserWindow extends CommonEventEmitter<BrowserWindow.EventListeners> {
    readonly id: string;
    readonly webContents: WebContent;

    constructor(options?: BrowserWindow.Options);

    /** Removes focus from the window. */
    blur(): void;

    /** Returns `Boolean` - Whether the window is focused. */
    isFocused(): boolean;

    /** Returns `Boolean` - Whether the window is destroyed. */
    isDestroyed(): boolean;

    /** Shows and gives focus to the window. */
    show(): void;

    /** Shows the window but doesn't focus on it. */
    showInactive(): void;

    /** Hides the window. */
    hide(): void;

    /** Returns `Boolean` - Whether the window is visible to the user. */
    isVisible(): boolean;

    /** Returns `Boolean` - Whether current window is a modal window. */
    isModal(): boolean;

    /** Maximizes the window. This will also show (but not focus) the window if it isn't being displayed already. */
    maximize(): void;

    /** Unmaximizes the window. */
    unmaximize(): void;

    /** Returns `Boolean` - Whether the window is maximized. */
    isMaximized(): boolean;

    /** Minimizes the window. On some platforms the minimized window will be shown in the Dock. */
    minimize(): void;

    /** Restores the window from minimized state to its previous state. */
    restore(): void;

    /** Returns `Boolean` - Whether the window is minimized. */
    isMinimized(): boolean;

    /** Sets whether the window should be in fullscreen mode. */
    setFullScreen(flag: boolean): void;

    /** Returns `Boolean` - Whether the window is in fullscreen mode. */
    isFullScreen(): boolean;

    /** This will make a window maintain an aspect ratio. The extra size allows a developer to have space, specified in pixels, not included within the aspect ratio calculations. This API already takes into account the difference between a window's size and its content size.
    Consider a normal window with an HD video player and associated controls. Perhaps there are 15 pixels of controls on the left edge, 25 pixels of controls on the right edge and 50 pixels of controls below the player. In order to maintain a 16:9 aspect ratio (standard aspect ratio for HD @1920x1080) within the player itself we would call this function with arguments of 16/9 and [ 40, 50 ]. The second argument doesn't care where the extra width and height are within the content view--only that they exist. Just sum any extra width and height areas you have within the overall content view.
    * @param `aspectRatio` Float - The aspect ratio to maintain for some portion of the content view.
    * @param `extraSize` - The extra size not to be included while maintaining the aspect ratio.
    */
    setAspectRatio(aspectRatio: number, extraSize?: CGSize): void;

    /** Resizes and moves the window to the supplied bounds */
    setBounds(bounds: CGRect, animate?: boolean): void;
    getBounds(): CGRect;

    /** Resizes and moves the window's client area (e.g. the web page) to the supplied bounds. */
    setContentBounds(bounds: CGRect, animate?: boolean): void;
    getContentBounds(): CGRect;

    /** Disable or enable the window. */
    setEnabled(enable: boolean): void;

    /** Resizes the window to `width` and `height`. */
    setSize(width: number, height: number, animate?: boolean): void;

    /** Returns `[width, height]` - Contains the window's width and height. */
    getSize(): [number, number];

    /** Resizes the window's client area (e.g. the web page) to `width` and `height`. */
    setContentSize(width: number, height: number, animate?: boolean): void;

    /** Returns `[width, height]` - Contains the window's client area's width and height. */
    getContentSize(): [number, number];

    /** Sets the minimum size of window to `width` and `height`. */
    setMinimumSize(width: number, height: number): void;

    /** Returns `[width, height]` - Contains the window's minimum width and height. */
    getMinimumSize(): [number, number];

    /** Sets the maximum size of window to `width` and `height`. */
    setMaximumSize(width: number, height: number): void;

    /** Returns `[width, height]` - Contains the window's maximum width and height. */
    getMaximumSize(): [number, number];

    /** Sets whether the window can be manually resized by user. */
    setResizable(resizable: boolean): void;

    /** Returns `Boolean` - Whether the window can be manually resized by user. */
    isResizable(): boolean;

    /** Sets whether the window can be moved by user. */
    setMovable(movable: boolean): void;

    /** Returns `Boolean` - Whether the window can be moved by user. */
    isMovable(): boolean;

    /** Sets whether the window can be manually minimized by user. */
    setMinimizable(minimizable: boolean): void;

    /** Returns `Boolean` - Whether the window can be manually minimized by user. */
    isMinimizable(): boolean;

    /** Sets whether the window can be manually maximized by user. */
    setMaximizable(maximizable: boolean): void;

    /** Returns `Boolean` - Whether the window can be manually maximized by user. */
    isMaximizable(): boolean;

    /** - Sets whether the maximize/zoom window button toggles fullscreen mode or maximizes the window. */
    setFullScreenable(fullscreenable: boolean): void;

    /** Returns `Boolean` - Whether the maximize/zoom window button toggles fullscreen mode or maximizes the window. */
    isFullScreenable(): boolean;

    /** - Sets whether the window can be manually closed by user. */
    setClosable(closable: boolean): void;

    /** Returns `Boolean` - Whether the window can be manually closed by user. */
    isClosable(): boolean;

    /**
     * Sets whether the window should show always on top of other windows. After setting this, the window is still a normal window, not a toolbox window which can not be focused on.
     * @param `level` String (optional) _macOS_ - Values include `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, and ~~`dock`~~ (Deprecated). The default is `floating`. See the [macOS docs][https://developer.apple.com/documentation/appkit/nswindow/level] for more details.
     * @param `relativeLevel` Integer (optional) - The number of layers higher to set this window relative to the given `level`. The default is `0`. Note that Apple discourages setting levels higher than 1 above `screen-saver`.
     */
    setAlwaysOnTop(
      flag: boolean,
      level?:
        | "normal"
        | "floating"
        | "torn-off-menu"
        | "modal-panel"
        | "main-menu"
        | "status"
        | "pop-up-menu"
        | "screen-saver",
      relativeLevel?: number
    ): void;

    /** Returns `Boolean` - Whether the window is always on top of other windows. */
    isAlwaysOnTop(): boolean;

    /** Moves window to top(z-order) regardless of focus */
    moveTop(): void;

    /** Moves window to the center of the screen. */
    center(): void;

    /**
     * Moves window to `x` and `y`.
     * @param `x` Integer
     * @param `y` Integer
     * @param `animate` Boolean (optional)
     */
    setPosition(x: number, y: number, animate?: boolean): void;

    /** Returns `[x, y]` - Contains the window's current position. */
    getPosition(): [number, number];

    /** Changes the title of native window to `title`. */
    setTitle(title: string): void;

    /**
     * Returns `String` - The title of the native window.
     * **Note:** The title of web page can be different from the title of the native window.
     */
    getTitle(): string;

    /** Starts or stops flashing the window to attract user's attention. */
    flashFrame(flag: boolean): void;

    /** Returns `Buffer` - The platform-specific handle of the window. The native type of the handle is an `NSPanel`. */
    getNativeWindowHandle<R = NSPanel>(): R;

    /**
     * Same as `webContents.loadURL(url)`.
     * @param `url` The `url` can be a remote address (e.g. `http://`) or a path to a local HTML file using the `file://` protocol. To ensure that file URLs are properly formatted, it is recommended to use `require`.
     */
    loadURL(url: string): void;

    /** Same as `webContents.reload`. */
    reload(): void;

    /** - Sets whether the window should have a shadow. */
    setHasShadow(hasShadow: boolean): void;

    /** Returns `Boolean` - Whether the window has a shadow. */
    hasShadow(): boolean;

    /**
     * Sets the opacity of the window.
     * @param `opacity` Number - between 0.0 (fully transparent) and 1.0 (fully opaque)
     */
    setOpacity(opacity: number): void;

    /** Returns `Number` - between 0.0 (fully transparent) and 1.0 (fully opaque) */
    getOpacity(): number;

    /** Sets whether the window should be visible on all workspaces. */
    setVisibleOnAllWorkspaces(visible: boolean): void;

    /** Returns `Boolean` - Whether the window is visible on all workspaces. */
    isVisibleOnAllWorkspaces(): boolean;

    /**
     * Makes the window ignore all mouse events.
     * All mouse events happened in this window will be passed to the window below this window, but if this window has focus, it will still receive keyboard events.
     */
    setIgnoreMouseEvents(ignore: boolean): void;

    /**
     * Prevents the window contents from being captured by other apps.
     * It sets the NSWindow's sharingType to NSWindowSharingNone.
     */
    setContentProtection(enable: boolean): void;

    /** Controls whether to hide cursor when typing. */
    setAutoHideCursor(autoHide: boolean): void;

    /**
     * Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.
     * @param `type` String - Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`. See the [macOS documentation][vibrancy-docs] for more details.
     */
    setVibrancy(
      type:
        | "appearance-based"
        | "light"
        | "dark"
        | "titlebar"
        | "selection"
        | "menu"
        | "popover"
        | "sidebar"
        | "medium-light"
        | "ultra-dark"
    ): void;
  }

  namespace BrowserWindow {
    export type EventListeners = {
      "ready-to-show": () => void;
    };

    export interface Options {
      identifier?: string;

      /** `width` Integer (optional) - Window's width in pixels. Default is `800`. */
      width?: number;
      /** `height` Integer (optional) - Window's height in pixels. Default is `600`. */
      height?: number;
      /** `x` Integer (optional) (**required** if y is used) - Window's left offset from screen. Default is to center the window. */
      x?: number;
      /** `y` Integer (optional) (**required** if x is used) - Window's top offset from screen. Default is to center the window. */
      y?: number;

      /** `useContentSize` Boolean (optional) - The `width` and `height` would be used as web page's size, which means the actual window's size will include window frame's size and be slightly larger. Default is `false`. */
      useContentSize?: boolean;

      /** `center` Boolean (optional) - Show window in the center of the screen. */
      center?: boolean;

      /** `minWidth` Integer (optional) - Window's minimum width. Default is `0`. */
      minWidth?: number;

      /** `minHeight` Integer (optional) - Window's minimum height. Default is `0`. */
      minHeight?: number;

      /** `maxWidth` Integer (optional) - Window's maximum width. Default is no limit. */
      maxWidth?: number;

      /** `maxHeight` Integer (optional) - Window's maximum height. Default is no limit. */
      maxHeight?: number;

      /** `resizable` Boolean (optional) - Whether window is resizable. Default is `true`. */
      resizable?: boolean;

      /** `movable` Boolean (optional) - Whether window is movable. Default is `true`. */
      movable?: boolean;

      /** `minimizable` Boolean (optional) - Whether window is minimizable. Default is `true`. */
      minimizable?: boolean;

      /** `maximizable` Boolean (optional) - Whether window is maximizable. Default is `true`. */
      maximizable?: boolean;

      /** `closable` Boolean (optional) - Whether window is closable. Default is `true`. */
      closable?: boolean;

      /** `alwaysOnTop` Boolean (optional) - Whether the window should always stay on top of other windows. Default is `false`. */
      alwaysOnTop?: boolean;

      /** `fullscreen` Boolean (optional) - Whether the window should show in fullscreen. When explicitly set to `false` the fullscreen button will be hidden or disabled. Default is `false`. */
      fullscreen?: boolean;

      /** `fullscreenable` Boolean (optional) - Whether the window can be put into fullscreen mode. Also whether the maximize/zoom button should toggle full screen mode or maximize window. Default is `true`. */
      fullscreenable?: boolean;

      /** `title` String (optional) - Default window title. Default is your plugin name. */
      title?: string;

      /** `show` Boolean (optional) - Whether window should be shown when created. Default is `true`. */
      show?: boolean;

      /** `frame` Boolean (optional) - Specify `false` to create a [Frameless Window](frameless-window.md). Default is `true`. */
      frame?: boolean;

      /** `parent` Document (optional) - Specify parent [Document](https://developer.sketchapp.com/reference/api/#document). Default is `null`. */
      parent?: boolean;

      /** `modal` Boolean (optional) - Whether this is a modal window. This only works when the window is a child window. Default is `false`. */
      modal?: boolean;

      /** `acceptFirstMouse` Boolean (optional) - Whether the web view accepts a single mouse-down event that simultaneously activates the window. Default is `false`. */
      acceptFirstMouse?: boolean;

      /** `disableAutoHideCursor` Boolean (optional) - Whether to hide cursor when typing. Default is `false`. */
      disableAutoHideCursor?: boolean;

      /** `backgroundColor` String (optional) - Window's background color as a hexadecimal value, like `#66CD00` or `#FFF` or `#80FFFFFF` (alpha is supported). Default is `NSColor.windowBackgroundColor()`. */
      backgroundColor?: string;

      /** `hasShadow` Boolean (optional) - Whether window should have a shadow. Default is `true`. */
      hasShadow?: boolean;

      /** `opacity` Number (optional) - Set the initial opacity of the window, between 0.0 (fully transparent) and 1.0 (fully opaque). */
      opacity?: number;

      /** `transparent` Boolean (optional) - Makes the window [transparent](frameless-window.md). Default is `false`. */
      transparent?: boolean;

      /**
       * `titleBarStyle` String (optional) - The style of window title bar. Default is `default`. Possible values are:
       * - `default` - Results in the standard gray opaque Mac title bar.
       * - `hidden` - Results in a hidden title bar and a full size content window, yet the title bar still has the standard window controls ("traffic lights") in the top left.
       * - `hiddenInset` - Results in a hidden title bar with an alternative look where the traffic light buttons are slightly more inset from the window edge.
       */
      titleBarStyle?: "default" | "hidden" | "hiddenInset";

      /** `vibrancy` String (optional) - Add a type of vibrancy effect to the window, only on macOS. Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`. Please note that using `frame: false` in combination with a vibrancy value requires that you use a non-default `titleBarStyle` as well. */
      vibrancy?: string;

      /** `webPreferences` Object (optional) - Settings of web page's features. */
      webPreferences?: {
        /** - `devTools` Boolean (optional) - Whether to enable DevTools. If it is set to `false`, can not use `BrowserWindow.webContents.openDevTools()` to open DevTools. Default is `true`. */
        devTools?: boolean;
        /** - `javascript` Boolean (optional) - Enables JavaScript support. Default is `true`. */
        javascript?: boolean;
        /** - `plugins` Boolean (optional) - Whether plugins should be enabled. Default is `false`. */
        plugins?: boolean;
        /** - `minimumFontSize` Integer (optional) - Defaults to `0`. */
        minimumFontSize?: boolean;
        /** - `zoomFactor` Number (optional) - The default zoom factor of the page, `3.0` represents `300%`. Default is `1.0`. */
        zoomFactor?: boolean;
      };
    }

    export function fromId(identifier: string): BrowserWindow | undefined;
    /**
     * Create a BrowserWindow instance from webview
     * @param panel a NSPanel with a webview in its contentView
     * @param identifier unique identifier for the browser window
     * @returns created instance fo BrowserWindow
     * @throws if the panel is not a instance of NSPanel or there is no webview in its contentView
     */
    export function fromPanel(
      panel: NSPanel,
      identifier: string
    ): BrowserWindow;
  }

  export = BrowserWindow;
}

declare module "sketch-module-web-view/remote" {
  import BrowserWindow = require("sketch-module-web-view");

  /**
   * Wrapper for BrowserWindow.getById
   * @param id
   */
  export function getWebview(id: string): BrowserWindow;

  export function isWebviewPresent(id: string): boolean;

  /**
   * Evaluates `code` in page.
   * @param code
   * @param callback
   */
  export function sendToWebview<T = unknown>(id: string): Promise<T>;

  /**
   * Evaluates `code` in page.
   * Not like `sendToWebview(evalString: string)`, the result or error should be handled by the `callback`
   * @param code
   * @param callback
   */
  export function sendToWebview(
    id: string,
    evalString: string,
    callback: (...args: any[]) => void
  ): Promise<void>;
}
