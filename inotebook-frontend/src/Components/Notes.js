import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../Context/NoteContext'
import AddNote from './AddNote'
import NoteItem from './NoteItem'
import { useNavigate } from 'react-router-dom'
import BlankNote from './BlankNote'



const Notes = (props) => {

  const navigate = useNavigate()

  const context = useContext(NoteContext)
  const ref = useRef(null)
  // console.log(context)

  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes()
    }
    else {
      navigate('/loggoff')
    }
    // eslint-disable-next-line
  }, [])

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const handleClick = (e) => {
    e.preventDefault();
    // console.log("Updating the note", note)
    editNote(note.id, note.etitle, note.edescription, note.etag)
    props.showAlert("Note Updated", "success")

  }

  const updateDateNote = (CurrNote) => {
    ref.current.click()
    setNote({ id: CurrNote._id, etitle: CurrNote.title, edescription: CurrNote.description, etag: CurrNote.tag })
  }

  return (
    <>
      <div className='d-flex'>
        <div className='container w-25'>
          <h3 style={{ fontWeight: '900' }} > Add Your Note Here</h3>
          <AddNote showAlert={props.showAlert} />
        </div>
        <div className='row justify-content-center  w-75'>
          <h1 className='my-5 font-weight-bold text-center'>Your Notes</h1>
          {notes.length > 0 ?
            notes.map((note) => {
              return <NoteItem showAlert={props.showAlert} key={note._id} updateDateNote={updateDateNote} note={note} />
            })
            :
            <BlankNote />}

        </div>

      </div>

      {/* modal */}
      <div>
        {/* <!-- Button trigger modal --> */}
        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>

        {/* <!-- Modal --> */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Note Title</label>
                  <input type="text" className="form-control" id="title" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                  <textarea type="text" className="form-control" id="description" name='edescription' value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="tag" name='etag' value={note.etag} onChange={onChange} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button disabled={note.etitle.length < 3 || note.edescription.length < 3} type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleClick}>Update changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Notes
