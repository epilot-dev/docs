"use strict";(self.webpackChunkepilot_dev_handbook=self.webpackChunkepilot_dev_handbook||[]).push([[826],{3905:function(e,t,n){n.d(t,{Zo:function(){return l},kt:function(){return m}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=r.createContext({}),c=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},l=function(e){var t=c(e.components);return r.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,u=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),h=c(n),m=a,d=h["".concat(u,".").concat(m)]||h[m]||p[m]||i;return n?r.createElement(d,o(o({ref:t},l),{},{components:n})):r.createElement(d,o({ref:t},l))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=h;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var c=2;c<i;c++)o[c]=n[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}h.displayName="MDXCreateElement"},485:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return u},metadata:function(){return c},toc:function(){return l},default:function(){return h}});var r=n(7462),a=n(3366),i=(n(7294),n(3905)),o=["components"],s={sidebar_position:2},u="Authorization",c={unversionedId:"auth/authorization",id:"auth/authorization",title:"Authorization",description:"The epilot application uses standard OAuth 2.0 JWT tokens for authorization.",source:"@site/docs/auth/authorization.md",sourceDirName:"auth",slug:"/auth/authorization",permalink:"/docs/auth/authorization",editUrl:"https://github.com/epilot-dev/docs/edit/main/docs/auth/authorization.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Authentication",permalink:"/docs/auth/authentication"},next:{title:"Permissions",permalink:"/docs/auth/permissions"}},l=[{value:"API Gateway Authorizer",id:"api-gateway-authorizer",children:[],level:2},{value:"Permissions API",id:"permissions-api",children:[],level:2},{value:"Internal Auth",id:"internal-auth",children:[],level:2},{value:"Links",id:"links",children:[],level:2}],p={toc:l};function h(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"authorization"},"Authorization"),(0,i.kt)("p",null,"The epilot application uses standard ",(0,i.kt)("a",{parentName:"p",href:"https://oauth.net/2/"},"OAuth 2.0")," JWT tokens for authorization."),(0,i.kt)("h2",{id:"api-gateway-authorizer"},"API Gateway Authorizer"),(0,i.kt)("p",null,"Requests to non-public epilot APIs are authorized by a custom Lambda authorizer that verifies the passed JWT Token and parses the user's claims contained in the token."),(0,i.kt)("p",null,"The claims are passed to the API service as context:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'// Example ID token:\n{\n  "token_use": "id",\n  "sub": "0cd63e9c-42b4-4a38-97b8-1e41e42677e3",\n  "cognito:username": "v.kuosmanen@epilot.cloud",\n  "email": "v.kuosmanen@epilot.cloud",\n  "custom:ivy_org_id": "66",\n  "custom:ivy_user_id": "29216",\n  "email_verified": true,\n  "iss": "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_hhz2uIClH",\n  "aud": "gj9p0jreihtq00cri6a0fe306",\n  "event_id": "cf3df1cd-2aac-433c-8576-d2834c579ebb",\n  "auth_time": 1641386601,\n  "exp": 1642357470,\n  "iat": 1642353870,\n}\n')),(0,i.kt)("h2",{id:"permissions-api"},"Permissions API"),(0,i.kt)("p",null,"While the JWT token contains basic information about the identity of the authorized user such as user id and source organization, to check that the user is allowed to perform actions and access resources, we need to check the Permissions API for claims"),(0,i.kt)("p",null,"Example:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"import { tokenIsPermitted } from '@epilot/permissions';\n\nconst isPermitted = await tokenIsPermitted(context.token, 'myaction');\n")),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/docs/auth/permissions"},"Permissions Documentation")),(0,i.kt)("h2",{id:"internal-auth"},"Internal Auth"),(0,i.kt)("p",null,"Sometimes backend microservices need to make internal calls as no specific user."),(0,i.kt)("p",null,"For this purpose we use a special internal auth service as identity provider, which translates the caller's IAM role to a JWT token accepted by the API Gateway Authorizer."),(0,i.kt)("p",null,"See ",(0,i.kt)("a",{parentName:"p",href:"/docs/auth/internal-auth"},"documentation")," for the internal auth service for details."),(0,i.kt)("h2",{id:"links"},"Links"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"API Gateway Authorizer project: ",(0,i.kt)("a",{parentName:"li",href:"https://gitlab.com/e-pilot/product/auth/custom-authorizer"},"https://gitlab.com/e-pilot/product/auth/custom-authorizer")),(0,i.kt)("li",{parentName:"ul"},"Permissions package: ",(0,i.kt)("a",{parentName:"li",href:"https://www.npmjs.com/package/@epilot/permissions"},"https://www.npmjs.com/package/@epilot/permissions")),(0,i.kt)("li",{parentName:"ul"},"Internal Auth package: ",(0,i.kt)("a",{parentName:"li",href:"https://www.npmjs.com/package/@epilot/internal-auth"},"https://www.npmjs.com/package/@epilot/internal-auth"))))}h.isMDXComponent=!0}}]);