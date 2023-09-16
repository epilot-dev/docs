"use strict";(self.webpackChunkepilot_dev_handbook=self.webpackChunkepilot_dev_handbook||[]).push([[8123],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>m});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var u=o.createContext({}),p=function(e){var t=o.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},s=function(e){var t=p(e.components);return o.createElement(u.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,u=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),d=p(n),m=r,y=d["".concat(u,".").concat(m)]||d[m]||c[m]||i;return n?o.createElement(y,a(a({ref:t},s),{},{components:n})):o.createElement(y,a({ref:t},s))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,a=new Array(i);a[0]=d;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l.mdxType="string"==typeof e?e:r,a[1]=l;for(var p=2;p<i;p++)a[p]=n[p];return o.createElement.apply(null,a)}return o.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4721:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>a,default:()=>s,frontMatter:()=>i,metadata:()=>l,toc:()=>u});var o=n(7462),r=(n(7294),n(3905));const i={},a="Post Qualification Journey",l={unversionedId:"journeys/post-qualification",id:"journeys/post-qualification",title:"Post Qualification Journey",description:"What is a post qualification journey?",source:"@site/docs/journeys/post-qualification.md",sourceDirName:"journeys",slug:"/journeys/post-qualification",permalink:"/docs/journeys/post-qualification",editUrl:"https://github.com/epilot-dev/docs/edit/main/docs/journeys/post-qualification.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Journey Launcher",permalink:"/docs/journeys/journey-launcher"},next:{title:"Components Library",permalink:"/docs/ui-design/component_library"}},u=[{value:"What is a post qualification journey?",id:"what-is-a-post-qualification-journey",children:[],level:2},{value:"Steps",id:"steps",children:[{value:"Configure Journey 1",id:"configure-journey-1",children:[],level:3},{value:"Configure and embed Journey 2",id:"configure-and-embed-journey-2",children:[],level:3},{value:"Adjust E-Mail Template",id:"adjust-e-mail-template",children:[],level:3}],level:2}],p={toc:u};function s(e){let{components:t,...i}=e;return(0,r.kt)("wrapper",(0,o.Z)({},p,i,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"post-qualification-journey"},"Post Qualification Journey"),(0,r.kt)("h2",{id:"what-is-a-post-qualification-journey"},"What is a post qualification journey?"),(0,r.kt)("p",null,"A post qualification journey comes in combination with another journey. Journey 1 collects the lead - e.g. contact info & product interest. The second Journey collects additional information about lead - e.g. roof details. An email is sent to any Contact of Journey 1 via link in email as part of the Journeys Automation."),(0,r.kt)("p",null,"It works by passing and processing a query parameter ",(0,r.kt)("inlineCode",{parentName:"p"},"opportunity_id")," to the the post qualification journey (2nd). Doing so, will update the opportunity created by Journey 1."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Submission Behavior:")),(0,r.kt)("p",null,"Journey 1"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"create Contact"),(0,r.kt)("li",{parentName:"ul"},"create Opportunity")),(0,r.kt)("p",null,"Journey 2"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"update Opportunity created by Journey 1")),(0,r.kt)("h2",{id:"steps"},"Steps"),(0,r.kt)("p",null,"The further sections describe the process of how to achieve the above mentioned submission behavior"),(0,r.kt)("h3",{id:"configure-journey-1"},"Configure Journey 1"),(0,r.kt)("p",null,"Configure this journey meeting your companies requirements. It just needs to create an Opportunity. You can check that by looking into the respective Automation from the Journey-Builder."),(0,r.kt)("p",null,"The Journeys automation is already prepared to accept and process the previously described parameter ",(0,r.kt)("inlineCode",{parentName:"p"},"opportunity_id")),(0,r.kt)("p",null,"Additionally add a \u201cSend E-Mail\u201d action selecting a template, which later on contains the link to the 2nd Journey."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Automation Setup",src:n(4870).Z,width:"3454",height:"1998"})),(0,r.kt)("h3",{id:"configure-and-embed-journey-2"},"Configure and embed Journey 2"),(0,r.kt)("p",null,"Configure this journey meeting your companies requirements."),(0,r.kt)("p",null,"Embedding the post qualification journey differs slightly from the default embed options the Journey Builder provides. The embed code needs to be enriched to take the ",(0,r.kt)("inlineCode",{parentName:"p"},"opportunity_id")," parameter from the website, and pass it to the journey."),(0,r.kt)("p",null,"To do so, first, save the Journey and configure the embedding."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Embed Configurator",src:n(3468).Z,width:"3454",height:"2000"})),(0,r.kt)("p",null,"In your clipboard you will have an embed code similar to this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<div style="width:100%;text-align:left"><button onclick="__epilot?.enterFullScreen(\'<your-journey-id>\')" style="background:#0398E5FF;border:none;cursor:pointer;border-radius:4px;padding:14px 48px;color:#fff">Show Content</button></div>\n<script data-ep-init="false" src="https://embed.journey.epilot.io/bundle.js"><\/script>\n<script>\n    __epilot.init([{journeyId: "<your-journey-id>", mode: "full-screen", scrollToTop: true, topBar: true, lang: "en"}])\n<\/script>\n')),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"1. Get website parameters")),(0,r.kt)("p",null,"In order to take the parameter ",(0,r.kt)("inlineCode",{parentName:"p"},"opportunity_id")," from the website we need to enrich the code to do that just before the ","_","_","epilot.init() call by adding:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},"const epilotQueryString = window.location.search\nconst epilotUrlSearchParams = new URLSearchParams(epilotQueryString)\nconst epilotData = Object.fromEntries(epilotUrlSearchParams.entries())\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"2. Add parameters to journey")),(0,r.kt)("p",null,"Then, we need to pass the epilotData variable to the journeys option key contextData like:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'__epilot.init([{journeyId: "<your-journey-id>", mode: "full-screen", scrollToTop: true, topBar: true, lang: "en", contextData: epilotData}])\n')),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Full example code:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<div style="width:100%;text-align:left"><button onclick="__epilot?.enterFullScreen(\'<your-journey-id>\')" style="background:#0398E5FF;border:none;cursor:pointer;border-radius:4px;padding:14px 48px;color:#fff">Show Content</button></div>\n<script data-ep-init="false" src="https://embed.journey.epilot.io/bundle.js"><\/script>\n<script>\n    const epilotQueryString = window.location.search\n    const epilotUrlSearchParams = new URLSearchParams(epilotQueryString)\n    const epilotData = Object.fromEntries(epilotUrlSearchParams.entries())\n    __epilot.init([{journeyId: "<your-journey-id>", mode: "full-screen", scrollToTop: true, topBar: true, lang: "en", contextData: epilotData}])\n<\/script>\n')),(0,r.kt)("h3",{id:"adjust-e-mail-template"},"Adjust E-Mail Template"),(0,r.kt)("p",null,"The goal is to lead the Recipient to the post qualification journey embedded on your website, which updates the previously created opportunity. "),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Change the \u201cto\u201d fields value to a variable referencing the contact found in the opportunity. If it\u2019s the contact labeled as \u201ccustomer\u201d the variable would be:{{opportunity.contacts","[customer]",".email.0.email}}"),(0,r.kt)("li",{parentName:"ol"},"Define your content."),(0,r.kt)("li",{parentName:"ol"},"Define and add the link containing the URL to your website embedding the post qualification journey and enrich it by ?",(0,r.kt)("inlineCode",{parentName:"li"},"opportunity_id"),"={{opportunity.","_","id}}")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Example link:")),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://example.com/your-sub-page?opportunity_id=%7B%7Bopportunity._id%7D"},"https://example.com/your-sub-page?opportunity_id={{opportunity._id}"),"}"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Email template",src:n(8076).Z,width:"3456",height:"1998"})))}s.isMDXComponent=!0},4870:(e,t,n)=>{n.d(t,{Z:()=>o});const o=n.p+"assets/images/post-quali-example-automation-ac4329837c002ab2ab6ccf6ac3a32ed6.png"},8076:(e,t,n)=>{n.d(t,{Z:()=>o});const o=n.p+"assets/images/post-quali-example-email-template-a79430cedd0f8491ab1035b9c7c61fd5.png"},3468:(e,t,n)=>{n.d(t,{Z:()=>o});const o=n.p+"assets/images/post-quali-example-embed-55c85808e8c3ef576b27b31eee902287.png"}}]);