import { Outlet } from 'react-router-dom';
import MainNavBar from './admin/MainNavBar';

function App() {
  return (
    <div> 
      <h1 align="center" style={{ color: '#003366' }}>varun jewellers</h1> {/* Dark blue color */}
      <MainNavBar/>
      <main className='pt-16 bg-slate-100 min-h-[calc(100vh)]'>
        <Outlet/>
      </main>
    </div>
  );
}

export default App;
