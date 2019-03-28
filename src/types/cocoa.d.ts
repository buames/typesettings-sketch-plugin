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
declare class MSPluginBundle {
  version<R = NSString>(): R;
}
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
declare class CGSize { }

declare class NSArray<T = NSObject> {
  [index: number]: T;
  count(): number;
  objectAtIndex(index: number): T;
}
declare class NSData { }
declare class NSDictionary<T = any> {
  [key: string]: T;
}
declare class NSException { }
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
declare class NSPanel { }
declare const NSPasteboardTypeString: string;
declare class NSPasteboard {
  static generalPasteboard(): any;
}
declare class NSRange { }
declare class _NSRange { }
declare class NSObject { }
declare class NSString {
  UTF8String<R = string>(): R;
}
declare class NSURL {
  static URLWithString<R = string>(url: NSURL): R;
}
declare class NSWorkspace {
  static sharedWorkspace(): any;
}

declare function NSHomeDirectory(): string
