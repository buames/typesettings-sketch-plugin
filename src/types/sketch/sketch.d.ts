/// <reference path="./dom.d.ts" />
/// <reference path="./ui.d.ts" />

declare module "sketch" {
  import dom = require('sketch/dom');
  import ui = require('sketch/ui');

  class sketch {
    static export: typeof dom.export;
  }

  namespace sketch {
    export import Document = dom.Document;
    export import Types = dom.Types;

     // Modules exposed as sub-modules
    export import UI = ui;
  }

  export = sketch
}
