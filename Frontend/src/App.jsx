import { useRef, useEffect } from "react";
import { useData } from "./usedata";
import Chart from "chart.js/auto";
import "./App.css";
import tttLogo from "./assets/ttt-black.svg";

function App() {
  const { Final_Data, loadTextFile, handleExport } = useData();
  const canvasRef = useRef(null);
  //Generating the graph
  //Calling UseEffect As the Changes in FinalData
  useEffect(() => {
    if (Final_Data.length === 0) return;

    const labels_words = Final_Data.map((tuple) => tuple[0]);
    const counts_words = Final_Data.map((tuple) => tuple[1]);

    const chartData = {
      labels: labels_words,
      datasets: [
        {
          label: "Word Frequency",
          data: counts_words,
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 2,
          hoverBackgroundColor: "rgba(255, 99, 132, 0.2)",
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

    const histogram = canvasRef.current.getContext("2d");
    Chart.defaults.font.size = 16;
    Chart.defaults.font.family = "monospace";
    Chart.defaults.font.style = "normal";
    new Chart(histogram, {
      type: "bar",
      data: chartData,
      options: chartOptions,
    });
  }, [Final_Data]);

  return (
    //Button to load the data from the URL by calling the function
    <>
      {/* <div>
        <a href="https://www.terriblytinytales.com/" target="_blank">
          <img src={tttLogo} className="logo" alt="ttt logo" />
        </a>
      </div> */}

      <button className="btn" onClick={loadTextFile}>
        Submit
      </button>
      <canvas className="histogram" ref={canvasRef}></canvas>
      {Final_Data.length > 0 && (
        <button className="export" onClick={handleExport}>
          Export
        </button>
      )}
    </>
  );
}

export default App;
