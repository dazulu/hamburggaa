import { ModuleImageText } from "./module/image-text";
import { PageModulesItem } from "@/types/contentful";

export const Modules = ({ modules }: { modules: PageModulesItem[] }) => {
  return (
    <>
      {modules.map((module) => {
        switch (module.__typename) {
          case "ImageText": {
            return <ModuleImageText key={module.sys.id} module={module} />;
          }
          default:
            return (
              <pre key={module.sys.id}>
                <code>NOT MAPPED: {module.__typename}</code>
              </pre>
            );
        }
      })}
    </>
  );
};
