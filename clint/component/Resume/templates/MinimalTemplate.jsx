import React from 'react';
import './MinimalTemplate.css';

const MinimalTemplate = ({ user, projects }) => {
  return (
    <div className="minimal-template">
      {/* Header */}
      <header className="minimal-header">
        <h1 className="minimal-name">{user.username || 'Your Name'}</h1>
        
        <div className="minimal-contact">
          {user.email && <span>{user.email}</span>}
          {user.phone && <span>{user.phone}</span>}
          {user.github && <span>{user.github.replace('https://', '')}</span>}
          {user.linkedin && <span>{user.linkedin.replace('https://', '')}</span>}
        </div>
      </header>

      {/* Main Content */}
      <main className="minimal-content">
        {/* About */}
        {user.about && (
          <section className="minimal-section">
            <h2 className="minimal-heading">About</h2>
            <p className="minimal-paragraph">{user.about}</p>
          </section>
        )}

        {/* Skills */}
        {user.skills && user.skills.length > 0 && (
          <section className="minimal-section">
            <h2 className="minimal-heading">Skills</h2>
            <div className="minimal-skills">
              {user.skills.map((skill, index) => (
                <span key={index} className="minimal-skill">{skill}</span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="minimal-section">
            <h2 className="minimal-heading">Projects</h2>
            <div className="minimal-projects">
              {projects.slice(0, 5).map((project, index) => (
                <div key={index} className="minimal-project">
                  <h3 className="minimal-project-name">
                    {project.projectname || project.name}
                  </h3>
                  <p className="minimal-project-text">
                    {project.projectDescription || project.description}
                  </p>
                  {(project.technologies || project.technologys) && (
                    <p className="minimal-tech-text">
                      {project.technologies || project.technologys}
                    </p>
                  )}
                  <div style={{ marginTop: '6px', fontSize: '13px' }}>
                    {(project.githublink || project.github_link) && (
                      <a href={project.githublink || project.github_link} style={{ color: '#059669', marginRight: '12px' }}>
                        <i className="fa-brands fa-github"></i> GitHub
                      </a>
                    )}
                    {project.online_link && (
                      <a href={project.online_link} style={{ color: '#059669' }}>
                        <i className="fa-solid fa-link"></i> Live
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {user.education && (
          <section className="minimal-section">
            <h2 className="minimal-heading">Education</h2>
            {typeof user.education === 'string' ? (
              <p className="minimal-paragraph">{user.education}</p>
            ) : Array.isArray(user.education) ? (
              user.education.map((edu, index) => (
                <div key={index} className="minimal-paragraph" style={{ marginBottom: '12px' }}>
                  <div style={{ fontWeight: '600' }}>{edu.degree || edu.institution}</div>
                  {edu.institution && edu.degree && <div>{edu.institution}</div>}
                  {(edu.startYear || edu.endYear) && (
                    <div style={{ fontSize: '13px', color: '#718096' }}>
                      {edu.startYear} {edu.endYear && `- ${edu.endYear}`}
                    </div>
                  )}
                  {edu.fieldOfStudy && <div style={{ fontSize: '13px' }}>{edu.fieldOfStudy}</div>}
                </div>
              ))
            ) : (
              <div className="minimal-paragraph">
                <div style={{ fontWeight: '600' }}>{user.education.degree || user.education.institution}</div>
                {user.education.institution && user.education.degree && <div>{user.education.institution}</div>}
                {(user.education.startYear || user.education.endYear) && (
                  <div style={{ fontSize: '13px', color: '#718096' }}>
                    {user.education.startYear} {user.education.endYear && `- ${user.education.endYear}`}
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* Experience */}
        {user.experience && user.experience.length > 0 && (
          <section className="minimal-section">
            <h2 className="minimal-heading">Experience</h2>
            {typeof user.experience === 'string' ? (
              <p className="minimal-paragraph">{user.experience}</p>
            ) : Array.isArray(user.experience) ? (
              user.experience.map((exp, index) => (
                <div key={index} className="minimal-paragraph" style={{ marginBottom: '12px' }}>
                  <div style={{ fontWeight: '600' }}>{exp.position || exp.title}</div>
                  {exp.company && <div>{exp.company}</div>}
                  {(exp.startDate || exp.endDate) && (
                    <div style={{ fontSize: '13px', color: '#718096' }}>
                      {exp.startDate} {exp.endDate && `- ${exp.endDate}`}
                    </div>
                  )}
                  {exp.description && <div style={{ fontSize: '14px', marginTop: '4px' }}>{exp.description}</div>}
                </div>
              ))
            ) : (
              <div className="minimal-paragraph">
                <div style={{ fontWeight: '600' }}>{user.experience.position || user.experience.title}</div>
                {user.experience.company && <div>{user.experience.company}</div>}
              </div>
            )}
          </section>
        )}

        {/* Certifications */}
        {user.certifications && (
          <section className="minimal-section">
            <h2 className="minimal-heading">Certifications</h2>
            {typeof user.certifications === 'string' ? (
              <p className="minimal-paragraph">{user.certifications}</p>
            ) : Array.isArray(user.certifications) ? (
              user.certifications.map((cert, index) => (
                <div key={index} className="minimal-paragraph" style={{ marginBottom: '12px' }}>
                  <div style={{ fontWeight: '600' }}>
                    {cert.name || cert.title || cert.certification}
                  </div>
                  {cert.issuer && <div style={{ fontSize: '13px', color: '#718096' }}>{cert.issuer}</div>}
                  {cert.date && <div style={{ fontSize: '13px', color: '#718096' }}>{cert.date}</div>}
                  {cert.description && <div style={{ fontSize: '14px', marginTop: '4px' }}>{cert.description}</div>}
                </div>
              ))
            ) : (
              <div className="minimal-paragraph">
                <div style={{ fontWeight: '600' }}>
                  {user.certifications.name || user.certifications.title || user.certifications.certification}
                </div>
                {user.certifications.issuer && <div style={{ fontSize: '13px', color: '#718096' }}>{user.certifications.issuer}</div>}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default MinimalTemplate;
