import { Outlet } from 'react-router-dom';
import MainNavBar from './admin/MainNavBar';
import bgimage from './images/1110140-uhd_3840_2160_30fps.mp4';
import './App.css'; // Import the CSS file for styling

function App() {
  return (
    <div className="app-container">
      <video className="background-video" autoPlay loop muted>
        <source src={bgimage} type="video/mp4" />
      </video>
      <div className="content">
        <h1 align="center" style={{ color: '#003366' }}>VARUN JEWLERS</h1> {/* Dark blue color */}
        <MainNavBar />
        <main className='main-content'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
