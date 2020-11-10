export default async function categoryHandler({ query: { topicID } }, res) {
  const topicResponse = await fetch(
    `https://radical.directory/t/${topicID}.json`
  );
  const topicJSON = await topicResponse.json();
  const topicBody = topicJSON.post_stream.posts;
  const topicTitle = topicJSON.title;

  return res.status(200).json({
    topicBody,
    topicTitle,
  });
}
