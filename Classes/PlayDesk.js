class Playdesk {

    constructor(row, column) {
        this.row = row;
        this.column = column;
        this.fieldArray = [];
        this.numOfMines = Math.ceil((this.row + this.column) / 1.1);
        this.minesArray = [];
        this.fieldArrayWithMines = [];
        this.fieldArrayWithMinesAndNumbers = [];
        this.numberOfSteps = 0;
        this.gamePlay = true;
        this.timerOn = false;
    }
    createFieldArray() {
        this.fieldArray = [];
        for (var i = 0; i < this.row + 2; ++i) {
            this.fieldArray[i] = [];
            for (var j = 0; j < this.column + 2; ++j) {
                this.fieldArray[i][j] = 0
            }
        }
        return this.fieldArray;
    }

    createMinesArray() {

        this.minesArray = [];
        while (this.minesArray.length < this.numOfMines) {
            let mine = [];
            var mineX = this.getRandomNumber(this.column);
            var mineY = this.getRandomNumber(this.row);
            mine = [mineY, mineX];
            let add = true;
            for (let j = 0; j < this.minesArray.length; j++) {
                let mineCheck = this.minesArray[j];
                if (mineCheck[0] === mine[0] && mineCheck[1] === mine[1]) {
                    add = false;
                    break;
                }
            }
            if (add === true) {
                this.minesArray[this.minesArray.length] = mine;
            }
        }
        return this.minesArray;
    }

    putMinesOnField() {
        this.fieldArray = this.createFieldArray();
        this.minesArray = this.createMinesArray();
        this.fieldArrayWithMines = this.fieldArray;

        for (let i = 0; i < this.minesArray.length; ++i) {
            let minePlace = this.minesArray[i];

            this.fieldArrayWithMines[minePlace[0]][minePlace[1]] = 'B';
        }

        // console.log("fieldArrayWithMines" + this.fieldArrayWithMines);
        return this.fieldArrayWithMines;
    }

    getRandomNumber(num) {
        let randomNum = Math.floor(Math.random() * num) + 1;
        return randomNum;
    }

    setNumbersOnField() {

        this.fieldArrayWithMines = this.putMinesOnField();
        this.fieldArrayWithMinesAndNumbers = this.fieldArrayWithMines;
        console.log("***");
        console.log(this.fieldArrayWithMines)
        for (var i = 1; i <= this.row; ++i) {
            for (var j = 1; j <= this.column; ++j) {
                if (this.fieldArrayWithMines[i][j] !== 'B') {
                    let num = this.checkCell(i, j);
                    this.fieldArrayWithMinesAndNumbers[i][j] = num;
                }
            }
        }

        return this.fieldArrayWithMinesAndNumbers;
    }

    checkCell(i, j) {
        let num = 0;
        for (let ii = i - 1; ii <= i + 1; ii++) {
            for (let jj = j - 1; jj <= j + 1; jj++) {
                if (this.fieldArrayWithMines[ii][jj] === "B") {
                    num++;

                }
            }
        }
        return num;
    }
}