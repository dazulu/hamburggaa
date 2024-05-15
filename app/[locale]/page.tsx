import SharedPage, { generateStaticParams } from "@/app/shared-page";

export { generateStaticParams };

export default function Page(props: any): Promise<JSX.Element> {
  return SharedPage({
    ...props,
    params: { ...props.params, route: "ROOT" },
  });
}
