import React, {useState} from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import "./snippet.css";
import snippets from "../../resources/snippets";

export default function Snippet({snippet}) {
    const [copy, setCopy] = useState(false);
    const copyHandler = (codeSnippet)=>{
        setCopy(true);
        navigator.clipboard.writeText(codeSnippet);
        setTimeout(()=>{
            setCopy(false);
        }, 2000)
    }
  return (
    <div className="snippet-container" >
        <div className="snippet-container-heading">
            <p className="snippet-file-name">{(!snippet ? snippets[0].filename : snippet?.filename)}</p>
            <div className='snippet-copy-button-wrapper'>
                {copy 
                ?   <div className='snippet-copied-wrapper'>
                        <p>Copied</p>
                    </div> 
                :   <ion-icon name="copy-outline" onClick={()=>copyHandler(!snippet ? snippets[0].snippet : snippet?.snippet)}></ion-icon>
                }   
            </div>  
        </div>
        <div onClick={()=>copyHandler(!snippet ? snippets[0].snippet : snippet?.snippet)}>
            <SyntaxHighlighter id={snippet? snippets[0].id :snippet?.id} className = "syntax-highlighter" language={!snippet ? snippets[0].lang : snippet?.lang} style={okaidia}>
                {!snippet ? snippets[0].snippet : snippet?.snippet}
            </SyntaxHighlighter>    
        </div>
    </div>
  )
}
