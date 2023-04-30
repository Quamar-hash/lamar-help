import React from 'react'
import AllCards from '../components/AllCards'
import Breadscrum from '../components/Breadscrum'
import Controls from '../components/Controls'

const HomePage = () => {
  return (
    <div>
      <Breadscrum state1="All Cards" state2="Select a card" />
      <Controls />
        <AllCards />
    </div>
  )
}

export default HomePage