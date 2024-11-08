import SharedPage, { generateStaticParams } from "@/app/shared-page";

export { generateStaticParams };

export default async function Page(props: any): Promise<JSX.Element> {
  const resolvedParams = await props.params;
  return SharedPage({
    params: { ...resolvedParams, route: "ROOT" },
  });
}
