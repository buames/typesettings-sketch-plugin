import UI from 'sketch/ui'
import { openPrompt } from '../utils/prompts'
import { preferences, savePreferences } from '../storage'

export default (context) => {
  const sections = [
    {
      items: [
        {
          type: 'title',
          label: 'Local Registry'
        },
        {
          type: 'input',
          value: preferences.userDefinedDirectory,
          placeholder: 'Local Registry'
        }
      ]
    },
    {
      title: 'Automatic Typesetting',
      items: [
        {
          type: 'checkbox',
          title: 'Enable Auto Character Spacing',
          state: preferences.allowsAutoKerning
        },
        {
          type: 'checkbox',
          title: 'Enable Auto Line Height',
          state: preferences.allowsAutoLineHeight
        }
      ]
    },
    {
      title: 'Ignoring Text Layers',
      items: [
        {
          type: 'title',
          label: 'Prefix'
        },
        {
          type: 'input',
          value: preferences.ignorePrefix,
          placeholder: 'Prefix'
        },
        {
          type: 'title',
          label: 'Suffix'
        },
        {
          type: 'input',
          value: preferences.ignoreSuffix,
          placeholder: 'Suffix'
        }
      ]
    }
  ]

  const prompt = openPrompt({
    sections,
    title: 'Typesettings Preferences',
    buttons: ['Save', 'Cancel', 'Learn More'],
    shouldTabInputs: true
  })

  // Learn More clicked
  if (prompt.response === 1002) {
    NSWorkspace.sharedWorkspace().openURL(
      NSURL.URLWithString(`${ context.plugin.homepageURL() }`)
    )
    return
  }

  // Cancel clicked
  if (prompt.response === 1001) return

  // Save clicked
  const done = savePreferences({
    userDefinedDirectory: String(prompt.inputs[0].stringValue()),
    allowsAutoKerning: prompt.inputs[1].state(),
    allowsAutoLineHeight: prompt.inputs[2].state(),
    ignorePrefix: String(prompt.inputs[3].stringValue()),
    ignoreSuffix: String(prompt.inputs[4].stringValue())
  })

  UI.message(done)
}
