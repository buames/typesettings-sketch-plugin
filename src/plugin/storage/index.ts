import Settings from 'sketch/settings'
import { isDev } from '../utils/helpers'

export const MIN_VERSION = '0.0.3'

interface Preferences {
  pluginDefinedDirectory?: string;
  userDefinedDirectory?: string;
  allowsAutoKerning?: boolean;
  allowsAutoLineHeight?: boolean;
  ignorePrefix?: string;
  ignoreSuffix?: string;
}

export const preferences: Preferences = {
  pluginDefinedDirectory: isDev
    ? `${ NSHomeDirectory() }/Development/typesettings/typesettings-sketch-plugin/src/directory`
    : `${ NSHomeDirectory() }/Library/Application Support/com.bohemiancoding.sketch3/Plugins/typesettings.sketchplugin/Contents/Resources`,
  userDefinedDirectory: Settings.settingForKey('userDefinedDirectory') || `${ NSHomeDirectory() }/Desktop`,
  allowsAutoKerning: Settings.settingForKey('allowsAutoKerning') || false,
  allowsAutoLineHeight: Settings.settingForKey('allowsAutoLineHeight') || false,
  ignorePrefix: Settings.settingForKey('ignorePrefix') || '^',
  ignoreSuffix: Settings.settingForKey('ignoreSuffix') || '^'
}

export const savePreferences = (newPrefs: Preferences) => {
  const prefs = { ...preferences, ...newPrefs }
  Object.keys(prefs).forEach((key) => {
    Settings.setSettingForKey(key, prefs[key])
  })
  return prefs
}
