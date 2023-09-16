"use strict";(self.webpackChunkepilot_dev_handbook=self.webpackChunkepilot_dev_handbook||[]).push([[3488],{3905:(e,t,r)=>{r.d(t,{Zo:()=>f,kt:()=>d});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},f=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,f=s(e,["components","mdxType","originalType","parentName"]),u=c(r),d=a,g=u["".concat(l,".").concat(d)]||u[d]||p[d]||i;return r?n.createElement(g,o(o({ref:t},f),{},{components:r})):n.createElement(g,o({ref:t},f))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var c=2;c<i;c++)o[c]=r[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},9856:(e,t,r)=>{r.r(t),r.d(t,{contentTitle:()=>o,default:()=>f,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var n=r(7462),a=(r(7294),r(3905));const i={id:"offer-status",title:"OfferStatus"},o=void 0,s={unversionedId:"sharing/objects/offer-status",id:"sharing/objects/offer-status",title:"OfferStatus",description:"No description",source:"@site/graphql/sharing/objects/offer-status.mdx",sourceDirName:"sharing/objects",slug:"/sharing/objects/offer-status",permalink:"/graphql/sharing/objects/offer-status",tags:[],version:"current",frontMatter:{id:"offer-status",title:"OfferStatus"},sidebar:"tutorialSidebar",previous:{title:"OfferEntityResource",permalink:"/graphql/sharing/objects/offer-entity-resource"},next:{title:"PartialEntity",permalink:"/graphql/sharing/objects/partial-entity"}},l=[{value:"Fields",id:"fields",children:[{value:"<code>entity</code> (PartialEntity)",id:"entity-partialentity",children:[],level:4},{value:"<code>offer_status</code> (OfferStatusEnum)",id:"offer_status-offerstatusenum",children:[],level:4},{value:"<code>status_changed_at</code> (String)",id:"status_changed_at-string",children:[],level:4},{value:"<code>offered_at</code> (String)",id:"offered_at-string",children:[],level:4},{value:"<code>accepted_by_org_id</code> (String)",id:"accepted_by_org_id-string",children:[],level:4}],level:3}],c={toc:l};function f(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"No description"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-graphql"},"type OfferStatus {\n  entity: PartialEntity!\n  offer_status: OfferStatusEnum!\n  status_changed_at: String\n  offered_at: String\n  accepted_by_org_id: String\n}\n")),(0,a.kt)("h3",{id:"fields"},"Fields"),(0,a.kt)("h4",{id:"entity-partialentity"},(0,a.kt)("inlineCode",{parentName:"h4"},"entity")," (",(0,a.kt)("a",{parentName:"h4",href:"/graphql/sharing/objects/partial-entity"},(0,a.kt)("inlineCode",{parentName:"a"},"PartialEntity")),")"),(0,a.kt)("h4",{id:"offer_status-offerstatusenum"},(0,a.kt)("inlineCode",{parentName:"h4"},"offer_status")," (",(0,a.kt)("a",{parentName:"h4",href:"/graphql/sharing/enums/offer-status-enum"},(0,a.kt)("inlineCode",{parentName:"a"},"OfferStatusEnum")),")"),(0,a.kt)("h4",{id:"status_changed_at-string"},(0,a.kt)("inlineCode",{parentName:"h4"},"status_changed_at")," (",(0,a.kt)("a",{parentName:"h4",href:"/graphql/sharing/scalars/string"},(0,a.kt)("inlineCode",{parentName:"a"},"String")),")"),(0,a.kt)("h4",{id:"offered_at-string"},(0,a.kt)("inlineCode",{parentName:"h4"},"offered_at")," (",(0,a.kt)("a",{parentName:"h4",href:"/graphql/sharing/scalars/string"},(0,a.kt)("inlineCode",{parentName:"a"},"String")),")"),(0,a.kt)("h4",{id:"accepted_by_org_id-string"},(0,a.kt)("inlineCode",{parentName:"h4"},"accepted_by_org_id")," (",(0,a.kt)("a",{parentName:"h4",href:"/graphql/sharing/scalars/string"},(0,a.kt)("inlineCode",{parentName:"a"},"String")),")"))}f.isMDXComponent=!0}}]);