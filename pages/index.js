//Hooks
import { useState } from "react";
import { useRouter } from "next/router";

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
import { forceArray, queryStringify2, getTopicsInfinite } from "@lib/utils";

//Get Static Props
export async function getStaticProps() {
  const categories = await getCategories();
  return {
    props: {
      categories,
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
      <p className="my-5 text-xl text-center text-black sm:text-gray-600">
        ✨ search or click a tag to filter results ✨
      </p>
      <SearchInput handler={handleSearchQuery} searchQuery={searchQuery} />
      <TagList
        optionTags={gotTags}
        queryTags={router.query.tags}
        onToggleTags={onToggleTags}
      />
      {topicPages}
      {isLoadingMore && !isReachingEnd && <div className="my-8 spinner"></div>}
      {!isReachingEnd && <Waypoint onEnter={loadMoreHandler} />}
    </Layout>
  );
}
