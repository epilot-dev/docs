"use strict";(self.webpackChunkepilot_dev_handbook=self.webpackChunkepilot_dev_handbook||[]).push([[3986],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>h});var i=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},a=Object.keys(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=i.createContext({}),s=function(e){var t=i.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=s(e.components);return i.createElement(p.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},m=i.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,p=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),c=s(n),m=r,h=c["".concat(p,".").concat(m)]||c[m]||d[m]||a;return n?i.createElement(h,l(l({ref:t},u),{},{components:n})):i.createElement(h,l({ref:t},u))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,l=new Array(a);l[0]=m;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o[c]="string"==typeof e?e:r,l[1]=o;for(var s=2;s<a;s++)l[s]=n[s];return i.createElement.apply(null,l)}return i.createElement.apply(null,n)}m.displayName="MDXCreateElement"},98520:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>l,default:()=>c,frontMatter:()=>a,metadata:()=>o,toc:()=>p});var i=n(87462),r=(n(67294),n(3905));const a={sidebar_position:2,title:"Installing a Blueprint",hide_title:!0},l=void 0,o={unversionedId:"blueprints/installing-a-blueprint",id:"blueprints/installing-a-blueprint",title:"Installing a Blueprint",description:"Installing a Blueprint",source:"@site/docs/blueprints/installing-a-blueprint.md",sourceDirName:"blueprints",slug:"/blueprints/installing-a-blueprint",permalink:"/docs/blueprints/installing-a-blueprint",editUrl:"https://github.com/epilot-dev/docs/edit/main/docs/blueprints/installing-a-blueprint.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Installing a Blueprint",hide_title:!0},sidebar:"appsSidebar",previous:{title:"Blueprints",permalink:"/docs/blueprints/intro"},next:{title:"Sandbox",permalink:"/docs/blueprints/sandbox"}},p=[{value:"Installing a Blueprint",id:"installing-a-blueprint",children:[],level:2}],s={toc:p},u="wrapper";function c(e){let{components:t,...a}=e;return(0,r.kt)(u,(0,i.Z)({},s,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"installing-a-blueprint"},"Installing a Blueprint"),(0,r.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"Blueprints are currently in closed ",(0,r.kt)("strong",{parentName:"p"},"BETA")," only available to selected customers."))),(0,r.kt)("p",null,"To manage and install Blueprints, navigate to the ",(0,r.kt)("a",{parentName:"p",href:"https://portal.epilot.cloud/app/blueprints"},"Configuration > Blueprints")," in the epilot portal."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Blueprints",src:n(55182).Z,width:"1387",height:"542"})),(0,r.kt)("p",null,'To install a new Blueprint, click on "Install Blueprint" and choose the source for your Blueprint.'),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"If you already have a Blueprint zip file, you can choose ",(0,r.kt)("em",{parentName:"li"},"Upload File")),(0,r.kt)("li",{parentName:"ol"},'Choose "Marketplace" to pick a Blueprint from the ',(0,r.kt)("a",{parentName:"li",href:"https://marketplace.epilot.cloud"},"epilot Marketplace"),"."),(0,r.kt)("li",{parentName:"ol"},"Or if you wish to copy resources from another epilot organization, you can choose ",(0,r.kt)("em",{parentName:"li"},'"Sandbox"'),".")),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Install Blueprint",src:n(13612).Z,width:"1172",height:"470"})),(0,r.kt)("p",null,"After picking a blueprint from your source, epilot will show a preview (plan) of what will get added or changed in your organization as part of the Blueprint. "),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Note that at this point, no changes will be made to your organization and you can still review the Blueprint before installing it!")),(0,r.kt)("p",null,"After you have reviewed the changes, click on ",(0,r.kt)("em",{parentName:"p"},"Import Resources")," to start the Blueprint installation."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"View Plan Step",src:n(10513).Z,width:"1162",height:"733"})),(0,r.kt)("p",null,"The installation will take up to a few minutes to complete. "),(0,r.kt)("p",null,"After the installation is complete, you will see a list of all the resources that were installed, and can click on each one to view the details and edit the configuration."),(0,r.kt)("p",null,"We recommend that you test the Blueprint in a sandbox environment before installing it in your production organization."))}c.isMDXComponent=!0},13612:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/install-blueprint-268664e2c776d5ba7264f71d4f2fc9be.png"},55182:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/installed-blueprints-12361dd39d6d1b0f5017ebcdd0093db6.png"},10513:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/view-plan-acc80e72e5dd478eee3ba7330a06162a.png"}}]);