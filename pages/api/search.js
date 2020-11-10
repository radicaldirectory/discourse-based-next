import Axios from "axios";

export default async (_, res) => {
  let config = {
    method: "get",
    url: "https://radical.directory/search/query.json?term=union",
    headers: {},
  };

  let search;

  await Axios(config)
    .then((response) => {
      search = response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return res.status(200).json({
    search,
  });
};
