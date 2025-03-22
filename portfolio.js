// Sample project data
const projects = [
  {
    title: "Project 1",
    media: [
      "Assets/Images/Projects/project1.jpg",
      "Assets/Images/Projects/project3.jpg",
      "Assets/Videos/project1-video.mp4",
    ],
    details: "Additional information about Project 1.",
  },
  {
    title: "Project 2",
    media: [
      "Assets/Images/Projects/project2.jpg",
      "Assets/Images/Projects/project4.jpg",
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
const mainMedia = document.getElementById("main-media");
const detailsLink = document.getElementById("details-link");
const detailsCard = document.querySelector(".details-card");
const detailsTitle = document.getElementById("details-title");
const detailsText = document.getElementById("details-text");
const closeDetails = document.querySelector(".close-details");

// Function to load project data
function loadProject(index) {
  const project = projects[index];
  projectTitle.textContent = project.title;
  detailsTitle.textContent = project.title;
  detailsText.textContent = project.details;
  loadMedia(0); // Load the first media item
}

// Function to load media
function loadMedia(index) {
  const media = projects[currentProjectIndex].media[index];
  if (media.endsWith(".mp4")) {
    mainMedia.innerHTML = `
      <video controls autoplay muted loop>
        <source