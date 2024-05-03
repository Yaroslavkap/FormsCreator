import React, { useState } from 'react';
import "./LogicBar.css"

const LogicBar = ({ onLogicOnChange }) => {
  const [logicOn, setLogicOn] = useState(false);

  const handleClick = (value) => {
    setLogicOn(value);
    onLogicOnChange(value);
  };

  return (
    <div className="LBar">
      <ul className="bar_links">
        <li className="links" onClick={() => handleClick(false)}>
          Опрос
        </li>
        <li className="links" onClick={() => handleClick(true)}>
          Логика
        </li>
      </ul>
    </div>
  );
};

export default LogicBar;
