import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';

// In this assignment, you will create a component that renders a large list of sentences and includes an input field for filtering these items.
// The goal is to use useMemo to optimize the filtering process, ensuring the list is only re-calculated when necessary (e.g., when the filter criteria changes).
// You will learn something new here, specifically how you have to pass more than one value in the dependency array

const words = ['hi', 'my', 'name', 'is', 'for', 'to', 'random', 'word'];
const TOTAL_LINES = 1000;
const ALL_WORDS = [];
for (let i = 0; i < TOTAL_LINES; i++) {
  let sentence = '';
  for (let j = 0; j < words.length; j++) {
    sentence += words[Math.floor(words.length * Math.random())];
    sentence += ' ';
  }
  ALL_WORDS.push(sentence);
}

export default function Assignment2() {
  const [counter, setCounter] = useState(0);
  const [sentences, setSentences] = useState(ALL_WORDS);
  const [filter, setFilter] = useState('');

  //making sure the operation only runs when either sentences or filter changes
  const filteredSentences = useMemo(() => {
    console.log('inside expensive operation');
    return sentences.filter((x) => x.includes(filter));
  }, [sentences, filter]);

  return (
    <div>
      <span>Clicking below button should not run the expensive operation</span>
      <br />
      <button onClick={() => setCounter(counter + 1)}>
        Counter ({counter})
      </button>
      <br />
      <br />
      <button onClick={() => setSentences([...sentences, 'new sentence'])}>
        Add a new Sentence
      </button>
      <br />
      <br />
      <input
        type='text'
        placeholder='Enter filter text'
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      ></input>
      {filteredSentences.map((word, idx) => (
        <div key={idx}>{word}</div>
      ))}
    </div>
  );
}
