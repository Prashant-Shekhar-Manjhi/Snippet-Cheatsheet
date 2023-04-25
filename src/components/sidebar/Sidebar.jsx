import React, { useState, useEffect } from 'react'
import {ref, get, getDatabase,child} from "firebase/database"
import "./sidebar.css"
import { auth } from '../../firebase/firebaseDB';



export default function Sidebar(props) {
  const [index, setIndex] = useState(null);
  const [snippetsData, setSnippetsData] = useState({});

  // firebase api call fetching data...
  useEffect(()=>{
    try {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `snippets`)).then((snapshot) => {
          if (snapshot.exists()) {
            setSnippetsData(snapshot.val());
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  },[])
 console.log(auth);
  return snippetsData && (
    <div className='sidebar-container'>
        <h2 className="sidebar-heading">Snippets Cheatsheet</h2>
        <ul className="sidebar-list">
            {
              Object.values(snippetsData).map((snippet)=>{return <li 
              key={snippet.id} 
              className={index === Object.values(snippetsData).indexOf(snippet) ?`sidebar-list-item selected-list-item`: `sidebar-list-item`}
              onClick={()=>{
                setIndex(Object.values(snippetsData).indexOf(snippet));
                props.snippetHandler(snippet)}}>
            {snippet.name}</li>})}
        </ul>
    </div>
  )
}
