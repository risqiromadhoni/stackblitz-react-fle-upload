import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [file, setFile] = useState()
  const [files, setFiles] = useState([])
  const [message, setMessage] = useState("")

  const handleFileChange = (e) => {
    // type: https://developer.mozilla.org/en-US/docs/Web/API/FileList
    const { files } = e.target
    setFile(files.item(0))
  }

  const handleMultipleFileChange = (e) => {
    // type: https://developer.mozilla.org/en-US/docs/Web/API/FileList
    const { files } = e.target
    const arrFiles = Array.from(files)
    console.log(arrFiles)
    setFiles(arrFiles)
  }

  const handleMessageChange = (e) => {
    const { value } = e.target
    setMessage(value)
  }

  const uploadData = (e) => {
    const formData = new FormData()
    if (!!file) formData.append("file", file)
    if (!!message) formData.append("message", message)
    if (!!files.length) {
      for (const multiFile of files) {
        console.log(multiFile)
        formData.append("mutipleFile[]", multiFile)
      }
    }

    console.log(Array.from(formData.entries()))
    
    // If you using axios to comunicate with API,
    // you should overide default header config
    //axios.defaults.headers.common = {
    //  "Content-Type": "multipart/form-data",
    //  Accept: "*/*",
    //};

    // Do upload with axios
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div className="form-file">
        <input type="file" id="newFile" onChange={handleFileChange} />
        <input type="file" id="multiFile" multiple onChange={handleMultipleFileChange} />
        <input type="text" id="newMessage" placeholder="An message iiinput here" onChange={handleMessageChange} />
        <button onClick={uploadData}>Upload</button>
      </div>
    </>
  )
}

export default App
