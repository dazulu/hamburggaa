import { PageData } from "@/types/page";
import { Modules } from "@/ui/modules";

export default function Page({ data }: PageData): JSX.Element {
  return (
    <div>
      <Modules modules={data.page.modulesCollection.items} />
    </div>
  );
}
