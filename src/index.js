import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom';
import Add from './admin/Add';
import Search from './admin/Search';
import Md1 from './md1/Md1';
import Md2 from './md2/Md2';
import TotalAmount from './admin/TotalAmount';
import Md1customers from './md1/Md1customers';
import Md2customers from './md2/Md2customers';
import TakenAway from './admin/TakenAway';
import Addtodelete from './admin/Addtodelete';

const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
    
     
        <Route path="/add" element={<Add/>} exact />
        <Route path="/search" element={<Search/>} exact />
        <Route path="/md1" element={<Md1/>} exact />
        <Route path="/md2" element={<Md2/>} exact />
        <Route path="/totalamount" element={<TotalAmount/>} exact />
        <Route path="/md1customers" element={<Md1customers/>} exact />
        <Route path="/md2customers" element={<Md2customers/>} exact />
        <Route path="/takenaway" element={<TakenAway/>} exact />
        <Route path="/addtodelete" element={<Addtodelete/>} exact />
      
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
    
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
