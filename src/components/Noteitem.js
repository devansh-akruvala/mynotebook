import React from 'react'

const Noteitem = (props) => {
    const note = props.note
    return (

        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
                    <p className="card-text">{note.body}</p>

                </div>
            </div>
        </div>
    )
}

export default Noteitem