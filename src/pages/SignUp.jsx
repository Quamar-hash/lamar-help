import {useState} from "react"
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"

import {auth} from "../firebase"
import { useNavigate } from "react-router-dom"


export default function SignUp() {

    const navigate = useNavigate("/")

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName:" ", 
        showPassword: false,
    })

    const signInUser = (event) => {
        event.preventDefault()
        const {firstName, lastName, email, password} = formData

        createUserWithEmailAndPassword(auth, email, password )
         .then((userCredential) => {
            console.log(userCredential)
            sendEmailVerification(userCredential.user);
         }).catch((err) => {
            console.error(err)
         }) 
navigate("/")
    }

    const handleChange = (event) => {
        console.log(formData)
        setFormData( prev => {
            const {name, value, type, checked} = event.target
            console.log(checked)

            return ({
                ...prev,
                [name]: type === "checkbox"? checked : value,
            })
        })
    }


    return(
            <form className="mx-auto mt-16 max-w-[500px] bg-white shadow-lg rounded p-6 " onSubmit={signInUser}>

                <h1 className="text-center text-lg mb-2">Welcome to Swapi-Deck, Please Register</h1>

                <div className="space-y-6">

                <div className="relative z-0">
                    <input type="text" id="first-name" name="firstName" className="floating-input peer" placeholder=" " onChange={handleChange}/>

                    <label htmlFor="email"
                        className="floating-label"
                    >First Name</label>
                </div>

                <div className="relative z-0">
                    <input type="text" id="text" name="lastName" className="floating-input peer" placeholder=" " onChange={handleChange}/>

                    <label htmlFor="email"
                        className="floating-label"
                    >Last Name</label>
                </div>


                <div className="relative z-0">
                    <input type="email" id="email" name="email" className="floating-input peer" placeholder=" " onChange={handleChange}/>

                    <label htmlFor="email"
                        className="floating-label"
                    >Email</label>
                </div>

                <div className="relative z-0">
                    <input type={formData.showPassword ? "text" : "password"} id="password" name="password" className="floating-input peer" placeholder=" " onChange={handleChange}/>

                    <label htmlFor="password"
                        className="floating-label"
                    >Password</label>
                </div>
                </div>
                <input type="checkbox" name="showPassword" id="showPassword" onChange={handleChange}/>
                <label htmlFor="showPassword">Show Password</label>


                <button type="submit" className="py-2 font-semibold px-6 rounded bg-blue-500 text-white mx-auto block hover:bg-blue-800 transition">
                    SignUp
                </button>

            </form>
    )
}