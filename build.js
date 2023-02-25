const fs = require("fs");
const path = require("path");

const folder = path.join(__dirname, "svg");

const write = (key, color) => {
    {
        const dest = path.join(folder, "static");
        fs.existsSync(dest) || fs.mkdirSync(dest);

        let svg =
            `<svg width="1" height="1" xmlns="http://www.w3.org/2000/svg">` +
            `<rect width="1" height="1" fill="${color}"/>` +
            `</svg>`;

        fs.writeFileSync(path.join(dest, `${key}.svg`), svg, "utf-8");
    }
    {
        const dest = path.join(folder, "animated");
        fs.existsSync(dest) || fs.mkdirSync(dest);

        let svg =
            `<svg width="1" height="1" xmlns="http://www.w3.org/2000/svg">` +
            `<rect width="1" height="1" fill="${color}">` +
            `<animate attributeType="XML" attributeName="fill" values="${color};transparent;${color}" dur="1s" repeatCount="indefinite"/>` +
            `</rect>` +
            `</svg>`;

        fs.writeFileSync(path.join(dest, `${key}.svg`), svg, "utf-8");
    }
    {
        const dest = path.join(folder, "blink");
        fs.existsSync(dest) || fs.mkdirSync(dest);

        let svg =
            `<svg width="1" height="1" xmlns="http://www.w3.org/2000/svg">` +
            `<rect width="1" height="1" fill="${color}">` +
            `<animate attributeType="XML" attributeName="fill" values="${color};transparent" dur="0.75s" calcMode="discrete" repeatCount="indefinite"/>` +
            `</rect>` +
            `</svg>`;

        fs.writeFileSync(path.join(dest, `${key}.svg`), svg, "utf-8");
    }
};

!fs.existsSync(folder) || fs.rmSync(folder, {recursive: true});
fs.mkdirSync(folder);

for(const [k, v] of Object.entries(require("./colors.js").colors))
    if(typeof v === "string")
        write(k, v);
    else
        for(const [w, c] of Object.entries(v))
            write(`${k}-${w}`, c);