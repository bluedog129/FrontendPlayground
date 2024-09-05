import React, { useState } from "react";

interface InputProps {
  onAdd: (text: string) => void;
}

const Input: React.FC<InputProps> = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="가고싶은 여행지를 등록하세요"
      />
      <button type="submit">ADD</button>
    </form>
  );
};

export default Input;
