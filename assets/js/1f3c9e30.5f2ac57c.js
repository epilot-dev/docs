"use strict";(self.webpackChunkepilot_dev_handbook=self.webpackChunkepilot_dev_handbook||[]).push([[2205],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>g});var n=r(67294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var l=n.createContext({}),s=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},u=function(e){var t=s(e.components);return n.createElement(l.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),c=s(r),f=i,g=c["".concat(l,".").concat(f)]||c[f]||d[f]||a;return r?n.createElement(g,o(o({ref:t},u),{},{components:r})):n.createElement(g,o({ref:t},u))}));function g(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,o=new Array(a);o[0]=f;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p[c]="string"==typeof e?e:i,o[1]=p;for(var s=2;s<a;s++)o[s]=r[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},24980:(e,t,r)=>{r.r(t),r.d(t,{contentTitle:()=>o,default:()=>c,frontMatter:()=>a,metadata:()=>p,toc:()=>l});var n=r(87462),i=(r(67294),r(3905));const a={id:"offer-status-input",title:"OfferStatusInput"},o=void 0,p={unversionedId:"sharing/inputs/offer-status-input",id:"sharing/inputs/offer-status-input",title:"OfferStatusInput",description:"No description",source:"@site/graphql/sharing/inputs/offer-status-input.mdx",sourceDirName:"sharing/inputs",slug:"/sharing/inputs/offer-status-input",permalink:"/graphql/sharing/inputs/offer-status-input",tags:[],version:"current",frontMatter:{id:"offer-status-input",title:"OfferStatusInput"},sidebar:"appsSidebar",previous:{title:"OfferEntityResourceInput",permalink:"/graphql/sharing/inputs/offer-entity-resource-input"},next:{title:"PartnerEntitiesInput",permalink:"/graphql/sharing/inputs/partner-entities-input"}},l=[{value:"Fields",id:"fields",children:[{value:"<code>partner_org_id</code> (ID)",id:"partner_org_id-id",children:[],level:4},{value:"<code>sharing_org_id</code> (ID)",id:"sharing_org_id-id",children:[],level:4},{value:"<code>entity_id</code> (ID)",id:"entity_id-id",children:[],level:4}],level:3}],s={toc:l},u="wrapper";function c(e){let{components:t,...r}=e;return(0,i.kt)(u,(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"No description"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql"},"input OfferStatusInput {\n  partner_org_id: ID!\n  sharing_org_id: ID!\n  entity_id: ID!\n}\n")),(0,i.kt)("h3",{id:"fields"},"Fields"),(0,i.kt)("h4",{id:"partner_org_id-id"},(0,i.kt)("inlineCode",{parentName:"h4"},"partner_org_id")," (",(0,i.kt)("a",{parentName:"h4",href:"/graphql/sharing/scalars/id"},(0,i.kt)("inlineCode",{parentName:"a"},"ID")),")"),(0,i.kt)("h4",{id:"sharing_org_id-id"},(0,i.kt)("inlineCode",{parentName:"h4"},"sharing_org_id")," (",(0,i.kt)("a",{parentName:"h4",href:"/graphql/sharing/scalars/id"},(0,i.kt)("inlineCode",{parentName:"a"},"ID")),")"),(0,i.kt)("h4",{id:"entity_id-id"},(0,i.kt)("inlineCode",{parentName:"h4"},"entity_id")," (",(0,i.kt)("a",{parentName:"h4",href:"/graphql/sharing/scalars/id"},(0,i.kt)("inlineCode",{parentName:"a"},"ID")),")"))}c.isMDXComponent=!0}}]);