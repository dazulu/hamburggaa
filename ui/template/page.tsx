import { Modules } from "@/ui/modules";
import { PageData } from "@/types/page";

export default function Page({ data }: PageData) {
  return (
    <div>
      <Modules modules={data.modulesCollection.items.filter(Boolean)} />
    </div>
  );
}
