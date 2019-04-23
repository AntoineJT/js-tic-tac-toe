/*
    Filename : tictactoe.js
    Project : JS Tic Tac Toe
    URL : https://github.com/AntoineJT/js-tic-tac-toe
    Author : Antoine James Tournepiche
    Creation date : April 23th 2019
    Last update : April 23th 2019

    Tic Tac Toe hardcoded AI
*/

// FIXME Fix stupîdity of the AI
const TicTacToeAI = (() => {
    const TicTacToeAI = {};

    let cellOwners;

    function getEmptyCell(cellIds){
        cellIds.forEach((cell, i) => {
            const cur = cellOwners[cell];
            if (cur === null) return cellIds[i];
        });
        return null;
    }

    function getCellScore(cellId){
        const cell = cellOwners[cellId];
        if (cell === null) return 0;
        return cell === TicTacToe.getAITeam() ? 1 : -1;
    }

    function playIfNeeded(cellIds){
        if (cellIds.length !== 3){
            console.error("Bad cell array size!");
            return;
        }
        let score = 0;
        cellIds.forEach((cellId) => score += getCellScore(cellId));
        if (Math.abs(score) === 2){
            return TicTacToe.playCell(getEmptyCell(cellIds), TicTacToe.getAITeam());
        }
        return false;
    }

    function playBestShot(){ // The function which is the AI
        if(playIfNeeded([3,4,5])){console.log("1")} else // HLine 2
        if(playIfNeeded([1,4,7])){console.log("2")} else // VLine 2
        if(playIfNeeded([0,4,8])){console.log("3")} else // DLine '\'
        if(playIfNeeded([2,4,6])){console.log("4")} else // DLine /
        if(playIfNeeded([0,1,2])){console.log("5")} else // HLine 1
        if(playIfNeeded([0,3,6])){console.log("6")} else // VLine 1
        if(playIfNeeded([6,7,8])){console.log("7")} else // HLine 3
        if(playIfNeeded([2,5,8])){console.log("8")} else { // VLine 3
            TicTacToe.playCell(TicTacToe.getRandomCell(), TicTacToe.getAITeam()); // Random play if nothing to block
        }
    }

    TicTacToeAI.play = () => {
        cellOwners = TicTacToe.getCellOwners();
        if (cellOwners[4] !== null){
            playBestShot();
        } else {
            TicTacToe.playCell(4, TicTacToe.getAITeam());
        }
    }

    console.log("Tic Tac Toe classic AI is ready...");
    return TicTacToeAI;
})();
