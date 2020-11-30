import TopicListItem from "@components/TopicListItem";

function TopicListPage(topics) {
  return (
    <div className="self-center my-0 bg-white shadow topic-list">
      {topics.topics?.map((topic, index) => {
        return <TopicListItem key={index} topic={topic} />;
      })}
    </div>
  );
}

export default TopicListPage;
