//Hooks
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSWRInfinite } from "swr";

//API call functions
import { getCategories } from "@api/categories";
import { getDocs } from "@api/docs";

//Components
import Layout from "@components/Layout";
import TagList from "@components/TagList";
import TopicListPage from "@components/TopicList";

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
  // const docs = await getDocs();
  // const docs = "";
  return {
    props: {
      categories,
      // docs,
    },
  };
}

// TODO filter by category, search queries

export default function IndexPage({ categories }) {
  const router = useRouter();
  const [optionTags, setOptionTags] = useState([]);
  // const [topicsResults, setTopicsResults] = useState([]);

  const getKey = (index) => {
    return `/api/docs?${queryStringify2("", [router.query.tags], index)}`;
  };

  const { data, size, setSize } = useSWRInfinite(getKey, fetcher, {
    initialSize: 1,
  });

  const topics = data ? data.map((result) => result.gotDocs.topics) : [];
  const topicPages = topics.map((page) => <TopicListPage topics={page} />);

  // pass client-fetched updated data into state
  useEffect(() => {
    if (!data) return;
    console.log(data);
    setOptionTags(data[0].gotDocs?.tags);
    // setTopicsResults(data[size - 1].gotDocs?.topics);
  }, [data]);

  //Tag click event handler
  const onToggleTags = (tag) => {
    let oldTags = forceArray(router.query.tags);
    let newTags = oldTags.includes(tag)
      ? oldTags.filter((i) => i !== tag)
      : [...oldTags, tag];
    router.push("?" + queryStringify2("", newTags, topicsPage), undefined, {
      shallow: true,
    });
  };

  const loadMoreHandler = () => {
    setSize(size + 1);
  };

  return (
    <Layout categories={categories}>
      <p className="mt-5 text-xl text-center text-gray-600">
        click a tag to filter results
      </p>
      <TagList
        optionTags={optionTags}
        queryTags={router.query.tags}
        onToggleTags={onToggleTags}
      />
      {topicPages}
      <button
        className="ml-2 btn-blue"
        disabled={false}
        onClick={loadMoreHandler}
      >
        load more
      </button>
    </Layout>
  );
}

// IndexPage.defaultProps = {
//   categories: [],
//   docs: {
//     tags: ["default"],
//     topics: ["default"],
//   },
// };
