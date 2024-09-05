import propTypes from "prop-types";

const Board = ({ articles }) => {
  return (
    <div>
      <h1>Board</h1>
      <ul>
        {articles.map((article) => (
          <li>
            {article.id} {article.title} {article.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

Board.propTypes = {
  articles: propTypes.array,
};

export default Board;
