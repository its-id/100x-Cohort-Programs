const Todo = ({ title, description }) => {
  return (
    <p>
      <b>{title}</b>: {description}
    </p>
  );
};

export default Todo;
