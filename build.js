const fs = require("fs");
const path = require("path");

const folder = path.join(__dirname, "svg");

const write = (key, color) => {
    let svg =
        `<svg width="100%" height="1" xmlns="http://www.w3.org/2000/svg">` +
        `<rect width="100%" height="100%" fill="${color}"/>` +
        `</svg>`;
    fs.writeFileSync(path.join(folder, `${key}.svg`), svg, "utf-8");
};

!fs.existsSync(folder) || fs.rmSync(folder, {recursive: true});
fs.mkdirSync(folder);

for(const [k, v] of Object.entries(require("./colors.js").colors))
    if(typeof v === "string")
        write(k, v);
    else
        for(const [w, c] of Object.entries(v))
            write(`${k}-${w}`, c);