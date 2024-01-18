import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
const Dashboard = lazy(() => import('./components/UsingRoutes/Dashboard')); //syntax to load this component 'lazily'
import Landing from './components/UsingRoutes/Landing';
import TopBar from './components/UsingRoutes/Topbar';
import Main from './components/UsingPropDrilling/Main';

function App() {
  return (
    <div>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route
            path='/dashboard'
            element={
              //we use suspense to show a fallback component while the component is being loaded.
              <Suspense fallback={<div>Loading...</div>}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route path='/' element={<Landing />} />
          <Route path='/prop-drilling' element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
