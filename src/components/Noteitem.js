import React, { useContext } from 'react'
import noteContext from '../contexts/notes/noteContext'

const Noteitem = (props) => {
    const note = props.note
    const context = useContext(noteContext)
    const { deleteNote,editeNote} = context

    return (

        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
                    <p className="card-text">{note.body}</p>
                    <i className="fa-sharp fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                    <i className="fa-solid fa-pen-to-square mx-2"></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem