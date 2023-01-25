import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../contexts/notes/noteContext'
import AddNote from './AddNote'
import Noteitem from './Noteitem'

const Notes = () => {

    const context = useContext(noteContext)
    const { notes, getNotes, editNote} = context

    useEffect(() => {
        // eslint-disable-next-line
        getNotes();
    }, [])

    const updateNote = (currentNote) => {
        setnote({id:currentNote._id, etitle:currentNote.title,edesc:currentNote.desc,etag:currentNote.tag})
        ref.current.click()
    }
    const ref = useRef(null)
    const refClose = useRef(null)

    const [note, setnote] = useState({id:"", etitle: "", edesc: "", etag: "" })

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClick=()=>{
        
        editNote(note.id,note.etitle,note.edesc,note.etag)
        refClose.current.click();
    }

    return (
        <>
            <AddNote />


            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='container my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" onChange={onChange} value={note.etitle} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="email" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edesc" className="form-label">Content</label>
                                    <textarea className="form-control" id="edesc" name="edesc" rows="3" onChange={onChange} value={note.edesc} required></textarea>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick}type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className='row my-3'>
                <h1>Your notes</h1>
                <div className="container mx-1 my-2">
                {notes.length ===0 && "No Notes to display"}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} note={note} updateNote={updateNote} />;
                })}
            </div>
        </>
    )
}

export default Notes