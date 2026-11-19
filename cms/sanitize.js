'use strict';
/* Allowlist HTML sanitizer for rich-text article content (no dependencies). */
const TAGS=new Set('p h1 h2 h3 h4 ul ol li a strong em b i u blockquote pre code table thead tbody tfoot tr th td figure figcaption img br hr div span iframe'.split(' '));
const VOID=new Set(['br','hr','img']);
const SAFE_URL=/^(https?:\/\/|mailto:|\/|#|\.\.?\/|[A-Za-z0-9_\-][A-Za-z0-9_\-./]*(\?[^\s"]*)?(#[^\s"]*)?$)/i;
const BAD=/^\s*(javascript|data|vbscript|file):/i;
const MEDIA=/^(https:\/\/|\/?uploads\/|\/?assets\/|\.\.\/(uploads|assets)\/)[^\s"'<>]*$/i;
const YT=/^https:\/\/www\.youtube-nocookie\.com\/embed\/[A-Za-z0-9_-]{6,15}(\?[A-Za-z0-9=&_-]*)?$/;
const esc=s=>String(s).replace(/&(?!(amp|lt|gt|quot|#39|#\d+);)/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function attrs(tag,raw){const out=[];const re=/([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;let m;const a={};while((m=re.exec(raw))){const k=m[1].toLowerCase();const v=m[2]!=null?m[2]:m[3]!=null?m[3]:m[4]!=null?m[4]:'';a[k]=v.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'")}
 const put=(k,v)=>out.push(' '+k+'="'+esc(v)+'"');
 if(tag==='a'){if(a.href&&!BAD.test(a.href)&&SAFE_URL.test(a.href.trim())){put('href',a.href.trim());if(/^https?:/i.test(a.href)){put('target','_blank');put('rel','noopener noreferrer')}}}
 else if(tag==='img'){if(a.src&&!BAD.test(a.src)&&MEDIA.test(a.src.trim())){put('src',a.src.trim());put('alt',a.alt||'');put('loading','lazy');if(/^\d{1,4}$/.test(a.width||''))put('width',a.width);if(/^\d{1,4}$/.test(a.height||''))put('height',a.height)}else return null}
 else if(tag==='iframe'){if(a.src&&YT.test(a.src.trim())){put('src',a.src.trim());put('title',a.title||'YouTube video');put('loading','lazy');put('allowfullscreen','');put('referrerpolicy','strict-origin-when-cross-origin')}else return null}
 else if(tag==='td'||tag==='th'){if(/^\d{1,2}$/.test(a.colspan||''))put('colspan',a.colspan);if(/^\d{1,2}$/.test(a.rowspan||''))put('rowspan',a.rowspan)}
 else if(tag==='div'||tag==='span'){if(a.class==='yt'||a.class==='faq')put('class',a.class)}
 return out.join('')}
function sanitize(html){let s=String(html||'').replace(/<!--[\s\S]*?-->/g,'').replace(/<(script|style|object|embed|form|textarea|select|svg|math|noscript|template)\b[\s\S]*?<\/\1\s*>/gi,'').replace(/<(script|style|object|embed|form|svg|math|noscript|template)\b[^>]*>/gi,'');
 const out=[];const stack=[];let last=0;const re=/<(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:"[^"]*"|'[^']*'|[^'">])*)>/g;let m;
 const text=t=>t.replace(/<(?![a-zA-Z\/])/g,'&lt;').replace(/>/g,'&gt;');
 while((m=re.exec(s))){out.push(text(s.slice(last,m.index)));last=re.lastIndex;const closing=m[1]==='/',tag=m[2].toLowerCase();if(!TAGS.has(tag))continue;
  if(closing){const i=stack.lastIndexOf(tag);if(i>-1){while(stack.length>i)out.push('</'+stack.pop()+'>')}continue}
  const a=attrs(tag,m[3]);if(a===null)continue;
  if(VOID.has(tag)){out.push('<'+tag+a+(tag==='br'||tag==='hr'?'>':'>'));continue}
  if(tag==='iframe'){out.push('<div class="yt"><iframe'+a+'></iframe></div>');stack.push('__skip');continue}
  out.push('<'+tag+a+'>');stack.push(tag)}
 out.push(text(s.slice(last)));while(stack.length){const t=stack.pop();if(t!=='__skip')out.push('</'+t+'>')}
 return out.join('').replace(/<\/__skip>/g,'').replace(/<div class="yt"><iframe([^>]*)><\/iframe><\/div><\/iframe>/g,'<div class="yt"><iframe$1></iframe></div>')}
module.exports={sanitize};
