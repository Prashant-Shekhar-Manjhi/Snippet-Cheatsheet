import React, { useState } from 'react';
import "./home.css"
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import Snippet from '../../components/snippet/Snippet';

export default function Home() {
  const [snippet, setSnippet] = useState(null);
  const snippetController = (snippet)=>{
     setSnippet(snippet);
  }
  return (
    <>
        <Header/>
        <div className="home-main-container">
            <div className="home-sidebar-container">
              <Sidebar snippetHandler = {snippetController}/>
            </div>
            <div className="home-content-container">
              <div className="home-snippets-wrapper">
                <Snippet snippet={snippet}/>
              </div>
            </div>
        </div>
    </>
  )
}
