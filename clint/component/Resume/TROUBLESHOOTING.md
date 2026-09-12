# Resume Feature Troubleshooting Guide

## ✅ Quick Diagnostic Checklist

### 1. Check Browser Console
Open browser DevTools (F12) and check for:
- [ ] Any error messages in Console tab
- [ ] Network tab showing 404 errors for CSS files
- [ ] React component errors

### 2. Verify Installation
```bash
# Check if dependencies are installed
npm list html2canvas jspdf

# If missing, reinstall
npm install html2canvas jspdf
```

### 3. Check Console Logs
The ResumePreview component logs debug information:
```
ResumePreview mounted
Template ID: modern
User from context: {username: "...", ...}
Projects from context: [...]
Rendering template: modern with props: {...}
```

## 🐛 Common Issues & Solutions

### Issue 1: White/Blank Page After Clicking Create Resume

**Possible Causes:**
1. Template CSS files not loading
2. Component import paths incorrect
3. Context API not providing data
4. Route not configured properly

**Solutions:**

#### Solution A: Check CSS Import Paths
```javascript
// In each template file, verify:
import './ModernTemplate.css';  // ✅ Correct
import '../ModernTemplate.css'; // ❌ Wrong
```

#### Solution B: Verify Route Configuration
```javascript
// In App.jsx, ensure:
<Route path="/resume/:templateId" element={<ResumePreview />} />
```

#### Solution C: Check Context Provider
```javascript
// Ensure App.jsx is wrapped with Contextstate
<Contextstate>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Contextstate>
```

#### Solution D: Clear Browser Cache
```
1. Open DevTools (F12)
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"
```

### Issue 2: Template Modal Not Showing

**Cause:** Modal state not updating or CSS z-index issue

**Solution:**
```css
/* Ensure modal has high z-index */
.resume-modal-overlay {
  z-index: 1000;
}
```

### Issue 3: PDF Download Not Working

**Causes:**
1. Browser blocking downloads
2. html2canvas/jsPDF not installed
3. Resume ref not attached to DOM element

**Solutions:**

#### Check Browser Permissions
```
Chrome: Settings → Privacy and security → Site Settings → Additional permissions → Automatic downloads
```

#### Verify Libraries
```bash
npm install --save html2canvas jspdf
```

#### Check Ref Assignment
```javascript
<div ref={resumeRef} className="resume-page">
  {renderTemplate()}
</div>
```

### Issue 4: Template Shows "undefined" Values

**Cause:** User profile incomplete or demo data not loading

**Solution:**
The component now has demo data fallback. Check console logs to verify demo data is being used:
```javascript
console.log('ResumePreview - User:', demoUser);
```

### Issue 5: Styling Broken in Preview

**Causes:**
1. CSS files not imported
2. Class names mismatch
3. Global CSS conflicts

**Solutions:**

#### Verify CSS Imports
```bash
# Check if all CSS files exist
ls component/Resume/templates/*.css
```

#### Check Class Names
```javascript
// Ensure className matches CSS file
<div className="modern-template">  // Must match .modern-template in CSS
```

#### Add Scoped Styles
```css
/* Add more specific selectors */
.resume-page .modern-template {
  /* styles */
}
```

## 🔍 Debugging Steps

### Step 1: Check Template Import
```javascript
// In ResumePreview.jsx
console.log('ModernTemplate:', ModernTemplate);
console.log('ClassicTemplate:', ClassicTemplate);
console.log('CreativeTemplate:', CreativeTemplate);
console.log('MinimalTemplate:', MinimalTemplate);
```

### Step 2: Test Individual Template
```javascript
// Temporarily hardcode template render
const renderTemplate = () => {
  return <div style={{padding: '40px', background: 'white'}}>
    <h1>Test Template</h1>
    <ModernTemplate 
      user={{username: 'Test', bio: 'Developer'}} 
      projects={[]} 
    />
  </div>;
};
```

### Step 3: Check Route Parameter
```javascript
// In ResumePreview component
useEffect(() => {
  console.log('Current URL:', window.location.href);
  console.log('Template param:', templateId);
}, [templateId]);
```

### Step 4: Verify Context Data
```javascript
// Add to ResumePreview
const contextValue = useContext(Context);
console.log('Full Context:', contextValue);
```

## 🧪 Test Scenarios

### Test 1: Direct URL Access
```
Navigate to: http://localhost:5173/resume/modern
Expected: Resume preview loads with demo data
```

### Test 2: Modal Flow
```
1. Go to /p (profile)
2. Click "Create Resume"
3. Modal should appear
4. Select template
5. Click "Create Resume"
6. Should navigate to /resume/[template]
```

### Test 3: PDF Download
```
1. Open resume preview
2. Click "Download PDF"
3. Button shows "Generating..."
4. PDF downloads with filename: Username_Resume.pdf
```

## 📋 Verification Checklist

After implementing fixes, verify:

- [ ] All 4 templates accessible via direct URL
- [ ] Modal opens and closes properly
- [ ] Template selection highlights work
- [ ] Navigation to preview works
- [ ] All templates render with demo data
- [ ] PDF download works
- [ ] PDF filename is correct
- [ ] Back button works
- [ ] Responsive on mobile
- [ ] No console errors

## 🔧 Development Tools

### Quick Template Test URLs
```
http://localhost:5173/resume/modern
http://localhost:5173/resume/classic
http://localhost:5173/resume/creative
http://localhost:5173/resume/minimal
```

### Check File Structure
```bash
cd component/Resume
tree /F
```

Expected structure:
```
Resume/
├── ResumePreview.jsx
├── ResumePreview.css
├── ResumeTemplateModal.jsx
├── ResumeTemplateModal.css
├── README.md
├── TROUBLESHOOTING.md
└── templates/
    ├── ModernTemplate.jsx
    ├── ModernTemplate.css
    ├── ClassicTemplate.jsx
    ├── ClassicTemplate.css
    ├── CreativeTemplate.jsx
    ├── CreativeTemplate.css
    ├── MinimalTemplate.jsx
    └── MinimalTemplate.css
```

## 🚀 Quick Fixes

### Nuclear Option: Complete Reinstall
```bash
# 1. Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# 2. Clear npm cache
npm cache clean --force

# 3. Reinstall everything
npm install

# 4. Install resume dependencies
npm install html2canvas jspdf

# 5. Restart dev server
npm run dev
```

### Reset Component State
```javascript
// Add to Profile.jsx
useEffect(() => {
  setResumeModalOpen(false);
}, [location]);
```

## 📞 Still Having Issues?

### Information to Provide:
1. Browser console errors (screenshot)
2. Network tab showing failed requests
3. Browser version
4. Node version: `node --version`
5. NPM version: `npm --version`
6. Exact steps to reproduce

### Console Debug Output
Press F12 and paste these console logs:
```javascript
console.log('templateId:', window.location.pathname);
console.log('html2canvas:', typeof html2canvas);
console.log('jsPDF:', typeof jsPDF);
console.log('Context:', React.useContext(Context));
```

## ✨ Success Indicators

When everything works correctly, you should see:

1. **Console Logs:**
```
ResumePreview mounted
Template ID: modern
Rendering template: modern with props: {user: {...}, projects: [...]}
```

2. **Visual Elements:**
- Resume preview with blue header (Modern)
- User name and contact info
- Skills tags
- Project cards
- Download button enabled

3. **PDF Download:**
- File downloads automatically
- Filename: YourName_Resume.pdf
- Proper formatting preserved
- A4 size (210mm x 297mm)

## 🎯 Performance Tips

### Optimize PDF Generation
```javascript
// Reduce scale for faster generation (lower quality)
const canvas = await html2canvas(resumeRef.current, {
  scale: 1.5, // Instead of 2
  useCORS: true,
  logging: false
});
```

### Lazy Load Templates
```javascript
// Use React.lazy for code splitting
const ModernTemplate = React.lazy(() => 
  import('./templates/ModernTemplate')
);
```

---

**Last Updated:** [Current Date]
**Version:** 1.0
**Status:** Active
