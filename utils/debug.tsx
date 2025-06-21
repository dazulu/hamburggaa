"use client";

import { useState } from "react";

export const BoxShadowToggler = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      {isActive && <style>{"* { box-shadow: 0 0 0 1px dodgerblue }"}</style>}
      <button
        onClick={() => setIsActive(!isActive)}
        style={{
          position: "fixed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bottom: "20px",
          right: "20px",
          borderRadius: "30px",
          background: "#000",
          color: "white",
          cursor: "pointer",
          width: "32px",
          height: "32px",
          zIndex: 9999,
        }}
      >
        B
      </button>
    </>
  );
};
