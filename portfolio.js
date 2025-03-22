// Sample project data
const projects = [
  {
    title: "Project 1",
    media: [
      "Assets/Images/Projects/project1.jpg",
      "Assets/Images/Projects/project1-1.jpg",
      "Assets/Videos/project1-video.mp4",
    ],
    details: "Additional information about Project 1.",
  },
  {
    title: "Project 2",
    media: [
      "Assets/Images/Projects/project2.jpg",
      "Assets/Images/Projects/project2-1.jpg",
      "Assets/Videos/project2-video.mp4",
    ],
    details: "Additional information about Project 2.",
  },
  // Add more projects as needed
];

let currentProjectIndex = 0;
let currentMediaIndex = 0;

// DOM Elements
const projectTitle = document.getElementById("project-title");
const projectDetails = document.getElementById("project-details");
const mainMedia = document.getElementById("main-media");

// Function to load project data
function loadProject(index) {
  const project = projects[index];
  projectTitle.textContent = project.title;
  projectDetails.textContent = project.details;
  loadMedia(0); // Load the first media item
}

// Function to load media
function loadMedia(index) {
  const media = projects[currentProjectIndex].media[index];
  if (media.endsWith(".mp4")) {
    mainMedia.innerHTML = `
      <video controls autoplay>
        <source src="${media}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    `;
  } else {
    mainMedia.innerHTML = `<img src="${media}" alt="Project Media">`;
  }
}

// Scroll Up/Down for Projects
document.addEventListener("wheel", (e) => {
  if (e.deltaY > 0) {
    // Scroll down (next project)
    currentProjectIndex = (currentProjectIndex + 1) % projects.length;
  } else {
    // Scroll up (previous project)
    currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
  }
  loadProject(currentProjectIndex);
});

// Scroll Left/Right for Media
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    // Scroll left (previous media)
   