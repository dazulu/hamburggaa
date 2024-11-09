export default function Head() {
  return (
    <>
      <title>My Next.js App</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="build-time" content={new Date().toString()} />
    </>
  );
}
