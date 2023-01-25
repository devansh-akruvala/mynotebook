import React, { useContext,useEffect } from 'react'
import noteContext from '../contexts/notes/noteContext'
import AddNote from './AddNote'
import Noteitem from './Noteitem'

const Notes = () => {

    const context = useContext(noteContext)
    const { notes,getNotes } = context

    useEffect(() => {
        // eslint-disable-next-line
        getNotes();
    }, [])
    
    

    return (
        <>
            <AddNote/>
            <div className='row my-3'>
                <h1>Your notes</h1>
                {notes.map((note) => {
                    return <Noteitem key={note._id} note={note} />;
                })}
            </div>
        </>
    )
}

export default Notes