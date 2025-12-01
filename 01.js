// Day 01 - AOC 2025

import { getInputLines, print } from "./utils.js";

let lines = getInputLines();

const startIndex = 50;

let zeroCount = 0;
let zeroCountRotation = 0;
let index = startIndex;
for (let e of lines) {
    const left = e[0];
    const right = Number(e.slice(1));
    switch (left) {
        case "R":
            // Part 2
            for (let i = 0; i < right; i++) {
                zeroCountRotation += (index + i * 1) % 100 == 0;
            }
            // Part 1
            index = (index + right) % 100;

            break;
        case "L":
            // Part 2
            for (let i = 0; i < right; i++) {
                zeroCountRotation += (index - i * 1 + 100) % 100 == 0;
            }
            // Part 1
            index = (index - right + 100) % 100;

            break;
    }

    if (index == 0) zeroCount++;
}

print(zeroCount);
print(zeroCountRotation);
