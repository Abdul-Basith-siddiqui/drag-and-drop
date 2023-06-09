import React, { useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    { id: 4, name: "Item 4" },
  ]);

  const [droppedItems, setDroppedItems] = useState([]);

  const handleDragStart = (event, item) => {
    event.dataTransfer.setData("text/plain", JSON.stringify(item));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    const item = JSON.parse(data);

    setDroppedItems((prevItems) => [...prevItems, item]);
    setItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
  };

  const handleReset = () => {
    setItems([
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
      { id: 4, name: "Item 4" },
    ]);
    setDroppedItems([]);
  };

  return (
    <div className="App">
      <div className="container">
        <h2>Available Items</h2>
        <ul>
          {items.map((item) => (
            <li
              key={item.id}
              draggable
              onDragStart={(event) => handleDragStart(event, item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      <div
        className="container"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <h2>Dropped Items</h2>
        <h6 style={{ textAlign: "center", margin: "0px", padding: "0px" }}>
          {" "}
          drop Here
        </h6>
        <hr></hr>
        <ul>
          {droppedItems.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
        {droppedItems.length > 0 && (
          <button onClick={handleReset}>Reset</button>
        )}
      </div>
    </div>
  );
}

export default App;
