import SharedPage, { generateStaticParams } from "@/app/shared-page";

export { generateStaticParams };

export default function Page(props: any): Promise<JSX.Element> {
  return SharedPage(
    /* @next-codemod-error 'props' is passed as an argument. Any asynchronous properties of 'props' must be awaited when accessed. */
    props
  );
}
