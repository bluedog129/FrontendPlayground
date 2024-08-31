import React, { useState } from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import TotalCount from "./components/TotalCount";
import List from "./components/List";

interface TravelItem {
  id: number;
  text: string;
}

const App: React.FC = () => {
  const [items, setItems] = useState<TravelItem[]>([]);

  const addItem = (text: string) => {
    setItems([...items, { id: Date.now(), text }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="app">
      <Header />
      <Input onAdd={addItem} />
      <TotalCount count={items.length} />
      <List items={items} onRemove={removeItem} />
    </div>
  );
};

export default App;
