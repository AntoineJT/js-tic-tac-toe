/*
    Filename : tictactoe.js
    Project : JS Tic Tac Toe
    URL : https://github.com/AntoineJT/js-tic-tac-toe
    Author : Antoine James Tournepiche
    Creation date : October 12th 2018
    Last update : April 23th 2019

    Tic Tac Toe game logic system
*/

// TODO Separate "UI" from game logic

const TicTacToe = (() => {
    const TicTacToe = {};

    // ** PRIVATE **
    // * CONSTANTS *
    const cells = document.querySelectorAll("table.tictactoe td.cell");
    // * VARIABLES *
    let hasAI;
    let plyTeam; // Player 1 (Human) Team ("row" or "circle")
    let cellOwners; // Cell owner array (this is better than get td attributes for obvious reasons)
    let plyTurn; // This is here to prevent player to cheat and to play multiples times before the AI has played
    // let roundnbr; // This is the round number to help AI (and in particular the learning one) to play faster and better (better than counting number of plyteam)

    // * FUNCTIONS *
    function reset(){
        plyTeam = "row"; // TODO Implement player1 team selection
        // NOTE try with a repeat maybe?
        cellOwners = [null, null, null, null, null, null, null, null, null]; // Reset owners
        // roundnbr = 0; // Reset number of round
        
        // TODO Rename occurrences of cell_row to cell_cross I think
        // NOTE The 2 foreach can be merged to be more efficient
        document.querySelectorAll("table.tictactoe td.cell_row")
            .forEach((cell_row) => cell_row.setAttribute("class","cell"));
        document.querySelectorAll("table.tictactoe td.cell_circle")
            .forEach((cell_circle) => cell_circle.setAttribute("class","cell"));

        console.log("Starting a new game...");
    }

    function isLegit(ply){
        if ((plyTurn && ply === plyTeam) || (!plyTurn && ply !== plyTeam)) return true;
        console.warn("Don't try to cheat, bitch!");
        return false;
    }
    
    function _playCell(cell, ply){ // Player can be the AI
        console.warn(cellOwners[cell.id]);
        console.warn(cell.id);
        if (cellOwners[cell.id] !== null || !isLegit(ply)) return false;

        cellOwners[cell.id] = ply;
        cell.setAttribute("class",`cell_${ply}`);
        // roundnbr++;

        // Check if someone wins
        const winner = getWinner();
        if (winner !== null){
            alert(winner !== "eq" ? `Winner : ${winner}` : "Equality!");
            const restart = confirm("Do you want to restart a game ?");
            if (restart){
                reset();
            }
        }
        if (hasAI) plyTurn = !plyTurn;
        return true;
    }

    // NOTE Check if it's possible to optimize more
    function getWinner(){
        if (cellOwners[4]!==null&&(
            (cellOwners[3]===cellOwners[4]&&cellOwners[4]===cellOwners[5])|| // HLine 2
            (cellOwners[1]===cellOwners[4]&&cellOwners[4]===cellOwners[7])|| // VLine 2
            (cellOwners[0]===cellOwners[4]&&cellOwners[4]===cellOwners[8])|| // DLine '\'
            (cellOwners[2]===cellOwners[4]&&cellOwners[4]===cellOwners[6]) // DLine /
        )) return cellOwners[4];
        
        if (cellOwners[0]!==null&&(
            (cellOwners[0]===cellOwners[1]&&cellOwners[1]===cellOwners[2])|| // HLine 1
            (cellOwners[0]===cellOwners[3]&&cellOwners[3]===cellOwners[6]) // VLine 1
        )) return cellOwners[0];
        
        if (cellOwners[8]!==null&&(
            (cellOwners[6]===cellOwners[7]&&cellOwners[7]===cellOwners[8])|| // HLine 3
            (cellOwners[2]===cellOwners[5]&&cellOwners[5]===cellOwners[8]) // VLine 3
        )) return cellOwners[8];
        
        if (cellOwners.includes(null)) return null; // no winner

        return "eq"; // equality
    }

    function getOppositeTeam(team){
        switch(team){
            case "row": return "circle";
            case "circle": return "row";
        }
        console.error("Invalid player team !"); // Error Message
        return team;
    }

    /*
    function quitIfNotInitialized(){
        if (cellOwners === undefined){
            console.error(`Please contact the developer and give him the following error!`);
            throw new Error("Try to use an init dependant function before initializing it!");
        }
    }
    */

    // ** PUBLIC **
    // * GETTERS *
    TicTacToe.getHumanTeam = () => {
        return plyTeam;
    }
    
    TicTacToe.getAITeam = () => {
        if (hasAI) return getOppositeTeam(plyTeam);
        return null;
    }
    
    TicTacToe.getCellOwners = () => {
        // quitIfNotInitialized();
        return cellOwners;
    }

    TicTacToe.getRandomCell = () => {
        // quitIfNotInitialized();
        while(true){
            const random = Math.floor(Math.random() * 8);
            if (cellOwners[random] === null) return random;
        }
    }

    // * FUNCTIONS *
    TicTacToe.playCell = (cellId, ply) => {
        // quitIfNotInitialized();
        const cell = cells.item(cellId);
        return _playCell(cell, ply);
    }

    TicTacToe.start = (hasAI_) => {
        hasAI = hasAI_;
        // Here is some code which do not need to be refresh between games
        reset();
        if (hasAI){
            if (typeof TicTacToeAI === 'undefined'){
                alert("AI wasn't found, game aborted!");
                throw new Error("No AI provided!");
            }
            console.log("Player VS AI game started!");
        } else {
            console.log("Player VS Player game started!");
        }
        cells.forEach((cell, i) => {
            cell.id = i;
            cell.addEventListener("click", () => {
                // If the player has the right to play and the cell is not already played (removes a glitch in the game logic which allow to skip the turn of the other player by clicking on an already played cell)
                if (plyTurn && _playCell(cell, plyTeam)){ 
                    if (hasAI){
                        // plyTurn = false;
                        console.log("That's the turn of the AI!");
                        TicTacToeAI.play(); // Call AI (standard or learning [I need to dev that])
                    } else {
                        console.log(`That's the turn of ${plyTeam}!`);
                        plyTeam = getOppositeTeam(plyTeam); // Alternate team to play in PvP
                    }
                } else if (!plyTurn) {
                    alert("Please wait... It's the turn of the AI !");
                }
            });
        });
        if (hasAI){
            plyTurn = false;
            if (confirm("Do you want the AI to play first ?")){
                TicTacToeAI.play();
            }
        }
        plyTurn = true;
    }

    console.log("TicTacToe is ready...");
    return TicTacToe;
})();
