import { useState } from "react";
import NoteContext from "./noteContext";
//yha pa context ko import kiya h use krne ke liye


// yen yha pr ek function h jha hmme jo kuch bhi chiye hoga woh value se lenge 
const NoteState= (props)=>{
  const host="https://i-notebook-server-jbg8.vercel.app";
  // const host=process.env.host;

    const notesInitial=[]

      const [notes, setNotes]= useState(notesInitial)

      //Fetch All Notes
      const getNotes=async()=>{
        console.log("Fetching all notes")
        //API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET',
          
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem("token")
          },
          
        });
        const json=await response.json();
        console.log(json);
        setNotes(json);
        
      }





      const addNote=async(title,description,tag)=>{
        console.log("Adding a new note")
        //API CALL
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST',
          
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem("token")
          },
         
          body: JSON.stringify({title,description,tag}) 
        });
        const note=await response.json();
        setNotes(notes.concat(note))
        
        
      }




      //Delete a Note
      const deleteNote=async (id)=>{
        //API CALL
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem("token")
          },
         
        });
        const json=await response.json();
        console.log(json);

        console.log("Deleting the note"+id);
        const newNotes= notes.filter((note)=>{
          return note._id!==id
        })
        setNotes(newNotes)
      }



      //Edit a note
      const editNote=async(id,title,description,tag)=>{
        //API CALL
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',
          
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem("token")
          },
         
          body: JSON.stringify({title,description,tag}) 
        });
        const json=await response.json();
        console.log(json);
        

        let newNotes=JSON.parse(JSON.stringify(notes))
        //Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id===id){
            newNotes[index].title=title;
            newNotes[index].description=description;
            newNotes[index].tag=tag;
            break;
          }
          
        }
        console.log(newNotes);
        setNotes(newNotes);
      }


    return (
        <NoteContext.Provider value={{notes, addNote, editNote, deleteNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;