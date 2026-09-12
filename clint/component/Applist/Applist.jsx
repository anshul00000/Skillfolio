import { useContext, useState } from "react";

import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { Context } from "../../src/context/context_api.jsx";

function Applist() {


  const { islogin } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutConfirm(false);
    navigate('/logout');
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false);
  };

  const isProfilePage = location.pathname === '/profile';




  return (
    <>
      <nav>
        <h1 className='font header_name'>SKILLFOLIO</h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {islogin && isProfilePage && (
            <button 
              onClick={handleLogoutClick}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: '2px solid #f5576c',
                background: 'transparent',
                color: '#f5576c',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#f5576c';
                e.target.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#f5576c';
              }}
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              Logout
            </button>
          )}
          
          <label htmlFor="check">
            <i className="fas fa-bars open_navbar"></i>
          </label>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            backdropFilter: 'blur(5px)'
          }}
          onClick={handleLogoutCancel}
        >
          <div 
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '2rem',
              maxWidth: '400px',
              width: '90%',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
              animation: 'slideIn 0.3s ease'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f093fb15 0%, #f5576c15 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                border: '3px solid #f5576c30'
              }}>
                <i className="fa-solid fa-right-from-bracket" style={{ fontSize: '1.5rem', color: '#f5576c' }}></i>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1a1a1a', margin: '0 0 0.5rem 0' }}>
                Confirm Logout
              </h3>
              <p style={{ fontSize: '1rem', color: '#666', margin: 0 }}>
                Are you sure you want to logout?
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={handleLogoutCancel}
                style={{
                  flex: 1,
                  padding: '0.75rem 1.5rem',
                  borderRadius: '10px',
                  border: '2px solid #e5e5e5',
                  background: '#fff',
                  color: '#333',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  fontSize: '1rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.color = '#667eea';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '#e5e5e5';
                  e.target.style.color = '#333';
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                style={{
                  flex: 1,
                  padding: '0.75rem 1.5rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  color: '#fff',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  fontSize: '1rem',
                  boxShadow: '0 4px 15px rgba(245, 87, 108, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(245, 87, 108, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(245, 87, 108, 0.3)';
                }}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>


      <input type="checkbox" id="check" />

      {/* <label for="check" className="closebtn">
        <i className="fas fa-bars" id="btn"></i>
        <i className="fas fa-times" id="cancel"></i>
      </label> */}

      <div className="sidebar d-block">
        <header>SKILLFOLIO</header>
        <div>

          <ul className="navigation__menu">



            <li><NavLink className="text-active-blue " to="/"><i className="fas fa-home text-blue"></i>Home page</NavLink></li>
           
            {/* state={{ fromHome: "'anshul its working'" }} */}
            <li><NavLink  to="/profile"  ><i className="fa-regular fa-id-badge text-pink"></i>Profile</NavLink></li>
            
            <li><NavLink to="/pu"><i className="fas fa-link text-red"></i>Project / upload</NavLink></li>
            
            {/* <li><NavLink to="/project"><i className="fas fa-stream text-green"></i>Project</NavLink></li> */}

            <li><NavLink to="/allproject"><i className="fas fa-stream text-green"></i>All Project</NavLink></li>
            
            {/* <li><NavLink to="/o"><i className="fas fa-calendar-week text-amber"></i>Events</NavLink></li> */}
            
            {/* <li><NavLink to="/p"><i className="far fa-question-circle text-purple"></i>About</NavLink></li> */}
           
            {/* <li><NavLink to="/q"><i className="fas fa-sliders-h text-cyan"></i>Services</NavLink></li> */}
           
            <li><NavLink to="/contact"><i className="far fa-envelope text-pink"></i>Contact</NavLink></li>




           


            {!islogin &&(<>

<li><NavLink to="/login"><i className="fa-solid fa-person-walking-arrow-right text-black"></i>LOGIN</NavLink></li>

<li><NavLink to="/signup"><i className="fa-solid fa-user-plus text-black"></i>SIGNUP</NavLink></li></>)
}




            <li>

              <label htmlFor="check" className="fas fa-times close_navbar"> Close</label>

            </li>


          </ul>
        </div>
      </div>



    </>
  )
}

export default Applist
