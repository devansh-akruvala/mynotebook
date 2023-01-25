import React, { useState, useContext } from 'react'
import noteContext from '../contexts/notes/noteContext'

const AddNote = () => {
    const context = useContext(noteContext)
    const { addNote } = context
    const [note, setnote] = useState({ title: "", desc: "", tag: "" })

    const clickAddNote = (e) => {
        e.preventDefault();
            addNote(note.title,note.desc,note.tag)
        setnote({ title: "", desc: "", tag: "" })
    }

    const onChange = (e) => {
        setnote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div className='container my-3'>
            <h1> Add a Note</h1>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" onChange={onChange} value={note.title} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="email" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag} required  />
            </div>
            <div className="mb-3">
                <label htmlFor="desc" className="form-label">Content</label>
                <textarea className="form-control" id="desc" name="desc" rows="3" onChange={onChange} value={note.body} required></textarea>
            </div>

            <div className="col-auto">
                <button type="submit" className="btn btn-primary mb-3" onClick={clickAddNote} >Add Note</button>
            </div>
        </div>

    )
}

export default AddNote