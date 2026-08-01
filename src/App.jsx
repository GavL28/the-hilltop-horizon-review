import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import ContactUs from './ContactUs';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <header>
        <h1>Welcome to My Simple Website</h1>
        <p>This site is hosted on Cloudflare Pages!</p>
      </header>
      
      <main>
        <h2>Contact Me</h2>
        
        {/* 2. Render the component right here */}
        <ContactUs /> 
        
      </main>
    </div>
  )
}

export default App
