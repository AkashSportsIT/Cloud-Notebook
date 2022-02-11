import React, { useContext, } from 'react'
import NoteContext from '../Context/NoteContext'
import './NoteItem.css'
const NoteItem = (props) => {

    const context = useContext(NoteContext)
    const { deleteNote } = context;
    const { note, updateDateNote } = props



    const handleClick = () => {
        deleteNote(note._id)
        props.showAlert("Note deleted", "success")

    }
    return (
        <>
            <div class="data-card">
                <h3>{note.title}</h3>
                <h4>{note.tag}</h4>
                <p>{note.description}</p>

                <div className="w-25 mt-5">
                    <i className="fad fa-trash-alt mx-2" onClick={handleClick}></i>
                    <i className="fad fa-edit" onClick={() => { updateDateNote(note) }}></i>
                </div>
                
            </div>
            {/* <div className='col-md-3 note-card mx-2' style={{ background: 'radial-gradient(#60efbc, #58d5c9)', marginBottom: '40px', borderRadius: '20px', boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.4)' }}>
                <div className="my-3 border-0" >
                    <div className="card-body">
                        <div className='d-flex'>
                            <div className='w-75'>
                                <h3 className="card-title " style={{ fontWeight: '800', color: 'black', wordWrap:'break-word' }}>{note.title}</h3>
                            </div>
                            <div className="w-25">
                                <i className="fad fa-trash-alt mx-2" onClick={handleClick}></i>
                                <i className="fad fa-edit" onClick={() => { updateDateNote(note) }}></i>
                            </div>
                        </div>
                        <hr style={{ color: 'black' }} />
                        <p className="card-text" style={{ fontWeight: '800', color: 'black' }}>{note.description}</p>
                    </div>
                </div>
            </div> */}
        </>
    )
}





export default NoteItem
