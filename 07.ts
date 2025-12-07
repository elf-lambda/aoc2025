import { readFileSync } from "fs";
import { print } from "./utils.js";

const getInputLine = () => {
    const input = readFileSync(process.argv[2] || "input.txt", "utf8");
    return input.replaceAll("\r", "").split("\n");
};
let grid = getInputLine();
let rows = grid.length;
let cols = grid[0].length;

let startCol = grid[0].indexOf("S");

let currentBeams: Set<number> = new Set([startCol]);
let splitCount = 0;

let timelineCount: Map<number, bigint> = new Map();
timelineCount.set(startCol, 1n);
let completedTimelines = 0n;

for (let r = 1; r < rows; r++) {
    // PART 1
    let nextBeams: Set<number> = new Set();

    // PART 2
    let nextTimelines: Map<number, bigint> = new Map();

    // PART 1: Check every column that currently has a beam
    for (const col of currentBeams) {
        if (col < 0 || col >= cols) continue;
        const char = grid[r][col];
        if (char === ".") {
            nextBeams.add(col);
        } else if (char === "^") {
            nextBeams.add(col - 1);
            nextBeams.add(col + 1);
            splitCount++;
        }
    }

    // PART 2: Check every column that has timelines
    for (const [col, count] of timelineCount) {
        if (col < 0 || col >= cols) continue;
        const char = grid[r][col];

        if (char === ".") {
            // Empty space: timelines continue straight down
            // But if we're on the last row, they exit the bottom
            if (r === rows - 1) {
                completedTimelines += count;
            } else {
                nextTimelines.set(col, (nextTimelines.get(col) || 0n) + count);
            }
        } else if (char === "^") {
            // Splitter: each timeline splits into 2 (left and right)
            const leftCol = col - 1;
            const rightCol = col + 1;

            // Handle left timeline
            if (leftCol < 0 || leftCol >= cols) {
                // Exits the side
                completedTimelines += count;
            } else if (r === rows - 1) {
                // On last row, exits the bottom
                completedTimelines += count;
            } else {
                // Continues to next row
                nextTimelines.set(
                    leftCol,
                    (nextTimelines.get(leftCol) || 0n) + count
                );
            }

            // Handle right timeline
            if (rightCol < 0 || rightCol >= cols) {
                // Exits the side
                completedTimelines += count;
            } else if (r === rows - 1) {
                // On last row, exits the bottom
                completedTimelines += count;
            } else {
                // Continues to next row
                nextTimelines.set(
                    rightCol,
                    (nextTimelines.get(rightCol) || 0n) + count
                );
            }
        }
    }

    // PART 1: Update state
    currentBeams = nextBeams;
    if (currentBeams.size === 0) break;

    // PART 2: Update state
    timelineCount = nextTimelines;
}

print(`Total Splits: ${splitCount}`);

print(`Total Splits: ${completedTimelines}`);
