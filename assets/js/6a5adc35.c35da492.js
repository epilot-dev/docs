"use strict";(self.webpackChunkepilot_dev_handbook=self.webpackChunkepilot_dev_handbook||[]).push([[722],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return d}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,c=e.parentName,s=a(e,["components","mdxType","originalType","parentName"]),f=p(n),d=o,m=f["".concat(c,".").concat(d)]||f[d]||u[d]||i;return n?r.createElement(m,l(l({ref:t},s),{},{components:n})):r.createElement(m,l({ref:t},s))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,l=new Array(i);l[0]=f;var a={};for(var c in t)hasOwnProperty.call(t,c)&&(a[c]=t[c]);a.originalType=e,a.mdxType="string"==typeof e?e:o,l[1]=a;for(var p=2;p<i;p++)l[p]=n[p];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},8872:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return a},contentTitle:function(){return c},metadata:function(){return p},toc:function(){return s},default:function(){return f}});var r=n(7462),o=n(3366),i=(n(7294),n(3905)),l=["components"],a={sidebar_position:2},c="Microfrontends",p={unversionedId:"portal/microfrontends",id:"portal/microfrontends",title:"Microfrontends",description:"The 360 portal application consists of multiple frontend microservices, governed by single-spa.",source:"@site/docs/360-portal/microfrontends.md",sourceDirName:"360-portal",slug:"/portal/microfrontends",permalink:"/docs/portal/microfrontends",editUrl:"https://github.com/epilot-dev/docs/edit/main/docs/360-portal/microfrontends.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Internal Auth",permalink:"/docs/auth/internal-auth"},next:{title:"@epilot360/i18n",permalink:"/docs/portal/libs/i18n"}},s=[{value:"@epilot360/root-config",id:"epilot360root-config",children:[],level:2},{value:"Layout",id:"layout",children:[],level:2},{value:"Links",id:"links",children:[],level:2}],u={toc:s};function f(e){var t=e.components,a=(0,o.Z)(e,l);return(0,i.kt)("wrapper",(0,r.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"microfrontends"},"Microfrontends"),(0,i.kt)("p",null,"The 360 portal application consists of multiple frontend microservices, governed by ",(0,i.kt)("a",{parentName:"p",href:"https://single-spa.js.org/"},"single-spa"),"."),(0,i.kt)("h2",{id:"epilot360root-config"},"@epilot360/root-config"),(0,i.kt)("p",null,"This is the root project defining the microfrontend layout and import maps containing references to the correct bundle for each microfrontend application."),(0,i.kt)("p",null,"The project also contains the centralised localisation files."),(0,i.kt)("h2",{id:"layout"},"Layout"),(0,i.kt)("p",null,"The basic layout consists of the following parts:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"@epilot360/login",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Login overlay"),(0,i.kt)("li",{parentName:"ul"},"Manages the user login state of the entire application"))),(0,i.kt)("li",{parentName:"ul"},"@epilot360/topbar",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Top bar menus"),(0,i.kt)("li",{parentName:"ul"},"Global search"),(0,i.kt)("li",{parentName:"ul"},"Notifications"))),(0,i.kt)("li",{parentName:"ul"},"@epilot360/sidebar",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Main left sidebar navigation")))),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"single spa layout",src:n(9916).Z})),(0,i.kt)("h2",{id:"links"},"Links"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Full list of 360 microfrontends: ",(0,i.kt)("a",{parentName:"li",href:"https://gitlab.com/e-pilot/product/360-portal/epilot360-root-config#microfrontends"},"https://gitlab.com/e-pilot/product/360-portal/epilot360-root-config#microfrontends"))))}f.isMDXComponent=!0},9916:function(e,t,n){t.Z=n.p+"assets/images/single-spa-c190c4cc6c495ec9c6b2c4b4b0f9a990.png"}}]);