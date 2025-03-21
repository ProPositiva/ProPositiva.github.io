// Sample project data
const projects = [
  {
    title: "Project 1",
    mainImage: "Assets/Images/Projects/project1.jpg",
    gallery: [
      "Assets/Images/Projects/project1-1.jpg",
      "Assets/Images/Projects/project1-2.jpg",
      "Assets/Videos/project1-video.mp4",
    ],
    details: "Additional information about Project 1.",
  },
  {
    title: "Project 2",
    mainImage: "Assets/Images/Projects/project2.jpg",
    gallery: [
      "Assets/Images/Projects/project2-1.jpg",
      "Assets/Images/Projects/project2-2.jpg",
      "Assets/Videos/project2-video.mp4",
    ],
    details: "Additional information about Project 2.",
  },
  {
    title: "Project 3",
    mainImage: "Assets/Images/Projects/project3.jpg",
    gallery: [
      "Assets/Images/Projects/project2-1.jpg",
      "Assets/Images/Projects/project2-2.jpg",
      "Assets/Videos/project2-video.mp4",
    ],
    details: "Additional information about Project 2.",
  },
  {
    title: "Project 4",
    mainImage: "Assets/Images/Projects/project4.jpg",
    gallery: [
      "Assets/Images/Projects/project2-1.jpg",
      "Assets/Images/Projects/project2-2.jpg",
      "Assets/Videos/project2-video.mp4",
    ],
    details: "Additional information about Project 2.",
  },
  // Add more projects as needed
];

let currentProjectIndex = 0;

// DOM Elements
const projectTitle = document.getElementById("project-title");
const mainImage = document.getElementById("main-image");
const projectGallery = document.querySelector(".project-gallery");
const infoModal = document.querySelector(".info-modal");
const projectDetails = document.getElementById("project-details");
const closeModal = document.querySelector(".close-modal");

// Function to load project data
function loadProject(index) {
  const project = projects[index];
  projectTitle.textContent = project.title;
  mainImage.src = project.mainImage;

  // Clear gallery
  projectGallery.innerHTML = "";

  // Load gallery items
  project.gallery.forEach((item) => {
    const galleryItem = document.createElement("div");
    galleryItem.classList.add("gallery-item");

    if (item.endsWith(".mp4")) {
      const video = document.createElement("video");
      video.controls = true;
      const source = document.createElement("source");
      source.src = item;
      source.type = "video/mp4";
      video.appendChild(source);
      galleryItem.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.src = item;
      galleryItem.appendChild(img);
    }

    projectGallery.appendChild(galleryItem);
  });

  // Update project details
  projectDetails.textContent = project.details;
}

// Navigation Arrows
document.querySelector(".left-arrow").addEventListener("click", () => {
  currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
  loadProject(currentProjectIndex);
});

document.querySelector(".right-arrow").addEventListener("click", () => {
  currentProjectIndex = (currentProjectIndex + 1) % projects.length;
  loadProject(currentProjectIndex);
});

// Additional Info Modal
document.querySelector(".info-button").addEventListener("click", () => {
  infoModal.style.display = "block";
});

closeModal.addEventListener("click", () => {
  infoModal.style.display = "none";
});

// Swipe Functionality (for touch devices)
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  if (touchEndX < touchStartX) {
    // Swipe left
    currentProjectIndex = (currentProjectIndex + 1) % projects.length;
  } else if (touchEndX > touchStartX) {
    // Swipe right
    currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
  }
  loadProject(currentProjectIndex);
}

// Load the first project
loadProject(currentProjectIndex);