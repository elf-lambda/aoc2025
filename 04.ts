import { getInputLines, print } from "./utils.js";

let input = getInputLines().map((e) => e.split(""));

let rows = input.length;
let cols = input[0].length;

const directions = [
    [-1, -1], // top-left
    [-1, 0], //top
    [-1, 1], //top-right
    [0, -1], //left
    [0, 1], // right
    [1, -1], //bottom-left
    [1, 0], //bottom
    [1, 1], //bottom-right
];

let total = 0;
let removed = true;

class Coords {
    Row: number;
    Col: number;

    constructor(row: number, col: number) {
        this.Row = row;
        this.Col = col;
    }
}

while (removed) {
    removed = false;
    let coords: Coords[] = [];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (input[row][col] !== "@") continue;

            let neighborCount = 0;

            for (let [dr, dc] of directions) {
                let newRow = row + dr;
                let newCol = col + dc;

                if (
                    newRow >= 0 &&
                    newRow < rows &&
                    newCol >= 0 &&
                    newCol < cols
                ) {
                    if (input[newRow][newCol] === "@") {
                        neighborCount++;
                    }
                }
            }

            if (neighborCount < 4) {
                coords.push(new Coords(row, col));
                total++;
            }
        }
    }

    // Remove Them
    if (coords.length > 0) {
        removed = true;
        for (let e of coords) {
            input[e.Row][e.Col] = ".";
        }
    }
}

print(total);
