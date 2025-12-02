import { getInputLinesByComma, print } from "./utils.js";

let data = getInputLinesByComma();

const isTwoRepeated = (n: number) => {
    const s = n.toString();
    const len = s.length;

    // Must be even
    if (len % 2 !== 0) return false;

    const k = len / 2;
    const block = s.substring(0, k);
    return s === block + block;
};

const isSequenceRepeated = (n: number) => {
    const s = n.toString();
    const len = s.length;

    for (let i = 0; i < len / 2; i++) {
        if (len % i === 0) {
            let pattern = s.substring(0, i);
            let expected = pattern.repeat(len / i);
            if (s === expected) return true;
        }
    }
    return false;
};

const findInvalidID = (input: string) => {
    let input_split = input.split("-");
    let startRange = input_split[0];
    let endRange = input_split[1];

    let result = [];

    // Loop over the range and bruteforce check
    for (let i = Number(startRange); i <= Number(endRange); i++) {
        let part1 = isTwoRepeated(i);
        // let part2 = false;
        let part2 = isSequenceRepeated(i);

        if (part1 || part2) {
            result.push(i);
        }
    }
    return result;
};

let count: number[] = [];
for (let e of data) {
    let res = findInvalidID(e);
    if (res) count = [...count, ...res];
}

// Sum of invalids | Part 1 & Part 2
print(count.reduce((a, b) => a + b, 0));
