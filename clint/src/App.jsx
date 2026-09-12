import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

import './App.css';
import './media.css';

import 'react-toastify/dist/ReactToastify.css';


import { Route, Routes } from 'react-router-dom';

import Applist from '../component/Applist/Applist';
import Login from '../component/Login/Login';
import Hero from '../component/Hero/Hero';
import Error from '../component/Error/Error';
import Signup from '../component/Signup/Signup';
import Projectupload from '../component/Projectupload/Projectupload';
import Contact from '../component/Contact/Contact';
import Logout from '../component/Logout/Logout';
import Allproject from '../component/Allproject/Allproject';
import Footer from '../component/Footer/Footer';
import Profile from '../component/Profile/Profile';
import Users from '../component/Users/Users';
import Scrolltotop from '../component/Scrolltotop/Scrolltotop';
import User from '../component/User/User';
import Follow_user_list from '../component/Follow_user_list/Follow_user_list';
import User_2 from '../component/User_2/User_2';
import EditProfile from '../component/EditProfile/EditProfile';
import Search from '../component/Search/Search';
import ResumePreview from '../component/Resume/ResumePreview';

import AOS from 'aos';
import 'aos/dist/aos.css';


function App() {
  const location = useLocation();

  useEffect(() => {
    // Disable AOS on resume pages to prevent content from disappearing
    if (location.pathname.startsWith('/resume')) {
      AOS.refresh();
      // Disable all AOS elements
      const aosElements = document.querySelectorAll('[data-aos]');
      aosElements.forEach(el => {
        el.removeAttribute('data-aos');
        el.removeAttribute('data-aos-delay');
        el.removeAttribute('data-aos-duration');
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    } else {
      // Initialize AOS for other pages
      AOS.init({
        duration: 1000,
        once: true
      });
    }
  }, [location.pathname]);

  return (
    <>
      {/* <Background /> */}
      <Applist />
      <Scrolltotop />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/p" element={<Profile />} />
        <Route path="/user/:user_id" element={<User />} />
        <Route path="/user_2/:user_id" element={<User_2 />} />
        {/* <Route  path="/user" element={<User/>} /> */}
        {/* <Route  path="/project" element={<Project />} /> */}
        <Route path="/pu" element={<Projectupload />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/allproject" element={<Allproject />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/users" element={<Users />} />
        <Route path="/followers_users" element={<Follow_user_list />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/resume/:templateId" element={<ResumePreview />} />
        <Route path="/resume" element={<ResumePreview />} />
        {/* <Route path="/team" element={<Team />} /> */}
        <Route path="/Search" element={<Search />} />
        {/* <Route  path="/contact/Name" element={<name />} /> */}
        <Route path="/*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  )
}
export default App