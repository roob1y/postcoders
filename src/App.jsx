import { useEffect, useState, useCallback } from "react";
import { getAreaData } from "./api";

import "./App.css";

function App() {
  const [areas, setAreas] = useState([]);
  const [outcode, setOutcode] = useState("BB10");
  const [outcodeDisplay, setOutcodeDisplay] = useState("BB10")

  const load = async () => {
    try {
      const areaData = await getAreaData(outcode);

      areas.concat(areaData);

      setAreas(areaData);
    } catch (error) {
      window.alert("todo: fix app");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setOutcodeDisplay(outcode);
    load()
  }, [outcode]);

  return (
    <div className="App">
      <h1>Postcoders</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="outcode">Outcode</label>
        <br />
        <textarea name="outcode" id="outcode" onChange={(e) => setOutcode(e.target.value)}></textarea> <br />
        <br />
        <input type="submit" value="Submit" aria-label="submit outcode" />
      </form>
      <h2>{`Areas for ${outcodeDisplay}: ${areas.length}`}</h2>
    </div>
  );
}

export default App;
