import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../src/context/context_api.jsx';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './Projectupload.css';

function Projectupload() {
  const [isSending, setIsSending] = useState(false);
  const [preview, setPreview] = useState(null);

  const { user, backend_url, allproject } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const [file, setFile] = useState({
    name: '',
    description: '',
    technologys: '',
    github_link: '',
    online_link: '',
    file: null,
  });

  const handleFileChange = (e) => {
    const chosenFile = e.target.files?.[0];
    if (!chosenFile) {
      setFile((p) => ({ ...p, file: null }));
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
      return;
    }

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
    ];

    if (!allowedTypes.includes(chosenFile.type)) {
      toast.error('❌ Only image files are allowed.');
      setFile((p) => ({ ...p, file: null }));
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
      return;
    }

    if (preview) URL.revokeObjectURL(preview);

    const objectUrl = URL.createObjectURL(chosenFile);
    setPreview(objectUrl);
    setFile((p) => ({ ...p, file: chosenFile }));
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFile((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      toast.error('Please login first.');
      return;
    }
    if (!backend_url) {
      toast.error('Backend URL missing.');
      return;
    }
    if (!file.name.trim()) {
      toast.error('Please enter project title/name.');
      return;
    }

    setIsSending(true);

    try {
      const data = new FormData();
      data.append('name', file.name);
      data.append('description', file.description);
      data.append('technologys', file.technologys);
      data.append('github_link', file.github_link);
      data.append('online_link', file.online_link);
      if (file.file) data.append('image', file.file);
      data.append('owner', user._id);

      const response = await fetch(`${backend_url}/file`, {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (result && (result.name || result._id)) {
        setFile({
          name: '',
          description: '',
          technologys: '',
          github_link: '',
          online_link: '',
          file: null,
        });
        if (preview) URL.revokeObjectURL(preview);
        setPreview(null);
        toast.success('File uploaded successfully');
      } else {
        toast.error(result.message || 'Upload failed.');
      }
    } catch (err) {
      toast.error('Error while uploading.');
    } finally {
      setIsSending(false);
    }
  };

  if (allproject?.length > 0 && !user) {
    return <h1 style={{ textAlign: 'center' }}>Please log in to access your profile</h1>;
  }

  return (
    <div className="upload-container">
      <div className="upload-header">
        <h1 className="upload-title">
          <i className="fa-solid fa-cloud-arrow-up"></i>
          Upload Project
        </h1>
        <p className="upload-subtitle">Share your amazing work with the community</p>
      </div>

      <div className="upload-form-card">
        <form onSubmit={handleSubmit} className="upload-form">
          {/* Basic Info Section */}
          <div className="form-section">
            <h3 className="form-section-title">
              <i className="fa-solid fa-circle-info"></i>
              Project Information
            </h3>

            <div className="form-group">
              <label className="form-label">
                <i className="fa-solid fa-heading"></i>
                Project Title *
              </label>
              <input
                type="text"
                placeholder="Enter project title"
                name="name"
                value={file.name}
                onChange={handleTextChange}
                className="form-input"
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <i className="fa-solid fa-align-left"></i>
                Description
              </label>
              <textarea
                placeholder="Describe your project..."
                name="description"
                value={file.description}
                onChange={handleTextChange}
                className="form-textarea"
                rows={5}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <i className="fa-solid fa-code"></i>
                Technologies Used
              </label>
              <textarea
                placeholder="e.g. React, Node.js, MongoDB, Express"
                name="technologys"
                value={file.technologys}
                onChange={handleTextChange}
                className="form-textarea"
                rows={3}
              />
            </div>
          </div>

          {/* Links Section */}
          <div className="form-section">
            <h3 className="form-section-title">
              <i className="fa-solid fa-link"></i>
              Project Links
            </h3>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <i className="fa-brands fa-github"></i>
                  GitHub Repository
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/..."
                  name="github_link"
                  value={file.github_link}
                  onChange={handleTextChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <i className="fa-solid fa-globe"></i>
                  Live Demo
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  name="online_link"
                  value={file.online_link}
                  onChange={handleTextChange}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="form-section">
            <h3 className="form-section-title">
              <i className="fa-solid fa-image"></i>
              Project Image
            </h3>

            <div className="image-upload-section">
              <div className="image-upload-wrapper">
                <div className="image-preview-box">
                  {preview ? (
                    <img src={preview} alt="Project preview" />
                  ) : (
                    <div className="image-preview-placeholder">
                      <i className="fa-solid fa-image"></i>
                      <p>No image selected</p>
                    </div>
                  )}
                </div>

                <div className="image-upload-controls">
                  <label className="file-input-label">
                    <i className="fa-solid fa-upload"></i>
                    Choose Project Image
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                  </label>

                  <div className="file-info">
                    <strong>Image Guidelines:</strong>
                    <br />• Supported formats: JPG, PNG, GIF, WebP, SVG
                    <br />• Recommended size: 1200x800px
                    <br />• Max file size: 5MB
                  </div>

                  {file.file && (
                    <div style={{ fontSize: '0.85rem', color: '#667eea', fontWeight: 600 }}>
                      <i className="fa-solid fa-check-circle"></i> {file.file.name}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">
              <i className="fa-solid fa-xmark"></i>
              Cancel
            </button>
            <button type="submit" disabled={isSending} className="btn btn-primary">
              <i className="fa-solid fa-cloud-arrow-up"></i>
              {isSending ? 'Uploading...' : 'Upload Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Projectupload;
