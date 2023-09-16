"use strict";(self.webpackChunkepilot_dev_handbook=self.webpackChunkepilot_dev_handbook||[]).push([[418],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var p=a.createContext({}),s=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=s(e.components);return a.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,p=e.parentName,u=r(e,["components","mdxType","originalType","parentName"]),c=s(n),m=i,h=c["".concat(p,".").concat(m)]||c[m]||d[m]||o;return n?a.createElement(h,l(l({ref:t},u),{},{components:n})):a.createElement(h,l({ref:t},u))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,l=new Array(o);l[0]=c;var r={};for(var p in t)hasOwnProperty.call(t,p)&&(r[p]=t[p]);r.originalType=e,r.mdxType="string"==typeof e?e:i,l[1]=r;for(var s=2;s<o;s++)l[s]=n[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},3034:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>l,default:()=>u,frontMatter:()=>o,metadata:()=>r,toc:()=>p});var a=n(7462),i=(n(7294),n(3905));const o={sidebar_position:4},l="Entity Mapping",r={unversionedId:"automation/entity-mapping",id:"automation/entity-mapping",title:"Entity Mapping",description:"[API Docs]",source:"@site/docs/automation/entity-mapping.md",sourceDirName:"automation",slug:"/automation/entity-mapping",permalink:"/docs/automation/entity-mapping",editUrl:"https://github.com/epilot-dev/docs/edit/main/docs/automation/entity-mapping.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Automation Executions",permalink:"/docs/automation/automation-executions"},next:{title:"Architecture",permalink:"/docs/automation/architecture"}},p=[{value:"Create/Edit Entity",id:"createedit-entity",children:[],level:2},{value:"Mappings",id:"mappings",children:[],level:2},{value:"Attribute Mappings",id:"attribute-mappings",children:[],level:2},{value:"Mapping Operations",id:"mapping-operations",children:[{value:"<code>_copy</code>",id:"_copy",children:[],level:3},{value:"<code>_append</code>",id:"_append",children:[],level:3},{value:"<code>_uniq</code>",id:"_uniq",children:[],level:3},{value:"<code>_set</code>",id:"_set",children:[],level:3},{value:"<code>_random</code>",id:"_random",children:[],level:3},{value:"<code>_template</code>",id:"_template",children:[],level:3},{value:"Nesting",id:"nesting",children:[],level:3}],level:2},{value:"Uniqueness",id:"uniqueness",children:[],level:2},{value:"Relation Mappings",id:"relation-mappings",children:[],level:2}],s={toc:p};function u(e){let{components:t,...o}=e;return(0,i.kt)("wrapper",(0,a.Z)({},s,o,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"entity-mapping"},"Entity Mapping"),(0,i.kt)("p",null,"[",(0,i.kt)("a",{parentName:"p",href:"/api/automation#tag/flows"},"API Docs"),"]\n[",(0,i.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/@epilot/automation-client"},"SDK"),"]"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Entity Mapping is an advanced feature available only for certain pricing tiers."),(0,i.kt)("p",{parentName:"blockquote"},"Please contact epilot support to enable advanced automation features")),(0,i.kt)("p",null,"The ",(0,i.kt)("strong",{parentName:"p"},"Create/Edit Entity")," action allows mapping data from one entity to create or update other entities."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"MapEntityAction",src:n(2949).Z,width:"639",height:"263"})),(0,i.kt)("h2",{id:"createedit-entity"},"Create/Edit Entity"),(0,i.kt)("p",null,"The Create/Edit Entity Action (",(0,i.kt)("inlineCode",{parentName:"p"},"map-entity"),") consists of a Target Entity and a list of Attribute Mappings and Relations."),(0,i.kt)("p",null,"You can choose any Entity Schema configured in your organization as the target. An entity with this schema will be created or edited as the output of this automation action."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Select target entity",src:n(5176).Z,width:"1078",height:"536"})),(0,i.kt)("p",null,"The created entity will be automatically added as a relation to your Automation trigger entity (usually Submission). By default, the relation will be stored in the ",(0,i.kt)("inlineCode",{parentName:"p"},"mapped_entities")," attribute."),(0,i.kt)("p",null,"You can also define Relation Labels that will be added to the Relation on the trigger entity. "),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Automation Relation Labels",src:n(3424).Z,width:"1083",height:"163"}),"\n",(0,i.kt)("img",{alt:"Oportunity Relation Labels",src:n(9243).Z,width:"956",height:"188"})),(0,i.kt)("p",null,"These labels may be used later to identify previously mapped entities when adding relations between mapped entities."),(0,i.kt)("h2",{id:"mappings"},"Mappings"),(0,i.kt)("p",null,"To add mappings, choose a target field from the list of attributes of the target entity. This field will be populated with the value you specify below."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Add Mapping",src:n(788).Z,width:"1059",height:"664"})),(0,i.kt)("h2",{id:"attribute-mappings"},"Attribute Mappings"),(0,i.kt)("p",null,"Attribute Mappings define how to map attribute values for the target entity."),(0,i.kt)("p",null,"A special JSON mapping syntax is used to define an operation to determine the output value."),(0,i.kt)("p",null,"As an example, the following mapping operation will:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Append an object with ",(0,i.kt)("inlineCode",{parentName:"li"},"email")," property to the output array value"),(0,i.kt)("li",{parentName:"ol"},"Copy the value for the ",(0,i.kt)("inlineCode",{parentName:"li"},"email"),' property from a Journey submission field in Step 1, Block "Pers\xf6nliche Informationen", field "email".'),(0,i.kt)("li",{parentName:"ol"},"Make sure each objet in the output array is unique using the value of ",(0,i.kt)("inlineCode",{parentName:"li"},"email")," as the key.")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "_append": [\n    {\n      "email": {\n        "_copy": "submission.steps[1][\'Pers\xf6nliche Informationen\'][\'email\']"\n      }\n    }\n  ],\n  "_uniq": [\n    "email"\n  ]\n}\n')),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Mapping JSON example",src:n(4703).Z,width:"2082",height:"1046"})),(0,i.kt)("h2",{id:"mapping-operations"},"Mapping Operations"),(0,i.kt)("p",null,"The mapping JSON syntax supports a list of operations, which can be combined and nested together in various ways."),(0,i.kt)("h3",{id:"_copy"},(0,i.kt)("inlineCode",{parentName:"h3"},"_copy")),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"_copy")," operation copies a value from the trigger entity context. Both the trigger entity and its relations are available as source data."),(0,i.kt)("p",null,"The operation uses the same path format as ",(0,i.kt)("a",{parentName:"p",href:"/docs/messaging/template-variables"},"Template Variables")," used in email and document templates."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'// copy contact first_name\n{\n  "_copy": "contact.first_name"\n}\n')),(0,i.kt)("p",null,"You can also set a list of fallbacks. The first path that contains a value will be used."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'// copy account title, fall back to contact title if account doesn\'t exist\n{\n  "_copy": ["account._title", "contact._title"]\n}\n')),(0,i.kt)("h3",{id:"_append"},(0,i.kt)("inlineCode",{parentName:"h3"},"_append")),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"_append")," operation adds new values to an array."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'// append strings "tag1", "tag2" to an array\n{\n  "_append": ["tag1", "tag2"]\n}\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'// append an object with a mapped phone number from submission\n{\n  "_append": [\n    {\n      "phone": {\n        "_copy": "submission.phone_number"\n      }\n    }\n  ]\n}\n')),(0,i.kt)("h3",{id:"_uniq"},(0,i.kt)("inlineCode",{parentName:"h3"},"_uniq")),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"_uniq")," operation makes sure all items in an array are unique."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'// append tags, make sure each item is unique\n{\n  "_append": ["tag1", "tag2", "tag2"],\n  "_uniq": true\n}\n')),(0,i.kt)("p",null,"For arrays with objects, you can define a unique key to be used."),(0,i.kt)("p",null,"Duplicate objects are deeply merged."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'// append addresses, make sure each item is unique\n{\n  "_append": [\n    {\n      "street": { "_copy": "submission.street" },\n      "street_number": { "_copy": "submission.street_number" },\n      "postal_code": { "_copy": "submission.postal_code" },\n      "city": { "_copy": "submission.city" }\n    }\n  ],\n  "_uniq": ["street", "street_number", "postal_code", "city"]\n}\n')),(0,i.kt)("h3",{id:"_set"},(0,i.kt)("inlineCode",{parentName:"h3"},"_set")),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"_set")," operation can be used to override an existing value with a new one."),(0,i.kt)("p",null,"This is useful in cases where you don't want to merge target values together (default behaviour)"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'// set source link to an object with href and title\n{\n  "_set": {\n    "title": "My Journey",\n    "href": "https://portal.epilot.cloud/app/journey/123"\n  }\n}\n')),(0,i.kt)("h3",{id:"_random"},(0,i.kt)("inlineCode",{parentName:"h3"},"_random")),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"_random")," operation can be used to generate a random number or id."),(0,i.kt)("p",null,"Options for ",(0,i.kt)("strong",{parentName:"p"},"type"),":"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Use ",(0,i.kt)("inlineCode",{parentName:"li"},"nanoid")," or ",(0,i.kt)("inlineCode",{parentName:"li"},"uuid")," to generate a random number."),(0,i.kt)("li",{parentName:"ul"},"Use ",(0,i.kt)("inlineCode",{parentName:"li"},"number")," and optionally set the ",(0,i.kt)("inlineCode",{parentName:"li"},"min")," (default 0) and ",(0,i.kt)("inlineCode",{parentName:"li"},"max")," (default 1) value.")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "_random": {\n    "type": "nanoid",\n  }\n}\n\n{\n  "_random": {\n    "type": "number",\n    "min": 2,\n    "max": 6\n  }\n}\n')),(0,i.kt)("h3",{id:"_template"},(0,i.kt)("inlineCode",{parentName:"h3"},"_template")),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"_template")," operation can be used to output a single string based on ",(0,i.kt)("a",{parentName:"p",href:"https://handlebarsjs.com/guide/expressions.html"},"handlebars")," expressions."),(0,i.kt)("p",null,"This is useful when you want to manipulate fields e.g. through mathematical expressions and merge multiple fields into a single one."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "_template": "{{contact.first_name}} {{contact.last_name}}",\n}\n')),(0,i.kt)("h3",{id:"nesting"},"Nesting"),(0,i.kt)("p",null,"Operations can be nested to create complex mapping behaviour:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'// add contact as a $relation value, set the relation label to primary\n{\n  "$relation": {\n    "_append": [\n      {\n        "_tags": {\n          "_set": ["primary"]\n        },\n        "entity_id": {\n          "_copy": ["account._id", "contact._id"]\n        }\n      }\n    ],\n    "_uniq": ["entity_id"]\n  }\n}\n')),(0,i.kt)("h2",{id:"uniqueness"},"Uniqueness"),(0,i.kt)("p",null,"To edit an existing entity instead of creating a new one, you must provide uniqueness criteria for your mapping."),(0,i.kt)("p",null,"This is achieved by switching on the Unique toggle for the attributes that form a unique key."),(0,i.kt)("p",null,"Example: To update existing Contacts based on the email address value, switch on Unique on for the Email attribute mapping."),(0,i.kt)("h2",{id:"relation-mappings"},"Relation Mappings"),(0,i.kt)("p",null,"When choosing a relation attribute for mapping, you define which entities from the trigger entity (usually submission) should be added as relations."),(0,i.kt)("p",null,"This is done by defining a filter. "),(0,i.kt)("p",null,'To relate a Contact defined earlier in the automation with "primary" relation label, Filter by ',(0,i.kt)("inlineCode",{parentName:"p"},"Schema: contact")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"Relation Label: primary"),"."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Relation Mapping Example",src:n(7262).Z,width:"957",height:"601"})))}u.isMDXComponent=!0},2949:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/MapEntityAction-3c212c17690511e0443ffc038c207657.png"},788:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/automation-add-mapping-86c58e7fd08837eb7186a325ac358618.png"},3424:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/automation-relation-labels-c1f5fda42de848cec99dbc9d9b60d3fd.png"},7262:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/automation-relation-afdd7f4959024f005d546471c5e283fd.png"},5176:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/automation-select-target-78924190e38971d8dd65c6baf4e347ba.png"},4703:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/mapping-example-de45397ddf94224d496ecc3d7d9b8252.png"},9243:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/opportunity-relation-labels-24136b217dbb14bcdac131d3faee8baa.png"}}]);