import React from "react";

interface ListItem {
  id: number;
  text: string;
}

interface ListProps {
  items: ListItem[];
  onRemove: (id: number) => void;
}

const List: React.FC<ListProps> = ({ items, onRemove }) => {
  if (items.length === 0) {
    return (
      <div className="travel-list travel-list-empty">
        <span className="empty-icon">📄</span>
        <span>등록된 여행지가 없습니다.</span>
      </div>
    );
  }

  return (
    <ul className="travel-list">
      {items.map((item) => (
        <li key={item.id}>
          {item.text}
          <button onClick={() => onRemove(item.id)}>이삭제</button>
        </li>
      ))}
    </ul>
  );
};

export default List;
