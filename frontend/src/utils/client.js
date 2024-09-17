import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: import.meta.env.VITE_APP_MORMOR_PROJECT_ID,
  apiVersion: "2024-05-29",
  dataset: "production",
  useCdn: false,
  token: import.meta.env.VITE_APP_MORMOR_PROJECT_TOKEN,
  ignoreBrowserTokenWarning: true,
});
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
export default client;
