import React, { ChangeEvent } from 'react';
import { shallow } from 'zustand/shallow';
import useStore, { RFState } from '../../../providers/store';

export const DownloadUploadContent = () => {

  const selector = (state: RFState) => ({
    nodes: state.nodes,
    edges: state.edges,
    setNodesUploadData: state.setNodesUploadData,
    setEdgesUploadData: state.setEdgesUploadData,
    networkName: state.networkName,
  });

  const {
    nodes,
    edges,
    setNodesUploadData,
    setEdgesUploadData,
    networkName,
  } = useStore(selector, shallow);

  const handleDataUpload = (type: string, event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileReader = new FileReader();
      fileReader.readAsText(event.target.files[0], "UTF-8");
      fileReader.onload = event => {
        const dataAsJSON = event.target && JSON.parse(event.target.result as string)
        if(type === 'nodes'){
          setNodesUploadData(dataAsJSON)
        } else setEdgesUploadData(dataAsJSON)
      };
    } else return
  };

  return (
    <ul>
      <li>
        <a 
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(nodes)
          )}`}
          download={`${networkName} Nodes Data.json`}
        >
        Download Nodes Data
        </a>
      </li>
      <li>
        <a 
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(edges)
          )}`}
          download={`${networkName} Edges Data.json`}
        >
          Download Edges Data
        </a>
      </li>
      <li>
        <label htmlFor="nodes data">Upload Nodes Data</label>
        <input id="nodes data" type="file" onChange={(event) => handleDataUpload('nodes', event)} />
      </li>
      <li>
        <label htmlFor="edges data">Upload Edges Data</label>
        <input id="nodes data" type="file" onChange={(event) => handleDataUpload('edges', event)} />
      </li>
    </ul>
  );
}
