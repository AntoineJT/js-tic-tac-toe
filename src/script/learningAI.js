/*
    learningAI.js
    This is a classic AI (a hardcoded one) for the Tic Tac Toe
    Written by Antoine James Tournepiche
    on October 13th 2018
*/

const sql=window.SQL; // Useless thing I think
let db; // Database (in Memory)

function initAI(database){
    if (database===undefined){ // If it has no args
        db=new sql.Database();
        createDatabase();
    } else {
        db=database;
    }
}

/*
    Database scheme
    index(id,aibegins,eq,aiwins)
        id -> primary key, used as a foreign key into the other tables
        aibegins -> boolean, indicates if the AI was the first to play
        eq -> boolean, indicates if it has no winner
        aiwins -> boolean, indicates if ai has win
    ...
function createDatabase(){
    db.run("CREATE TABLE index (id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,aibegins BOOLEAN NOT NULL,eq BOOLEAN NOT NULL DEFAULT false,aiwins BOOLEAN,PRIMARY KEY(id));"+
        "CREATE TABLE games (id INTEGER UNSIGNED NOT NULL UNIQUE,r1 INTEGER UNSIGNED,r2 INTEGER UNSIGNED,r3 INTEGER UNSIGNED,r4 INTEGER UNSIGNED,r5 INTEGER UNSIGNED,r6 INTEGER UNSIGNED,r7 INTEGER UNSIGNED,r8 INTEGER UNSIGNED,r9 INTEGER UNSIGNED,PRIMARY KEY(r1,r2,r3,r4,r5,r6,r7,r8,r9));"
    );
}
*/

function createDatabase(){
    db.run("CREATE TABLE main (aibegins BOOLEAN, eq BOOLEAN, aiwins BOOLEAN, r1 INTEGER, r2 INTEGER, r3 INTEGER, r4 INTEGER, r5 INTEGER, r6 INTEGER, r7 INTEGER, r8 INTEGER, r9 INTEGER)");
}
/*
function countValueTimes(json_text,value){
    return json_text.filter(d => d==value).length;
}
function selectBestCellToPlay(json_text){
    let best=-1;
    let cur;
    for (let i=0;i<9;i++){
        if (plycells[i]===null){
            cur=countValueTimes(json_text,i);
            if (cur>best){
                best=i;
            }
        }
    }
    return best;
}
function countArrayValue(arr) { // See : http://jsfiddle.net/simevidas/bnACW/
    let a=[],b=[],prev;
    arr.sort();
    for (let i=0;i<arr.length;i++){
        if (arr[i]!==prev) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev=arr[i];
    }
    return [a, b]; // a -> values ; b -> frequency of each value;
}
*/

function countValueTimes(arr,value){
    let start=arr.findIndex(value);
    if (start!=-1){
        let times=0;
        arr.sort();
        for (let i=start;i<arr.length;i++){
            if (arr[i]==value) {
                times++;
            } else {
                break;
            }
        }
        return times;
    } else {
        return 0; 
    }
}

function selectBestCellToPlay(arr){
    let best=-1,
        bf=-1, // Biggest frequency
        cf=-1; // Current frequency
    for (let i=0;i<9;i++){
        if (plycells[i]===null){
            document.write(i); // DEBUG LINE
            cf=countValueTimes(arr,i);
            if (cf>bf){
                document.write("."+i);
                bf=cf;
                best=i;
            }
        }
    }
    return best;
}

function aiTurn(){
    if (roundnbr!=0){
        
    } else { // If the AI plays first
        //let test=db.exec("SELECT COUNT(r1) FROM games WHERE index.id=games.id AND index.eq=false AND index.aibegins=index.aiwins "); // index.aibegins=index.aiwins is an optimized version of ((index.aibegins=true AND index.aiwins=true) OR (index.aibegins=false AND index.aiwins=false))
        db.run("INSERT INTO main (aibegins,aiwins,eq,r1) VALUES (0,0,0,4);INSERT INTO main (aibegins,aiwins,eq,r1) VALUES (0,0,0,4);INSERT INTO main (aibegins,aiwins,eq,r1) VALUES (0,0,0,7);");
        let test=db.exec("SELECT r1 FROM main WHERE eq=0 AND aibegins=aiwins;");
        document.write(test[0]["values"]);
        document.write('<br/>'+selectBestCellToPlay(test[0]["values"]));
    }
    plyturn=true;
}
