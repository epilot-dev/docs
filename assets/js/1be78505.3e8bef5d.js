"use strict";(self.webpackChunkepilot_dev_handbook=self.webpackChunkepilot_dev_handbook||[]).push([[9514,4608],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return p}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=r.createContext({}),s=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(i.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),m=s(n),p=a,f=m["".concat(i,".").concat(p)]||m[p]||d[p]||o;return n?r.createElement(f,l(l({ref:t},u),{},{components:n})):r.createElement(f,l({ref:t},u))}));function p(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,l=new Array(o);l[0]=m;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:a,l[1]=c;for(var s=2;s<o;s++)l[s]=n[s];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},7200:function(e,t,n){n.r(t),n.d(t,{default:function(){return Q}});var r=n(7294),a=n(3905),o=n(6291),l=n(7019),c=n(284),i=n(7462),s=n(3366),u=n(2859),d=n(9960),m=n(6010),p={plain:{backgroundColor:"#2a2734",color:"#9a86fd"},styles:[{types:["comment","prolog","doctype","cdata","punctuation"],style:{color:"#6c6783"}},{types:["namespace"],style:{opacity:.7}},{types:["tag","operator","number"],style:{color:"#e09142"}},{types:["property","function"],style:{color:"#9a86fd"}},{types:["tag-id","selector","atrule-id"],style:{color:"#eeebff"}},{types:["attr-name"],style:{color:"#c4b9fe"}},{types:["boolean","string","entity","url","attr-value","keyword","control","directive","unit","statement","regex","at-rule","placeholder","variable"],style:{color:"#ffcc99"}},{types:["deleted"],style:{textDecorationLine:"line-through"}},{types:["inserted"],style:{textDecorationLine:"underline"}},{types:["italic"],style:{fontStyle:"italic"}},{types:["important","bold"],style:{fontWeight:"bold"}},{types:["important"],style:{color:"#c4b9fe"}}]},f={Prism:n(7410).default,theme:p};function h(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function y(){return y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},y.apply(this,arguments)}var b=/\r\n|\r|\n/,v=function(e){0===e.length?e.push({types:["plain"],content:"\n",empty:!0}):1===e.length&&""===e[0].content&&(e[0].content="\n",e[0].empty=!0)},g=function(e,t){var n=e.length;return n>0&&e[n-1]===t?e:e.concat(t)},k=function(e,t){var n=e.plain,r=Object.create(null),a=e.styles.reduce((function(e,n){var r=n.languages,a=n.style;return r&&!r.includes(t)||n.types.forEach((function(t){var n=y({},e[t],a);e[t]=n})),e}),r);return a.root=n,a.plain=y({},n,{backgroundColor:null}),a};function E(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&-1===t.indexOf(r)&&(n[r]=e[r]);return n}var Z=function(e){function t(){for(var t=this,n=[],r=arguments.length;r--;)n[r]=arguments[r];e.apply(this,n),h(this,"getThemeDict",(function(e){if(void 0!==t.themeDict&&e.theme===t.prevTheme&&e.language===t.prevLanguage)return t.themeDict;t.prevTheme=e.theme,t.prevLanguage=e.language;var n=e.theme?k(e.theme,e.language):void 0;return t.themeDict=n})),h(this,"getLineProps",(function(e){var n=e.key,r=e.className,a=e.style,o=y({},E(e,["key","className","style","line"]),{className:"token-line",style:void 0,key:void 0}),l=t.getThemeDict(t.props);return void 0!==l&&(o.style=l.plain),void 0!==a&&(o.style=void 0!==o.style?y({},o.style,a):a),void 0!==n&&(o.key=n),r&&(o.className+=" "+r),o})),h(this,"getStyleForToken",(function(e){var n=e.types,r=e.empty,a=n.length,o=t.getThemeDict(t.props);if(void 0!==o){if(1===a&&"plain"===n[0])return r?{display:"inline-block"}:void 0;if(1===a&&!r)return o[n[0]];var l=r?{display:"inline-block"}:{},c=n.map((function(e){return o[e]}));return Object.assign.apply(Object,[l].concat(c))}})),h(this,"getTokenProps",(function(e){var n=e.key,r=e.className,a=e.style,o=e.token,l=y({},E(e,["key","className","style","token"]),{className:"token "+o.types.join(" "),children:o.content,style:t.getStyleForToken(o),key:void 0});return void 0!==a&&(l.style=void 0!==l.style?y({},l.style,a):a),void 0!==n&&(l.key=n),r&&(l.className+=" "+r),l})),h(this,"tokenize",(function(e,t,n,r){var a={code:t,grammar:n,language:r,tokens:[]};e.hooks.run("before-tokenize",a);var o=a.tokens=e.tokenize(a.code,a.grammar,a.language);return e.hooks.run("after-tokenize",a),o}))}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.render=function(){var e=this.props,t=e.Prism,n=e.language,r=e.code,a=e.children,o=this.getThemeDict(this.props),l=t.languages[n];return a({tokens:function(e){for(var t=[[]],n=[e],r=[0],a=[e.length],o=0,l=0,c=[],i=[c];l>-1;){for(;(o=r[l]++)<a[l];){var s=void 0,u=t[l],d=n[l][o];if("string"==typeof d?(u=l>0?u:["plain"],s=d):(u=g(u,d.type),d.alias&&(u=g(u,d.alias)),s=d.content),"string"==typeof s){var m=s.split(b),p=m.length;c.push({types:u,content:m[0]});for(var f=1;f<p;f++)v(c),i.push(c=[]),c.push({types:u,content:m[f]})}else l++,t.push(u),n.push(s),r.push(0),a.push(s.length)}l--,t.pop(),n.pop(),r.pop(),a.pop()}return v(c),i}(void 0!==l?this.tokenize(t,r,l,n):[r]),className:"prism-code language-"+n,style:void 0!==o?o.root:{},getLineProps:this.getLineProps,getTokenProps:this.getTokenProps})},t}(r.Component),T=Z;var N=n(5999),C=n(3616),_={plain:{color:"#bfc7d5",backgroundColor:"#292d3e"},styles:[{types:["comment"],style:{color:"rgb(105, 112, 152)",fontStyle:"italic"}},{types:["string","inserted"],style:{color:"rgb(195, 232, 141)"}},{types:["number"],style:{color:"rgb(247, 140, 108)"}},{types:["builtin","char","constant","function"],style:{color:"rgb(130, 170, 255)"}},{types:["punctuation","selector"],style:{color:"rgb(199, 146, 234)"}},{types:["variable"],style:{color:"rgb(191, 199, 213)"}},{types:["class-name","attr-name"],style:{color:"rgb(255, 203, 107)"}},{types:["tag","deleted"],style:{color:"rgb(255, 85, 114)"}},{types:["operator"],style:{color:"rgb(137, 221, 255)"}},{types:["boolean"],style:{color:"rgb(255, 88, 116)"}},{types:["keyword"],style:{fontStyle:"italic"}},{types:["doctype"],style:{color:"rgb(199, 146, 234)",fontStyle:"italic"}},{types:["namespace"],style:{color:"rgb(178, 204, 214)"}},{types:["url"],style:{color:"rgb(221, 221, 221)"}}]},S=n(5350),O=function(){var e=(0,C.LU)().prism,t=(0,S.Z)().isDarkTheme,n=e.theme||_,r=e.darkTheme||n;return t?r:n},P="codeBlockContainer_J+bg",I="codeBlockContent_csEI",w="codeBlockTitle_oQzk",x="codeBlock_rtdJ",L="copyButton_M3SB",j="codeBlockLines_1zSZ";function A(e){var t,n=e.children,a=e.className,o=e.metastring,l=e.title,c=(0,C.LU)().prism,s=(0,r.useState)(!1),u=s[0],d=s[1],p=(0,r.useState)(!1),h=p[0],y=p[1];(0,r.useEffect)((function(){y(!0)}),[]);var b=(0,C.bc)(o)||l,v=O(),g=Array.isArray(n)?n.join(""):n,k=null!=(t=(0,C.Vo)(a))?t:c.defaultLanguage,E=(0,C.nZ)(g,o,k),Z=E.highlightLines,_=E.code,S=function(){!function(e,t){var n=(void 0===t?{}:t).target,r=void 0===n?document.body:n,a=document.createElement("textarea"),o=document.activeElement;a.value=e,a.setAttribute("readonly",""),a.style.contain="strict",a.style.position="absolute",a.style.left="-9999px",a.style.fontSize="12pt";var l=document.getSelection(),c=!1;l.rangeCount>0&&(c=l.getRangeAt(0)),r.append(a),a.select(),a.selectionStart=0,a.selectionEnd=e.length;var i=!1;try{i=document.execCommand("copy")}catch(s){}a.remove(),c&&(l.removeAllRanges(),l.addRange(c)),o&&o.focus()}(_),d(!0),setTimeout((function(){return d(!1)}),2e3)};return r.createElement(T,(0,i.Z)({},f,{key:String(h),theme:v,code:_,language:k}),(function(e){var t=e.className,n=e.style,o=e.tokens,l=e.getLineProps,c=e.getTokenProps;return r.createElement("div",{className:(0,m.Z)(P,a,C.kM.common.codeBlock)},b&&r.createElement("div",{style:n,className:w},b),r.createElement("div",{className:(0,m.Z)(I,k)},r.createElement("pre",{tabIndex:0,className:(0,m.Z)(t,x,"thin-scrollbar"),style:n},r.createElement("code",{className:j},o.map((function(e,t){1===e.length&&"\n"===e[0].content&&(e[0].content="");var n=l({line:e,key:t});return Z.includes(t)&&(n.className+=" docusaurus-highlight-code-line"),r.createElement("span",(0,i.Z)({key:t},n),e.map((function(e,t){return r.createElement("span",(0,i.Z)({key:t},c({token:e,key:t})))})),r.createElement("br",null))})))),r.createElement("button",{type:"button","aria-label":(0,N.I)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),className:(0,m.Z)(L,"clean-btn"),onClick:S},u?r.createElement(N.Z,{id:"theme.CodeBlock.copied",description:"The copied button label on code blocks"},"Copied"):r.createElement(N.Z,{id:"theme.CodeBlock.copy",description:"The copy button label on code blocks"},"Copy"))))}))}var M=n(9649),B="details_h+cY";function D(e){var t=Object.assign({},e);return r.createElement(C.PO,(0,i.Z)({},t,{className:(0,m.Z)("alert alert--info",B,t.className)}))}var F=["mdxType","originalType"];var R={head:function(e){var t=r.Children.map(e.children,(function(e){return function(e){var t,n;if(null!=e&&null!=(t=e.props)&&t.mdxType&&null!=e&&null!=(n=e.props)&&n.originalType){var a=e.props,o=(a.mdxType,a.originalType,(0,s.Z)(a,F));return r.createElement(e.props.originalType,o)}return e}(e)}));return r.createElement(u.Z,e,t)},code:function(e){var t=e.children;return(0,r.isValidElement)(t)?t:t.includes("\n")?r.createElement(A,e):r.createElement("code",e)},a:function(e){return r.createElement(d.Z,e)},pre:function(e){var t,n=e.children;return(0,r.isValidElement)(n)&&(0,r.isValidElement)(null==n||null==(t=n.props)?void 0:t.children)?n.props.children:r.createElement(A,(0,r.isValidElement)(n)?null==n?void 0:n.props:Object.assign({},e))},details:function(e){var t=r.Children.toArray(e.children),n=t.find((function(e){var t;return"summary"===(null==e||null==(t=e.props)?void 0:t.mdxType)})),a=r.createElement(r.Fragment,null,t.filter((function(e){return e!==n})));return r.createElement(D,(0,i.Z)({},e,{summary:n}),a)},h1:(0,M.Z)("h1"),h2:(0,M.Z)("h2"),h3:(0,M.Z)("h3"),h4:(0,M.Z)("h4"),h5:(0,M.Z)("h5"),h6:(0,M.Z)("h6")},z=n(4608),H=n(4096),W="backToTopButton_i9tI",V="backToTopButtonShow_wCmF";function U(){var e=(0,r.useRef)(null);return{smoothScrollTop:function(){var t;e.current=(t=null,function e(){var n=document.documentElement.scrollTop;n>0&&(t=requestAnimationFrame(e),window.scrollTo(0,Math.floor(.85*n)))}(),function(){return t&&cancelAnimationFrame(t)})},cancelScrollToTop:function(){return null==e.current?void 0:e.current()}}}var q=function(){var e,t=(0,r.useState)(!1),n=t[0],a=t[1],o=(0,r.useRef)(!1),l=U(),c=l.smoothScrollTop,i=l.cancelScrollToTop;return(0,C.RF)((function(e,t){var n=e.scrollY,r=null==t?void 0:t.scrollY;if(r)if(o.current)o.current=!1;else{var l=n<r;if(l||i(),n<300)a(!1);else if(l){var c=document.documentElement.scrollHeight;n+window.innerHeight<c&&a(!0)}else a(!1)}})),(0,C.SL)((function(e){e.location.hash&&(o.current=!0,a(!1))})),r.createElement("button",{"aria-label":(0,N.I)({id:"theme.BackToTopButton.buttonAriaLabel",message:"Scroll back to top",description:"The ARIA label for the back to top button"}),className:(0,m.Z)("clean-btn",C.kM.common.backToTopButton,W,(e={},e[V]=n,e)),type:"button",onClick:function(){return c()}})},Y=n(6775),J=n(7959);function K(e){var t,n,o,i=e.currentDocRoute,s=e.versionMetadata,u=e.children,d=e.sidebarName,p=(0,C.Vq)(),f=s.pluginId,h=s.version,y=(0,r.useState)(!1),b=y[0],v=y[1],g=(0,r.useState)(!1),k=g[0],E=g[1],Z=(0,r.useCallback)((function(){k&&E(!1),v((function(e){return!e}))}),[k]);return r.createElement(l.Z,{wrapperClassName:C.kM.wrapper.docsPages,pageClassName:C.kM.page.docsDocPage,searchMetadata:{version:h,tag:(0,C.os)(f,h)}},r.createElement("div",{className:J.Z.docPage},r.createElement(q,null),p&&r.createElement("aside",{className:(0,m.Z)(J.Z.docSidebarContainer,(t={},t[J.Z.docSidebarContainerHidden]=b,t)),onTransitionEnd:function(e){e.currentTarget.classList.contains(J.Z.docSidebarContainer)&&b&&E(!0)}},r.createElement(c.Z,{key:d,sidebar:p,path:i.path,onCollapse:Z,isHidden:k}),k&&r.createElement("div",{className:J.Z.collapsedDocSidebar,title:(0,N.I)({id:"theme.docs.sidebar.expandButtonTitle",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),"aria-label":(0,N.I)({id:"theme.docs.sidebar.expandButtonAriaLabel",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),tabIndex:0,role:"button",onKeyDown:Z,onClick:Z},r.createElement(H.Z,{className:J.Z.expandSidebarButtonIcon}))),r.createElement("main",{className:(0,m.Z)(J.Z.docMainContainer,(n={},n[J.Z.docMainContainerEnhanced]=b||!p,n))},r.createElement("div",{className:(0,m.Z)("container padding-top--md padding-bottom--lg",J.Z.docItemWrapper,(o={},o[J.Z.docItemWrapperEnhanced]=b,o))},r.createElement(a.Zo,{components:R},u)))))}var Q=function(e){var t=e.route.routes,n=e.versionMetadata,a=e.location,l=t.find((function(e){return(0,Y.LX)(a.pathname,e)}));if(!l)return r.createElement(z.default,null);var c=l.sidebar,i=c?n.docsSidebars[c]:null;return r.createElement(r.Fragment,null,r.createElement(u.Z,null,r.createElement("html",{className:n.className})),r.createElement(C.qu,{version:n},r.createElement(C.bT,{sidebar:i},r.createElement(K,{currentDocRoute:l,versionMetadata:n,sidebarName:c},(0,o.Z)(t,{versionMetadata:n})))))}},284:function(e,t,n){n.d(t,{Z:function(){return R}});var r=n(7294),a=n(6010),o=n(3616),l=n(3783),c=n(5537),i=n(4096),s=n(5999),u=n(7462),d=n(3366),m=n(9960),p=n(3919),f=n(541),h="menuLinkText_OKON",y="hasHref_TwRn",b=n(2389),v=["items"],g=["item"],k=["item","onItemClick","activePath","level"],E=["item","onItemClick","activePath","level"],Z=(0,r.memo)((function(e){var t=e.items,n=(0,d.Z)(e,v);return r.createElement(r.Fragment,null,t.map((function(e,t){return r.createElement(T,(0,u.Z)({key:t,item:e},n))})))}));function T(e){var t=e.item,n=(0,d.Z)(e,g);return"category"===t.type?0===t.items.length?null:r.createElement(N,(0,u.Z)({item:t},n)):r.createElement(C,(0,u.Z)({item:t},n))}function N(e){var t,n=e.item,l=e.onItemClick,c=e.activePath,i=e.level,p=(0,d.Z)(e,k),f=n.items,v=n.label,g=n.collapsible,E=n.className,T=n.href,N=function(e){var t=(0,b.Z)();return(0,r.useMemo)((function(){return e.href?e.href:!t&&e.collapsible?(0,o.Wl)(e):void 0}),[e,t])}(n),C=(0,o._F)(n,c),_=(0,o.uR)({initialState:function(){return!!g&&(!C&&n.collapsed)}}),S=_.collapsed,O=_.setCollapsed,P=_.toggleCollapsed;return function(e){var t=e.isActive,n=e.collapsed,a=e.setCollapsed,l=(0,o.D9)(t);(0,r.useEffect)((function(){t&&!l&&n&&a(!1)}),[t,l,n,a])}({isActive:C,collapsed:S,setCollapsed:O}),r.createElement("li",{className:(0,a.Z)(o.kM.docs.docSidebarItemCategory,o.kM.docs.docSidebarItemCategoryLevel(i),"menu__list-item",{"menu__list-item--collapsed":S},E)},r.createElement("div",{className:"menu__list-item-collapsible"},r.createElement(m.Z,(0,u.Z)({className:(0,a.Z)("menu__link",(t={"menu__link--sublist":g&&!T,"menu__link--active":C},t[h]=!g,t[y]=!!N,t)),onClick:g?function(e){null==l||l(n),T?O(!1):(e.preventDefault(),P())}:function(){null==l||l(n)},href:g?null!=N?N:"#":N},p),v),T&&g&&r.createElement("button",{"aria-label":(0,s.I)({id:"theme.DocSidebarItem.toggleCollapsedCategoryAriaLabel",message:"Toggle the collapsible sidebar category '{label}'",description:"The ARIA label to toggle the collapsible sidebar category"},{label:v}),type:"button",className:"clean-btn menu__caret",onClick:function(e){e.preventDefault(),P()}})),r.createElement(o.zF,{lazy:!0,as:"ul",className:"menu__list",collapsed:S},r.createElement(Z,{items:f,tabIndex:S?-1:0,onItemClick:l,activePath:c,level:i+1})))}function C(e){var t=e.item,n=e.onItemClick,l=e.activePath,c=e.level,i=(0,d.Z)(e,E),s=t.href,h=t.label,y=t.className,b=(0,o._F)(t,l);return r.createElement("li",{className:(0,a.Z)(o.kM.docs.docSidebarItemLink,o.kM.docs.docSidebarItemLinkLevel(c),"menu__list-item",y),key:h},r.createElement(m.Z,(0,u.Z)({className:(0,a.Z)("menu__link",{"menu__link--active":b}),"aria-current":b?"page":void 0,to:s},(0,p.Z)(s)&&{onClick:n?function(){return n(t)}:void 0},i),(0,p.Z)(s)?h:r.createElement("span",null,h,r.createElement(f.Z,null))))}var _="sidebar_a3j0",S="sidebarWithHideableNavbar_VlPv",O="sidebarHidden_OqfG",P="sidebarLogo_hmkv",I="menu_cyFh",w="menuWithAnnouncementBar_+O1J",x="collapseSidebarButton_eoK2",L="collapseSidebarButtonIcon_e+kA";function j(e){var t=e.onClick;return r.createElement("button",{type:"button",title:(0,s.I)({id:"theme.docs.sidebar.collapseButtonTitle",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),"aria-label":(0,s.I)({id:"theme.docs.sidebar.collapseButtonAriaLabel",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),className:(0,a.Z)("button button--secondary button--outline",x),onClick:t},r.createElement(i.Z,{className:L}))}function A(e){var t,n,l=e.path,i=e.sidebar,s=e.onCollapse,u=e.isHidden,d=function(){var e=(0,o.nT)().isActive,t=(0,r.useState)(e),n=t[0],a=t[1];return(0,o.RF)((function(t){var n=t.scrollY;e&&a(0===n)}),[e]),e&&n}(),m=(0,o.LU)(),p=m.navbar.hideOnScroll,f=m.hideableSidebar;return r.createElement("div",{className:(0,a.Z)(_,(t={},t[S]=p,t[O]=u,t))},p&&r.createElement(c.Z,{tabIndex:-1,className:P}),r.createElement("nav",{className:(0,a.Z)("menu thin-scrollbar",I,(n={},n[w]=d,n))},r.createElement("ul",{className:(0,a.Z)(o.kM.docs.docSidebarMenu,"menu__list")},r.createElement(Z,{items:i,activePath:l,level:1}))),f&&r.createElement(j,{onClick:s}))}var M=function(e){var t=e.toggleSidebar,n=e.sidebar,l=e.path;return r.createElement("ul",{className:(0,a.Z)(o.kM.docs.docSidebarMenu,"menu__list")},r.createElement(Z,{items:n,activePath:l,onItemClick:function(e){"category"===e.type&&e.href&&t(),"link"===e.type&&t()},level:1}))};function B(e){return r.createElement(o.Cv,{component:M,props:e})}var D=r.memo(A),F=r.memo(B);function R(e){var t=(0,l.Z)(),n="desktop"===t||"ssr"===t,a="mobile"===t;return r.createElement(r.Fragment,null,n&&r.createElement(D,e),a&&r.createElement(F,e))}},9649:function(e,t,n){n.d(t,{N:function(){return m},Z:function(){return p}});var r=n(3366),a=n(7462),o=n(7294),l=n(6010),c=n(5999),i=n(3616),s="anchorWithStickyNavbar_y2LR",u="anchorWithHideOnScrollNavbar_3ly5",d=["id"],m=function(e){var t=Object.assign({},e);return o.createElement("header",null,o.createElement("h1",(0,a.Z)({},t,{id:void 0}),t.children))},p=function(e){return"h1"===e?m:(t=e,function(e){var n,m=e.id,p=(0,r.Z)(e,d),f=(0,i.LU)().navbar.hideOnScroll;return m?o.createElement(t,(0,a.Z)({},p,{className:(0,l.Z)("anchor",(n={},n[u]=f,n[s]=!f,n)),id:m}),p.children,o.createElement("a",{className:"hash-link",href:"#"+m,title:(0,c.I)({id:"theme.common.headingLinkTitle",message:"Direct link to heading",description:"Title for link to heading"})},"\u200b")):o.createElement(t,p)});var t}},4096:function(e,t,n){var r=n(7462),a=n(7294);t.Z=function(e){return a.createElement("svg",(0,r.Z)({width:"20",height:"20","aria-hidden":"true"},e),a.createElement("g",{fill:"#7a7a7a"},a.createElement("path",{d:"M9.992 10.023c0 .2-.062.399-.172.547l-4.996 7.492a.982.982 0 01-.828.454H1c-.55 0-1-.453-1-1 0-.2.059-.403.168-.551l4.629-6.942L.168 3.078A.939.939 0 010 2.528c0-.548.45-.997 1-.997h2.996c.352 0 .649.18.828.45L9.82 9.472c.11.148.172.347.172.55zm0 0"}),a.createElement("path",{d:"M19.98 10.023c0 .2-.058.399-.168.547l-4.996 7.492a.987.987 0 01-.828.454h-3c-.547 0-.996-.453-.996-1 0-.2.059-.403.168-.551l4.625-6.942-4.625-6.945a.939.939 0 01-.168-.55 1 1 0 01.996-.997h3c.348 0 .649.18.828.45l4.996 7.492c.11.148.168.347.168.55zm0 0"})))}},4608:function(e,t,n){n.r(t);var r=n(7294),a=n(7019),o=n(5999);t.default=function(){return r.createElement(a.Z,{title:(0,o.I)({id:"theme.NotFound.title",message:"Page Not Found"})},r.createElement("main",{className:"container margin-vert--xl"},r.createElement("div",{className:"row"},r.createElement("div",{className:"col col--6 col--offset-3"},r.createElement("h1",{className:"hero__title"},r.createElement(o.Z,{id:"theme.NotFound.title",description:"The title of the 404 page"},"Page Not Found")),r.createElement("p",null,r.createElement(o.Z,{id:"theme.NotFound.p1",description:"The first paragraph of the 404 page"},"We could not find what you were looking for.")),r.createElement("p",null,r.createElement(o.Z,{id:"theme.NotFound.p2",description:"The 2nd paragraph of the 404 page"},"Please contact the owner of the site that linked you to the original URL and let them know their link is broken."))))))}},7959:function(e,t){t.Z={docPage:"docPage_lDyR",docMainContainer:"docMainContainer_r8cw",docSidebarContainer:"docSidebarContainer_0YBq",docMainContainerEnhanced:"docMainContainerEnhanced_SOUu",docSidebarContainerHidden:"docSidebarContainerHidden_Qlt2",collapsedDocSidebar:"collapsedDocSidebar_zZpm",expandSidebarButtonIcon:"expandSidebarButtonIcon_cxi8",docItemWrapperEnhanced:"docItemWrapperEnhanced_aT5H"}}}]);