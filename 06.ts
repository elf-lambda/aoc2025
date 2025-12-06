import { readFileSync } from "fs";
import { print } from "./utils.js";

const getInputLine = () => {
    const input = readFileSync(process.argv[2] || "input.txt", "utf8");
    return input.replaceAll("\r", "").split("\n");
};

let input = getInputLine();

function optimized() {
    let maxLineLength = Math.max(...input.map((line) => line.length)) + 1;

    let input_grid = input.map((line) =>
        line.padEnd(maxLineLength, " ").split("")
    );

    let total = 0;
    let total2 = 0;
    let currentVerticalNumbers = [];
    let currentHorizontalStrings = ["", "", "", ""];

    let currentOperator = null;
    for (let x = 0; x < maxLineLength; x++) {
        let verticalStr = (
            input_grid[0][x] +
            input_grid[1][x] +
            input_grid[2][x] +
            input_grid[3][x]
        ).trim();

        for (let r = 0; r < 4; r++) {
            currentHorizontalStrings[r] += input_grid[r][x];
        }

        if (input_grid[4][x] !== " ") {
            currentOperator = input_grid[4][x];
        }

        if (verticalStr.length > 0) {
            // found num
            currentVerticalNumbers.push(Number(verticalStr));
        } else {
            // empty column
            if (currentVerticalNumbers.length > 0 && currentOperator) {
                const horizontalNumbers = currentHorizontalStrings.map((s) =>
                    Number(s.trim())
                );
                // Part 1/ 2
                if (currentOperator === "+") {
                    total += horizontalNumbers.reduce((sum, n) => sum + n, 0);
                    total2 += currentVerticalNumbers.reduce(
                        (sum, n) => sum + n,
                        0
                    );
                } else if (currentOperator === "*") {
                    total += horizontalNumbers.reduce((prod, n) => prod * n, 1);
                    total2 += currentVerticalNumbers.reduce(
                        (prod, n) => prod * n,
                        1
                    );
                }

                // clean for next calculation
                currentVerticalNumbers = [];
                currentOperator = null;
                currentHorizontalStrings = ["", "", "", ""];
            }
        }
    }

    print(total, " - ", total2);
}

optimized();
