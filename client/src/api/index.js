import axios from "axios"

const API = axios.create({
    baseURL : "http://localhost:5000"
})

API.interceptors.request.use((req) => {
    if (localStorage.getItem("Profile")) {
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("Profile")).token
        }`
    }
    return req
})

// This interceptor function runs before each request (req) is sent. It checks if there's an item called "Profile" in localStorage. If it exists, it adds an Authorization header to the request using a JWT token stored in "Profile". This is useful for authenticating requests that require user authorization.



export const login = (authdata) => API.post("user/login", authdata)
export const signup = (authdata) => API.post("user/signup", authdata)
export const getallusers = () => API.get("/user/getallusers")
export const updateprofile = (id, updatedata) => API.patch(`user/update/${id}`, updatedata)


export const postquestion = (questiondata) => API.post("/questions/Ask", questiondata)
export const getallquestion = () => API.get("/questions/get")
export const deletequestion = (id) => API.delete(`/questions/delete/${id}`)
export const votequestion = (id, value) => API.delete(`/questions/delete/${id}`, {value})


export const postanswer = (id, noofanswers, answerbody, useranswered) => API.patch(`/answer/post/${id}`, {noofanswers, answerbody, useranswered})
export const deleteanswer = (id, answerid, noofanswers) => API.patch(`/answer/delete/${id}`, {answerid, noofanswers})