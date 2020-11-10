import { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import Layout from "@components/Layout";
import TopicListItem from "@components/TopicListItem";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

//-----------------------------------------------------------------------------

function TopicListPage(props) {
  console.log(`/api/c/${props.id}?page=${props.page}`);

  //if (!props.page) return null;
  //if (!props.id) return null;

  const { data, error } = useSWR(
    `/api/c/${props.id}?page=${props.page}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return data.topicList.map((value, index) => {
    return <TopicListItem key={index} value={value} />;
  });
}

//-----------------------------------------------------------------------------

function TopicList() {
  const [cnt, setCnt] = useState(1);
  console.log("Count = " + cnt);

  const router = useRouter();
  const { id } = router.query;

  const pages = [];
  for (let i = 0; i < cnt; i++) {
    pages.push(<TopicListPage page={i} key={i} id={id} />);
  }

  return (
    <Layout>
      <ul className="self-center mt-5 topic-list">{pages}</ul>
      <button onClick={() => setCnt(cnt + 1)}>Load More</button>
    </Layout>
  );
}

export default TopicList;
