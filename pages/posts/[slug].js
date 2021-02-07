import { getContentfulClient } from "../../utils";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
// import Image from "next/image";

const client = getContentfulClient();

export async function getStaticPaths() {
  const data = await client.getEntries({
    content_type: "blogPost",
  });
  return {
    paths: data.items.map((post) => ({
      params: { slug: post.fields.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { params } = context;

  let data = await client.getEntries({
    content_type: "blogPost",
    "fields.slug": params.slug,
  });

  return {
    props: {
      post: data.items[0],
    },
  };
}

const Post = ({ post }) => {
  return (
    <div>
      <h1>{post.fields.title}</h1>
      <div>
        {documentToReactComponents(post.fields.content, {
          renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: (node) => (
              <img
                src={`https:${node.data.target.fields.file.url}`}
                width={node.data.target.fields.file.details.image.width}
                height={node.data.target.fields.file.details.image.height}
              />
              // <Image
              //   src={`https:${node.data.target.fields.file.url}`}
              //   width={node.data.target.fields.file.details.image.width}
              //   height={node.data.target.fields.file.details.image.height}
              // />
            ),
          },
        })}
      </div>
    </div>
  );
};

export default Post;
