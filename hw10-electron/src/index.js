import { app, BrowserWindow } from 'electron'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const _filename = fileURLToPath(import.meta.url)
const _dirname = dirname(_filename)

app.whenReady().then (() => {
  const mainWindow = new BrowserWindow ({
    width: 600,
    height: 900,
    webPreferences: {
      noIntegration: true,
      contextIsolation: false,
    }
  })
  mainWindow.loadFile(join(_dirname,'./index.html'))
})