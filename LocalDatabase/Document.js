const path = require('path');
const fs = require('original-fs');
const appdata = require('appdata-path');
const ADDir = appdata.getAppDataPath('FTP');
const DBDir = path.join(ADDir, 'LocalDataBase');
module.exports = class Document {
    constructor (collection, id, json) {
        this.collection = collection;
        this.json = json;
        this.id = id;
    }
    save(){
        const _file = path.join(DBDir, this.collection, this.id);
        if (!fs.existsSync(ADDir)) fs.promises.mkdir(ADDir, {recursive: true});
        if (!fs.existsSync(DBDir)) fs.promises.mkdir(DBDir, {recursive: true});
        if (!fs.existsSync(ADDir)) fs.promises.mkdir(ADDir, {recursive: true});
        if (!fs.existsSync(path.join(DBDir, this.collection))) fs.promises.mkdir(path.join(DBDir, this.collection), {recursive: true});
        fs.writeFileSync(_file, JSON.stringify(this.json), {encoding: "utf8", flag: "a+", mode: 0o666});
    }
}