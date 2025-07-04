import React from "react";

const PacketTable = ({ packets, loading }) => {
  return (
    <table border="1" cellPadding="10" style={{ marginTop: "20px", width: "100%" }}>
      <thead>
        <tr>
          <th>Source IP</th>
          <th>Destination IP</th>
          <th>Protocol</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan="3">Loading...</td>
          </tr>
        ) : (
          packets.map((pkt, idx) => (
            <tr key={idx}>
              <td>{pkt.src}</td>
              <td>{pkt.dst}</td>
              <td>{pkt.proto}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default PacketTable;
