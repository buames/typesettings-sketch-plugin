import React from 'react'
import { render } from 'react-dom'
import { HashRouter } from "react-router-dom"
import Root from './Root'

// Disable the context menu to have a more native feel
// document.addEventListener('contextmenu', (e => (
//   e.preventDefault()
// )))

const renderApp = () => (
  render(
    <HashRouter>
      <Root />
    </HashRouter>,
    document.getElementById("root")
  )
)

renderApp()

// Call from the webview to the plugin
// document.getElementById('button').addEventListener('click', () => {
//   pluginCall('nativeLog', 'Called from the webview')
// })

// Call from the plugin back to the webview
// window.setRandomNumber = (randomNumber) => {
//   document.getElementById('answer').innerHTML = 'Random number from the plugin: ' + randomNumber
// }

console.log('Loaded!')
