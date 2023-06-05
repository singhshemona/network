import './App.css';
import sketch from './sketch';
import { ReactP5Wrapper } from 'react-p5-wrapper';

function App() {
  return (
    <div className="App">
      <header>
        <menu>
          <ul>
            <li>Seeing Cognition</li>
            <li>About</li>
          </ul>
        </menu>
        <h1>Section 1: The Big Picture</h1>
      </header>
      <p>hey!</p>

      <ReactP5Wrapper sketch={sketch} />
      
    </div>
  );
}

export default App;