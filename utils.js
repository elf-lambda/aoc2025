import { readFileSync } from "fs";

export const getInputLines = () => {
    const input = readFileSync(process.argv[2] || "input.txt", "utf8");
    // \r\n for windows
    return input.trim().replaceAll("\r", "").split("\n");
};

export const getInputLinesByComma = () => {
    const input = readFileSync(process.argv[2] || "input.txt", "utf8");
    return input.replace("\r\n", "").split(",");
};

export const getCustomInputLines = () => {
    const input = readFileSync(
        process.argv[2] || "input.txt",
        "utf8"
    ).replaceAll("\r", "");
    const sections = input.trim().split("\n\n");

    const firstList = sections[0].split("\n");
    const secondList = sections[1].split("\n");

    return [firstList, secondList];
};

export const print = console.log;
