import { app, BrowserWindow} from 'electron'

const createWindow = () => {
    const win = new BrowserWindow({

    })

    win.loadURL("http://localhost:5173")
}

app.addListener("ready", () => {
    createWindow();
})