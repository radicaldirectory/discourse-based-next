// import { useSWRInfinite } from "swr";
// import { useSWR } from "swr";
import TopicListItem from "@components/TopicListItem";
// import { fetcher } from "@lib/utils";
import { useState } from "react";

const PAGE_SIZE = 30;

function TopicListPage({ topicList }) {
  return (
    <div>
      {topicList.map((topic, index) => {
        return <TopicListItem key={index} topic={topic} />;
      })}
    </div>
  );
}

function TopicList(topics, tagsQuery, searchQuery) {
  // const { data } = useSWR(`/api/data?page=${pageIndex}`, fetcher);

  // replace this with docs call

  // const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
  //   (index) => `/api/c/${id}?page=${index}`,
  //   fetcher
  // );

  // const topicsPages = data ? [].concat(...data) : [];
  // const isLoadingInitialData = !data && !error;
  // const isLoadingMore =
  //   isLoadingInitialData ||
  //   (size > 0 && data && typeof data[size - 1] === "undefined");
  // const isEmpty = data?.[0]?.length === 0;
  // const isReachingEnd =
  //   isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  // const isRefreshing = isValidating && data && data.length === size;

  return (
    <div className="">
      <div className="self-center mt-5 topic-list">
        {/* {isEmpty ? <p>No topics found.</p> : null}
        {topicsPages.map((topicsPage) => {
          return (
            <TopicListPage
              key={topicsPage.id}
              topicList={topicsPage.topicList}
            />
          );
        })} */}
        {topics.topics.map((topic, index) => {
          return <TopicListItem key={index} topic={topic} />;
        })}
      </div>

      {/* <p>
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
      </p> */}
    </div>
  );
}

export default TopicList;
