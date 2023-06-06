// import { useState } from 'react';
import './App.css';
import { Network } from '@nivo/network'
import { data } from './data.js'

function App() {
  // const [nodes, setNodes] = useState([])
  // const addNode = setNodes(nodes => [...nodes, createNewNode()])

  // const createNewNode = () => {
  //   return {
  //     id: nodes.length + 1,
  //     text: 'some sample text',
  //     connections: [],
  //   }
  // }

  const CustomNodeComponent = ({ node }) => (
    <g transform={`translate(${node.x - 12},${node.y - 18})`}>
        <circle cx="12" cy="8" r="5" fill={node.color} stroke="#ffffff" />
        <path d="M3,21 h18 C 21,12 3,12 3,21" fill={node.color} stroke="#ffffff" />
        <p>{node.id}</p>
    </g>
  )

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
      {/* <div height="1000" width="1000"> */}
        <Network
          height="500"
          width="500"
          data={data}
          nodeComponent={CustomNodeComponent}
          linkDistance={e=>e.distance}
          centeringStrength={0.3}
          repulsivity={6}
          nodeSize={n=>n.size}
          activeNodeSize={n=>1.5*n.size}
          nodeColor={e=>e.color}
          nodeBorderWidth={1}
          nodeBorderColor={{
              from: 'color',
              modifiers: [
                  [
                      'darker',
                      0.8
                  ]
              ]
          }}
          linkThickness={n=>2+2*n.target.data.height}
          linkBlendMode="multiply"
          motionConfig="wobbly"
      />

      {/* </div> */}
      
      
    </div>
  );
}

export default App;