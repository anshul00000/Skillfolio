import React from 'react';
import './CreativeTemplate.css';

const CreativeTemplate = ({ user, projects }) => {
  return (
    <div className="creative-template">
      {/* Sidebar */}
      <div className="creative-sidebar">
        <div className="sidebar-header">
          <div className="avatar-placeholder">
            {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
          </div>
          <h1 className="sidebar-name">{user.username || 'Your Name'}</h1>
        </div>

        {/* Contact Info */}
        <div className="sidebar-section">
          <h3 className="sidebar-title">Contact</h3>
          <div className="contact-list">
            {user.email && (
              <div className="contact-info">
                <i className="fa-solid fa-envelope"></i>
                <span>{user.email}</span>
              </div>
            )}
            {user.phone && (
              <div className="contact-info">
                <i className="fa-solid fa-phone"></i>
                <span>{user.phone}</span>
              </div>
            )}
            {user.github && (
              <div className="contact-info">
                <i className="fa-brands fa-github"></i>
                <span>{user.github.replace('https://github.com/', '')}</span>
              </div>
            )}
            {user.linkedin && (
              <div className="contact-info">
                <i className="fa-brands fa-linkedin"></i>
                <span>{user.linkedin.replace('https://linkedin.com/in/', '')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {user.skills && user.skills.length > 0 && (
          <div className="sidebar-section">
            <h3 className="sidebar-title">Skills</h3>
            <div className="sidebar-skills">
              {user.skills.map((skill, index) => (
                <div key={index} className="sidebar-skill">{skill}</div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="creative-main">
        {/* About Section */}
        {user.about && (
          <section className="creative-section">
            <h2 className="creative-title">
              <span className="title-icon">👋</span>
              About Me
            </h2>
            <p className="creative-text">{user.about}</p>
          </section>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <section className="creative-section">
            <h2 className="creative-title">
              <span className="title-icon">🚀</span>
              Featured Projects
            </h2>
            <div className="creative-projects">
              {projects.slice(0, 5).map((project, index) => (
                <div key={index} className="creative-project">
                  <div className="project-number">{String(index + 1).padStart(2, '0')}</div>
                  <div className="project-content">
                    <h3 className="creative-project-title">
                      {project.projectname || project.name}
                    </h3>
                    <p className="creative-project-desc">
                      {project.projectDescription || project.description}
                    </p>
                    {(project.technologies || project.technologys) && (
                      <div className="creative-tags">
                        {(project.technologies || project.technologys).split(',').map((tech, idx) => (
                          <span key={idx} className="creative-tag">{tech.trim()}</span>
                        ))}
                      </div>
                    )}
                    <div style={{ marginTop: '8px', fontSize: '13px' }}>
                      {(project.githublink || project.github_link) && (
                        <a href={project.githublink || project.github_link} style={{ color: '#7c3aed', marginRight: '12px' }}>
                          <i className="fa-brands fa-github"></i> GitHub
                        </a>
                      )}
                      {project.online_link && (
                        <a href={project.online_link} style={{ color: '#7c3aed' }}>
                          <i className="fa-solid fa-link"></i> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {user.education && (
          <section className="creative-section">
            <h2 className="creative-title">
              <span className="title-icon">🎓</span>
              Education
            </h2>
            {typeof user.education === 'string' ? (
              <p className="creative-text">{user.education}</p>
            ) : Array.isArray(user.education) ? (
              user.education.map((edu, index) => (
                <div key={index} className="creative-text" style={{ marginBottom: '12px' }}>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>{edu.degree || edu.institution}</div>
                  {edu.institution && edu.degree && <div>{edu.institution}</div>}
                  {(edu.startYear || edu.endYear) && (
                    <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
                      {edu.startYear} {edu.endYear && `- ${edu.endYear}`}
                    </div>
                  )}
                  {edu.fieldOfStudy && <div style={{ fontSize: '13px', marginTop: '4px' }}>{edu.fieldOfStudy}</div>}
                </div>
              ))
            ) : (
              <div className="creative-text">
                <div style={{ fontWeight: '600' }}>{user.education.degree || user.education.institution}</div>
                {user.education.institution && user.education.degree && <div>{user.education.institution}</div>}
              </div>
            )}
          </section>
        )}

        {/* Experience Section */}
        {user.experience && user.experience.length > 0 && (
          <section className="creative-section">
            <h2 className="creative-title">
              <span className="title-icon">💼</span>
              Experience
            </h2>
            {typeof user.experience === 'string' ? (
              <p className="creative-text">{user.experience}</p>
            ) : Array.isArray(user.experience) ? (
              user.experience.map((exp, index) => (
                <div key={index} className="creative-text" style={{ marginBottom: '12px' }}>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>{exp.position || exp.title}</div>
                  {exp.company && <div>{exp.company}</div>}
                  {(exp.startDate || exp.endDate) && (
                    <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
                      {exp.startDate} {exp.endDate && `- ${exp.endDate}`}
                    </div>
                  )}
                  {exp.description && <div style={{ marginTop: '8px' }}>{exp.description}</div>}
                </div>
              ))
            ) : (
              <div className="creative-text">
                <div style={{ fontWeight: '600' }}>{user.experience.position || user.experience.title}</div>
                {user.experience.company && <div>{user.experience.company}</div>}
              </div>
            )}
          </section>
        )}

        {/* Certifications Section */}
        {user.certifications && (
          <section className="creative-section">
            <h2 className="creative-title">
              <span className="title-icon">🏆</span>
              Certifications
            </h2>
            {typeof user.certifications === 'string' ? (
              <p className="creative-text">{user.certifications}</p>
            ) : Array.isArray(user.certifications) ? (
              user.certifications.map((cert, index) => (
                <div key={index} className="creative-text" style={{ marginBottom: '12px' }}>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                    {cert.name || cert.title || cert.certification}
                  </div>
                  {cert.issuer && <div style={{ fontSize: '13px', color: '#6b7280' }}>{cert.issuer}</div>}
                  {cert.date && <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>{cert.date}</div>}
                  {cert.description && <div style={{ fontSize: '13px', marginTop: '8px' }}>{cert.description}</div>}
                </div>
              ))
            ) : (
              <div className="creative-text">
                <div style={{ fontWeight: '600' }}>
                  {user.certifications.name || user.certifications.title || user.certifications.certification}
                </div>
                {user.certifications.issuer && <div style={{ fontSize: '13px', color: '#6b7280' }}>{user.certifications.issuer}</div>}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default CreativeTemplate;
