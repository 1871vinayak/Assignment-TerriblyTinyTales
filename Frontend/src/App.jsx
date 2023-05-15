import { useRef, useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

function App() {
  const [Final_Data, setFinal_Data] = useState([]);
  const canvasRef = useRef(null);
  //Generating the graph
  useEffect(() => {
    if (Final_Data.length === 0) return;

    const labels = Final_Data.map((tuple) => tuple[0]);
    const counts = Final_Data.map((tuple) => tuple[1]);

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "Word Frequency",
          data: counts,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };

    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    const ctx = canvasRef.current.getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: chartOptions,
    });
  }, [Final_Data]);

  //Regex to filter out the content
  const regex = /\b\w+\b/g;
  const regex_expert = /[\w']*\p{L}*\w[\w.]*(?:-\w+.)?/gmu;
  const contentUrl = "https://www.terriblytinytales.com/test.txt";
  //Loading of text file by fetching from URL
  const loadTextFile = async () => {
    await axios
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
        //console.log(top20_data);
        setFinal_Data(top20_data);
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
      <br />
      <br />
      <canvas ref={canvasRef}></canvas>
    </>
  );
}

export default App;
