 const fs = require("fs");
  const path = require("path");

  function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith(".ts") && !e.name.endsWith(".d.ts")) fix(p);
    }
  }

  function fix(file) {
    const before = fs.readFileSync(file, "utf8");
    const after = before.replace(
      /from\s+(["'])(\.[^"']+)\1/g,
      (_m, q, imp) => {
        if (/\.(js|json|mjs|cjs)$/.test(imp)) return `from ${q}${imp}${q}`;
        const resolved = path.resolve(path.dirname(file), imp);
        const isDir =
          fs.existsSync(resolved) && fs.statSync(resolved).isDirectory();
        return `from ${q}${imp}${isDir ? "/index.js" : ".js"}${q}`;
      }
    );
    if (after !== before) {
      fs.writeFileSync(file, after);
      console.log("fixed:", file);
    }
  }

  walk("src");
  if (fs.existsSync("api")) walk("api");
  console.log("done");
