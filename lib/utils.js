import axios from "axios";
import QueryString from "querystring";
import { useSWRInfinite } from "swr";

export const fetcher = (url) => axios.get(url).then((res) => res.data);

export const forceArray = (items) => {
  if (!items) {
    return [];
  } else if (items && !Array.isArray(items)) {
    return [items];
  } else return items;
};

function joinTagQueries(queries) {
  const queryArray = forceArray(queries);
  if (!queryArray) return null;
  if (queryArray.length === 1) return queries;
  const joinedQueries = queryArray.join("&tags=");
  return joinedQueries;
}

export const queryStringify = (tags) => {
  const tagsArray = forceArray(tags);
  if (!tags) return "";
  return (
    "/" + (tagsArray.length > 0 ? "?tags=" : "") + joinTagQueries(tagsArray)
  );
};

export const queryStringify2 = (search, tags, page) => {
  return QueryString.stringify({
    search: search,
    tags: tags,
    page: page,
  });
};

export const getTopicsInfinite = (tags, search) => {
  const getKey = (index) => {
    return `/api/docs?${queryStringify2(search, tags, index)}`;
  };

  const PAGE_LIMIT = 30;

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher, {
    initialSize: 1,
  });

  const topics = data ? data.map((result) => result.gotDocs.topics) : [];
  const gotTags = data ? data[0]?.gotDocs.tags : [];

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = topics.length === 0;
  const isReachingEnd =
    isEmpty ||
    (data && data[data.length - 1]?.gotDocs.topics.length < PAGE_LIMIT);

  return {
    topics,
    gotTags,
    error,
    isLoadingMore,
    size,
    setSize,
    isReachingEnd,
  };
};
