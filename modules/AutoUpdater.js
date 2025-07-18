const { app } = require('electron');
const requests = require('./AutoUpdater/requests');
const Downloader = require('nodejs-file-downloader');
const fs = require('original-fs');
const path = require('path');
const version = require('../package.json').version;
const appdata = require('appdata-path');
const ADDir = appdata.getAppDataPath('FTP');
const TempDir = path.join(ADDir, 'Temp');
const AsarFile = path.join(TempDir, 'app.asar');
const RunDir = app.getAppPath();
module.exports = async() => {
    if (fs.existsSync(AsarFile)) fs.rmSync(AsarFile, { recursive: true, force: true });
    if (!fs.existsSync(ADDir)) fs.promises.mkdir(ADDir, {recursive: true});
    if (!fs.existsSync(TempDir)) fs.promises.mkdir(TempDir, {recursive: true});
    if(!RunDir.includes('app.asar')) return;
    const _req = await requests.Send('https://cdn.scpsl.store/ftp/updater/app.version');
    if(_req.error || _req.response.statusCode != 200) return;
    if(_req.body == version) return;
    const _download = new Downloader({
        url: `https://cdn.scpsl.store/ftp/updater/${_req.body}/app.asar`,
        directory: TempDir
    });
    await _download.download();
    if (fs.existsSync(RunDir)) fs.rmSync(RunDir, { recursive: true, force: true });
    await CopyFile(AsarFile, RunDir);
    try{fs.rmSync(AsarFile, { recursive: true, force: true });}catch{}
    app.relaunch();
    app.exit(0);
}
function CopyFile(src, dest) {return new Promise(resolve => fs.copyFile(src, dest, () => resolve()));}