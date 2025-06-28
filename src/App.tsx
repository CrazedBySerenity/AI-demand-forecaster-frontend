import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import ForecastChart from "./components/ForecastChart";

const App: React.FC = () => {
  const [forecast, setForecast] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<number[]>([]);

  const handleForecast = async (file: File) => {
    setLoading(true);
    const form = new FormData();
    form.append("file", file);

    const res = await fetch("http://localhost:8000/forecast", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    setForecast(data.forecast);
    setHistory(data.history)
    setLoading(false);
  };



  return (
    <div style={{ padding: "2rem" }}>
      <h2>AI Demand Forecaster</h2>
      <FileUpload onForecast={handleForecast} />
      {loading && <p>Generating AI forecast</p>}
      {!loading && forecast.length > 0 && (<ForecastChart history={history} forecast={forecast} />)}
    </div>
  );
};

export default App;