import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import {
  getStoryblokApi,
  useStoryblokState,
  StoryblokComponent,
} from "@storyblok/react";

export default function RootPage() {
  let story = useLoaderData();
  story = useStoryblokState(story);

  return (
    <>
      <StoryblokComponent blok={story.content} />
    </>
  );
}

export const loader = async ({ params, preview = false }) => {
  let slug = params["*"] ?? "home";

  let sbParams = {
    version: "draft",
  };

  let { data } = await getStoryblokApi().get(`cdn/stories/${slug}`, sbParams);
  return json(data?.story);
};
