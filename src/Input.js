import React from 'react';
import {useState} from 'react';
import './Input.css';
import axios from 'axios';

export default function Input() {
 
  const [input, setInput] = useState([]);
  const [search, setSearch] = useState([]);
  const [error, setError] = useState(null);
  const [audio, setAudio] = useState(null);

 

 

  function handleClick() {
    axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`,{responseType: 'json'})
            .then((res) => {
              console.log('Response from API:', res.data);
              // console.log('here:', res.phonetics[0].audio);
              setSearch(res.data)
              setError(null)
              try{
                const audio = res.data[0].phonetics[0].audio;
                if(audio){
                  setAudio(audio)
                }
                else{
                  setAudio(null)
                }
              }
              catch (error) {
                // Handle any other exceptions that may occur
                console.error('An error occurred:', error);
              }
            })
            .catch((error) => {
              console.error('Error fetching data:', error);
              setError(error)
            });
          
            console.log('Search:', search);
  }

  const handleChange = event => {
    setInput(event.target.value);
    console.log('value is:', event.target.value);
  };
  function clearItems(){
    setInput([]);
    setSearch([]);
  }
  return (
    <div >
        <div className='search-bar'>
          <input type="text" placeholder="Type word here" onChange={handleChange} value={input}/>
          <button type="submit" onClick={handleClick}> Search </button>
          <button type="submit" onClick={clearItems}> Clear</button>
          {error && <div className="error-message"> {error.message} <p>Word not found</p></div>}
          <div>
            {search.map((item, i) => (
              <div key={i}>
                <h1>{item.word}</h1>
                <p>Phonetic: {item.phonetic}</p>
               {audio && <audio controls src={item.phonetics[0].audio}></audio> }
                <p>License: {item.license.name}</p>
                <p>License URL: <a href={item.license.url}>{item.license.url}</a></p>
                <p style={{color: "black", fontSize: "1.5rem"}}>Meanings</p>
                <ul>
                  {item.meanings.map((meaning, j) => (
                    <li key={j}>
                      Part of speech: {meaning.partOfSpeech}<br />
                      Definition: {meaning.definitions[0].definition}<br />
                      Example: {meaning.definitions[0].example}<br />
                      Synonyms: {meaning.synonyms[0]}<br />
                      Antonyms: {meaning.antonyms[0]}<br />
                    </li>
                  ))}
                </ul>
                <p>Source URL: <a href={item.sourceUrls[0]}>{item.sourceUrls[0]}</a></p>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

// fetch("https://type.fit/api/quotes")
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(data) {
//     console.log(data);
//   });