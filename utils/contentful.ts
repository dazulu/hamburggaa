const SPACE = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

export async function fetchContent(
  query: string,
  variables?: Record<string, unknown>
): Promise<any> {
  try {
    const res = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${SPACE}`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ query, variables }),
      }
    );
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error(`There was a problem retrieving entries with query ${query}`);
    console.error(error);
  }
}
