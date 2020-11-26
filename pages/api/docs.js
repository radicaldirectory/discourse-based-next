import Axios from "axios";
import QueryString from "querystring";

// This API route handles a 'search', 'tags' and 'page'

/* Discourse does not accept multiple seperate query string values for the same key.
i.e. tags=prison&tags=abolition will not return a result with both filters applied, only one of them.
queryConcatenator takes an array of queries and concatenates them in the format Discourse expects */

function queryConcatenator(queries) {
  if (!queries) return null;
  if (Array.isArray(queries)) {
    return queries.join("|");
  } else {
    return queries;
  }
}

export async function getDocs(req) {
  const docsPath = new URL("/docs.json", "https://radical.directory/");
  // if (req) {
  //   const fullQueries = QueryString.stringify({
  //     search: req.query.search,
  //     tags: queryConcatenator(req.query.tags),
  //     page: req.query.page,
  //   });
  //   docsPath.search = fullQueries;
  // }

  let config = {
    method: "get",
    url: docsPath.href,
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    },
  };

  let docs;

  await Axios(config)
    .then((response) => {
      // the API returns all this random data. this just returns the important stuff
      docs = {
        categories: response.data.categories,
        tags: response.data.tags,
        topics: response.data.topics.topic_list.topics.map((topic) => {
          return {
            id: topic.id,
            title: topic.title,
            slug: topic.slug,
            tags: topic.tags,
            category_id: topic.category_id,
          };
        }),
      };
      return docs;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}

export async function getAllTopicIDS() {
  let pageLimit = 5;
  let idArray = [];
  for (let i = 0; i < pageLimit; i++) {
    let results = await getDocs({ query: { page: i } });
    let newIDs = idArray.concat(results.topics.map((topic) => `${topic.id}`));
    idArray = newIDs;
  }
  console.log(idArray);
  return idArray;
}

export default async (req, res) => {
  const gotDocs = await getDocs(req);

  // getAllTopicIDS();

  return res.status(200).json({
    gotDocs,
  });
};
