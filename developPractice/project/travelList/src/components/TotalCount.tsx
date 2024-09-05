import React from "react";

interface TotalCountProps {
  count: number;
}

const TotalCount: React.FC<TotalCountProps> = ({ count }) => {
  return <div className="total-count">Total: {count}</div>;
};

export default TotalCount;
