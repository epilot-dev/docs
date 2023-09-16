"use strict";(self.webpackChunkepilot_dev_handbook=self.webpackChunkepilot_dev_handbook||[]).push([[2600],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>g});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),l=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},c=function(e){var t=l(e.components);return n.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),h=l(r),g=a,y=h["".concat(s,".").concat(g)]||h[g]||u[g]||i;return r?n.createElement(y,o(o({ref:t},c),{},{components:r})):n.createElement(y,o({ref:t},c))}));function g(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=h;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p.mdxType="string"==typeof e?e:a,o[1]=p;for(var l=2;l<i;l++)o[l]=r[l];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}h.displayName="MDXCreateElement"},4078:(e,t,r)=>{r.r(t),r.d(t,{contentTitle:()=>o,default:()=>c,frontMatter:()=>i,metadata:()=>p,toc:()=>s});var n=r(7462),a=(r(7294),r(3905));const i={id:"share-entity-with-partners",title:"shareEntityWithPartners"},o=void 0,p={unversionedId:"sharing/mutations/share-entity-with-partners",id:"sharing/mutations/share-entity-with-partners",title:"shareEntityWithPartners",description:"No description",source:"@site/graphql/sharing/mutations/share-entity-with-partners.mdx",sourceDirName:"sharing/mutations",slug:"/sharing/mutations/share-entity-with-partners",permalink:"/graphql/sharing/mutations/share-entity-with-partners",tags:[],version:"current",frontMatter:{id:"share-entity-with-partners",title:"shareEntityWithPartners"},sidebar:"tutorialSidebar",previous:{title:"offerEntityToPartners",permalink:"/graphql/sharing/mutations/offer-entity-to-partners"},next:{title:"Boolean",permalink:"/graphql/sharing/scalars/boolean"}},s=[{value:"Arguments",id:"arguments",children:[{value:"<code>input</code> (SharingEntityInput)",id:"input-sharingentityinput",children:[],level:4}],level:3},{value:"Type",id:"type",children:[{value:"PartnerSharingConfig",id:"partnersharingconfig",children:[],level:4}],level:3}],l={toc:s};function c(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"No description"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-graphql"},"shareEntityWithPartners(\n  input: SharingEntityInput!\n): [PartnerSharingConfig!]!\n")),(0,a.kt)("h3",{id:"arguments"},"Arguments"),(0,a.kt)("h4",{id:"input-sharingentityinput"},(0,a.kt)("inlineCode",{parentName:"h4"},"input")," (",(0,a.kt)("a",{parentName:"h4",href:"/graphql/sharing/inputs/sharing-entity-input"},(0,a.kt)("inlineCode",{parentName:"a"},"SharingEntityInput")),")"),(0,a.kt)("h3",{id:"type"},"Type"),(0,a.kt)("h4",{id:"partnersharingconfig"},(0,a.kt)("a",{parentName:"h4",href:"/graphql/sharing/objects/partner-sharing-config"},(0,a.kt)("inlineCode",{parentName:"a"},"PartnerSharingConfig"))))}c.isMDXComponent=!0}}]);