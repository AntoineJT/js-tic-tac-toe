/*
    sql-util.js
    This is a set of functions to use SQLite correctly
    Written by Antoine James Tournepiche
    on October 13th 2018
*/

/*
    Needs to be tested
*/
function importDB(path){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.responseType = 'arraybuffer';

    let db;
    xhr.onload = e => {
        db = new SQL.Database(new Uint8Array(this.response));
    };
    xhr.send();
    return db;
}

/*
    Very useless function : needs to be removed !
*/
function exportDB(db){
    return db.export();
}
/*
function parseResult(result){
    return JSON.parse(JSON.stringify(result));
}
*/