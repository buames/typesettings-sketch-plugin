/// <reference path="./cocoa.d.ts" />

declare module 'sketch/actions' {
  import sketch = require('sketch');

  namespace actions {
    export type Types = SelectionChanged;

    /*
      The action context for this SelectionChanged contains three keys.
      Reference: https://developer.sketch.com/reference/action/SelectionChanged
    */
    export interface SelectionChanged extends MSAction {
      /* Document that the change occurred in */
      document: Document;
      /* List of the newly selected layers */
      newSelection: Selection;
      /* List of the previously selected layers */
      oldSelection: Selection;
    }

    export interface ActionContext<T extends Types> extends sketch.Context {
      actionContext: T;
      action: string;
    }
  }

  export = actions
}
