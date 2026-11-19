(function(){'use strict';
/* Rich-text editor (contenteditable). Output is sanitized again on the server. */
var BT=[['p','P'],['h1','H1'],['h2','H2'],['h3','H3'],['h4','H4'],'|',['bold','B'],['italic','I'],'|',['ul','• List'],['ol','1. List'],['quote','Quote'],['code','Code'],'|',['link','Link'],['ilink','Internal link'],['table','Table'],['image','Image'],['yt','YouTube'],['faq','FAQ'],'|',['src','HTML']];
var TIPS={p:'Paragraph',h1:'Heading 1',h2:'Heading 2',h3:'Heading 3',h4:'Heading 4',bold:'Bold',italic:'Italic',ul:'Bulleted list',ol:'Numbered list',quote:'Blockquote',code:'Code block',link:'External or any link',ilink:'Link to an article or project',table:'Insert table',image:'Insert image with caption',yt:'Embed a YouTube video',faq:'Insert FAQ section',src:'Edit HTML source'};
var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
function toEditor(h){return String(h||'').replace(/src="(uploads|assets)\//g,'src="/$1/').replace(/<div class="yt"><iframe[^>]*src="https:\/\/www\.youtube-nocookie\.com\/embed\/([A-Za-z0-9_-]+)[^"]*"[^>]*><\/iframe><\/div>/g,function(m,id){return'<div class="yt-ph" contenteditable="false" data-yt="'+id+'">▶ YouTube video ('+id+')</div>'})}
function fromEditor(h){return h.replace(/src="\/(uploads|assets)\//g,'src="$1/').replace(/<div class="yt-ph"[^>]*data-yt="([A-Za-z0-9_-]+)"[^>]*>[\s\S]*?<\/div>/g,function(m,id){return'<div class="yt"><iframe src="https://www.youtube-nocookie.com/embed/'+id+'" title="YouTube video"></iframe></div>'}).replace(/ contenteditable="[^"]*"/g,'')}
function create(o){var w=document.createElement('div');w.className='rte-w';var tb=document.createElement('div');tb.className='rte-t';tb.setAttribute('role','toolbar');tb.setAttribute('aria-label','Formatting');
 var ed=document.createElement('div');ed.className='rte';ed.contentEditable='true';ed.setAttribute('role','textbox');ed.setAttribute('aria-multiline','true');ed.setAttribute('aria-label','Article content');ed.innerHTML=toEditor(o.value);
 var src=document.createElement('textarea');src.className='rte-src';src.setAttribute('aria-label','HTML source');var srcOn=false,range=null;
 function save(){var s=getSelection();if(s.rangeCount&&ed.contains(s.anchorNode))range=s.getRangeAt(0).cloneRange()}
 function restore(){ed.focus();if(range){var s=getSelection();s.removeAllRanges();s.addRange(range)}}
 function ch(){if(o.onChange)o.onChange()}
 function ex(c,v){restore();document.execCommand(c,false,v||null);ch()}
 function ins(html){restore();document.execCommand('insertHTML',false,html);ch()}
 function ytId(u){var m=/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{6,15})/.exec(u);return m&&m[1]}
 var A={p:function(){ex('formatBlock','<p>')},h1:function(){ex('formatBlock','<h1>')},h2:function(){ex('formatBlock','<h2>')},h3:function(){ex('formatBlock','<h3>')},h4:function(){ex('formatBlock','<h4>')},bold:function(){ex('bold')},italic:function(){ex('italic')},ul:function(){ex('insertUnorderedList')},ol:function(){ex('insertOrderedList')},quote:function(){ex('formatBlock','<blockquote>')},
  code:function(){restore();var t=String(getSelection()||'')||'Code here';ins('<pre><code>'+esc(t)+'</code></pre><p><br></p>')},
  link:function(){save();o.ask('Insert link','URL (https://… or a relative path)','https://').then(function(u){if(!u)return;restore();if(getSelection().isCollapsed)ins('<a href="'+esc(u)+'">'+esc(u)+'</a>');else ex('createLink',u)})},
  ilink:function(){save();o.pickInternal(function(it){restore();if(getSelection().isCollapsed)ins('<a href="'+esc(it.href)+'">'+esc(it.title)+'</a>');else ex('createLink',it.href)})},
  table:function(){save();o.ask('Insert table','Rows x columns','3x3').then(function(v){var m=/^(\d{1,2})\s*[x×,]\s*(\d{1,2})$/i.exec(v||'');if(!m)return;var r=+m[1],c=+m[2],h='<table><thead><tr>'+'<th>Heading</th>'.repeat(c)+'</tr></thead><tbody>'+('<tr>'+'<td>Cell</td>'.repeat(c)+'</tr>').repeat(Math.max(0,r-1))+'</tbody></table><p><br></p>';ins(h)})},
  image:function(){save();o.pickMedia(function(it){o.ask('Image caption','Caption (optional)','').then(function(cap){ins('<figure><img src="/'+esc(it.path)+'" alt="'+esc(it.alt||'')+'">'+(cap?'<figcaption>'+esc(cap)+'</figcaption>':'')+'</figure><p><br></p>')})})},
  yt:function(){save();o.ask('Embed YouTube video','YouTube URL','https://www.youtube.com/watch?v=').then(function(u){var id=u&&ytId(u);if(!id){if(u)o.toast('That does not look like a YouTube link.','err');return}ins('<div class="yt-ph" contenteditable="false" data-yt="'+id+'">▶ YouTube video ('+id+')</div><p><br></p>')})},
  faq:function(){ins('<h2>Frequently Asked Questions</h2><h3>Question one?</h3><p>Answer one.</p><h3>Question two?</h3><p>Answer two.</p><p><br></p>')},
  src:function(){srcOn=!srcOn;if(srcOn){src.value=fromEditor(ed.innerHTML);src.style.display='block';ed.style.display='none'}else{ed.innerHTML=toEditor(src.value);src.style.display='none';ed.style.display='block'}tb.querySelector('[data-c=src]').classList.toggle('on',srcOn);ch()}};
 BT.forEach(function(b){if(b==='|'){var s=document.createElement('span');s.className='sep';tb.appendChild(s);return}var x=document.createElement('button');x.type='button';x.textContent=b[1];x.title=TIPS[b[0]];x.setAttribute('aria-label',TIPS[b[0]]);x.setAttribute('data-c',b[0]);x.addEventListener('mousedown',function(e){e.preventDefault()});x.addEventListener('click',function(){if(srcOn&&b[0]!=='src')return;A[b[0]]()});tb.appendChild(x)});
 ed.addEventListener('input',ch);ed.addEventListener('keyup',save);ed.addEventListener('mouseup',save);src.addEventListener('input',ch);
 ed.addEventListener('paste',function(e){e.preventDefault();var t=(e.clipboardData||window.clipboardData).getData('text/plain');if(!t)return;var h=t.split(/\n{2,}/).map(function(p){return'<p>'+esc(p).replace(/\n/g,'<br>')+'</p>'}).join('');document.execCommand('insertHTML',false,h)});
 w.append(tb,ed,src);
 return{el:w,get:function(){return srcOn?src.value:fromEditor(ed.innerHTML)},set:function(h){ed.innerHTML=toEditor(h);src.value=h}}}
window.RTE={create:create};
})();
