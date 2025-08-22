import React from "react";
import "./Catalogs.css";
import catalogsData from "./data/catalogs.json";

const Catalogs = () => {
  return (
    <div
      className="catalogsContainer"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: catalogsData.image ? `url(${catalogsData.image})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative"
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0,0.45)", // Más transparente
          padding: "40px",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h2 style={{ color: "#ECE2C6", textAlign: "center", marginBottom: "32px" }}>
          {catalogsData.title}
        </h2>
        <div
          className="catalogsButtons"
          style={{
            minWidth: "400px",
            justifyContent: "center"
          }}
        >
          {catalogsData.buttons.map((btn, idx) => (
            <a
              key={idx}
              href={btn.link}
              style={{
                width: "180px",
                padding: "14px 32px",
                background: "transparent",
                color: "#ECE2C6",
                border: "2px solid #e4b017", // borde dorado
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "1rem",
                textAlign: "center",
                transition: "all 0.2s",
                cursor: "pointer",
                display: "inline-block"
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = "rgba(0, 0, 0, 0.18)"; // dorado con opacidad
                e.currentTarget.style.color = "#ECE2C6";
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#ECE2C6";
              }}
            >
              {btn.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalogs;