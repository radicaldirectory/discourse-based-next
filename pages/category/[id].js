import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSWRInfinite } from "swr";

import Layout from "@components/Layout";
import TopicListItem from "@components/TopicListItem";
import { getCategories } from "@api/categories";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const PAGE_SIZE = 30;

//-----------------------------------------------------------------------------

function TopicListPage({ topicList }) {
  //console.log("topiclist =");
  //console.log(topicList);
  return (
    <div>
      {topicList.map((value, index) => {
        return <TopicListItem key={index} value={value} />;
      })}
    </div>
  );
}

//-----------------------------------------------------------------------------

function TopicList({ categories }) {
  const router = useRouter();
  const { id } = router.query;
  //console.log("ID = " + id);

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) => `/api/c/${id}?page=${index}`,
    fetcher
  );

  const topicsPages = data ? [].concat(...data) : [];
  //console.log(topicsPages);
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;

  return (
    <Layout categories={categories}>
      <ul className="self-center mt-5 topic-list">
        {isEmpty ? <p>No topics found.</p> : null}
        {topicsPages.map((topicsPage) => {
          //console.log("topicspage before pass = ");
          //console.log(topicsPage);
          return (
            <TopicListPage
              key={topicsPage.id}
              topicList={topicsPage.topicList}
            />
          );
        })}
      </ul>
      <p>
        <button
          className="ml-2 btn-blue"
          disabled={isLoadingMore || isReachingEnd}
          onClick={() => setSize(size + 1)}
        >
          {isLoadingMore
            ? "loading..."
            : isReachingEnd
            ? "no more topics"
            : "load more"}
        </button>
        <button
          className="ml-2 btn-blue"
          disabled={isRefreshing}
          onClick={() => mutate()}
        >
          {isRefreshing ? "refreshing..." : "refresh"}
        </button>
        <button
          className="ml-2 btn-blue"
          disabled={!size}
          onClick={() => setSize(0)}
        >
          clear
        </button>
        <span className="ml-2 italic text-gray-600">
          Showing {size} page(s) of {isLoadingMore ? "..." : topicsPages.length}{" "}
          topic(s){" "}
        </span>
      </p>
    </Layout>
  );
}

export async function getStaticProps() {
  const categories = await getCategories();

  return {
    props: {
      categories,
    },
  };
}

export default TopicList;
