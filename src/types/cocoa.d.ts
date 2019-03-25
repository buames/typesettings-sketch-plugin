// Constants
// declare const enum NSFontSymbolicTrait {
// 	TraitItalic = 1,
// 	TraitBold = 2,
// 	TraitExpanded = 32,
// 	TraitCondensed = 64,
// 	TraitMonoSpace = 1024,
// 	TraitVertical = 2048,
// 	TraitUIOptimized = 4096,
// 	TraitTightLeading = 32768,
// 	TraitLooseLeading = 65536,
// 	ClassMask = 4026531840,
// 	ClassUnknown = 0,
// 	ClassOldStyleSerifs = 268435456,
// 	ClassTransitionalSerifs = 536870912,
// 	ClassModernSerifs = 805306368,
// 	ClassClarendonSerifs = 1073741824,
// 	ClassSlabSerifs = 1342177280,
// 	ClassFreeformSerifs = 1879048192,
// 	ClassSansSerif = 2147483648,
// 	ClassOrnamentals = 2415919104,
// 	ClassScripts = 2684354560,
// 	ClassSymbolic = 3221225472
// }

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
