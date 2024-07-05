import React from 'react'
import Question from './Question.jsx'

function Questionlist({questionList}) {

    return (
        // id here not _id
        <>
            {
                questionList?.map((question) => (
                    <Question question={question} key={question._id} />
                ))
            }
        </>
    )
}

export default Questionlist

// A unique key prop is provided to each Question component to help React identify which items have changed, are added, or are removed. This key is usually a unique identifier from the question object, like _id.
