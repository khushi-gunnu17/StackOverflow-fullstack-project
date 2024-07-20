import mongoose from 'mongoose'
import users from "../models/auth.js"

export const getallusers = async(req, res) => {
    try {

        const allusers = await users.find()     // fetching all users from the database
        const alluserdetails = []

        allusers.forEach((user) => {
            alluserdetails.push({
                _id : user._id,
                name : user.name,
                about : user.about,
                tags : user.tags,
                joinedon : user.joinedon
            })
        })

        res.status(200).json(alluserdetails)
        
    } catch (error) {
        res.status(400).json({message : error.message})
        return 
    }
}



export const updateprofile = async(req, res) => {

    const {id : _id} = req.params()     // extracting the user id from the request parameters
    const {name, about, tags} = req.body

    if (!mongoose.Types.ObjectId.isValid(_id)) {            // Checks if the user ID is valid ObjectId format
        return res.status(404).send("user unavailable")
    }

    try {
        const updateprofile = await users.findByIdAndUpdate(_id, {$set : {name : name, about : about, tags : tags}},
            {new : true}     // Ensures Mongoose returns the updated document
        )

        res.status(200).json(updateprofile)

    } catch (error) {
        res.status(404).json({message : error.message})
        return
    }
}