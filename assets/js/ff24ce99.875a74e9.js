"use strict";(self.webpackChunkepilot_dev_handbook=self.webpackChunkepilot_dev_handbook||[]).push([[7442],{3905:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>f});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var u=r.createContext({}),s=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},l=function(e){var t=s(e.components);return r.createElement(u.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,u=e.parentName,l=o(e,["components","mdxType","originalType","parentName"]),d=s(n),f=i,g=d["".concat(u,".").concat(f)]||d[f]||c[f]||a;return n?r.createElement(g,p(p({ref:t},l),{},{components:n})):r.createElement(g,p({ref:t},l))}));function f(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,p=new Array(a);p[0]=d;var o={};for(var u in t)hasOwnProperty.call(t,u)&&(o[u]=t[u]);o.originalType=e,o.mdxType="string"==typeof e?e:i,p[1]=o;for(var s=2;s<a;s++)p[s]=n[s];return r.createElement.apply(null,p)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9556:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>p,default:()=>l,frontMatter:()=>a,metadata:()=>o,toc:()=>u});var r=n(7462),i=(n(7294),n(3905));const a={id:"partner-entities-input",title:"PartnerEntitiesInput"},p=void 0,o={unversionedId:"sharing/inputs/partner-entities-input",id:"sharing/inputs/partner-entities-input",title:"PartnerEntitiesInput",description:"No description",source:"@site/graphql/sharing/inputs/partner-entities-input.mdx",sourceDirName:"sharing/inputs",slug:"/sharing/inputs/partner-entities-input",permalink:"/graphql/sharing/inputs/partner-entities-input",tags:[],version:"current",frontMatter:{id:"partner-entities-input",title:"PartnerEntitiesInput"},sidebar:"tutorialSidebar",previous:{title:"OfferStatusInput",permalink:"/graphql/sharing/inputs/offer-status-input"},next:{title:"PartnerOfferedEntitiesInput",permalink:"/graphql/sharing/inputs/partner-offered-entities-input"}},u=[{value:"Fields",id:"fields",children:[{value:"<code>partner_org_id</code> (ID)",id:"partner_org_id-id",children:[],level:4},{value:"<code>entities</code> (EntityResourceInput)",id:"entities-entityresourceinput",children:[],level:4}],level:3}],s={toc:u};function l(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"No description"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql"},"input PartnerEntitiesInput {\n  partner_org_id: ID!\n  entities: [EntityResourceInput!]!\n}\n")),(0,i.kt)("h3",{id:"fields"},"Fields"),(0,i.kt)("h4",{id:"partner_org_id-id"},(0,i.kt)("inlineCode",{parentName:"h4"},"partner_org_id")," (",(0,i.kt)("a",{parentName:"h4",href:"/graphql/sharing/scalars/id"},(0,i.kt)("inlineCode",{parentName:"a"},"ID")),")"),(0,i.kt)("h4",{id:"entities-entityresourceinput"},(0,i.kt)("inlineCode",{parentName:"h4"},"entities")," (",(0,i.kt)("a",{parentName:"h4",href:"/graphql/sharing/inputs/entity-resource-input"},(0,i.kt)("inlineCode",{parentName:"a"},"EntityResourceInput")),")"))}l.isMDXComponent=!0}}]);