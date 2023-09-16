"use strict";(self.webpackChunkepilot_dev_handbook=self.webpackChunkepilot_dev_handbook||[]).push([[826],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>m});var r=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var p=r.createContext({}),l=function(e){var t=r.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},c=function(e){var t=l(e.components);return r.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,p=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),h=l(a),m=n,d=h["".concat(p,".").concat(m)]||h[m]||u[m]||o;return a?r.createElement(d,i(i({ref:t},c),{},{components:a})):r.createElement(d,i({ref:t},c))}));function m(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,i=new Array(o);i[0]=h;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:n,i[1]=s;for(var l=2;l<o;l++)i[l]=a[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}h.displayName="MDXCreateElement"},485:(e,t,a)=>{a.r(t),a.d(t,{contentTitle:()=>i,default:()=>c,frontMatter:()=>o,metadata:()=>s,toc:()=>p});var r=a(7462),n=(a(7294),a(3905));const o={sidebar_position:2},i="Authorization",s={unversionedId:"auth/authorization",id:"auth/authorization",title:"Authorization",description:"The epilot application uses standard OAuth 2.0 tokens (JWT) for authorization.",source:"@site/docs/auth/authorization.md",sourceDirName:"auth",slug:"/auth/authorization",permalink:"/docs/auth/authorization",editUrl:"https://github.com/epilot-dev/docs/edit/main/docs/auth/authorization.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Access Tokens",permalink:"/docs/auth/access-tokens"},next:{title:"Permissions",permalink:"/docs/auth/permissions"}},p=[{value:"Authorization Header",id:"authorization-header",children:[],level:2},{value:"API Gateway Authorizer",id:"api-gateway-authorizer",children:[],level:2},{value:"Permissions API",id:"permissions-api",children:[],level:2},{value:"Links",id:"links",children:[],level:2}],l={toc:p};function c(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,r.Z)({},l,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"authorization"},"Authorization"),(0,n.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,n.kt)("div",{parentName:"div",className:"admonition-heading"},(0,n.kt)("h5",{parentName:"div"},(0,n.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,n.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,n.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,n.kt)("div",{parentName:"div",className:"admonition-content"},(0,n.kt)("p",{parentName:"div"},"The epilot application uses standard ",(0,n.kt)("a",{parentName:"p",href:"https://oauth.net/2/"},"OAuth 2.0")," tokens (JWT) for authorization."))),(0,n.kt)("h2",{id:"authorization-header"},"Authorization Header"),(0,n.kt)("p",null,"A valid bearer token should be passed in the ",(0,n.kt)("inlineCode",{parentName:"p"},"Authorization")," request header to authorize API requests."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"Authorization: Bearer <your-access-token>\n")),(0,n.kt)("h2",{id:"api-gateway-authorizer"},"API Gateway Authorizer"),(0,n.kt)("p",null,"Requests to epilot APIs are authorized on the API Gateway level. Token claims are passed to backend microservices."),(0,n.kt)("h2",{id:"permissions-api"},"Permissions API"),(0,n.kt)("p",null,"While the JWT token contains basic information about the identity of the authorized user such as user id and source organization, to check that the user is allowed to perform actions and access resources, we need to check the Permissions API for claims"),(0,n.kt)("p",null,"Example:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-js"},"import { tokenIsPermitted } from '@epilot/permissions'\n\nconst isPermitted = await tokenIsPermitted(context.token, 'myaction')\n")),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/auth/permissions"},"Permissions Documentation")),(0,n.kt)("h2",{id:"links"},"Links"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"API Gateway Authorizer project: ",(0,n.kt)("a",{parentName:"li",href:"https://gitlab.com/e-pilot/product/auth/custom-authorizer"},"https://gitlab.com/e-pilot/product/auth/custom-authorizer")),(0,n.kt)("li",{parentName:"ul"},"Permissions package: ",(0,n.kt)("a",{parentName:"li",href:"https://www.npmjs.com/package/@epilot/permissions"},"https://www.npmjs.com/package/@epilot/permissions")),(0,n.kt)("li",{parentName:"ul"},"Internal Auth package: ",(0,n.kt)("a",{parentName:"li",href:"https://www.npmjs.com/package/@epilot/internal-auth"},"https://www.npmjs.com/package/@epilot/internal-auth"))))}c.isMDXComponent=!0}}]);