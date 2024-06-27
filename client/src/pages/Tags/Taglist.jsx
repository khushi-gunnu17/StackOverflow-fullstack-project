import React from 'react'

function Taglist({tag}) {
    return (
        <div className='tag'>
            <h5>{tag.tagname}</h5>
            <p>{tag.tagDesc}</p>
        </div>
    )
}

export default Taglist