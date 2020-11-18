import Axios from "axios";

export async function getTopic(topicID) {
  let config = {
    method: "get",
    url: `https://radical.directory/t/${topicID}.json`,
    headers: {},
  };

  let topic = new Object();

  await Axios(config)
    .then((response) => {
      topic.title = response.data.title;
      const topicPosts = response.data.post_stream.posts;
      topic.posts = topicPosts.map((topicPost) => {
        return {
          id: topicPost.id,
          username: topicPost.username,
          cooked: topicPost.cooked,
          updated_at: topicPost.updated_at,
        };
      });
      // topic = response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return topic;
}

export default async function returnTopic(req, res) {
  const {
    query: { topicID },
  } = req;

  const gotTopic = await getTopic(topicID);

  return res.status(200).json({
    gotTopic,
  });
}
