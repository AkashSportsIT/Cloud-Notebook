import axios from 'axios'
import React, { useState } from 'react'
import NoteContext from './NoteContext'

const NotesState = (props) => {
    const host = 'http://localhost:9090';
    const note = []

    const [notes, setnotes] = useState(note)




    // GET All Notes
    const getNotes = async () => {
        // API call
        const response = await axios.get(`${host}/api/notes/fetchallnotes`,
            {
                headers:
                {
                    "auth-token": localStorage.getItem('token')
                }
            },
        )
        // const json = await response.json();
        // console.log(response.data)
        setnotes(response.data)
    }



    // ADD a note
    const addNote = async (title, description, tag) => {
        // API call
        const data = {
            title, description, tag
        }
        try {
            const response = await axios.post(`${host}/api/notes/createnote`, data,
                {
                    headers:
                    {
                        "auth-token": localStorage.getItem('token')
                    }
                },
            )
            // const json = await response.json();
            // console.log("data",response.data.data)
            // // const note = response
            setnotes(notes.concat(response.data.data))
        } catch (error) {
            console.log("error ",error)
        }

    }


    // localStorage.getItem('token')

    // Delete a Note
    const deleteNote = async (id) => {

        // Api call
        await axios.delete(`${host}/api/notes/deletenote/${id}`,
            {
                headers:
                {
                    "auth-token": localStorage.getItem('token')
                }
            },
        )
        // console.log(response)

        // console.log("Deleting id " + _id)
        const newNotes = notes.filter((note) => {
            return note._id !== id
        })
        setnotes(newNotes)
    }




    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // Api call
        const data = {
            title, description, tag
        }

        await axios.put(`${host}/api/notes/updatenote/${id}`, data,
            {
                headers:
                {
                    "auth-token": localStorage.getItem('token')
                }
            },
        )
        // console.log(response)
        const newNote = JSON.parse(JSON.stringify(notes))
        // const json = response.json();

        // Logic for edit
        for (let i = 0; i < newNote.length; i++) {
            const element = newNote[i];
            if (element._id === id) {
                newNote[i].title = title;
                newNote[i].description = description;
                newNote[i].tag = tag;
                break;
            }
        }
        // console.log(id, newNote)
        setnotes(newNote)
    }

    return (
        <NoteContext.Provider value={{ notes, setnotes, addNote, deleteNote, editNote, getNotes }} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NotesState;
