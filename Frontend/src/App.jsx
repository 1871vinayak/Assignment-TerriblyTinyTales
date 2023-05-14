import axios from 'axios';

function App() {
  const loadTextFile = async () => {
    await axios.get('https://www.terriblytinytales.com/test.txt').then((data)=>{
      console.log(data.data);
    })
    .catch((e)=>{
      console.log(e);
    })
  }
  return (
    <>
      <button onClick={loadTextFile}>Load Data</button>
    </>
  )
}

export default App
