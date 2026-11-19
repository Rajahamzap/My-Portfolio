'use strict';
/* Technical SEO & Website Performance strategy page, written from the owner's methodology brief.
   Rule: only the supplied figures are used. Technical work is described as a foundation, never as the sole cause of traffic or revenue growth.
   Code snippets are generic, illustrative examples (example.com), not extracts from any client website. */
const H2=(text,o)=>Object.assign({type:'heading',level:'2',text,toc:true},o);
const H3=(text,o)=>Object.assign({type:'heading',level:'3',text,toc:false},o);
const P=text=>({type:'text',text});
const UL=(items,o)=>Object.assign({type:'list',style:'bullets',items},o);
const CK=(items,o)=>UL(items,Object.assign({style:'checks'},o));
const OL=(items,o)=>UL(items,Object.assign({style:'numbered'},o));
const CO=(tone,title,text)=>({type:'callout',tone,title,text});
const CODE=(title,lang,code,caption)=>({type:'code',title,lang,code,caption:caption||''});

const page={kind:'strategy',slug:'technical-seo',title:'Technical SEO – Improving Crawlability, Indexation, Site Architecture & Core Web Vitals',breadcrumb:'Technical SEO',toc:true,byline:true,
 heroEyebrow:'MY TECHNICAL SEO & PERFORMANCE METHODOLOGY',
 heroHeading:'Technical SEO – Improving Crawlability, Indexation, Site Architecture & Core Web Vitals',
 heroIntro:`Technical SEO provides the foundation that allows search engines to discover, crawl, render, and index website content efficiently.

My technical SEO approach focuses on maintaining a clean website architecture, resolving crawlability and indexation issues, optimizing website resources, and improving Core Web Vitals to deliver a fast, stable, and accessible experience across devices.`,
 heroButtons:[{label:'Explore the Strategy',href:'#crawlability-indexation',style:'primary'},{label:'View My Portfolio',href:'/portfolio',style:'ghost'}],
 blocks:[
  /* 1 */ H2('Crawlability, Indexation & Website Architecture',{id:'crawlability-indexation',eyebrow:'Helping search engines discover and understand important pages',lead:'Technical SEO ensures that search engines can efficiently discover, crawl and understand the pages that matter.'}),
  {type:'flow',title:'From discovery to ranking eligibility',columns:[
   {title:'Discover',items:['Links, sitemaps and redirects lead crawlers to URLs']},
   {title:'Crawl',items:['Robots.txt rules and server responses decide what can be fetched']},
   {title:'Render',items:['CSS and JavaScript resources must be reachable']},
   {title:'Index',items:['Canonicals, duplicates and quality signals decide what is stored']},
   {title:'Serve',items:['Indexed pages can then be considered for search results']}],
   caption:'A problem at an early stage limits everything after it, which is why this is where technical audits start.'},

  H3('A. Robots.txt Optimization',{id:'robots-txt'}),
  UL(['Configure robots.txt to guide search engine crawlers toward the appropriate website sections.','Prevent unnecessary crawling of low-value or private areas where appropriate.','Ensure important content, CSS and JavaScript resources are not accidentally blocked.','Regularly review robots.txt rules to avoid unintended crawl restrictions.']),
  CODE('A simple robots.txt pattern','robots.txt','User-agent: *\nDisallow: /admin/\nDisallow: /search?\n\nSitemap: https://example.com/sitemap.xml','Illustrative only. The right rules depend on the website.'),
  CO('caution','Robots.txt controls crawling, not indexing','A robots.txt rule does not guarantee that a URL will be excluded from Google\'s index. A blocked URL can still appear in results if other pages link to it. To keep a page out of the index, use a `noindex` directive on a crawlable page or access controls.'),

  H3('B. XML Sitemap Management',{id:'xml-sitemaps'}),
  UL(['Create and maintain XML sitemaps containing canonical, indexable URLs.','Separate sitemaps by content type where appropriate.','Exclude redirected, duplicate and non-indexable URLs.','Submit sitemaps through Google Search Console.','Monitor sitemap processing and indexing status.','Update sitemaps as the website grows.']),

  H3('C. Website Structure & Information Architecture',{id:'site-architecture'}),
  P(`A logical content hierarchy helps users and search engines understand how pages relate to each other.`),
  UL(['Organizing pages into relevant categories and subcategories.','Establishing clear relationships between pillar pages and supporting content.','Maintaining descriptive, SEO-friendly URL structures.','Keeping important pages accessible through logical navigation.','Avoiding unnecessarily deep page hierarchies.','Preventing duplicate and overlapping URL structures.','Designing scalable architecture that supports future content expansion.']),
  {type:'tiers',title:'Example: a logical site hierarchy',tiers:[
   {label:'Homepage',tone:'pillar',items:['Home'],arrow:'links to main categories'},
   {label:'Categories',tone:'support',items:['Category A','Category B','Category C'],arrow:'links to pillar pages'},
   {label:'Pillar pages and subcategories',tone:'entity',items:['Pillar page','Subcategory page'],arrow:'links to supporting content'},
   {label:'Supporting content and detail pages',tone:'commercial',items:['Supporting article','Detail page','Detail page']}],
   caption:'Illustrative structure. Important pages stay within a few clicks of the homepage.'},

  H3('D. Internal Linking & Crawl Efficiency',{id:'internal-linking'}),
  P(`Internal linking matters from both an SEO and a navigation perspective. For users, it shows where to go next. For search engines, it helps discover pages, understand topical relationships and distribute internal PageRank (link equity) across the website.`),
  UL(['Linking relevant supporting articles to their pillar pages.','Connecting informational articles with relevant commercial pages.','Using descriptive and contextually relevant anchor text.','Identifying orphan pages and pages with insufficient internal links.','Prioritizing important pages within the website\'s internal linking structure.','Adding contextual links from high-authority internal pages to important target pages.']),
  CO('principle','No fixed number of links per page','I do not prescribe a fixed number of internal links for every page. Links should be added where they provide genuine contextual value to the reader. The on-page side of this is covered in the [On-Page SEO strategy](/strategies/on-page-seo).'),

  H3('E. Canonical Tags, Redirects & Duplicate Content',{id:'canonicals-redirects'}),
  UL(['Implement canonical tags to identify preferred versions of duplicate or similar URLs.','Use appropriate 301 redirects when URLs change permanently.','Resolve redirect chains and loops.','Identify duplicate and near-duplicate content.','Maintain consistent trailing slash and URL formatting rules.','Prevent unnecessary indexation of filter, parameter and duplicate URLs.']),
  CODE('A canonical tag','HTML','<link rel="canonical" href="https://example.com/preferred-page/">'),
  {type:'compare',title:'Redirect chain versus direct redirect',leftTitle:'Redirect chain',leftTone:'bad',leftSteps:['/old-url','301 to /newer-url','301 to /final-url'],rightTitle:'Direct redirect',rightTone:'good',rightSteps:['/old-url','One 301 to /final-url']},

  /* 2 */ H2('Resource Optimization & Website Infrastructure',{id:'resource-infrastructure',eyebrow:'Performance, user experience and rendering',lead:'Website resources and infrastructure affect performance, user experience and how search engines render pages.'}),
  H3('A. Image Optimization',{id:'image-optimization'}),
  UL(['Compress images without noticeably reducing visual quality.','Use modern image formats such as WebP and AVIF where supported.','Serve images at appropriate dimensions rather than unnecessarily large originals.','Implement responsive images using `srcset` and `sizes` where appropriate.','Use descriptive filenames and meaningful alt text.','Avoid oversized images that increase page weight.']),
  CODE('A responsive image','HTML','<img src="hero-800.webp"\n     srcset="hero-480.webp 480w, hero-800.webp 800w, hero-1200.webp 1200w"\n     sizes="(max-width: 800px) 100vw, 800px"\n     width="800" height="450"\n     alt="Descriptive alt text">'),
  H3('B. Video Optimization',{id:'video-optimization'}),
  UL(['Compress and optimize video files.','Use appropriate video formats and dimensions.','Avoid unnecessarily large video files.','Consider external video hosting or streaming solutions when appropriate.','Prevent videos and embeds from creating unnecessary layout shifts.','Avoid loading heavy video resources before they are needed.']),
  H3('C. Content Delivery Network (CDN)',{id:'cdn'}),
  P(`A CDN distributes static resources through geographically distributed servers, so a visitor receives files from a location close to them rather than from a single origin server.`),
  UL(['Serving images, CSS, JavaScript and other static resources from edge locations.','Reducing resource delivery latency.','Improving performance for geographically distributed visitors.','Using appropriate caching policies.','Optimizing image delivery through CDN capabilities where available.']),
  H3('D. Hosting & Server Stability',{id:'hosting-stability'}),
  UL(['Choose reliable hosting with sufficient server resources.','Monitor uptime and server response times.','Avoid unstable hosting environments.','Use server-side caching.','Optimize application and database performance.','Monitor resource usage as website traffic grows.']),

  /* 3 */ H2('Structured Data & Schema Markup',{id:'structured-data',eyebrow:'Helping search engines understand entities and relationships',lead:'Structured data helps search engines understand the entities, relationships and information presented on a website.'}),
  {type:'table',caption:'Schema types I work with',columns:['Schema type','What it does'],rows:[
   'Article | Helps search engines understand blog posts and editorial content.',
   'Organization | Provides information about a business or organization, including its name, logo and official profiles.',
   'Person | Describes authors and their professional identity.',
   'BreadcrumbList | Defines the website\'s page hierarchy and breadcrumb navigation.',
   'LocalBusiness | Communicates relevant business information for local businesses.',
   'Product | Describes products, including applicable pricing, availability and reviews.',
   'Service | Describes services offered by a business where appropriate.',
   'VideoObject | Provides structured information about video content.',
   'FAQPage | Used only where appropriate and in accordance with Google\'s eligibility guidelines.']},
  H3('Implementation & Validation',{id:'schema-implementation'}),
  UL(['Implement structured data using JSON-LD wherever appropriate.','Ensure schema properties accurately reflect visible page content.','Connect relevant entities through appropriate identifiers and relationships.','Avoid misleading, fabricated or irrelevant structured data.','Validate implementation using Google\'s Rich Results Test and the Schema Markup Validator.','Monitor structured data errors and warnings through Google Search Console.']),
  CODE('JSON-LD example: connected entities','JSON-LD','{\n  "@context": "https://schema.org",\n  "@graph": [\n    {\n      "@type": "Organization",\n      "@id": "https://example.com/#org",\n      "name": "Example Company",\n      "url": "https://example.com/"\n    },\n    {\n      "@type": "Article",\n      "headline": "Example article",\n      "publisher": { "@id": "https://example.com/#org" }\n    }\n  ]\n}','Generic example. The Article connects to the Organization through an identifier.'),
  CO('caution','Schema is not a guarantee','Schema markup improves machine readability and can help search engines interpret content. It does not guarantee rankings, rich results or AI citations.'),

  /* 4 */ H2('Core Web Vitals & Page Experience Optimization',{id:'core-web-vitals',eyebrow:'Google\'s user-experience performance metrics',lead:'Core Web Vitals measure real-world loading, responsiveness and visual stability.'}),
  {type:'cards',columns:'3',cards:[
   {icon:'chart',tag:'Loading',title:'Largest Contentful Paint (LCP)',text:'Measures how quickly the main visible content loads.'},
   {icon:'spark',tag:'Responsiveness',title:'Interaction to Next Paint (INP)',text:'Measures how responsive a page is to user interactions.'},
   {icon:'layers',tag:'Visual stability',title:'Cumulative Layout Shift (CLS)',text:'Measures unexpected visual movement during page loading and interaction.'}]},
  CO('principle','Part of the foundation, not a substitute','Good Core Web Vitals improve user experience. They are not a substitute for relevant content and the other SEO fundamentals.'),

  /* 5 LCP */ H2('Largest Contentful Paint (LCP) Optimization',{id:'lcp',eyebrow:'Loading performance',lead:'How to identify and improve the loading performance of the largest visible element, often a hero image, a heading or other prominent content.'}),
  {type:'flow',title:'What sits behind LCP',columns:[
   {title:'Server response',items:['Fast hosting','Caching','CDN','Database']},
   {title:'Resource discovery',items:['Preload the hero image','fetchpriority','No lazy-loading of the LCP image']},
   {title:'Resource weight',items:['Optimized images','Fonts','Background images']},
   {title:'Render path',items:['Render-blocking CSS','Deferred JavaScript','Third-party scripts']}],
   caption:'Each stage can delay the largest element. The fix depends on where the delay actually is, which is why I measure before changing anything.'},

  H3('A. Improve Server Response Time (TTFB)',{id:'lcp-ttfb'}),
  H3('Use Fast Hosting',{id:'lcp-hosting'}),
  UL(['Choose hosting with reliable infrastructure and adequate resources.','Consider server location and visitor geography.','Monitor server response time under different traffic conditions.']),
  H3('Enable Server Caching',{id:'lcp-caching'}),
  P(`Caching reduces repeated processing and speeds up resource delivery. These are the layers I consider:`),
  {type:'table',columns:['Cache type','How it helps'],rows:[
   '1. Full-page cache | Stores the complete generated page so the server does not rebuild it for every visitor.',
   '2. Object cache | Keeps the results of repeated database queries in memory.',
   '3. Opcode cache | Stores compiled script code so it does not need to be recompiled on every request.',
   '4. Browser cache | Lets returning visitors reuse files already downloaded.',
   '5. CDN cache | Serves cached static files from edge locations close to the visitor.']},
  H3('Use a CDN',{id:'lcp-cdn'}),
  UL(['Cache static resources at edge locations.','Reduce geographic latency.','Optimize delivery of images, CSS and JavaScript.']),
  H3('Optimize the Database',{id:'lcp-database'}),
  UL(['Remove unnecessary post revisions where appropriate.','Clean expired transients.','Optimize database tables.','Review inefficient database queries.','Remove unnecessary plugins and database overhead.']),

  H3('B. Optimize Images — A Common LCP Bottleneck',{id:'lcp-images'}),
  UL(['Convert images to WebP or AVIF.','Serve appropriately sized images.','Implement responsive images.','Avoid unnecessarily large hero images.','Compress image files while maintaining acceptable quality.']),

  H3('C. Preload the Hero Image',{id:'lcp-preload'}),
  P(`The main above-the-fold image should be discovered and requested early. If the browser only finds it late, for example inside CSS or after JavaScript runs, LCP is delayed.`),
  UL(['Preload the actual LCP image when appropriate.','Ensure the correct responsive image is prioritized.','Avoid preloading multiple unnecessary images.']),
  CODE('Preloading the LCP image','HTML','<link rel="preload" as="image" href="hero-1200.webp"\n      imagesrcset="hero-480.webp 480w, hero-800.webp 800w, hero-1200.webp 1200w"\n      imagesizes="100vw" fetchpriority="high">'),

  H3('D. Do Not Lazy-Load the LCP Image',{id:'lcp-no-lazy'}),
  P(`The main image responsible for LCP should generally load eagerly rather than waiting for lazy-loading conditions. Lazy loading tells the browser to wait, which is the opposite of what the most important image needs.`),
  CODE('Eager LCP image, lazy below-the-fold image','HTML','<!-- LCP image: eager and high priority -->\n<img src="hero-1200.webp" width="1200" height="600" alt="..." fetchpriority="high">\n\n<!-- Below the fold: lazy -->\n<img src="gallery-1.webp" width="600" height="400" alt="..." loading="lazy">'),

  H3('E. Prioritize Critical Resources',{id:'lcp-priority'}),
  UL(['Using `fetchpriority="high"` for the actual LCP image where appropriate.','Prioritizing critical CSS and fonts.','Avoiding unnecessary resource preloads.','Ensuring critical resources are discovered early.']),

  H3('F. Reduce Render-Blocking CSS',{id:'lcp-css'}),
  UL(['Remove unused CSS.','Minify CSS.','Inline critical CSS where appropriate.','Defer non-critical stylesheets when safe.','Reduce excessive CSS dependencies.','Review legacy CSS that is no longer required.']),

  H3('G. Defer Non-Critical JavaScript',{id:'lcp-defer-js'}),
  P(`Unnecessary JavaScript can delay rendering and increase main-thread work.`),
  UL(['Using `defer` for suitable scripts.','Using `async` where execution order is not required.','Deferring third-party scripts.','Removing unused JavaScript.','Avoiding unnecessary scripts in the initial loading path.']),
  CODE('defer and async','HTML','<script src="/js/app.js" defer></script>\n<script src="https://example.com/widget.js" async></script>'),

  H3('H. Reduce JavaScript Execution',{id:'lcp-js-execution'}),
  UL(['Break up long-running JavaScript tasks.','Reduce unnecessary DOM operations.','Avoid excessive event handlers.','Reduce heavy client-side rendering where possible.','Optimize third-party widgets and scripts.']),

  H3('I. Optimize Fonts',{id:'lcp-fonts'}),
  UL(['Prefer modern WOFF2 font files.','Preload only critical fonts.','Reduce unnecessary font weights and variants.','Use `font-display` appropriately.','Ensure font loading does not unnecessarily delay visible content.']),
  CODE('A WOFF2 font with font-display','CSS','@font-face {\n  font-family: "Example Sans";\n  src: url("/fonts/example-sans.woff2") format("woff2");\n  font-display: swap;\n}'),

  H3('J. Reduce Third-Party Scripts',{id:'lcp-third-party'}),
  P(`I review unnecessary analytics, advertising, chat, tracking and marketing scripts. Non-essential scripts load only when needed, and third-party resources should not be allowed to block important page rendering.`),

  H3('K. Avoid Heavy Sliders Above the Fold',{id:'lcp-sliders'}),
  P(`Large carousels, sliders, animations and multiple image assets can increase loading time. I recommend simpler, lighter hero sections where possible.`),

  H3('L. Optimize Background Images',{id:'lcp-backgrounds'}),
  UL(['Compress background images.','Use appropriately sized assets.','Prefer modern formats.','Preload important background images when necessary.','Avoid large background images that compete with the LCP resource.']),

  H3('M. Above-the-Fold Loading Strategy',{id:'lcp-above-fold'}),
  P(`The key is the difference between critical and non-critical resources. Critical resources are needed to show the first screen. Everything else can wait.`),
  {type:'compare',title:'Critical versus non-critical resources',leftTitle:'Critical: load as early as possible',leftTone:'good',leftSteps:['Essential above-the-fold content','The LCP image (eager, not lazy-loaded)','Critical CSS and fonts'],rightTitle:'Non-critical: load later',rightTone:'neutral',rightSteps:['Non-essential JavaScript and widgets','Below-the-fold images (lazy-loaded)','Heavy third-party embeds','Non-essential AJAX requests']},
  UL(['Load essential above-the-fold content as early as possible.','Avoid lazy-loading the LCP image or other essential initial content.','Defer non-essential JavaScript and widgets.','Lazy-load below-the-fold images.','Delay heavy third-party embeds and non-essential AJAX requests until they are needed.','Avoid unnecessary scripts and requests during initial page rendering.']),
  CO('caution','No indiscriminate lazy loading','Above-the-fold content must not be delayed by indiscriminate lazy loading.'),

  /* 6 INP */ H2('Interaction to Next Paint (INP) Optimization',{id:'inp',eyebrow:'Responsiveness',lead:'INP focuses on how quickly the page responds visually after a user interaction, such as clicking a button, opening a menu or submitting a form.'}),
  H3('A. Identify Long JavaScript Tasks',{id:'inp-long-tasks'}),
  UL(['Identify long tasks that block the browser\'s main thread.','Use Chrome DevTools and performance profiling to locate expensive JavaScript execution.','Break up large tasks into smaller operations.','Avoid performing unnecessary calculations during user interactions.']),
  H3('B. Optimize Event Handlers',{id:'inp-event-handlers'}),
  UL(['Keep click, input and other event handlers lightweight.','Avoid excessive DOM manipulation.','Prevent unnecessary event listeners.','Debounce or throttle high-frequency events where appropriate.']),
  H3('C. Defer Non-Critical JavaScript',{id:'inp-defer'}),
  UL(['Delay non-essential scripts.','Avoid loading unnecessary JavaScript during initial page interaction.','Reduce third-party script execution.','Load functionality only when required.']),
  H3('D. Reduce Main-Thread Work',{id:'inp-main-thread'}),
  UL(['Minimize unnecessary JavaScript execution.','Avoid large synchronous operations.','Break up expensive tasks.','Use suitable browser scheduling techniques, including `scheduler.yield()` where supported and appropriate.']),
  CODE('Yielding to the main thread between chunks of work','JavaScript','async function processItems(items) {\n  for (const item of items) {\n    handle(item);\n    // Let the browser respond to input between chunks\n    if (\'scheduler\' in window && \'yield\' in scheduler) {\n      await scheduler.yield();\n    } else {\n      await new Promise(r => setTimeout(r, 0));\n    }\n  }\n}','A generic pattern with a fallback for browsers that do not support scheduler.yield().'),
  H3('E. Optimize Third-Party Widgets',{id:'inp-third-party'}),
  P(`I review chat widgets, analytics, advertising scripts, embedded tools and other third-party functionality that can interfere with interaction responsiveness.`),
  H3('F. Reduce Unnecessary DOM Complexity',{id:'inp-dom'}),
  UL(['Avoid excessively large DOM structures.','Simplify complicated page components.','Minimize unnecessary rendering and layout calculations.','Optimize dynamic components and interactive elements.']),
  CO('principle','The objective','The objective is to make user interactions respond quickly and predictably without blocking the main thread.'),

  /* 7 CLS */ H2('Cumulative Layout Shift (CLS) Optimization',{id:'cls',eyebrow:'Visual stability',lead:'Unexpected movement of page elements creates a poor user experience. The fix is to reserve the space an element needs before it loads.'}),
  {type:'compare',title:'Layout shift versus reserved space',leftTitle:'Without reserved space',leftTone:'bad',leftSteps:['Page renders and the reader starts reading','Image, ad or embed loads late','Content jumps down','The reader loses their place or taps the wrong thing'],rightTitle:'With reserved space',rightTone:'good',rightSteps:['Dimensions or aspect ratio are defined up front','Space is held for the image, ad or embed','Content loads into the reserved space','Nothing moves']},
  H3('A. Always Specify Image Dimensions',{id:'cls-image-dimensions'}),
  UL(['Add explicit `width` and `height` attributes to images.','Use appropriate aspect ratios.','Ensure image containers reserve space before image loading.']),
  H3('B. Reserve Space for Ads and Embeds',{id:'cls-ads-embeds'}),
  UL(['Google Ads.','YouTube embeds.','Google Maps.','Social media posts.','Third-party widgets.'],{title:'Prevent layout shifts caused by'}),
  P(`Reserve appropriate dimensions for these elements before they load.`),
  H3('C. Reserve Space for Dynamic Content',{id:'cls-dynamic'}),
  UL(['Define dimensions for dynamically loaded components.','Reserve space for banners, recommendations and notifications.','Prevent asynchronous content from pushing existing content down.']),
  H3('D. Avoid Inserting Content Above Existing Content',{id:'cls-inserted-content'}),
  UL(['Avoid unexpectedly inserting banners or elements above visible content.','Reserve space for announcements and promotional banners.','Use overlays or modals that do not disturb the document flow.','Use `position: fixed` for appropriate sticky notifications.']),
  H3('E. Optimize Web Fonts',{id:'cls-fonts'}),
  UL(['Use efficient font formats.','Preload critical fonts where appropriate.','Use suitable fallback fonts.','Match fallback font metrics to the primary font where possible.','Prevent font swaps from causing substantial text layout changes.']),
  H3('F. Set Width and Height for Videos',{id:'cls-videos'}),
  P(`Ensure video elements and embedded media reserve their required dimensions before loading.`),
  H3('G. Use CSS Aspect Ratio',{id:'cls-aspect-ratio'}),
  UL(['Cards.','Product images.','Hero banners.','Thumbnails.','Videos.'],{title:'Use the CSS `aspect-ratio` property where appropriate for'}),
  CODE('Reserving space with aspect-ratio','CSS','.video-embed {\n  aspect-ratio: 16 / 9;\n  width: 100%;\n}\n.card-thumb {\n  aspect-ratio: 4 / 3;\n  object-fit: cover;\n}'),
  H3('H. Avoid Animating Layout Properties',{id:'cls-animations'}),
  P(`Avoid animations that repeatedly change layout-affecting properties such as width, height, top and left. Prefer transform and opacity animations when suitable.`),
  H3('I. Keep Headers Consistent',{id:'cls-headers'}),
  P(`Prevent unexpected header height changes during page loading, scrolling or interaction.`),
  H3('J. Reserve Space for Lazy-Loaded Images',{id:'cls-lazy-images'}),
  P(`Ensure below-the-fold images have dimensions or aspect-ratio containers so they do not cause unexpected layout movement when loaded.`),
  H3('K. Be Careful with Carousels and Sliders',{id:'cls-carousels'}),
  UL(['Reserve fixed or predictable space for carousel containers.','Prevent slides with different dimensions from changing the layout.','Avoid unexpected height changes during transitions.']),
  H3('L. Prevent Layout Shifts from Accordions',{id:'cls-accordions'}),
  P(`Use predictable layout behavior when expanding and collapsing accordion content. Avoid unexpected shifts caused by dynamically injected content or delayed resource loading.`),

  /* 8 */ H2('Technical SEO Auditing & Monitoring',{id:'auditing-monitoring',eyebrow:'Finding problems before they affect organic performance',lead:'Ongoing technical audits help identify problems before they affect organic search performance.'}),
  {type:'steps',title:'The audit and monitoring loop',steps:[
   {t:'Crawl',d:'Weekly or scheduled crawls of the website.'},
   {t:'Monitor',d:'Search Console, indexation and Core Web Vitals data.'},
   {t:'Diagnose',d:'Find the cause of errors and regressions.'},
   {t:'Prioritize',d:'Rank issues by their effect on important pages.'},
   {t:'Fix and validate',d:'Resolve and confirm the fix worked.'},
   {t:'Repeat',d:'Technical SEO is a loop, not a checklist.'}]},
  UL(['Weekly or scheduled website crawls using Screaming Frog.','Google Search Console monitoring.','Indexation and crawl error analysis.','Broken internal and external links.','Redirect chains and loops.','Canonical tag validation.','Missing metadata and heading issues.','Duplicate content identification.','XML sitemap validation.','Robots.txt testing.','Mobile usability and rendering checks.','Core Web Vitals monitoring.','Structured data validation.'],{title:'What I check'}),
  {type:'table',caption:'Tools I use',columns:['Tool','Typical use'],rows:[
   'Google Search Console | Indexation, sitemaps, crawl issues, Core Web Vitals and structured data reports.',
   'Google PageSpeed Insights | Lab and field performance data for individual URLs.',
   'Chrome DevTools | Performance profiling, network analysis and rendering checks.',
   'Screaming Frog | Scheduled crawls for links, redirects, canonicals, metadata and headings.',
   'Ahrefs | Site audits, backlink and visibility data.',
   'SEMrush | Site audits and search visibility data.']},
  CO('principle','An ongoing process','Technical SEO is an ongoing process rather than a one-time audit. Websites change, plugins update and content grows, so new issues can appear at any time.'),

  /* 9 */ H2('Results & Business Impact',{id:'results',feature:true,eyebrow:'Verified project-level results',lead:'These are separate project figures from websites where technical SEO formed part of the work. Domain Rating is a third-party authority metric, not a Google ranking metric.'}),
  {type:'cards',columns:'2',cards:[
   {icon:'chart',tag:'Affiliate websites',title:'VPNRanks',text:'200,000+ peak monthly organic visits. Domain Rating 63.'},
   {icon:'award',tag:'Affiliate websites',title:'All About AI',text:'Domain Rating 74.'},
   {icon:'spark',tag:'Affiliate websites',title:'Affiliate sales growth',text:'Contributed to 10× year-over-year affiliate sales growth in 2023 compared with 2022.'},
   {icon:'pin',tag:'Lead-generation websites',title:'Medical Lien Management',text:'Domain Rating 25.',linkLabel:'View the case study',href:'/portfolio/medical-lien-management'},
   {icon:'pin',tag:'Lead-generation websites',title:'GreenSense Billing',text:'Domain Rating 13.'},
   {icon:'pin',tag:'Lead-generation websites',title:'Virtual MoJoe',text:'Domain Rating 12.',linkLabel:'View the case study',href:'/portfolio/virtual-mojoe'}]},
  P(`Technical SEO helped establish and maintain the crawlability, indexation, site structure and performance foundations that supported these websites' wider SEO strategies.`),
  CO('caution','What these figures do not say','Traffic and revenue growth should not be attributed exclusively to technical SEO. These results came from technical work together with content, on-page optimization and authority building, and I do not claim that any single technical fix caused a particular increase.'),

  /* 10 */ H2('My Role',{id:'my-role',eyebrow:'Technical SEO Specialist & Website Performance Strategist'}),
  P(`I manage technical SEO audits, crawlability, indexation, XML sitemaps, robots.txt, website architecture, internal linking, canonicalization, redirects, structured data, resource optimization and Core Web Vitals.`),
  P(`My focus is to ensure that websites remain technically sound, search-engine friendly, scalable and capable of supporting long-term organic growth.`)
 ],
 closeHeading:'Build a Technical Foundation That Scales',
 closeText:'A technically sound website is easier to crawl, faster to use and simpler to grow. If you would like to discuss the technical health of your website, I would be glad to talk.',
 closeButtons:[{label:`Let's Connect`,href:'/contact',style:'primary'},{label:'Explore Off-Page SEO Strategy',href:'/strategies/off-page-seo',style:'ghost'}],
 relatedHeading:'Related strategies, projects and resources',
 related:[
  {group:'Strategy',label:'On-Page SEO strategy',text:'Search intent, semantic SEO, content structure and internal linking.',href:'/strategies/on-page-seo'},
  {group:'Strategy',label:'GEO & AI SEO strategy',text:'How structure, entities and extractable content support AI search visibility.',href:'/strategies/geo-ai-seo'},
  {group:'Strategy',label:'Off-Page SEO strategy',text:'Backlinks, digital PR and brand reputation.',href:'/strategies/off-page-seo'},
  {group:'Portfolio',label:'Portfolio and case studies',text:'See how these methodologies have been applied.',href:'/portfolio'},
  {group:'Services',label:'Technical SEO services',text:'See how this methodology is offered as a service.',href:'/#services'},
  {group:'Contact',label:'Discuss your project',text:'Tell me about your website and your goals.',href:'/contact'}],
 cardTitle:'Technical SEO – Crawlability, Indexation, Site Architecture & Core Web Vitals',
 cardText:'A strategy for keeping websites crawlable, indexable and fast through clean architecture, robots.txt and sitemap management, structured data, resource optimization, and Core Web Vitals work across LCP, INP and CLS.',
 cardFocus:['Crawlability and indexation','Robots.txt and XML sitemaps','Site architecture','Canonicals and redirects','Structured data','Largest Contentful Paint','Interaction to Next Paint','Cumulative Layout Shift','Technical audits'],
 cardCta:'Explore Technical SEO Strategy',cardIcon:'gear',
 seoTitle:'Technical SEO Strategy: Crawlability, Indexation & Core Web Vitals | Raja Hamza Pervaiz',
 metaDescription:'My technical SEO approach: crawlability, indexation, site architecture, structured data and Core Web Vitals (LCP, INP, CLS), plus ongoing audits.',
 canonical:'',noindex:false,nofollow:false,ogTitle:'',ogDescription:'',ogImage:''};
module.exports=page;
