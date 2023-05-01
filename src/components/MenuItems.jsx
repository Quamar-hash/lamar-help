import React from 'react'
import card from '../assets/icons/card.svg'
import deck from '../assets/icons/deck.svg'
import { NavLink, useNavigate } from 'react-router-dom'
// needed for auth
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth } from "../firebase"

const MenuItems = () => {

  const [authUser, setAuthUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    
    // event that monitors the auth state with firebase
    const listen = onAuthStateChanged(auth, (user) => {
      if(user) {
       
        setAuthUser(user)
      }else {
        setAuthUser(null)
      }
    })

    return ()=> {
      listen()
    }

  }, [])

  const userSignOut = () => {
      // signing out user
      signOut(auth)
       .then( () => {
        alert("Signed Out Succesfully")
       })
  }

  const navigateLogin = () => {

    navigate("/login")
  }

  return (
    <div className='lg:px-16  px-6'>
    <section className='flex justify-between pt-8 '>
       <div className='flex items-center space-x-2'>
     <NavLink to="/" className="rounded-md bg-gray-200">
      {/* removed bg-white for `All Cards` and `Decks` also added rounded class to them*/}
     <div className='flex cursor-pointer items-center space-x-2  px-2 py-1 '>
            <img src={card} />
            <p>All Cards</p>
        </div>
     </NavLink>
    {/* added a navlinks to the decks and also dealt with the active class in css */}
        <NavLink to="/decks" className="rounded-md bg-gray-200">
        <div onClick={()=>navigate("/decks")} className='flex items-center cursor-pointer space-x-2  px-2 py-1 '>
            <img src={deck} />
            <p>Decks</p>
        </div>
        </NavLink>
       </div>

        <div className='hidden xl:flex'>
            {/* added gray color for the rest */}
            <p>SW- <span className="text-gray-600">API Deck Builder</span></p>
        </div>

        <div className='flex border-2 border-gray-300 px-2 md:px-3 py-1 rounded-md'>
            {/* changed border color was too bright added 1 unit of px*/}
            <p
              onClick={authUser ? userSignOut : navigateLogin}
              title = {authUser ? "Sign Out Now": "Sign In"}
            >
              {authUser ? `${authUser.email.split('@')[0]}` : "Sign In"}
            </p>
        </div>

    </section>
    {/* {fixed hr} */}
    <hr className="px-4 mt-2 mb-4 border-1 border-gray-300" />
    </div>
  )
}

export default MenuItems