import fs from "fs";

const input = fs.readFileSync("input.txt", "utf8").toString();

function unabbr(number) {
    if (number.endsWith("B")) return Number(number.slice(0, -1)) * 1_000_000_000;
    if (number.endsWith("M")) return Number(number.slice(0, -1)) * 1_000_000;
    if (number.endsWith("K")) return Number(number.slice(0, -1)) * 1_000;
    return Number(number);
}

const recombed = {
    3: 5,
    5: 8,
    8: 12,
    12: 16,
    16: 22,
    32: 44,

    4: 8,
};

const free =
    3 + // Archaeologist's Compass (soulbound)
    12 + // Pesthunter Artifact (soulbound)
    5 + // Wolf Paw (soulbound)
    8 + // Frozen Chicken (soulbound)
    8 + // Cheetah Talisman (soulbound)
    12 + // Odger's Diamond Tooth (soulbound)
    5 + // Pig's Foot (soulbound)
    12 + // Seal of the Family (soulbound)
    2 + // Pandora's Box :uncommon: Upgrade 2 MP
    3 + // Pandora's Box :rare: Upgrade 3 MP
    4 + // Pandora's Box :epic: Upgrade 4 MP
    4 + // Pandora's Box :legendary: Upgrade 4 MP
    6 + // Pandora's Box :mythic: Upgrade 6 MP
    3 + // King Talisman (soulbound)
    12 + // Melody's Hair (soulbound)
    3 + // Book of Progression 3 MP
    2 + // Book of Progression :uncommon: Upgrade 2 MP
    3 + // Book of Progression :rare: Upgrade 3 MP
    4 + // Book of Progression :epic: Upgrade 4 MP
    4 + // Book of Progression :legendary: Upgrade 4 MP
    6 + // Book of Progression :mythic: Upgrade 6 MP
    8 + // Survivor Cube (soulbound)
    5 + // Jake's Plushie (soulbound)
    5 + // Tiny Dancer (soulbound)
    3 + // Test Bucket Please Ignore (soulbound)
    3 + // Big Brain Talisman (soulbound)
    5 + // Miniaturized Tubulator (soulbound)
    2 + // Trapper Crest :uncommon: Upgrade 2 MP
    3 + // Netherrack-Looking Sunshade (soulbound)
    16 + // Campfire God Badge (soulbound)
    16 + // Legendary Ring of Love (soulbound)
    3 + // Rift Prism consumed
    26; // Abiphone Case

const freeRecombed = 5 + 16 + 8 + 12 + 12 + 16 + 8 + 16 + 22 + 5 + 16 + 22 + 12 + 8 + 8 + 5 + 5 + 8 + 5 + 5 + 22 + 22 + 3 + 26;

const talismans = [];

input.split("\n").forEach((line) => {
    // remove all skyhelper emojis in front
    const noEmoji = line.slice(line.indexOf(":", 1) + 1).trim();

    const talis = noEmoji.match(/^(?<name>.+?) - (?<costPer>\d+(?:\.\d+)?(?:K|M|B)?) per MP \((?<cost>.+)\)$/);

    if (talis) {
        talis.groups.cost = unabbr(talis.groups.cost);
        talis.groups.costPer = unabbr(talis.groups.costPer);

        talis.groups.mp = Math.round(talis.groups.cost / talis.groups.costPer);

        return talismans.push(talis.groups);
    }

    // soulbound / upgrades
});

talismans.sort((a, b) => a.costPer - b.costPer);

const points = talismans.map((t, i) => [talismans.slice(0, i + 1).reduce((a, b) => a + b.cost, 0), talismans.slice(0, i + 1).reduce((a, b) => a + b.mp, 0)]);
const recombedPoints = talismans.map((t, i) => [
    talismans.slice(0, i + 1).reduce((a, b) => a + b.cost, 0) + i * 8_000_000,
    talismans.slice(0, i + 1).reduce((a, b) => a + recombed[b.mp], 0),
]);

const copyToDesmos = `\
${points.flatMap(([x, y]) => [`(${x / 1_000_000}, ${y})`, `(${x / 1_000_000}, ${y + free})`]).join(", ")}
${recombedPoints.flatMap(([x, y]) => [`(${x / 1_000_000}, ${y})`, `(${(x + 12 * 8_000_000) / 1_000_000}, ${y + freeRecombed})`]).join(", ")}
`;

console.log(copyToDesmos);
