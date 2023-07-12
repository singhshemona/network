import React from 'react';

export const AboutContent = () => {
  return (
    <>
      <h3>What is this?</h3>
      <p>An exploration into how we might learn more effectively, inspired by<a href="https://www.wgu.edu/blog/connectivism-learning-theory2105.html">connectivism</a>.</p>
      <h3>How do you use it?</h3>
      <ol>
        <li>Pick a topic you want to learn, maybe you already flashcards for it (think: Anki).</li>
        <li>To add a new node, click anywhere on the canvas.</li>
        <li>For maximum learning efficiency, ensure your prompts and answers <a href="https://andymatuschak.org/prompts/">follow these guidelines</a>.</li>
        <li>Connect nodes that you think relate in some way, then describe that connection in their shared edge's text.</li>
      </ol>
      <h3>Helpful tips:</h3>
      <ul>
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
