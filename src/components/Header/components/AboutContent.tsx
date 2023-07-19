import React from 'react';

export const AboutContent = () => {
  return (
    <>
      <h3>What is this?</h3>
      <p>An exploration into how we might learn more effectively, inspired by<a href="https://www.wgu.edu/blog/connectivism-learning-theory2105.html" target="_blank" rel="noreferrer">connectivism</a>.</p>
      <h3>How do you use it?</h3>
      <ol>
        <li>Pick a topic you want to learn, maybe you already flashcards for it (think: Anki).</li>
        <li>To add a new node drag the "Add Node" button onto the canvas.</li>
        <li>For maximum learning efficiency, ensure your prompts and answers <a href="https://andymatuschak.org/prompts/" target="_blank" rel="noreferrer">follow these guidelines</a>.</li>
        <li>Connect nodes that you think relate in some way, then describe that connection in their shared edge's text.</li>
        <li>To study your cards, click the "On" button next to "Study mode". Try to answer one of the prompts, then click on one of the ranking buttons depending on how
          confident you felt answering once you reveal the answer - see below for scoring guide. It's suggested to do your nodes first, then the edges connecting
          those nodes, but you can study as you feel.
        </li>
        <ul>
          <li>5 - perfect response</li>
          <li>4 - correct response after a hesitation</li>
          <li>3 - correct response recalled with serious difficulty</li>
          <li>2 - incorrect response; where the correct one seemed easy to recall</li>
          <li>1 - incorrect response; the correct one remembered</li>
          <li>0 - complete blackout</li>
        </ul>
        <li>Turn study mode off to reveal the strength of your knowledge through color.</li>
      </ol>
      <h3>Helpful tips:</h3>
      <ul>
        <li>If you're savy with JSON, you can also edit the file you've downloaded to <a href="https://reactflow.dev/docs/guides/sub-flows/" target="_blank" rel="noreferrer">pair your nodes into groups</a>.</li>
        <li>Load up an example Network from the "Examples" dropdown to see how it all works.</li>
        <li>To delete a node or edge, click on it and hit your keyboard's delete button.</li>
        <li>To change the name of the Network, click on the name, update the name in the textbox and click "save".</li>
        <li>This app does not yet have authorization, so you need to save your network data on 
          your own. All data can be downloaded via a JSON file (see Load & Download Data). 
          You can also edit this JSON file as you wish, as long as the data is within the 
          given parameters. When you're ready to return to your Network simply upload the files.</li>
      </ul>
    </>
  );
}
