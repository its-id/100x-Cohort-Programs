import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
const Dashboard = React.lazy(() => import('./components/Dashboard')); //syntax to load this component 'lazily'
import Landing from './components/Landing';

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
    </>
  );
};

function App() {
  return (
    <div>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/' element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
