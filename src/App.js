
import './App.css';
import axios from 'axios';
import Input from './Input';

// const word = axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/dog')
//             .then((res)=>{
//               console.log(res)
//             })

export default function App(){
  return (
    <div className="App">
      <Input />
    </div>
  );
  }
