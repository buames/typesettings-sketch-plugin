# Typesettings Sketch Plugin

Create typesettings once and use them anywhere. Set character spacing and line height of text layers based on the `font family`, `font weight`, `font size`, and `letter casing`. Better yet, let the plugin do it for you automatically when you allow it to from the plugin preferences.

[Below](#pre-registered) you'll find typsettings that are already included with the plugin.

## Demo

![Demo](/docs/demo.gif)

Get the [TypesettingsStarter.sketch](/docs/sketch-templates/TypesettingsStarter.sketch) file to get going easily.

## Installation

You can install the plugin with [Sketch Runner](https://sketchrunner.com) or by downloading it from the [latest release](https://github.com/buames/typesettings-sketch-plugin/releases/latest).

## Commands

### Set Character Spacing

```
cmd + shift + right arrow
```

Sets the character spacing of any selected text layer based on the font and text size. You can `enable automatic character spacing` in the plugin preferences.

### Set Line Height

```
cmd + shift + down arrow
```

Sets the line height of any selected text layer based on the font and text size. You can `enable automatic line height` in the plugin preferences.

### Register Typesettings

```
ctrl + alt + cmd + return
```

To register typesettings, you'll want to do the following:

1. Create your text layers using any size, weight, and letter casing permutation
2. Set the character spacing and line height for each
2. Select all text layers
3. Go to `Plugins` > `Typesettings` > `Register Typesettings`

**Letter Casing**

You can create typesettings for uppercase, lowercase (if that's a thing?), and no casing.

In order to properly save the typesettings for a given letter casing, you'll need to make sure that the text layers has the desired `Text Transform` option when registering the typesettings.

For example:
1. Create two text layers using the same font family, font size, and weight
2. Select one of the text layers and set the `Text Transform` option to `Uppercase` using the [Text Inspector](https://sketchapp.com/docs/text/text-inspector)
3. Set the character spacing and line height of each text layer to whatever you want
4. Select both layers and Register them

### Preferences

```
ctrl + alt + cmd + t
```

**Local Registry**

When registering your typesettings, the `<font_family_name>.json` file will save to your `Desktop` by default. You can change the directory (for instance, to a shared folder) from the plugin preferences.

**Automatic Typesetting**

- `Enable Automatic Character Spacing`: Automatically sets character spacing—if the typesetting is registered —when deselecting text layers. This is turned off by default.
- `Enable Automatic Line Height`: Automatically sets line height—if the typesetting is registered —when deselecting text layers. This is turned off by default.

**Ignoring Text Layers**

When `automatic character spacing` and/or `automatic line height` are enabled, you can ignoring any text layer by adding the prefix `^` or the suffix `^` to text layer name. Note that if you manually typeset the text layers they will not be ignored.

You can change both the prefix and suffix in the plugin preferences.

## (Pre) Registered

The following typefaces have been registered and automatically included with the plugin. If you'd like to add more, put the typesettings in the `directory` folder and open a pull request.

- **[SF Pro Display](https://developer.apple.com/fonts)** from iOS resource [guidelines](https://developer.apple.com/design/resources)
- **[SF Pro Text](https://developer.apple.com/fonts)** from iOS resource [guidelines](https://developer.apple.com/design/resources)
- **[SF Compact](https://developer.apple.com/fonts)** from watchOS resource [guidelines](https://developer.apple.com/design/resources)

## Development

_This plugin was created using `skpm`. For a detailed explanation on how things work, checkout the [skpm Readme](https://github.com/skpm/skpm/blob/master/README.md)._

