import { useNavigate } from 'react-router-dom';

const TopBar = () => {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          // window.location.href = '/'; //it is a global object in the browser, we simply change the 'href' key's value

          //FLAW: all the html, css, js files are fetched again. similar to a reload.

          //to make sure it maintains the same bundle and not fetch again, we use useNavigate() hook, but we can only use it only in the context of a <Router> component.
          navigate('/');
        }}
      >
        Landing
      </button>
      <button
        onClick={() => {
          // window.location.href = '/dashboard';

          navigate('/dashboard');
        }}
      >
        Dashboard
      </button>
      <button
        onClick={() => {
          navigate('/prop-drilling');
        }}
      >
        Using Prop Drilling
      </button>
    </>
  );
};

export default TopBar;
