/*
    classicAI.js
    This is a classic AI (a hardcoded one) for the Tic Tac Toe
    Written by Antoine James Tournepiche
    on October 12th 2018
*/
/*
function getEmptyCell(cell_arr){ // cell_arr -> array of numbers (between 0 and 8)
    let index=plycells.findIndex(null); // Don't check if == -1 because if used correcly, it will not throw that
    cell_arr.sort(); // so cell_arr[2] is now the biggest cell
    if (index>=cell_arr[1]){ // This is functionnal only if it's greatly used
        if (plycells[cell_arr[1]]===null){
            return cell_arr[1];
        } else {
            return cell_arr[2];
        }
    } else {
        return cell_arr[0];
    }
}
*/

function getEmptyCell(cell_arr){ // To optimize maybe
    let cur;
    for (let i=0;i<3;i++){
        cur=plycells[cell_arr[i]];
        if (cur===null){
            return cell_arr[i];
        }
    }
    return null;
}

let scoreCell=[];
let score;

function playIfNeeded(i1,i2,i3){
	score=scoreCell[i1]+scoreCell[i2]+scoreCell[i3]; // I think the problem is here
	//document.querySelector("header").innerHTML+='<br/>'+i1+';'+i2+';'+i3;
    if (score===2||score===-2){
		playCell(getEmptyCell([i1,i2,i3]),getOppositeTeam(plyteam));
        return true;
    }
    return false;
}

function playBestShot(){ // The function which is the AI
    for (let i=0;i<9;i++){
        if (plycells[i]===plyteam){
            scoreCell[i]=-1;
        } else if (plycells[i]===getOppositeTeam(plyteam)){
            scoreCell[i]=1;
        } else /*if (plycells[i]===null)*/{
            scoreCell[i]=0;
        }
    }
    
    if(playIfNeeded(3,4,5)){console.log("1");} else // HLine 2
    if(playIfNeeded(1,4,7)){console.log("2");} else // VLine 2
    if(playIfNeeded(0,4,8)){console.log("3");} else // DLine '\'
    if(playIfNeeded(2,4,6)){console.log("4");} else // DLine /
    if(playIfNeeded(0,1,2)){console.log("5");} else // HLine 1
    if(playIfNeeded(0,3,6)){console.log("6");} else // VLine 1
    if(playIfNeeded(6,7,8)){console.log("7");} else // HLine 3
    if(playIfNeeded(2,5,8)){console.log("8");} else { // VLine 3
        playCell(cells.item(randomCell()),getOppositeTeam(plyteam)); // Random play if nothing to block
    }
}

function aiTurn(){
    //if (plycells.includes(plyteam)){
    /*
    if (roundnbr!=0){ // When it's not the first round
        if (plycells[4]!==null){
            
        } else {
            playCell(cells.item(4),aiteam);
        }
        
        /*
        if (plycells[4]===plyteam){ // TODO Faire en sorte que l'IA ne joue pas au pif chaque tour
            playCell(cells.item(randomCell()),aiteam);
        }
    } else { // If the AI plays first
        playCell(cells.item(4),aiteam); // Best thing to do
    }
    */
    if (plycells[4]!==null){
        playBestShot();
    } else {
        playCell(cells.item(4),getOppositeTeam(plyteam));
    }
    plyturn=true;
}
