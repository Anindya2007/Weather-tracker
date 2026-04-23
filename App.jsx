import './App.css';
import { useState, useEffect } from 'react';
import Page from './components/page';


export default function App(){
  
  const [index,setIndex]=useState(1);
  const [data,setUserData]=useState([])
  
  async function getData(){
    let req=await fetch(`https://picsum.photos/v2/list?page=${index}&limit=15`);
    let data=await req.json();
    setUserData(data)
  }
  useEffect(()=>{
    getData();
  },[index])
  

  function Prev(){
    if (index>1){
      setIndex(index-1)
    }
  }

  function Next(){  
    setIndex(index+1)
  }

  return (
    <div style={{height:'100vh',marginLeft:'20px'}}>
      <Page info={data}/>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:'30px'}}>
      <button onClick={Prev} style={{opacity:index==1 ? '0.4':'1',}}>Prev</button>
      <h3 style={{display:'inline',color:'white',marginLeft:'15px',marginRight:'15px'}}>Page number: {index}</h3>
      <button onClick={Next}>Next</button>
      </div>
    </div>
  )
}