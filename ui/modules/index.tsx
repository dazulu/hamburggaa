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

const moduleMapping = {
  Faqs: ModuleFaq,
  Footer: ModuleFooter,
  Header: ModuleHeader,
  Hero: ModuleHero,
  Images: ModuleImages,
  ImageText: ModuleImageText,
  PersonList: ModulePersonList,
  Showcase: ModuleShowcase,
  Text: ModuleText,
};

export const Modules = ({ modules }: { modules: PageModulesItem[] }) => {
  return modules.map((module, index) => {
    const ModuleComponent = moduleMapping[module.__typename];

    if (!ModuleComponent) {
      return (
        <pre key={module.sys.id}>
          <code>
            NOT MAPPED
            <br />
            {JSON.stringify(module, null, 2)}
          </code>
        </pre>
      );
    }

    return <ModuleComponent key={module.sys.id} module={module} />;
  });
};
