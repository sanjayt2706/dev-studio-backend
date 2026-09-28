require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Member = require('./src/models/Member');
const Project = require('./src/models/Project');
const Announcement = require('./src/models/Announcement');
const Event = require('./src/models/Event');
const Resource = require('./src/models/Resource');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dev-studio';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const teamData = [
  {
    name: 'Arjun Nair',
    role: 'President',
    team: 'Core',
    year: '4th Year',
    branch: 'CSE',
    profileImage: '',
    image: '',
    shortBio: 'Full-stack developer specializing in React and distributed systems. Leads Dev Studio vision and strategy.',
    bio: 'Full-stack developer specializing in React and distributed systems. Leads Dev Studio vision and strategy.',
    skills: ['React', 'Node.js', 'System Design', 'AWS'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    isActive: true,
  },
  {
    name: 'Meera Sharma',
    role: 'Vice President',
    team: 'Core',
    year: '3rd Year',
    branch: 'CSE',
    profileImage: '',
    image: '',
    shortBio: 'Passionate about design systems and developer experience. Bridges the gap between design and engineering.',
    bio: 'Passionate about design systems and developer experience. Bridges the gap between design and engineering.',
    skills: ['TypeScript', 'Figma', 'Next.js', 'Tailwind'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    isActive: true,
  },
  {
    name: 'Karthik Rao',
    role: 'Tech Lead',
    team: 'Advanced',
    year: '3rd Year',
    branch: 'CSE',
    profileImage: '',
    image: '',
    shortBio: 'Backend architect with a passion for performance optimization and clean APIs.',
    bio: 'Backend architect with a passion for performance optimization and clean APIs.',
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    isActive: true,
  },
  {
    name: 'Ananya Bhat',
    role: 'Design Lead',
    team: 'Design',
    year: '3rd Year',
    branch: 'ISE',
    profileImage: '',
    image: '',
    shortBio: 'UI/UX designer who believes great products start with empathy. Creates visual identities and interaction patterns.',
    bio: 'UI/UX designer who believes great products start with empathy. Creates visual identities and interaction patterns.',
    skills: ['UI/UX', 'Figma', 'Prototyping', 'Motion Design'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    isActive: true,
  },
  {
    name: 'Rahul Patel',
    role: 'ML Lead',
    team: 'Advanced',
    year: '4th Year',
    branch: 'CSE',
    profileImage: '',
    image: '',
    shortBio: 'Machine learning engineer exploring the intersection of AI and web technologies.',
    bio: 'Machine learning engineer exploring the intersection of AI and web technologies.',
    skills: ['Python', 'TensorFlow', 'FastAPI', 'Computer Vision'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    isActive: true,
  },
  {
    name: 'Divya Shetty',
    role: 'Frontend Lead',
    team: 'Web',
    year: '3rd Year',
    branch: 'CSE',
    profileImage: '',
    image: '',
    shortBio: 'Frontend specialist who crafts performant, accessible, and beautifully animated web experiences.',
    bio: 'Frontend specialist who crafts performant, accessible, and beautifully animated web experiences.',
    skills: ['React', 'GSAP', 'Three.js', 'CSS Architecture'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    isActive: true,
  },
  {
    name: 'Aditya Kulkarni',
    role: 'Backend Lead',
    team: 'Web',
    year: '2nd Year',
    branch: 'CSE',
    profileImage: '',
    image: '',
    shortBio: 'API and database enthusiast. Builds robust server architectures and scalable data pipelines.',
    bio: 'API and database enthusiast. Builds robust server architectures and scalable data pipelines.',
    skills: ['Node.js', 'Express', 'MongoDB', 'Redis'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    isActive: true,
  },
  {
    name: 'Sneha Gowda',
    role: 'Events Lead',
    team: 'Operations',
    year: '2nd Year',
    branch: 'ECE',
    profileImage: '',
    image: '',
    shortBio: 'Organizes hackathons, workshops, and community events that bring developers together.',
    bio: 'Organizes hackathons, workshops, and community events that bring developers together.',
    skills: ['Event Planning', 'Marketing', 'Content', 'Social Media'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    isActive: true,
  },
  {
    name: 'Vikram Hegde',
    role: 'DevOps Lead',
    team: 'Advanced',
    year: '4th Year',
    branch: 'CSE',
    profileImage: '',
    image: '',
    shortBio: 'Infrastructure and automation specialist. Keeps the club deployments running smoothly.',
    bio: 'Infrastructure and automation specialist. Keeps the club deployments running smoothly.',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'Linux'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    isActive: true,
  },
  {
    name: 'Priya Menon',
    role: 'Content Lead',
    team: 'Operations',
    year: '2nd Year',
    branch: 'CSE',
    profileImage: '',
    image: '',
    shortBio: 'Technical writer and community builder. Manages documentation, blogs, and social media.',
    bio: 'Technical writer and community builder. Manages documentation, blogs, and social media.',
    skills: ['Technical Writing', 'Markdown', 'SEO', 'Analytics'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    isActive: true,
  },
  {
    name: 'Nikhil Shenoy',
    role: 'App Dev Lead',
    team: 'Mobile',
    year: '3rd Year',
    branch: 'ISE',
    profileImage: '',
    image: '',
    shortBio: 'Cross-platform mobile developer building native experiences with React Native and Flutter.',
    bio: 'Cross-platform mobile developer building native experiences with React Native and Flutter.',
    skills: ['React Native', 'Flutter', 'Firebase', 'Kotlin'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    isActive: true,
  },
  {
    name: 'Ishita Reddy',
    role: 'Open Source Lead',
    team: 'Advanced',
    year: '3rd Year',
    branch: 'CSE',
    profileImage: '',
    image: '',
    shortBio: 'Open source contributor and advocate. Mentors new developers in collaborative coding.',
    bio: 'Open source contributor and advocate. Mentors new developers in collaborative coding.',
    skills: ['Git', 'Open Source', 'Rust', 'Go'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    isActive: true,
  },
  {
    name: 'Sanjay Kumar',
    role: 'Member',
    team: 'Web',
    year: '2nd Year',
    branch: 'CSE',
    profileImage: '',
    image: '',
    shortBio: 'Enthusiastic frontend developer learning modern web technologies and animation libraries.',
    bio: 'Enthusiastic frontend developer learning modern web technologies and animation libraries.',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'GSAP'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    isActive: true,
  },
  {
    name: 'Roshni D\'Souza',
    role: 'Member',
    team: 'Design',
    year: '2nd Year',
    branch: 'ISE',
    profileImage: '',
    image: '',
    shortBio: 'Aspiring product designer with a keen eye for typography, color, and layout.',
    bio: 'Aspiring product designer with a keen eye for typography, color, and layout.',
    skills: ['Figma', 'Illustration', 'Branding', 'CSS'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    isActive: true,
  },
  {
    name: 'Akash Poojary',
    role: 'Member',
    team: 'Mobile',
    year: '1st Year',
    branch: 'CSE',
    profileImage: '',
    image: '',
    shortBio: 'First-year developer passionate about mobile app development and UI design.',
    bio: 'First-year developer passionate about mobile app development and UI design.',
    skills: ['Java', 'Dart', 'Flutter', 'Firebase'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    isActive: true,
  },
  {
    name: 'Kavya Acharya',
    role: 'Member',
    team: 'Web',
    year: '1st Year',
    branch: 'CSE',
    profileImage: '',
    image: '',
    shortBio: 'Curious learner exploring full-stack development and cloud computing.',
    bio: 'Curious learner exploring full-stack development and cloud computing.',
    skills: ['HTML/CSS', 'JavaScript', 'Python', 'Git'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    isActive: true,
  },
];

const projectsData = [
  {
    title: 'Campus Connect',
    slug: 'campus-connect',
    subtitle: 'Real-time WebSocket Campus Network',
    description: 'A real-time campus event discovery and networking platform built for MITE students. Features live event feeds, club directories, and peer messaging with sub-millisecond push notifications.',
    year: '2026',
    category: 'Full-Stack Platform',
    badge: 'PRODUCTION LIVE',
    technologies: ['React 19', 'Node.js', 'Socket.io', 'MongoDB', 'Tailwind CSS'],
    coverImage: '/assets/projects/campus-connect.svg',
    gallery: [],
    githubUrl: 'https://github.com/devstudio-mite/campus-connect',
    github: 'https://github.com/devstudio-mite/campus-connect',
    liveDemoUrl: 'https://campus.devstudio.mite.edu',
    liveDemo: 'https://campus.devstudio.mite.edu',
    featured: true,
  },
  {
    title: 'NeuroVision AI',
    slug: 'neurovision',
    subtitle: 'Vision Transformer Plant Pathology Diagnostic',
    description: 'A deep learning computer vision diagnostic pipeline that classifies agricultural pathologies in realtime with 98.4% validation accuracy using Vision Transformers and ONNX runtime.',
    year: '2026',
    category: 'Machine Learning',
    badge: 'AI RESEARCH',
    technologies: ['PyTorch', 'FastAPI', 'ONNX Runtime', 'React', 'Docker'],
    coverImage: '/assets/projects/neurovision.svg',
    gallery: [],
    githubUrl: 'https://github.com/devstudio-mite/neurovision-ai',
    github: 'https://github.com/devstudio-mite/neurovision-ai',
    liveDemoUrl: 'https://neurovision.devstudio.mite.edu',
    liveDemo: 'https://neurovision.devstudio.mite.edu',
    featured: true,
  },
  {
    title: 'CodeForge CLI',
    slug: 'codeforge-cli',
    subtitle: 'High-Performance Developer Scaffolding Tool',
    description: 'An intelligent Rust/Node CLI tool that compiles boilerplate and configures git, linting, and CI pipelines in under 190ms — 12x faster than standard community scaffolders.',
    year: '2026',
    category: 'Developer Tool',
    badge: '12K+ DOWNLOADS',
    technologies: ['Rust', 'Node.js', 'Commander.js', 'Inquirer', 'Handlebars'],
    coverImage: '/assets/projects/codeforge.svg',
    gallery: [],
    githubUrl: 'https://github.com/devstudio-mite/codeforge-cli',
    github: 'https://github.com/devstudio-mite/codeforge-cli',
    liveDemoUrl: '',
    liveDemo: '',
    featured: true,
  },
  {
    title: 'MITE Navigator',
    slug: 'mite-navigator',
    subtitle: 'AR Spatial Campus Wayfinding System',
    description: 'An augmented reality indoor/outdoor campus navigation app built with WebXR and Three.js, guiding students and visitors to labs and auditoriums with 0.05m spatial accuracy.',
    year: '2025',
    category: 'Spatial Computing',
    badge: 'CAMPUS DEPLOYED',
    technologies: ['React Native', 'WebXR', 'Three.js', 'Firebase', 'Mapbox'],
    coverImage: '/assets/projects/mite-navigator.svg',
    gallery: [],
    githubUrl: 'https://github.com/devstudio-mite/mite-navigator',
    github: 'https://github.com/devstudio-mite/mite-navigator',
    liveDemoUrl: '',
    liveDemo: '',
    featured: true,
  },
  {
    title: 'DevMetrics Engine',
    slug: 'devmetrics-dashboard',
    subtitle: 'Engineering Telemetry & Velocity Analytics',
    description: 'Internal telemetry dashboard capturing git commit frequencies, PR review velocity, workshop attendance curves, and student contribution heatmaps across 14+ technical repositories.',
    year: '2025',
    category: 'Analytics Dashboard',
    badge: 'INTERNAL TELEMETRY',
    technologies: ['Next.js', 'D3.js', 'ClickHouse', 'PostgreSQL', 'GitHub API'],
    coverImage: '/assets/projects/devmetrics.svg',
    gallery: [],
    githubUrl: 'https://github.com/devstudio-mite/devmetrics',
    github: 'https://github.com/devstudio-mite/devmetrics',
    liveDemoUrl: '',
    liveDemo: '',
    featured: true,
  },
  {
    title: 'OpenCollab',
    slug: 'open-collab',
    subtitle: 'Distributed Peer Incubator & PR Sprints',
    description: 'A platform matching first-year student coders with senior mentors on real open source issues, tracking PR pipelines, automated test runs, and skill tree milestones.',
    year: '2026',
    category: 'Open Source Hub',
    badge: 'PEER MENTORSHIP',
    technologies: ['React 19', 'Express', 'MongoDB', 'GitHub GraphQL API', 'Docker'],
    coverImage: '/assets/projects/opencollab.svg',
    gallery: [],
    githubUrl: 'https://github.com/devstudio-mite/open-collab',
    github: 'https://github.com/devstudio-mite/open-collab',
    liveDemoUrl: 'https://collab.devstudio.mite.edu',
    liveDemo: 'https://collab.devstudio.mite.edu',
    featured: true,
  },
];

const eventsData = [
  {
    title: 'HackStorm 2026',
    description: '24-hour hackathon bringing together developers, designers, and innovators to build solutions for real-world problems. Prizes worth ₹50,000.',
    date: new Date('2026-11-15T09:00:00Z'),
    time: '09:00 AM — 09:00 AM (next day)',
    location: 'MITE Seminar Hall',
    category: 'Hackathon',
    organizer: 'Dev Studio Core Team',
    poster: '/assets/events/poster-placeholder.svg',
    registrationUrl: 'https://hackstorm.devstudio.com',
    featured: true,
    status: 'upcoming',
  },
  {
    title: 'React Masterclass',
    description: 'Deep dive into modern React patterns including Server Components, Suspense boundaries, and the new React compiler. Hands-on workshop with live coding.',
    date: new Date('2026-10-28T14:00:00Z'),
    time: '02:00 PM — 05:00 PM',
    location: 'CS Lab 3',
    category: 'Workshop',
    organizer: 'Divya Shetty & Arjun Nair',
    poster: '/assets/events/poster-placeholder.svg',
    registrationUrl: 'https://forms.devstudio.com/react-workshop',
    featured: true,
    status: 'upcoming',
  },
  {
    title: 'Git & GitHub Bootcamp',
    description: 'Beginner-friendly bootcamp covering version control fundamentals, branching strategies, pull requests, and collaborative open source workflows.',
    date: new Date('2026-10-12T10:00:00Z'),
    time: '10:00 AM — 01:00 PM',
    location: 'CS Lab 1',
    category: 'Bootcamp',
    organizer: 'Ishita Reddy',
    poster: '/assets/events/poster-placeholder.svg',
    registrationUrl: 'https://forms.devstudio.com/git-bootcamp',
    featured: false,
    status: 'upcoming',
  },
  {
    title: 'CodeSprint Monthly #8',
    description: 'Monthly competitive programming contest. Solve algorithmic challenges across difficulty levels and climb the Dev Studio leaderboard.',
    date: new Date('2026-10-05T18:00:00Z'),
    time: '06:00 PM — 09:00 PM',
    location: 'Online (HackerRank)',
    category: 'Competition',
    organizer: 'Karthik Rao',
    poster: '/assets/events/poster-placeholder.svg',
    registrationUrl: 'https://hackerrank.com/devstudio-codesprint-8',
    featured: false,
    status: 'upcoming',
  },
  {
    title: 'Design Thinking Sprint',
    description: 'A fast-paced design sprint where teams ideate, prototype, and validate product ideas in a single day. Learn human-centered design methodology.',
    date: new Date('2026-09-20T09:00:00Z'),
    time: '09:00 AM — 06:00 PM',
    location: 'MITE Innovation Lab',
    category: 'Workshop',
    organizer: 'Ananya Bhat',
    poster: '/assets/events/poster-placeholder.svg',
    registrationUrl: '',
    featured: false,
    status: 'completed',
  },
  {
    title: 'Cloud Computing 101',
    description: 'Introduction to cloud services with AWS. Learn to deploy your first application, set up CI/CD pipelines, and understand serverless architectures.',
    date: new Date('2026-08-15T14:00:00Z'),
    time: '02:00 PM — 05:00 PM',
    location: 'CS Lab 2',
    category: 'Workshop',
    organizer: 'Vikram Hegde',
    poster: '/assets/events/poster-placeholder.svg',
    registrationUrl: '',
    featured: false,
    status: 'completed',
  },
];

const announcementsData = [
  {
    title: 'HackStorm 2026 Registrations Open',
    category: 'Event',
    content: 'Registrations for HackStorm 2026 are now live! Form teams of 2-4 and build something incredible in 24 hours. Early bird registration closes October 30th. Visit the events page for more details.',
    image: '',
    publishedAt: '2026-10-01',
    author: 'Arjun Nair',
    featured: true,
    pinned: true,
    active: true,
  },
  {
    title: 'New Dev Studio Website Launched',
    category: 'Update',
    content: 'We are thrilled to announce the launch of the brand new Dev Studio website. Built entirely by our members using React, GSAP, and Tailwind CSS, this site represents our commitment to quality craftsmanship.',
    image: '',
    publishedAt: '2026-09-25',
    author: 'Meera Sharma',
    featured: true,
    pinned: false,
    active: true,
  },
  {
    title: 'Recruitment Drive — Batch of 2029',
    category: 'Recruitment',
    content: 'First-year students: Dev Studio is looking for passionate developers, designers, and tech enthusiasts. No prior experience required — just curiosity and commitment. Applications open through the Join Us page.',
    image: '',
    publishedAt: '2026-09-15',
    author: 'Sneha Gowda',
    featured: false,
    pinned: false,
    active: true,
  },
  {
    title: 'Open Source Contribution Week',
    category: 'Initiative',
    content: 'This week we are running an open source contribution challenge. Members who submit accepted PRs to any public repository earn points on the Dev Studio leaderboard. Top contributors win exclusive merchandise.',
    image: '',
    publishedAt: '2026-09-10',
    author: 'Ishita Reddy',
    featured: false,
    pinned: false,
    active: true,
  },
  {
    title: 'Workshop Recordings Now Available',
    category: 'Resources',
    content: 'All recordings from the Cloud Computing 101 and Design Thinking Sprint workshops are now available on our Resources page. Access them anytime to review the material at your own pace.',
    image: '',
    publishedAt: '2026-09-05',
    author: 'Priya Menon',
    featured: false,
    pinned: false,
    active: true,
  },
];

const resourcesData = [
  {
    title: 'Modern Full-Stack Roadmap 2026',
    description: 'A comprehensive curriculum covering React 19, TypeScript, Node.js microservices, Docker containerization, and modern deployment pipelines.',
    category: 'Web Development',
    thumbnail: '',
    externalUrl: 'https://roadmap.sh/full-stack',
    downloadableFileUrl: '',
    author: 'Arjun Nair',
    date: new Date('2026-01-15'),
  },
  {
    title: 'GSAP 3 & Creative Web Animations Handbook',
    description: 'Master ScrollTrigger, FLIP animations, timeline orchestration, and 60fps micro-interactions for award-winning digital experiences.',
    category: 'Design & Interaction',
    thumbnail: '',
    externalUrl: 'https://gsap.com/docs/v3/',
    downloadableFileUrl: '',
    author: 'Divya Shetty',
    date: new Date('2026-01-20'),
  },
  {
    title: 'Docker & Kubernetes for College Projects',
    description: 'Step-by-step guide to containerizing multi-tier applications, writing docker-compose specs, and deploying on lightweight cloud instances.',
    category: 'DevOps & Cloud',
    thumbnail: '',
    externalUrl: 'https://docs.docker.com/get-started/',
    downloadableFileUrl: '',
    author: 'Vikram Hegde',
    date: new Date('2026-02-05'),
  },
  {
    title: 'Computer Vision & Deep Learning Primer',
    description: 'Hands-on notebook collection walking through CNNs, OpenCV image processing, and FastAPI model inference servers.',
    category: 'AI & ML',
    thumbnail: '',
    externalUrl: 'https://pytorch.org/tutorials/',
    downloadableFileUrl: '',
    author: 'Rahul Patel',
    date: new Date('2026-02-12'),
  },
  {
    title: 'Design Systems & Figma Component Architectures',
    description: 'Principles of atomic design tokens, accessibility contrast standards, and creating scalable UI kits for developer handoff.',
    category: 'Design & Interaction',
    thumbnail: '',
    externalUrl: 'https://www.figma.com/best-practices/design-systems-guide/',
    downloadableFileUrl: '',
    author: 'Ananya Bhat',
    date: new Date('2026-02-18'),
  },
  {
    title: 'Cross-Platform Mobile with Flutter 3',
    description: 'Architecting maintainable stateful applications with BLoC/Provider, native hardware plugins, and Firebase offline synchronization.',
    category: 'Mobile Development',
    thumbnail: '',
    externalUrl: 'https://flutter.dev/docs',
    downloadableFileUrl: '',
    author: 'Nikhil Shenoy',
    date: new Date('2026-03-01'),
  },
  {
    title: 'Competitive Programming & Algorithms Toolkit',
    description: 'Curated list of graph algorithms, dynamic programming patterns, and template solutions for technical interview rounds.',
    category: 'Algorithms',
    thumbnail: '',
    externalUrl: 'https://cp-algorithms.com/',
    downloadableFileUrl: '',
    author: 'Karthik Rao',
    date: new Date('2026-03-08'),
  },
  {
    title: 'Open Source Contribution Starter Pack',
    description: 'Learn Git rebase workflows, squash commits, writing clear pull request descriptions, and finding good first issues.',
    category: 'Open Source',
    thumbnail: '',
    externalUrl: 'https://opensource.guide/how-to-contribute/',
    downloadableFileUrl: '',
    author: 'Ishita Reddy',
    date: new Date('2026-03-14'),
  },
];

const seedData = async () => {
  try {
    console.log('Clearing existing collections...');
    await User.deleteMany();
    await Member.deleteMany();
    await Project.deleteMany();
    await Announcement.deleteMany();
    await Event.deleteMany();
    await Resource.deleteMany();

    console.log('Creating Superadmin...');
    const admin = new User({
      name: 'Admin User',
      email: 'admin@devstudio.com',
      password: 'password123',
      role: 'superadmin',
    });
    await admin.save();

    console.log(`Seeding ${teamData.length} team members...`);
    const createdMembers = await Member.insertMany(teamData);

    // Link some created members to projects
    const arjun = createdMembers.find(m => m.name === 'Arjun Nair');
    const divya = createdMembers.find(m => m.name === 'Divya Shetty');
    const rahul = createdMembers.find(m => m.name === 'Rahul Patel');
    const ishita = createdMembers.find(m => m.name === 'Ishita Reddy');

    const mappedProjects = projectsData.map(p => {
      const proj = { ...p };
      if (p.slug === 'campus-connect' && arjun && divya) {
        proj.teamMembers = [arjun._id, divya._id];
      } else if (p.slug === 'neurovision' && rahul) {
        proj.teamMembers = [rahul._id];
      } else if (p.slug === 'open-collab' && ishita) {
        proj.teamMembers = [ishita._id];
      }
      return proj;
    });

    console.log(`Seeding ${mappedProjects.length} projects...`);
    await Project.insertMany(mappedProjects);

    console.log(`Seeding ${eventsData.length} events...`);
    await Event.insertMany(eventsData);

    console.log(`Seeding ${announcementsData.length} announcements...`);
    await Announcement.insertMany(announcementsData);

    console.log(`Seeding ${resourcesData.length} resources...`);
    await Resource.insertMany(resourcesData);

    console.log('✅ Comprehensive Data Seeded Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
