// Initialize empty data structure in localStorage
if (!localStorage.getItem('resumeData')) {
  localStorage.setItem('resumeData', JSON.stringify({
    personalInfo: {},
    workExperience: [],
    education: [],
    skills: []
  }));
}

// Function to store data in localStorage
function storeData(key, value) {
  let data = JSON.parse(localStorage.getItem('resumeData'));
  data[key] = value;
  localStorage.setItem('resumeData', JSON.stringify(data));
}

// Function to retrieve data from localStorage
function retrieveData(key) {
  let data = JSON.parse(localStorage.getItem('resumeData'));
  return data[key];
}

// Function to display extracted data
function displayExtractedData(data) {
  const extractedDataDiv = document.getElementById('extracted-data');
  extractedDataDiv.style.display = 'block';

  document.getElementById('name').value = data.name || '';
  document.getElementById('email').value = data.email || '';
  document.getElementById('phone').value = data.phone || '';
}

// File upload functionality
document.addEventListener('DOMContentLoaded', function() {
  const fileInput = document.getElementById('file-input');
  const uploadButton = document.getElementById('upload-button');
  const uploadStatus = document.getElementById('upload-status');
  const saveButton = document.getElementById('save-button');

  uploadButton.addEventListener('click', function() {
    fileInput.click();
  });

  fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        uploadStatus.textContent = 'Error: File size exceeds 10MB limit.';
        return;
      }

      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        uploadStatus.textContent = 'Error: Invalid file type. Please upload a PDF or DOCX file.';
        return;
      }

      uploadStatus.textContent = 'Uploading...';

      // Simulating file upload and parsing
      setTimeout(() => {
        uploadStatus.textContent = 'Resume uploaded and parsed successfully!';
        
        // Store some dummy data for demonstration
        const dummyData = {
          name: 'John Doe',
          email: 'johndoe@example.com',
          phone: '123-456-7890'
        };

        storeData('personalInfo', dummyData);
        displayExtractedData(dummyData);

        console.log('Stored data:', retrieveData('personalInfo'));
      }, 2000);
    }
  });

  saveButton.addEventListener('click', function() {
    const updatedData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value
    };

    storeData('personalInfo', updatedData);
    alert('Changes saved successfully!');
    console.log('Updated data:', retrieveData('personalInfo'));
  });

  // Load existing data if available
  const existingData = retrieveData('personalInfo');
  if (existingData && Object.keys(existingData).length > 0) {
    displayExtractedData(existingData);
  }
});

console.log("Settings page loaded");
