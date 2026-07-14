import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./App.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


//app.js
// import "./App.css";

// import LandingPage from "./pages/LandingPage";



// function App() {

//   return <LandingPage />;

// }



// export default App;