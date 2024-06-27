import React from 'react'
import Question from './Question.jsx'

function Questionlist({questionList}) {

    return (
        <>
            {questionList.map((question) => (
                <Question question={question} key={question._id} />
            ))}
        </>
    )
}

export default Questionlist