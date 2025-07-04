import React, { useState } from "react";

const FilterBar = ({ onFilterChange }) => {
  const [srcIP, setSrcIP] = useState("");
  const [dstIP, setDstIP] = useState("");
  const [protocol, setProtocol] = useState("");

  const handleChange = () => {
    onFilterChange({ srcIP, dstIP, protocol });
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>🔍 Filter Packets</h2>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Source IP"
          value={srcIP}
          onChange={(e) => {
            setSrcIP(e.target.value);
            handleChange();
          }}
        />
        <input
          type="text"
          placeholder="Destination IP"
          value={dstIP}
          onChange={(e) => {
            setDstIP(e.target.value);
            handleChange();
          }}
        />
        <select
          value={protocol}
          onChange={(e) => {
            setProtocol(e.target.value);
            handleChange();
          }}
        >
          <option value="">All Protocols</option>
          <option value="TCP">TCP</option>
          <option value="UDP">UDP</option>
          <option value="ICMP">ICMP</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
