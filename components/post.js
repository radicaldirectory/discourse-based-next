import ReactMarkdown from "react-markdown";

function Post(sur) {

  console.log(sur.posts[0].cooked);
  //<ReactMarkdown source={value.raw} />

  return (
    <ul>
      {sur.posts.map((value, index) => {
        return (
          <div key={index} dangerouslySetInnerHTML={{__html: value.cooked}}>
          </div>
        );
      })}
    </ul>
  )
};

export default Post;