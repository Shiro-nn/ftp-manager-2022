const { app, Menu, BrowserWindow, Tray, Notification, shell, ipcMain, protocol, session, globalShortcut } = require('electron');
const path = require('path');
const { Database, Document } = require('./LocalDatabase');
const DB = new Database();

async function createWindow() {
    const win = new BrowserWindow({
        show: false,
        width: 1200,
        height: 900,
        icon: __dirname + '/icons/ftp.png',
        webPreferences: {
            //devTools: false,
            preload: path.join(__dirname, 'views', 'scripts', 'preload.js')
        },
        frame: false,
        titleBarStyle: 'hidden',
        backgroundColor: '#0D1117',
        title: 'FTP',
        darkTheme: true,
    });
    win.once('ready-to-show', () => StartApp(win));
    win.on('close', (e) => {
        e.preventDefault();
        win?.hide();
    });
    win.loadURL(path.join('file://', __dirname, 'views', 'init.html'));
    ipcMain.on('navbarEvent', (event, code) => {
        if (code == 1) win.minimize();
        else if (code == 2) {
            if (win.isMaximized()) win.unmaximize();
            else win.maximize();
        }
        else if (code == 3) win.hide();
    });
}
async function StartApp(win) {
    win.show();
    await require('./modules/AutoUpdater')();
    //await require('./modules/FtpCoreInstaller')();
    require('./modules/startupMenu')(win);
    win.webContents.send('load_page', 1, DB.getAllDocuments('active.connections'));

}
app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})