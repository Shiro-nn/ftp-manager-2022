const _electron = require('electron');

const menu = [{
    label: '&FTP',
    icon: _electron.nativeImage.createFromPath(__dirname + '/../icons/ftp.ico').resize({width:16}),
    enabled: false
},{
    label: '&Quit',
    click: () => _electron.app.exit(0),
}];

module.exports = async(win) => {
    const tray = new _electron.Tray(__dirname + "/../icons/ftp.ico")
    tray.setToolTip('FTP');
    tray.setIgnoreDoubleClickEvents(true);
    tray.on('click', () => win.show());
    setTimeout(() => tray.setContextMenu(_electron.Menu.buildFromTemplate(menu)), 1000);
};