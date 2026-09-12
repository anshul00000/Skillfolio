import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResumeTemplateModal.css';

const ResumeTemplateModal = ({ isOpen, onClose, userId, userData, projectData }) => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    {
      id: 'modern',
      name: 'Modern Professional',
      description: 'Clean and contemporary design with bold sections',
      thumbnail: '/template-modern.png',
      colors: { primary: '#2563eb', secondary: '#64748b' }
    },
    {
      id: 'classic',
      name: 'Classic Elegance',
      description: 'Traditional layout with professional appeal',
      thumbnail: '/template-classic.png',
      colors: { primary: '#1e293b', secondary: '#475569' }
    },
    {
      id: 'creative',
      name: 'Creative Bold',
      description: 'Stand out with vibrant colors and modern layouts',
      thumbnail: '/template-creative.png',
      colors: { primary: '#7c3aed', secondary: '#a78bfa' }
    },
    {
      id: 'minimal',
      name: 'Minimal Clean',
      description: 'Simple and elegant minimalist design',
      thumbnail: '/template-minimal.png',
      colors: { primary: '#059669', secondary: '#10b981' }
    }
  ];

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handleCreateResume = () => {
    if (selectedTemplate) {
      // Pass user and project data through navigation state
      navigate(`/resume/${selectedTemplate}`, {
        state: {
          user: userData,
          projects: projectData
        }
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="resume-modal-overlay" onClick={onClose}>
      <div className="resume-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="resume-modal-header">
          <h2>Choose Your Resume Template</h2>
          <button className="resume-modal-close" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="resume-templates-grid">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`resume-template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
              onClick={() => handleTemplateSelect(template.id)}
            >
              {/* Actual Template Structure Preview */}
              <div className="template-preview" style={{ 
                background: 'white',
                border: '1px solid #e5e7eb',
                overflow: 'hidden'
              }}>
                {/* Modern Template Preview */}
                {template.id === 'modern' && (
                  <div style={{ fontSize: '8px', fontFamily: 'Inter, sans-serif' }}>
                    <div style={{ 
                      background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)', 
                      color: 'white', 
                      padding: '12px',
                      marginBottom: '8px'
                    }}>
                      <div style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>Your Name</div>
                      <div style={{ fontSize: '7px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <span>📧 email@example.com</span>
                        <span>📱 +1234567890</span>
                      </div>
                    </div>
                    <div style={{ padding: '8px' }}>
                      <div style={{ 
                        background: '#f0f9ff', 
                        color: '#2563eb', 
                        fontWeight: 'bold', 
                        fontSize: '8px', 
                        padding: '4px 6px',
                        marginBottom: '6px',
                        borderBottom: '2px solid #2563eb',
                        borderRadius: '4px 4px 0 0'
                      }}>ABOUT ME</div>
                      <div style={{ fontSize: '6px', color: '#666', marginBottom: '8px', lineHeight: '1.3' }}>
                        Professional developer with expertise in modern technologies...
                      </div>
                      <div style={{ 
                        background: '#f0f9ff', 
                        color: '#2563eb', 
                        fontWeight: 'bold', 
                        fontSize: '8px', 
                        padding: '4px 6px',
                        marginBottom: '6px',
                        borderBottom: '2px solid #2563eb',
                        borderRadius: '4px 4px 0 0'
                      }}>SKILLS</div>
                      <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap', marginBottom: '8px' }}>
                        {['React', 'Node.js', 'CSS', 'MongoDB'].map((skill, i) => (
                          <span key={i} style={{ 
                            background: '#eff6ff', 
                            color: '#2563eb',
                            padding: '2px 5px', 
                            borderRadius: '3px',
                            fontSize: '6px',
                            border: '1px solid #bfdbfe'
                          }}>{skill}</span>
                        ))}
                      </div>
                      <div style={{ 
                        background: '#f0f9ff', 
                        color: '#2563eb', 
                        fontWeight: 'bold', 
                        fontSize: '8px', 
                        padding: '4px 6px',
                        marginBottom: '6px',
                        borderBottom: '2px solid #2563eb',
                        borderRadius: '4px 4px 0 0'
                      }}>PROJECTS</div>
                      <div style={{ borderLeft: '2px solid #2563eb', paddingLeft: '6px', marginBottom: '6px' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '7px', marginBottom: '2px' }}>Project Name</div>
                        <div style={{ fontSize: '6px', color: '#666', lineHeight: '1.2' }}>Project description here...</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Classic Template Preview */}
                {template.id === 'classic' && (
                  <div style={{ fontSize: '8px', fontFamily: 'Georgia, serif', padding: '12px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid #1e293b' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '4px', letterSpacing: '0.5px' }}>YOUR NAME</div>
                      <div style={{ fontSize: '7px', color: '#666', display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <span>email@example.com</span>
                        <span>+1234567890</span>
                      </div>
                    </div>
                    <div>
                      <div style={{ 
                        background: '#f8fafc', 
                        fontWeight: 'bold', 
                        fontSize: '7px', 
                        padding: '3px 5px',
                        marginBottom: '4px',
                        borderLeft: '3px solid #1e293b',
                        letterSpacing: '0.3px'
                      }}>ABOUT</div>
                      <div style={{ fontSize: '6px', color: '#555', marginBottom: '6px', lineHeight: '1.3' }}>
                        Professional summary...
                      </div>
                      <div style={{ 
                        background: '#f8fafc', 
                        fontWeight: 'bold', 
                        fontSize: '7px', 
                        padding: '3px 5px',
                        marginBottom: '4px',
                        borderLeft: '3px solid #1e293b',
                        letterSpacing: '0.3px'
                      }}>SKILLS</div>
                      <div style={{ fontSize: '6px', marginBottom: '6px', color: '#333' }}>
                        React • Node.js • CSS • MongoDB
                      </div>
                      <div style={{ 
                        background: '#f8fafc', 
                        fontWeight: 'bold', 
                        fontSize: '7px', 
                        padding: '3px 5px',
                        marginBottom: '4px',
                        borderLeft: '3px solid #1e293b',
                        letterSpacing: '0.3px'
                      }}>PROJECTS</div>
                      <div style={{ marginBottom: '4px' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '7px', marginBottom: '2px' }}>Project Title</div>
                        <div style={{ fontSize: '6px', color: '#555', lineHeight: '1.2' }}>Project details...</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Creative Template Preview */}
                {template.id === 'creative' && (
                  <div style={{ display: 'flex', fontSize: '8px', fontFamily: 'Inter, sans-serif', height: '100%' }}>
                    <div style={{ 
                      width: '35%', 
                      background: 'linear-gradient(180deg, #7c3aed 0%, #5b21b6 100%)', 
                      color: 'white',
                      padding: '10px 8px'
                    }}>
                      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                        <div style={{ 
                          width: '30px', 
                          height: '30px', 
                          background: 'rgba(255,255,255,0.2)', 
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 4px',
                          fontWeight: 'bold',
                          fontSize: '14px'
                        }}>Y</div>
                        <div style={{ fontWeight: 'bold', fontSize: '8px', marginBottom: '2px' }}>Your Name</div>
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '6px', marginBottom: '3px', opacity: 0.9 }}>CONTACT</div>
                        <div style={{ fontSize: '5px', lineHeight: '1.4' }}>
                          <div>📧 email@</div>
                          <div>📱 +123</div>
                        </div>
                      </div>
                      <div>
                        <div style={{ fontWeight: 'bold', fontSize: '6px', marginBottom: '3px', opacity: 0.9 }}>SKILLS</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          {['React', 'Node.js', 'CSS'].map((skill, i) => (
                            <div key={i} style={{ 
                              background: 'rgba(255,255,255,0.15)', 
                              padding: '2px 4px', 
                              borderRadius: '3px',
                              fontSize: '5px',
                              border: '1px solid rgba(255,255,255,0.2)'
                            }}>{skill}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div style={{ flex: 1, padding: '10px 8px', background: 'white' }}>
                      <div style={{ marginBottom: '8px' }}>
                        <div style={{ 
                          background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
                          color: 'white',
                          fontWeight: 'bold', 
                          fontSize: '8px', 
                          padding: '4px 6px',
                          marginBottom: '4px',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <span>👋</span> ABOUT ME
                        </div>
                        <div style={{ fontSize: '6px', color: '#666', lineHeight: '1.3' }}>
                          Professional bio...
                        </div>
                      </div>
                      <div>
                        <div style={{ 
                          background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
                          color: 'white',
                          fontWeight: 'bold', 
                          fontSize: '8px', 
                          padding: '4px 6px',
                          marginBottom: '4px',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <span>🚀</span> PROJECTS
                        </div>
                        <div style={{ background: '#f9fafb', padding: '6px', borderRadius: '4px', borderLeft: '2px solid #7c3aed' }}>
                          <div style={{ fontWeight: 'bold', fontSize: '7px', marginBottom: '2px' }}>Project Name</div>
                          <div style={{ fontSize: '6px', color: '#666', lineHeight: '1.2' }}>Description...</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Minimal Template Preview */}
                {template.id === 'minimal' && (
                  <div style={{ fontSize: '8px', fontFamily: 'Helvetica, sans-serif', padding: '12px' }}>
                    <div style={{ marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: '300', fontSize: '12px', marginBottom: '4px' }}>Your Name</div>
                      <div style={{ fontSize: '6px', color: '#666', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        <span>email@example.com</span>
                        <span>+1234567890</span>
                      </div>
                    </div>
                    <div>
                      <div style={{ 
                        fontWeight: 'bold', 
                        fontSize: '7px', 
                        padding: '3px 0',
                        paddingLeft: '6px',
                        marginBottom: '4px',
                        borderBottom: '2px solid #059669',
                        background: 'linear-gradient(to right, rgba(5, 150, 105, 0.1) 0%, transparent 100%)',
                        letterSpacing: '0.5px'
                      }}>ABOUT</div>
                      <div style={{ fontSize: '6px', color: '#555', marginBottom: '6px', lineHeight: '1.3' }}>
                        Professional summary here...
                      </div>
                      <div style={{ 
                        fontWeight: 'bold', 
                        fontSize: '7px', 
                        padding: '3px 0',
                        paddingLeft: '6px',
                        marginBottom: '4px',
                        borderBottom: '2px solid #059669',
                        background: 'linear-gradient(to right, rgba(5, 150, 105, 0.1) 0%, transparent 100%)',
                        letterSpacing: '0.5px'
                      }}>SKILLS</div>
                      <div style={{ fontSize: '6px', marginBottom: '6px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {['React', 'Node.js', 'CSS'].map((skill, i) => (
                          <span key={i} style={{ borderBottom: '1px solid #cbd5e0', paddingBottom: '1px' }}>{skill}</span>
                        ))}
                      </div>
                      <div style={{ 
                        fontWeight: 'bold', 
                        fontSize: '7px', 
                        padding: '3px 0',
                        paddingLeft: '6px',
                        marginBottom: '4px',
                        borderBottom: '2px solid #059669',
                        background: 'linear-gradient(to right, rgba(5, 150, 105, 0.1) 0%, transparent 100%)',
                        letterSpacing: '0.5px'
                      }}>PROJECTS</div>
                      <div style={{ paddingBottom: '4px', borderBottom: '1px solid #edf2f7', marginBottom: '4px' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '7px', marginBottom: '2px' }}>Project Name</div>
                        <div style={{ fontSize: '6px', color: '#555', lineHeight: '1.2' }}>Project details...</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="template-info">
                <h3>{template.name}</h3>
                <p>{template.description}</p>
              </div>
              {selectedTemplate === template.id && (
                <div className="template-selected-badge">
                  <i className="fa-solid fa-check"></i>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="resume-modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="btn-primary" 
            onClick={handleCreateResume}
            disabled={!selectedTemplate}
          >
            <i className="fa-solid fa-file-pdf"></i> Create Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplateModal;
