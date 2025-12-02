// Day 01 - AOC 2025

import { getInputLines, print } from "./utils.js";

let lines = getInputLines();

const startIndex = 50n;

let zeroCount = 0n;
let zeroCountRotation = 0n;
let index = startIndex;
for (let e of lines) {
    const left = e[0];
    const right = BigInt(e.slice(1));
    switch (left) {
        case "R":
            // Part 2
            // for (let i = 0n; i < right; i++) {
            //     zeroCountRotation += BigInt((index + i) % 100n == 0n);
            // }
            // Optimized
            const stepsToFirstZeroR = index === 0n ? 100n : 100n - index;
            if (right >= stepsToFirstZeroR) {
                zeroCountRotation += 1n + (right - stepsToFirstZeroR) / 100n;
            }
            // Part 1
            index = (index + right) % 100n;

            break;
        case "L":
            // Part 2
            // for (let i = 0n; i < right; i++) {
            //     zeroCountRotation += BigInt((index - i + 100n) % 100n == 0n);
            // }
            // Optimized
            const stepsToFirstZeroL = index === 0n ? 100n : index;
            if (right >= stepsToFirstZeroL) {
                zeroCountRotation += 1n + (right - stepsToFirstZeroL) / 100n;
            }
            // Part 1
            // index = (((index - right) % 100n) + 100n) % 100n;
            index = (index - (right % 100n) + 100n) % 100n;
            break;
    }

    if (index == 0n) zeroCount++;
}

print(zeroCount);
print(zeroCountRotation);
