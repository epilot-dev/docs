"use strict";(self.webpackChunkepilot_dev_handbook=self.webpackChunkepilot_dev_handbook||[]).push([[3886],{3905:(t,e,r)=>{r.d(e,{Zo:()=>l,kt:()=>f});var n=r(67294);function a(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function o(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?o(Object(r),!0).forEach((function(e){a(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function c(t,e){if(null==t)return{};var r,n,a=function(t,e){if(null==t)return{};var r,n,a={},o=Object.keys(t);for(n=0;n<o.length;n++)r=o[n],e.indexOf(r)>=0||(a[r]=t[r]);return a}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(n=0;n<o.length;n++)r=o[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(a[r]=t[r])}return a}var u=n.createContext({}),p=function(t){var e=n.useContext(u),r=e;return t&&(r="function"==typeof t?t(e):i(i({},e),t)),r},l=function(t){var e=p(t.components);return n.createElement(u.Provider,{value:e},t.children)},s="mdxType",m={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},d=n.forwardRef((function(t,e){var r=t.components,a=t.mdxType,o=t.originalType,u=t.parentName,l=c(t,["components","mdxType","originalType","parentName"]),s=p(r),d=a,f=s["".concat(u,".").concat(d)]||s[d]||m[d]||o;return r?n.createElement(f,i(i({ref:e},l),{},{components:r})):n.createElement(f,i({ref:e},l))}));function f(t,e){var r=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var o=r.length,i=new Array(o);i[0]=d;var c={};for(var u in e)hasOwnProperty.call(e,u)&&(c[u]=e[u]);c.originalType=t,c[s]="string"==typeof t?t:a,i[1]=c;for(var p=2;p<o;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},45607:(t,e,r)=>{r.r(e),r.d(e,{contentTitle:()=>i,default:()=>s,frontMatter:()=>o,metadata:()=>c,toc:()=>u});var n=r(87462),a=(r(67294),r(3905));const o={sidebar_position:10},i="Architecture",c={unversionedId:"automation/architecture",id:"automation/architecture",title:"Architecture",description:"[API Docs]",source:"@site/docs/automation/architecture.md",sourceDirName:"automation",slug:"/automation/architecture",permalink:"/docs/automation/architecture",editUrl:"https://github.com/epilot-dev/docs/edit/main/docs/automation/architecture.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{sidebar_position:10},sidebar:"appsSidebar",previous:{title:"Entity Mapping",permalink:"/docs/automation/entity-mapping"},next:{title:"Partner Directory",permalink:"/docs/collaboration/partner-directory"}},u=[],p={toc:u},l="wrapper";function s(t){let{components:e,...o}=t;return(0,a.kt)(l,(0,n.Z)({},p,o,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"architecture"},"Architecture"),(0,a.kt)("p",null,"[",(0,a.kt)("a",{parentName:"p",href:"/api/automation#tag/executions"},"API Docs"),"]\n[",(0,a.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/@epilot/automation-client"},"SDK"),"]"),(0,a.kt)("p",null,(0,a.kt)("a",{target:"_blank",href:r(72903).Z},(0,a.kt)("img",{alt:"Automation Architecture Diagram",src:r(41881).Z,width:"2511",height:"1437"}))),(0,a.kt)("p",null,"The above diagram represents the implementation of epilot Automation. In nutshell:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"We store the Automation Flow Configurations in a DynamoDB Table"),(0,a.kt)("li",{parentName:"ul"},"A ",(0,a.kt)("strong",{parentName:"li"},"Trigger Listener Function")," is configured to listen to Entity Events and match them to configured Automation Triggers"),(0,a.kt)("li",{parentName:"ul"},"Matched Triggers create Executions in a DynamoDB Table"),(0,a.kt)("li",{parentName:"ul"},"An ",(0,a.kt)("strong",{parentName:"li"},"Action Dispatcher")," listens to changes in the Execution Table to dispatch jobs on the ",(0,a.kt)("strong",{parentName:"li"},"Automation Event Bus")),(0,a.kt)("li",{parentName:"ul"},"Jobs are picked up by ",(0,a.kt)("strong",{parentName:"li"},"Automation Workers"),", which are usually Lambda Step Functions configured to handle a specific type of Action")))}s.isMDXComponent=!0},72903:(t,e,r)=>{r.d(e,{Z:()=>n});const n=r.p+"assets/files/automation-architecture-a22b1f778da9b14685e721f198ab0770.png"},41881:(t,e,r)=>{r.d(e,{Z:()=>n});const n=r.p+"assets/images/automation-architecture-a22b1f778da9b14685e721f198ab0770.png"}}]);