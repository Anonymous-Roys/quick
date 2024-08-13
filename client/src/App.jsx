import './App.css'
import Router from './routes/index'
import { Scrollbars } from 'react-custom-scrollbars';

function App() {

  return (
    <>
  <Scrollbars style={{height:"100vh"}}>

       <Router/>    
  </Scrollbars>
    </>
  )
}

export default App
