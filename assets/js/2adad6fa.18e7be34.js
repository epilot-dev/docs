"use strict";(self.webpackChunkepilot_dev_handbook=self.webpackChunkepilot_dev_handbook||[]).push([[499],{3905:(e,t,i)=>{i.d(t,{Zo:()=>s,kt:()=>f});var r=i(67294);function n(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function a(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,r)}return i}function o(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?a(Object(i),!0).forEach((function(t){n(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):a(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function c(e,t){if(null==e)return{};var i,r,n=function(e,t){if(null==e)return{};var i,r,n={},a=Object.keys(e);for(r=0;r<a.length;r++)i=a[r],t.indexOf(i)>=0||(n[i]=e[i]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)i=a[r],t.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(n[i]=e[i])}return n}var p=r.createContext({}),l=function(e){var t=r.useContext(p),i=t;return e&&(i="function"==typeof e?e(t):o(o({},t),e)),i},s=function(e){var t=l(e.components);return r.createElement(p.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var i=e.components,n=e.mdxType,a=e.originalType,p=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),d=l(i),m=n,f=d["".concat(p,".").concat(m)]||d[m]||u[m]||a;return i?r.createElement(f,o(o({ref:t},s),{},{components:i})):r.createElement(f,o({ref:t},s))}));function f(e,t){var i=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=i.length,o=new Array(a);o[0]=m;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c[d]="string"==typeof e?e:n,o[1]=c;for(var l=2;l<a;l++)o[l]=i[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,i)}m.displayName="MDXCreateElement"},45380:(e,t,i)=>{i.r(t),i.d(t,{contentTitle:()=>o,default:()=>d,frontMatter:()=>a,metadata:()=>c,toc:()=>p});var r=i(87462),n=(i(67294),i(3905));const a={sidebar_position:1,title:"Entities"},o=void 0,c={unversionedId:"pricing/entities",id:"pricing/entities",title:"Entities",description:"The epilot platform defines 3 cores entities that are used to model the data and the business logic around all our pricing features.",source:"@site/docs/pricing/1-entities.mdx",sourceDirName:"pricing",slug:"/pricing/entities",permalink:"/docs/pricing/entities",editUrl:"https://github.com/epilot-dev/docs/edit/main/docs/pricing/1-entities.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"Entities"},sidebar:"appsSidebar",previous:{title:"PricingEntitiesExtractResult",permalink:"/docs/pricing/pricing-library/interfaces/PricingEntitiesExtractResult"},next:{title:"Catalog",permalink:"/docs/pricing/catalog"}},p=[{value:"Product",id:"product",children:[],level:2},{value:"Price",id:"price",children:[],level:2},{value:"Tax",id:"tax",children:[],level:2}],l={toc:p},s="wrapper";function d(e){let{components:t,...i}=e;return(0,n.kt)(s,(0,r.Z)({},l,i,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"The epilot platform defines 3 cores entities that are used to model the data and the business logic around all our pricing features."),(0,n.kt)("h2",{id:"product"},(0,n.kt)("a",{parentName:"h2",href:"/api/pricing#tag/product_schema"},"Product")),(0,n.kt)("p",null,"Products are the core of your pricing model. They are the items you sell to your customers. They can be physical or digital goods, services, subscriptions, or any other item you want to sell."),(0,n.kt)("p",null,"A product can be sold in many ways, with different billing cycles, and with different price tags. To configure different ways of selling a product, you can create multiple price options."),(0,n.kt)("p",null,"A product can have 2 types of prices listed under their price options: simples prices or composite prices, to model more complex pricing models."),(0,n.kt)("h2",{id:"price"},(0,n.kt)("a",{parentName:"h2",href:"/api/pricing#tag/simple_price_schema"},"Price")),(0,n.kt)("p",null,"A price defines the price of a product, and can be of one of the following types:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("a",{parentName:"strong",href:"/api/pricing#tag/simple_price_schema"},"Simple")),": A simple price is a single price that is applied to the product, with a fixed amount, paid upfront or in installments (recurrently).")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("a",{parentName:"strong",href:"/api/pricing#tag/dynamic_price_schema"},"Composite")),": A composite price is a price that is calculated based on a set of prices. These prices often belong to the same product, but they can also belong to other products. For example, a product can have a composite price that is calculated based on the price of a physical good and the price of a service (e.g, wallbox + fast charging station service fee paid recurrently)."))),(0,n.kt)("h2",{id:"tax"},(0,n.kt)("a",{parentName:"h2",href:"/api/pricing#tag/tax_schema"},"Tax")),(0,n.kt)("p",null,"A tax is a percentage that is applied to a price. Taxes can behave in two different ways:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Inclusive: The tax is included in the price. For example, a price of 100\u20ac with a 20% tax will be displayed as 100\u20ac, since the tax is already included in the price.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Exclusive: The tax is not included in the price. For example, a price of 100\u20ac with a 20% tax will be displayed as 120\u20ac, since the tax is not included in the price."))),(0,n.kt)("p",null,"Taxes can also be bound to their corresponding jurisdiction by specifying the Tax Region in the Tax definition."))}d.isMDXComponent=!0}}]);