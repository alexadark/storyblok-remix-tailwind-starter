import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import Feature from "./components/Feature";
import Grid from "./components/Grid";
import Page from "./components/Page";
import Teaser from "./components/Teaser";
import styles from "./styles/app.css";

const isServer = typeof window === "undefined";

//We need to check if we are on the server or client to get the correct env variable
const accessToken = isServer
  ? process.env.STORYBLOK_PREVIEW_TOKEN
  : window.env.STORYBLOK_PREVIEW_TOKEN;

const components = {
  feature: Feature,
  grid: Grid,
  teaser: Teaser,
  page: Page,
};
storyblokInit({
  accessToken,
  use: [apiPlugin],
  components,
});

export const loader = async () => {
  return json({
    env: {
      STORYBLOK_PREVIEW_TOKEN: process.env.STORYBLOK_PREVIEW_TOKEN,
    },
  });
};

export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const { env } = useLoaderData();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.env = ${JSON.stringify(env)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
