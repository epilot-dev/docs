"use strict";(self.webpackChunkepilot_dev_handbook=self.webpackChunkepilot_dev_handbook||[]).push([[4435],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},u=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=p(n),m=i,k=d["".concat(s,".").concat(m)]||d[m]||c[m]||o;return n?a.createElement(k,r(r({ref:t},u),{},{components:n})):a.createElement(k,r({ref:t},u))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,r=new Array(o);r[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:i,r[1]=l;for(var p=2;p<o;p++)r[p]=n[p];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5012:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>r,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var a=n(7462),i=(n(7294),n(3905));const o={sidebar_position:1},r="Example: 3rd Party Journey",l={unversionedId:"integrations/3rd-party-journeys",id:"integrations/3rd-party-journeys",title:"Example: 3rd Party Journey",description:"This article shows 2 examples for integrating a custom 3rd party form source via the epilot API.",source:"@site/docs/integrations/3rd-party-journeys.md",sourceDirName:"integrations",slug:"/integrations/3rd-party-journeys",permalink:"/docs/integrations/3rd-party-journeys",editUrl:"https://github.com/epilot-dev/docs/edit/main/docs/integrations/3rd-party-journeys.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Workflow Notes",permalink:"/docs/workflows/workflow-notes"}},s=[{value:"Method 1: Using Submission API (Simple)",id:"method-1-using-submission-api-simple",children:[{value:"Step 1: Upload Files (optional)",id:"step-1-upload-files-optional",children:[],level:3},{value:"Step 2: Create Submission",id:"step-2-create-submission",children:[],level:3},{value:"Step 3: Create an Automation Flow",id:"step-3-create-an-automation-flow",children:[],level:3}],level:2},{value:"Method 2: Direct API usage (Advanced)",id:"method-2-direct-api-usage-advanced",children:[{value:"Step 1: Create customer entities (contact + account)",id:"step-1-create-customer-entities-contact--account",children:[],level:3},{value:"Step 2: Upload Files",id:"step-2-upload-files",children:[],level:3},{value:"Step 3: Creating an Order",id:"step-3-creating-an-order",children:[],level:3},{value:"Step 4: Create Opportunity",id:"step-4-create-opportunity",children:[],level:3},{value:"Step 5: Start Workflow (optional)",id:"step-5-start-workflow-optional",children:[],level:3},{value:"Step 6: Create Submission (optional)",id:"step-6-create-submission-optional",children:[],level:3}],level:2}],p={toc:s};function u(e){let{components:t,...o}=e;return(0,i.kt)("wrapper",(0,a.Z)({},p,o,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"example-3rd-party-journey"},"Example: 3rd Party Journey"),(0,i.kt)("p",null,"This article shows 2 examples for integrating a custom 3rd party form source via the epilot API."),(0,i.kt)("p",null,"The examples contain downloadable Collection files for ",(0,i.kt)("a",{parentName:"p",href:"https://www.postman.com/collection/"},"Postman")," to make it easy to test the API calls."),(0,i.kt)("p",null,"Feel free to contact customer support for help in integrating your custom journey into epilot."),(0,i.kt)("p",null,"In this example we'll create the following entities:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Opportunity")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Order")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Submission")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Contact")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Account"))),(0,i.kt)("p",null,"We'll also cover the following topics:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Attaching Files to entities"),(0,i.kt)("li",{parentName:"ol"},"Creating relations between the Entities"),(0,i.kt)("li",{parentName:"ol"},"Starting workflows")),(0,i.kt)("h2",{id:"method-1-using-submission-api-simple"},"Method 1: Using Submission API (Simple)"),(0,i.kt)("p",null,"[",(0,i.kt)("a",{target:"_blank",href:n(283).Z},"Postman Collection"),"]"),(0,i.kt)("p",null,"The simplest way to integrate a custom 3rd party journey is to directly use the ",(0,i.kt)("a",{parentName:"p",href:"/api/submission"},"Submission API")," and configure an ",(0,i.kt)("a",{parentName:"p",href:"/docs/automation/intro"},"Automation")," to create further entities and trigger emails and workflows."),(0,i.kt)("h3",{id:"step-1-upload-files-optional"},"Step 1: Upload Files (optional)"),(0,i.kt)("p",null,"Submission API may be used together with ",(0,i.kt)("a",{parentName:"p",href:"https://docs.epilot.io/api/file"},"File API")," to pass file uploads to submissions using the following flow:"),(0,i.kt)("p",null,"Use the ",(0,i.kt)("inlineCode",{parentName:"p"},"uploadFile")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"uploadFilePublic")," operation of File API to generate a temporary upload URL and receive an s3ref."),(0,i.kt)("p",null,"Please note that the ",(0,i.kt)("inlineCode",{parentName:"p"},"uploadFile")," requires a valid OAuth2 authorization token for epilot."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"POST https://file.sls.epilot.io/v1/files/public/upload\n")),(0,i.kt)("p",null,"Request Body:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'// application/json\n{\n  "filename": "document.pdf",\n  "mime_type": "application/pdf"\n}\n')),(0,i.kt)("p",null,"Response (200):"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'// application/json\n{\n  "s3ref": {\n    "bucket": "epilot-user-content",\n    "key": "temp/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"\n  },\n  "upload_url": "https://epilot-files-prod.s3.eu-central-1.amazonaws.com/123/temp/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf?AWSParams=123"\n}\n')),(0,i.kt)("p",null,"Then, upload a file with a ",(0,i.kt)("inlineCode",{parentName:"p"},"PUT")," operation to the generated upload_url. (Hint: make sure you pass the correct Content-Type header and encoding!)"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"PUT https://epilot-files-prod.s3.eu-central-1.amazonaws.com/123/temp/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf?AWSParams=123\n")),(0,i.kt)("p",null,"Request Body:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"(binary data)\n")),(0,i.kt)("h3",{id:"step-2-create-submission"},"Step 2: Create Submission"),(0,i.kt)("p",null,"To create a Submission, call the ",(0,i.kt)("a",{parentName:"p",href:"/api/submission"},"Submission API")," with data from your custom form or journey:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"POST https://submission.sls.epilot.io/v1/submission/submissions\n")),(0,i.kt)("p",null,"Any valid JSON data can be passed via the ",(0,i.kt)("inlineCode",{parentName:"p"},"entities")," property."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'// application/json\n{\n  // replace with your epilot organization id\n  "organization_id": "123",\n  "source_type": "api", // select "api" to signify the submission was created via a custom API integration\n  "source_id": "example-api-journey", // source_id is used to identify your journey when triggering automations\n  "entities": [\n    {\n      "_schema": "submission", // important: must be set to "submission"\n      "description": "Submission created via API"\n      // add your custom submission data here\n    }\n  ]\n}\n')),(0,i.kt)("p",null,"If you uploaded any files during the first step, you should pass the ",(0,i.kt)("inlineCode",{parentName:"p"},"s3ref"),"s in the ",(0,i.kt)("inlineCode",{parentName:"p"},"entities.*.files")," property in your Submission API payload:"),(0,i.kt)("p",null,"Request Body:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  // ...\n  "entities": [\n    {\n      "_schema": "submission",\n      "description": "Submission with files",\n      "files": [\n        {\n          "s3ref": {\n            "bucket": "epilot-user-content",\n            "key": "temp/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"\n          },\n          "filename": "document.pdf"\n        }\n      ]\n    }\n  ]\n}\n')),(0,i.kt)("p",null,"You may also optionally add marketing opt ins to your Submission API payload to display consent information on the created entities."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  // ...\n  "opt_ins": [\n    {\n      "topic": "EMAIL_MARKETING",\n      "identifier": "example@submission.com",\n      "meta": {\n        // extra metadata such as the IP address may be added for the consent event\n      }\n    }\n  ]\n}\n')),(0,i.kt)("h3",{id:"step-3-create-an-automation-flow"},"Step 3: Create an Automation Flow"),(0,i.kt)("p",null,"To automatically create epilot epilot entities, send emails and start workflows from your submissions, you can configure an ",(0,i.kt)("a",{parentName:"p",href:"/docs/automation/intro"},"Automation"),"."),(0,i.kt)("p",null,"Create a new Automation from ",(0,i.kt)("a",{parentName:"p",href:"https://portal.epilot.cloud/app/automation-hub/flow/create"},"Configuration > Advanced Configuration > Automations > Create")),(0,i.kt)("p",null,"Configure an API Submission trigger with the same ",(0,i.kt)("inlineCode",{parentName:"p"},"source_id")," you're passing in your Submission API payload."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"API Submission Trigger",src:n(7153).Z,width:"1081",height:"363"})),(0,i.kt)("p",null,"Switch to the ",(0,i.kt)("em",{parentName:"p"},"Actions")," Tab and add your first Entity Mapping action."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Map Entity Action",src:n(6037).Z,width:"1082",height:"375"})),(0,i.kt)("p",null,"You can now start mapping fields from your submission to business objects. Refer to the ",(0,i.kt)("a",{parentName:"p",href:"/docs/automation/entity-mapping"},"Entity Mapping documentation")," for details."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Map Entity Action",src:n(5922).Z,width:"1084",height:"1111"})),(0,i.kt)("p",null,"To ensure proper relations between actions, the recommended order for journey submission Automation actions is the following:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Create/Edit Account"),(0,i.kt)("li",{parentName:"ol"},"Create/Edit Contact"),(0,i.kt)("li",{parentName:"ol"},"Create/Edit Order"),(0,i.kt)("li",{parentName:"ol"},"Create/Edit Opportunity"),(0,i.kt)("li",{parentName:"ol"},"Start Workflow"),(0,i.kt)("li",{parentName:"ol"},"Trigger Webhook")),(0,i.kt)("p",null,"Refer to the ",(0,i.kt)("a",{parentName:"p",href:"/docs/automation/intro"},"Automation documentation")," for details."),(0,i.kt)("h2",{id:"method-2-direct-api-usage-advanced"},"Method 2: Direct API usage (Advanced)"),(0,i.kt)("p",null,"[",(0,i.kt)("a",{target:"_blank",href:n(8582).Z},"Postman Collection"),"]"),(0,i.kt)("p",null,"In some cases it may be easier to directly use epilot APIs to create your business objects and trigger actions, in place of using Automation."),(0,i.kt)("h3",{id:"step-1-create-customer-entities-contact--account"},"Step 1: Create customer entities (contact + account)"),(0,i.kt)("p",null,"We start by using the Entity API ",(0,i.kt)("a",{parentName:"p",href:"/api/entity#operation/getUserLoginParameters"},(0,i.kt)("inlineCode",{parentName:"a"},"upsertEntity"))," operation to create or update a Contact, and optionally an Account entity, which are related to each other:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"PATCH https://entity.sls.epilot.io/v1/entity/account:upsert\n")),(0,i.kt)("p",null,"Request body 1:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "unique_key": ["customer_number"],\n  "entity": {\n    "_schema": "account",\n    "_title": "Testfirma GmbH",\n    "name": "Apple GmbH",\n    "customer_number": "123456789",\n    "email": [\n      {\n        "_tags": [],\n        "email": "applegmbh+demo@epilot.cloud"\n      }\n    ],\n    "address": [\n      {\n        "_tags": ["billing"],\n        "street": "Im Mediapark",\n        "street_number": "8a",\n        "postal_code": "50670",\n        "city": "K\xf6ln",\n        "country": "DE",\n        "additional_info": ""\n      }\n    ],\n    "phone": [\n      {\n        "_tags": ["business"],\n        "phone": "0123456789"\n      }\n    ]\n  }\n}\n')),(0,i.kt)("p",null,"Request body 2:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "unique_key": ["email.0.email"],\n  "entity": {\n    "address": [\n      {\n        "_tags": ["billing"],\n        "street": "Im Mediapark",\n        "street_number": "8a",\n        "postal_code": "50670",\n        "city": "K\xf6ln",\n        "country": "DE",\n        "additional_info": ""\n      }\n    ],\n    "first_name": "Martina",\n    "last_name": "Crimmann",\n    "salutation": "Ms. / Mrs.",\n    "email": [\n      {\n        "_tags": ["business"],\n        "email": "m.crimmann@epilot.cloud"\n      }\n    ],\n    "phone": [\n      {\n        "_tags": ["business"],\n        "phone": "0123456789"\n      }\n    ],\n    "account": {\n      "$relation": [\n        {\n          // replace with your account id\n          "entity_id": "a2594e72-5d34-4cdd-a38b-c243095c66ac",\n          "_tags": []\n        }\n      ]\n    }\n  }\n}\n')),(0,i.kt)("p",null,"Make sure to take note of each returned entity ",(0,i.kt)("inlineCode",{parentName:"p"},"_id")," property."),(0,i.kt)("h3",{id:"step-2-upload-files"},"Step 2: Upload Files"),(0,i.kt)("p",null,"Next, we use the File API ",(0,i.kt)("inlineCode",{parentName:"p"},"uploadFile")," operation together with ",(0,i.kt)("inlineCode",{parentName:"p"},"saveFile")," to upload files and save them as File entities."),(0,i.kt)("p",null,"Again, make note of the file ids for later use."),(0,i.kt)("p",null,"Call ",(0,i.kt)("inlineCode",{parentName:"p"},"uploadFile")," to receive an ",(0,i.kt)("inlineCode",{parentName:"p"},"s3ref")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"upload_url"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"POST https://file.sls.epilot.io/v1/files/upload\n")),(0,i.kt)("p",null,"Upload the file with a PUT request to the ",(0,i.kt)("inlineCode",{parentName:"p"},"upload_url"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"PUT https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/temp/f5e1c2be-7392-4a0d-8c45-236743423733/example.pdf?X-Amz-...\n")),(0,i.kt)("p",null,"Pass s3ref to ",(0,i.kt)("inlineCode",{parentName:"p"},"saveFile"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"POST https://file.sls.epilot.io/v1/files/upload\n")),(0,i.kt)("p",null,"Check out ",(0,i.kt)("a",{parentName:"p",href:"/docs/files/file-api#example-flow"},"the File API example"),", or the example Postman collection for the full request flow example."),(0,i.kt)("h3",{id:"step-3-creating-an-order"},"Step 3: Creating an Order"),(0,i.kt)("p",null,"We first use the ",(0,i.kt)("a",{parentName:"p",href:"/api/entity#operation/searchEntities"},"Entity Search API")," to fetch all configured products and their prices in epilot:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"POST https://entity.sls.epilot.io/v1/entity:search\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "q": "_schema:product",\n  "size": 1000,\n  "hydrate": true,\n  "fields": ["_schema", "_id", "price_options"]\n}\n')),(0,i.kt)("p",null,"Taking note of product and price ids, we create an order entity by calling the ",(0,i.kt)("a",{parentName:"p",href:"/api/pricing#operation/createOrder"},"Pricing API ",(0,i.kt)("inlineCode",{parentName:"a"},"createOrder")," operation"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"POST https://pricing-api.sls.epilot.io/v1/order\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "status": "draft",\n  "line_items": [\n    {\n      "currency": "EUR",\n      "description": "string",\n      "quantity": 1,\n      // replace with your product id and selected price id\n      "product_id": "5299d52a-f878-44ce-8bb4-3abc1ec6b7c8",\n      "price_id": "707dfb87-f14b-4540-b474-933f13c7db7b"\n    }\n  ],\n  "source_type": "Helium",\n  "currency": "EUR",\n  "billing_first_name": "Martina",\n  "billing_last_name": "Crimmann",\n  "billing_company_name": "Apple GmbH",\n  "billing_email": "m.crimmann@epilot.cloud",\n  "billing_phone": "0123456789",\n  "billing_address": [\n    {\n      "_tags": ["Rechnungsadresse"],\n      "street": "Im Mediapark",\n      "street_number": "8a",\n      "postal_code": "50670",\n      "city": "K\xf6ln",\n      "country": "Deutschland",\n      "additional_info": ""\n    }\n  ],\n  "delivery_address": [],\n  "_tags": ["Test Bestellung"]\n}\n')),(0,i.kt)("h3",{id:"step-4-create-opportunity"},"Step 4: Create Opportunity"),(0,i.kt)("p",null,"We use the ",(0,i.kt)("a",{parentName:"p",href:"http://localhost:3000/api/entity#operation/createEntity"},"Entity API ",(0,i.kt)("inlineCode",{parentName:"a"},"createEntity")," operation")," to create an Opportunity entity with the correct relations."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"POST https://entity.sls.epilot.io/v1/entity/opportunity\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "customer": {\n    "$relation": [\n      // replace with contact and account ids\n      {\n        "entity_id": "a2594e72-5d34-4cdd-a38b-c243095c66ac",\n        "_tags": []\n      },\n      {\n        "entity_id": "ee3837b5-6f85-4d34-9b56-d1c09c2713e5",\n        "_tags": []\n      }\n    ]\n  },\n  "billing_address": {\n    "$relation_ref": [\n      {\n        // replace with your contact id\n        "entity_id": "ee3837b5-6f85-4d34-9b56-d1c09c2713e5",\n        "path": "address",\n        "relation_tag": "billing"\n      }\n    ]\n  },\n  "opportunity_title": "WEG Im Mediapark 8a",\n  "description": "Dies ist eine Beschreibung.",\n  "_files": {\n    "$relation": [\n      {\n        // replace with your file ids\n        "entity_id": "4509d528-efda-4a46-9284-c83a7138b790",\n        "_tags": []\n      }\n    ]\n  },\n  "items": {\n    "$relation": [\n      {\n        // replace with your order id\n        "entity_id": "27260061-39b1-4905-a27a-703e68466ab7",\n        "_tags": []\n      }\n    ]\n  }\n}\n')),(0,i.kt)("h3",{id:"step-5-start-workflow-optional"},"Step 5: Start Workflow (optional)"),(0,i.kt)("p",null,"To start a workflow, we call the Workflow API ",(0,i.kt)("inlineCode",{parentName:"p"},"createExecution")," operation:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"POST https://workflows-execution.sls.epilot.io/v1/workflows/executions\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  // replace with your configured workflow id\n  "workflowId": "5SMPGoqP",\n  "trigger": "AUTOMATIC",\n  "assignedTo": [],\n  "contexts": [\n    // add the entity ids you want to display the workflow on\n    {\n      "id": "a2594e72-5d34-4cdd-a38b-c243095c66ac",\n      "schema": "account"\n    },\n    {\n      "id": "ee3837b5-6f85-4d34-9b56-d1c09c2713e5",\n      "schema": "contact"\n    },\n    {\n      "id": "ba9d8b53-b44b-47b3-89df-9222832c37a4",\n      "schema": "opportunity"\n    }\n  ]\n}\n')),(0,i.kt)("h3",{id:"step-6-create-submission-optional"},"Step 6: Create Submission (optional)"),(0,i.kt)("p",null,"To store the raw journey submission data and possibly trigger further automations, we can also create a submission entity using the ",(0,i.kt)("inlineCode",{parentName:"p"},"createEntity")," operation:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"POST https://entity.sls.epilot.io/v1/entity/submission\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "description": "Example Submission created via Entity API",\n  "source_type": "api",\n  "source_id": "", // add a source_id here in case you want to trigger automations\n  "journey_data": {\n    // add any raw data here\n  },\n  "mapped_entities": {\n    "$relation": [\n      // add all your entities as relations to submission\n      {\n        "entity_id": "a2594e72-5d34-4cdd-a38b-c243095c66ac",\n        "_tags": ["account"]\n      },\n      {\n        "entity_id": "ee3837b5-6f85-4d34-9b56-d1c09c2713e5",\n        "_tags": ["contact"]\n      },\n      {\n        "entity_id": "27260061-39b1-4905-a27a-703e68466ab7",\n        "_tags": ["order"]\n      },\n      {\n        "entity_id": "ba9d8b53-b44b-47b3-89df-9222832c37a4",\n        "_tags": ["opportunity"]\n      }\n    ]\n  }\n}\n')))}u.isMDXComponent=!0},8582:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/files/api-journey.postman_collection.json-f6b85517bba03531915f20db3fd979fe.zip"},283:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/files/simple-submission.postman_collection.json-55ce94aaf0ed7404cfabde19765a08b8.zip"},5922:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/automation-entity-mapping-07283d2201ee325b4d6144d0257013da.png"},6037:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/automation-map-entity-action-404fb84cb0149a2487157471d78a411c.png"},7153:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/automation-trigger-api-e1b97cda096f18f02fbdb8a5aaa7d624.png"}}]);