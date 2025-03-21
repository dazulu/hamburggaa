const fs = require("fs");
const path = require("path");

// Check if module name is provided
const moduleName = process.argv[2];
if (!moduleName) {
  console.error("Please provide a module name as an argument.");
  process.exit(1);
}

// Create module directory
const moduleDirPath = path.join("ui", "modules", moduleName);
if (!fs.existsSync(moduleDirPath)) {
  fs.mkdirSync(moduleDirPath);
} else {
  console.error(`Module ${moduleName} already exists.`);
  process.exit(1);
}

// Create index.tsx
const capitalisedName = moduleName[0].toUpperCase() + moduleName.substring(1);
const componentName = `Module${capitalisedName}`;
const indexContent = `
import styles from './styles.module.css';

export const ${componentName} = ({ module }: { module: any }) => {
  return (
    <div className={styles.container}>
      <h1>${componentName}</h1>
      <pre>
        <code>{JSON.stringify(module, null, 2)}</code>
      </pre>
    </div>
  );
}
`;

fs.writeFileSync(path.join(moduleDirPath, "index.tsx"), indexContent);

// Create styles.module.css
const stylesContent = `
.container {
}
`;

fs.writeFileSync(path.join(moduleDirPath, "styles.module.css"), stylesContent);

// Edit /ui/modules/index.tsx
const modulesFilePath = path.join("ui", "modules", "index.tsx");

// Check if the file exists
if (!fs.existsSync(modulesFilePath)) {
  console.error("File /ui/modules/index.tsx does not exist.");
  process.exit(1);
}

try {
  const modulesContentData = fs.readFileSync(modulesFilePath, "utf-8");

  // Add a new switch case for the module
  const newCase = `case "${capitalisedName}": {\n\t\t\t\t\t\treturn <${componentName} key={module.sys.id} module={module} />;\n\t\t\t\t\t}`;
  const updatedModulesContentWithSwitch = modulesContentData.replace(
    /default:/,
    `${newCase}\n\t\t\t\t\tdefault:`
  );

  const newImport = `import { ${componentName} } from './${moduleName}';\n`;
  const updatedContentWithImport = newImport + updatedModulesContentWithSwitch;

  // Write the updated content back to the file
  fs.writeFileSync(modulesFilePath, updatedContentWithImport);
} catch (error) {
  console.error("Error updating /ui/modules/index.tsx:", error);
  process.exit(1);
}

console.log(`Module ${moduleName} created successfully.`);
