import { defineConfig } from "tinacms";

import { blog_postFields } from "./templates";
import { pageFields } from "./templates";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  client: { skip: true },
  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "static",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        format: "md",
        label: "Posts",
        name: "posts",
        path: "content/posts",
        frontmatterFormat: "yaml",
        match: {
          include: "**/*",
        },
        fields: [
          {
            type: 'string',
            label: 'Author',
            name: 'author',
          },
          {
            type: 'string',
            label: 'Title',
            name: 'title',
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
          },
          {
            type: 'datetime',
            name: 'lastMod',
            label: 'Last Modified',
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
          {
            type: 'image',
            label: 'Cover',
            name: 'cover',
          },
          {
            type: 'rich-text',
            label: 'Cover Description',
            name: 'description',
          },
          {
            type: 'boolean',
            label: 'Hide Read More',
            name: 'hideReadMore',
          },
          ...blog_postFields(),
        ],
      },
      {
        format: "md",
        label: "Pages",
        name: "pages",
        path: "content",
        frontmatterFormat: "yaml",
        match: {
          include: "*",
        },
        fields: [
          {
            type: 'string',
            label: 'Title',
            name: 'title',
          },
          {
            type: 'string',
            label: 'Author',
            name: 'author',
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
          },
          {
            type: 'datetime',
            name: 'lastMod',
            label: 'Last Modified',
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
          ...pageFields(),
        ],
      },
    ],
  },
});
