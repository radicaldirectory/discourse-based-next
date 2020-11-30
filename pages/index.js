//Hooks
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSWRInfinite } from "swr";

//API call functions
import { getCategories } from "@api/categories";
import { getDocs } from "@api/docs";

//Components
import { Waypoint } from "react-waypoint";
import Layout from "@components/Layout";
import TagList from "@components/TagList";
import TopicListPage from "@components/TopicList";
import SearchInput from "@components/SearchInput";

//Utils
import {
  fetcher,
  forceArray,
  queryStringify,
  queryStringify2,
  getTopicsInfinite,
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
  const [searchQuery, setSearchQuery] = useState([]);

  const {
    topics,
    gotTags,
    error,
    isLoadingMore,
    size,
    setSize,
    isReachingEnd,
  } = getTopicsInfinite(router.query.tags, searchQuery);

  const topicPages = topics.map((page, index) => (
    <TopicListPage topics={page} key={index} />
  ));

  //Handlers

  const onToggleTags = (tag) => {
    setSize(1);
    let oldTags = forceArray(router.query.tags);
    let newTags = oldTags.includes(tag)
      ? oldTags.filter((i) => i !== tag)
      : [...oldTags, tag];
    router.push("?" + queryStringify2("", newTags, size), undefined, {
      shallow: true,
    });
  };

  const loadMoreHandler = () => {
    setSize(size + 1);
  };

  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value);
    setSize(1);
  };

  return (
    <Layout categories={categories}>
      <p className="my-5 text-xl text-center text-gray-600">
        ✨ search or click a tag to filter results ✨
      </p>
      <SearchInput handler={handleSearchQuery} searchQuery={searchQuery} />
      <TagList
        optionTags={gotTags}
        queryTags={router.query.tags}
        onToggleTags={onToggleTags}
      />
      {topicPages}
      {isLoadingMore && !isReachingEnd && <div className="mb-5 spinner"></div>}
      {!isReachingEnd && <Waypoint onEnter={loadMoreHandler} />}
    </Layout>
  );
}
