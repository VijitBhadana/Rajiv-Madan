// All static content for the website lives here.
// Edit text, phone numbers or lists in this file - components read from it.

export const contact = {
  phone: "(905) 362-2200",
  phoneHref: "tel:+19053622200",
  region: "Mississauga & Greater Toronto Area",
};

// Social profiles - shown in the top bar, the profile card and the footer.
// icon = key of the react-icons map in components/SocialLinks.jsx
export const socials = [
  { label: "Facebook", icon: "facebook", href: "https://www.facebook.com/RajivMadanCPA" },
  { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/rajivmadancpa/" },
  { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/in/rajivmadancpa/" },
  { label: "YouTube", icon: "youtube", href: "https://www.youtube.com/@RajivMadanCPA" },
  { label: "TikTok", icon: "tiktok", href: "https://www.tiktok.com/@rajivmadancpa" },
];

export const topBar = {
  badge: "Corporate Tax Season Open",
  message: "T2 Filings, Financial Statements & Year-End Advisory Active",
};

export const brand = {
  name: "Rajiv Madan",
  legalName: "CPA Professional Corporation",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "/about" }, // separate page
  { label: "Services", href: "/services" }, // separate page
  { label: "Blog & Updates", href: "/blog" }, // separate page
  { label: "Careers", href: "/careers" }, // separate page
  { label: "Contact", href: "/contact" }, // separate page
];

export const hero = {
  badges: [
    { icon: "shield", label: "Certified CPA Ontario" },
    { icon: "check", label: "Intuit QuickBooks ProAdvisor" },
    { icon: "pin", label: "Mississauga, Toronto, Brampton & GTA" },
  ],
  eyebrow: "Developers of Creative Business Solutions",
  title: "Smart Financial & Tax Solutions",
  titleLead: "for Your",
  // Typed one after another at the end of the hero heading
  typedWords: ["Growing Business", "Small Business", "New Startup", "Corporation"],
  description:
    "Experienced accounting, meticulous payroll management, and proactive corporate tax strategies tailored for owner-operators and businesses across Mississauga and the Greater Toronto Area.",
  secondaryCta: "Explore Consulting Services",
  credentials: [
    { title: "CPA", subtitle: "Chartered Ontario" },
    { title: "CA", subtitle: "Chartered Institute" },
    { title: "CGA", subtitle: "Certified General" },
    { title: "QuickBooks", subtitle: "Certified ProAdvisor" },
  ],
  card: {
    title: "Rajiv Madan Professional Corp",
    subtitle: "Licensed Public Accounting Practice",
    status: "Active Fiscal Advisor",
    stats: [
      { label: "Experience", value: "15+ Yrs", note: "Serving Greater Toronto Area", accent: false },
      { label: "Compliance", value: "100%", note: "On-Time Filing Guarantee", accent: true },
      { label: "Penalties", value: "Zero", note: "Late CRA Penalty Track Record", accent: false },
      { label: "Client Care", value: "5-Star", note: "Verifiable Regional Reputation", accent: true },
    ],
    footerLabel: "Speak Directly With Rajiv",
    footerButton: "Book Call",
  },
};

// About section - text taken from the original "About Rajiv" page
export const about = {
  pageTitle: "About Us",
  pageSubtitle: "Over 25 years of simple, organized and dependable accounting and tax services for individuals and businesses across the GTA.",
  eyebrow: "About Us",
  title: "Meet Rajiv Madan",
  name: "Rajiv Madan",
  role: "Certified General Accountant, Mississauga",
  experience: "25+",
  designations: "CGA (Canada) · CA (India)",
  office: "Office in Mississauga, Ontario",
  airport: "~5 minutes from Pearson Airport",
  paragraphs: [
    "Rajiv Madan is a Certified General Accountant operating from Mississauga, Canada. In addition to his CGA designation in Canada he also holds a Chartered Accountant designation from India. He has been actively involved in creating and delivering performance assuring business solutions for individuals and organizations for over 25 years.",
    "Rajiv's office is located in Mississauga. This office is approximately five minutes away from the Lester B. Pearson international airport. He assists individuals and businesses alike for all kinds of accounting and tax services. His clientele is based in Mississauga, Brampton, Etobicoke, Woodbridge but extends to core of Toronto downtown, Hamilton, Burlington, Caledon, Markham and Scarborough.",
    "Although accounting, bookkeeping and taxation are sensitive matters, Rajiv throughout his career has maintained in keeping things simple yet organized. Creating unnecessary clutter and complexities is an absolute avoidance when it comes to adopting an approach to your business.",
  ],
  promise: "It is Rajiv's promise to provide you courteous and dependable accounting and tax services.",
};

export const coreServices = {
  eyebrow: "Financial Consulting",
  title: "Core Accounting & Advisory",
  description:
    "Dependable, high-standard business solutions designed to optimize operational efficiency and maximize profit retention.",
  highlight: "Advisory",
  cta: "Book a Consultation",
  items: [
    {
      icon: "book",
      color: "blue",
      title: "Book Keeping & Accounting",
      text: "Top-notch bookkeeping and meticulous accounting services known as one of the best service providers in the Greater Toronto Area.",
      link: "Accurate Ledgers",
    },
    {
      icon: "receipt",
      color: "green",
      title: "Payrolls, Taxes & Filing",
      text: "Reliable corporate & personal tax filing across Mississauga and Toronto. Rajiv Madan makes payroll management and taxes simple and fast.",
      link: "Zero Penalties",
    },
    {
      icon: "building",
      color: "indigo",
      title: "Start-up Business Registration",
      text: "Setting up a new business in Toronto? We guide you through corporate registration, tax IDs, and establishing clean accounting right from Day 1.",
      link: "Seamless Launch",
    },
    {
      icon: "chart",
      color: "teal",
      title: "Controllership Services",
      text: "Experienced, high-level controllership duties managed by a professional Mississauga accountant for organizations of any business size.",
      link: "Executive Oversight",
    },
  ],
};

export const whatWeDo = {
  badge: "Mississauga & GTA Dedicated",
  title: "What We Do",
  description:
    "We are renowned Mississauga Accountants providing complete accounting services: Bookkeeping, Financial Statements Preparation, New Business Startup, Registration in Canada, Tax Advisory, Payroll Management & Administration, General Accounting, and Personal & Corporate Tax Filing.",
  promiseLabel: "Our Promise:",
  promise:
    "Dedicated customer service and a rock-solid GTA reputation built over years of delivering dependable, high-quality accounting in a timely manner.",
  profile: {
    name: "Rajiv Madan",
    role: "CPA, CA, CGA • Principal Managing Accountant",
    quote:
      "“Direct partner attention for every client. We protect your enterprise from compliance risks so you can lead with absolute financial clarity.”",
  },
};

export const capabilities = {
  eyebrow: "Performance & Reliability",
  title: "Our Capabilities",
  description: "Strategic business support tailored to your unique financial profile",
  // icon = key of the react-icons map in components/Capabilities.jsx
  items: [
    {
      icon: "award",
      color: "blue",
      tag: "Quality Assurance",
      title: "Assistance You Can Trust",
      text: "Looking for a reliable CGA in Mississauga who provides quality assistance? We customize accounting services according to your specific individual & corporate needs.",
    },
    {
      icon: "stopwatch",
      color: "amber",
      tag: "Zero Delays",
      title: "Fast and Timely Services",
      text: "Fed up of delayed services hurting business reputation? Switch to our rapid solution. You will never need to run after getting your books or filings done on time.",
    },
    {
      icon: "piggy-bank",
      color: "green",
      tag: "Tax Optimization",
      title: "We Maximize Your Savings",
      text: "Our priority is securing maximum savings for individuals and businesses through accurate filings. Even a minor oversight can cost thousands later; we prevent that.",
    },
    {
      icon: "chart-line",
      color: "indigo",
      tag: "Scalable Architecture",
      title: "Growth of Your Business",
      text: "Taxing, Accounting, and Payroll can be a complex burden. We take care of operational complexities so you can focus entirely on scaling revenue and operations.",
    },
    {
      icon: "calculator",
      color: "teal",
      tag: "Cloud Bookkeeping",
      title: "Real-Time Books",
      text: "Monthly bank reconciliations, categorized transactions and clean ledgers in QuickBooks Online or Xero, so you always know where your business stands.",
    },
    {
      icon: "statement",
      color: "rose",
      tag: "Financial Reporting",
      title: "Year-End Financial Statements",
      text: "Compilation (Notice to Reader) financial statements prepared accurately and on schedule for your banks, investors, landlords and CRA filings.",
    },
    {
      icon: "landmark",
      color: "sky",
      tag: "CRA Representation",
      title: "Audit & Review Support",
      text: "Received a CRA review letter or audit notice? We prepare the documentation, respond on your behalf and resolve the matter with minimal disruption.",
    },
    {
      icon: "payroll",
      color: "amber",
      tag: "Payroll Compliance",
      title: "Payroll & Source Deductions",
      text: "Accurate CPP, EI and income tax remittances, T4 and T4A slips and Records of Employment, so your team is paid right and you stay penalty-free.",
    },
    {
      icon: "receipt-tax",
      color: "green",
      tag: "Indirect Tax",
      title: "GST/HST Filings",
      text: "Registration, monthly, quarterly or annual GST/HST returns and input tax credit reviews, so you claim every credit you are entitled to.",
    },
    {
      icon: "building",
      color: "violet",
      tag: "Corporate Tax",
      title: "T2 Corporate Returns",
      text: "Complete T2 preparation with schedules, T5 dividend slips and salary-versus-dividend planning to keep more profit inside your corporation.",
    },
    {
      icon: "user-tie",
      color: "blue",
      tag: "Personal Tax",
      title: "T1 Personal Returns",
      text: "Personal, self-employed and rental income returns with RRSP, FHSA and family credit optimization, filed on time every year.",
    },
    {
      icon: "handshake",
      color: "indigo",
      tag: "Fractional CFO",
      title: "Controllership & Advisory",
      text: "Budgeting, cash-flow forecasting and KPI reporting from a seasoned CPA, giving you CFO-level insight without a full-time salary.",
    },
  ],
};

export const advantages = {
  eyebrow: "Why Retain Our Practice",
  title: "Firm Advantages",
  items: [
    {
      title: "Efficiency & Accuracy",
      text: "Proven track record providing quality service to all clients with meticulous general ledger precision.",
    },
    {
      title: "Maximum Value",
      text: "Uncompromising timeliness ensuring zero late filing penalties and maximized corporate deductions.",
    },
    {
      title: "Single Roof Solution",
      text: "Ability to manage and provide all financial, payroll, and controllership needs seamlessly.",
    },
    {
      title: "GTA - Wide Coverage",
      text: "Dedicated services covering Toronto, Mississauga, Brampton, and Vaughan commercial sectors.",
    },
  ],
};

// Shown on the testimonial wheel. Only the first entry is a real client quote -
// the rest are SAMPLE TEXT: replace them with genuine client testimonials (or
// delete them) before the site goes live.
export const testimonials = {
  label: "Client Testimonial",
  wheelLabel: "Client Stories",
  items: [
    {
      rating: 5,
      quote:
        "“We have been getting assistance from Rajiv Madan, CGA in GTA area for over 4 years. The thing we like the most is consistency in service we get. Always got timely statements, instant on answering emails and phone calls and quality advice. Thanks Rajiv for your great services…”",
      author: "Restaurant Owner",
      location: "Brampton, Ontario",
    },
    {
      rating: 5,
      quote:
        "“Rajiv took over our corporate books mid-year and had our T2 and financial statements filed well ahead of the deadline. Clear advice, no surprises, and he always picks up the phone.”",
      author: "Construction Company Owner",
      location: "Mississauga, Ontario",
    },
    {
      rating: 5,
      quote:
        "“As a newly incorporated business we had no idea where to start. Rajiv set up our bookkeeping, payroll and HST filings and explained every step in plain language.”",
      author: "Tech Startup Founder",
      location: "Toronto, Ontario",
    },
    {
      rating: 5,
      quote:
        "“Our family has trusted Rajiv with our personal returns for years. He finds every credit we qualify for and makes tax season completely stress-free.”",
      author: "Family Tax Client",
      location: "Vaughan, Ontario",
    },
    {
      rating: 5,
      quote:
        "“The monthly reporting gives us a real picture of our cash flow. It is like having a CFO on the team without the full-time cost.”",
      author: "Retail Business Owner",
      location: "Oakville, Ontario",
    },
    {
      rating: 5,
      quote:
        "“When the CRA reviewed our filings, Rajiv handled everything calmly and professionally. Every document was in order and the review closed quickly.”",
      author: "Trucking Company Owner",
      location: "Brampton, Ontario",
    },
    {
      rating: 5,
      quote:
        "“Payroll, T4s and remittances are handled on time, every time. I can focus on running my clinic instead of worrying about deadlines.”",
      author: "Dental Clinic Owner",
      location: "Etobicoke, Ontario",
    },
    {
      rating: 5,
      quote:
        "“Responsive, knowledgeable and genuinely invested in our growth. The year-end planning alone saved us more than the fees.”",
      author: "Real Estate Investor",
      location: "Markham, Ontario",
    },
  ],
};

export const cta = {
  eyebrow: "Immediate Accounting Assistance",
  title: "Speak directly with Rajiv Madan today",
  description: "Get tailored corporate accounting advice and seamless tax compliance for your business.",
};

export const footer = {
  about:
    "Developers of Creative Business Solutions. Serving Mississauga, Toronto, Brampton, Vaughan, and the Greater Toronto Area.",
  columns: [
    {
      title: "Practice Pillars",
      links: [
        "Book Keeping & Accounting",
        "Corporate & Personal Taxes",
        "Start-up Registration Canada",
        "Controllership & Fractional Advisory",
        "Financial Statements (Notice to Reader)",
      ],
    },
    {
      title: "Coverage Areas",
      links: [
        "Mississauga & Meadowvale",
        "Toronto & Downtown Core",
        "Brampton & Commercial Sector",
        "Vaughan & Oakville Area",
        "Ontario Wide Consultations",
      ],
    },
  ],
  governance: {
    title: "Professional Governance",
    text: "Chartered Professional Accountants of Ontario (CPA Ontario) Licensed Public Practice Firm.",
    chips: ["CPA Ontario", "QuickBooks"],
  },
  copyright: "© 2025 Rajiv Madan CPA Professional Corporation. All Rights Reserved.",
  legal: ["Privacy Policy", "Terms of Engagement"],
};

// ===== Services page (/services) =====
// Images are Unsplash photo ids (https://unsplash.com/photos/...), loaded from images.unsplash.com
const serviceExtras = [
  {
    image: "1460925895917-afdab827c52f",
    imageAlt: "Laptop showing financial dashboards",
    points: ["Monthly bank reconciliations", "QuickBooks & Xero setup", "Payables & receivables", "Monthly financial reports"],
  },
  {
    image: "1554224154-26032ffc0d07",
    imageAlt: "Tax forms, calculator and coffee on a desk",
    points: ["CPP, EI & tax remittances", "T4 / T4A slips & ROEs", "T1 & T2 tax returns", "GST/HST filings"],
  },
  {
    image: "1600880292203-757bb62b4baf",
    imageAlt: "Small business team celebrating at work",
    points: ["Federal & Ontario incorporation", "CRA business number & HST", "Payroll account setup", "Clean books from Day 1"],
  },
  {
    image: "1551836022-d5d88e9218df",
    imageAlt: "Advisor meeting with a client",
    points: ["Budgets & cash-flow forecasts", "Month-end close", "KPI reporting", "Internal controls"],
  },
];

export const servicesPage = {
  banner: {
    image: "1554224155-6726b3ff858f",
    title: "Services",
    heading: "Accounting & Tax Services That",
    highlight: "Keep You Ahead",
    text: "From day-to-day bookkeeping to corporate tax and controllership, Rajiv Madan delivers simple, organized and dependable financial services for individuals and businesses across the GTA.",
    secondaryCta: "View all services",
  },
  featured: coreServices.items.map((item, i) => ({
    tag: "Core Service",
    badge: item.link,
    title: item.title,
    text: item.text,
    ...serviceExtras[i],
  })),
  offer: {
    eyebrow: "Complete Coverage",
    title: "Everything Your Business Needs",
    text: "One trusted CPA for every accounting, tax and advisory requirement.",
  },
  areas: {
    image: "1517090504586-fde19ea6066f",
    eyebrow: "Areas We Serve",
    title: "Trusted Across the Greater Toronto Area",
    cities: [
      "Mississauga",
      "Brampton",
      "Etobicoke",
      "Woodbridge",
      "Toronto Downtown",
      "Hamilton",
      "Burlington",
      "Caledon",
      "Markham",
      "Scarborough",
    ],
  },
};

// ===== Blog page (/blog) =====
// excerpt = text shown on the blog listing; body = paragraphs on the post page
export const blog = {
  banner: {
    image: "1497366216548-37526070297c",
    title: "Blog & Updates",
    text: "Practical accounting and tax insights for individuals and businesses in Mississauga, Brampton and the GTA.",
  },
  posts: [
    {
      slug: "searching-for-a-good-business-accountant",
      category: "Business Accounting",
      title: "Searching for a good business accountant?",
      image: "1521791136064-7986c2920216",
      imageAlt: "Accountant shaking hands with a client",
      excerpt:
        "If you have come here searching for a good business accountant in Mississauga area, then you have reached the right place, Rajiv Madan can assure you that ever work under the supervision of Rajiv will be completed on time and with utmost attention. We have heard horror stories where people tell us how their previous…",
      body: [
        "If you have come here searching for a good business accountant in Mississauga area, then you have reached the right place, Rajiv Madan can assure you that ever work under the supervision of Rajiv will be completed on time and with utmost attention.",
      ],
    },
    {
      slug: "small-business-accountants",
      category: "Small Business",
      title: "Small Business Accountants",
      image: "1556761175-5973dc0f32e7",
      imageAlt: "Small business team in a meeting",
      excerpt:
        "The best small business accountant in Mississauga is here to help you with his solid work ethics and a powerful team of professionals. With the growth of small business industry, the needs/demand arises for specialized accounting that caters to their needs specifically. With our personalized approach for each individual, we can offer a rare experience…",
      body: [
        "The best small business accountant in Mississauga is here to help you with his solid work ethics and a powerful team of professionals. With the growth of small business industry, the needs/demand arises for specialized accounting that caters to their needs specifically.",
        "With our personalized approach for each individual, we can offer a rare experience.",
      ],
    },
    {
      slug: "accountant-in-brampton",
      category: "Brampton",
      title: "Accountant in Brampton",
      image: "1486406146926-c627a92ad1ab",
      imageAlt: "Modern office towers",
      excerpt:
        "Rajiv Madan is a professionally known Brampton accountant with many years of experience and offers end to end accounting solutions including accounting, audit, tax, and advisory services plus Business Tax Planning, Assurance Services, Accounting & Payroll Services and Financial Planning Services, Business Setup Services and much more. Rajiv has a fully equipped office with ultra…",
      body: [
        "Rajiv Madan is a professionally known Brampton accountant with many years of experience and offers end to end accounting solutions including accounting, audit, tax, and advisory services plus Business Tax Planning, Assurance Services, Accounting & Payroll Services and Financial Planning Services, Business Setup Services and much more.",
      ],
    },
  ],
};

// ===== Careers page (/careers) =====
// email: REPLACE with the firm's real careers / office email before going live.
// jobs[].category must match one of the filters (except "All").
export const careers = {
  email: "careers@rajivmadancpa.com",
  banner: {
    image: "1521791136064-7986c2920216",
    title: "Careers",
    heading: "Build Your Career in",
    highlight: "Accounting & Tax",
    text: "Looking for a great career in accounting, taxation or book keeping, we would like to hear from you. We are an equal opportunity employer and promote excellence in workplace.",
    secondaryCta: "View open roles",
  },
  perks: [
    { icon: "mentor", title: "Learn from a CPA, CA", text: "Work directly with Rajiv Madan and learn from 25+ years of hands-on practice experience." },
    { icon: "growth", title: "Real Career Growth", text: "Support for CPA PEP studies, exam leave and a clear path from junior to senior roles." },
    { icon: "tools", title: "Modern Cloud Tools", text: "QuickBooks Online, Xero, TaxPrep and CRA online services - no outdated paper workflows." },
    { icon: "people", title: "Inclusive Workplace", text: "An equal opportunity employer that values respect, excellence and a healthy work-life balance." },
  ],
  filters: ["All", "Accounting", "Tax", "Bookkeeping & Payroll", "Students"],
  jobs: [
    {
      icon: "briefcase",
      category: "Accounting",
      title: "Senior Accountant (CPA)",
      type: "Full-time",
      experience: "5+ years",
      text: "Lead client files end to end - year-end close, Notice to Reader financial statements and T2 returns - and review the work of junior staff.",
      skills: ["CPA designation", "Financial statements", "File review"],
    },
    {
      icon: "landmark",
      category: "Accounting",
      title: "Chartered Accountant - Advisory & Controllership",
      type: "Full-time",
      experience: "4+ years",
      text: "Deliver controllership for owner-managed businesses: budgets, cash-flow forecasts, KPI reporting and month-end close oversight.",
      skills: ["CA / CPA", "Forecasting", "Client advisory"],
    },
    {
      icon: "calculator",
      category: "Accounting",
      title: "Staff Accountant",
      type: "Full-time",
      experience: "2+ years",
      text: "Prepare working papers, journal entries, bank and HST reconciliations and draft compilation engagements for a varied client base.",
      skills: ["Reconciliations", "Working papers", "Excel"],
    },
    {
      icon: "receipt",
      category: "Tax",
      title: "Corporate Tax Specialist (T2)",
      type: "Full-time",
      experience: "3+ years",
      text: "Prepare T2 returns with schedules, T5 slips and salary-versus-dividend planning, and help respond to CRA review letters.",
      skills: ["T2 & T5", "TaxPrep / CCH", "Tax planning"],
    },
    {
      icon: "file",
      category: "Tax",
      title: "Personal Tax Preparer (T1)",
      type: "Seasonal (Jan - Apr)",
      experience: "1+ year",
      text: "Prepare personal, self-employed and rental income returns, optimize RRSP, FHSA and family credits, and meet clients during tax season.",
      skills: ["T1 returns", "EFILE", "Client service"],
    },
    {
      icon: "book",
      category: "Bookkeeping & Payroll",
      title: "Full-Cycle Bookkeeper",
      type: "Full-time / Part-time",
      experience: "2+ years",
      text: "Maintain clean ledgers in QuickBooks Online and Xero - payables, receivables, bank feeds and monthly management reports.",
      skills: ["QuickBooks Online", "Xero", "GST/HST returns"],
    },
    {
      icon: "wallet",
      category: "Bookkeeping & Payroll",
      title: "Payroll Administrator",
      type: "Full-time",
      experience: "2+ years",
      text: "Run payroll for multiple clients, calculate CPP, EI and tax remittances, and issue T4, T4A slips and Records of Employment.",
      skills: ["Source deductions", "T4 / ROE", "Payroll software"],
    },
    {
      icon: "graduate",
      category: "Students",
      title: "CPA Student (PEP)",
      type: "Full-time",
      experience: "0 - 2 years",
      text: "Gain practical experience towards your CPA designation across bookkeeping, tax and financial reporting, with study support.",
      skills: ["Enrolled in CPA PEP", "Eager to learn", "Accounting degree"],
    },
    {
      icon: "sparkles",
      category: "Students",
      title: "Accounting Co-op / Intern",
      type: "Internship (4 - 8 months)",
      experience: "Students",
      text: "Support the team with data entry, reconciliations and tax-season preparation while learning how a public practice runs.",
      skills: ["Accounting student", "Attention to detail", "Excel basics"],
    },
  ],
  process: {
    eyebrow: "How to Apply",
    title: "A Simple Hiring Process",
    steps: [
      { title: "Send Your Resume", text: "Email us your resume and the role you are interested in." },
      { title: "Introductory Call", text: "A short call to learn about your experience and goals." },
      { title: "Meet the Team", text: "An in-person interview at our Mississauga office with a practical task." },
      { title: "Welcome Aboard", text: "Receive your offer and start with a structured onboarding plan." },
    ],
  },
  apply: {
    title: "Apply Today for a great opportunity.",
    text: "Don't see a role that fits? Send us an email anyway - we are always happy to hear from talented people.",
    button: "Send us an email",
  },
};

// ===== Contact page (/contact) =====
// The form has no backend: "Send message" opens the visitor's email app
// with the details pre-filled, addressed to `email` below.
export const contactPage = {
  banner: {
    image: "1497366216548-37526070297c",
    title: "Contact",
    heading: "Let's Talk About",
    highlight: "Your Numbers",
    text: "Questions about bookkeeping, payroll, corporate or personal tax? Reach out by phone, email or the form below - or visit our Mississauga office, minutes from Pearson Airport.",
  },
  address: {
    lines: ["2980 Drew Road, Unit # 237", "Mississauga, ON L4T 0A7", "Canada"],
    query: "2980 Drew Road Unit 237, Mississauga, ON L4T 0A7, Canada",
  },
  phone: "905-362-2200",
  phoneHref: "tel:+19053622200",
  fax: "905-362-1555",
  email: "rajiv@rajivmadan.ca",
  form: {
    eyebrow: "Send a Message",
    title: "Tell us how we can help",
    text: "Share a few details and Rajiv will get back to you personally.",
    // Shown in the "I need help with" dropdown
    topics: [
      "Book Keeping & Accounting",
      "Payrolls, Taxes & Filing",
      "Corporate Tax (T2)",
      "Personal Tax (T1)",
      "Start-up Business Registration",
      "Controllership Services",
      "Something else",
    ],
  },
};
