/*
    Filename : tictactoe.js
    Author : Antoine James Tournepiche
    on October 12th 2018

    Tic Tac Toe game logic system
*/

const TicTacToe = (() => {
    const TicTacToe = {};

    // let isInit = false; // Boolean here to check if the game has been started

    let plyteam; // Human Player Team ("row" or "circle")
    let plycells; // Cell owner array (this is better than get td attributes for obvious reasons)
    let plyturn; // This is here to prevent player to cheat and to play multiples times before the AI has played
    // let roundnbr; // This is the round number to help AI (and in particular the learning one) to play faster and better (better than counting number of plyteam)

    function reset(hasAI){
        plyteam = "row"; // This is temp
        // NOTE is that even needed? Maybe just a [] is sufficient
        plycells = [null, null, null, null, null, null, null, null, null]; // Reset owners
        roundnbr = 0; // Reset number of round
        
        // TODO Rename occurrences of cell_row to cell_cross I think
        // NOTE The 2 foreach can be merged to be more efficient
        document.querySelectorAll("table.tictactoe td.cell_row")
            .forEach((cell_row) => cell_row.setAttribute("class","cell"));
        document.querySelectorAll("table.tictactoe td.cell_circle")
            .forEach((cell_circle) => cell_circle.setAttribute("class","cell"));

        if (plyteam !== undefined && hasAI){
            plyturn = false;
            if (confirm("Do you want the AI to play first ?")){
                // TODO Implement that but in a different way (ES6 modules)
                // aiTurn();
            }
        }
        plyturn = true;

        console.log("Starting a new game...");
    }
    
    // NOTE Private or public?
    function playCell(cell, ply){ // Player can be the AI
        if (plycells[cell.id] !== null) return false;

        plycells[cell.id] = ply;
        cell.setAttribute("class",`cell_${ply}`);
        // roundnbr++;

        // Check if someone wins
        const winner = getWinner();
        if (winner != null){ // NOTE Is coercion needed here?
            const msg = winner !== "eq" ? `Winner : ${winner}` : "Equality!"; // TODO Check if coercion is needed here
            alert(msg);
            const restart = confirm("Do you want to restart a game ?");
            if (restart){
                reset();
            }
        }
        return true;
    }

    // NOTE Private or Public?
    // NOTE Check if it's possible to optimize more
    function getWinner(){
        if (plycells[4]!==null&&(
            (plycells[3]===plycells[4]&&plycells[4]===plycells[5])|| // HLine 2
            (plycells[1]===plycells[4]&&plycells[4]===plycells[7])|| // VLine 2
            (plycells[0]===plycells[4]&&plycells[4]===plycells[8])|| // DLine '\'
            (plycells[2]===plycells[4]&&plycells[4]===plycells[6]) // DLine /
        )) return plycells[4];
        
        if (plycells[0]!==null&&(
            (plycells[0]===plycells[1]&&plycells[1]===plycells[2])|| // HLine 1
            (plycells[0]===plycells[3]&&plycells[3]===plycells[6]) // VLine 1
        )) return plycells[0];
        
        if (plycells[8]!==null&&(
            (plycells[6]===plycells[7]&&plycells[7]===plycells[8])|| // HLine 3
            (plycells[2]===plycells[5]&&plycells[5]===plycells[8]) // VLine 3
        )) return plycells[8];
        
        if (plycells.includes(null)) return null; // no winner

        return "eq"; // equality
    }

    // NOTE Private or Public?
    function getOppositeTeam(team){
        switch(team){
            case "row": return "circle";
            case "circle": return "row";
        }
        console.error("Invalid player team !"); // Error Message
        return team;
    }

    // NOTE Private or Public?
    function randomCell(){ // TODO Refactor it to getRandomCell()
        const random = Math.floor(Math.random() * 8);
        if (plycells[random] === null) return random;
        randomCell();
    }

   TicTacToe.start = ((hasAI) => {
        // Here is some code which do not need to be refresh between games
        reset(hasAI);
        document.querySelectorAll("table.tictactoe td.cell").forEach((cell, i) => {
            cell.id = i;
            cell.addEventListener("click", () => {
                // If the player has the right to play and the cell is not already played (removes a glitch in the game logic which allow to skip the turn of the other player by clicking on an already played cell)
                if (plyturn && playCell(cell, plyteam)){ 
                    if (hasAI){
                        plyturn = false;
                        console.log("That's the turn of the AI!");
                        // aiTurn(); // Call AI (standard or learning [I need to dev that])
                    } else {
                        console.log(`That's the turn of ${plyteam}!`);
                        plyteam = getOppositeTeam(plyteam); // Alternate team to play in PvP
                    }
                } else if (!plyturn) {
                    alert("Please wait... It's the turn of the AI !");
                }
            });
        });
        if (hasAI){
            console.log("Player VS AI game started!");
            if (confirm("Do you want the AI to play first ?")){
                // aiTurn();
            }
        } else {
            console.log("Player VS Player game started!");
        }
    });

    console.log("TicTacToe is ready...");
    return TicTacToe;
})();
