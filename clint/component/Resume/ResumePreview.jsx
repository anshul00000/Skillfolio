import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import './ResumePreview.css';

const ResumePreview = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const resumeRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Get user and project data from navigation state (passed from Profile page)
  const passedUser = location.state?.user;
  const passedProjects = location.state?.projects;



  // If no templateId provided, default to 'modern'
  const activeTemplateId = templateId || 'modern';

  // If no data passed, redirect back to profile
  useEffect(() => {
    if (!passedUser) {
      navigate('/p');
    }
  }, [passedUser, navigate]);

  // Demo data fallback if user data is incomplete
  const demoUser = {
    username: passedUser?.username || 'John Developer',
    bio: passedUser?.bio || 'Full Stack Developer & Designer',
    about: passedUser?.bio, // Use bio as about, no fallback
    email: passedUser?.email || 'john.developer@email.com',
    phone: passedUser?.phone || '+1 (555) 123-4567',
    github: passedUser?.github || 'https://github.com/johndeveloper',
    linkedin: passedUser?.linkedin || 'https://linkedin.com/in/johndeveloper',
    skills: passedUser?.skills || [
      'React.js', 'Node.js', 'JavaScript', 'TypeScript', 
      'MongoDB', 'Express.js', 'HTML/CSS', 'Git',
      'REST APIs', 'Docker', 'AWS', 'Agile'
    ],
    education: passedUser?.education,
    experience: passedUser?.experience,
    certifications: passedUser?.certifications
  };

  const demoProjects = passedProjects || [
    {
      projectname: 'E-Commerce Platform',
      projectDescription: 'Built a full-stack e-commerce platform with user authentication, payment integration, and admin dashboard. Implemented real-time inventory management.',
      technologies: 'React, Node.js, MongoDB, Stripe API, Socket.io',
      githublink: 'https://github.com/example/ecommerce'
    },
    {
      projectname: 'Task Management Application',
      projectDescription: 'Developed a collaborative task management tool with drag-and-drop functionality, team collaboration features, and real-time updates.',
      technologies: 'React, Firebase, Material-UI, React DnD',
      githublink: 'https://github.com/example/taskapp'
    },
    {
      projectname: 'Weather Forecast Dashboard',
      projectDescription: 'Created an interactive weather dashboard displaying real-time weather data, forecasts, and historical trends with beautiful visualizations.',
      technologies: 'React, OpenWeather API, Chart.js, Tailwind CSS',
      githublink: 'https://github.com/example/weather'
    }
  ];



  useEffect(() => {
    // Hide footer on resume page
    const footers = document.querySelectorAll('footer');
    footers.forEach(footer => {
      footer.style.display = 'none';
    });
  }, [activeTemplateId]);

const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;

    setIsDownloading(true);

    try {
      // Get the resume element
      const element = resumeRef.current;
      
      // Calculate the full height of the content
      const elementHeight = element.scrollHeight;
      const elementWidth = element.scrollWidth;

      // Capture the resume element as canvas with full height
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: elementWidth,
        height: elementHeight,
        windowHeight: elementHeight,
        scrollY: -window.scrollY,
        scrollX: -window.scrollX
      });

      // A4 dimensions in mm
      const imgWidth = 210;
      const pageHeight = 297;
      
      // Calculate image dimensions
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      
      let heightLeft = imgHeight;
      let position = 0;
      
      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      // Add additional pages if content is longer than one page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // Download with user's name
      const fileName = `${demoUser.username.replace(/\s+/g, '_')}_Resume.pdf`;
      pdf.save(fileName);
    } catch (error) {
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const renderTemplate = () => {
    const templateProps = {
      user: demoUser,
      projects: demoProjects
    };

    try {
      switch (activeTemplateId) {
        case 'modern':
          return <ModernTemplate {...templateProps} />;
        case 'classic':
          return <ClassicTemplate {...templateProps} />;
        case 'creative':
          return <CreativeTemplate {...templateProps} />;
        case 'minimal':
          return <MinimalTemplate {...templateProps} />;
        default:
          return <ModernTemplate {...templateProps} />;
      }
    } catch (error) {
      return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h2>Error loading template</h2>
          <p>{error.message}</p>
        </div>
      );
    }
  };

  // Show loading or error state
  if (!passedUser && !demoUser) {
    return (
      <div className="resume-loading">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <h2>Loading your profile...</h2>
      </div>
    );
  }

  return (
    <div className="resume-preview-container" id="resume-page">
      <div className="resume-preview-actions">
        <button className="btn-back" onClick={() => navigate('/p')}>
          <i className="fa-solid fa-arrow-left"></i> Back to Profile
        </button>
        <button 
          className="btn-download" 
          onClick={handleDownloadPDF}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <>
              <i className="fa-solid fa-spinner fa-spin"></i> Generating...
            </>
          ) : (
            <>
              <i className="fa-solid fa-download"></i> Download PDF
            </>
          )}
        </button>
      </div>

      <div className="resume-preview-wrapper">
        <div ref={resumeRef} className="resume-page">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
