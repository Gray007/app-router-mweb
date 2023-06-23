'use client'

import React, { useState } from "react";

const ToggleButton: React.FC = () => {
  const [isToggled, setIsToggled] = useState<boolean>(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return <button onClick={handleToggle}>{isToggled ? "ON" : "OFF"}</button>;
};

export default ToggleButton;
