"use strict";(self.webpackChunkepilot_dev_handbook=self.webpackChunkepilot_dev_handbook||[]).push([[6103],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>h});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),d=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},s=function(e){var t=d(e.components);return n.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),u=d(r),h=a,f=u["".concat(l,".").concat(h)]||u[h]||p[h]||i;return r?n.createElement(f,o(o({ref:t},s),{},{components:r})):n.createElement(f,o({ref:t},s))}));function h(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=u;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var d=2;d<i;d++)o[d]=r[d];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},7486:(e,t,r)=>{r.r(t),r.d(t,{contentTitle:()=>o,default:()=>s,frontMatter:()=>i,metadata:()=>c,toc:()=>l});var n=r(7462),a=(r(7294),r(3905));const i={id:"entity-resource",title:"EntityResource"},o=void 0,c={unversionedId:"sharing/objects/entity-resource",id:"sharing/objects/entity-resource",title:"EntityResource",description:"No description",source:"@site/graphql/sharing/objects/entity-resource.mdx",sourceDirName:"sharing/objects",slug:"/sharing/objects/entity-resource",permalink:"/graphql/sharing/objects/entity-resource",tags:[],version:"current",frontMatter:{id:"entity-resource",title:"EntityResource"},sidebar:"tutorialSidebar",previous:{title:"searchPartnerSharingConfigs",permalink:"/graphql/sharing/queries/search-partner-sharing-configs"},next:{title:"OfferEntityResource",permalink:"/graphql/sharing/objects/offer-entity-resource"}},l=[{value:"Fields",id:"fields",children:[{value:"<code>schema</code> (String)",id:"schema-string",children:[],level:4},{value:"<code>entity_id</code> (ID)",id:"entity_id-id",children:[],level:4},{value:"<code>parent_entity_id</code> (ID)",id:"parent_entity_id-id",children:[],level:4},{value:"<code>offer_accepted</code> (Boolean)",id:"offer_accepted-boolean",children:[],level:4},{value:"<code>updated_at</code> (String)",id:"updated_at-string",children:[],level:4},{value:"<code>created_at</code> (String)",id:"created_at-string",children:[],level:4}],level:3}],d={toc:l};function s(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"No description"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-graphql"},"type EntityResource {\n  schema: String!\n  entity_id: ID!\n  parent_entity_id: ID\n  offer_accepted: Boolean\n  updated_at: String\n  created_at: String\n}\n")),(0,a.kt)("h3",{id:"fields"},"Fields"),(0,a.kt)("h4",{id:"schema-string"},(0,a.kt)("inlineCode",{parentName:"h4"},"schema")," (",(0,a.kt)("a",{parentName:"h4",href:"/graphql/sharing/scalars/string"},(0,a.kt)("inlineCode",{parentName:"a"},"String")),")"),(0,a.kt)("h4",{id:"entity_id-id"},(0,a.kt)("inlineCode",{parentName:"h4"},"entity_id")," (",(0,a.kt)("a",{parentName:"h4",href:"/graphql/sharing/scalars/id"},(0,a.kt)("inlineCode",{parentName:"a"},"ID")),")"),(0,a.kt)("h4",{id:"parent_entity_id-id"},(0,a.kt)("inlineCode",{parentName:"h4"},"parent_entity_id")," (",(0,a.kt)("a",{parentName:"h4",href:"/graphql/sharing/scalars/id"},(0,a.kt)("inlineCode",{parentName:"a"},"ID")),")"),(0,a.kt)("h4",{id:"offer_accepted-boolean"},(0,a.kt)("inlineCode",{parentName:"h4"},"offer_accepted")," (",(0,a.kt)("a",{parentName:"h4",href:"/graphql/sharing/scalars/boolean"},(0,a.kt)("inlineCode",{parentName:"a"},"Boolean")),")"),(0,a.kt)("h4",{id:"updated_at-string"},(0,a.kt)("inlineCode",{parentName:"h4"},"updated_at")," (",(0,a.kt)("a",{parentName:"h4",href:"/graphql/sharing/scalars/string"},(0,a.kt)("inlineCode",{parentName:"a"},"String")),")"),(0,a.kt)("h4",{id:"created_at-string"},(0,a.kt)("inlineCode",{parentName:"h4"},"created_at")," (",(0,a.kt)("a",{parentName:"h4",href:"/graphql/sharing/scalars/string"},(0,a.kt)("inlineCode",{parentName:"a"},"String")),")"))}s.isMDXComponent=!0}}]);