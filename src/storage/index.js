import Settings from 'sketch/settings'
import { __DEV__ } from '../utils/helpers'

export const MIN_VERSION = '0.0.3'

export const preferences = {
  pluginDefinedDirectory: __DEV__
    ? 'Development/typesettings-sketch-plugin/directory'
    : 'Library/Application Support/com.bohemiancoding.sketch3/Plugins/typesettings.sketchplugin/Contents/Resources',
  userDefinedDirectory: Settings.settingForKey('userDefinedDirectory') || 'Desktop',
  allowsAutoKerning: Settings.settingForKey('allowsAutoKerning') || false,
  allowsAutoLineHeight: Settings.settingForKey('allowsAutoLineHeight') || false,
  ignorePrefix: Settings.settingForKey('ignorePrefix') || '^',
  ignoreSuffix: Settings.settingForKey('ignoreSuffix') || '^'
}

export const savePreferences = (newPrefs) => {
  const prefs = { ...preferences, ...newPrefs }
  Object.keys(prefs).forEach((key) => {
    Settings.setSettingForKey(key, prefs[key])
  })
  return 'Updated Settings'
}
