import saveAs from "file-saver";
import axios from "axios";
import { useState } from "react";

export const useData = () => {
  const [Final_Data, setFinal_Data] = useState([]);
  //Regex to filter out the content
  const regex = /\b\w+\b/g;
  const contentUrl = "https://www.terriblytinytales.com/test.txt";

  //Loading of text file by fetching from URL
  const loadTextFile = async () => {
    axios
      .get(contentUrl)
      //If data if present in responce
      .then((responce) => {
        const arrayOf_string = responce.data || "";
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
        setFinal_Data(top20_data);
      })
      //Error if data not-present
      .catch((e) => {
        console.log(e);
      });
  };
  const handleExport = () => {
    //const { Final_Data } = useData();
    const csv = Final_Data.map((tuple) => tuple.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "histogram_data.csv");
  };
  return { Final_Data, loadTextFile, handleExport };
};
