import TopicListItem from "@components/TopicListItem";

function TopicListPage(topics, tagsQuery, searchQuery) {
  return (
    <div className="">
      <div className="self-center topic-list">
        {topics.topics?.map((topic, index) => {
          return <TopicListItem key={index} topic={topic} />;
        })}
      </div>
    </div>
  );
}

export default TopicListPage;
