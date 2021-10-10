import "./App.css";
import Header from "./components/Header";
import Options from "./components/Options";
import Chart from "./components/Chart";
import { useEffect } from "react";
import { connectSocket } from "./utils/socket";

function App() {
  useEffect(() => {
    connectSocket();
  }, []);
  return (
    <div className='App'>
      <Header />
      <Options />
      <Chart />
    </div>
  );
}

export default App;
