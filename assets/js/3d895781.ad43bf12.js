"use strict";(self.webpackChunkepilot_dev_handbook=self.webpackChunkepilot_dev_handbook||[]).push([[5237],{35137:(e,t,a)=>{a.r(t),a.d(t,{contentTitle:()=>v,default:()=>P,frontMatter:()=>f,metadata:()=>k,toc:()=>w});var n=a(87462),r=a(67294),i=a(3905),o=a(72389),s=a(75773),l=a(86010);const d={tabItem:"tabItem_LplD"};function c(e){const{lazy:t,block:a,defaultValue:i,values:o,groupId:c,className:u}=e,p=r.Children.map(e.children,(e=>{if((0,r.isValidElement)(e)&&void 0!==e.props.value)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),m=o??p.map((e=>{let{props:{value:t,label:a,attributes:n}}=e;return{value:t,label:a,attributes:n}})),h=(0,s.lx)(m,((e,t)=>e.value===t.value));if(h.length>0)throw new Error(`Docusaurus error: Duplicate values "${h.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const g=null===i?i:i??p.find((e=>e.props.default))?.props.value??p[0]?.props.value;if(null!==g&&!m.some((e=>e.value===g)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${g}" but none of its children has the corresponding value. Available values are: ${m.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:b,setTabGroupChoices:y}=(0,s.UB)(),[f,v]=(0,r.useState)(g),k=[],{blockElementScrollPositionUntilNextRender:w}=(0,s.o5)();if(null!=c){const e=b[c];null!=e&&e!==f&&m.some((t=>t.value===e))&&v(e)}const T=e=>{const t=e.currentTarget,a=k.indexOf(t),n=m[a].value;n!==f&&(w(t),v(n),null!=c&&y(c,n))},O=e=>{let t=null;switch(e.key){case"ArrowRight":{const a=k.indexOf(e.currentTarget)+1;t=k[a]||k[0];break}case"ArrowLeft":{const a=k.indexOf(e.currentTarget)-1;t=k[a]||k[k.length-1];break}}t?.focus()};return r.createElement("div",{className:"tabs-container"},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.Z)("tabs",{"tabs--block":a},u)},m.map((e=>{let{value:t,label:a,attributes:i}=e;return r.createElement("li",(0,n.Z)({role:"tab",tabIndex:f===t?0:-1,"aria-selected":f===t,key:t,ref:e=>k.push(e),onKeyDown:O,onFocus:T,onClick:T},i,{className:(0,l.Z)("tabs__item",d.tabItem,i?.className,{"tabs__item--active":f===t})}),a??t)}))),t?(0,r.cloneElement)(p.filter((e=>e.props.value===f))[0],{className:"margin-vert--md"}):r.createElement("div",{className:"margin-vert--md"},p.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==f})))))}function u(e){const t=(0,o.Z)();return r.createElement(c,(0,n.Z)({key:String(t)},e))}const p=function(e){let{children:t,hidden:a,className:n}=e;return r.createElement("div",{role:"tabpanel",hidden:a,className:n},t)};var m=a(31736);const h=()=>r.createElement(m.Z,{title:"Getting an Order using the Entity API",language:"bash",showLineNumbers:!0},"curl --location --request GET 'https://entity.sls.epilot.io/v1/entity/schemas/order?id=<order-id>' \\\n  --header 'Accept: application/json' \\\n  --header 'Authorization: Bearer <org-access-token>'"),g=()=>r.createElement(m.Z,{title:"Getting an Order using the Entity API",language:"typescript",showLineNumbers:!0},"import { authorizeWithToken } from 'epilot-sdk/auth'\nimport entityClient from 'epilot-sdk/entity-client'\nimport pricingClient from 'epilot-sdk/pricing-client'\n\nconst accessToken = 'org-access-token'\n\nentityClient.defaults.baseURL = 'https://entity.sls.epilot.io'\npricingClient.defaults.baseURL = 'https://pricing-api.sls.epilot.io'\n\n// authorizing SDK clients\nauthorizeWithToken(entityClient, accessToken)\nauthorizeWithToken(pricingClient, accessToken)\n\nconst targetOrderId = 'order-id'\n\n// fetching the order from entity api\nconst order = await entityClient\n.getEntity({ slug: 'order', id: targetOrderId}) .then(({ data }) => data?.entity)"),b=()=>r.createElement(m.Z,{title:"Updating an Order via Pricing API",language:"bash",showLineNumbers:!0},'curl --location --request PUT \'https://pricing-api.sls.epilot.io/v1/order/<order-id>\' \\\n  --header \'Content-Type: application/json\' \\\n  --header \'Accept: application/json\' \\\n  --header \'Authorization: Bearer <org-access-token>\' \\\n  --data-raw \'{\n      "line_items": [\n          {\n              "description": "individual adjustment",\n              "_price": {\n                  "unit_amount": 1000,\n                  "unit_amount_decimal": "10.00",\n                  "unit_amount_currency": "EUR"\n              }\n          }\n      ]\n  }\''),y=()=>r.createElement(m.Z,{title:"Updating an Order via Pricing API",language:"typescript",showLineNumbers:!0},"// pushing a new line item\norder.line_items.push({\n  description: 'individual adjustment',\n  _price: {\n    unit_amount: 1000,\n    unit_amount_decimal: '10.00',\n    unit_amount_currency: 'EUR'\n  }\n})\n\n// updating the order\nawait pricingClient\n  .putOrder({ id: targetOrderId }, order).then(({ data }) => data)"),f={sidebar_position:3},v="Orders",k={unversionedId:"pricing/orders",id:"pricing/orders",title:"Orders",description:"An Order is a collection of Products and Prices that can be purchased by a Customer. Orders can be created manually on the platform our through automations that run upon certain events, such as a Journey submission.",source:"@site/docs/pricing/3-orders.mdx",sourceDirName:"pricing",slug:"/pricing/orders",permalink:"/docs/pricing/orders",editUrl:"https://github.com/epilot-dev/docs/edit/main/docs/pricing/3-orders.mdx",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"appsSidebar",previous:{title:"Catalog",permalink:"/docs/pricing/catalog"},next:{title:"Online Sales",permalink:"/docs/pricing/ecommerce"}},w=[{value:"Managing Orders via Pricing API",id:"managing-orders-via-pricing-api",children:[{value:"Example: Updating an Order",id:"example-updating-an-order",children:[],level:3}],level:2}],T={toc:w},O="wrapper";function P(e){let{components:t,...a}=e;return(0,i.kt)(O,(0,n.Z)({},T,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"orders"},"Orders"),(0,i.kt)("p",null,"An Order is a collection of Products and Prices that can be purchased by a Customer. Orders can be created manually on the platform our through automations that run upon certain events, such as a Journey submission."),(0,i.kt)("p",null,"Our platform is build in a way such that ",(0,i.kt)("a",{parentName:"p",href:"/docs/entities/flexible-entities"},"Business Entities"),' can be installed by our customers, and on this context we can also claim that we "eat our own dog food". This means that we use our own platform to build and model the Order Entity.'),(0,i.kt)("img",{style:{boxShadow:"#a2a2a2 0px 0px 25px -8px",borderRadius:"5px"},src:"/img/order-detailsview.png",alt:"Order Details View"}),(0,i.kt)("h2",{id:"managing-orders-via-pricing-api"},"Managing Orders via Pricing API"),(0,i.kt)("p",null,"Using our ",(0,i.kt)("a",{parentName:"p",href:"/docs/entities/entity-api"},"Entity API")," we can directly manage Orders, although very rapidly we realise that an Order has more to it than just a collection of Products and Prices. We needed to be able to manage the Order's lifecycle, and we needed to be able to manage the Order's state. We also needed to be able to recompute the order's product and price totals, along with the order price and product relations. Using just our Entity API would not suffice here since there is additional logic required to fully manage an order."),(0,i.kt)("p",null,"To fullfil this purpose we have designed the ",(0,i.kt)("a",{parentName:"p",href:"/api/pricing"},"Pricing API"),", which is a wrapper around the Entity API. The ",(0,i.kt)("a",{parentName:"p",href:"/api/pricing"},"Pricing API")," allows us to manage Orders, and it also allows us to manage the Order's lifecycle and state, recomputing the order's product and price totals, along with its price and product relations."),(0,i.kt)("h3",{id:"example-updating-an-order"},"Example: Updating an Order"),(0,i.kt)("p",null,"For general cases, the Entity API can be used directly to deal with simple business entities. In the Orders case, it relies on the ",(0,i.kt)("a",{parentName:"p",href:"/api/pricing"},"Pricing API")," to ensure any changes over ",(0,i.kt)("inlineCode",{parentName:"p"},"line_items")," will have all the line items and grand totals computed properly."),(0,i.kt)("p",null,"On both examples below API/SDK we authenticate using a ",(0,i.kt)("a",{parentName:"p",href:"/docs/auth/access-tokens"},"Org Access Token (OAT)")," that can be generated from our Epilot Portal:"),(0,i.kt)(u,{lazy:!0,mdxType:"Tabs"},(0,i.kt)(p,{value:"api",label:"API",default:!0,mdxType:"TabItem"},(0,i.kt)(h,{mdxType:"GetOrderApiSample"})),(0,i.kt)(p,{value:"sdk",label:"SDK (Javascript)",mdxType:"TabItem"},(0,i.kt)(g,{mdxType:"GetOrderSample"}))),(0,i.kt)("p",null,"After fetching the Order from the ",(0,i.kt)("a",{parentName:"p",href:"/api/pricing"},"Pricing API")," we can change the ",(0,i.kt)("inlineCode",{parentName:"p"},"line_items")," and then call the ",(0,i.kt)("a",{parentName:"p",href:"/api/pricing"},"Pricing API")," to update the order. The update is done via PUT so it's a full update. We don't yet have a PATCH endpoint for upserting entity changes."),(0,i.kt)(u,{lazy:!0,mdxType:"Tabs"},(0,i.kt)(p,{value:"api",label:"API",default:!0,mdxType:"TabItem"},(0,i.kt)(b,{mdxType:"UpdateOrderApiSample"})),(0,i.kt)(p,{value:"sdk",label:"SDK (Javascript)",mdxType:"TabItem"},(0,i.kt)(y,{mdxType:"UpdateOrderSample"}))))}P.isMDXComponent=!0}}]);