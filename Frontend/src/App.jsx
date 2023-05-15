import axios from "axios";

function App() {
  //Regex to filter out the content
  const regex = /\b\w+\b/g;
  const regex_expert = /[\w']*\p{L}*\w[\w.]*(?:-\w+.)?/gmu;
  const contentUrl = "https://www.terriblytinytales.com/test.txt";
  //Loading of text file by fetching from URL
  const loadTextFile = async () => {
    await axios
      .get(contentUrl)
      //If data if present
      .then((data) => {
        const arrayOf_string = data.data;
        const filter_words = arrayOf_string.toLowerCase().match(regex);
        const wordCounts = {};
        //Counting the total words
        filter_words.forEach((word) => {
          wordCounts[word] = (wordCounts[word] || 0) + 1;
        });
        //Creating tuple & Sorting 
        const arrayOf_tuples = Object.entries(wordCounts);
        const sortedTuples = arrayOf_tuples.sort((a, b) => b[1] - a[1]);
        //Slicing top 20 words
        const top20_data = sortedTuples.slice(0, 20);
        console.log(top20_data);
      })
      //Error if data not-present
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    //Button to load the data from the URL by calling the function
    <>
      <button onClick={loadTextFile}>Load Data</button>
    </>
  );
}

export default App;
