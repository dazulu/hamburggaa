import { ModuleText } from "./text";
import { ModuleShowcase } from "./showcase";
import { ModuleFaq } from "./faq";
import { ModuleFooter } from "./footer";
import { ModuleHeader } from "./header";
import { ModuleHero } from "./hero";
import { ModuleImageText } from "./image-text";
import { ModuleImages } from "./images";
import { ModulePersonList } from "./person-list";
import { PageModulesItem } from "@/types/contentful";

export const Modules = ({ modules }: { modules: PageModulesItem[] }) => {
  return (
    <>
      {modules.map((module, index) => {
        switch (module.__typename) {
          case "Faqs": {
            return <ModuleFaq key={module.sys.id} module={module} />;
          }
          case "Footer": {
            return <ModuleFooter key={module.sys.id} module={module} />;
          }
          case "Header": {
            return <ModuleHeader key={module.sys.id} module={module} />;
          }
          case "Hero": {
            return <ModuleHero key={module.sys.id} module={module} />;
          }
          case "Images": {
            return <ModuleImages key={module.sys.id} module={module} />;
          }
          case "ImageText": {
            return <ModuleImageText key={module.sys.id} module={module} />;
          }
          case "PersonList": {
            return <ModulePersonList key={module.sys.id} module={module} />;
          }
          case "Showcase": {
            return <ModuleShowcase key={module.sys.id} module={module} />;
          }
          case "Text": {
            return <ModuleText key={module.sys.id} module={module} />;
          }
          default: {
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
        }
      })}
    </>
  );
};
