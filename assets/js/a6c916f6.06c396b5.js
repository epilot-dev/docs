"use strict";(self.webpackChunkepilot_dev_handbook=self.webpackChunkepilot_dev_handbook||[]).push([[6253],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>h});var i=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,i,o=function(e,t){if(null==e)return{};var n,i,o={},a=Object.keys(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=i.createContext({}),p=function(e){var t=i.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},c=function(e){var t=p(e.components);return i.createElement(l.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},g=i.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(n),g=o,h=u["".concat(l,".").concat(g)]||u[g]||d[g]||a;return n?i.createElement(h,r(r({ref:t},c),{},{components:n})):i.createElement(h,r({ref:t},c))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,r=new Array(a);r[0]=g;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:o,r[1]=s;for(var p=2;p<a;p++)r[p]=n[p];return i.createElement.apply(null,r)}return i.createElement.apply(null,n)}g.displayName="MDXCreateElement"},43723:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>r,default:()=>u,frontMatter:()=>a,metadata:()=>s,toc:()=>l});var i=n(87462),o=(n(67294),n(3905));const a={sidebar_position:1},r="Single Sign On",s={unversionedId:"sso/single-sign-on",id:"sso/single-sign-on",title:"Single Sign On",description:"In today's digital age, managing multiple usernames and passwords for various applications can be cumbersome. To enhance your experience and security, epilot is equipped with a Single Sign-On (SSO) feature. SSO simplifies this process by allowing you to access multiple services with a single set of credentials. This means less time spent managing accounts and more time focusing on what's important - your work.",source:"@site/docs/sso/single-sign-on.mdx",sourceDirName:"sso",slug:"/sso/single-sign-on",permalink:"/docs/sso/single-sign-on",editUrl:"https://github.com/epilot-dev/docs/edit/main/docs/sso/single-sign-on.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"appsSidebar",previous:{title:"Epilot Datalake",permalink:"/docs/datalake/epilot-datalake"},next:{title:"Blueprints",permalink:"/docs/blueprints/intro"}},l=[{value:"Steps to configure SSO in epilot",id:"steps-to-configure-sso-in-epilot",children:[{value:"Getting started",id:"getting-started",children:[],level:3},{value:"Attribute mappings",id:"attribute-mappings",children:[],level:3},{value:"Role mappings",id:"role-mappings",children:[],level:3},{value:"OIDC configurations",id:"oidc-configurations",children:[],level:3}],level:2}],p={toc:l},c="wrapper";function u(e){let{components:t,...a}=e;return(0,o.kt)(c,(0,i.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"single-sign-on"},"Single Sign On"),(0,o.kt)("p",null,"In today's digital age, managing multiple usernames and passwords for various applications can be cumbersome. To enhance your experience and security, epilot is equipped with a Single Sign-On (SSO) feature. SSO simplifies this process by allowing you to access multiple services with a single set of credentials. This means less time spent managing accounts and more time focusing on what's important - your work."),(0,o.kt)("h2",{id:"steps-to-configure-sso-in-epilot"},"Steps to configure SSO in epilot"),(0,o.kt)("p",null,"We support OIDC authentication right now with our SSO configurations."),(0,o.kt)("h3",{id:"getting-started"},"Getting started"),(0,o.kt)("p",null,"Navigate to the ",(0,o.kt)("b",null,"Settings")," menu on the top right in your organization's portal. Then locate the ",(0,o.kt)("b",null,"Single Sign On")," section from the drop down menu. If you cannot locate the option, please reach out to our customer success team to have it enabled for your organization."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"SSO menu",src:n(48280).Z,width:"748",height:"674"})),(0,o.kt)("p",null,"It will take you to the SSO page which will display list of all the available SSO configurations. Now click on the ",(0,o.kt)("b",null,"Create new provider")," button on the top right as shown in the picture below."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"SSO page",src:n(46701).Z,width:"2764",height:"556"})),(0,o.kt)("h3",{id:"attribute-mappings"},"Attribute mappings"),(0,o.kt)("p",null,'Now, fill in the details in the SSO configuration form as specified in the picture. Choose the provider type as "OIDC" and configure the attribute mappings for ',(0,o.kt)("inlineCode",{parentName:"p"},"email"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"display name"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"phone number"),", and ",(0,o.kt)("inlineCode",{parentName:"p"},"language")," from the token payload."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"SSO attribute mappings",src:n(60512).Z,width:"2766",height:"1716"})),(0,o.kt)("h3",{id:"role-mappings"},"Role mappings"),(0,o.kt)("p",null,"Now, you can configure the role mappings for the authenticated user based on the claims from the token payload. You can also choose the default role, which will be assigned to the user if none of the role mappings match."),(0,o.kt)("p",null,"When Dynamic Role Mapping is enabled, user roles are synchronized with the epilot portal each time the user logs in via SSO. If disabled, roles are only mapped during the user's initial SSO login to the epilot portal."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"SSO role mappings",src:n(68223).Z,width:"897",height:"550"})),(0,o.kt)("h3",{id:"oidc-configurations"},"OIDC configurations"),(0,o.kt)("p",null,"You can create a new app registration in Azure Active Directory and add the corresponding platform as ",(0,o.kt)("b",null,"Single Page Application")," with the redirect URL as ",(0,o.kt)("inlineCode",{parentName:"p"},"https://portal.epilot.cloud/sso"),"."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"SSO redirect",src:n(72778).Z,width:"1946",height:"944"})),(0,o.kt)("p",null,"Once the app registration is complete, create a new secret and fill in the details such as ",(0,o.kt)("inlineCode",{parentName:"p"},"OIDC Issuer URL"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"Client ID"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"Client Secret"),", and ",(0,o.kt)("inlineCode",{parentName:"p"},"Scope")," as shown in the picture below."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"SSO OIDC",src:n(30358).Z,width:"1384",height:"970"})),(0,o.kt)("p",null,"Now click on ",(0,o.kt)("b",null,"save"),". You can directly login using the SSO, by copying the url from the saved configuration. If you have any further questions or need assistance with setting up SSO, please reach out to our team."))}u.isMDXComponent=!0},60512:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/sso-add-new-f5c9017bfb35109a2800ae5ead6adb62.png"},48280:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/sso-menu-e3413389d8e625bf01c0440db8827410.png"},30358:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/sso-oidc-60b7390cec752cf5f101823fdacf414e.png"},46701:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/sso-page-b8e921210bd99d67652f967f0fce2995.png"},72778:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/sso-redirect-d3000381c13cf349859b6a19b76d30c7.png"},68223:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/sso-role-mapping-3531e7063eba03703e0e72834209ff58.png"}}]);