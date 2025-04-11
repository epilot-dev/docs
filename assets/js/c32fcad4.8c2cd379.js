"use strict";(self.webpackChunkepilot_dev_handbook=self.webpackChunkepilot_dev_handbook||[]).push([[1876],{3905:(e,t,o)=>{o.d(t,{Zo:()=>c,kt:()=>k});var r=o(67294);function n(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function a(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function l(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?a(Object(o),!0).forEach((function(t){n(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function i(e,t){if(null==e)return{};var o,r,n=function(e,t){if(null==e)return{};var o,r,n={},a=Object.keys(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||(n[o]=e[o]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(n[o]=e[o])}return n}var s=r.createContext({}),p=function(e){var t=r.useContext(s),o=t;return e&&(o="function"==typeof e?e(t):l(l({},t),e)),o},c=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},f="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},w=r.forwardRef((function(e,t){var o=e.components,n=e.mdxType,a=e.originalType,s=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),f=p(o),w=n,k=f["".concat(s,".").concat(w)]||f[w]||d[w]||a;return o?r.createElement(k,l(l({ref:t},c),{},{components:o})):r.createElement(k,l({ref:t},c))}));function k(e,t){var o=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=o.length,l=new Array(a);l[0]=w;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[f]="string"==typeof e?e:n,l[1]=i;for(var p=2;p<a;p++)l[p]=o[p];return r.createElement.apply(null,l)}return r.createElement.apply(null,o)}w.displayName="MDXCreateElement"},9127:(e,t,o)=>{o.r(t),o.d(t,{contentTitle:()=>l,default:()=>f,frontMatter:()=>a,metadata:()=>i,toc:()=>s});var r=o(87462),n=(o(67294),o(3905));const a={title:"Workflow Notes",sidebar_position:3},l="Workflow Notes",i={unversionedId:"workflows/workflow-notes",id:"workflows/workflow-notes",title:"Workflow Notes",description:"[API Docs]",source:"@site/docs/workflows/workflow-notes.md",sourceDirName:"workflows",slug:"/workflows/workflow-notes",permalink:"/docs/workflows/workflow-notes",editUrl:"https://github.com/epilot-dev/docs/edit/main/docs/workflows/workflow-notes.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{title:"Workflow Notes",sidebar_position:3},sidebar:"appsSidebar",previous:{title:"Workflow data on entities",permalink:"/docs/workflows/workflow-data-on-entities"},next:{title:"Workflow in progress",permalink:"/docs/workflows/workflow-in-progress"}},s=[],p={toc:s},c="wrapper";function f(e){let{components:t,...a}=e;return(0,n.kt)(c,(0,r.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"workflow-notes"},"Workflow Notes"),(0,n.kt)("p",null,"[",(0,n.kt)("a",{parentName:"p",href:"/api/workflow-execution"},"API Docs"),"]\n[",(0,n.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/@epilot/workflow-client"},"SDK"),"]\n[",(0,n.kt)("a",{parentName:"p",href:"https://docs.api.dev.epilot.io/discussion"},"Notes Docs"),"]"),(0,n.kt)("p",null,"Workflow Notes use the ",(0,n.kt)("a",{parentName:"p",href:"https://docs.api.dev.epilot.io/discussion#tag/Comments"},"Comments API")," with some specifications."),(0,n.kt)("p",null,"The schema remains the same except the ",(0,n.kt)("inlineCode",{parentName:"p"},"context_id"),". It should be in the format ",(0,n.kt)("inlineCode",{parentName:"p"},"{entity_id}-workflow-{workflow_id}-{task_id}"),"."),(0,n.kt)("p",null,"You can find the ids in the URL params when you are in the notes view of the task."),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"field"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"entity_id"),(0,n.kt)("td",{parentName:"tr",align:null},"Id of the entity")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"workflow_id"),(0,n.kt)("td",{parentName:"tr",align:null},"Id of the workflow")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"task_id"),(0,n.kt)("td",{parentName:"tr",align:null},"Id of the task where note should be created")))),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Workflow Notes",src:o(64958).Z,width:"1024",height:"1018"})))}f.isMDXComponent=!0},64958:(e,t,o)=>{o.d(t,{Z:()=>r});const r=o.p+"assets/images/workflow-notes-e35e4a59d2be17c8cd12aa68754c77a5.png"}}]);