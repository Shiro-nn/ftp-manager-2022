const path = require('path');
const fs = require('original-fs');
const appdata = require('appdata-path');
const ADDir = appdata.getAppDataPath('FTP');
const DBDir = path.join(ADDir, 'LocalDataBase');
const Document = require('./Document')
module.exports = class Database {
    constructor () {
        if (!fs.existsSync(ADDir)) fs.promises.mkdir(ADDir, {recursive: true});
        if (!fs.existsSync(DBDir)) fs.promises.mkdir(DBDir, {recursive: true});
    }
    getAllDocuments(collection){
        const _dir = path.join(DBDir, collection);
        if (!fs.existsSync(_dir)) return [];
        let _arr = [];
        const files = fs.readdirSync(_dir);
        for (let i = 0; i < files.length; i++) {
            const _file = files[i];
            const data = fs.readFileSync(path.join(_dir, _file), {encoding:'utf8', flag:'r'});
            try{
                const _json = JSON.parse(data);
                if(_json != null && _json != undefined) _arr.push(new Document(collection, _file, _json));
            }catch{}
        }
        return _arr;
    }
    getDocumentById(collection, id){
        const _file = path.join(DBDir, collection, id);
        if (!fs.existsSync(_file)) return new Document(collection, id, {});
        const data = fs.readFileSync(_file, {encoding:'utf8', flag:'r'});
        try{
            const _json = JSON.parse(data);
            if(_json == null || _json == undefined) return new Document(collection, id, {});
            return new Document(collection, id, _json);
        }catch{return new Document(collection, id, {})}
    }
    getDocument(collection, filter){
        const _docs = getAllReservedDocuments();
        const _docsFilter = _docs.filter(filter);
        if(_docsFilter.length == 0) return null;
        const _dd = _docsFilter[0];
        return new Document(collection, _dd.id, _dd.json);
        function getAllReservedDocuments() {
            const _dir = path.join(DBDir, collection);
            if (!fs.existsSync(_dir)) return [];
            let _arr = [];
            const files = fs.readdirSync(_dir);
            for (let i = 0; i < files.length; i++) {
                const _file = files[i];
                try{
                    const data = fs.readFileSync(path.join(_dir, _file), {encoding:'utf8', flag:'r'});
                    const _json = JSON.parse(data);
                    if(_json != null && _json != undefined) _arr.push({json:_json, id:_file});
                }catch{}
            }
            return _arr;
        }
    }
}