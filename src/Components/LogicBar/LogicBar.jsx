import React, { useState } from 'react';
import "./LogicBar.css"

const LogicBar = ({ onLogicOnChange, logicTrue }) => {
  const [logicOn, setLogicOn] = useState(logicTrue);

  const handleClick = (value) => {
    setLogicOn(value);
    onLogicOnChange(value);
  };
  console.log(logicTrue)

  return (
    <div className="LBar">
      <ul className="bar_links">
        <li className={`links ${!logicOn? 'active' : ''}`} onClick={() => handleClick(false)}>
          Опрос
        </li>
        <li className={`links ${logicOn? 'active' : ''}`} onClick={() => handleClick(true)}>
          Логика
        </li>
      </ul>
    </div>
  );
};

export default LogicBar;
