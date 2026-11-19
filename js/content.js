/* Centralized content: every editable piece of the site lives here (the Admin Panel will manage this object later). */
window.SITE={
name:"Raja Hamza Pervaiz",
email:"rajahamza.parvaiz@gmail.com",
profileImage:"assets/profile-placeholder.svg",
social:{linkedin:"https://www.linkedin.com/in/rajahamzapervaiz/",email:"mailto:rajahamza.parvaiz@gmail.com",portfolio:"portfolio.html"},
indicators:["3.5+ Years of SEO Experience","SaaS, Affiliate & Lead Generation","Traditional Search + AI Search"],
stats:[
{to:3.5,dec:1,suffix:"+ Years",label:"Professional SEO Experience"},
{to:200,dec:0,suffix:"K+",label:"Organic Visitors at Peak on VPNRanks"},
{to:140,dec:0,suffix:"K+",label:"Organic Visitors at Peak on All About AI"},
{to:10,dec:0,suffix:"X",label:"Year-over-Year Affiliate Sales Growth on VPNRanks (2023 vs. 2022)"}],
statsNote:"Each figure comes from an individual project. They are not combined website traffic.",
highlights:[{icon:"chart",t:"Data-Driven SEO Decisions"},{icon:"target",t:"Business-Focused Strategies"},{icon:"spark",t:"Continuous Search Innovation"}],
services:[
{icon:"gear",t:"Technical SEO",d:"Website audits, crawlability, indexation, site architecture, Core Web Vitals, structured data, and technical performance improvements."},
{icon:"doc",t:"On-Page SEO",d:"Search intent optimization, metadata, heading structures, internal linking, content improvements, and keyword mapping."},
{icon:"net",t:"Semantic SEO & Topical Authority",d:"Entity optimization, topical maps, semantic keyword research, content clusters, and comprehensive topic coverage."},
{icon:"link",t:"Off-Page SEO & Digital PR",d:"Editorial backlinks, relevant outreach, authority building, digital PR campaigns, and competitor backlink analysis."},
{icon:"pin",t:"Local & Multi-Location SEO",d:"Google Business Profile optimization, location pages, local citations, local keyword targeting, and multi-location visibility."},
{icon:"ai",t:"GEO, AEO & AI Search Optimization",d:"AI search visibility, entity presence, structured content, answer optimization, and improving brand mentions and citations across AI-powered search platforms."}],
projects:[
{slug:"vpnranks",name:"VPNRanks",cat:"VPN, Privacy & Cybersecurity",img:"assets/project-vpnranks.svg",alt:"VPNRanks website preview placeholder",
d:"Worked on an established affiliate website focused on VPN reviews, comparisons, and privacy-related content.",
m:["200K+ peak monthly organic visitors","DR 63","10X YoY affiliate sales growth (2023 vs. 2022)"],
c:"Technical SEO, content optimization, keyword research, topical authority, internal linking, and link-building initiatives."},
{slug:"all-about-ai",name:"All About AI",cat:"Artificial Intelligence & Technology",img:"assets/project-all-about-ai.svg",alt:"All About AI website preview placeholder",
d:"Contributed to an AI and technology publication focused on organic search growth and topical coverage.",
m:["140K+ peak monthly organic visitors","DR 74","Editorial backlink from Forbes"],
c:"Semantic SEO, keyword research, content optimization, topical authority, and technical SEO."},
{slug:"medical-lien-management",name:"Medical Lien Management",cat:"Healthcare & Lead Generation",img:"assets/project-medical-lien-management.svg",alt:"Medical Lien Management website preview placeholder",
d:"Worked on a healthcare-focused lead-generation website targeting competitive medical lien management searches.",
m:["DR 25"],c:"Commercial keyword targeting, content optimization, technical SEO, and authority building."},
{slug:"greensense-billing",name:"GreenSense Billing",cat:"Medical Billing & Lead Generation",img:"assets/project-greensense-billing.svg",alt:"GreenSense Billing website preview placeholder",
d:"Worked on a healthcare service website focused on improving organic visibility for medical billing-related searches.",
m:["DR 13"],c:"Commercial keyword research, service-page optimization, content strategy, and SEO improvements."}],
toolkit:[
{t:"SEO Research & Analysis",i:["Ahrefs","SEMrush","Google Search Console","Google Analytics 4"]},
{t:"Technical SEO",i:["Screaming Frog","Google Tag Manager","PageSpeed Insights","Core Web Vitals"]},
{t:"Website & Content Management",i:["WordPress","Elementor","Rank Math","Yoast SEO","Next.js"]},
{t:"Reporting & Analytics",i:["Looker Studio","GA4 Explore","Google Search Console"]}],
industries:[{icon:"cloud",t:"SaaS & Technology"},{icon:"ai",t:"AI & Emerging Technologies"},{icon:"shield",t:"VPN & Cybersecurity"},{icon:"heart",t:"Healthcare"},{icon:"users",t:"Medical Lead Generation"},{icon:"link",t:"Affiliate Websites"}]
};

/* Portfolio page data. Admin Panel fields: name, url, summary/detail, category, thumb, image, contrib, metrics, order, published. */
window.SITE.portfolio={
categories:[{id:"affiliate-saas",label:"Affiliate & SaaS SEO"},{id:"healthcare",label:"Healthcare & Lead Generation SEO"},{id:"technical-geo",label:"Technical SEO, GEO & AEO"}],
projects:[
{id:"vpnranks",order:1,published:true,type:"site",category:"affiliate-saas",name:"VPNRanks",url:"vpnranks.com",industry:"VPN, Privacy & Cybersecurity",
summary:"Worked on organic growth for a competitive VPN and cybersecurity affiliate website through technical SEO, content optimization, topical authority, and link-building strategies.",
contrib:["Technical SEO","Content optimization","Keyword research","Topical authority","Internal linking","Link-building initiatives"],
metrics:["200K+ peak monthly organic visitors","DR 63","10X year-over-year affiliate sales growth (2023 vs. 2022)"],thumb:"assets/project-vpnranks.svg",image:"assets/project-vpnranks.svg",alt:"VPNRanks website preview placeholder"},
{id:"all-about-ai",order:2,published:true,type:"site",category:"affiliate-saas",name:"All About AI",url:"allaboutai.com",industry:"Artificial Intelligence & Technology",
summary:"Contributed to organic search growth through semantic keyword research, content optimization, topical authority, and SEO improvements.",
contrib:["Semantic SEO","Keyword research","Content optimization","Topical authority","Technical SEO"],
metrics:["140K+ peak monthly organic visitors","DR 74","Editorial backlink from Forbes"],thumb:"assets/project-all-about-ai.svg",image:"assets/project-all-about-ai.svg",alt:"All About AI website preview placeholder"},
{id:"screenbinge",order:3,published:true,type:"site",category:"affiliate-saas",name:"ScreenBinge",url:"screenbinge.com",industry:"Entertainment & Streaming",
summary:"SEO experience involving entertainment-related search opportunities, content optimization, and organic visibility.",
contrib:["Entertainment-related search opportunities","Content optimization","Organic visibility"],metrics:[],thumb:"assets/project-screenbinge.svg",image:"assets/project-screenbinge.svg",alt:"ScreenBinge website preview placeholder"},
{id:"streamingrant",order:4,published:true,type:"site",category:"affiliate-saas",name:"StreamingRant",url:"streamingrant.com",industry:"Entertainment & Streaming",
summary:"Worked with entertainment-focused content and search optimization opportunities.",
contrib:["Entertainment-focused content","Search optimization opportunities"],metrics:[],thumb:"assets/project-streamingrant.svg",image:"assets/project-streamingrant.svg",alt:"StreamingRant website preview placeholder"},
{id:"crazystreamers",order:5,published:true,type:"site",category:"affiliate-saas",name:"CrazyStreamers",url:"crazystreamers.com",industry:"Streaming & Entertainment",
summary:"Experience with search-focused content optimization and organic growth initiatives.",
contrib:["Search-focused content optimization","Organic growth initiatives"],metrics:[],thumb:"assets/project-crazystreamers.svg",image:"assets/project-crazystreamers.svg",alt:"CrazyStreamers website preview placeholder"},
{id:"medical-lien-management",order:6,published:true,type:"site",category:"healthcare",name:"Medical Lien Management",url:"medicallienmanagement.com",industry:"Healthcare & Medical Lead Generation",
summary:"Worked on improving organic visibility for competitive medical lien management searches through commercial keyword targeting, technical SEO, and content optimization.",
contrib:["Commercial keyword targeting","Content optimization","Technical SEO","Authority building"],metrics:["DR 25"],thumb:"assets/project-medical-lien-management.svg",image:"assets/project-medical-lien-management.svg",alt:"Medical Lien Management website preview placeholder"},
{id:"greensense-billing",order:7,published:true,type:"site",category:"healthcare",name:"GreenSense Billing",url:"greensensebilling.com",industry:"Medical Billing & Healthcare",
summary:"Contributed to search optimization for medical billing services through commercial keyword research, service-page optimization, and content strategy.",
contrib:["Commercial keyword research","Service-page optimization","Content strategy","SEO improvements"],metrics:["DR 13"],thumb:"assets/project-greensense-billing.svg",image:"assets/project-greensense-billing.svg",alt:"GreenSense Billing website preview placeholder"},
{id:"virtualmojoe",order:8,published:true,type:"site",category:"healthcare",name:"VirtualMoJoe",url:"virtualmojoe.com",industry:"Healthcare & Virtual Medical Assistance",
summary:"Worked on SEO opportunities for healthcare-related virtual assistant services, including commercial and location-specific search intent.",
contrib:["Commercial search intent","Location-specific search intent"],metrics:["DR 12"],thumb:"assets/project-virtualmojoe.svg",image:"assets/project-virtualmojoe.svg",alt:"VirtualMoJoe website preview placeholder"},
{id:"technical-seo",order:9,published:true,type:"capability",category:"technical-geo",name:"Technical SEO & Website Optimization",industry:"SEO Capability",
summary:"Technical SEO experience covering crawling, indexation, XML sitemaps, robots.txt, website architecture, redirects, structured data, and Core Web Vitals.",
contrib:["Crawling and indexation","XML sitemaps and robots.txt","Website architecture","Redirects","Structured data","Core Web Vitals"],metrics:[],thumb:"assets/cap-technical-seo.svg",image:"assets/cap-technical-seo.svg",alt:"Abstract illustration of site architecture and crawl paths"},
{id:"semantic-seo",order:10,published:true,type:"capability",category:"technical-geo",name:"Semantic SEO & Topical Authority",industry:"SEO Capability",
summary:"Developed search-focused content strategies using semantic keyword research, search intent mapping, entity optimization, internal linking, and topical coverage.",
contrib:["Semantic keyword research","Search intent mapping","Entity optimization","Internal linking","Topical coverage"],metrics:[],thumb:"assets/cap-semantic-seo.svg",image:"assets/cap-semantic-seo.svg",alt:"Abstract illustration of connected topic clusters"},
{id:"geo-aeo",order:11,published:true,type:"capability",category:"technical-geo",name:"GEO, AEO & AI Search Visibility",industry:"SEO Capability",
summary:"Explored AI search optimization through entity presence, brand mentions, structured content, answer optimization, and visibility across AI-powered search platforms.",
contrib:["Entity presence","Brand mentions","Structured content","Answer optimization","Visibility across AI-powered search platforms"],metrics:[],thumb:"assets/cap-geo-aeo.svg",image:"assets/cap-geo-aeo.svg",alt:"Abstract illustration of an AI answer citing sources"}]
};

/* About page data (Admin Panel: photo, intro, journey, experience, industries, skills, tools, achievements, certifications, CTA). */
window.SITE.about={
image:"assets/profile-placeholder.svg",
imageAlt:"Portrait of Raja Hamza Pervaiz (placeholder photo)",
intro:["I'm Raja Hamza Pervaiz, an SEO Specialist with 3.5+ years of experience helping websites improve organic visibility, build topical authority, and generate sustainable search growth.","My experience spans affiliate marketing, SaaS, AI and technology, VPN and cybersecurity, and healthcare lead-generation businesses.","I enjoy understanding how different websites operate, identifying their biggest search opportunities, and developing SEO strategies that align with their business objectives."],
journey:["I started my professional journey in digital marketing with an interest in understanding <span class='hi'>how search engines connect businesses with their audiences</span>.","Over time, I developed practical SEO experience across different industries and website business models. Working with <span class='hi'>affiliate websites</span> introduced me to competitive organic search environments where content quality, topical authority, technical performance, and backlinks play important roles in growth.","My experience later expanded into <span class='hi'>healthcare and lead-generation websites</span>, where I worked on commercial keyword opportunities, service pages, location-specific searches, and strategies focused on attracting potential customers.","I've also worked with <span class='hi'>SaaS, AI, technology, and cybersecurity-related websites</span>, which helped me understand how SEO strategies need to adapt to different audiences, competition levels, and business objectives.","Today, my interests extend beyond traditional search optimization into <span class='hi'>Generative Engine Optimization (GEO)</span>, <span class='hi'>Answer Engine Optimization (AEO)</span>, and improving brand visibility across AI-powered search platforms."],
experience:[
{when:"Aug 2024 – Present",role:"Freelancer (SEO & Web Development)",org:"Professionals Techs",d:"Worked independently as a freelancer in partnership with a friend, focusing on generating web development projects. Managed websites with a strong focus on optimizing performance and enhancing user engagement. Wrote technical content covering website features, SEO implementation, and user guides, effectively translating complex development concepts into clear, accessible information for non-technical clients."},
{when:"Jan 2024 – Aug 2024",role:"Senior SEO Specialist",org:"Gaditek",d:"Led SEO strategies to improve search rankings by analyzing performance data and optimizing content. Analyzed our content strategy after it was impacted by Google's core update, identified key flaws in website structure and content quality, and reported findings to management. Aligned the revised strategy with Google's latest guidelines by enhancing E-E-A-T signals. Also managed social media to support E-E-A-T and implemented Facebook SEO strategies to boost engagement and visibility."},
{when:"May 2023 – Dec 2023",role:"SEO Executive",org:"Gaditek",d:"Conducted keyword research and implemented SEO strategies to improve website visibility. Monitored website traffic, optimized content for better performance and engagement, which resulted in increased sales. Successfully managed my team, and my contributions were acknowledged by leadership, leading to a promotion."},
{when:"Jan 2023 – Apr 2023",role:"SEO Intern",org:"Gaditek",d:"Assisted in SEO audits, keyword research, and on-page optimization to improve website rankings. Gained experience in link building and off-page strategies to boost traffic and enhance search engine visibility."}],
industriesIntro:"SEO is never one-size-fits-all. Different industries require different approaches, depending on their competition, audience, business model, and search intent.",
industries:[
{icon:"cloud",t:"SaaS & Technology",d:"Product-led content, comparison and use-case pages, and competition for commercial terms."},
{icon:"ai",t:"Artificial Intelligence",d:"Fast-moving topics and new terminology that call for broad topical coverage and credible content."},
{icon:"shield",t:"VPN & Cybersecurity",d:"Competitive review and comparison searches where trust, content quality, and authority matter."},
{icon:"heart",t:"Healthcare",d:"Trust-sensitive content, clear service pages, and location-specific search intent."},
{icon:"users",t:"Medical Lead Generation",d:"Commercial keywords and service pages built to attract potential customers."},
{icon:"link",t:"Affiliate Marketing",d:"Balancing rankings, content quality, and backlinks with commercial outcomes like affiliate sales."}],
approachIntro:"I believe effective SEO starts with understanding the business, not simply collecting keywords or chasing rankings.",
approach:[
{t:"Understand the Business Model",d:"Before developing an SEO strategy, I consider the website's business model, target audience, competition, available resources, and commercial objectives."},
{t:"Identify the Right Search Opportunities",d:"Keyword research should consider search intent, competition, ranking difficulty, and business value. The goal is to identify opportunities that can realistically contribute to organic growth."},
{t:"Build Sustainable Search Visibility",d:"I focus on technical foundations, useful content, topical authority, semantic relevance, internal linking, and high-quality backlinks to strengthen a website's organic presence."},
{t:"Measure What Matters",d:"Rankings and traffic are important indicators, but SEO performance should also be evaluated through qualified traffic, leads, affiliate sales, and other meaningful business outcomes."}],
skills:[
{icon:"gear",t:"Technical SEO",i:["Technical SEO Audits","Crawlability & Indexation","Website Architecture","Core Web Vitals","Schema Markup","XML Sitemaps & Robots.txt","Redirect Management"]},
{icon:"doc",t:"Content & On-Page SEO",i:["Search Intent Mapping","Keyword Research","Content Optimization","Semantic SEO","Entity Optimization","Topical Authority","Internal Linking"]},
{icon:"pin",t:"Authority & Local SEO",i:["Digital PR","Link Building","Competitor Backlink Analysis","Local SEO","Multi-Location SEO","Google Business Profile","Local Citations"]},
{icon:"spark",t:"AI Search Optimization",i:["Generative Engine Optimization","Answer Engine Optimization","AI Search Visibility","Entity Presence","Brand Mentions & Citations","Structured Content Optimization"]}],
tools:[
{t:"SEO Research & Analysis",i:["Ahrefs","SEMrush","Google Search Console","Google Analytics 4"]},
{t:"Technical SEO",i:["Screaming Frog","PageSpeed Insights","Google Tag Manager"]},
{t:"Content & Website Management",i:["WordPress","Elementor","Rank Math","Yoast SEO","Next.js"]},
{t:"Reporting",i:["Looker Studio","GA4 Explore"]}],
achievements:[
{name:"VPNRanks",items:[{to:200,suffix:"K+",label:"peak monthly organic visitors"},{to:10,suffix:"X",label:"year-over-year affiliate sales growth (2023 vs. 2022)"}]},
{name:"All About AI",items:[{to:140,suffix:"K+",label:"peak monthly organic visitors"},{to:74,prefix:"DR ",label:"Domain Rating"}]},
{name:"Medical Lien Management",items:[{to:25,prefix:"DR ",label:"Domain Rating"}]},
{name:"GreenSense Billing",items:[{to:13,prefix:"DR ",label:"Domain Rating"}]}],
achievementsNote:"These figures represent selected project-level achievements and are not combined website performance metrics.",
learning:"Search is constantly changing, and staying relevant requires continuous learning. I regularly follow SEO industry developments, explore emerging search technologies, and strengthen my skills through practical learning and professional certifications.",
certs:["Semrush Social Media Marketing Crash Course","Content Marketing Essentials for SEO and AI Search","On-Page SEO and AI Search Essentials","Technical SEO and AI Search Essentials","AI Visibility Essentials","Local SEO Essentials","Off-Page SEO and AI Search Essentials","Mastering Digital PR with Brian Dean"],
philosophy:["I don't believe in applying the same SEO checklist to every website.","An affiliate website, a SaaS platform, and a healthcare lead-generation business have different audiences, competitive environments, and commercial objectives.","My approach is to understand what makes each business different, identify the most valuable search opportunities, and prioritize work based on its potential impact and available resources.","Whether the opportunity is improving technical performance, expanding topical coverage, targeting competitive commercial keywords, or building visibility in AI-powered search, the strategy should always serve the bigger business objective."]
};

/* Contact page data (Admin Panel: email, LinkedIn, location, availability, intro, notification email, service descriptions, FAQ, CTA).
   endpoint: the serverless route that receives the form (see CONTACT_SETUP.md). notificationEmail is informational; the live value is the CONTACT_TO_EMAIL environment variable. */
window.SITE.contact={
endpoint:"/api/contact",
notificationEmail:"rajahamza.parvaiz@gmail.com",
introHeading:"Get in Touch",
intro:"Have a question, project, or opportunity you'd like to discuss? Reach out through any of the channels below.",
email:"rajahamza.parvaiz@gmail.com",emailLabel:"Send me an email.",
linkedin:"https://www.linkedin.com/in/rajahamzapervaiz/",linkedinLabel:"Connect with me professionally.",
location:"Karachi, Pakistan",locationLabel:"Based in Pakistan | Open to Remote Opportunities.",
availability:"Open to discussing SEO opportunities, freelance projects, collaborations, and remote positions.",
subjects:["SEO Project Inquiry","Technical SEO Consultation","GEO / AEO Consultation","Freelance Opportunity","Full-Time Job Opportunity","Agency Collaboration","General Inquiry","Other"],
budgets:["Under $500","$500–$1,000","$1,000–$2,500","$2,500–$5,000","$5,000+","Not Decided Yet","Not Applicable"],
servicesHeading:"Let's Find the Right SEO Solution.",
services:[
{icon:"chart",t:"Organic Growth & SEO Strategy",d:"For businesses looking to improve search visibility, target valuable keywords, and build sustainable organic growth."},
{icon:"gear",t:"Technical SEO",d:"For websites dealing with crawling, indexation, website architecture, performance, or technical SEO challenges."},
{icon:"ai",t:"GEO & AEO",d:"For brands looking to strengthen their presence across AI-powered search platforms, answer engines, and generative search experiences."},
{icon:"doc",t:"SEO Content & Authority Building",d:"For businesses interested in semantic SEO, topical authority, content optimization, and relevant authority-building strategies."}],
stepsHeading:"Here's What Happens Next",
steps:[
{t:"You Reach Out",d:"Send me a message with your requirements, questions, or opportunity."},
{t:"We Discuss Your Needs",d:"I review your inquiry and discuss the relevant goals, challenges, and possible next steps."},
{t:"We Explore the Opportunity",d:"If there's a good fit, we can discuss how to move forward."}],
faq:[
{q:"Are you available for freelance SEO projects?",a:"Yes, I'm open to discussing suitable freelance SEO projects and collaborations depending on the scope and requirements."},
{q:"Do you work with international clients?",a:"I'm open to remote opportunities and working with businesses and teams across different markets."},
{q:"What types of websites have you worked on?",a:"My experience includes affiliate websites, SaaS and technology platforms, VPN and cybersecurity websites, healthcare websites, and lead-generation businesses."},
{q:"Do you offer GEO and AEO services?",a:"Yes. I work with emerging AI search optimization concepts, including Generative Engine Optimization, Answer Engine Optimization, entity optimization, and AI search visibility."},
{q:"Can I contact you regarding a full-time SEO position?",a:"Absolutely. I'm open to discussing relevant full-time SEO opportunities, including remote positions and suitable agency roles."}],
cta:{heading:"Every Good Collaboration Starts With a Conversation.",text:"If you have an SEO challenge, a business opportunity, or simply want to exchange ideas about the evolving search landscape, I'd love to hear from you.",button:"Send Me a Message"}
};
