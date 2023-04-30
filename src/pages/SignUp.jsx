import {useState} from "react"
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"

import {auth} from "../firebase"


export default function SignUp() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        showPassword: false,
    })

    const signInUser = (event) => {
        event.preventDefault()
        const {email, password} = formData

        createUserWithEmailAndPassword(auth, email, password )
         .then((userCredential) => {
            console.log(userCredential)
            sendEmailVerification(userCredential.user);
         }).catch((err) => {
            console.error(err)
         }) 

        // hello
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
            <form className="mx-auto max-w-[500px] shadow rounded p-6 " onSubmit={signInUser}>

                <h1>Welcome back to Dexk builder. Please fill in the form to get started</h1>

                <div className="space-y-6">
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