import useSWR from "swr";

import Nav from "../components/nav";
import Cats from "../components/cats";
import Topics from "../components/topics";
//import Post from "../components/post";

//        <Post {...sur} />
//        <Topics {...cats} />

export default function IndexPage({ cats }) {
  //console.log(cats);

  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-200">
      <Nav />
      <div className="flex flex-col self-center justify-center px-20 py-16 bg-white border rounded shadow align-center">
        <h1 className="text-5xl text-center text-accent-1">
          Radical Directory.
        </h1>

        <input
          className="p-3 mt-5 text-center border"
          type="text"
          placeholder="Search for groups, campaigns..."
        />

        <Cats {...cats} />

        <div> </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const cats_res = await fetch("/api/categories");
  const cats = await cats_res.json();

  //console.log(fullTopicList);

  // const dir_res = await fetch(
  //   `https://radical.directory/c/6.json`
  // );
  // const dir_json = await dir_res.json();
  // const dir = dir_json.topic_list;

  // const sur_res = await fetch(
  //   'https://radical.directory/t/surveillance/122.json?include_raw=1'
  // );
  // const sur_json = await sur_res.json();
  // const sur = sur_json.post_stream;

  let topicLists = [];

  for (const category of cats.categories) {
    const topics_res = await fetch(
      `https://radical.directory/c/${category.id}.json`
    );
    const topics_json = await topics_res.json();
    const topics = topics_json.topic_list.topics;

    const topicNames = topics.map((topic) => topic.title);
    topicLists.push(topicNames);
  }

  return {
    props: {
      cats,
      topicLists,
    },
  };
}
