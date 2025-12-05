import { getCustomInputLines, getInputLines, print } from "./utils.js";

let input = getCustomInputLines();
let ranges = [];
let total = 0;
let total_2 = 0;

for (let e of input[0]) {
    let range = e.split("-");
    ranges.push([Number(range[0]), Number(range[1])]);
}

ranges.sort((a, b) => a[0] - b[0]);

// Merge
let merged = [ranges[0]];
for (let i = 0; i < ranges.length; i++) {
    let last = merged[merged.length - 1];
    let current = ranges[i];

    if (current[0] <= last[1] + 1) {
        // Merge by extending the end
        last[1] = Math.max(last[1], current[1]);
    } else {
        merged.push(current);
    }
}

function binarySearchRange(num: number, ranges: number[][]): boolean {
    let left = 0;
    let right = ranges.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        let [start, end] = ranges[mid];

        if (num >= start && num <= end) {
            return true;
        } else if (num < start) {
            // Go Left
            right = mid - 1;
        } else {
            // Go Right
            left = mid + 1;
        }
    }

    return false;
}

// Part 1
for (let e of input[1]) {
    let num = Number(e);
    if (binarySearchRange(num, merged)) {
        total++;
    }
}
print(total);

// Part 2
for (let [start, end] of merged) {
    total_2 += end - start + 1;
}

print(total_2);
