/// <reference path="./native.d.ts" />

declare module 'sketch/dom' {
  /* Utilities */
  type AllLayers = dom.ChildLayer | dom.Page;
  // type AllLayers = dom.ChildLayer | dom.Artboard | dom.Page | dom.SymbolMaster;

  class Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x: number, y: number, width: number, height: number);
    constructor(rect: Rectangle);
    offset(x:number, y:number):this;
    scale(scale:number):this;
    scale(scaleWidth:number, scaleHeight:number):this;
  }

  abstract class Selection {
    readonly layers: AllLayers[];
  }

  class dom {
    static export(objectToExport: dom.Layer | dom.Layer[] | dom.Page| dom.Page[], options?: any): void;
  }

  namespace dom {
    class Component<T = any> {
      static fromNative<T>(nativeObject: T): Component<T>;
      readonly sketchObject: T;
      readonly type: Types | undefined;
    }

    export enum Types {
      Artboard = 'Artboard',
      Blur = 'Blur',
      Border = 'Border',
      BorderOptions = 'BorderOptions',
      CurvePoint = 'CurvePoint',
      DataOverride = 'DataOverride',
      Document = 'Document',
      ExportFormat = 'ExportFormat',
      Fill = 'Fill',
      Flow = 'Flow',
      Gradient = 'Gradient',
      GradientStop = 'GradientStop',
      Group = 'Group',
      HotSpot = 'HotSpot',
      Image = 'Image',
      ImageData = 'ImageData',
      ImportableObject = 'ImportableObject',
      Library = 'Library',
      Override = 'Override',
      Page = 'Page',
      Shadow = 'Shadow',
      Shape = 'Shape',
      ShapePath = 'ShapePath',
      SharedStyle = 'SharedStyle',
      Slice = 'Slice',
      Style = 'Style',
      SymbolInstance = 'SymbolInstance',
      SymbolMaster = 'SymbolMaster',
      Text = 'Text'
    }

    export function getSelectedDocument(): Document | undefined ;
    export function getDocuments(): Document[];

    export type ChildLayer = Group | HotSpot | Image | Shape | ShapePath | SymbolInstance | Text;

    class BaseGroup<T extends MSLayerGroup = MSLayerGroup> extends StyledLayer<T> {
      layers: ChildLayer[];
      adjustToFit(): this;
    }

    class StyledLayer<T extends MSStyledLayer> extends Layer<T> {
      style: Style;
    }

    // Document
    export class Document extends Component<MSDocument> {
      pages: Page[];
      type: Types.Document;

      readonly selectedPage: Page;
      readonly selectedLayers: Selection;

      constructor();
    }

    export class HotSpot extends Layer<MSHotspotLayer> {
      type: Types.HotSpot;
    }

    export class Group extends BaseGroup {
      type: Types.Group;
    }

    export class Image extends StyledLayer<MSBitmapLayer> {
      type: Types.Image;
    }

    /*
      Layers
    */

    // TODO
    export type LayersPropertyType = any[ ];

    export abstract class Layer<T extends MSLayer = MSLayer> extends Component<T> {
      id: string;
      name: string;
    }

    /*
      Shapes
    */
    export class Shape extends BaseGroup<MSShapeGroup> {
      type: Types.Shape;
    }

    export class ShapePath extends StyledLayer<MSShapePathLayer> {
      type: Types.ShapePath;
    }

    export class Style extends Component<MSStyle> {
      type: Types.Style
    }

    export class SymbolInstance extends StyledLayer<MSSymbolInstance> {
      type: Types.SymbolInstance
    }

    // Page
    export interface PageProperties {
      name?:string;
      parent?: Document;
      layers?: LayersPropertyType;
      frame?: Rectangle;
  }

    export class Page extends BaseGroup<MSPage> {
      parent: Document;
      type: Types.Page;

      readonly selectedLayers: Selection;

      constructor(properties?: PageProperties);
    }
  }

  export = dom;
}
