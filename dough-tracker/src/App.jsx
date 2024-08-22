import './App.css'
import Dough from './Pages/Dough'
import Header from './Components/Header'
import DoughCounter from './Components/DoughCounter'

function App() {


  return (
    <> 
      <header className='header'>
        <Header/>
      </header>
      <main>
        <Dough/>
      </main>
    </>
  )
}

export default App
