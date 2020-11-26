import { useRouter } from "next/router";
import Layout from "@components/Layout";
import TopicContent from "@components/TopicContent";
import { getCategories } from "@api/categories";
import { getTopic } from "@api/t/[topicID]";
import { getAllTopicIDS } from "@api/docs";
import Link from "next/link";

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
        <Link href="/">
          <a className="px-2 py-1 mb-2 font-bold text-gray-800 ">← back</a>
        </Link>
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
  //const idsArray = await getAllTopicIDS();

  const idsStatic = [
    "128",
    // "54",
    // "127",
    // "126",
    // "125",
    // "123",
    // "120",
    // "119",
    // "118",
    // "117",
    // "116",
    // "113",
    // "114",
    // "112",
    // "110",
    // "109",
    // "108",
    // "107",
    // "106",
    // "105",
    // "101",
    // "104",
    // "103",
    // "102",
    // "100",
    // "99",
    // "98",
    // "97",
    // "96",
    // "95",
    // "31",
    // "81",
    // "92",
    // "84",
    // "42",
    // "56",
    // "38",
    // "29",
    // "35",
    // "59",
    // "28",
    // "46",
    // "34",
    // "23",
    // "57",
    // "33",
    // "32",
    // "36",
    // "27",
    // "25",
    // "20",
    // "58",
    // "61",
    // "60",
    // "68",
    // "52",
    // "55",
    // "53",
    // "51",
    // "50",
    // "49",
    // "48",
    // "47",
    // "45",
    // "44",
    // "43",
    // "41",
    // "40",
    // "39",
    // "30",
    // "26",
  ];

  const allPaths = idsStatic.map((topicID) => ({
    params: {
      id: topicID,
    },
  }));

  return {
    paths: allPaths,
    fallback: true, //set to true if not doing SSG
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
