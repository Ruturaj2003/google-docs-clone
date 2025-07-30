export const templates = [
  {
    id: "blank",
    label: "Blank Document",
    imageUrl: "/blank-document.svg",
    initialContent: "",
  },
  {
    id: "business-letter",
    label: "Business Letter",
    imageUrl: "/business-letter.svg",
    initialContent: `
      <p style="font-size:14px;">[Your Name]<br/>
      [Your Address]<br/>
      [City, State ZIP Code]<br/>
      [Date]</p>

      <p style="font-size:14px;">[Recipient Name]<br/>
      [Company Name]<br/>
      [Address Line]</p>

      <p>Dear [Recipient],</p>

      <p>I am writing to formally...</p>

      <p>Sincerely,<br/>[Your Name]</p>
    `,
  },
  {
    id: "cover-letter",
    label: "Cover Letter",
    imageUrl: "/cover-letter.svg",
    initialContent: `
      <p>Dear Hiring Manager,</p>

      <p>I am writing to apply for the [Position] role at [Company Name]. My experience in...</p>

      <p>Thank you for considering my application.</p>

      <p>Sincerely,<br/>[Your Name]</p>
    `,
  },
  {
    id: "letter",
    label: "Letter",
    imageUrl: "/letter.svg",
    initialContent: `
      <p>Dear [Recipient],</p>

      <p>I hope this message finds you well. I wanted to write to you regarding...</p>

      <p>Best regards,<br/>[Your Name]</p>
    `,
  },
  {
    id: "project-proposal",
    label: "Project Proposal",
    imageUrl: "/project-proposal.svg",
    initialContent: `
      <h2>Project Proposal</h2>
      <p><strong>Project Name:</strong> [Enter Project Name]</p>
      <p><strong>Overview:</strong> This project aims to...</p>
      <p><strong>Timeline:</strong> Q3 2025</p>
      <p><strong>Budget:</strong> $25,000</p>
    `,
  },
  {
    id: "resume",
    label: "Resume",
    imageUrl: "/resume.svg",
    initialContent: `
      <h1>[Your Name]</h1>
      <p><strong>Email:</strong> you@example.com | <strong>Phone:</strong> 123-456-7890</p>

      <h2>Experience</h2>
      <p><strong>Software Engineer</strong> – ABC Corp (2021–Present)</p>
      <ul><li>Developed full-stack web apps with React and Node.js.</li></ul>

      <h2>Education</h2>
      <p>B.Tech in Computer Science – XYZ University</p>
    `,
  },
  {
    id: "software-proposal",
    label: "Software Proposal",
    imageUrl: "/software-proposal.svg",
    initialContent: `
      <h2>Software Proposal</h2>
      <p><strong>Client:</strong> [Client Name]</p>
      <p><strong>Objective:</strong> Build a scalable web platform to manage...</p>

      <h3>Tech Stack</h3>
      <ul>
        <li>Frontend: React</li>
        <li>Backend: Node.js</li>
        <li>Database: PostgreSQL</li>
      </ul>

      <p><strong>Estimated Timeline:</strong> 12 weeks</p>
    `,
  },
];
