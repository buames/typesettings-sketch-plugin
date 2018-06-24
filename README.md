## Typesettings Sketch Plugin

Create typesettings—specifically character spacing and line height—once and use them anywhere. Set character spacing and line height of text layers based on the `font family`, `font size`, and `letter casing`. Better yet, let the plugin do it for you automatically when you allow it to from the plugin preferences.

[Below](#pre-registered) you'll find typsettings that are already included with the plugin.

---

### Usage

#### `Set Character Spacing`

Sets the character spacing of any selected text layer based on the font and text size. You can `enable automatic character spacing`—when deselecting text layers—in the plugin preferences.

#### `Set Line Height`

Sets the line height of any selected text layer based on the font and text size. You can `enable automatic line height`—when deselecting text layers—in the plugin preferences.

#### `Register Typesettings`

To register typesettings, you'll want to do the following:

1. Create your text layers
2. Select all text layers
3. Go to `Plugins` > `Typesettings` > `Register Typesettings`

**Letter Casing**

You can create typesettings for uppercase, lowercase (if that's a thing?), and no casing.

In order to properly save the typesettings for a given letter casing, you'll need to make sure that the text layers has the desired `Text Transform` option when registering the typesettings.

For example:
1. Create two text layers using the same font and font size
2. Select one of the text layers and set the `Text Transform` option to `Uppercase` using the [Text Inspector](https://sketchapp.com/docs/text/text-inspector)
3. Set the character spacing and line height of each text layer to whatever you want
4. Select both layers and Register them

**Where are the settings saved?**

By default, your `<font_family_name>.json` file will save to your `Desktop` but you can change the directory (for instance, to a shared folder) from the plugin preferences.

--- 

### (Pre) Registered

The following typefaces have been registered and automatically included with the plugin. If you'd like to add more, put the typesettings in the `assets` directory and open a pull request.

- **[SF Pro Display](https://developer.apple.com/fonts)** from iOS resource [guidelines](https://developer.apple.com/design/resources)
- **[SF Pro Text](https://developer.apple.com/fonts)** from iOS resource [guidelines](https://developer.apple.com/design/resources)
- **[SF Compact](https://developer.apple.com/fonts)** from watchOS resource [guidelines](https://developer.apple.com/design/resources)

--- 

### Development

_This plugin was created using `skpm`. For a detailed explanation on how things work, checkout the [skpm Readme](https://github.com/skpm/skpm/blob/master/README.md)._

