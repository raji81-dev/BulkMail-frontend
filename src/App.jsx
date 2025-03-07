import { useState } from 'react'
import './App.css'
import axios from 'axios'
import * as XLSX from 'xlsx'
function App() {
  const [msg, setmsg] = useState("")
  const [status,setstatus]=useState(false)
  const [emailList,setEmailList]=useState([])
  function handlemsg(event){
setmsg(event.target.value)
  }
  function handlefile(event){
    const file=event.target.files[0]

    const reader=new FileReader();
    reader.onload=function(e){
        const data=e.target.result
        console.log(data)
        const workbook=XLSX.read(data,{type:"binary"})
        const sheetName=workbook.SheetNames[0]
        const worksheet=workbook.Sheets[sheetName]
        const emailData=XLSX.utils.sheet_to_json(worksheet,{header:'A'})

      //   console.log(emailData)
      const totalemail=emailData.map(function(item){
        debugger
        return item.A
       

      })
      console.log(totalemail)
      setEmailList(totalemail)
    }
    reader.readAsArrayBuffer(file);
  }
  function send(){
   
    setstatus(true)
    axios.post("http://localhost:5000/",{msg:msg,emailList:emailList})
    .then(function(data){
      
 if(data.data=true){
 
   alert("Email sent successfully...")
   setstatus(false)
 }
 else{
      alert("Email not sent")
 }
    })
  }
  return (
    <>
       <div className="bg-blue-950 text-white text-center">
        <h1 className='text-2xl font-medium px-5 py-3'>Bulkmail</h1>
        </div>
        <div className="bg-blue-800 text-white text-center">
        <h1 className='text-2xl font-medium px-5 py-3'>We can help your business sending multiple business</h1>
        </div>
        <div className="bg-blue-600 text-white text-center">
        <h1 className='text-2xl font-medium px-5 py-3'>Drag and Drop</h1>
        </div>
        <div className='bg-blue-400 flex flex-col items-center text-black px-5 py-3'>
       <textarea onChange={handlemsg} value={msg} className='bg-white w-[80%] h-32 py-2 outline-none px-2 border border-black rounded-md' placeholder='Enter the email text.....'></textarea>       
       <div>
          <input type='file' onChange={handlefile} className=' bg-gray-300 border-4 border-dashed py-4 px-4 mt-5 mb-5'></input>
        </div>
           <p>Total email in the file :{emailList.length}</p>
           <button onClick={send} className='bg-blue-950 mt-2 py-2 px-2 text-white font-medium rounded-md w-fit'>{status?"Sending..":"Send"}</button>
       </div>
       <div className="bg-blue-300 text-white text-center p-9">
       
        </div>
        <div className="bg-blue-200 text-white text-center p-9">
       
       </div>
        
    </>
  )
}

export default App
