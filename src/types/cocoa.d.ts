declare class NSArray<T = NSObject> {
  [index: number]: T;
  count(): number;
  objectAtIndex(index: number): T;
}

declare class NSDictionary<T = any> {
  [key: string]: T;
}

declare class NSObject { }

/*
  NSFont
*/

declare const NSFontSymbolicTrait: any;
  declare const NSFontItalicTrait: 1
  declare const NSFontBoldTrait: 2
declare const NSFontTraitsAttribute: any;

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

// MS

declare class MSTextStyle {
  attributes: NSDictionary;
}
