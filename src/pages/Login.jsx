import {useState} from "react"
import { signInWithEmailAndPassword } from "firebase/auth"

import { Link } from "react-router-dom"

import {auth} from "../firebase"



export default function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        showPassword: false,
    })

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

    const loginUser = (event) => {
        event.preventDefault()
        const {email, password} = formData

        signInWithEmailAndPassword(auth, email, password )
         .then((userCredential) => {
            console.log(userCredential)
         }).catch((err) => {
            console.error(err)
         }) 

        // hello
    }

    return(
            <form className="mx-auto max-w-[500px] bg-white shadow-xl mt-16 rounded p-6 " onSubmit={loginUser}>

                <h1 className="text-center text-lg mb-4">Welcome back to Swapi Deck</h1>

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
                <label htmlFor="showPassword" className="ml-1">Show Password</label>

                <button type="submit" className="py-2 font-semibold px-6 rounded bg-blue-500 text-white mx-auto block hover:bg-blue-800 transition">
                    Login
                </button>

                <p className="text-center">
                    Don't have an account? <Link to="/signup" className="underline text-blue-600 mx-1 font-semibold hover:cursor-pointer">SignUp</Link>
                </p>

            </form>
    )
}