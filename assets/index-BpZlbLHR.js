(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const d of s)if(d.type==="childList")for(const p of d.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&i(p)}).observe(document,{childList:!0,subtree:!0});function n(s){const d={};return s.integrity&&(d.integrity=s.integrity),s.referrerPolicy&&(d.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?d.credentials="include":s.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function i(s){if(s.ep)return;s.ep=!0;const d=n(s);fetch(s.href,d)}})();const ae=function(){const e=document.createElement("header"),t=`
        width: 100%;
        position: absolute;
        top: 0;
        transition: height 300ms ease-in-out, border-bottom 300ms ease-in-out;
        background-image: linear-gradient(to bottom, #000, #222);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        border-bottom-width: 1px;
        border-bottom-style: solid;
    `,n=()=>`
        ${t}
        height: 200px;
        border-bottom-color: #666;
    `,i=()=>`
        ${t}
        height: 100%;
        border-bottom-color: #000;
    `,s=()=>{e.style=n()},d=()=>{e.style=i()};return e.style=i(),{element:e,setToMinimal:s,setToMaximal:d}},se=function(e){const t=document.createElement("img");t.src=e;const n=`
        border: 1px solid white;
        border-radius: 5%;
        transition:
            width 300ms ease-in-out,
            height 300ms ease-in-out;
        box-shadow: 5px 5px black;
    `,i=()=>`
        ${n}
        height: 160px;  
    `,s=()=>`
        ${n}
        height: 300px;
    `;return t.style=s(),{element:t,setToMinimal:()=>{t.style=i()},setToMaximal:()=>{t.style=s()}}},le=function({initial:t,onGet:n,onSet:i,onUnchanged:s,onChanged:d}={}){let p=t;return new Proxy({},{get(l,c,o){if(n?.(),c==="value")return p},set(l,c,o,u){if(c==="value"){const m=p;return p=o,Object.is(o,m)?s?.(o):d?.(o,m),i?.(o),!0}return c==="onGet"?(n=typeof o=="function"?o:void 0,!0):c==="onSet"?(i=typeof o=="function"?o:void 0,!0):c==="onChanged"?(d=typeof o=="function"?o:void 0,!0):(c==="onUnchanged"&&(s=typeof o=="function"?o:void 0),!0)}})},C=Object.freeze(le),ce=function({init:e=0,max:t=1/0,onScroll:n=void 0,onMoveUp:i=void 0,onMoveDown:s=void 0,onReachTop:d=void 0,onReachBottom:p=void 0,onLeaveTop:l=void 0,onLeaveBottom:c=void 0}={}){if(typeof e!="number"||Math.floor(e)!==e||e<0||e>t)throw new Error("Initial scroll count must be a non-negative integer.");if(typeof t!="number"||Math.floor(t)!==t||t<=0)throw new Error("Maximum scroll count must be a positive integer.");const o=C({initial:e}),u=C({initial:t}),m=f=>{f.deltaY>0?o.value<u.value&&(o.value++,n?.(f),s?.(f),o.value===1&&l?.(f),o.value===u.value&&p?.(f)):f.deltaY<0&&o.value>0&&(o.value--,n?.(f),i?.(f),o.value===u.value-1&&c?.(f),o.value===0&&d?.(f))},h=new Proxy({},{get(f,r,a){if(r==="plex")return{current:o,max:u};if(r==="current")return o.value;if(r==="max")return u.value;if(r==="callback")return m},set(f,r,a,T){return r==="current"&&typeof a=="number"&&(a>u.value?o.value=u.value:a<0?o.value=0:o.value=a),r==="max"&&typeof a=="number"&&a>=0&&(u.value=a,o.value>a&&(o.value=a)),r==="onScroll"&&(n=typeof a=="function"?a:void 0),r==="onMoveDown"&&(s=typeof a=="function"?a:void 0),r==="onMoveUp"&&(i=typeof a=="function"?a:void 0),r==="onLeaveTop"&&(l=typeof a=="function"?a:void 0),r==="onLeaveBottom"&&(c=typeof a=="function"?a:void 0),r==="onReachTop"&&(d=typeof a=="function"?a:void 0),r==="onReachBottom"&&(p=typeof a=="function"?a:void 0),!0}});return Object.freeze(h)};function Q(){const e={},t=[];return{add:(l,c)=>{e[l]||(e[l]=c)},timeCall:function(l,c){if(!e[l])return;const o={key:l,delay:c};t.push(o)},callBefore:function(l,c,o){if(!e[l]||!e[c])return;const u=t.find(h=>h.key===c);if(!u||u.delay-o<0)return;const m={key:l,delay:u.delay-o};t.push(m)},callAfter:function(l,c,o){if(!e[l]||!e[c])return;const u=t.find(h=>h.key===c);if(!u)return;const m={key:l,delay:u.delay+o};t.push(m)},run:function(){t.sort((l,c)=>l.timePoint<c.timePoint),t.forEach(l=>setTimeout(e[l.key],l.delay))}}}const de=function(){const e=document.createElement("div"),t=`
        width: 1000px;
        display: flex;
        flex-direction: row;
        justify-content: start;
        gap: 50px;
        align-items: start;
        transition: height 300ms ease-in-out;
    `,n=()=>`
        ${t}
        height: 160px;
    `,i=()=>`
        ${t}
        height: 500px;
    `;return e.style=i(),{element:e,setToMinimal:()=>{e.style=n()},setToMaximal:()=>{e.style=i()}}},fe=function(e){const t=document.createElement("h1");return t.innerText=e,t.style=`
        font-size: 54px;
        font-family: "IBM Plex";
        color: rgba(0, 0, 0);
        font-weight: normal;
        text-shadow:
            1px 0px #ddd,
            0px -1px #ddd,
            -1px 0px #ddd,
            0px 1px #ddd,
            1px 1px #ddd,
            -1px 1px #ddd,
            1px -1px #ddd,
            -1px -1px #ddd,
            3px 3px #999;
        transition: font-size 300ms ease-in-out, text-border 300ms ease-in-out;
    `,{element:t,setToMaximal:()=>{t.style.fontSize="54px",t.style.textShadow=`
            1px 0px #ddd,
            0px -1px #ddd,
            -1px 0px #ddd,
            0px 1px #ddd,
            1px 1px #ddd,
            -1px 1px #ddd,
            1px -1px #ddd,
            -1px -1px #ddd,
            3px 3px #999;
        `},setToMinimal:()=>{t.style.fontSize="28px",t.style.textShadow=`
            0.5px 0px #aaa,
            0px -0.5px #aaa,
            -0.5px 0px #aaa,
            0px 0.5px #aaa,
            0.5px 0.5px #aaa,
            -0.5px 0.5px #aaa,
            0.5px -0.5px #aaa,
            -0.5px -0.5px #aaa,
            2px 2px #999;
        `}}},P=function({element:e,opacity1:t=0,opacity2:n=1,displacement:i=0,direction:s="from right",duration:d=500}){if(!e)throw new Error("Element not found.");if(typeof t!="number"||t<0||t>1)throw new Error("Initial opacity must be a number between 0 and 1.");if(typeof n!="number"||n<0||n>1)throw new Error("Initial opacity must be a number between 0 and 1.");if(typeof i!="number"||i<0)throw new Error("Displacement must be a positive integer.");if(typeof d!="number"||d<0)throw new Error("Duration must be a positive integer.");if(!["from top","from bottom","from left","from right"].includes(s))throw new Error('Direction must be either "from above", "from below", "from left" or "from right".');const p=e.style.transform,l=e.style.transition;return e.style.transform=`
        ${p?p+", ":""}
        ${s==="from top"?"translateY(-"+i+"px)":s==="from bottom"?"translateY("+i+"px)":s==="from left"?"translateX(-"+i+"px)":"translateX("+i+"px)"}
    `,e.style.opacity=t,()=>{e.style.transition=`
            ${l?`${l},`:""}
            transform ${d}ms ease-out,
            opacity ${d}ms ease-out
        `,e.style.transform=p,e.style.opacity=n,setTimeout(()=>{e.style.transition=l},d)}},me=function(e){const t=document.createElement("p");return t.innerText=e,t.style=`
        font-size: 22px;
        font-family: "IBM Plex";
        color: #eee;
        text-shadow: 2px 2px #444;
        height: fit-content;
        transition: height 300ms ease-in-out, opacity 300ms ease-in-out;
    `,{element:t,setToMinimal:()=>{t.style.height=0,t.style.opacity=0},setToMaximal:()=>{t.style.height="fit-content",t.style.opacity=1}}},pe=function({src:e,invert:t=!1,size:n=50,alt:i="Icon",title:s=void 0,setEnabled:d=!1,setSelected:p=!1,selectCallback:l=()=>{},unselectCallback:c=()=>{},hoverCallback:o=()=>{},leaveCallback:u=()=>{},clickCallback:m=()=>{}}){let h=d,f=p;const r=Math.ceil(.1*n),a=document.createElement("div");a.title=s;const T=()=>`
        width: ${n}px;
        height: ${n+2*r}px;
        padding-top: ${r}px;
        cursor: ${h?"pointer":"default"};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        gap: 0;
        user-select: none;
    `;a.style=T();const M=document.createElement("div"),g=`
            width: 100%;
            height: ${n}px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        `;M.style=g;const E=document.createElement("img");E.src=e,E.alt=i;const q=`
            transition: width 150ms ease-in-out, height 150ms ease-in-out;
            ${t?"filter: invert(100%);":""}
        `,B=()=>`
            ${q}
            width: 80%;
            height: 80%;
        `,R=()=>`
            ${q}
            width: 100%;
            height: 100%;
        `;E.style=B(),M.appendChild(E);const S=document.createElement("div"),ee=`
            background-color: #e0e0e0;
            height: ${r}px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            transition: width 150ms ease-in-out;
        `,J=()=>`
            ${ee}
            width: ${h&&f?"100%":"0"};
        `;S.style=J(),a.appendChild(M),a.appendChild(S);const K=()=>{E.style=R(),setTimeout(()=>{E.style=B()},150)},O=()=>{f||(S.style.width="100%",setTimeout(()=>{S.style.width="0"},150))},te=()=>{K(),setTimeout(O,150)},ne=()=>{h=!0,a.style.cursor="pointer",f?(E.style=B(),S.style.width="100%"):O()},oe=()=>{h=!1,a.style.cursor="default",S.style.width="0"},ie=()=>{h&&(f=!f,S.style=J(),setTimeout(()=>{f?l():c()}))};return a.addEventListener("mouseenter",re=>{o(),h&&(E.style=R())}),a.addEventListener("mouseleave",re=>{u(),h&&(E.style=B())}),a.addEventListener("click",()=>{ie(),m(),f?l():c()}),{element:a,enable:ne,disable:oe,takeBreath:K,flashLine:O,doBoth:te}},ue=function({init:e=0,max:t=1,direction:n="horizontal",position:i="top",width:s=3,startColor:{r1:d=255,g1:p=0,b1:l=0}={},endColor:{r2:c=d,g2:o=p,b2:u=l}={}}={}){if(Math.floor(t)!==t||t<0)throw new Error("The maximum value must be a non-negative integer.");if(Math.floor(e)!==e||e<0||e>t)throw new Error("The initial value must be a non-negative integer no greater than the maximum value.");if(!["horizontal","vertical"].includes(n))throw new Error('Direction must be either "horizontal" or "vertical"');if(!["top","bottom","left","right"].includes(i))throw new Error('Position must either be "top", "bottom", "left", or "right".');if(n==="horizontal"){if(!["top","bottom"].includes(i))throw new Error("A horizontal bar must be placed either at the top or at the bottom.")}else if(!["left","right"].includes(i))throw new Error("A vertical bar must be placed either on the left or on the right size.");const m=C({intitial:e}),h=()=>m.value/t,f=document.createElement("div");f.style=`
        position: absolute;
        width: ${n==="horizontal"?"100%":s+"px"};
        height: ${n==="vertical"?"100%":s+"px"};
        ${n==="horizontal"?i==="top"?"top: 0":"bottom: 0":i==="left"?"left: 0":"right: 0"};
        display: flex;
        flex-direction: ${n==="horizontal"?"row":"column"};
        justify-items: start;
    `;const r=document.createElement("div"),a=()=>`
        width: ${n==="horizontal"?Math.round(100*h())+"%":"100%"};
        height: ${n==="vertical"?Math.round(100*h())+"%":"100%"};
        transition: width ease-in-out 200ms, height ease-in-out 200ms;
        background-image: linear-gradient(
                                ${n==="horizontal"?"to right":"to bottom"},
                                rgb(${d}, ${p}, ${l}),
                                rgb(${d+Math.round((c-d)*h())}, ${p+Math.round((o-p)*h())}, ${l+Math.round(u-l)*h()}));
    `;return f.appendChild(r),m.onSet=()=>{m.value<0?m.value=0:m.value>t?m.value=t:r.style=a()},f.addEventListener("resize",()=>{r.style=a()}),new Proxy({},{get(T,M,g){if(M==="element")return f},set(T,M,g,E){return M==="current"?(typeof g=="number"&&(g<0?m.value=0:g>t?m.value=t:m.value=g),!0):(M==="max"&&typeof g=="number"&&g>=0&&(t=g,m.value>t&&(m.value=g)),!0)}})},he=function({projects:e,techs:t}){const n=C({initial:[]}),i=C({initial:[...e]}),s=C({initial:0});return n.onSet=()=>i.value=n.value.length?e.filter(c=>n.value.every(o=>c.techstack.find(u=>u.ref===o.ref))):[...e],{list:i,index:s,addToFilter:c=>{t.find(o=>o.ref===c.ref)&&(n.value.find(o=>o.ref===c.ref)||(n.value=[...n.value,c]))},removeFromFilter:c=>{t.find(o=>o.ref===c.ref)&&n.value.find(o=>o.ref===c.ref)&&(n.value=n.value.filter(o=>o.ref!==c.ref))},getView:()=>i.value.slice(s.value*3,(s.value+1)*3)}},ye=function(e){const t=document.createElement("div");return t.style=`
        width: 100%;
        height: 80vh;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 50px;
        position: absolute;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0);
    `,{element:t}},xe="Jørund Halvorsen",ge="joerundhalvorsen(at)gmail.com",be="Full-stack developer in training, focused on building clear, well-structured web applications, with attention to detail and an emphasis on thoughtful, cohesive design.",ve={username:"joerundh"},$={name:xe,email:ge,description:be,github:ve,"github-pages":{username:"joerundh"}},_=[{name:"GitHub",ref:"github",type:"host",icon:{filename:"github-icon.png",invert:!0},urlformat:{template:"https://github.com/{username}/{pathname}",keys:["username","pathname"]}},{name:"GitHub Pages",ref:"github-pages",type:"host",icon:{filename:"github-icon.png",invert:!0},urlformat:{template:"https://{username}.github.io/{pathname}",keys:["username","pathname"]}},{name:"Vercel",ref:"vercel",type:"host",icon:{filename:"vercel-icon.png",invert:!1},urlformat:{template:"https://{prefix}.vercel.app",keys:["prefix"]}}],we=function(e){const t=document.createElement("div");t.style=`
        width: 450px;
        padding: 40px;
        height: 600px;
        display: flex;
        font-family: "IBM Plex";
        flex-direction: column;
        justify-content: start;
        align-items: center;
        gap: 30px;
        border: 1px solid #444;
        color: #ccc;
        border-radius: 10px;
        backdrop-filter: invert(15%);
        transform: none;
        box-shadow: 5px 5px #111;
        transition: transform ease-in-out 150ms, backdrop-filter ease-in-out 150ms;
    `,t.onmousemove=()=>{t.style.transform="scale(110%)",t.style.backdropFilter="invert(25%)"},t.onmouseleave=()=>{t.style.transform="none",t.style.backdropFilter="invert(15%)"};const n=document.createElement("h2");n.innerText=e.name,n.style=`
        text-align: center;
        font-weight: normal;
        font-size: 20px;
        text-shadow: 2px 2px black;
    `,t.append(n);const i=document.createElement("img");i.src=`./assets/screenshots/${e.ref}-screenshot.png`,i.width=400,i.height=225,i.style=`
        border: 1px solid #444;
        border-radius: 5px;
        box-shadow: 5px 5px #111;
    `,t.append(i);const s=document.createElement("div");s.style=`
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 10px;
        justify-content: center;
        align-items: center;
    `,e.techstack.forEach(r=>{const a=document.createElement("img");a.src=`./assets/icons/${r.icon.filename}`,a.alt=`${r.name} icon`,a.title=r.name,a.style=`
            width: 20px;
            height: 20px;
            ${r.icon.invert?"filter: invert(100%);":""}
        `,s.appendChild(a)}),t.append(s);const d=document.createElement("div");d.style=`
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: 
    `,t.appendChild(d);const p=_.find(r=>r.ref===e.repository.host.ref),l=document.createElement("a");l.title=`Open ${p.name} repository`,l.target="_blank",l.style=`
        text-decoration: none;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;
    `;const c=document.createElement("img");c.alt=`${p.name} icon`,c.style=`
        width: 20px;
        height: 20px;
        ${p.icon.invert?"filter: invert(100%);":""}
    `,c.src=`./assets/icons/${p.icon.filename}`,l.appendChild(c);const o=document.createElement("span");o.innerText="Repository",o.style=`
        color: #bbb;
        text-shadow: 2px 2px black;
        transition: color 100ms ease-in-out;
    `,l.appendChild(o),l.onmouseenter=r=>{o.style.color="#fff",o.style.textDecoration="underline"},l.onmouseleave=r=>{o.style.color="#bbb",o.style.textDecoration="none"},l.href=p.urlformat.keys.map(r=>({key:r,value:r==="username"?$[p.ref].username:r==="pathname"?e.repository.pathname||e.ref:r==="name"?e.repository.name||e.ref:r==="prefix"&&e.repository.prefix||e.ref})).reduce((r,{key:a,value:T})=>r.replaceAll(`{${a}}`,T),p.urlformat.template),d.append(l);const u=_.find(r=>r.ref===e.deployment.host.ref),m=document.createElement("a");m.title=`Open ${u.name} deployment`,m.target="_blank",m.style=`
        text-decoration: none;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;
    `;const h=document.createElement("img");h.alt=`${u.name} icon`,h.style=`
        width: 20px;
        height: 20px;
        ${u.icon.invert?"filter: invert(100%);":""}
    `,h.src=`./assets/icons/${u.icon.filename}`,m.appendChild(h);const f=document.createElement("span");if(f.innerText="Deployment",f.style=`
        color: #bbb;
        text-shadow: 2px 2px black;
        transition: color 100ms ease-in-out;
    `,m.appendChild(f),m.onmouseenter=r=>{f.style.color="#fff",f.style.textDecoration="underline"},m.onmouseleave=r=>{f.style.color="#bbb",f.style.textDecoration="none"},m.href=u.urlformat.keys.map(r=>({key:r,value:r==="username"?$[u.ref].username||e.ref:r==="pathname"?e.deployment.pathname||e.ref:r==="name"?e.deployment.name||e.ref:r==="prefix"&&e.deployment.prefix||e.ref})).reduce((r,{key:a,value:T})=>r.replaceAll(`{${a}}`,T),u.urlformat.template),d.append(m),e.description){const r=document.createElement("p");r.innerText=e.description,r.style=`
            width: 100%;
            font-size: 16px;
            color: #ddd;
            text-shadow: 2px 2px black;
        `,t.appendChild(r)}return{element:t}},N=[{index:0,name:"HTML5",type:"lang",icon:{filename:"html5-icon.png"},ref:"html5",display:!0},{index:1,name:"CSS3",type:"lang",icon:{filename:"css3-icon.png"},ref:"css3",display:!0},{index:2,name:"JavaScript",type:"lang",icon:{filename:"js-icon.png"},ref:"js",display:!0},{index:3,name:"JSON",type:"format",icon:{filename:"json-icon.png"},ref:"json",display:!1},{index:4,name:"React",type:"framework",icon:{filename:"react-icon.png"},ref:"react",display:!0},{index:5,name:"Next.js",type:"framework",icon:{filename:"nextjs-icon.png",invert:!0},ref:"nextjs",display:!0},{index:6,name:"Tailwind CSS",type:"framework",icon:{filename:"tailwindcss-icon.png"},ref:"tailwindcss",display:!0},{index:7,name:"MongoDB",type:"db",icon:{filename:"mongodb-icon.png"},ref:"mongodb",display:!0},{index:8,name:"Express",type:"framework",icon:{filename:"express-icon.png",invert:!0},ref:"express",display:!0},{index:9,name:"Sanity",type:"cms",icon:{filename:"sanity-icon.png"},ref:"sanity",display:!1},{index:10,name:"Clerk",type:"auth",icon:{filename:"clerk-icon.png",invert:!0},ref:"clerk",display:!1},{index:11,name:"Vite.js",type:"build",icon:{filename:"vitejs-icon.png"},ref:"vitejs",display:!1},{index:12,name:"LaTeX",type:"typesetting",icon:{filename:"latex-icon.png",invert:!0},ref:"latex",display:!0},{index:13,name:"Chart.js",type:"graphs",icon:{filename:"chartjs-icon.png"},ref:"chartjs",display:!1}],X=[{name:"Share My Read",ref:"share-my-read",description:"An app to search for books in the Gutendex API, and to leave reviews and ratings. Employs Sanity for storage, and features authentication by Clerk.",techstack:[{ref:"nextjs"},{ref:"tailwindcss"},{ref:"sanity"},{ref:"clerk"}],repository:{host:{ref:"github"}},deployment:{host:{ref:"vercel"}}},{name:"Paper Trail",ref:"paper-trail",description:"An app to add and view references to and descriptions of scientific papers. Storage is done with MongoDb, and authentication by Clerk.",techstack:[{ref:"nextjs"},{ref:"tailwindcss"},{ref:"mongodb"},{ref:"clerk"}],repository:{host:{ref:"github"}},deployment:{host:{ref:"vercel"},prefix:"paper-trail-psi"}},{name:"Statistical Sampling",ref:"statistical-sampling",description:"Informational page about statistical distributions, with a tool to sample from one of choice from local API routes, and display the data for comparison.",techstack:[{ref:"nextjs"},{ref:"tailwindcss"},{ref:"chartjs"},{ref:"json"},{ref:"latex"}],repository:{host:{ref:"github"}},deployment:{host:{ref:"vercel"}}},{name:"Glossary of Quantum Mechanics",ref:"glossary-of-qm",description:"A collection of pages describing basic concepts of quantum mechanics, sorted into categories. Page browsing includes server-side pagination.",techstack:[{ref:"nextjs"},{ref:"tailwindcss"},{ref:"json"},{ref:"latex"}],repository:{host:{ref:"github"}},deployment:{host:{ref:"vercel"}}},{name:"Book Keeper",ref:"book-keeper",description:"An app to search for books in the Gutendex API from search query, topic, or language, with favourites and a reading list.",techstack:[{ref:"react"},{ref:"css3"},{ref:"vitejs"}],repository:{host:{ref:"github"}},deployment:{host:{ref:"vercel"},prefix:"book-keeper-blond"}},{name:"Colour Chooser",ref:"colour-chooser",description:"A tool to choose colours based on RGB, HSL, CMYK, or by name. The latest colour setting is stored in local storage.",techstack:[{ref:"react"},{ref:"css3"},{ref:"vitejs"}],repository:{host:{ref:"github"}},deployment:{host:{ref:"github-pages"}}},{name:"LaTeX to Image",ref:"latex-to-image",description:"A tool to enter LaTeX and receive an image of the resulting mathematics. Images may have a text colour and background colour of choice, custom scaling, and are downloadable as SVG or PNG.",techstack:[{ref:"html5"},{ref:"css3"},{ref:"js"},{ref:"vitejs"}],repository:{host:{ref:"github"}},deployment:{host:{ref:"github-pages"}}},{name:"Book and Author Search",ref:"book-and-author-search",description:"A tool to search for titles, authors and genres in the Open Library. Favourite titles and authors can be stored, for which local storage is employed.",techstack:[{ref:"html5"},{ref:"css3"},{ref:"js"},{ref:"vitejs"}],repository:{host:{ref:"github"}},deployment:{host:{ref:"github-pages"}}},{name:"Craftsvilla",ref:"craftsvilla",description:"A page made for a fictitous company Craftsvilla, offering spare-time arts and crafts activities, with accessories for sale and workspace available.",techstack:[{ref:"html5"},{ref:"css3"}],repository:{host:{ref:"github"}},deployment:{host:{ref:"github-pages"}}},{name:"Project Planet: Mars",ref:"mars",description:"An informative page on the planet Mars.",techstack:[{ref:"html5"},{ref:"css3"}],repository:{host:{ref:"github"},pathname:"project-planet-mars"},deployment:{host:{ref:"github-pages"},pathname:"project-planet-mars"}}];X.forEach(e=>{e.techstack=e.techstack.map(t=>N.find(n=>n.ref===t.ref))});const Ee=X.reduce((e,{techstack:t})=>(t.forEach(n=>{e.find(i=>i.ref===n.ref)||e.push(n)}),e),[]).map(e=>N.find(t=>t.ref===e.ref)).filter(e=>e.display).sort((e,t)=>e.index-t.index),L=ae(),I=de();L.element.appendChild(I.element);const k=document.createElement("div");k.style=`
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: between;
    align-items: start;
    gap: 25px;
`;L.element.appendChild(k);const F=se("./assets/profile/feature.jpg"),$e=P({element:F.element,displacement:50,duration:300});I.element.appendChild(F.element);I.element.appendChild(k);const A=fe($.name),Te=P({element:A.element,displacement:50,duration:300});k.append(A.element);const z=document.createElement("div");z.style=`
    display: flex;
    flex-direction: row;
    gap: 50px;
`;const b=document.createElement("a");b.innerText=$.email;b.href=`mailto:${$.email.replace("(at)","@")}`;b.title=`E-mail: ${$.email}`;b.style=`
    color: #999;
    font-family: "IBM Plex";
    text-shadow: 2px 2px #444;
    font-size: 20px;
    text-decoration: none;
    transition: color ease-in-out 100ms;
`;b.onmouseenter=e=>{b.style.color="#fff",b.style.textDecoration="underline"};b.onmouseleave=e=>{b.style.color="#999",b.style.textDecoration="none"};z.appendChild(b);const x=document.createElement("a"),U=`https://github.com/${$.github.username}`;x.innerText=U;x.href=U;x.target="_blank";x.title=`Github: ${$.github.username}`;x.style=`
    color: #999;
    font-family: "IBM Plex";
    text-shadow: 2px 2px #444;
    font-size: 20px;
    text-decoration: none;
    transition: color ease-in-out 100ms;
`;x.onmouseenter=e=>{x.style.color="#fff",x.style.textDecoration="underline"};x.onmouseleave=e=>{x.style.color="#999",x.style.textDecoration="none"};z.appendChild(x);const Me=P({element:z,displacement:50,duration:300});k.append(z);const Y=document.createElement("div");Y.style=`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: 10px;
`;const G=Q(),W=Ee.map((e,t)=>{const n=pe({src:`./assets/icons/${e.icon.filename}`,invert:!!e.icon.invert,title:e.name,size:40,selectCallback:()=>v.addToFilter({ref:e.ref}),unselectCallback:()=>v.removeFromFilter({ref:e.ref})}),i=P({element:n.element,displacement:30,duration:100});return Y.appendChild(n.element),G.add(`icon${t}`,i),G.timeCall(`icon${t}`,t*30),n});k.appendChild(Y);const Se=()=>W.forEach((e,t)=>{setTimeout(e.enable,200+t*50)}),ke=()=>W.forEach(e=>e.disable()),D=me($.description),Ce=P({element:D.element,displacement:50,duration:300});k.append(D.element);const je=()=>{L.setToMaximal(),I.setToMaximal(),F.setToMaximal(),A.setToMaximal(),ke(),D.setToMaximal()},Pe=()=>{L.setToMinimal(),I.setToMinimal(),F.setToMinimal(),A.setToMinimal(),Se(),D.setToMinimal()},v=he({projects:X,techs:N}),j=ye(),y=ce({init:0,max:Math.ceil(v.list.value.length/3)||1}),Z=()=>window.addEventListener("wheel",y.callback),Le=()=>window.removeEventListener("wheel",y.callback),V=()=>{Le(),setTimeout(Z,200)},H=ue({max:Math.ceil(v.list.value.length/3)||1,startColor:{r1:64,g1:64,b1:64},endColor:{r2:255,g2:255,b2:255},position:"bottom",width:5});v.list.onSet=()=>{y.max=Math.ceil(v.list.value.length/3)||1};v.index.onSet=()=>{if(V(),j.element.innerHTML="",v.list.value.length){const t=v.getView().map(i=>we(i)),n=t.map(i=>P({element:i.element,displacement:50,duration:300}));t.forEach(i=>j.element.appendChild(i.element)),n.forEach((i,s)=>setTimeout(i,100+s*50));return}const e=document.createElement("p");e.style=`
        font-size: 14px;
        font-family: "IBM Plex";
        color: #999;
    `,e.innerText="No projects containing all the chosen techs.",j.element.appendChild(e)};y.onScroll=V;y.onLeaveTop=()=>{Pe(),setTimeout(()=>{document.body.appendChild(j.element),document.body.appendChild(H.element),v.index.value=0},300)};y.onReachTop=()=>{j.element.innerHTML="",j.element.remove(),H.element.remove(),je()};y.plex.max.onSet=()=>{H.max=y.max,y.current=1};y.plex.current.onSet=()=>{y.current&&(v.index.value=y.current-1),H.current=y.current};const w=Q();document.body.appendChild(L.element);w.add("feature",()=>{$e()});w.timeCall("feature",500);w.add("name",()=>{Te()});w.timeCall("name",600);w.add("contact",()=>{Me()});w.timeCall("contact",700);w.add("description",()=>{Ce()});w.timeCall("description",800);w.add("icons",()=>{G.run()});w.timeCall("icons",900);document.title=$.name;Z();w.run();
