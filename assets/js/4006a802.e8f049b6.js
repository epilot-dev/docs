"use strict";(self.webpackChunkepilot_dev_handbook=self.webpackChunkepilot_dev_handbook||[]).push([[8137],{3905:(e,t,n)=>{n.d(t,{Zo:()=>k,kt:()=>f});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},k=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,k=l(e,["components","mdxType","originalType","parentName"]),c=p(n),u=a,f=c["".concat(s,".").concat(u)]||c[u]||d[u]||o;return n?r.createElement(f,i(i({ref:t},k),{},{components:n})):r.createElement(f,i({ref:t},k))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[c]="string"==typeof e?e:a,i[1]=l;for(var p=2;p<o;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},65395:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>i,default:()=>c,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var r=n(87462),a=(n(67294),n(3905));const o={title:"Workflow in progress",sidebar_position:4},i="Workflow in progress",l={unversionedId:"workflows/workflow-in-progress",id:"workflows/workflow-in-progress",title:"Workflow in progress",description:"[API Docs]",source:"@site/docs/workflows/workflow-in-progress.md",sourceDirName:"workflows",slug:"/workflows/workflow-in-progress",permalink:"/docs/workflows/workflow-in-progress",editUrl:"https://github.com/epilot-dev/docs/edit/main/docs/workflows/workflow-in-progress.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{title:"Workflow in progress",sidebar_position:4},sidebar:"appsSidebar",previous:{title:"Workflow Notes",permalink:"/docs/workflows/workflow-notes"},next:{title:"Example: 3rd Party Journey",permalink:"/docs/integrations/3rd-party-journeys"}},s=[{value:"Tasks",id:"tasks",children:[],level:2},{value:"Phases",id:"phases",children:[],level:2},{value:"Progression Tracking",id:"progression-tracking",children:[],level:2},{value:"Status",id:"status",children:[{value:"Phase status logic",id:"phase-status-logic",children:[],level:3}],level:2},{value:"Current Workflow Position",id:"current-workflow-position",children:[],level:2}],p={toc:s},k="wrapper";function c(e){let{components:t,...o}=e;return(0,a.kt)(k,(0,r.Z)({},p,o,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"workflow-in-progress"},"Workflow in progress"),(0,a.kt)("p",null,"[",(0,a.kt)("a",{parentName:"p",href:"/api/workflow-execution"},"API Docs"),"]\n[",(0,a.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/@epilot/workflow-client"},"SDK"),"]"),(0,a.kt)("p",null,"Workflows consist of two primary components, and their advancement can be interpreted in various ways depending on specific factors."),(0,a.kt)("p",null,"Workflows components:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Task"),(0,a.kt)("li",{parentName:"ul"},"Phase")),(0,a.kt)("h2",{id:"tasks"},"Tasks"),(0,a.kt)("p",null,"A task represents an individual unit of work."),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"workflow task",src:n(15892).Z,width:"906",height:"242"})),(0,a.kt)("h2",{id:"phases"},"Phases"),(0,a.kt)("p",null,"Phases are another integral part of workflows, with the distinction that phases can encompass tasks."),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"workflow phase",src:n(12026).Z,width:"916",height:"1100"})),(0,a.kt)("h2",{id:"progression-tracking"},"Progression Tracking"),(0,a.kt)("p",null,"The progression within a workflow is visualized through the combined use of tasks, phases, and the status field."),(0,a.kt)("h2",{id:"status"},"Status"),(0,a.kt)("p",null,"The status fields, used to indicate the state of the workflow and its components, are as follows:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"workflows status: ",(0,a.kt)("inlineCode",{parentName:"li"},"STARTED"),", ",(0,a.kt)("inlineCode",{parentName:"li"},"CANCELLED"),", ",(0,a.kt)("inlineCode",{parentName:"li"},"DONE")),(0,a.kt)("li",{parentName:"ul"},"task status: ",(0,a.kt)("inlineCode",{parentName:"li"},"ASSIGNED"),", ",(0,a.kt)("inlineCode",{parentName:"li"},"UNASSIGNED"),", ",(0,a.kt)("inlineCode",{parentName:"li"},"IN_PROGRESS"),", ",(0,a.kt)("inlineCode",{parentName:"li"},"SKIPPED"),", ",(0,a.kt)("inlineCode",{parentName:"li"},"DONE")),(0,a.kt)("li",{parentName:"ul"},"phase status: ",(0,a.kt)("inlineCode",{parentName:"li"},"OPEN"),", ",(0,a.kt)("inlineCode",{parentName:"li"},"IN_PROGRESS"),", ",(0,a.kt)("inlineCode",{parentName:"li"},"COMPLETED"))),(0,a.kt)("h3",{id:"phase-status-logic"},"Phase status logic"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"OPEN"),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"contains at least 1 ",(0,a.kt)("inlineCode",{parentName:"li"},"OPEN")," and none ",(0,a.kt)("inlineCode",{parentName:"li"},"IN_PROGRESS"),"/",(0,a.kt)("inlineCode",{parentName:"li"},"DONE"),"/",(0,a.kt)("inlineCode",{parentName:"li"},"SKIPPED")," tasks"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"IN_PROGRESS"),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"the first phase of a started workflow"),(0,a.kt)("li",{parentName:"ul"},"contains at least 1 ",(0,a.kt)("inlineCode",{parentName:"li"},"IN_PROGRESS")," task"),(0,a.kt)("li",{parentName:"ul"},"contains at least 1 ",(0,a.kt)("inlineCode",{parentName:"li"},"DONE"),"/",(0,a.kt)("inlineCode",{parentName:"li"},"SKIPPED")," task BUT not all tasks are ",(0,a.kt)("inlineCode",{parentName:"li"},"DONE"),"/",(0,a.kt)("inlineCode",{parentName:"li"},"SKIPPED")," (implying work has started on the phase)"),(0,a.kt)("li",{parentName:"ul"},"considering linear workflows, a phase which follows a ",(0,a.kt)("inlineCode",{parentName:"li"},"COMPLETED")," phase/task AND contains the NEXT_OPEN_TASK"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"COMPLETED"),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"all tasks ",(0,a.kt)("inlineCode",{parentName:"li"},"DONE")," or ",(0,a.kt)("inlineCode",{parentName:"li"},"SKIPPED"))))),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u26a0\ufe0f Statuses play a crucial role when data is presented based on them.\nOne approach to monitoring workflow progress is by tallying and considering phases in the IN_PROGRESS state.\n",(0,a.kt)("img",{alt:"workflow phases in progress",src:n(92293).Z,width:"2456",height:"2082"}))),(0,a.kt)("hr",null),(0,a.kt)("h2",{id:"current-workflow-position"},"Current Workflow Position"),(0,a.kt)("p",null,"Another valuable tool for monitoring workflow progression is the concept of the ",(0,a.kt)("inlineCode",{parentName:"p"},"current task")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"current phase"),"."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"current task"))),(0,a.kt)("p",null,"In a sequential workflow, the current task is always the first task that falls into one of the following states: ",(0,a.kt)("inlineCode",{parentName:"p"},"ASSIGNED"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"UNASSIGNED"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"IN_PROGRESS")," when viewing the workflow from top to bottom, regardless of whether the task is at the root level or a child of a phase.\n",(0,a.kt)("img",{alt:"workflow current task",src:n(25703).Z,width:"902",height:"1012"}),"\nThe current task is identifiable by a blue border when viewing a workflow."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"current phase"))),(0,a.kt)("p",null,"Similar to the ",(0,a.kt)("inlineCode",{parentName:"p"},"current task"),", the ",(0,a.kt)("inlineCode",{parentName:"p"},"current phase")," is represented by a phase that contains the ",(0,a.kt)("inlineCode",{parentName:"p"},"current task"),' as one of its children. In the image below, "Pr\xfcfung" is the ',(0,a.kt)("inlineCode",{parentName:"p"},"current phase"),".\n",(0,a.kt)("img",{alt:"workflow current phase",src:n(44685).Z,width:"906",height:"330"})),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u26a0\ufe0f The present positions of tasks and phases within the workflow are employed when updating entity attributes. Workflow configurations can enable the updating of entity attributes directly from the workflow hub, as illustrated in the image below:\n",(0,a.kt)("img",{alt:"workflow configure entity update",src:n(1826).Z,width:"2100",height:"1142"}),"\n",(0,a.kt)("img",{alt:"workflow entity attribute updated",src:n(19410).Z,width:"2056",height:"964"}))))}c.isMDXComponent=!0},1826:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/configure_entity_update-b75ad0acb457cad1a193c7d49b29e1cb.png"},44685:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/current_phase-f170d6ef385b2ae33a8e1324461dd521.png"},25703:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/current_task-cde0188c3356c46bda6bd40294b1738c.png"},19410:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/entity_attribute_updated-73485c4a8fd4f302d5eceb68bd3ff917.png"},12026:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/phase-1f014db2161ef1cc93a4404d74650ff9.png"},92293:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/phases_in_progress-24b3396f928709b970820269cc3a896d.png"},15892:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/task-642f0f94fe9e837bae7600f26964315b.png"}}]);