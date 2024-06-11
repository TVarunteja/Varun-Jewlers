import { Outlet } from 'react-router-dom';
import MainNavBar from './admin/MainNavBar';

function App() {
  
  return (
    <div > 
    <MainNavBar/>
    <main className='pt-16 bg-slate-100 min-h-[calc(100vh)]'>
      <Outlet/>
    </main>
    </div>
  );
}

export default App;