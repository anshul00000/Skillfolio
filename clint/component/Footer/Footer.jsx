function Footer() {
    // const teamMembers = [
    //     { name: "Member 1", role: "Developer" },
    //     { name: "Member 2", role: "Developer" },
    //     { name: "Member 3", role: "Developer" },
    //     { name: "Member 4", role: "Developer" },
    //     { name: "Member 5", role: "Developer" },
    //     { name: "Member 6", role: "Developer" }
    // ];

    return (
        <>
            <div className='footer_div'>
                {/* Thank You Card */}
                {/* <div className="card">
                    <h2 className='font'>Thank YOU</h2>
                    <button>^_^</button>
                </div> */}

                {/* Main Footer */}
                <footer id="footer">
                    <div className="footer-container">
                        
                        {/* Brand Section */}
                        <div className="footer-section brand-section">
                            <h2 className='font footer-logo'>skillfolio</h2>
                            <p className="footer-tagline">
                                Empowering developers to showcase their skills
                            </p>
                        </div>

                        {/* Team Section */}
                        {/* <div className="footer-section team-section">
                            <h3 className="section-title">Our Team</h3>
                            <div className="team-badge">
                                <span className="team-icon">👥</span>
                                <div className="team-info">
                                    <p className="team-count">6 Developers</p>
                                    <p className="team-subtitle">Building with passion</p>
                                </div>
                            </div>
                            <p className="team-message">
                                Crafted with <span style={{color: "#BA6573", fontSize: "1.2em"}}>❤</span> by our amazing team
                            </p>
                        </div> */}

                        {/* Quick Links */}
                        <div className="footer-section links-section">
                            <h3 className="section-title">Quick Links</h3>
                            <ul className="footer-links">
                                {/* <li><a href="/Team">About Us</a></li> */}
                                <li><a href="/allproject">Projects</a></li>
                                <li><a href="/contact">Contact</a></li>
                                {/* <li><a href="/Team">Meet the Team</a></li> */}
                            </ul>
                        </div>

                        {/* Connect Section */}
                        <div className="footer-section connect-section">
                            <h3 className="section-title">Connect With Us</h3>
                            <div className="social-links">
                                <a href="https://anshul00.netlify.app/" target="_blank" rel="noopener noreferrer" className="social-link" title="Website">
                                    <img src="https://cdn-icons-png.flaticon.com/512/1096/1096121.png" alt="Website" />
                                </a>
                                <a href="https://www.linkedin.com/in/anshul-chaurasiya-82243a25b/" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" />
                                </a>
                                <a href="https://github.com/anshul00000" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
                                    <img src="https://cdn.iconscout.com/icon/free/png-256/free-github-logo-icon-download-in-svg-png-gif-file-formats--70-flat-social-icons-color-pack-logos-432516.png?f=webp&w=256" alt="GitHub" />
                                </a>
                                <a href="https://www.instagram.com/anshul._00/" target="_blank" rel="noopener noreferrer" className="social-link" title="Instagram">
                                    <img src="https://cdn2.iconfinder.com/data/icons/2018-social-media-app-logos/1000/2018_social_media_popular_app_logo_instagram-512.png" alt="Instagram" />
                                </a>
                            </div>
                        </div>

                    </div>

                    {/* Footer Bottom */}
                    <div className="footer-bottom">
                        <div className="footer-divider"></div>
                        <p className="copyright">
                            © 2024 Skillfolio. All Rights Reserved. Built with dedication by 6 passionate developers.
                        </p>
                    </div>

                    <div className="backdrop"></div>
                </footer>
            </div>

            <style>{`
                .footer-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 2rem;
                    // padding: 3rem 2rem;
                    // max-width: 1400px;
                    width : 100% ;
                    margin: 0 auto;
                }

                .footer-section {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .brand-section {
                    grid-column: span 1;
                }

                .footer-logo {
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .footer-tagline {
                    color: #00ff95ff;
                    font-size: 0.95rem;
                    line-height: 1.6;
                }

                .section-title {
                    font-size: 1.1rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                    color: #fff;
                }

                .team-badge {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 12px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    transition: all 0.3s ease;
                }

                .team-badge:hover {
                    background: rgba(255, 255, 255, 0.08);
                    transform: translateY(-2px);
                }

                .team-icon {
                    font-size: 2rem;
                }

                .team-info {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }

                .team-count {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #fff;
                    margin: 0;
                }

                .team-subtitle {
                    font-size: 0.85rem;
                    color: #999;
                    margin: 0;
                }

                .team-message {
                    color: #ccc;
                    font-size: 0.95rem;
                    margin-top: 0.5rem;
                }

                .footer-links {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .footer-links li a {
                    color: #999;
                    text-decoration: none;
                    font-size: 0.95rem;
                    transition: all 0.3s ease;
                    display: inline-block;
                }

                .footer-links li a:hover {
                    color: #BA6573;
                    transform: translateX(5px);
                }

                .social-links {
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                }

                .social-link {
                    width: 45px;
                    height: 45px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 12px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    transition: all 0.3s ease;
                    padding: 8px;
                }

                .social-link:hover {
                    background: rgba(186, 101, 115, 0.2);
                    border-color: #BA6573;
                    transform: translateY(-3px);
                }

                .social-link img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }

                .footer-bottom {
                    padding: 2rem;
                    text-align: center;
                }

                .footer-divider {
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
                    margin-bottom: 1.5rem;
                }

                .copyright {
                    color: #818181;
                    font-size: 0.9rem;
                    margin: 0;
                }

                @media (max-width: 768px) {
                    .footer-container {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                        padding: 2rem 1.5rem;
                    }

                    .brand-section {
                        text-align: center;
                    }

                    .social-links {
                        justify-content: center;
                    }

                    .team-badge {
                        justify-content: center;
                    }
                }
            `}</style>
        </>
    )
}

export default Footer
