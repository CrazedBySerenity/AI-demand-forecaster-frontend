import React, { useEffect, useState } from "react";

interface SampleFile {
  name: string;
  url: string;
}

interface Props {
  onSelect: (file: File) => void;
}

const SelectSample: React.FC<Props> = ({ onSelect }) => {
  const [samples, setSamples] = useState<SampleFile[]>([]);

  useEffect(() => {
    const fetchSamples = async () => {
      const res = await fetch("http://localhost:8000/examples");
      const data = await res.json();
      setSamples(data.files);
    };
    fetchSamples();
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = samples.find((s) => s.name === e.target.value);
    if (!selected) return;

    const res = await fetch(`http://localhost:8000${selected.url}`);
    const blob = await res.blob();
    const file = new File([blob], selected.name, { type: blob.type });
    onSelect(file);
  };

  return (
    <select onChange={handleChange} defaultValue="">
      <option value="" disabled>Select a sample file</option>
      {samples.map((sample) => (
        <option key={sample.name} value={sample.name}>
          {sample.name}
        </option>
      ))}
    </select>
  );
};

export default SelectSample;