var playdesk = new Playdesk(10, 10);
console.log("PLAYDESK:" + JSON.stringify(playdesk));


let fieldArrayWithMinesAndNumbers = playdesk.setNumbersOnField();

createField_Interface();

function rightClickHandler(event) {
    event.preventDefault();
    var cellRightClicked = event.target;
    cellRightClicked.style.backgroundImage = "url('./assets/images/flag.png') ";
    cellRightClicked.style.backgroundSize = "cover";
    return false;
}

function clickHandler(event) {
    var id_arr = (event.target.id).split("_");
    var x = Number(((event.target.id).split("_"))[1]);
    var y = Number(((event.target.id).split("_"))[0]);
    let numOfSteps = document.getElementById("steps");
    var numOnField = fieldArrayWithMinesAndNumbers[id_arr[0]][id_arr[1]];

    if (numOnField !== 0 && numOnField !== "B" && playdesk.gamePlay === true) {

        variant_num(x, y, numOnField);
        numOfSteps.innerHTML = playdesk.numberOfSteps;
    } else if (numOnField === 0 && playdesk.gamePlay === true) {

        variant_zero(x, y);
        numOfSteps.innerHTML = playdesk.numberOfSteps;
    } else if (numOnField === "B" && playdesk.gamePlay === true) {

        variant_mine(x, y);
        numOfSteps.innerHTML = playdesk.numberOfSteps;

    }

}
let colors_arr = ["rgb(255,126,0)", "rgb(25,102,255)", "rgb(38,230,0)", "rgb(255,0,0)", "rgb(85,0,102)",
    "rgb(171,39,79)", "rgb(255,191,0)", "rgb(230,0,230)", "rgb(255,191,0)",
    "rgb(77,255,255)"];

function variant_zero(x, y) {
    playdesk.numberOfSteps += 1;
    console.log(x + '**' + y + '**' + (x + y));
    for (let j = y - 1; j <= y + 1; j++) {
        for (let i = x - 1; i <= x + 1; i++) {

            if (j !== 0 && i !== 0 && j !== playdesk.row + 1 && i !== playdesk.column + 1) {
                var cell = document.getElementById("cell_" + j + "_" + i);
                cell.style.color = colors_arr[playdesk.fieldArrayWithMinesAndNumbers[j][i]];

                cell.innerHTML = playdesk.fieldArrayWithMinesAndNumbers[j][i];
            }
        }
    }
    playdesk.numberOfSteps += 1;

    check_buttons_with_mines();

    if (playdesk.timerOn === false) {
        startTimer();
    }
}

function variant_mine(x, y) {
    var cellWithMine = document.getElementById("cell_" + y + "_" + x);
    var smile = document.getElementById("rozha");
    cellWithMine.innerHTML = "";
    cellWithMine.style.backgroundImage = "url('./assets/images/mine_br.png') ";
    cellWithMine.style.backgroundSize = "cover";
    smile.style.backgroundImage = "url('./assets/images/smile2.png') ";
    smile.style.backgroundSize = "cover";
    unveil_mine(x, y);
    playdesk.gamePlay = false;
    playdesk.numberOfSteps += 1;



    if (playdesk.timerOn === false) {
        startTimer();
    }
}

function variant_num(x, y, numOnField) {
    var cell = document.getElementById("cell_" + y + "_" + x);
    cell.innerHTML = numOnField;
    cell.style.color = colors_arr[numOnField];
    playdesk.numberOfSteps++;

    check_buttons_with_mines();

    if (playdesk.timerOn === false) {
        startTimer();
    }
}

function startTimer() {
    Clock.start();
    playdesk.timerOn = true;
}

//===variant-WIN.===check that all remain unveil buttons - with mines
function check_buttons_with_mines() {
    let buttonElementArray = document.querySelectorAll('.btn_cl');

    if (buttonElementArray.length === playdesk.numOfMines) {

        for (let i = 0; i < buttonElementArray.length; i++) {
            let currentButtonElement = buttonElementArray[i];
            currentButtonElement.style.backgroundImage = "url('./assets/images/flag.png') ";
            currentButtonElement.style.backgroundSize = "cover";
        }
        var smile = document.getElementById("rozha");
        smile.style.backgroundImage = "url('./assets/images/smile_win.png') ";
        smile.style.backgroundSize = "cover";
        playdesk.gamePlay = false;
        Clock.pause();
        return true;
    } else {
        return false;
    }

}

//==variant-LOSE.===Unveil all mines
function unveil_mine(x, y) {
    console.log("hi from unveil");
    for (var j = 1; j <= playdesk.row; ++j) {
        for (var i = 1; i <= playdesk.column; ++i) {

            if (playdesk.fieldArrayWithMines[j][i] === 'B' && (j !== y || i !== x)) {
                var cellWithMine = document.getElementById(j + "_" + i);
                cellWithMine.style.backgroundImage = "url('./assets/images/mine.png') ";
                cellWithMine.style.backgroundSize = "cover";
            }
        }
    }
    Clock.pause();
}

//===Interface playfield==============
function createField_Interface() {
    let gameField = document.getElementById('game_field');
    let container = document.createElement('div');
    container.className = "field_container";
    gameField.append(container);

    for (let j = 1; j <= playdesk.row; j++) {

        let row = document.createElement('div');
        row.className = "row";
        row.id = "row_" + j;
        container.append(row);

        for (let i = 1; i <= playdesk.column; i++) {

            let cell = document.createElement('div');
            cell.className = "cell";
            cell.id = "cell_" + j + "_" + i;
            row.append(cell);

            let btn = document.createElement("BUTTON");
            btn.className = "btn_cl";
            btn.id = j + "_" + i;
            cell.append(btn);

        }
    }

    let numOfSteps = document.getElementById("steps");
    numOfSteps.innerHTML = playdesk.numberOfSteps;
    let numOfMines = document.getElementById("num_of_mines");
    numOfMines.innerHTML = playdesk.numOfMines;

    let buttonElementArray = document.querySelectorAll('.btn_cl');

    for (let i = 0; i < buttonElementArray.length; i = i + 1) {
        let currentButtonElement = buttonElementArray[i]
        currentButtonElement.addEventListener('click', clickHandler, false);
        currentButtonElement.addEventListener('contextmenu', rightClickHandler, false);

    }
}



