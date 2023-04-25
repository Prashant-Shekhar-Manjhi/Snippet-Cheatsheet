import React, {useState} from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./snippet.css";

export default function Snippet({snippet}) {
    const [copy, setCopy] = useState(false);

    const copyHandler = (codeSnippet)=>{
        if(codeSnippet){
            setCopy(true);
            navigator.clipboard.writeText(codeSnippet);
            toast.success("Copied to clipboard");
            setTimeout(()=>{
                setCopy(false);
            }, 2000);
        }   
    }
  return (
    <>
    {
        <ToastContainer
            position="bottom-center"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            style={{"fontSize":"14px"}}
        />
    }
    <div className="snippet-container" >
        <div className="snippet-container-heading">
            <p className="snippet-file-name">{(snippet?.filename)}</p>
            <div className='snippet-copy-button-wrapper'>
                {copy 
                ?   <div className='snippet-copied-wrapper'>
                        <p>Copied</p>
                    </div> 
                :   <ion-icon name="copy-outline" onClick={()=>copyHandler(snippet?.snippet)}></ion-icon>
                }   
            </div>  
        </div>
        <div>
            <SyntaxHighlighter id={snippet?.id} className = "syntax-highlighter" language={snippet?.lang} style={okaidia}>
                {snippet ? snippet?.snippet : "Pick one to view code."}
            </SyntaxHighlighter>    
        </div>
    </div>
    </>
  )
}
