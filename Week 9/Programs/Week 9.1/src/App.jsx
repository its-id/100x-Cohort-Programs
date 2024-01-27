import ClassBasedComponent from './components/1. ClassvsFunctional/ClassBasedComponent'
import FunctionalComponent from './components/1. ClassvsFunctional/FunctionalComponent'

function App() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ClassBasedComponent />
      {/* <FunctionalComponent /> */}
    </div>
  );
}

export default App
