"use strict";(self.webpackChunkepilot_dev_handbook=self.webpackChunkepilot_dev_handbook||[]).push([[1483],{3905:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>y});var i=t(67294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,i,o=function(e,n){if(null==e)return{};var t,i,o={},r=Object.keys(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var p=i.createContext({}),s=function(e){var n=i.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},u=function(e){var n=s(e.components);return i.createElement(p.Provider,{value:n},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},m=i.forwardRef((function(e,n){var t=e.components,o=e.mdxType,r=e.originalType,p=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=s(t),m=o,y=d["".concat(p,".").concat(m)]||d[m]||c[m]||r;return t?i.createElement(y,a(a({ref:n},u),{},{components:t})):i.createElement(y,a({ref:n},u))}));function y(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var r=t.length,a=new Array(r);a[0]=m;var l={};for(var p in n)hasOwnProperty.call(n,p)&&(l[p]=n[p]);l.originalType=e,l[d]="string"==typeof e?e:o,a[1]=l;for(var s=2;s<r;s++)a[s]=t[s];return i.createElement.apply(null,a)}return i.createElement.apply(null,t)}m.displayName="MDXCreateElement"},27087:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>a,default:()=>d,frontMatter:()=>r,metadata:()=>l,toc:()=>p});var i=t(87462),o=(t(67294),t(3905));const r={sidebar_position:3},a="Embedding Journeys",l={unversionedId:"journeys/embedding",id:"journeys/embedding",title:"Embedding Journeys",description:"Journeys can easily be embedded on any website by placing an embed script tag provided by epilot on your website, and then optionally customizing it for advanced use.",source:"@site/docs/journeys/embedding.md",sourceDirName:"journeys",slug:"/journeys/embedding",permalink:"/docs/journeys/embedding",editUrl:"https://github.com/epilot-dev/docs/edit/main/docs/journeys/embedding.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"appsSidebar",previous:{title:"Designs",permalink:"/docs/journeys/design-builder"},next:{title:"Submissions",permalink:"/docs/journeys/submissions"}},p=[{value:"Embed Script",id:"embed-script",children:[],level:2},{value:"Embed Configurator",id:"embed-configurator",children:[],level:2},{value:"Journey Data Injection",id:"journey-data-injection",children:[],level:2},{value:"Configuration Possibilities",id:"configuration-possibilities",children:[{value:"init",id:"init",children:[],level:3},{value:"update",id:"update",children:[],level:3},{value:"on",id:"on",children:[],level:3},{value:"enterFullScreen",id:"enterfullscreen",children:[],level:3},{value:"exitFullScreen",id:"exitfullscreen",children:[],level:3},{value:"isInitialized",id:"isinitialized",children:[],level:3}],level:2},{value:"Scenarios",id:"scenarios",children:[{value:"Full-Screen",id:"full-screen",children:[],level:3},{value:"Inline",id:"inline",children:[],level:3},{value:"Multiple Journeys",id:"multiple-journeys",children:[],level:3}],level:2}],s={toc:p},u="wrapper";function d(e){let{components:n,...r}=e;return(0,o.kt)(u,(0,i.Z)({},s,r,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"embedding-journeys"},"Embedding Journeys"),(0,o.kt)("p",null,"Journeys can easily be embedded on any website by placing an embed script tag provided by epilot on your website, and then optionally customizing it for advanced use."),(0,o.kt)("h2",{id:"embed-script"},"Embed Script"),(0,o.kt)("p",null,"An embed script is a simple way to publish an epilot journey on your website. The script loads the journey using a Journey ID and a secure token to embed the journey securely on your website."),(0,o.kt)("p",null,"This page guides you through the different options available to embed a Journey into your web page."),(0,o.kt)("h2",{id:"embed-configurator"},"Embed Configurator"),(0,o.kt)("p",null,"Configure and copy the embed script via the Journey Builders' Embed Configurator after saving the Journey. You can choose:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Whether the Journey should be shown in a full-screen overlay, or inline to your website (Default: Fullscreen)"),(0,o.kt)("li",{parentName:"ul"},"The language of the journey (Default: German DE)"),(0,o.kt)("li",{parentName:"ul"},"The label of the button that suppose to open the journey (Default: Inhalt anzeigen)"),(0,o.kt)("li",{parentName:"ul"},"The alignment of the button, left, right, or center (Default: Left)"),(0,o.kt)("li",{parentName:"ul"},"Overwride the journey option to scroll the user to the top of the new step once the end user clicks on the next button in any step (Default: ON)")),(0,o.kt)("p",null,"Depending on the embedding type, you can change additional settings."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Embedding Configuration",src:t(52804).Z,width:"3024",height:"1714"})),(0,o.kt)("h2",{id:"journey-data-injection"},"Journey Data Injection"),(0,o.kt)("p",null,"It is possible by using the Embed Script to modify the initial state of the journey. There are the following posibilities:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Setting an intial data for the journey: doing this will prefill the blocks with data."),(0,o.kt)("li",{parentName:"ol"},"Starting the journey from a specific step: doing this will start the journey from the specified step if it was combined with the initial data, one can achieve a case when a product is selection is done in an external website, injected into the journey, then the in journey selection step skipped."),(0,o.kt)("li",{parentName:"ol"},"Set display options for the journey fields (for now disabling fields)")),(0,o.kt)("p",null,"The following DataInjectionOptions type shows what is possible. However we ask devs to go to our ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/epilot-dev/epilot-journey-sdk"},"epilot Journey SDK")," project which includes more documentation supported with examples."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Type Definition")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"export type DataInjectionOptions = {\n  /** the initial step index of the journey. aka, where to start the journey from */\n  initialStepIndex?: number\n  /** the initial state of the journey. aka, what data to prefill the journey with */\n  initialState?: Record<string, unknown>[]\n  /** the display options to be passed to the journey, for now it is used to disable some fields */\n  blocksDisplaySettings?: BlockDisplaySetting[]\n}\n")),(0,o.kt)("h2",{id:"configuration-possibilities"},"Configuration Possibilities"),(0,o.kt)("p",null,"For more advanced configuration options, you can modify the embed script yourself, as it adds an interface to your website to interact with the journey: ",(0,o.kt)("inlineCode",{parentName:"p"},"__epilot"),"\nBelow we explain all possibile configuration options"),(0,o.kt)("h3",{id:"init"},"init"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Description"),(0,o.kt)("br",{parentName:"p"}),"\n","Used to initialize one or more journeys given individual options. Multiple Journeys with different configurations can be passed"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Type Definition")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"type Init = (options?: OptionsInit[] | undefined, initOnLoad?: boolean) => void\ntype JourneyMode = 'inline' | 'full-screen'\n\ntype OptionsInit = {\n  /** id of the journey to initialise (load configuration) */\n  journeyId: string\n  /** url to override iframe src */\n  journeyUrl?: string\n  /** mode the journey runs in -> inline | full-screen */\n  mode: JourneyMode\n  /** the minimum height the journey runs in when in inline mode */\n  minHeight?: string\n  /**\n   * whether to show or hide the topBar\n   * @default true\n   */\n  topBar?: boolean\n  /**\n   * whether to scroll to the top after step navigation\n   * @default true\n   */\n  scrollToTop?: boolean\n  /**\n   * whether to show the closeButton if in inline mode\n   * @default true\n   */\n  closeButton?: boolean\n  /** additional data passed to the journey + submission */\n  contextData?: Record<string, unknown>\n  /** the language the journey should be initialised in */\n  lang?: string\n  /** the data injext options that will be passed to the journey */\n  dataInjectionOptions?: DataInjectionOptions\n  /**\n   * Used as iframe name/title attribute if provided\n   */\n  name?: string\n}\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Usage")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"__epilot.init([{ journeyId: '123', mode: 'full-screen', topBar: false }])\n")),(0,o.kt)("h3",{id:"update"},"update"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Description"),(0,o.kt)("br",{parentName:"p"}),"\n","Used to update an initialized journey by passed options."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Type Definition")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"type Update = (journeyId: string, payload?: OptionsUpdate) => void\ntype OptionsUpdate = Omit<OptionsInit, 'journeyId'>\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Usage")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"__epilot.update('123', { journeyId: '123', mode: 'full-screen', topBar: false })\n")),(0,o.kt)("h3",{id:"on"},"on"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Description"),(0,o.kt)("br",{parentName:"p"}),"\n","Sets up an event listener to execute custom logic based on journey events."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Uses cases:")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Execute logging, or tracking"),(0,o.kt)("li",{parentName:"ul"},"Adjust website CSS, e.g. if full screen exited")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Type Definition")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"type JourneyEvent =\n  | 'init'\n  | 'enterFullScreen'\n  | 'exitFullScreen'\n  | 'closeJourney'\n  | 'formChange'\n\ntype On = (\n  eventName: JourneyEvent,\n  cb: (payload: Record<string, unknown>, event: CustomEvent) => void\n) => void\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Usage")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"__epilot.on('init', function ({ journeys }) {\n  console.log('Journey Initialized')\n})\n")),(0,o.kt)("h3",{id:"enterfullscreen"},"enterFullScreen"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Description"),(0,o.kt)("br",{parentName:"p"}),"\n","If a journey is initialized in full-screen mode, executes the command to open the journey."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Type Definition")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"type EnterFullScreen = (\n  journeyId: string,\n  payload?: Record<string, unknown> | undefined\n) => void\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Usage")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"__epilot.enterFullScreen('123')\n")),(0,o.kt)("h3",{id:"exitfullscreen"},"exitFullScreen"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Description"),(0,o.kt)("br",{parentName:"p"}),"\n","If a journey is in full-screen mode, executes the command to close the journey. It is also internally used at the Journeys \u201cClose button\u201d."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Type Definition")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"type ExitFullScreen = (\n  journeyId: string,\n  payload?: Record<string, unknown> | undefined\n) => void\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Usage")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"__epilot.exitFullScreen('123')\n")),(0,o.kt)("h3",{id:"isinitialized"},"isInitialized"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Description"),(0,o.kt)("br",{parentName:"p"}),"\n","Checks whether a journey is initialized already initialized or not."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Type Definition")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"type IsInitialized = (journeyId: string) => boolean\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Usage")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"if (__epilot.isInitialized('123') === true) {\n  __epilot.enterFullScreen('123')\n}\n")),(0,o.kt)("h2",{id:"scenarios"},"Scenarios"),(0,o.kt)("h3",{id:"full-screen"},"Full-Screen"),(0,o.kt)("p",null,"The default embed method covers most of the use cases. A button will be placed on your website which opens the journey, covering the complete screen when clicked."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Code Snippet"),(0,o.kt)("br",{parentName:"p"}),"\n","The below code snippet provides the configured embed script and a button opening the journey when clicked. Don\u2019t forget to change the placeholder ids to your own journey ids!"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-html"},'\x3c!-- Clicking this button will open your Journey --\x3e\n<button onclick="__epilot.enterFullScreen(\'<your-journey-id>\')">\n  Open Journey\n</button>\n\n\x3c!-- Embed script managing your Journey --\x3e\n<script\n  data-ep-mode="full-screen"\n  data-ep-journeyIds="<your-journey-id>"\n  src="https://embed.journey.epilot.io/bundle.js"\n><\/script>\n')),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Attributes explained"),(0,o.kt)("br",{parentName:"p"}),"\n",(0,o.kt)("inlineCode",{parentName:"p"},"data-ep-mode")," - sets the mode the journey runs in",(0,o.kt)("br",{parentName:"p"}),"\n",(0,o.kt)("inlineCode",{parentName:"p"},"data-ep-journeyIds")," the journey to be created via it\u2019s id"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Outcome")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Embedding Fullscreen Outcome",src:t(80888).Z,width:"600",height:"413"})),(0,o.kt)("h3",{id:"inline"},"Inline"),(0,o.kt)("p",null,"This method will place the journey into a provided container element, or, if not provided, at the end of the web page. The height of the journey will automatically be recalculated based on the current content. In order to provide a better user experience, navigating to a different step will cause the browser to move back to the top position of the journey. The close button of the top bar is hidden."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Code Snippet"),(0,o.kt)("br",{parentName:"p"}),"\n","The below code snippet provides the configured embed script required to set up the inline mode and a container where the journey is being placed in. Don\u2019t forget to change the placeholder ids to your own journey ids!"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-html"},'\x3c!-- Your Journey will go into this container --\x3e\n<div id="epilot-journey-<your-journey-id>"></div>\n\n\x3c!-- Embed script managing your Journey --\x3e\n<script\n  data-ep-mode="inline"\n  data-journeyIds="<your-journey-id>"\n  src="https://embed.journey.epilot.io/bundle.js"\n><\/script>\n')),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Attributes explained"),(0,o.kt)("br",{parentName:"p"}),"\n",(0,o.kt)("inlineCode",{parentName:"p"},"data-ep-mode")," - sets the mode the journey runs in\n",(0,o.kt)("inlineCode",{parentName:"p"},"data-ep-journeyIds")," the journey to be created via it\u2019s id"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Outcome")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Embedding Inline Outcome",src:t(93990).Z,width:"600",height:"413"})),(0,o.kt)("h3",{id:"multiple-journeys"},"Multiple Journeys"),(0,o.kt)("p",null,"The best way to embed multiple journeys is to use the ",(0,o.kt)("inlineCode",{parentName:"p"},"__epilot")," interface described ",(0,o.kt)("a",{parentName:"p",href:"#init"},"here"),". Simply pass multiple items to the ",(0,o.kt)("inlineCode",{parentName:"p"},"init")," function"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Code Snippet")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-html"},"<button onclick=\"__epilot.enterFullScreen('<your-journey-id-1>')\">\n  Open Journey\n</button>\n<button onclick=\"__epilot.enterFullScreen('<your-journey-id-2>')\">\n  Open Journey\n</button>\n<script src=\"https://embed.journey.epilot.io/bundle.js\"><\/script>\n<script>\n  __epilot.init([\n      {\n           { journeyId: '<your-journey-id-1>', mode: 'full-screen' },\n           { journeyId: '<your-journey-id-2>', mode: 'full-screen' },\n      }\n  ])\n<\/script>\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Attributes explained"),(0,o.kt)("br",{parentName:"p"}),"\n","In this example, we dont need any ",(0,o.kt)("inlineCode",{parentName:"p"},"data-ep-")," attributes, as we use the ",(0,o.kt)("inlineCode",{parentName:"p"},"__epilot")," interface to initialize the Journeys"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Outcome")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Embedding Multiple Outcome",src:t(62674).Z,width:"600",height:"413"})))}d.isMDXComponent=!0},52804:(e,n,t)=>{t.d(n,{Z:()=>i});const i=t.p+"assets/images/journey-builder-embed-ced88e3a7f746f8dcca9f1c63d930105.png"},80888:(e,n,t)=>{t.d(n,{Z:()=>i});const i=t.p+"assets/images/journey-embed-outcome-full-screen-023e0754cfa61f530e3ecdfacb599aac.gif"},93990:(e,n,t)=>{t.d(n,{Z:()=>i});const i=t.p+"assets/images/journey-embed-outcome-inline-eb5aeccb3cd7faa68d75582f0edb21da.gif"},62674:(e,n,t)=>{t.d(n,{Z:()=>i});const i=t.p+"assets/images/journey-embed-outcome-multiple-90919aac618ad72da3950ecbf1e19574.gif"}}]);