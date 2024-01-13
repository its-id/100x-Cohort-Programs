import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';

function App() {
  return (
    <div>
      <div>
        <button
          onClick={() => {
            window.location.href = '/'; //it is a global object in the browser, we simply change the 'href' key's value

            //FLAW: all the html, css, js files are fetched again. similar to a reload.
          }}
        >
          Landing
        </button>
        <button
          onClick={() => {
            window.location.href = '/dashboard';
          }}
        >
          Dashboard
        </button>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/' element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
