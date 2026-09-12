import React from 'react';
import './ClassicTemplate.css';

const ClassicTemplate = ({ user, projects }) => {
  return (
    <div className="classic-template">
      {/* Header Section */}
      <div className="classic-header">
        <h1 className="classic-name">{user.username || 'Your Name'}</h1>
        <div className="classic-divider"></div>
        
        <div className="classic-contact">
          {user.email && <span><i className="fa-solid fa-envelope"></i> {user.email}</span>}
          {user.phone && <span><i className="fa-solid fa-phone"></i> {user.phone}</span>}
          {user.github && <span><i className="fa-brands fa-github"></i> {user.github.replace('https://', '')}</span>}
          {user.linkedin && <span><i className="fa-brands fa-linkedin"></i> {user.linkedin.replace('https://', '')}</span>}
        </div>
      </div>

      {/* Main Content */}
      <div className="classic-content">
        {/* Professional Summary */}
        {user.about && (
          <section className="classic-section">
            <h2 className="classic-section-title">Professional Summary</h2>
            <p className="classic-text">{user.about}</p>
          </section>
        )}

        {/* Skills Section */}
        {user.skills && user.skills.length > 0 && (
          <section className="classic-section">
            <h2 className="classic-section-title">Core Competencies</h2>
            <div className="classic-skills">
              {user.skills.map((skill, index) => (
                <React.Fragment key={index}>
                  <span className="classic-skill">{skill}</span>
                  {index < user.skills.length - 1 && <span className="skill-separator">•</span>}
                </React.Fragment>
              ))}
            </div>
          </section>
        )}

        {/* Professional Experience / Projects */}
        {projects && projects.length > 0 && (
          <section className="classic-section">
            <h2 className="classic-section-title">Professional Experience & Projects</h2>
            <div className="classic-projects">
              {projects.slice(0, 5).map((project, index) => (
                <div key={index} className="classic-project">
                  <div className="project-header">
                    <h3 className="classic-project-title">
                      {project.projectname || project.name}
                    </h3>
                  </div>
                  <p className="classic-project-desc">
                    {project.projectDescription || project.description}
                  </p>
                  {(project.technologies || project.technologys) && (
                    <p className="classic-tech">
                      <strong>Technologies:</strong> {project.technologies || project.technologys}
                    </p>
                  )}
                  {(project.githublink || project.github_link) && (
                    <p className="classic-tech">
                      <strong>GitHub:</strong> <a href={project.githublink || project.github_link} style={{color: '#1e293b'}}>{project.githublink || project.github_link}</a>
                    </p>
                  )}
                  {project.online_link && (
                    <p className="classic-tech">
                      <strong>Live Demo:</strong> <a href={project.online_link} style={{color: '#1e293b'}}>{project.online_link}</a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {user.education && (
          <section className="classic-section">
            <h2 className="classic-section-title">Education</h2>
            {typeof user.education === 'string' ? (
              <p className="classic-text">{user.education}</p>
            ) : Array.isArray(user.education) ? (
              user.education.map((edu, index) => (
                <div key={index} className="classic-text" style={{ marginBottom: '16px' }}>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>{edu.degree || edu.institution}</div>
                  {edu.institution && edu.degree && <div>{edu.institution}</div>}
                  {(edu.startYear || edu.endYear) && (
                    <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                      {edu.startYear} {edu.endYear && `- ${edu.endYear}`}
                    </div>
                  )}
                  {edu.fieldOfStudy && <div style={{ fontSize: '13px', marginTop: '4px' }}>{edu.fieldOfStudy}</div>}
                </div>
              ))
            ) : (
              <div className="classic-text">
                <div style={{ fontWeight: '600' }}>{user.education.degree || user.education.institution}</div>
                {user.education.institution && user.education.degree && <div>{user.education.institution}</div>}
              </div>
            )}
          </section>
        )}

        {/* Additional Experience */}
        {user.experience && user.experience.length > 0 && (
          <section className="classic-section">
            <h2 className="classic-section-title">Additional Experience</h2>
            {typeof user.experience === 'string' ? (
              <p className="classic-text">{user.experience}</p>
            ) : Array.isArray(user.experience) ? (
              user.experience.map((exp, index) => (
                <div key={index} className="classic-text" style={{ marginBottom: '16px' }}>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>{exp.position || exp.title}</div>
                  {exp.company && <div>{exp.company}</div>}
                  {(exp.startDate || exp.endDate) && (
                    <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                      {exp.startDate} {exp.endDate && `- ${exp.endDate}`}
                    </div>
                  )}
                  {exp.description && <div style={{ marginTop: '8px' }}>{exp.description}</div>}
                </div>
              ))
            ) : (
              <div className="classic-text">
                <div style={{ fontWeight: '600' }}>{user.experience.position || user.experience.title}</div>
                {user.experience.company && <div>{user.experience.company}</div>}
              </div>
            )}
          </section>
        )}

        {/* Certifications Section */}
        {user.certifications && (
          <section className="classic-section">
            <h2 className="classic-section-title">Certifications</h2>
            {typeof user.certifications === 'string' ? (
              <p className="classic-text">{user.certifications}</p>
            ) : Array.isArray(user.certifications) ? (
              user.certifications.map((cert, index) => (
                <div key={index} className="classic-text" style={{ marginBottom: '16px' }}>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                    {cert.name || cert.title || cert.certification}
                  </div>
                  {cert.issuer && <div style={{ fontSize: '13px', color: '#64748b' }}>{cert.issuer}</div>}
                  {cert.date && <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>{cert.date}</div>}
                  {cert.description && <div style={{ fontSize: '13px', marginTop: '8px' }}>{cert.description}</div>}
                </div>
              ))
            ) : (
              <div className="classic-text">
                <div style={{ fontWeight: '600' }}>
                  {user.certifications.name || user.certifications.title || user.certifications.certification}
                </div>
                {user.certifications.issuer && <div style={{ fontSize: '13px', color: '#64748b' }}>{user.certifications.issuer}</div>}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default ClassicTemplate;
