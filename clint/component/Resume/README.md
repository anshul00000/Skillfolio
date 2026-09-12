# Resume Builder Feature

## Overview
This feature allows users to generate professional resumes from their profile information and download them as PDF files.

## Features

### 1. **Resume Templates**
- **Modern Professional**: Clean and contemporary design with bold blue sections
- **Classic Elegance**: Traditional serif layout with professional appeal
- **Creative Bold**: Stand out with vibrant purple colors and modern layouts
- **Minimal Clean**: Simple and elegant minimalist design

### 2. **Template Selection Modal**
- Visual preview of each template design
- Template selection with confirmation
- Responsive modal interface
- Smooth animations and transitions

### 3. **Resume Preview Page**
- Full-page resume view
- Real-time rendering of user data
- Download as PDF functionality
- Back navigation to profile

### 4. **PDF Generation**
- Downloads with user's name (e.g., `username_Resume.pdf`)
- High-quality A4 size PDF
- Preserves all formatting and styling
- Optimized for printing

## User Flow

1. **Navigate to Profile**: User goes to their profile page (`/p` or `/profile`)
2. **Click "Create Resume"**: A button appears next to "Upload New Project"
3. **Select Template**: A modal opens showing 4 resume design options
4. **Preview Template**: User selects their preferred design
5. **View Full Resume**: Full-page resume preview opens with their profile data
6. **Download PDF**: Click "Download PDF" button to save the resume

## Technical Implementation

### Components

#### `ResumeTemplateModal.jsx`
- Modal component for template selection
- Shows template previews with color schemes
- Handles template selection state
- Navigates to resume preview page

#### `ResumePreview.jsx`
- Main resume preview page
- Uses `html2canvas` to capture resume element
- Uses `jsPDF` to generate PDF file
- Handles template rendering based on route parameter

#### Template Components
- `ModernTemplate.jsx` - Modern professional design
- `ClassicTemplate.jsx` - Classic serif design
- `CreativeTemplate.jsx` - Creative two-column design with sidebar
- `MinimalTemplate.jsx` - Minimal clean design

### Routes
```javascript
// Profile page with "Create Resume" button
/p or /profile

// Resume preview page
/resume/:templateId
```

### Dependencies
```json
{
  "html2canvas": "^1.4.1",
  "jspdf": "^2.5.2"
}
```

## Data Used from User Profile

The resume builder pulls the following data from the user object:
- `username` - User's name
- `bio` - Professional tagline/headline
- `about` - Professional summary
- `email` - Contact email
- `phone` - Contact phone number
- `github` - GitHub profile link
- `linkedin` - LinkedIn profile link
- `skills` - Array of skills
- `education` - Education information
- `experience` - Work experience
- `projects` - Array of project objects with:
  - `projectname`
  - `projectDescription`
  - `technologies`
  - `githublink`

## Styling

Each template has its own CSS file with:
- Print-optimized styles (`@media print`)
- Responsive design for mobile preview
- A4 page dimensions (210mm x 297mm)
- Professional color schemes
- Typography hierarchy

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (Chromium)
- Firefox
- Safari
- Opera

## Future Enhancements

Potential improvements:
- Custom color themes for templates
- Additional template designs
- Edit resume data before download
- Multi-page resume support
- Save resume as image (PNG/JPG)
- Share resume via link
- Resume version history

## Usage Example

```javascript
// In Profile component
import ResumeTemplateModal from '../Resume/ResumeTemplateModal';

const [resumeModalOpen, setResumeModalOpen] = useState(false);

<button onClick={() => setResumeModalOpen(true)}>
  Create Resume
</button>

<ResumeTemplateModal 
  isOpen={resumeModalOpen}
  onClose={() => setResumeModalOpen(false)}
  userId={user?._id}
/>
```

## Notes

- The resume generation happens client-side (no server processing)
- PDF quality is optimized at scale 2 for sharp rendering
- Loading state prevents duplicate downloads
- Templates are fully responsive for preview
- All templates support print media queries
