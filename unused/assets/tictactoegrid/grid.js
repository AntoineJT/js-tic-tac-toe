/*
    Antoine James Tournepiche
    12/10/2018
*/
function tictactoe_init(path){
    document.querySelector("head").innerHTML+='<link rel="stylesheet" href="'+path+'/grid.css">';
}
function tictactoe_insertGrid(qS){ // qS -> querySelector
    fetch("grid.html").then(response=>{
        return response.text();
    }).then(body=>{
        document.querySelector(qS).innerHTML+=body;
    });
}