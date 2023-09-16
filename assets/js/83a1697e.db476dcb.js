"use strict";(self.webpackChunkepilot_dev_handbook=self.webpackChunkepilot_dev_handbook||[]).push([[3298],{3905:(e,t,r)=>{r.d(t,{Zo:()=>f,kt:()=>g});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),l=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},f=function(e){var t=l(e.components);return n.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},s=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,f=c(e,["components","mdxType","originalType","parentName"]),s=l(r),g=a,d=s["".concat(p,".").concat(g)]||s[g]||u[g]||i;return r?n.createElement(d,o(o({ref:t},f),{},{components:r})):n.createElement(d,o({ref:t},f))}));function g(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=s;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var l=2;l<i;l++)o[l]=r[l];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}s.displayName="MDXCreateElement"},3866:(e,t,r)=>{r.r(t),r.d(t,{contentTitle:()=>o,default:()=>f,frontMatter:()=>i,metadata:()=>c,toc:()=>p});var n=r(7462),a=(r(7294),r(3905));const i={id:"accept-offer",title:"acceptOffer"},o=void 0,c={unversionedId:"sharing/mutations/accept-offer",id:"sharing/mutations/accept-offer",title:"acceptOffer",description:"No description",source:"@site/graphql/sharing/mutations/accept-offer.mdx",sourceDirName:"sharing/mutations",slug:"/sharing/mutations/accept-offer",permalink:"/graphql/sharing/mutations/accept-offer",tags:[],version:"current",frontMatter:{id:"accept-offer",title:"acceptOffer"},sidebar:"tutorialSidebar",previous:{title:"searchPartnerSharingConfigs",permalink:"/graphql/sharing/queries/search-partner-sharing-configs"},next:{title:"assignRoleToConfig",permalink:"/graphql/sharing/mutations/assign-role-to-config"}},p=[{value:"Arguments",id:"arguments",children:[{value:"<code>input</code> (AcceptOfferInput)",id:"input-acceptofferinput",children:[],level:4}],level:3},{value:"Type",id:"type",children:[{value:"PartnerSharingConfig",id:"partnersharingconfig",children:[],level:4}],level:3}],l={toc:p};function f(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"No description"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-graphql"},"acceptOffer(\n  input: AcceptOfferInput!\n): PartnerSharingConfig\n")),(0,a.kt)("h3",{id:"arguments"},"Arguments"),(0,a.kt)("h4",{id:"input-acceptofferinput"},(0,a.kt)("inlineCode",{parentName:"h4"},"input")," (",(0,a.kt)("a",{parentName:"h4",href:"/graphql/sharing/inputs/accept-offer-input"},(0,a.kt)("inlineCode",{parentName:"a"},"AcceptOfferInput")),")"),(0,a.kt)("h3",{id:"type"},"Type"),(0,a.kt)("h4",{id:"partnersharingconfig"},(0,a.kt)("a",{parentName:"h4",href:"/graphql/sharing/objects/partner-sharing-config"},(0,a.kt)("inlineCode",{parentName:"a"},"PartnerSharingConfig"))))}f.isMDXComponent=!0}}]);