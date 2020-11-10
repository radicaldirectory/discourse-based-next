function TopicList(props) {
  const liList = props.topicList.map((topic, index) => {
    return <li key={index}>{topic}</li>;
  });

  return <ul className="my-5">{liList}</ul>;
}

function Topics(props) {
  console.log(props.topicLists);

  return (
    <div className="mt-4">
      {props.topicLists.map((topicList, index) => {
        return <TopicList topicList={topicList} key={index} />;
      })}
    </div>
  );
}

export default Topics;
