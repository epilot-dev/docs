"use strict";(self.webpackChunkepilot_dev_handbook=self.webpackChunkepilot_dev_handbook||[]).push([[2872],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>m});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var l=a.createContext({}),s=function(e){var t=a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=s(e.components);return a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=s(r),m=n,h=u["".concat(l,".").concat(m)]||u[m]||d[m]||i;return r?a.createElement(h,o(o({ref:t},p),{},{components:r})):a.createElement(h,o({ref:t},p))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,o=new Array(i);o[0]=u;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:n,o[1]=c;for(var s=2;s<i;s++)o[s]=r[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,r)}u.displayName="MDXCreateElement"},1215:(e,t,r)=>{r.r(t),r.d(t,{contentTitle:()=>o,default:()=>p,frontMatter:()=>i,metadata:()=>c,toc:()=>l});var a=r(7462),n=(r(7294),r(3905));const i={sidebar_position:1},o="Introduction to epilot",c={unversionedId:"architecture/overview",id:"architecture/overview",title:"Introduction to epilot",description:"epilot is a multi-tenant SaaS platform for collaborative ecommerce.",source:"@site/docs/architecture/overview.md",sourceDirName:"architecture",slug:"/architecture/overview",permalink:"/docs/architecture/overview",editUrl:"https://github.com/epilot-dev/docs/edit/main/docs/architecture/overview.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Overview",permalink:"/docs/intro"},next:{title:"API First",permalink:"/docs/architecture/api-first"}},l=[{value:"Overview",id:"overview",children:[],level:2},{value:"Tech Stack",id:"tech-stack",children:[],level:2},{value:"System Architecture Diagram",id:"system-architecture-diagram",children:[],level:2}],s={toc:l};function p(e){let{components:t,...i}=e;return(0,n.kt)("wrapper",(0,a.Z)({},s,i,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"introduction-to-epilot"},"Introduction to epilot"),(0,n.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,n.kt)("div",{parentName:"div",className:"admonition-heading"},(0,n.kt)("h5",{parentName:"div"},(0,n.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,n.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,n.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,n.kt)("div",{parentName:"div",className:"admonition-content"},(0,n.kt)("p",{parentName:"div"},(0,n.kt)("em",{parentName:"p"},"epilot")," is a multi-tenant SaaS platform for collaborative ecommerce."),(0,n.kt)("p",{parentName:"div"},"Our tenants sell complex products online and collaborate with partners to deliver great ecommerce experiences to their end customers."))),(0,n.kt)("h2",{id:"overview"},"Overview"),(0,n.kt)("p",null,"The epilot application consists of:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/docs/portal/microfrontends"},"The 360 Portal")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/docs/journeys/journey-builder"},"Embeddable Journey Frontends")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://docs.epilot.io/docs/portals/customer-portal"},"Customer & Installer Portals")),(0,n.kt)("li",{parentName:"ul"},"Serverless microservices with ",(0,n.kt)("a",{parentName:"li",href:"/api"},"APIs")),(0,n.kt)("li",{parentName:"ul"},"Internal Admin Portal")),(0,n.kt)("h2",{id:"tech-stack"},"Tech Stack"),(0,n.kt)("p",null,"The portal frontend is a single-page web application (SPA) hosted on AWS CloudFront consisting of frontend microservices orchestrated by the ",(0,n.kt)("a",{parentName:"p",href:"https://single-spa.js.org/"},"single-spa")," framework."),(0,n.kt)("p",null,"Most of our frontend codebase is written in React and Typescript but other frameworks such as Svelte are also used in parts of the application."),(0,n.kt)("p",null,"The epilot application backend consists of serverless microservices written mostly in Typescript and Python leveraging serverless AWS services such as Lambda, Step Functions, API Gateway, S3, DynamoDB, EventBridge."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Tech Stack",src:r(201).Z,width:"1684",height:"2402"})),(0,n.kt)("p",null,"Check out our ",(0,n.kt)("a",{parentName:"p",href:"https://docs.epilot.io/techradar/"},"Tech Radar")," for a more detailed view of our tech stack!"),(0,n.kt)("h2",{id:"system-architecture-diagram"},"System Architecture Diagram"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"System Architecture Diagram",src:r(2265).Z,width:"4811",height:"3325"})))}p.isMDXComponent=!0},201:(e,t,r)=>{r.d(t,{Z:()=>a});const a=r.p+"assets/images/epilot-tech-stack-6248cdae2e5149ab600d76ed539ab067.png"},2265:(e,t,r)=>{r.d(t,{Z:()=>a});const a=r.p+"assets/images/system-architecture-885d1f96461055d47c2e42c6342ed1fa.jpg"}}]);