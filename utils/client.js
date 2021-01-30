let client;

const ACCESS_TOKEN = process.env.NEXT_CONTENTFUL_ACCESS_TOKEN;
const SPACE_ID = process.env.NEXT_CONTENTFUL_SPACE_ID;

const createClient = () => {
  client = require("contentful").createClient({
    accessToken: ACCESS_TOKEN,
    space: SPACE_ID,
  });
};

export const getContentfulClient = () => {
  if (!client) {
    createClient();
  }
  return client;
};
