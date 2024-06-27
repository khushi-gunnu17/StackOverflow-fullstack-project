import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Askquestion from './pages/Askquestion/Askquestion.jsx'
import Auth from './pages/Auth/Auth.jsx'
import Question from './Components/Homemainbar/Question.jsx'
import Displayquestion from './pages/Question/Displayquestion.jsx'
import Tags from './pages/Tags/Tags.jsx'
import Users from './pages/Users/Users.jsx'
import Userprofile from './pages/Userprofile/Userprofile.jsx'

function RoutesAll({slidein, handleSlidein}) {
    return (
        <Routes>
           <Route path='/' element={<Home slidein={slidein} handleSlidein={handleSlidein}/>} /> 
           <Route path='/Askquestion' element={<Askquestion />} /> 
           <Route path='/Auth' element={<Auth />} /> 
           <Route path='/Question' element={<Question slidein={slidein} handleSlidein={handleSlidein}/>} /> 
           <Route path='/Question/:id' element={<Displayquestion slidein={slidein} handleSlidein={handleSlidein}/>} /> 
           <Route path='/Tags' element={<Tags slidein={slidein} handleSlidein={handleSlidein}/>} /> 
           <Route path='/Users' element={<Users slidein={slidein} handleSlidein={handleSlidein}/>} /> 
           <Route path='/Users/:id' element={<Userprofile slidein={slidein} handleSlidein={handleSlidein}/>} /> 
        </Routes>
    )
}

export default RoutesAll