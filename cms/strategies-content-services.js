'use strict';
/* Services section: the /services overview and eight dedicated service pages (/services/<slug>).
   Rule: no invented results. The only figures are the ones supplied for VPNRanks and All About AI. Service pages describe what each service covers and
   link to the detailed strategy page where one exists, so the text does not duplicate the strategy pages. */
const H2=(text,o)=>Object.assign({type:'heading',level:'2',text,toc:true},o);
const P=text=>({type:'text',text});
const CK=(items,o)=>Object.assign({type:'list',style:'checks',items},o);
const OL=(items,o)=>Object.assign({type:'list',style:'numbered',items},o);
const CO=(tone,title,text)=>({type:'callout',tone,title,text});
const LINKEDIN='https://www.linkedin.com/in/rajahamzapervaiz/';

const SERVICES=[
 {slug:'technical-seo',name:'Technical SEO',icon:'gear',short:'Improve website crawlability, indexability, site architecture, performance, Core Web Vitals, structured data, and technical health.',
  h1:'Technical SEO Services',intro:`A technically sound website is easier for search engines to crawl, render and index, and easier for people to use. This service finds the technical issues that limit organic visibility and sets out how to fix them.`,
  covers:['Crawlability and indexation: robots.txt, XML sitemaps, canonical tags and redirects.','Website architecture and internal linking, so important pages are easy to reach.','Core Web Vitals (LCP, INP and CLS) and page performance.','Structured data and schema markup that reflects the visible content.','Duplicate content, parameter URLs and URL consistency.','Mobile usability and rendering checks.','Ongoing monitoring with Google Search Console and scheduled crawls.'],
  approach:['Crawl the website and review Google Search Console data.','Prioritize issues by their effect on the pages that matter most.','Implement fixes, or write clear briefs for developers.','Validate the changes and keep monitoring, because technical SEO is not a one-time task.'],
  strat:['/strategies/technical-seo','Technical SEO strategy'],
  seoTitle:'Technical SEO Services: Crawlability, Indexation & Core Web Vitals | Raja Hamza Pervaiz',meta:'Technical SEO services covering crawlability, indexation, site architecture, structured data and Core Web Vitals, with ongoing technical monitoring.'},
 {slug:'on-page-seo',name:'On-Page SEO',icon:'doc',short:'Optimize page content, headings, metadata, internal links, search intent, semantic relevance, and content structure.',
  h1:'On-Page SEO Services',intro:`On-page SEO makes sure each page clearly answers what the searcher wants. It aligns content, structure and metadata with search intent so that search engines and readers can both see what the page is about.`,
  covers:['Search intent analysis and keyword mapping, so each URL has a clear purpose.','Title tags, meta descriptions and heading structure.','Content structure, readability and answer-focused formatting.','Internal links with descriptive anchor text.','Semantic relevance: covering the related topics and entities a page needs.','Improving existing content rather than only publishing new pages.'],
  approach:['Map each important page to a primary search intent and keyword target.','Review the page against the results currently ranking for that intent.','Rework structure, headings, content and metadata where there are gaps.','Connect the page to related pages through internal links.'],
  strat:['/strategies/on-page-seo','On-Page SEO strategy'],
  seoTitle:'On-Page SEO Services: Content, Metadata & Search Intent | Raja Hamza Pervaiz',meta:'On-page SEO services covering search intent, keyword mapping, headings, metadata, internal links, semantic relevance and content structure.'},
 {slug:'off-page-seo',name:'Off-Page SEO & Link Building',icon:'link',short:'Build website authority through digital PR, relevant backlinks, competitor backlink analysis, outreach, and brand mentions.',
  h1:'Off-Page SEO & Link Building Services',intro:`Off-page SEO builds the authority and reputation that sit outside your own website. The focus is on earning relevant, credible references rather than manufacturing links.`,
  covers:['Competitor backlink analysis and link gap research.','Digital PR and data-led, personalized outreach.','Journalist outreach and expert commentary.','Broken link building and inclusion in relevant best-of and comparison lists.','Brand mentions and online reputation across trusted platforms.','Local citations and business listings where they apply.'],
  approach:['Analyze competitors to find relevant, authoritative opportunities.','Create or identify a resource that gives the other site a reason to reference you.','Reach out with a personalized pitch and follow up politely.','Avoid link schemes, undisclosed paid followed links and other practices that go against Google\'s spam policies.'],
  strat:['/strategies/off-page-seo','Off-Page SEO strategy'],
  seoTitle:'Off-Page SEO & Link Building Services: Digital PR & Outreach | Raja Hamza Pervaiz',meta:'Off-page SEO and link building services: competitor backlink analysis, digital PR, outreach and brand mentions, following Google\'s link spam policies.'},
 {slug:'local-seo',name:'Local SEO',icon:'pin',short:'Improve local search visibility through Google Business Profile optimization, local landing pages, location-based keyword research, citations, and local authority building.',
  h1:'Local SEO Services',intro:`Local SEO helps a business appear when nearby customers search for what it offers. It combines the website, the Google Business Profile and the wider web so that each describes the same real business accurately.`,
  covers:['Google Business Profile optimization for eligible businesses.','Location-specific landing pages that provide genuinely useful, distinct information.','Local keyword research and search intent.','Local citations with consistent name, address and phone details.','Local internal linking and schema markup.','Local performance measurement in Google Business Profile, Search Console and Google Analytics 4.'],
  approach:['Check which locations and services the business genuinely covers.','Build location pages only where there is real, useful content to publish.','Align the profile, citations and website details.','Measure calls, clicks and enquiries, not rankings alone.'],
  strat:['/strategies/local-seo','Local SEO strategy'],
  seoTitle:'Local SEO Services: Google Business Profile, Location Pages & Citations | Raja Hamza Pervaiz',meta:'Local SEO services: Google Business Profile optimization, location landing pages, local keyword research, citations and local authority building.'},
 {slug:'semantic-seo-entity-optimization',name:'Semantic SEO & Entity Optimization',icon:'net',short:'Strengthen topical relevance by identifying important entities, their attributes, and relationships, and incorporating them naturally into website content and architecture.',
  h1:'Semantic SEO & Entity Optimization Services',intro:`Search engines increasingly interpret topics through the entities involved and how they relate to each other. This service builds that understanding into a website's content and structure.`,
  covers:['Identifying the entities that matter for a topic and business.','Mapping the attributes and relationships of those entities.','Topical maps and content clusters that cover a subject thoroughly.','Working entities naturally into content, headings and internal links.','Spotting topical gaps against competing websites.','Structured data that defines the entities the website is about.'],
  approach:['Research the topic and the entities around it.','Compare the website\'s coverage with what searchers and competitors cover.','Update existing pages and plan new ones to fill the gaps.','Reinforce the relationships through site architecture and internal linking.'],
  strat:['/strategies/on-page-seo','On-Page SEO strategy'],strat2:['/strategies/geo-ai-seo','GEO & AI SEO strategy'],
  seoTitle:'Semantic SEO & Entity Optimization Services | Raja Hamza Pervaiz',meta:'Semantic SEO and entity optimization services: identify key entities, map their relationships and build topical relevance into content and site architecture.'},
 {slug:'geo-ai-search-optimization',name:'GEO & AI Search Optimization',icon:'ai',short:'Improve brand visibility across AI-powered search platforms through answer-focused content, entity optimization, topical authority, authoritative mentions, and AI search visibility analysis.',
  h1:'GEO & AI Search Optimization Services',intro:`AI-powered search experiences answer questions directly and draw on a range of sources. This service helps a brand become a clear, credible and well-understood source for the questions that matter to its audience.`,
  covers:['Answer-focused content that is easy to extract and understand.','Entity optimization, so the brand and its topics are clearly defined.','Topical authority built across a subject area.','Authoritative third-party mentions and reputation.','AI search visibility analysis: reviewing how the brand appears in AI-generated answers.','Technical foundations that keep content accessible.'],
  approach:['Review how the brand and its competitors currently appear in AI-powered search.','Improve content, entities and structure where the gaps are.','Strengthen third-party validation through mentions and reviews.','Re-check visibility over time, as AI search keeps changing.'],
  note:'GEO is an evolving area. I do not guarantee rankings or AI citations.',strat:['/strategies/geo-ai-seo','GEO & AI SEO strategy'],
  seoTitle:'GEO & AI Search Optimization Services | Raja Hamza Pervaiz',meta:'GEO and AI search optimization services: answer-focused content, entity optimization, topical authority, authoritative mentions and AI visibility analysis.'},
 {slug:'seo-audits-competitor-analysis',name:'SEO Audits & Competitor Analysis',icon:'chart',short:'Identify technical, content, on-page, and off-page opportunities through comprehensive website audits and competitor research.',
  h1:'SEO Audit & Competitor Analysis Services',intro:`An SEO audit shows where a website currently stands and what is holding it back. Competitor research shows where the opportunities are, so the recommendations are prioritized rather than a long, undifferentiated list.`,
  covers:['Technical audit: crawlability, indexation, site structure, performance and structured data.','Content audit: quality, gaps, overlap and search intent alignment.','On-page audit: metadata, headings, internal links and page structure.','Off-page audit: backlink profile and brand mentions.','Competitor research across keywords, content and backlinks.','A prioritized set of findings and recommendations.'],
  approach:['Crawl the website and gather Search Console and analytics data.','Review the pages and the competitors in the same search results.','Group the findings by impact and effort.','Turn them into a prioritized roadmap.'],
  strat:['/strategies/technical-seo','Technical SEO strategy'],
  seoTitle:'SEO Audits & Competitor Analysis Services | Raja Hamza Pervaiz',meta:'SEO audit and competitor analysis services covering technical health, content, on-page and off-page opportunities, with prioritized recommendations.'},
 {slug:'keyword-research-content-strategy',name:'Keyword Research & Content Strategy',icon:'target',short:'Identify search opportunities based on intent, competition, business relevance, topical gaps, and commercial potential. Develop content strategies that support topical authority and organic growth.',
  h1:'Keyword Research & Content Strategy Services',intro:`Good keyword research starts with the business, not a tool. This service identifies the searches worth targeting and turns them into a content plan that supports topical authority.`,
  covers:['Keyword research based on search intent and business relevance.','Competition and commercial potential for each opportunity.','Topical gap analysis against competing websites.','Keyword mapping, so each page has a distinct target.','Content strategy: what to publish, in what order and how pages connect.','Content clusters that support topical authority.'],
  approach:['Understand the business, audience and goals.','Research the searches, the competition and the gaps.','Group keywords by intent and map them to pages.','Prioritize the content plan by business value.'],
  strat:['/strategies/on-page-seo','On-Page SEO strategy'],
  seoTitle:'Keyword Research & Content Strategy Services | Raja Hamza Pervaiz',meta:'Keyword research and content strategy services: intent-based research, topical gap analysis, keyword mapping and content plans that support topical authority.'}
];

const page=sv=>{const links=[[sv.strat,'Strategy']].concat(sv.strat2?[[sv.strat2,'Strategy']]:[]);
 const blocks=[
  H2('What this service covers',{id:'covers',eyebrow:'Scope',lead:''}),CK(sv.covers),
  H2('How I approach it',{id:'approach',eyebrow:'Approach'}),OL(sv.approach)];
 blocks.push(CO('principle','Read the full methodology',`This service follows my ${links.map(l=>`[${l[0][1]}](${l[0][0]})`).join(' and ')}${links.length>1?', which explain':', which explains'} the methodology in detail.`));
 if(sv.note)blocks.push(CO('caution','A note on expectations',sv.note));
 return{kind:'strategy',section:'services',slug:sv.slug,title:sv.name,breadcrumb:sv.name,toc:false,byline:false,
  heroEyebrow:'SEO SERVICE',heroHeading:sv.h1,heroIntro:sv.intro,
  heroButtons:[{label:'Discuss Your Project',href:'/contact',style:'primary'},{label:'Explore My Work',href:'/portfolio',style:'ghost'}],
  blocks,closeHeading:`Discuss Your ${sv.name} Project`,closeText:'Tell me about your website, your audience and your goals, and we can talk about whether this service is the right fit.',
  closeButtons:[{label:`Let's Talk About Your Project`,href:'/contact',style:'primary'},{label:'All SEO Services',href:'/services',style:'ghost'}],
  relatedHeading:'Related strategies, work and contact',
  related:links.map(l=>({group:'Strategy',label:l[0][1],text:'The methodology behind this service, explained in detail.',href:l[0][0]})).concat([{group:'Portfolio',label:'Portfolio and case studies',text:'See how I have applied SEO on real websites.',href:'/portfolio'},{group:'Contact',label:'Discuss your project',text:'Tell me about your website and goals.',href:'/contact'}]),
  cardTitle:sv.name,cardText:sv.short,cardFocus:[],cardCta:'Explore service',cardIcon:sv.icon,
  seoTitle:sv.seoTitle,metaDescription:sv.meta,canonical:'',noindex:false,nofollow:false,ogTitle:'',ogDescription:'',ogImage:''}};

const overview={kind:'overview',section:'services',slug:'overview',title:'SEO Services',breadcrumb:'Services',toc:false,byline:false,
 heroEyebrow:'SEO SERVICES',heroHeading:'SEO Services for Sustainable Organic Growth',
 heroIntro:`I help businesses improve search visibility, attract relevant traffic and generate organic leads. My work spans technical SEO, content, authority building, local search and AI-powered search, built around each website's goals and audience.`,
 heroButtons:[{label:'Discuss Your Project',href:'/contact',style:'primary'},{label:'Explore My Work',href:'/portfolio',style:'ghost'}],
 blocks:[
  H2('What I Can Help With',{id:'services',toc:false,eyebrow:'Services',lead:'Eight services that cover the main areas of SEO. Each has its own page.'}),
  {type:'cards',columns:'4',cards:SERVICES.map(sv=>({icon:sv.icon,title:sv.name,text:sv.short,href:'/services/'+sv.slug,linkLabel:'Explore Service'}))},
  H2('My SEO Approach',{id:'approach',toc:false,eyebrow:'Process',lead:'Every project starts with understanding the business, and keeps improving after launch.'}),
  {type:'process',title:'',steps:[
   {t:'Research & Discovery',d:'Understand the business, audience, competitors and search landscape.'},
   {t:'SEO Audit',d:'Identify technical issues, content gaps and growth opportunities.'},
   {t:'Strategy Development',d:'Build a prioritized SEO roadmap based on business objectives.'},
   {t:'Implementation',d:'Execute technical, on-page, off-page and content optimization.'},
   {t:'Monitoring & Improvement',d:'Track performance, analyze results and continuously refine the strategy.'}],caption:''},
  H2('Industries I Work With',{id:'industries',toc:false,eyebrow:'Experience',lead:'Experience across these types of website and business.'}),
  {type:'cards',columns:'4',cards:[{icon:'cloud',title:'SaaS and Technology'},{icon:'ai',title:'Artificial Intelligence'},{icon:'shield',title:'VPN and Cybersecurity'},{icon:'heart',title:'Healthcare and Medical Services'},{icon:'target',title:'Medical Lead Generation'},{icon:'globe',title:'Affiliate and Content Websites'},{icon:'users',title:'Service-Based Businesses'}]},
  H2('Why Work With Me?',{id:'why',toc:false,eyebrow:'Strengths'}),
  {type:'cards',columns:'3',cards:[
   {icon:'award',title:'3.5+ years of hands-on SEO',text:'Practical experience across audits, content, authority building and optimization.'},
   {icon:'layers',title:'Affiliate and lead generation',text:'Experience with both affiliate websites and lead-generation websites, which have different goals.'},
   {icon:'gear',title:'Technical and semantic SEO',text:'An understanding of technical SEO and semantic content optimization, and how they support each other.'},
   {icon:'pin',title:'Local and multi-location SEO',text:'Experience with local SEO and multi-location websites.'},
   {icon:'ai',title:'GEO, AEO and AI search',text:'Knowledge of GEO, AEO and AI-powered search visibility.'},
   {icon:'chart',title:'Data-driven decisions',text:'Decisions based on data, with continuous optimization rather than one-off fixes.'}]},
  H2('Selected Results',{id:'results',toc:false,eyebrow:'Verified achievements'}),
  {type:'cards',columns:'2',cards:[
   {icon:'chart',tag:'Affiliate website',title:'VPNRanks',text:'200K+ peak monthly organic visits and 10X year-over-year affiliate sales growth (2023 vs. 2022).',href:'/portfolio/vpnranks',linkLabel:'View the case study'},
   {icon:'award',tag:'Affiliate website',title:'All About AI',text:'140K+ peak monthly organic visits and a Forbes editorial backlink.',href:'/portfolio/all-about-ai',linkLabel:'View the case study'}]},
  P('These figures describe the individual projects and are not a promise of future results.'),
  H2('Tools & Platforms',{id:'tools',toc:false,eyebrow:'Toolkit'}),
  {type:'tools',title:'',items:['Google Search Console','Google Analytics 4','Ahrefs','Semrush','Screaming Frog','Google Tag Manager','Looker Studio','WordPress'].map(n=>({name:n,image:'',alt:''}))},
  H2('Frequently Asked Questions',{id:'faq',toc:false,eyebrow:'FAQ'}),
  {type:'faq',title:'',items:[
   {q:'What SEO services do you offer?',a:'I offer [technical SEO](/services/technical-seo), [on-page SEO](/services/on-page-seo), [off-page SEO and link building](/services/off-page-seo), [local SEO](/services/local-seo), [semantic SEO and entity optimization](/services/semantic-seo-entity-optimization), [GEO and AI search optimization](/services/geo-ai-search-optimization), [SEO audits and competitor analysis](/services/seo-audits-competitor-analysis), and [keyword research and content strategy](/services/keyword-research-content-strategy).'},
   {q:'Which industries do you work with?',a:'SaaS and technology, artificial intelligence, VPN and cybersecurity, healthcare and medical services, medical lead generation, affiliate and content websites, and service-based businesses.'},
   {q:'Do you provide technical SEO audits?',a:'Yes. A technical audit reviews crawlability, indexation, site structure, performance, Core Web Vitals and structured data. Broader [SEO audits](/services/seo-audits-competitor-analysis) also cover content, on-page and off-page opportunities and include competitor research.'},
   {q:'Do you offer local SEO services?',a:'Yes. Local SEO covers Google Business Profile optimization, location landing pages, local keyword research, citations and local authority building. See [local SEO](/services/local-seo) for details.'},
   {q:'What is GEO and AI search optimization?',a:'GEO is about improving a brand\'s visibility in AI-powered search platforms. It uses answer-focused content, entity optimization, topical authority, authoritative mentions and AI search visibility analysis. It does not guarantee rankings or citations. See [GEO and AI search optimization](/services/geo-ai-search-optimization).'},
   {q:'How do you measure SEO performance?',a:'I use Google Search Console, Google Analytics 4 and tools such as Ahrefs and Semrush, and look at the measures that matter to the business, such as organic traffic, visibility, enquiries and conversions. Rankings alone do not show business success.'},
   {q:'How long does SEO take to produce results?',a:'It depends on the competition, the website\'s current condition, the content and its authority. SEO is generally gradual, and I do not promise specific results or timeframes. After an audit I can give a more realistic picture for your situation.'},
   {q:'Do you work with international businesses?',a:'Yes. I work remotely from Karachi, Pakistan, so location is not a barrier to working together. Tell me about your markets and goals on the [contact page](/contact).'}]}
 ],
 closeHeading:'Ready to Talk About Your SEO Goals?',closeText:'Tell me about your website, your audience and what you want to achieve, and we can discuss how SEO could support it.',
 closeButtons:[{label:`Let's Talk About Your Project`,href:'/contact',style:'primary'},{label:'LinkedIn Profile',href:LINKEDIN,style:'ghost'}],
 relatedHeading:'',related:[],cardTitle:'',cardText:'',cardFocus:[],cardCta:'',cardIcon:'layers',
 seoTitle:'SEO Services: Technical, On-Page, Off-Page, Local & AI Search | Raja Hamza Pervaiz',
 metaDescription:'SEO services including technical SEO, on-page SEO, link building, local SEO, semantic SEO, GEO and AI search, audits and content strategy.',
 canonical:'',noindex:false,nofollow:false,ogTitle:'',ogDescription:'',ogImage:''};

module.exports={SERVICE_PAGES:[overview].concat(SERVICES.map(page))};
