import styles from "./styles.module.css";
import { SocialMediaType } from "@/types/navigation";
import { query } from "@/queries/social-media";
import { SocialMediaLink } from "@/types/contentful";

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`;

async function getData() {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  return response
    .json()
    .then(
      ({ data }) =>
        data.themeCollection.items[0].socialMediaLinksCollection
          .items as SocialMediaLink[]
    );
}

const getIconPath = (type: SocialMediaType) => {
  switch (type) {
    case SocialMediaType.instagram:
      return (
        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8A5.8 5.8 0 012 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8A3.6 3.6 0 007.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6A3.6 3.6 0 0016.4 4H7.6m9.65 1.5a1.25 1.25 0 011.25 1.25A1.25 1.25 0 0117.25 8 1.25 1.25 0 0116 6.75a1.25 1.25 0 011.25-1.25M12 7a5 5 0 015 5 5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5m0 2a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3z" />
      );
    case SocialMediaType.twitter:
      return (
        <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.38c-.83.5-1.75.85-2.72 1.05a4.28 4.28 0 00-7.32 3.91A12.2 12.2 0 013 4.79a4.24 4.24 0 001.33 5.71c-.71 0-1.37-.2-1.95-.5v.03a4.3 4.3 0 003.44 4.21 4.22 4.22 0 01-1.93.07 4.28 4.28 0 004 2.98 8.52 8.52 0 01-6.35 1.78A12.14 12.14 0 008.12 21C16 21 20.33 14.46 20.33 8.79l-.01-.56A8.57 8.57 0 0022.46 6z" />
      );
    case SocialMediaType.facebook:
      return (
        <path d="M12 2.04a10.03 10.03 0 00-1.56 19.92v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 008.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
      );
    case SocialMediaType.youtube:
      return (
        <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44a2.34 2.34 0 01-1.73-1.73c-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73a14.1 14.1 0 012.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
      );
  }
};

export const SocialIcons = async (): Promise<JSX.Element> => {
  const data = await getData();

  return (
    <ul className={styles.list}>
      {data.map((item) => (
        <li key={item.sys.id} className={styles.item}>
          <a
            className={styles.link}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
            >
              <title>Instagram logo</title>
              {getIconPath(item.type as SocialMediaType)}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
};
