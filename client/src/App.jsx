import { useState } from 'react'

import './App.css'
import Hero from './pages/Hero'
import Categories from './pages/Categories'
import Slider from './Components/Slider'
import Shipping from './Components/Shipping'
import PuppyTabs from './pages/Puppies/PuppyTabs'
import Puppies from './pages/Puppies/Puppies'
import Thumb2Puppy from './pages/Puppies/Tumb2Puppy'
import Puppies2 from './pages/Puppies/Puppies2'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  
<Slider/>
<Shipping/>
 <PuppyTabs/>
 <Puppies/>
 <Thumb2Puppy/>
 <Puppies2/>
    </>
  )
}

export default App
