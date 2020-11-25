//Hooks
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

//API call functions
import { getCategories } from "@api/categories";
import { getDocs } from "@api/docs";

//Components
import Layout from "@components/Layout";
import TagList from "@components/TagList";
import TopicList from "@components/TopicList";

//Utils
import {
  fetcher,
  forceArray,
  queryStringify,
  queryStringify2,
} from "@lib/utils";

//Static Gen Data Fetch
export async function getStaticProps() {
  const categories = await getCategories();
  const docs = await getDocs();
  return {
    props: {
      categories,
      docs,
    },
  };
}

// TODO filter by category, search queries

export default function IndexPage({ categories, docs }) {
  const router = useRouter();
  const [optionTags, setOptionTags] = useState([]);
  const [topicsResults, setTopicsResults] = useState([]);
  const [topicsPage, setTopicsPage] = useState(0);
  // const docsRoute = new URL("/api/docs", "https://x.x");
  // const result = useSWR(docsRoute, fetcher);
  const result = useSWR(
    `/api/docs?${queryStringify2("", router.query.tags, topicsPage)}`,
    fetcher
  );

  // console.log("router.query.tags =");
  // console.log(router.query.tags);

  //initial load static-fetched data into state
  useEffect(() => {
    setOptionTags(docs.tags);
    setTopicsResults(docs.topics);
  }, []);

  //pass client-fetched updated data into state
  useEffect(() => {
    if (!result.data) return;
    setOptionTags(result.data.gotDocs.tags);
    setTopicsResults(result.data.gotDocs.topics);
  }, [result.data]);

  //Tag click event handler
  const onToggleTags = (tag) => {
    let oldTags = forceArray(router.query.tags);
    let newTags = oldTags.includes(tag)
      ? oldTags.filter((i) => i !== tag)
      : [...oldTags, tag];
    router.push("?" + queryStringify2("", newTags, topicsPage), undefined, {
      shallow: true,
    });
    //console.log(queryStringify2("search", newTags, "page"));
  };

  return (
    <Layout categories={categories}>
      <TagList
        optionTags={optionTags}
        queryTags={router.query.tags}
        onToggleTags={onToggleTags}
      />
      <TopicList topics={topicsResults} />
    </Layout>
  );
}
