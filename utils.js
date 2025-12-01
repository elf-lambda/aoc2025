import { readFileSync } from "fs";

export const getInputLines = () => {
    const input = readFileSync(process.argv[2] || "input.txt", "utf8");
    // \r\n for windows
    return input.trim().split("\r\n");
};

export const print = console.log;
