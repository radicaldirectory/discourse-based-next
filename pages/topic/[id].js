import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "@components/Layout";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Topic = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`/api/t/${id}`, fetcher);

  //console.log(data);

  function createMarkup(content) {
    return { __html: content };
  }

  let mappedData = [];

  if (data) {
    mappedData.push(<h1>{data.topicTitle}</h1>);
    mappedData.push(
      data.topicBody.map((v, i) => {
        return (
          <div key={i} dangerouslySetInnerHTML={createMarkup(v.cooked)}></div>
        );
      })
    );
    console.log(mappedData);
  }

  const loadContent = () => {
    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;
    return mappedData;
  };

  return (
    <Layout>
      <div className="self-center mt-5 prose topic-content lg:prose-lg">
        <hr />
        {loadContent()}
      </div>
    </Layout>
  );
};

export default Topic;
