import Axios from "axios";

export async function getCategories() {
  let config = {
    method: "get",
    url: "https://radical.directory/categories.json",
    headers: {},
  };

  let categories;

  await Axios(config)
    .then((response) => {
      const categoriesFull = response.data.category_list.categories;
      categories = categoriesFull.map((category) => {
        return {
          id: category.id,
          name: category.name,
        };
      });
    })
    .catch((error) => {
      console.log(error);
    });

  return categories;
}

export default async (_, res) => {
  const gotCategories = await getCategories();
  return res.status(200).json({
    gotCategories,
  });
};
