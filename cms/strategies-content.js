'use strict';
/* Starting content for the three strategy pages, written from the owner's methodology brief.
   It is imported into the database once (cms/strategies-seed.js) and is edited from Admin > Strategies afterwards.
   Rule for this file: no invented results, statistics or case-study numbers. */
const H2=(text,o)=>Object.assign({type:'heading',level:'2',text,toc:true},o);
const H3=(text,o)=>Object.assign({type:'heading',level:'3',text,toc:false},o);
const P=text=>({type:'text',text});
const UL=(items,o)=>Object.assign({type:'list',style:'bullets',items},o);
const CK=(items,o)=>UL(items,Object.assign({style:'checks'},o));
const OL=(items,o)=>UL(items,Object.assign({style:'numbered'},o));
const CO=(tone,title,text)=>({type:'callout',tone,title,text});

/* ============================================================ OVERVIEW */
const overview={kind:'overview',slug:'overview',title:'Strategies Overview',breadcrumb:'Strategies',toc:false,byline:false,
 heroEyebrow:'MY SEO METHODOLOGIES',
 heroHeading:'SEO Strategies Built Around Search Intent, Topical Authority & AI Visibility',
 heroIntro:`Effective SEO goes beyond optimizing individual pages for keywords. It requires understanding search intent, building topical depth, establishing authority, and creating content that satisfies users and search engines.

I approach SEO through structured strategies that combine technical foundations, semantic optimization, content architecture, authority building, and emerging AI search practices.

My objective is to build sustainable organic visibility while aligning SEO activities with actual business goals.`,
 heroButtons:[{label:'Explore My Strategies',href:'#featured-strategies',style:'primary'},{label:'View My Portfolio',href:'/portfolio',style:'ghost'}],
 blocks:[
  H2('Featured Strategies',{id:'featured-strategies',eyebrow:'Dedicated strategy pages',lead:'Each strategy is explained step by step, with practical examples, diagrams and content structures.'}),
  {type:'strategies',label:'Strategy'},
  H2('Overall SEO Strategy Framework',{id:'framework',eyebrow:'How the disciplines fit together',lead:'Technical SEO, research, content architecture, on-page optimization, internal linking and off-page authority work together rather than operating independently.'}),
  {type:'hub',title:'SEO framework: disciplines that reinforce each other',center:'Organic & AI Search Visibility',ring:'loop',nodes:['Technical SEO Foundation','Keyword and Intent Research','Content Architecture','On-Page and Semantic Optimization','Internal Linking','Off-Page Authority'],
   caption:'The numbers suggest a typical reading order, but the disciplines overlap and feed each other. Performance insights feed back into keyword research, and off-page authority depends on the quality of the content it points to.'},
  CO('principle','An interconnected framework, not a rigid sequence','A technical issue can undermine good content, and strong content can go unnoticed without internal links and authority signals. I treat the disciplines as one connected system and move between them as the data and the business goals require.'),
  {type:'table',caption:'How each discipline contributes to the framework',columns:['Discipline','Role in the framework','How it connects to the rest'],rows:[
   'Technical SEO foundation | Makes the website crawlable, indexable and easy to use | Everything else depends on search engines and AI systems being able to reach and process the content',
   'Keyword and intent research | Identifies what people search for and what they expect to find | Informs the content architecture and the on-page structure of every page',
   'Content architecture | Decides which pages exist and how topics are grouped into pillar and supporting content | Shapes the internal linking and gives on-page work a structure to follow',
   'On-page and semantic optimization | Structures each page around intent, entities and related topics | Gives pages the depth that authority signals can then reinforce',
   'Internal linking | Connects related pages and passes authority to important ones | Turns individual pages into a connected topical resource',
   'Off-page authority | Builds credibility through backlinks, editorial coverage, reviews and discussions | Reinforces the content and brand signals created by the other disciplines',
   'Organic and AI search visibility | The outcome: rankings, mentions and citations | Results feed back into research and optimization, so the framework is a continuous loop']}
 ],
 closeHeading:'Want to See These Strategies in Practice?',
 closeText:'Explore my portfolio to see how I have applied these SEO methodologies across affiliate, technology, healthcare, and lead-generation websites.',
 closeButtons:[{label:'Explore My Portfolio',href:'/portfolio',style:'primary'},{label:`Let's Connect`,href:'/contact',style:'ghost'}],
 relatedHeading:'',related:[],
 cardTitle:'',cardText:'',cardFocus:[],cardCta:'',cardIcon:'',
 seoTitle:'SEO Strategies & Methodologies | Raja Hamza Pervaiz',
 metaDescription:'Explore my SEO strategies: search intent, semantic and on-page SEO, topical authority, and GEO and AEO methods for visibility in AI-powered search.',
 canonical:'',noindex:false,nofollow:false,ogTitle:'',ogDescription:'',ogImage:''};

/* ============================================================ ON-PAGE SEO */
const onpage={kind:'strategy',slug:'on-page-seo',title:'On-Page SEO Strategy – Search Intent, Semantic SEO & Topical Authority',breadcrumb:'On-Page SEO',toc:true,byline:true,
 heroEyebrow:'MY ON-PAGE SEO METHODOLOGY',
 heroHeading:'On-Page SEO Strategy – Optimize for Search Intent, Not Just Keywords',
 heroIntro:`My approach to on-page SEO starts with understanding the intent behind a keyword rather than focusing solely on keyword placement or density.

I structure content around a single primary keyword, supporting secondary keyword variations, and relevant LSI terms to satisfy search intent, build semantic relevance, and establish topical depth.

The objective is to create content that comprehensively answers the primary query, addresses related search intents, demonstrates subject-matter expertise, and provides a better user experience without keyword stuffing.`,
 heroButtons:[{label:'Explore My Methodology',href:'#search-intent',style:'primary'},{label:'View Related Projects',href:'/portfolio',style:'ghost'}],
 blocks:[
  /* 2 */ H2('Understand the Intent Behind Every Keyword',{id:'search-intent',eyebrow:'Keyword strategy: target intent, not just keywords'}),
  P(`A keyword is not just a string of words. It is an expression of a user need: someone wants an answer, a solution, a comparison or a product. When content targets a keyword without understanding what the searcher expects to find, it can rank poorly, or fail to satisfy the visitors it does attract.`),
  UL(['Analyze the search intent behind every target keyword.','Understand what users are actually looking for.','Identify the information, solution, or product they expect.','Examine search results to understand the dominant content format.','Ensure the content fully satisfies the relevant search intent.'],{title:'My approach'}),
  P(`Every distinct keyword intent should receive an appropriate answer. I avoid creating content simply to accommodate additional keyword variations. The objective is to satisfy user needs, not to increase keyword frequency.`),
  {type:'compare',title:'Two ways of working from the same keyword',leftTitle:'Traditional keyword-focused approach',leftTone:'bad',leftSteps:['Keyword insertion','Repetition','Keyword density'],rightTitle:'My intent-focused approach',rightTone:'good',rightSteps:['Keyword research','Intent analysis','Content mapping','Comprehensive answers','Semantic depth'],caption:'The first approach optimizes for a metric. The second optimizes for the reader’s need, which is what a page ultimately has to satisfy.'},
  CO('principle','Read the results before writing','Examining what already ranks shows the dominant content format (a list, a guide, a comparison or a product page) and the questions searchers expect to see answered. I use that to inform the structure of a page, not to copy competitors.'),

  /* 3 */ H2('One Primary Keyword Per Page to Maintain a Clear Target',{id:'primary-keyword',eyebrow:'Keyword strategy'}),
  P(`Every page needs a clear target. When one page tries to rank for several unrelated primary keywords, its content loses focus, and different pages on the same website can end up competing for overlapping search intents. A single primary keyword gives the page one central subject and one primary search intent to satisfy.`),
  UL(['Identify one primary keyword that represents the central subject and primary search intent.','Ensure the page is primarily optimized around this topic.','Avoid assigning multiple unrelated primary keywords to the same page.','Map closely related but distinct topics to separate pages where appropriate.','Use the primary keyword as the central reference point for the content structure.'],{title:'My methodology'}),
  P(`The objective is to maintain a clear topical focus and reduce unnecessary competition between pages targeting overlapping search intents.`),
  {type:'keywordmap',title:'Example: one primary keyword and its supporting structure',primaryLabel:'Primary keyword',primary:'Best Medical Billing Companies',groups:[
   {label:'Supporting variations',tone:'sky',items:['Top Medical Billing Companies','Leading Medical Billing Companies','Best Medical Billing Service Providers']},
   {label:'Related supporting topics',tone:'lav',items:['Medical Billing Services','Medical Billing Costs','Medical Billing Software','How to Choose a Medical Billing Company']}],
   caption:'The primary topic is “Best Medical Billing Companies”. The supporting terms stay relevant to it: they deepen the page and never turn it into an unrelated collection of keywords.'},

  /* 4 */ H2('Use Secondary Keywords to Reinforce the Primary Topic',{id:'secondary-keywords',eyebrow:'Keyword strategy'}),
  P(`Secondary keywords are generally variations of the primary keyword: different wording that keeps the same or a closely related meaning and intent. People describe the same need in different ways, and these variations help the page cover the different ways users express it.`),
  {type:'keywordmap',title:'Example: secondary keyword variations',primaryLabel:'Primary keyword',primary:'Best Medical Billing Companies',groups:[{label:'Secondary keyword variations',tone:'sky',items:['Top Medical Billing Companies','Leading Medical Billing Companies','Best Medical Billing Service Providers','Top Medical Billing Services']}]},
  CO('principle','Important distinction','Secondary keywords are not a reason to create separate sections for every minor wording variation. I integrate them naturally wherever they fit the content, and I avoid keyword stuffing and unnatural repetition.'),

  /* 5 */ H2('Use Relevant LSI Terms to Expand Topical Coverage',{id:'lsi-terms',eyebrow:'Semantic depth'}),
  P(`Where secondary keywords restate the primary topic, LSI keywords and semantically related terms expand beyond it. They introduce related concepts, subtopics, entities and additional user questions, which is what establishes subject-matter depth.`),
  {type:'keywordmap',title:'Example: supporting topics for “Best Medical Billing Companies”',primaryLabel:'Primary keyword',primary:'Best Medical Billing Companies',groups:[{label:'Relevant supporting topics',tone:'mint',items:['Medical Billing Services','Revenue Cycle Management','Medical Coding','Claims Processing','Denial Management','Healthcare Billing Software','Medical Billing Costs','Medical Billing Company Selection Criteria']}]},
  P(`These supporting topics must be relevant to the primary subject and its associated user needs. I do not include unrelated terms merely to increase topical coverage.`),
  CO('note','A note on the term “LSI”','I use “LSI” as a practical content-planning term for semantically related topics and concepts. It is not a claim that search engines use a specific “LSI keyword” ranking factor.'),

  /* 6 */ H2('Structure Content Around Primary and Secondary Search Intent',{id:'primary-secondary-content',eyebrow:'Content structure',lead:'This is one of the most important parts of my on-page SEO methodology.'}),
  H3('Primary content',{id:'primary-content'}),
  P(`Primary content directly addresses the main search intent behind the primary keyword. It must:`),
  UL(['Appear immediately after the introduction.','Provide a direct answer to the main query.','Be comprehensive and sufficiently detailed.','Address the central topic before introducing supporting information.','Use the first H2 to clearly represent the primary search intent.']),
  H3('Example: “Best Movies on HBO Max”',{id:'hbo-max-example'}),
  P(`The primary keyword is “Best Movies on HBO Max”. The first H2 repeats the primary intent, and individual recommendations sit under descriptive H3 headings. Only then does the page move on to secondary topics.`),
  {type:'hierarchy',title:'Content structure: primary content first, secondary content second',rows:[
   {level:'1',text:'Best Movies on HBO Max',tag:'primary'},
   {level:'0',text:'Introduction: briefly introduces the list and directly establishes what the reader will find.',tag:'primary'},
   {level:'2',text:'Best Movies on HBO Max',tag:'primary',note:'The first H2 clearly represents the primary search intent.'},
   {level:'3',text:'A descriptive H3 for each movie recommendation',tag:'primary',note:'Individual recommendations are organized under descriptive H3 headings.'},
   {level:'2',text:'How to Choose the Best Movies on HBO Max',tag:'secondary'},
   {level:'2',text:'What Genres Are Available on HBO Max?',tag:'secondary'},
   {level:'2',text:'Are There New Movies on HBO Max?',tag:'secondary'},
   {level:'2',text:'How Often Does HBO Max Update Its Movie Library?',tag:'secondary'}],
   caption:'The primary intent is addressed in detail before secondary topics are introduced.'},
  H3('Secondary content',{id:'secondary-content'}),
  P(`After satisfying the primary intent, I introduce supporting content guided by relevant LSI terms and related search intents. Each distinct supporting topic gets a dedicated H2 where appropriate.

The purpose of secondary content is to expand topical coverage without distracting from the primary search intent.`),
  CO('principle','Order matters','Primary intent first, supporting intent second. A reader, and a search engine, should see the main query answered before the page moves on to related questions.'),

  /* 7 */ H2('Give Every Distinct Supporting Intent Its Own Section',{id:'supporting-intents',eyebrow:'Content structure'}),
  P(`When a supporting LSI term represents a distinct user question or search intent, it should be addressed through a dedicated heading and answered directly. This is the process I follow:`),
  OL(['Identify relevant supporting terms.','Understand the intent behind each term.','Group closely related terms where they share the same intent.','Create a dedicated H2 for each distinct supporting topic.','Answer that topic directly and sufficiently.','Avoid unnecessary sections that do not contribute to the main subject.']),
  {type:'table',caption:'Illustrative example: what earns its own H2 (primary keyword: Best Medical Billing Companies)',columns:['Supporting term','Distinct intent?','How I handle it'],rows:[
   'Top Medical Billing Companies | No: same intent as the primary keyword | Use naturally in the primary content and headings where it fits',
   'Leading Medical Billing Companies | No: a wording variation | Integrate naturally, with no separate heading',
   'Medical Billing Costs | Yes: a separate question about pricing | A dedicated H2 that answers the question directly',
   'How to Choose a Medical Billing Company | Yes: a decision-making question | A dedicated H2 with the selection criteria',
   'Medical Billing Software | Yes, if it matches what readers of this page want | A dedicated H2, or a link to a separate page when it needs more depth']},
  CO('principle','One rule for headings','A dedicated H2 should represent a meaningful topic or intent, not merely a different wording of an existing heading. I do not create separate headings for every minor keyword variation.'),

  /* 8 */ H2('Strategic Primary Keyword Placement',{id:'keyword-placement',eyebrow:'Placement framework'}),
  P(`I follow a standard placement framework so the primary keyword is clearly signalled in the locations that matter, using natural language and prioritizing readability.`),
  {type:'wireframe',title:'Where the primary keyword appears on a page',rows:[
   {kind:'url',where:'URL slug',text:'example.com/**best-medical-billing-companies**'},
   {kind:'meta-title',where:'Meta title',text:'**Best Medical Billing Companies**: How We Compared the Providers'},
   {kind:'meta-desc',where:'Meta description',text:'Looking for the **best medical billing companies**? See how we evaluated providers, what to compare and how to choose the right fit for your practice.'},
   {kind:'h1',where:'H1',text:'**Best Medical Billing Companies**'},
   {kind:'intro',where:'Introduction',text:'Choosing among the **best medical billing companies** starts with knowing what your practice needs. Here is how the leading options compare.'},
   {kind:'h2',where:'First H2',text:'**Best Medical Billing Companies**'},
   {kind:'mention',where:'3 to 4 contextual mentions',text:'Additional natural mentions in body paragraphs, tables and supporting sections, wherever the phrase reads naturally.'},
   {kind:'conclusion',where:'Conclusion',text:'Choosing one of the **best medical billing companies** comes down to the criteria that matter most to your practice.'}],
   caption:'Illustrative example copy. The keyword is highlighted here to show placement; on a real page it reads as ordinary language.'},
  CK(['URL slug','Meta title','Meta description','H1','Introduction','First H2','Conclusion','Three to four additional contextual mentions throughout the content'],{title:'The primary keyword appears naturally in'}),
  {type:'compare',title:'Strategic placement versus keyword stuffing',leftTitle:'Keyword stuffing',leftTone:'bad',leftSteps:['Keyword forced into every heading','Repeated mechanically','Awkward sentences written for a crawler'],rightTitle:'Strategic placement',rightTone:'good',rightSteps:['Placed where it fits naturally','Readable language comes first','Clear signals in the key locations']},
  P(`The framework is a guide, not a quota. If the exact keyword does not fit a heading or a sentence naturally, I rephrase rather than force it.`),

  /* 9 */ H2('Build Semantic Relevance Beyond Exact-Match Keywords',{id:'semantic-seo',eyebrow:'Semantic SEO'}),
  P(`Semantic SEO is the process of organizing content around related concepts, entities, attributes and contextual relationships, rather than around exact-match keywords alone. It helps establish a clearer understanding of the subject and the context that surrounds it.`),
  UL(['Identifying important entities related to the primary subject.','Including relevant terminology and concepts.','Covering supporting topics that explain the main subject.','Connecting related concepts naturally within the content.','Maintaining contextual relevance across headings and paragraphs.','Linking related pages across the website.'],{title:'My approach includes'}),
  {type:'hub',title:'Example: entity relationships around “Medical Billing Companies”',center:'Medical Billing Companies',ring:'chain',nodes:['Medical Billing Services','Medical Coding','Claims Processing','Revenue Cycle Management','Denial Management'],caption:'Each related concept adds context. Together they contribute to a broader understanding of the primary topic.'},

  /* 10 */ H2('Build Topical Depth Within Every Content Piece',{id:'topical-depth',eyebrow:'Topical depth'}),
  P(`Topical depth should not be limited to the overall website. Each individual article should cover its primary topic comprehensively through:`),
  UL(['Direct answers to the primary query.','Relevant supporting topics.','Related concepts and entities.','Important subtopics.','Supporting statistics.','Credible references.','Relevant examples.','Useful comparisons.']),
  P(`The aim is for a page to become a genuinely useful resource on its subject, rather than a collection of keyword-focused paragraphs.`),
  {type:'flow',title:'From primary topic to comprehensive content',columns:[
   {title:'Primary Topic',items:['The direct answer to the main query']},
   {title:'Secondary Topics',items:['Supporting topics and related intents']},
   {title:'Related Entities',items:['Concepts, brands, products and terminology']},
   {title:'Supporting Evidence',items:['Statistics, references, examples and comparisons']},
   {title:'Comprehensive Content',items:['A genuinely useful resource on the subject']}]},

  /* 11 */ H2('Topical Authority Is Built Across the Website, Not Through Isolated Articles',{id:'topical-authority',eyebrow:'Website-level authority'}),
  P(`Topical depth also has to exist at website level. A single strong article rarely establishes authority on its own. Interconnected content clusters that cover a subject from several angles demonstrate broader subject-matter coverage.`),
  UL(['Identify the website’s core subject areas.','Develop pillar pages around primary topics.','Create supporting articles covering related subtopics.','Connect relevant articles through contextual internal links.','Ensure commercial pages are supported by relevant informational content.','Expand content coverage around the website’s main services and business objectives.'],{title:'My approach'}),
  {type:'tiers',title:'Example: a healthcare lead-generation topical cluster',tiers:[
   {label:'Pillar page',tone:'pillar',items:['Medical Billing: The Complete Guide'],arrow:'contextual internal links'},
   {label:'Supporting articles',tone:'support',items:['Supporting Article 1: What Is Revenue Cycle Management?','Supporting Article 2: How Claims Processing Works','Supporting Article 3: How to Reduce Claim Denials'],arrow:'relevant links to the service page'},
   {label:'Commercial page',tone:'commercial',items:['Medical Billing Services']}],
   caption:'Illustrative example. Informational content supports the commercial page, and the pages link to each other contextually, so the website covers a subject rather than a single keyword.'},
  P(`A commercial page that stands alone has little context around it. Surrounding it with relevant informational content, and linking the two, shows the breadth of knowledge behind the service being offered.`),

  /* 12 */ H2('Strengthen E-E-A-T Through Authenticity, Expertise and Transparency',{id:'eeat',eyebrow:'Trust'}),
  P(`Content should demonstrate genuine expertise and give clear signals about who created it and why users should trust it.`),
  {type:'cards',columns:'3',cards:[
   {icon:'user',title:'Authentic author profiles',text:'Real people with verifiable expertise.',points:['Real author identities','Complete biographies','Links to genuine professional profiles']},
   {icon:'shield',title:'Transparency',text:'Readers can see how recommendations are made.',points:['Selection criteria','Research process','Commercial disclosures']},
   {icon:'award',title:'Authoritative references',text:'Important claims are backed by credible sources.',points:['Industry references','Research and statistics','Expert commentary']}]},
  H3('Authentic Author Profiles',{id:'author-profiles'}),
  UL(['Use real author identities.','Create complete author biographies.','Include relevant professional experience and expertise.','Link author profiles to genuine social media accounts and professional platforms.','Maintain active, authentic profiles on relevant platforms.','Ensure author information is consistent across the website and professional profiles.']),
  CO('caution','What I do not do','I do not create fictional author identities, fabricated credentials or artificial expert profiles.'),
  H3('Transparency',{id:'transparency'}),
  P(`Readers should understand how information is produced and how recommendations are made. For an article titled “Best Medical Billing Companies”, I include a dedicated section such as **How We Selected the Best Medical Billing Companies**, which explains the evaluation methodology: the criteria used, the research process, the available evidence and the limitations.`),
  UL(['Research methodology.','Selection criteria.','Evaluation process.','Sources of information.','Commercial relationships or affiliate disclosures.'],{title:'Where relevant, I disclose'}),
  P(`The objective is to help readers understand why a recommendation is being made.`),
  H3('Authoritative References and Supporting Evidence',{id:'references'}),
  UL(['Credible industry references.','Research publications.','Authoritative statistics.','Relevant expert commentary.','Direct quotations from recognized subject-matter experts.','Sources that substantiate factual claims.']),
  P(`Reliable supporting evidence strengthens content credibility and helps readers verify important information for themselves.`),

  /* 13 */ H2('Use Internal Linking to Distribute Authority and Strengthen Topic Relationships',{id:'internal-linking',eyebrow:'Internal linking'}),
  P(`Internal links serve both users and search engines. For users they provide the next logical step; for search engines they show how pages relate and which pages matter most.`),
  UL(['Connect pillar pages with supporting articles.','Link informational content to relevant commercial pages.','Use contextual anchor text.','Prioritize links from relevant, high-authority pages.','Ensure important pages receive sufficient internal links.','Make important content accessible through logical site architecture.'],{title:'My approach'}),
  {type:'tiers',title:'How internal authority flows',tiers:[
   {label:'High-authority page',tone:'pillar',items:['A pillar page or established page that already carries authority'],arrow:'contextual links with relevant anchor text'},
   {label:'Supporting pages',tone:'support',items:['Informational article','Informational article','Comparison content'],arrow:'relevant links to the page that converts'},
   {label:'Commercial landing pages',tone:'commercial',items:['Service page','Lead-generation page']}],
   caption:'Links from high-authority pages can help distribute internal PageRank (often informally called “link juice”) and support the discovery and crawling of important pages.'},
  CO('principle','Relevance over link counts','I emphasize contextual relevance rather than arbitrary link counts. A link should help a reader move to something genuinely related.'),

  /* 14 */ H2('Make Content Easy to Read, Navigate and Understand',{id:'readability',eyebrow:'User experience'}),
  P(`Even comprehensive content can fail users if it is difficult to read. This is how I format content so people can find what they need.`),
  {type:'cards',columns:'3',cards:[
   {icon:'layers',title:'Short paragraphs',text:'Break long paragraphs into smaller, focused sections to improve readability.'},
   {icon:'doc',title:'Descriptive subheadings',text:'Use meaningful H2 and H3 headings to help users navigate content and locate specific answers.'},
   {icon:'check',title:'Bullet points',text:'Use bullet points to present lists, features, benefits and important information clearly.'},
   {icon:'chart',title:'Tables',text:'Use tables for comparisons, specifications, pricing information and other information that is easier to understand in a structured format.'},
   {icon:'user',title:'Clear language',text:'Avoid unnecessary jargon, repetitive explanations and overly complicated sentences.'}]},
  {type:'beforeafter',title:'Poorly structured versus readable content',beforeLabel:'Poorly structured',afterLabel:'Readable and navigable',beforeNotes:['Long, unbroken paragraphs','Vague or missing subheadings','Comparisons buried in prose','Jargon and repetition'],afterNotes:['Short, focused paragraphs','Descriptive H2 and H3 headings','Bullet points for lists','Tables for comparisons','Plain, clear language']},

  /* 15 */ H2('Continuously Improve Existing Content',{id:'content-refresh',eyebrow:'Optimization'}),
  P(`I review and improve published content based on its performance and relevance. Content optimization is an ongoing process rather than a one-time activity.`),
  CK(['Search intent reassessment.','Competitor content analysis.','Missing topic identification.','Content depth improvements.','Outdated information updates.','Heading restructuring.','Semantic keyword improvements.','Internal linking improvements.','Removal of unnecessary or repetitive sections.']),

  /* 16 */ H2('Complete On-Page SEO Workflow',{id:'workflow',eyebrow:'Step by step'}),
  P(`These are the twelve steps I follow. The process is iterative: findings from later steps, such as gaps found during content review, often send me back to earlier ones.`),
  {type:'steps',title:'On-page SEO workflow',steps:[
   {t:'Primary Keyword Research',d:'Identify the one keyword that represents the central subject of the page.'},
   {t:'Search Intent Analysis',d:'Study what users expect to find and which content format dominates.'},
   {t:'Secondary Keyword Mapping',d:'Map the wording variations of the primary keyword.'},
   {t:'LSI and Related Topic Research',d:'Find related concepts, entities and supporting questions.'},
   {t:'Content Architecture',d:'Plan the headings and decide which topics earn their own H2.'},
   {t:'Primary Content Development',d:'Answer the main query directly after the introduction.'},
   {t:'Secondary Content Development',d:'Expand coverage with the supporting search intents.'},
   {t:'Semantic and Entity Optimization',d:'Connect related concepts and entities naturally.'},
   {t:'E-E-A-T and Supporting Evidence',d:'Add author signals, methodology and credible sources.'},
   {t:'Internal Linking',d:'Connect the page to its cluster and relevant commercial pages.'},
   {t:'Readability and Formatting',d:'Short paragraphs, descriptive headings, lists and tables.'},
   {t:'Content Review and Optimization',d:'Reassess intent, fill gaps and refresh the page over time.'}]}
 ],
 closeHeading:'Build Content That Deserves to Rank',
 closeText:'My on-page SEO approach combines search intent, semantic relevance, topical depth, E-E-A-T, and user-focused content structure to create pages that serve both search engines and real users.',
 closeButtons:[{label:'Explore My Portfolio',href:'/portfolio',style:'primary'},{label:'Explore GEO & AI SEO Strategy',href:'/strategies/geo-ai-seo',style:'ghost'}],
 relatedHeading:'Related projects, services and resources',
 related:[
  {group:'Portfolio',label:'VPNRanks case study',text:'Affiliate SEO work built on search intent mapping, content optimization and authority building.',href:'/portfolio/vpnranks'},
  {group:'Portfolio',label:'Medical Lien Management case study',text:'Healthcare lead-generation SEO: commercial pages, intent-based content and site architecture.',href:'/portfolio/medical-lien-management'},
  {group:'Portfolio',label:'GreenSense Billing case study',text:'Medical billing and revenue cycle management SEO supported by informational content.',href:'/portfolio/greensense-billing'},
  {group:'Services',label:'On-Page SEO and Semantic SEO services',text:'See how these methodologies are offered as services.',href:'/#services'},
  {group:'Resources',label:'SEO resources and insights',text:'Articles and guides on search intent, semantic SEO and content strategy.',href:'/resources'},
  {group:'Contact',label:'Discuss your project',text:'Tell me about your website and your goals.',href:'/contact'}],
 cardTitle:'On-Page SEO – Search Intent, Semantic Relevance & Topical Authority',
 cardText:'A structured approach to optimizing content around the intent behind search queries, organizing primary and secondary content, strengthening semantic relevance, and building topical depth within individual pages and across the website.',
 cardFocus:['Search intent mapping','Primary and secondary keyword strategy','Semantic and LSI keyword integration','Content hierarchy','Topical authority','E-E-A-T','Internal linking','Content readability'],
 cardCta:'Explore On-Page SEO Strategy',cardIcon:'doc',
 seoTitle:'On-Page SEO Strategy: Search Intent & Topical Authority | Raja Hamza Pervaiz',
 metaDescription:'How I optimize pages around search intent, primary and secondary keywords, semantic relevance, topical depth, E-E-A-T and internal linking, without keyword stuffing.',
 canonical:'',noindex:false,nofollow:false,ogTitle:'',ogDescription:'',ogImage:''};

/* ============================================================ GEO & AI SEO */
const geo={kind:'strategy',slug:'geo-ai-seo',title:'GEO & AI SEO Strategy – Optimizing Content for AI Search Visibility and Citations',breadcrumb:'GEO & AI SEO',toc:true,byline:true,
 heroEyebrow:'MY GEO & AI SEO METHODOLOGY',
 heroHeading:'GEO & AI SEO – Optimizing for AI Search Visibility and Citations',
 heroIntro:`Search is evolving beyond traditional search engine results pages. Users increasingly rely on AI-powered experiences such as Google AI Overviews, ChatGPT, and Perplexity to discover information, compare solutions, and make decisions.

My approach to GEO and AI SEO builds on established SEO principles while adding a stronger focus on entity understanding, content extractability, topical depth, authoritative references, and broader digital authority.

The objective is to make content easier for AI-powered search experiences to understand, retrieve, reference, and potentially cite while maintaining strong traditional organic search performance.`,
 heroButtons:[{label:'Explore My GEO Methodology',href:'#seo-evolution',style:'primary'},{label:'View AI SEO Case Studies',href:'/portfolio',style:'ghost'}],
 blocks:[
  /* 2 */ H2('The Core SEO Principles Remain, but Search Visibility Has Expanded',{id:'seo-evolution',eyebrow:'How SEO is evolving for AI search'}),
  P(`The foundations of SEO remain largely consistent. What changes is how information is discovered, interpreted, retrieved and cited.`),
  CK(['Search intent.','High-quality content.','Technical accessibility.','Semantic relevance.','Topical authority.','Trust and credibility.','Internal linking.','External authority signals.'],{title:'Foundations that stay the same'}),
  P(`However, AI-powered search experiences introduce additional ways of evaluating and retrieving information.`),
  {type:'compare',title:'Two kinds of search visibility',leftTitle:'Traditional search visibility',leftTone:'neutral',leftSteps:['Websites compete for rankings in search engine results pages.'],rightTitle:'AI search visibility',rightTone:'good',rightSteps:['Content and brand information may be retrieved, summarized, referenced, or cited within AI-generated responses.']},
  CO('principle','GEO builds on SEO','GEO is not a replacement for traditional SEO. It builds on it.'),

  /* 3 */ H2('Authority Is No Longer Just About Backlinks',{id:'off-page-authority',feature:true,eyebrow:'The evolution of off-page SEO and digital authority',lead:'Traditionally, Google has used backlinks as an important signal for evaluating website authority and prominence. With the expansion of AI-powered search and the broader digital ecosystem, brand authority and credibility can be influenced by a wider range of external signals and third-party discussions.'}),
  {type:'hub',title:'A wider ecosystem of authority signals',center:'Brand authority & credibility',ring:'none',nodes:['Backlinks','Editorial coverage and industry publications','Influencers and industry experts','Bloggers and independent publishers','User-generated discussions','Reviews and third-party recommendations'],caption:'Backlinks remain important. These additional sources can contribute to how a brand is discovered, understood and corroborated across the wider information ecosystem.'},
  H3('Influencers and Industry Opinion Leaders',{id:'influencers'}),
  UL(['Relevant influencers discussing products, brands, and services.','Industry experts sharing opinions and recommendations.','Recognized professionals discussing brands on social media.']),
  H3('Bloggers and Independent Publishers',{id:'bloggers'}),
  UL(['Websites publishing product reviews.','“Best-of” articles.','Comparison blogs.','Industry-specific recommendations.','Independent evaluations of products and services.']),
  H3('User-Generated Content',{id:'user-generated-content'}),
  P(`Authentic user discussions and experiences across platforms such as Reddit, LinkedIn, YouTube and Quora can contribute to how a brand is understood online.`),
  UL(['Genuine user reviews.','Community discussions.','Product comparisons.','Recommendations.','Questions and answers.','First-hand experiences.']),
  P(`These platforms can contribute to a broader online understanding of brands, products and services.`),
  CO('caution','What I am not claiming','I do not claim that every social mention or user-generated post is a direct Google ranking factor. These sources can contribute to brand discovery, reputation, corroboration, and the wider information ecosystem used by search and AI experiences.'),
  H3('A Comprehensive Off-Page SEO Strategy',{id:'comprehensive-off-page'}),
  P(`Backlinks remain important, but a comprehensive digital authority strategy should also consider relevant editorial coverage, industry publications, authentic user discussions, reviews, expert opinions, and third-party recommendations.`),
  {type:'cards',columns:'2',cards:[{icon:'link',tag:'Strategy',title:'Explore My Off-Page SEO Strategy',text:'A dedicated page on my off-page and digital authority methodology will be added here.',soon:true}]},

  /* 4 */ H2('Structure Content So AI Systems Can Understand and Retrieve It',{id:'ai-extraction',eyebrow:'Content structure'}),
  P(`Content should be organized so that important information is easy to identify and extract.`),
  UL(['Direct-answer introductions.','Clear and descriptive headings.','Logical content hierarchy.','Short, focused paragraphs.','Bullet points.','Comparison tables.','Clearly defined concepts.','Supporting examples.','Contextually relevant entities.','Concise answers followed by detailed explanations.'],{title:'My approach includes'}),
  {type:'compare',title:'Weak versus AI-friendly content structure',leftTitle:'Weak content structure',leftTone:'bad',leftSteps:['Long background introduction','Unclear heading','Buried answer','Repetitive explanation'],rightTitle:'AI-friendly content structure',rightTone:'good',rightSteps:['Clear question or topic','Direct answer','Supporting details','Evidence','Related context']},
  P(`I avoid unnecessarily long introductions that delay the actual answer.`),

  /* 5 */ H2('Answer the Question Before Expanding the Explanation',{id:'direct-answers',eyebrow:'Direct answers and question-based headings'}),
  P(`Content is easier to retrieve and reuse when it is organized around the natural-language questions users actually ask.`),
  UL(['Research how users phrase questions.','Identify common informational and commercial queries.','Use question-based headings where they accurately represent search intent.','Provide a direct answer immediately after the heading.','Follow the answer with supporting details, examples, and relevant evidence.'],{title:'My approach'}),
  {type:'hierarchy',title:'Example: “Virtual Medical Assistant Benefits”',rows:[
   {level:'1',text:'Virtual Medical Assistant Benefits',tag:'primary'},
   {level:'2',text:'What Are the Benefits of a Virtual Medical Assistant?',tag:'primary',note:'The first H2 is a natural-language question that matches the primary intent.'},
   {level:'0',text:'A direct answer immediately after the heading, followed by supporting detail.',tag:'primary'},
   {level:'3',text:'An H3 for each individual benefit',tag:'primary'},
   {level:'2',text:'How Do Virtual Medical Assistants Help Small Medical Practices?',tag:'secondary'},
   {level:'2',text:'What Tasks Can a Virtual Medical Assistant Handle?',tag:'secondary'},
   {level:'2',text:'How Much Does a Virtual Medical Assistant Cost?',tag:'secondary'}],
   caption:'Additional H2 sections address distinct supporting questions.'},
  CO('note','Questions only where they fit','I do not force questions into headings when a descriptive heading is more appropriate.'),

  /* 6 */ H2('Satisfy the Main Query Before Expanding Into Supporting Topics',{id:'primary-secondary-geo',eyebrow:'Primary and secondary search intent for GEO'}),
  P(`The content structure I use for traditional on-page SEO also applies to GEO. The complete keyword and content architecture methodology is explained on the [On-Page SEO Strategy](/strategies/on-page-seo) page.`),
  H3('Primary content',{id:'geo-primary'}),
  UL(['Identify one primary keyword and its main search intent.','Answer the primary query immediately after the introduction.','Place the main topic in the first H2.','Provide a comprehensive answer.','Include relevant entities and supporting evidence.']),
  H3('Secondary content',{id:'geo-secondary'}),
  UL(['Identify related queries and supporting search intents.','Use relevant LSI terms and semantic concepts.','Give each distinct supporting intent an appropriate heading.','Answer each topic directly.','Expand the overall topical coverage without diluting the primary subject.']),
  {type:'buttons',align:'left',buttons:[{label:'Read the On-Page SEO Strategy',href:'/strategies/on-page-seo',style:'ghost'}]},

  /* 7 */ H2('Prepare Content for Query Fan-Out Through Comprehensive Topical Coverage',{id:'query-fan-out',eyebrow:'Query fan-out and topical depth'}),
  P(`AI systems may break a user’s broader question into multiple related subqueries to gather information from different sources and construct a comprehensive response.`),
  P(`For example, a user asks: “Which virtual medical assistant company is best for a small medical practice?” Related queries could include:`),
  UL(['What services do virtual medical assistants provide?','Which companies offer virtual medical assistant services?','How much do virtual medical assistants cost?','What tasks can they handle?','Are they suitable for small medical practices?','What should businesses consider when choosing a provider?']),
  {type:'flow',title:'Query fan-out',columns:[
   {title:'User’s main query',items:['Which virtual medical assistant company is best for a small medical practice?']},
   {title:'Related subqueries',items:['What services are provided?','Which companies offer them?','How much do they cost?','What tasks can they handle?','Are they suitable for small practices?','What should businesses consider?']},
   {title:'Supporting topics',items:['Services','Providers','Pricing','Tasks','Practice size','Selection criteria']},
   {title:'Relevant entities',items:['Virtual medical assistant','Healthcare administration','Medical practice','Service providers']},
   {title:'Comprehensive content resource',items:['A topical resource that covers these dimensions']}],
   caption:'A page with comprehensive topical coverage can address several relevant dimensions of the broader question.'},
  OL(['Identify the primary query.','Research closely related questions.','Map the related questions to supporting topics.','Cover relevant entities and subtopics.','Organize the content into logical sections.','Connect supporting articles through internal links where separate pages are appropriate.'],{title:'My approach'}),
  CO('caution','One page does not have to answer everything','I do not suggest that one page must answer every possible related query. Some subtopics deserve separate pages within a broader topical cluster. Topical depth helps build a more comprehensive information resource across the whole cluster.'),

  /* 8 */ H2('Optimize Around Entities, Not Just Exact-Match Keywords',{id:'entity-optimization',eyebrow:'Entity optimization'}),
  P(`Entity optimization improves contextual understanding by making it clear what a page is about, which things are connected to it, and how they relate.`),
  UL(['Identifying relevant brands.','Identifying products and services.','Including industry terminology.','Connecting related concepts.','Clarifying relationships between entities.','Maintaining consistent brand information.','Using relevant contextual references.'],{title:'My approach includes'}),
  {type:'hub',title:'Example: entities around “Virtual Medical Assistant”',center:'Virtual Medical Assistant',ring:'chain',nodes:['Healthcare Administration','Appointment Scheduling','Patient Communication','Medical Billing Support','Practice Management'],caption:'Clear entity relationships help establish context around the subject being discussed.'},

  /* 9 */ H2('Create Original Information Worth Referencing and Citing',{id:'original-data',eyebrow:'Original data and unique statistics'}),
  P(`Original information can make content more useful and potentially more reference-worthy. My approach includes using or developing:`),
  UL(['Original research.','Unique data.','Industry surveys.','First-party statistics.','Comparative analysis.','Research-backed insights.','Data-driven findings.','Useful industry observations.']),
  P(`Content containing original and verifiable information can provide something additional to existing search results, and may attract references from publishers, bloggers, researchers and AI-powered search experiences. Where original data is unavailable, I use credible third-party research and attribute it clearly.`),
  CO('caution','No invented numbers','I never fabricate statistics or present estimated figures as verified research.'),

  /* 10 */ H2('Support Important Claims With Credible Evidence',{id:'evidence',eyebrow:'Authoritative references'}),
  UL(['Authoritative industry references.','Research reports.','Reliable statistics.','Expert commentary.','Relevant quotations.','Primary sources.','Verifiable supporting information.']),
  P(`Factual depth and transparent sourcing strengthen credibility and usefulness. I prioritize sources that are relevant to the subject rather than adding citations merely for quantity.`),

  /* 11 */ H2('Build Genuine Expertise, Experience and Trust',{id:'eeat-brand',eyebrow:'E-E-A-T and authentic brand representation'}),
  P(`AI visibility should be supported by genuine brand and author credibility.`),
  {type:'cards',columns:'3',cards:[
   {icon:'user',title:'Authentic author profiles',points:['Real authors','Genuine biographies','Relevant professional experience','Consistent professional identities','Authentic social media profiles','Active professional presence']},
   {icon:'shield',title:'Brand transparency',points:['Clear information about the company','Transparent business descriptions','Accurate service information','Genuine contact information','Clear methodology for recommendations and comparisons']},
   {icon:'award',title:'Independent third-party recognition',points:['Relevant industry mentions','Editorial references','Independent reviews','Expert recommendations','Genuine customer experiences']}]},
  CO('principle','Authentic evidence, not artificial signals','Credibility should be established through authentic evidence rather than artificial signals.'),

  /* 12 */ H2('Use Clear Content Structures to Improve Information Accessibility',{id:'structured-content',eyebrow:'Structured content and machine readability'}),
  P(`Structured information is easier to understand, for people and for the systems that process content.`),
  {type:'table',caption:'Structure elements and why they matter',columns:['Element','What I do','Why it helps'],rows:[
   'Headings | Use a logical H1, H2 and H3 hierarchy | Shows how topics relate and where each answer begins',
   'Bullet points | Use lists to make important information easy to identify | Makes key points quick to scan and extract',
   'Tables | Use comparison tables for products, services, features, costs and other structured information | Presents comparable information in a format that is easy to read and extract',
   'Concise paragraphs | Present one main idea per paragraph | Keeps each point clear and self-contained']},
  H3('Structured data',{id:'structured-data'}),
  P(`Where appropriate, I use relevant schema markup:`),
  UL(['Article.','Organization.','Person.','BreadcrumbList.','Product or Service schema where applicable.']),
  CO('caution','Structured data is not a guarantee','Structured data can help search engines interpret page information, but it does not guarantee AI citations or enhanced search visibility.'),

  /* 13 */ H2('Make Content Discoverable and Technically Accessible',{id:'technical-foundations',eyebrow:'Technical foundations'}),
  P(`Search engines and AI-powered search experiences need access to relevant website content in order to discover and process it, so a technically sound website remains essential.`),
  CK(['XML sitemap management.','Robots.txt configuration.','Crawlability.','Indexation.','Canonicalization.','Clean URL structures.','Internal linking.','Structured data.','Mobile usability.','Page performance.']),
  CO('note','Different platforms work differently','I do not assume that all AI platforms use the same crawling or retrieval mechanisms.'),

  /* 14 */ H2('Connect Supporting Content to Build a Stronger Topical Ecosystem',{id:'internal-linking-geo',eyebrow:'Internal linking and topical relationships'}),
  UL(['Topic relationships.','Content discovery.','Crawlability.','Page importance.','Internal authority distribution.'],{title:'Internal linking supports'}),
  {type:'tiers',title:'Linking pillar, supporting, comparison and commercial content',tiers:[
   {label:'Pillar pages',tone:'pillar',items:['Pillar page on the core topic'],arrow:'contextual links to'},
   {label:'Supporting informational articles and comparison content',tone:'support',items:['Informational article','Informational article','Comparison content'],arrow:'relevant links to'},
   {label:'Commercial landing pages',tone:'commercial',items:['Service page','Lead-generation page']}]},
  P(`I highlight relevant, contextual internal links from established, authoritative pages, because they help search engines and AI systems understand which content matters and how it fits together.`),

  /* 15 */ H2('GEO and AI SEO Workflow',{id:'geo-workflow',eyebrow:'Step by step'}),
  {type:'steps',title:'GEO and AI SEO workflow',steps:[
   {t:'Identify High-Value Search Queries',d:'Find the commercial and informational queries that matter to the business.'},
   {t:'Research Conversational Prompts',d:'Learn how people phrase these questions in natural language.'},
   {t:'Analyze Query Fan-Out Opportunities',d:'Map the related subqueries behind a broader question.'},
   {t:'Map Primary and Secondary Search Intent',d:'Decide what the page must answer first and what supports it.'},
   {t:'Identify Relevant Entities',d:'List the brands, products, services and concepts involved.'},
   {t:'Build Topical Content Architecture',d:'Plan pages, clusters and what deserves a separate page.'},
   {t:'Structure Direct Answers and Supporting Sections',d:'Lead with the answer, then expand with detail.'},
   {t:'Incorporate Original Data and Authoritative References',d:'Add verifiable information and clearly attributed sources.'},
   {t:'Establish Authentic Author and Brand Signals',d:'Show real authors, transparent methodology and consistent brand information.'},
   {t:'Strengthen Internal Linking',d:'Connect supporting content, comparison content and commercial pages.'},
   {t:'Ensure Technical Crawlability',d:'Keep content discoverable, indexable and technically accessible.'},
   {t:'Monitor AI Visibility and Citations',d:'Track mentions, citations and referrals, then iterate.'}]},
  P(`GEO is an ongoing optimization process. AI visibility can vary by platform, query, location and time, so monitoring and iteration are part of the workflow rather than an afterthought.`),

  /* 16 */ H2('Measure Visibility Beyond Traditional Keyword Rankings',{id:'measuring-geo',eyebrow:'Measuring GEO and AI search performance'}),
  P(`Rankings alone no longer describe visibility. I monitor:`),
  UL(['Brand mentions in AI-generated answers.','Citations and linked references.','Visibility across relevant commercial prompts.','Visibility across informational prompts.','Referral traffic from AI platforms.','Leads and conversions originating from AI referrals.','Traditional organic search performance.']),
  CO('caution','No guarantees','AI visibility is not guaranteed by implementing any particular optimization technique.'),

  /* 17 */ H2('GEO & AI Search in Practice',{id:'geo-in-practice',feature:true,eyebrow:'Verified examples from my portfolio',lead:'Examples from my lead-generation work. AI visibility can vary by platform, query, location and time.'}),
  {type:'case',name:'Medical Lien Management',href:'/portfolio/medical-lien-management',linkLabel:'View the Medical Lien Management case study',rows:[{label:'Query',value:'“Best Workers’ Compensation Billing Companies in California”'},{label:'Search intent',value:'Commercial'}],text:'The website achieved AI visibility for this commercial query. The work behind it combined comparison content, brand positioning, search intent alignment and structured content.'},
  {type:'screenshot',label:'AI search citation: Medical Lien Management',note:'A screenshot of the AI-generated answer for this query will be added here.'},
  {type:'case',name:'Virtual MoJoe',href:'/portfolio/virtual-mojoe',linkLabel:'View the Virtual MoJoe case study',rows:[{label:'Commercial query',value:'“Best Virtual Medical Assistant Companies in Alabama”'},{label:'Informational query',value:'“How Virtual Medical Assistants Help Small Medical Practices Grow in 2026”'}],text:'These examples demonstrate optimization across both commercial and informational search intent.'},
  {type:'screenshot',label:'AI search citation: Virtual MoJoe (commercial query)',note:'A screenshot of the AI-generated answer for this query will be added here.'},
  {type:'screenshot',label:'AI search citation: Virtual MoJoe (informational query)',note:'A screenshot of the AI-generated answer for this query will be added here.'},
  H3('AI referral evidence',{id:'ai-referrals'}),
  P(`ChatGPT referral-generated inbound leads have been observed as part of the broader lead-generation SEO work. I do not assign an unverified number of leads to an individual website.`),
  {type:'screenshot',label:'ChatGPT referral evidence',note:'Analytics evidence of ChatGPT referral traffic and inbound leads will be added here.'}
 ],
 closeHeading:'Build Visibility Across Search Engines and AI-Powered Experiences',
 closeText:'My GEO and AI SEO approach combines traditional SEO foundations with semantic optimization, topical depth, authoritative information, and broader digital authority to help brands become more discoverable across evolving search experiences.',
 closeButtons:[{label:'Explore On-Page SEO Strategy',href:'/strategies/on-page-seo',style:'primary'},{label:'View My Portfolio',href:'/portfolio',style:'ghost'},{label:`Let's Connect`,href:'/contact',style:'ghost'}],
 relatedHeading:'Related projects, services and resources',
 related:[
  {group:'Portfolio',label:'Medical Lien Management case study',text:'Healthcare lead-generation SEO, including AI search visibility for a commercial query.',href:'/portfolio/medical-lien-management'},
  {group:'Portfolio',label:'Virtual MoJoe case study',text:'Virtual medical assistant SEO across commercial and informational intent.',href:'/portfolio/virtual-mojoe'},
  {group:'Portfolio',label:'All About AI case study',text:'SEO for a website about artificial intelligence, AI tools and emerging technology.',href:'/portfolio/all-about-ai'},
  {group:'Services',label:'GEO and AEO services',text:'See how these methodologies are offered as services.',href:'/#services'},
  {group:'Resources',label:'SEO resources and insights',text:'Articles and guides on search, content and AI visibility.',href:'/resources'},
  {group:'Contact',label:'Discuss your project',text:'Tell me about your website and your goals.',href:'/contact'}],
 cardTitle:'GEO & AI SEO – Optimizing for AI Search Visibility and Citations',
 cardText:'A strategy for making website content more understandable, retrievable, and useful to AI-powered search experiences through semantic relevance, direct answers, topical depth, structured information, authoritative references, and broader off-page authority signals.',
 cardFocus:['Generative Engine Optimization','Answer Engine Optimization','AI search visibility','Entity optimization','Query fan-out','Question-based headings','Original data and statistics','Structured content','Digital authority and user-generated signals'],
 cardCta:'Explore GEO & AI SEO Strategy',cardIcon:'ai',
 seoTitle:'GEO & AI SEO Strategy: Improve AI Search Visibility | Raja Hamza Pervaiz',
 metaDescription:'My approach to Generative Engine Optimization and AEO: direct answers, entities, query fan-out, original data and digital authority for AI search visibility.',
 canonical:'',noindex:false,nofollow:false,ogTitle:'',ogDescription:'',ogImage:''};

module.exports={PAGES:[overview,onpage,geo],PAGES_V2:[require('./strategies-content-offpage'),require('./strategies-content-technical')],PAGES_V3:[require('./strategies-content-local')]};
