/*
    tictactoe.js
    base logic of the tic tac toe game
    Written by Antoine James Tournepiche
    on October 12th 2018
*/

let plyteam, // Human Player Team ("row" or "circle")
    cells, // Cells 
    plycells, // Cell owner array (this is better than get td attributes for obvious reasons)
    plyturn, // This is here to prevent player to cheat and to play multiples times before the AI has played
    roundnbr; // This is the round number to help AI (and in particular the learning one) to play faster and better (better than counting number of plyteam)
    //lastCell; // Last cell played (useful for AI)

function _reset(){
    let bool=(plyteam===undefined);
    plyteam="row"; // This is temp
    cells=document.querySelectorAll("table.tictactoe td.cell_row");
    for (let i=0;i<cells.length;i++){
        cells.item(i).setAttribute("class","cell");
    }
    cells=document.querySelectorAll("table.tictactoe td.cell_circle");
    for (let i=0;i<cells.length;i++){
        cells.item(i).setAttribute("class","cell");
    }
    cells=document.querySelectorAll("table.tictactoe td.cell");
    plycells=[null,null,null,null,null,null,null,null,null]; // Reset owners
    roundnbr=0; // Reset number of round
    //lastCell=-1; // -1 because nothing : this value must not be used the first round
    
    if (!bool&&AI){
        plyturn=false;
        if (confirm("Do you want the AI to play first ?")){
            aiTurn();
        }
    }
    plyturn=true;
}

function playCell(cell,ply){ // Player can be the AI
    if (plycells[cell.id_]===null){
        plycells[cell.id_]=ply;
        cell.setAttribute("class","cell_"+ply);
        //lastCell=cell.id_;
        roundnbr++;
    } else {
        return false;
    }
    // Check if someone's win
    let winner=getWinner();
    if (winner!=null){
        if (winner!="eq"){
            alert("Winner : "+winner);
        } else {
            alert("Equality !");
        }
        if (confirm("Do you want to restart a game ?")){
            _reset();
        }
    }
    return true;
}

function getWinner(){
    if (plycells[4]!=null&&(
        (plycells[3]==plycells[4]&&plycells[4]==plycells[5])|| // HLine 2
        (plycells[1]==plycells[4]&&plycells[4]==plycells[7])|| // VLine 2
        (plycells[0]==plycells[4]&&plycells[4]==plycells[8])|| // DLine '\'
        (plycells[2]==plycells[4]&&plycells[4]==plycells[6]) // DLine /
    )){
        return plycells[4];
    } else if (plycells[0]!=null&&(
            (plycells[0]==plycells[1]&&plycells[1]==plycells[2])|| // HLine 1
            (plycells[0]==plycells[3]&&plycells[3]==plycells[6]) // VLine 1
    )){
        return plycells[0];
    } else if (plycells[8]!=null&&(
        (plycells[6]==plycells[7]&&plycells[7]==plycells[8])|| // HLine 3
        (plycells[2]==plycells[5]&&plycells[5]==plycells[8]) // VLine 3
    )){
        return plycells[8];
    } else if (!plycells.includes(null)){
        return "eq"; // equality
    } else {
        return null;
    }
}

function getOppositeTeam(team){
    if (team=="row"){
        return "circle";
    } else if (team=="circle"){
        return "row";
    } else {
        console.error("Invalid player team !"); // Error Message
        return team;
    }
}

function randomCell(){
    let random=Math.floor(Math.random()*8);
    if (plycells[random]===null){
        return random;
    } else {
        randomCell();
    }
}

/*
    This function must be called only once
*/
function start(){
    // Here is some code which do not need to be refresh between games
    _reset();
    for (let i=0;i<cells.length;i++){
        cells.item(i).id_=i; // Keep id of cell
        //cells.item(i).textContent=i; //Debug Line used to make getWinner function
        cells.item(i).addEventListener("click",function(){
            // If the player has the right to play and the cell is not already played (removes a glitch in the game logic which allow to skip the turn of the other player by clicking on an already played cell)
            if (plyturn&&playCell(this,plyteam)){ 
                if (AI){
                    plyturn=false;
                    aiTurn(); // Call AI (standard or learning [I need to dev that])
                } else {
                    plyteam=getOppositeTeam(plyteam); // Alternate team to play in PvP
                }
            } else if (!plyturn) {
                alert("Please wait... It's the turn of the AI !");
            }
        });
    }
    if (AI){
        if (confirm("Do you want the AI to play first ?")){
            aiTurn();
        }
    }
}