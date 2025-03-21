const fs = require("fs");
const path = require("path");

const moduleName = process.argv[2];

if (!moduleName) {
  console.error("Please provide a module name as an argument.");
  process.exit(1);
}

const modulePath = path.join("ui", "modules", moduleName);

if (!fs.existsSync(modulePath)) {
  fs.mkdirSync(modulePath);
} else {
  console.error(`Module ${moduleName} already exists.`);
  process.exit(1);
}

// Create index.tsx
const capitalisedName = moduleName[0].toUpperCase() + moduleName.substring(1);
const indexContent = `
import styles from './styles.module.css';

export const ${capitalisedName} = ({ module }: { module: ${capitalisedName} }) => {
  return (
    <div className={styles.container}>
      <h1>${capitalisedName}</h1>
    </div>
  );
}
`;

fs.writeFileSync(path.join(modulePath, "index.tsx"), indexContent);

// Create styles.module.css
const stylesContent = `
.container {
}
`;

fs.writeFileSync(path.join(modulePath, "styles.module.css"), stylesContent);

console.log(`Module ${moduleName} created successfully.`);
