const Downloader = require('nodejs-file-downloader');
const fs = require('original-fs');
const path = require('path');
const appdata = require('appdata-path');
const ADDir = appdata.getAppDataPath('FTP');
const LftDir = path.join(ADDir, 'FtpCore.exe');
module.exports = async() => {
    if (fs.existsSync(LftDir)) return;
    if (!fs.existsSync(ADDir)) fs.promises.mkdir(ADDir, {recursive: true});
    const _download = new Downloader({
        url: `https://cdn.scpsl.store/ftp/modules/FtpCore.exe`,
        directory: ADDir
    });
    await _download.download();
}