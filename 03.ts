import { getInputLines, print } from "./utils.js";
let input = getInputLines();

function findMaxDigits(bank: string, n: number) {
    let res = "";
    let startIdx = 0;

    for (let digitsLeft = n; digitsLeft > 0; digitsLeft--) {
        let endIdx = bank.length - digitsLeft + 1;

        let maxChar = "0";
        let maxIdx = startIdx;

        for (let i = startIdx; i < endIdx; i++) {
            if (bank[i] > maxChar) {
                maxChar = bank[i];
                maxIdx = i;
            }
        }

        res += maxChar;
        startIdx = maxIdx + 1;
    }

    return BigInt(res);
}

// part 1
(() => {
    const start = performance.now();
    let total = 0n;
    for (let bank of input) {
        total += findMaxDigits(bank, 2);
    }
    const end = performance.now();
    print("-".repeat(10));
    print(total);
    print(`Part 1 took ${(end - start).toFixed(2)}ms`);
})();

// part 2
(() => {
    const start = performance.now();
    let total = 0n;
    for (let bank of input) {
        total += findMaxDigits(bank, 12);
    }
    const end = performance.now();
    print("-".repeat(10));
    print(total);
    print(`Part 2 took ${(end - start).toFixed(2)}ms`);
})();
