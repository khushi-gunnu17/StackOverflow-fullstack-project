import mongoose from "mongoose"
import Question from "../models/Questions.js"



export const postanswer = async(req, res) => {

    const {id : _id} = req.params

    // Extracting the number of answers, the answer body, and the user who answered from the request body.
    const { noofanswers, answerbody, useranswered } = req.body;

    const userid = req.userid

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("Question Unavailable....")
    }
    

    try {

        const updatequestion = await Question.findByIdAndUpdate(_id, {
            $addToSet : {answer : [{answerbody, useranswered, userid}]}
        })

        updatenoofquestion(_id, noofanswers)

        res.status(200).json(updatequestion)
        
    } catch (error) {
        res.status(404).json({message : "Error in uploading..."})
        return
    }

}





const updatenoofquestion = async(_id, noofanswers) => {

    try {

        await Question.findByIdAndUpdate(_id, {
            $set : {noofanswers : noofanswers}
        })
        
    } catch (error) {
        console.log(error);
    }

}





export const deleteanswer = async(req, res) => {

    const {id : _id} = req.params
    const {answerid, noofanswers} = req.body

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("Question unavailable.")
    }

    if (!mongoose.Types.ObjectId.isValid(answerid)) {
        return res.status(404).send("Answer unavailable.")
    }


    try {

        await Question.updateOne(
            {_id},
            {$pull : {answer : {_id : answerid}}}
        )

        updatenoofquestion(_id, noofanswers)

        res.status(200).json({message : "Successfully deleted..."})
        
    } catch (error) {
        res.status(404).json({message : "Error in deleting the answer..."})
        return
    }
    
}