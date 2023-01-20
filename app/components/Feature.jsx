import { storyblokEditable } from "@storyblok/react";

const Feature = ({ blok }) => {
  return (
    <div {...storyblokEditable(blok)} key={blok._uid}>
      <h2 className="text-2xl font-bold text-teal-500 uppercase"> {blok.name} </h2>
    </div>
  );
};

export default Feature;
