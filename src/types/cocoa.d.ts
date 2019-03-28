declare class MSAction { }
declare class MSAssetLibrary { }
declare class MSArtboardGroup { }
declare class MSAvailableOverride { }
declare class MSBitmapLayer { }
declare class MSCurvePoint { }
declare class MSDataOverride { }
declare class MSDocument { }
declare class MSExportRequest { }
declare class MSHotspotLayer { }
declare class MSLayer { }
declare class MSLayerGroup { }
declare class MSPage { }
declare class MSPluginBundle { }
declare class MSPluginCommand { }
declare class MSImageData { }
declare class MSShapeGroup { }
declare class MSShapePathLayer { }
declare class MSSharedStyle { }
declare class MSShareableObjectReference { }
declare class MSStyle { }
declare class MSStyledLayer { }
declare class MSSymbolInstance { }
declare class MSSymbolMaster { }
declare class MSSymbolMasterReference { }
declare class MSSharedLayerReference { }
declare class MSSharedStyleReference { }
declare class MSSharedTextReference { }
declare class MSSliceLayer { }
declare class MSTextLayer { }
declare class MSTextStyle {
  attributes: NSDictionary;
}

declare class CGPoint { }
declare class CGRect { }

declare const NSFontSymbolicTrait: any;
declare const NSFontItalicTrait: 1
declare const NSFontBoldTrait: 2
declare const NSFontTraitsAttribute: any;

declare class NSArray<T = NSObject> {
  [index: number]: T;
  count(): number;
  objectAtIndex(index: number): T;
}
declare class NSData { }
declare class NSDictionary<T = any> {
  [key: string]: T;
}
declare class NSFont extends NSObject  {
	fontDescriptor(): NSFontDescriptor
}
declare class NSFontDescriptor extends NSObject  {
  objectForKey(anAttribute: string): any
}
declare class NSFontManager extends NSObject {
  static sharedFontManager(): NSFontManager;
  weightOfFont_(font: NSFont): any;
}
declare class NSImage { }
declare class NSRange { }
declare class _NSRange { }
declare class NSObject { }
declare class NSString { }
declare class NSURL { }

declare function NSHomeDirectory(): string
