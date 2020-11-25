import QueryString from "querystring";

export default function Test() {
  let oldArray = [
    {
      id: "hello",
      test: false,
    },
    {
      id: "cloud",
      test: false,
    },
    {
      id: "television",
      test: false,
    },
    {
      id: "bassguitar",
      test: false,
    },
    {
      id: "guitar",
      test: false,
    },
  ];

  // let things = ["hello", "bassguitar", "cloud", "guitar", "television"];

  let bass = ["bassguitar", "guitar"];

  //console.log(oldArray);
  // console.log(things);

  // let newArray = oldArray.map((v, i) => {
  //   let newV = { ...v };
  //   console.log(newV.id);
  //   if (bass.includes(newV.id)) {
  //     newV.test = true;
  //     return newV;
  //   } else return v;
  // });

  // let newArray = things.filter((item) => {
  //   return bass.includes(item);
  // });

  let newArray = oldArray.filter((item) => {
    // console.log(item.id);
    return !bass.includes(item.id);
  });

  //console.log(newArray);

  const testURL = new URL("/test", "https://www.notarealwebsite.com");
  const fullQueries = QueryString.stringify({
    search: "req.query.search",
    tags: bass,
    page: "req.query.page",
  });
  testURL.search = fullQueries;
  //console.log(testURL.search);

  return (
    <div>
      <h1>Test Page</h1>
    </div>
  );
}

// from useeffect [querytags]

// const updatedOptionTags = optionTags.filter((oTag) =>
//   // queryTags.some((qTag) => {
//   //   qTag === oTag.id;
//   // })
//   {
//     console.log(oTag);
//     oTag.id === "abolition";
//   }
// );

// const updatedOptionTags = [...optionTags];
// if (!queryTags) return;
// queryTags.forEach((tag) => {
//   console.log(updatedOptionTags.some((option) => option.id == tag));
// });

// optionTags.map((tag, index) => {
//   const newTag = { ...tag };
//   Array.isArray(queryTags)
//     ? queryTags.includes(newTag.id)
//       ? (newTag.active = true)
//       : null
//     : queryTags === newTag.id
//     ? (newTag.active = true)
//     : null;
//   return newTag;
// });

// console.log("updated array =");
// console.log(updatedOptionTags);

// setOptionTags(updatedOptionTags);
