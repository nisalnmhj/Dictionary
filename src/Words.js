import React from 'react'
import axios from 'axios';


export default function Words(props) {
  console.log(props.input);
  const word = axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${props.input}`)
            .then((res)=>{
              console.log(res.JSON)
            })
            
  return (
    <div>
     
    </div>
  )
}
