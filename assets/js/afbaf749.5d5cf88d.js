"use strict";(self.webpackChunkepilot_dev_handbook=self.webpackChunkepilot_dev_handbook||[]).push([[1447],{3905:(e,r,n)=>{n.d(r,{Zo:()=>l,kt:()=>h});var t=n(67294);function i(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function a(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function o(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?a(Object(n),!0).forEach((function(r){i(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function s(e,r){if(null==e)return{};var n,t,i=function(e,r){if(null==e)return{};var n,t,i={},a=Object.keys(e);for(t=0;t<a.length;t++)n=a[t],r.indexOf(n)>=0||(i[n]=e[n]);return i}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)n=a[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var g=t.createContext({}),c=function(e){var r=t.useContext(g),n=r;return e&&(n="function"==typeof e?e(r):o(o({},r),e)),n},l=function(e){var r=c(e.components);return t.createElement(g.Provider,{value:r},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var r=e.children;return t.createElement(t.Fragment,{},r)}},f=t.forwardRef((function(e,r){var n=e.components,i=e.mdxType,a=e.originalType,g=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),p=c(n),f=i,h=p["".concat(g,".").concat(f)]||p[f]||u[f]||a;return n?t.createElement(h,o(o({ref:r},l),{},{components:n})):t.createElement(h,o({ref:r},l))}));function h(e,r){var n=arguments,i=r&&r.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=f;var s={};for(var g in r)hasOwnProperty.call(r,g)&&(s[g]=r[g]);s.originalType=e,s[p]="string"==typeof e?e:i,o[1]=s;for(var c=2;c<a;c++)o[c]=n[c];return t.createElement.apply(null,o)}return t.createElement.apply(null,n)}f.displayName="MDXCreateElement"},37004:(e,r,n)=>{n.r(r),n.d(r,{contentTitle:()=>o,default:()=>p,frontMatter:()=>a,metadata:()=>s,toc:()=>g});var t=n(87462),i=(n(67294),n(3905));const a={id:"get-sharing-configs",title:"getSharingConfigs"},o=void 0,s={unversionedId:"sharing/queries/get-sharing-configs",id:"sharing/queries/get-sharing-configs",title:"getSharingConfigs",description:"No description",source:"@site/graphql/sharing/queries/get-sharing-configs.mdx",sourceDirName:"sharing/queries",slug:"/sharing/queries/get-sharing-configs",permalink:"/graphql/sharing/queries/get-sharing-configs",tags:[],version:"current",frontMatter:{id:"get-sharing-configs",title:"getSharingConfigs"},sidebar:"appsSidebar",previous:{title:"getSharingConfig",permalink:"/graphql/sharing/queries/get-sharing-config"},next:{title:"searchPartnerSharingConfigs",permalink:"/graphql/sharing/queries/search-partner-sharing-configs"}},g=[{value:"Arguments",id:"arguments",children:[{value:"<code>partner_org_ids</code> (ID)",id:"partner_org_ids-id",children:[],level:4}],level:3},{value:"Type",id:"type",children:[{value:"PartnerSharingConfig",id:"partnersharingconfig",children:[],level:4}],level:3}],c={toc:g},l="wrapper";function p(e){let{components:r,...n}=e;return(0,i.kt)(l,(0,t.Z)({},c,n,{components:r,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"No description"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql"},"getSharingConfigs(\n  partner_org_ids: [ID!]!\n): [PartnerSharingConfig]\n")),(0,i.kt)("h3",{id:"arguments"},"Arguments"),(0,i.kt)("h4",{id:"partner_org_ids-id"},(0,i.kt)("inlineCode",{parentName:"h4"},"partner_org_ids")," (",(0,i.kt)("a",{parentName:"h4",href:"/graphql/sharing/scalars/id"},(0,i.kt)("inlineCode",{parentName:"a"},"ID")),")"),(0,i.kt)("h3",{id:"type"},"Type"),(0,i.kt)("h4",{id:"partnersharingconfig"},(0,i.kt)("a",{parentName:"h4",href:"/graphql/sharing/objects/partner-sharing-config"},(0,i.kt)("inlineCode",{parentName:"a"},"PartnerSharingConfig"))))}p.isMDXComponent=!0}}]);