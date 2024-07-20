import React, {useState} from 'react'
import moment from "moment"
import copy from "copy-to-clipboard"
import upVote from '../../Assets/sort-up.svg'
import downVote from '../../Assets/sort-down.svg'
import './Questions.css'
import Avatar from '../../Components/Avatar/Avatar.jsx'
import Displayanswer from './Displayanswer.jsx'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deletequestion, votequestion, PostAnswer } from '../../action/question.js'


const Questiondetails = () => {

    const [answer, setanswer] = useState("")

    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const questionlist = useSelector((state) => state.questionreducer)
    const user = useSelector((state) => state.currentuserreducer)

    const url="https://stackoverflow-fullstack-project.onrender.com"



    const handlepostans = (e, answerlength) => {

        e.preventDefault()

        if (user === null) {

            alert("Login or signup to answer a question")
            navigate('/Auth')

        } else {

            if (answer === "") {
                alert("Enter an answer before submitting.")
            } 
            else {

                dispatch(PostAnswer({
                    id,
                    noofanswers : answerlength + 1,
                    answerbody : answer,
                    useranswered : user.result.name,
                    userid : user.result._id
                }))

                setanswer("")

            }
        }
    }



    const handleshare = () => {
        copy(url + location.pathname);
        alert('Copied URL : ' + url + location.pathname)
    }



    const handledelete = () => {
        dispatch(deletequestion(id, navigate))
    }




    const handleupvote = () => {

        if (user === null) {
            alert("Login or signup to answer a question")
            navigate('/Auth')
        } 
        else {
            dispatch(votequestion(id, 'upvote', user.result._id))
        }
    }




    const handledownvote = () => {

        if (user === null) {
            alert("Login or signup to answer a question")
            navigate('/Auth')
        } 
        else {
            dispatch(votequestion(id, 'downvote', user.result._id))
        }
    }




    return (

        <div className='question-details-page'>

            {/* again no data here after questionlist */}

            {questionlist.data === null ? (
                <h1>Loading....</h1>
            ) : (
                <>
                    {
                        questionlist.data
                        .filter((question) => question._id === id)
                        .map((question) => (

                            <div key={question._id}>

                                <section className='question-details-container'>

                                    <h1>{question.questiontitle}</h1>

                                    <div className='question-details-container-2'>

                                        <div className='question-votes'>
                                            <img src={upVote} alt='' width={18} className='votes-icon' onClick={handleupvote} />
                                            <p>{question.upvote.length - question.downvote.length}</p>
                                            <img src={downVote} alt='' width={18} className='votes-icon' onClick={handledownvote} />
                                        </div>

                                        <div style={{width : "100%"}}>
                                            
                                            <p className='question-body'>{question.questionbody}</p>

                                            <div className='question-details-tags'>
                                                {
                                                    question?.questiontags?.map((tag) => (
                                                        <p key={tag}>{tag}</p>
                                                    ))
                                                }
                                            </div>

                                            <div className='question-actions-user'>

                                                <div>
                                                    <button type='button' onClick={handleshare}>
                                                        Share
                                                    </button>

                                                    {/* _id not working at all */}
                                                    {
                                                        user?.result?._id === question?.userid && (
                                                            <button type='button' onClick={handledelete}>
                                                                Delete
                                                            </button>
                                                        )
                                                    }

                                                </div>

                                                <div>
                                                    <p>asked {moment(question.askedon).fromNow()}</p>

                                                    <Link to={`Users/${question.userid}`} className='user-link' style={{color: "#0086d8"}}>

                                                        <Avatar backgroundColor="orange" px="8px" py="5px" borderRadius="4px">
                                                            {question.userposted.charAt(0).toUpperCase()}
                                                        </Avatar>

                                                        <div>{question.userposted}</div>

                                                    </Link>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {
                                    question.noofanswers !== 0 && (
                                        <section>
                                            <h3>{question.noofanswers} Answers</h3>
                                            <Displayanswer key={question._id} question={question} handleshare={handleshare} />
                                        </section>
                                    )
                                }

                                <section className='post-ans-container'>

                                    <h3>Your Answers</h3>

                                    {/* curly brackets here */}
                                    <form onSubmit={(e) => handlepostans(e, question.answer.length) } >

                                        <textarea name='' id='' cols="30" rows="10" value={answer} onChange={(e) => setanswer(e.target.value)} ></textarea>
                                        <br />

                                        <input type='submit' className='post-ans-btn' value="Post Your Answer" />

                                    </form>

                                    <p>
                                        Browse Other Question tagged
                                        {
                                            question?.questiontags?.map((tag) => (
                                                <Link to="/Tags" key={tag} className='ans-tags' >
                                                    {" "}
                                                    {tag} {" "}
                                                </Link>
                                            ))
                                        }{" "}
                                        or
                                        <Link to="/Askquestion" style={{textDecoration: "none", color:"#009dff"}}>
                                            {" "}
                                            Ask your own question
                                        </Link>

                                    </p>

                                </section>
                            </div>
                        ) ) 
                    }
                </>
            )}
        </div>
    )
}

export default Questiondetails