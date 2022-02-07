"use strict";(self.webpackChunkepilot_dev_handbook=self.webpackChunkepilot_dev_handbook||[]).push([[9365],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return f}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=p(n),f=o,m=d["".concat(s,".").concat(f)]||d[f]||u[f]||i;return n?r.createElement(m,a(a({ref:t},c),{},{components:n})):r.createElement(m,a({ref:t},c))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,a[1]=l;for(var p=2;p<i;p++)a[p]=n[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},7327:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return p},toc:function(){return c},default:function(){return d}});var r=n(7462),o=n(3366),i=(n(7294),n(3905)),a=["components"],l={sidebar_position:1},s="@epilot360/i18n",p={unversionedId:"portal/libs/i18n",id:"portal/libs/i18n",title:"@epilot360/i18n",description:"Translation and localisation library for the epilot360 portal.",source:"@site/docs/360-portal/libs/i18n.md",sourceDirName:"360-portal/libs",slug:"/portal/libs/i18n",permalink:"/docs/portal/libs/i18n",editUrl:"https://github.com/epilot-dev/docs/edit/main/docs/360-portal/libs/i18n.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Microfrontends",permalink:"/docs/portal/microfrontends"},next:{title:"@epilot360/auth-service",permalink:"/docs/portal/libs/auth-service"}},c=[{value:"Usage",id:"usage",children:[],level:2},{value:"Adding Translations",id:"adding-translations",children:[],level:2}],u={toc:c};function d(e){var t=e.components,n=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"epilot360i18n"},"@epilot360/i18n"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"yarn add @epilot360/i18n\n")),(0,i.kt)("p",null,"Translation and localisation library for the epilot360 portal."),(0,i.kt)("p",null,"Uses ",(0,i.kt)("a",{parentName:"p",href:"https://www.i18next.com/"},"i18next"),"."),(0,i.kt)("h2",{id:"usage"},"Usage"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"// Component.jsx\nimport { useTranslation } from '@epilot360/i18n'\n\nexport const Component = () => {\n  const { t } = useTranslation('my-namespace')\n\n  return <h1>{t('hello_world_header', 'Hello World!')}</h1>\n}\n")),(0,i.kt)("p",null,"Translations are loaded asynchronously, so make sure to wrap your app inside ",(0,i.kt)("inlineCode",{parentName:"p"},"<React.Suspense>"),"."),(0,i.kt)("h2",{id:"adding-translations"},"Adding Translations"),(0,i.kt)("p",null,"Translations are defined in static JSON locale files in ",(0,i.kt)("a",{parentName:"p",href:"https://gitlab.com/e-pilot/product/360-portal/epilot360-root-config/-/tree/master/locales"},"epilot360-root-config"),"."),(0,i.kt)("p",null,"The easiest way to translate epilot 360 is to run the root-config project locally to see the changes immediately."),(0,i.kt)("p",null,"While running locally, missing translations will be automatically added to the locale files under ",(0,i.kt)("inlineCode",{parentName:"p"},"locales/{locale}/{namespace}.json"),"."))}d.isMDXComponent=!0}}]);