import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //handle browser url's
import VideoMeetComponent from "./pages/videoMeet";
import LandingPage from "./pages/LandingPage";
import Authentication from "./pages/authentication";
import { AuthProvider } from "./contexts/AuthContext";//global data provider(pehle user auth se travel karega then login , home , history)
import Home from "./pages/Home";
import History from "./pages/history";

function App() {
  return (
    <div className="App">
    {/* handles  all routing */}
      <Router>  
        {/* all urls can use this auth security feature */}
        <AuthProvider>
          <Routes>
            {/* handle 1st page */}
            <Route path="/" element={<LandingPage />} /> 

           {/* redirect to /auth page after login */}
            <Route path="/auth" element={<Authentication />} />

           {/* if token is valid after login then /home is open */}
            <Route path="/home" element={<Home />} />

           {/* open history page */}
            <Route path="/history" element={<History />} />

          {/* if meeting id is valid then redirect to videoMeet.jsx page */}
            <Route path="/:url" element={<VideoMeetComponent />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
