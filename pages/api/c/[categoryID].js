export default async function categoryHandler(req, res) {
  const {
    query: { categoryID },
  } = req;
  console.log("page = " + req.query.page);
  let topicListResponse = await fetch(
    `https://radical.directory/c/${categoryID}.json?page=${req.query.page}`
  );
  const topicListJSON = await topicListResponse.json();
  //console.log(topicListJSON);
  const topicList = topicListJSON.topic_list.topics;
  return res.status(200).json({
    topicList,
  });
}
