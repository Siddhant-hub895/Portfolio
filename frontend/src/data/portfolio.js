/**
 * Edit this file to update the portfolio.
 * Leave a field as an empty string when you don't have the detail yet.
 * Do not invent companies, dates, metrics, or links.
 */

export const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export const portfolio = {
  personal: {
    name: "Siddhant Pawar",
    role: "Full-Stack Developer",
    tagline: "I build web applications with the MERN stack.",
    description:
      "Final-year Electronics & Telecommunication Engineering student at Ajeenkya DY Patil School of Engineering, Pune. I spend most of my time on React, Node.js, and MongoDB, and I keep a regular practice in Java and data structures.",
    location: "Pune",
    email: "siddhantpawar726@gmail.com",
    status: "Open to software developer opportunities",
  },

  social: {
    github: "https://github.com/Siddhant-hub895",
    linkedin: "https://www.linkedin.com/in/siddhant-pawar-004414319/",
    email: "siddhantpawar726@gmail.com",
    // Optional. Leave empty to hide the link.
    instagram: "",
  },

  resume: "/resume.pdf",

  about: {
    heading: "Engineering student, building on the web.",
    paragraphs: [
      "I'm in the final year of Electronics & Telecommunication Engineering at Ajeenkya DY Patil School of Engineering, Pune, class of 2027. Outside coursework, I build full-stack applications — usually with React on the front and Node.js, Express, and MongoDB on the back.",
      "I also practice Java and data structures, since the roles I'm aiming for expect both product work and problem solving. I'm currently a full-stack intern at DRDO. Before that, a UI/UX internship at Careasa Healthcare gave me time in Figma on screens that had to fit a real product.",
    ],
    facts: [
      { label: "Education", value: "E&TC Engineering" },
      { label: "CGPA", value: "8.68" },
      { label: "Focus", value: "Full-Stack Development" },
      { label: "Core", value: "MERN + Java DSA" },
    ],
  },

  heroNotes: [
    { label: "Studying", value: "E&TC Engineering, class of 2027" },
    { label: "Building with", value: "React, Node.js, Express, MongoDB" },
    { label: "Also practicing", value: "Java and data structures" },
    { label: "Looking for", value: "Internships and graduate roles" },
  ],

  experience: [
    {
      id: "drdo",
      company: "DRDO",
      role: "Full Stack Developer Intern",
      type: "Internship",
      location: "Pune",
      duration: "June 2026 – Present",
      logo: "/logos/drdo.jpg",
      points: [
        "Building MERN and .NET modules inside a secure offline intranet.",
        "Working on RESTful APIs for those modules.",
      ],
      technologies: ["MERN", "React", "Node.js", "MongoDB", ".NET"],
    },
    {
      id: "careasa",
      company: "Careasa Healthcare Pvt. Ltd.",
      role: "UI/UX Design Intern",
      type: "Internship",
      location: "Pune",
      duration: "Jan 2026 – Feb 2026",
      logo: "/logos/careasa.jpg",
      points: [
        "Designed product screens in Figma, including an Explore page, a mood tracking flow, and a doctor profile screen.",
        "Worked on POSH-related interface screens.",
        "Collaborated with the team on how those screens fit the product.",
      ],
      technologies: ["Figma", "UI/UX", "Product design"],
    },
  ],

  projects: [
    {
      id: "roamly",
      featured: true,
      name: "Roamly",
      description:
        "A full-stack accommodation booking platform for publishing stays, uploading photos, reading reviews, and viewing locations on a map.",
      features: [
        "Authentication, authorization, and sessions",
        "CRUD for listings and reviews",
        "Image uploads with Cloudinary",
        "Location visualization with Mapbox",
        "Validation and error handling",
      ],
      technologies: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "EJS",
        "Bootstrap",
        "Cloudinary",
        "Mapbox",
        "Passport.js",
      ],
      github: "https://github.com/Siddhant-hub895/Roamly-project",
      live: "https://roamly-project.onrender.com/listings",
      // TODO: optional case study URL
      caseStudy: "",
      image: "/projects/roamly.jpg",
      imageAlt: "Roamly accommodation booking interface",
      visual: "roamly",
    },
  ],

  skills: {
    Frontend: ["HTML", "CSS", "JavaScript", "React", "EJS", "Bootstrap", "Tailwind CSS"],
    Backend: ["Node.js", "Express.js", "REST APIs"],
    Database: ["MongoDB", "MySQL"],
    Languages: ["Java", "JavaScript", "C/C++"],
    Tools: ["Git", "GitHub", "VS Code", "Figma"],
    Other: [
      "Cloudinary",
      "Mapbox",
      "Authentication",
      "Authorization",
      "CRUD",
      "MVC architecture",
      "Data structures & algorithms",
    ],
  },

  education: [
    {
      id: "be-etc",
      degree: "Bachelor of Engineering",
      field: "Electronics & Telecommunication Engineering",
      institution: "Ajeenkya DY Patil School of Engineering, Pune",
      duration: "Class of 2027",
      scoreLabel: "CGPA",
      score: "8.68",
      coursework: [],
    },
  ],

  /**
   * Add certifications as objects:
   * {
   *   id: "cert-id",
   *   name: "",
   *   issuer: "",
   *   date: "",
   *   credentialId: "",
   *   url: "",
   * }
   */
  certifications: [],
};
