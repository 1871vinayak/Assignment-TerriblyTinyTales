import axios from "axios";

function App() {
  const regex = /\b\w+\b/g;
  const regex_expert = /[\w']*\p{L}*\w[\w.]*(?:-\w+.)?/gmu;
  const loadTextFile = async () => {
    await axios
      .get("https://www.terriblytinytales.com/test.txt")
      .then((data) => {
        const array_string = data.data;
        const filter_words = array_string.toLowerCase().match(regex);
        const wordCounts = {};
        filter_words.forEach((word) => {
          wordCounts[word] = (wordCounts[word] || 0) + 1;
        });
        console.log(wordCounts);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <button onClick={loadTextFile}>Load Data</button>
    </>
  );
}

export default App;
