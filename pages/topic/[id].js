import { useRouter } from "next/router";
import Layout from "@components/Layout";
import TopicContent from "@components/TopicContent";
import { getCategories } from "@api/categories";
import { getTopic } from "@api/t/[topicID]";

// import useSWR from "swr";
// import { fetcher } from "@lib/utils";

function Topic({ categories, topic }) {
  const router = useRouter();
  // const result = useSWR(`/api/t/${router.query.id}`, fetcher);
  if (!categories) {
    return <div>Loading...</div>;
  }

  // console.log(categories);

  return (
    <Layout categories={categories}>
      <>
        <hr />
        {router.isFallback ? (
          <div>Loading...</div>
        ) : (
          <TopicContent topic={topic} />
        )}
      </>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const categories = await getCategories();
  const topic = await getTopic(params.id);

  // console.log(params.id);

  return {
    props: {
      categories,
      topic,
    },
  };
}

export default Topic;
