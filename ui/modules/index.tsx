import { ModuleFaq } from "./faq";
import { ModuleFooter } from "./footer";
import { ModuleImageText } from "./image-text";
import { PageModulesItem } from "@/types/contentful";

export const Modules = ({ modules }: { modules: PageModulesItem[] }) => {
  return (
    <>
      {modules.map((module, index) => {
        switch (module.__typename) {
          case "ImageText": {
            return <ModuleImageText key={module.sys.id} module={module} />;
          }
          case "Faqs": {
            return <ModuleFaq key={module.sys.id} module={module} />;
          }
          case "Footer": {
            return <ModuleFooter key={module.sys.id} module={module} />;
          }
          default:
            return (
              <pre key={index}>
                <code>
                  NOT MAPPED
                  <br />
                  {JSON.stringify(module, null, 2)}
                </code>
              </pre>
            );
        }
      })}
    </>
  );
};
