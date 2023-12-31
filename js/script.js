let turns = 0; 
let r = 1;
let hej = 1;
let emptyTile;


const order = [];
order[0] = [1, 2, 7, 5, 4, 8, 9, 6, 3];
order[1] = [2, 8, 9, 1, 6, 4, 7, 3, 5];
order[2] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let imgOrder = order[2];

let tileID;
window.onload = function() {
    imgOrder.forEach((imgID) => {
        if(hej > 3) { r += 1; hej = 1; }
        let tile = document.createElement("img");
        tileID = getID(imgID);
        tile.id = tileID;

        tile.src = "img/charmander500-3x3-" + imgID + ".png";
        tile.className = "img_" + r +"x" + hej
        document.getElementById("board").append(tile)
        hej++;
    });
    emptyTile = document.getElementById('img_1x3');
    document.getElementById('start').addEventListener("click", startGame);
}
function startGame() {
    for(let i = 1; i < 10; i++) {
        document.getElementById(getID(i)).remove();
    }
    turns = 0;
    document.getElementById('turns').innerHTML = turns +" tryck";
    r = 1;
    hej = 1;
    imgOrder = order[Math.random().toFixed(0)];
   
    imgOrder.forEach((imgID) => {
        if(hej > 3) { r += 1; hej = 1; }
        let tile = document.createElement("img");

        tileID = getID(imgID);
    

        tile.id = tileID;
        tile.src = "img/charmander500-3x3-" + imgID + ".png";


        tile.className = "img_" + r +"x" + hej
        tile.addEventListener("click", moveTile);
        document.getElementById("board").append(tile)

        hej++;
    });
    emptyTile = document.getElementById('img_1x3');
}
function moveTile() {
    
    let currentClass = this.classList.toString();
    let currentTilePlace = currentClass.split("x");
    let currentTileRow = parseInt(currentTilePlace[0][4]);
    let currentTileColumn = parseInt(currentTilePlace[1]);

    let spaceClass = emptyTile.classList.toString();
    let emptyTilePlace = spaceClass.split("x");
    let emptyTileRow = parseInt(emptyTilePlace[0][4]);
    let emptyTileColumn = parseInt(emptyTilePlace[1]);

    
    if((currentTileRow == emptyTileRow && (emptyTileColumn == (currentTileColumn - 1) || emptyTileColumn == (currentTileColumn + 1))) || (currentTileColumn == emptyTileColumn && (emptyTileRow == (currentTileRow -1) || emptyTileRow == (currentTileRow + 1)))) {
        this.classList.remove(currentClass);
        emptyTile.classList.remove(spaceClass);
        this.classList.add(spaceClass);
        emptyTile.classList.add(currentClass);

        turns++;
        document.getElementById('turns').innerHTML = turns +" tryck";
        playAudio();
        checkBoard();
    }
    else {
        this.style = "opacity: 0.75";
        setTimeout(() => { this.style = "opacity: 1"; },100);
    }
    
}
function checkBoard() {
    let j = 0;
    for(let i = 1; i < 10; i++) {
        let imgID = getID(i);
        let imgClass = document.getElementById(imgID).classList;
        if(imgID == imgClass) {
            j++;
        }
    }
    if(j == 9) {
        document.getElementById('turns').innerHTML = "Du klarade det på " + turns + " tryck";
        for(let i = 1; i < 10; i++) {
            let tile = document.getElementById(getID(i));
            tile.removeEventListener("click", moveTile);
        }
    }
}
function playAudio() {
    var audio = new Audio('./audio/tilemovement.wav');
    audio.volume = 0.25;
    audio.play();
}

function getID(tileID) {
    switch(tileID) {
        case 1:
            tileID = 'img_1x1';
            break;                
        case 2:
            tileID = 'img_1x2';
            break;
        case 3:
            tileID = 'img_1x3';
            break;
        case 4:
            tileID = 'img_2x1';
            break;                
        case 5:
            tileID = 'img_2x2';
            break;
        case 6:
            tileID = 'img_2x3';
            break;
        case 7:
            tileID = 'img_3x1';
            break;                
        case 8:
            tileID = 'img_3x2';
            break;
        case 9:
            tileID = 'img_3x3';
            break;
    }
    return tileID;
}