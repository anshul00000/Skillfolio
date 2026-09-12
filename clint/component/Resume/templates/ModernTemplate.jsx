import React from 'react';
import './ModernTemplate.css';

const ModernTemplate = ({ user, projects }) => {
  // Inline styles to force visibility
  const forceVisibleStyle = {
    opacity: 1,
    visibility: 'visible',
    transform: 'none',
    transition: 'none',
    animation: 'none'
  };

  return (
    <div className="modern-template" style={forceVisibleStyle}>
      {/* Header Section */}
      <div className="modern-header" style={forceVisibleStyle}>
        <div className="modern-header-content" style={forceVisibleStyle}>
          <h1 className="modern-name" style={forceVisibleStyle}>{user.username || 'Your Name'}</h1>
        </div>
        <div className="modern-contact" style={forceVisibleStyle}>
          {user.email && (
            <div className="contact-item" style={forceVisibleStyle}>
              <i className="fa-solid fa-envelope"></i>
              <span>{user.email}</span>
            </div>
          )}
          {user.phone && (
            <div className="contact-item" style={forceVisibleStyle}>
              <i className="fa-solid fa-phone"></i>
              <span>{user.phone}</span>
            </div>
          )}
          {user.github && (
            <div className="contact-item" style={forceVisibleStyle}>
              <i className="fa-brands fa-github"></i>
              <span>{user.github.replace('https://', '')}</span>
            </div>
          )}
          {user.linkedin && (
            <div className="contact-item" style={forceVisibleStyle}>
              <i className="fa-brands fa-linkedin"></i>
              <span>{user.linkedin.replace('https://', '')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="modern-content" style={forceVisibleStyle}>
        {/* About Section */}
        {user.about && (
          <section className="modern-section" style={forceVisibleStyle}>
            <h2 className="section-title" style={forceVisibleStyle}>About Me</h2>
            <p className="section-text" style={forceVisibleStyle}>{user.about}</p>
          </section>
        )}

        {/* Skills Section */}
        {user.skills && user.skills.length > 0 && (
          <section className="modern-section" style={forceVisibleStyle}>
            <h2 className="section-title" style={forceVisibleStyle}>Skills</h2>
            <div className="skills-grid" style={forceVisibleStyle}>
              {user.skills.map((skill, index) => (
                <div key={index} className="skill-tag" style={forceVisibleStyle}>
                  {typeof skill === 'string' ? skill : skill.name || skill.skill}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <section className="modern-section" style={forceVisibleStyle}>
            <h2 className="section-title" style={forceVisibleStyle}>Projects</h2>
            <div className="projects-list" style={forceVisibleStyle}>
              {projects.slice(0, 5).map((project, index) => (
                <div key={index} className="project-item" style={forceVisibleStyle}>
                  <h3 className="project-title" style={forceVisibleStyle}>
                    {project.projectname || project.name}
                  </h3>
                  <p className="project-description" style={forceVisibleStyle}>
                    {project.projectDescription || project.description}
                  </p>
                  {(project.technologies || project.technologys) && (
                    <div className="project-tech" style={forceVisibleStyle}>
                      {(project.technologies || project.technologys).split(',').map((tech, idx) => (
                        <span key={idx} className="tech-badge" style={forceVisibleStyle}>{tech.trim()}</span>
                      ))}
                    </div>
                  )}
                  {(project.githublink || project.github_link) && (
                    <a href={project.githublink || project.github_link} className="project-link" style={forceVisibleStyle}>
                      <i className="fa-brands fa-github"></i> View Project
                    </a>
                  )}
                  {(project.online_link) && (
                    <a href={project.online_link} className="project-link" style={{...forceVisibleStyle, marginLeft: '12px'}}>
                      <i className="fa-solid fa-link"></i> Live Demo
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section - Only show if data exists */}
        {user.education && (
          typeof user.education === 'string' ? (
            user.education.trim() !== '' && (
              <section className="modern-section">
                <h2 className="section-title">Education</h2>
                <p className="section-text">{user.education}</p>
              </section>
            )
          ) : Array.isArray(user.education) ? (
            user.education.length > 0 && (
              <section className="modern-section">
                <h2 className="section-title">Education</h2>
                {user.education.map((edu, index) => (
                  <div key={index} className="section-text" style={{ marginBottom: '16px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>{edu.degree || edu.institution}</div>
                    {edu.institution && edu.degree && <div>{edu.institution}</div>}
                    {(edu.startYear || edu.endYear) && (
                      <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
                        {edu.startYear} {edu.endYear && `- ${edu.endYear}`}
                      </div>
                    )}
                    {edu.fieldOfStudy && <div style={{ fontSize: '14px', marginTop: '4px' }}>{edu.fieldOfStudy}</div>}
                    {edu.description && <div style={{ fontSize: '14px', marginTop: '8px', color: '#4b5563' }}>{edu.description}</div>}
                  </div>
                ))}
              </section>
            )
          ) : (
            (user.education.degree || user.education.institution) && (
              <section className="modern-section">
                <h2 className="section-title">Education</h2>
                <div className="section-text">
                  <div style={{ fontWeight: '600' }}>{user.education.degree || user.education.institution}</div>
                  {user.education.institution && user.education.degree && <div>{user.education.institution}</div>}
                  {(user.education.startYear || user.education.endYear) && (
                    <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
                      {user.education.startYear} {user.education.endYear && `- ${user.education.endYear}`}
                    </div>
                  )}
                  {user.education.fieldOfStudy && <div style={{ fontSize: '14px', marginTop: '4px' }}>{user.education.fieldOfStudy}</div>}
                  {user.education.description && <div style={{ fontSize: '14px', marginTop: '8px', color: '#4b5563' }}>{user.education.description}</div>}
                </div>
              </section>
            )
          )
        )}

        {/* Experience Section - Only show if data exists */}
        {user.experience && (
          typeof user.experience === 'string' ? (
            user.experience.trim() !== '' && (
              <section className="modern-section" style={forceVisibleStyle}>
                <h2 className="section-title" style={forceVisibleStyle}>Experience</h2>
                <p className="section-text" style={forceVisibleStyle}>{user.experience}</p>
              </section>
            )
          ) : Array.isArray(user.experience) ? (
            user.experience.length > 0 && (
              <section className="modern-section" style={forceVisibleStyle}>
                <h2 className="section-title" style={forceVisibleStyle}>Experience</h2>
                {user.experience.map((exp, index) => (
                  <div key={index} className="section-text" style={{...forceVisibleStyle, marginBottom: '16px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>{exp.position || exp.title || exp.company}</div>
                    {exp.company && (exp.position || exp.title) && <div>{exp.company}</div>}
                    {(exp.startDate || exp.endDate) && (
                      <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
                        {exp.startDate} {exp.endDate && `- ${exp.endDate}`}
                      </div>
                    )}
                    {exp.description && <div style={{ marginTop: '8px' }}>{exp.description}</div>}
                  </div>
                ))}
              </section>
            )
          ) : (
            (user.experience.position || user.experience.title || user.experience.company) && (
              <section className="modern-section" style={forceVisibleStyle}>
                <h2 className="section-title" style={forceVisibleStyle}>Experience</h2>
                <div className="section-text" style={forceVisibleStyle}>
                  <div style={{ fontWeight: '600' }}>{user.experience.position || user.experience.title || user.experience.company}</div>
                  {user.experience.company && (user.experience.position || user.experience.title) && <div>{user.experience.company}</div>}
                  {(user.experience.startDate || user.experience.endDate) && (
                    <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
                      {user.experience.startDate} {user.experience.endDate && `- ${user.experience.endDate}`}
                    </div>
                  )}
                  {user.experience.description && <div style={{ marginTop: '8px' }}>{user.experience.description}</div>}
                </div>
              </section>
            )
          )
        )}

        {/* Certifications Section - Only show if data exists */}
        {user.certifications && (
          typeof user.certifications === 'string' ? (
            user.certifications.trim() !== '' && (
              <section className="modern-section" style={forceVisibleStyle}>
                <h2 className="section-title" style={forceVisibleStyle}>Certifications</h2>
                <p className="section-text" style={forceVisibleStyle}>{user.certifications}</p>
              </section>
            )
          ) : Array.isArray(user.certifications) ? (
            user.certifications.length > 0 && (
              <section className="modern-section" style={forceVisibleStyle}>
                <h2 className="section-title" style={forceVisibleStyle}>Certifications</h2>
                {user.certifications.map((cert, index) => (
                  <div key={index} className="section-text" style={{...forceVisibleStyle, marginBottom: '16px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>{cert.name || cert.title || cert.certification}</div>
                    {cert.issuer && <div style={{ fontSize: '14px', color: '#6b7280' }}>{cert.issuer}</div>}
                    {cert.date && <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>{cert.date}</div>}
                    {cert.description && <div style={{ fontSize: '14px', marginTop: '8px', color: '#4b5563' }}>{cert.description}</div>}
                  </div>
                ))}
              </section>
            )
          ) : (
            (user.certifications.name || user.certifications.title || user.certifications.certification) && (
              <section className="modern-section" style={forceVisibleStyle}>
                <h2 className="section-title" style={forceVisibleStyle}>Certifications</h2>
                <div className="section-text" style={forceVisibleStyle}>
                  <div style={{ fontWeight: '600' }}>{user.certifications.name || user.certifications.title || user.certifications.certification}</div>
                  {user.certifications.issuer && <div style={{ fontSize: '14px', color: '#6b7280' }}>{user.certifications.issuer}</div>}
                  {user.certifications.date && <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>{user.certifications.date}</div>}
                  {user.certifications.description && <div style={{ fontSize: '14px', marginTop: '8px', color: '#4b5563' }}>{user.certifications.description}</div>}
                </div>
              </section>
            )
          )
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;
