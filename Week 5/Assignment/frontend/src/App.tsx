import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
import Page404 from './pages/Page404/Page404';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />

        <Route path='*' element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
