import { Button, } from '@mui/material';
import React, { useState, useContext } from 'react'
import NoteContext from '../Context/NoteContext'


const AddNote = (props) => {
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const context = useContext(NoteContext)
    // console.log(context)

    const { addNote } = context;

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Added SuccesFully", "success")

    }


    return (
        <>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Note Title</label>
                    <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onChange}  minLength={3} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <textarea type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange}  minLength={3} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
                </div>
                <Button disabled={note.title.length < 3 || note.description.length < 3}  variant="contained" type="submit" className="btn btn-success" onClick={handleClick}>Submit</Button>
            </form>
        </>
    )
}

export default AddNote;
