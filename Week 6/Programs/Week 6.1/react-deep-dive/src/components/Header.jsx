import React from 'react';

//react will only re-render this component if the props change
const Header = React.memo((props) => {
  return <p>{props.title}</p>;
});

export default Header;
