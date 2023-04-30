import { BrowserRouter, Route, Routes } from "react-router-dom"
import MenuItems from "./components/MenuItems"
import CardDetails from "./pages/CardDetails"
import HomePage from "./pages/HomePage"
import DeckOfCard from "./pages/DeckOfCard"
import AllDeck from "./pages/AllDeck"
import Login from "./pages/Login"
import SignUp from "././pages/SignUp"




function App() {


  return (
    <div className="overflow-x-hidden">
  
    <BrowserRouter>
    <MenuItems />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/details" element={<CardDetails />} />
      <Route path="/decks" element={<AllDeck />} />
      <Route path="/deck/details" element={<DeckOfCard />} />                               
      <Route path="/login" element={<Login />} />                               
      <Route path="/signup" element={<SignUp />} />                               
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
