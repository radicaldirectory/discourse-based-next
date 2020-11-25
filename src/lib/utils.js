import axios from "axios";
import QueryString from "querystring";

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