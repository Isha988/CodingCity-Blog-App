import { Routes,Route, Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux"
import { useEffect, useState } from "react";

import './App.css';
import Nav from "./components/navbar/Nav"
import Home from './components/pages/Home';
import Contact from "./components/pages/contact";
import About from "./components/pages/About";
import AddBlog from "./components/pages/AddBlog";
import NotFound from "./components/pages/NotFound";
import Footer from "./components/footer/Footer";
import Login from './components/pages/Login';
import Blog from "./components/pages/Blog";
import Category from "./components/pages/Category";
import ScrollUp from "./components/smallComponents/ScrollUp";


function App() {
  const { user} = useSelector((state) => state.auth);

  const location = useLocation().pathname;

  useEffect(()=> {
    window.scrollTo(0,0)
  }, [location])

  return (
    <>
      <Nav/>
      <section id="main">
        <Routes>
          <Route path="/" element={<Home/>}/>

          <Route path="/contact" element={<Contact/>} />
      
          <Route path="/about" element={<About/>}/>

          <Route path="/blog/:name" element={<Blog/>}/>

          <Route path="/category/:category" element={<Category/>}/>

          {
            user && 
            <>
              <Route path="/newBlog" element={<AddBlog/>}/> 
              <Route path="/edit/:name" element={<AddBlog/>}/>
            </>
          }
          <Route path="/admin"   element={((!user)? <Login/> : <Navigate to="/" />)}/>

          <Route path="*" element={<NotFound/>}/>

        </Routes>
      
        <Footer/>
        
        <ScrollUp/>
      </section>
    </> 
  );
}

export default App;
