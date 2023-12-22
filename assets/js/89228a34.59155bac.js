"use strict";(self.webpackChunkepilot_dev_handbook=self.webpackChunkepilot_dev_handbook||[]).push([[4600],{3905:(e,t,i)=>{i.d(t,{Zo:()=>d,kt:()=>p});var a=i(7294);function n(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function r(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,a)}return i}function o(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?r(Object(i),!0).forEach((function(t){n(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):r(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function s(e,t){if(null==e)return{};var i,a,n=function(e,t){if(null==e)return{};var i,a,n={},r=Object.keys(e);for(a=0;a<r.length;a++)i=r[a],t.indexOf(i)>=0||(n[i]=e[i]);return n}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)i=r[a],t.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(n[i]=e[i])}return n}var l=a.createContext({}),m=function(e){var t=a.useContext(l),i=t;return e&&(i="function"==typeof e?e(t):o(o({},t),e)),i},d=function(e){var t=m(e.components);return a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var i=e.components,n=e.mdxType,r=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),c=m(i),p=n,h=c["".concat(l,".").concat(p)]||c[p]||u[p]||r;return i?a.createElement(h,o(o({ref:t},d),{},{components:i})):a.createElement(h,o({ref:t},d))}));function p(e,t){var i=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var r=i.length,o=new Array(r);o[0]=c;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:n,o[1]=s;for(var m=2;m<r;m++)o[m]=i[m];return a.createElement.apply(null,o)}return a.createElement.apply(null,i)}c.displayName="MDXCreateElement"},2:(e,t,i)=>{i.r(t),i.d(t,{contentTitle:()=>o,default:()=>d,frontMatter:()=>r,metadata:()=>s,toc:()=>l});var a=i(7462),n=(i(7294),i(3905));const r={sidebar_position:1},o="Email Settings",s={unversionedId:"messaging/email-settings",id:"messaging/email-settings",title:"Email Settings",description:"Custom Email Domain",source:"@site/docs/messaging/email-settings.md",sourceDirName:"messaging",slug:"/messaging/email-settings",permalink:"/docs/messaging/email-settings",editUrl:"https://github.com/epilot-dev/docs/edit/main/docs/messaging/email-settings.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Components Library",permalink:"/docs/ui-design/component_library"},next:{title:"Email Templates",permalink:"/docs/messaging/email-templates"}},l=[{value:"Custom Email Domain",id:"custom-email-domain",children:[{value:"Subdomain Delegation:",id:"subdomain-delegation",children:[],level:3},{value:"Optional: Managing the subdomain yourself",id:"optional-managing-the-subdomain-yourself",children:[],level:3},{value:"SPF, DMARC, and DKIM Implementation:",id:"spf-dmarc-and-dkim-implementation",children:[],level:3},{value:"Custom &quot;Mail From&quot; Domain Configuration:",id:"custom-mail-from-domain-configuration",children:[],level:3},{value:"Email Transmission Security:",id:"email-transmission-security",children:[],level:3},{value:"Security on attachments:",id:"security-on-attachments",children:[],level:3},{value:"Email Receiving",id:"email-receiving",children:[],level:3}],level:2},{value:"Email Addresses",id:"email-addresses",children:[],level:2}],m={toc:l};function d(e){let{components:t,...i}=e;return(0,n.kt)("wrapper",(0,a.Z)({},m,i,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"email-settings"},"Email Settings"),(0,n.kt)("h2",{id:"custom-email-domain"},"Custom Email Domain"),(0,n.kt)("p",null,"[",(0,n.kt)("a",{parentName:"p",href:"/api/email-settings#tag/Domains"},"API Docs"),"]\n[",(0,n.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/@epilot/email-settings-client"},"SDK"),"]\n[",(0,n.kt)("a",{parentName:"p",href:"https://help.epilot.cloud/hc/de/articles/5573710208412-E-Mail-Konfigurationsmen%C3%BC-im-Detail-epilot-360-#h_01GA1JYMPGHRE0XDCHW9N61G57"},"Setup Docs"),"]"),(0,n.kt)("p",null,"Epilot not only provides the capability to send emails using our domain but also allows customers to bring their own subdomains. This enables messages to be sent and received via epilot, acting on behalf of your own organization. It is highly recommended that an IT professional from your company, who is well-versed with DNS records, handle this integration."),(0,n.kt)("h3",{id:"subdomain-delegation"},"Subdomain Delegation:"),(0,n.kt)("p",null,"While setting up the subdomain, a process known as 'subdomain delegation' is required. With this setup:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"The subdomain will be managed by epilot by giving complete control."),(0,n.kt)("li",{parentName:"ul"},"Its primary role will be to enable the sending and receiving of emails."),(0,n.kt)("li",{parentName:"ul"},"This subdomain can be further configured to serve as a dedicated portal for end customers or installers."),(0,n.kt)("li",{parentName:"ul"},"More on the portal domain setup ",(0,n.kt)("a",{parentName:"li",href:"https://help.epilot.cloud/hc/de/articles/4417739340050-Kundenportal-einrichten-epilot-360-#h_01GC9GHGN6788D2GDVE6H0BVVQ"},"here"),".")),(0,n.kt)("h3",{id:"optional-managing-the-subdomain-yourself"},"Optional: Managing the subdomain yourself"),(0,n.kt)("p",null,"During the initial subdomain setup we require the subdomain to be delegated to epilot nameservers for provisioning, however after the initial setup is complete customers may opt to manage the subdomain using their own DNS."),(0,n.kt)("p",null,"Get in touch with ",(0,n.kt)("a",{parentName:"p",href:"mailto:support@epilot.cloud"},"epilot support")," if you would like to transfer the nameservers for your own subdomain, and we will provide the required DNS setup to manage your own epilot subdomains."),(0,n.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,n.kt)("div",{parentName:"div",className:"admonition-heading"},(0,n.kt)("h5",{parentName:"div"},(0,n.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,n.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,n.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,n.kt)("div",{parentName:"div",className:"admonition-content"},(0,n.kt)("p",{parentName:"div"},"For customers managing their own subdomain, you may be asked to manually change DNS records from time to time to ensure epilot works correctly and securely. This is not needed when the subdomain is delegated to epilot."))),(0,n.kt)("h3",{id:"spf-dmarc-and-dkim-implementation"},"SPF, DMARC, and DKIM Implementation:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"After the domain is delegated to us, we handle the creation of all the necessary MX & TXT records in our AWS hosted zone. This includes:",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"SPF (Sender Policy Framework) to specify the servers that are allowed to send email for your domain."),(0,n.kt)("li",{parentName:"ul"},"DMARC (Domain-based Message Authentication Reporting and Conformance) to enable reporting and set a policy for email authentication."),(0,n.kt)("li",{parentName:"ul"},"DKIM (DomainKeys Identified Mail) to sign emails cryptographically."))),(0,n.kt)("li",{parentName:"ul"},"These protocols assist in verifying the email sender\u2019s identity, which significantly reduces the risk of phishing emails and spam."),(0,n.kt)("li",{parentName:"ul"},"Further reference can be found in the ",(0,n.kt)("a",{parentName:"li",href:"https://docs.aws.amazon.com/ses/latest/dg/email-authentication-methods.html"},"AWS documentation"),".")),(0,n.kt)("h3",{id:"custom-mail-from-domain-configuration"},'Custom "Mail From" Domain Configuration:'),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Per the ",(0,n.kt)("a",{parentName:"li",href:"https://docs.aws.amazon.com/ses/latest/dg/mail-from.html"},"AWS SES guidelines"),', it is advised to use a different "Mail From" domain than the sender\'s email address that appears in the actual email.'),(0,n.kt)("li",{parentName:"ul"},'To align with this guidance, we configure the "Mail From" domain to adopt the format mail.${subdomain}.'),(0,n.kt)("li",{parentName:"ul"},'This distinct "Mail From" domain is a best practice that enhances email deliverability and aligns with various email authentication standards.')),(0,n.kt)("h3",{id:"email-transmission-security"},"Email Transmission Security:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"SES, by default, ensures the secure transmission of emails using TLS (Transport Layer Security) encryption."),(0,n.kt)("li",{parentName:"ul"},"This ensures that the contents of the email are secure during transit and are protected from eavesdropping or tampering.")),(0,n.kt)("h3",{id:"security-on-attachments"},"Security on attachments:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"To safeguard email attachments, we utilize ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/widdix/aws-s3-virusscan"},"AWS S3 VirusScan"),", which leverages the ClamAV engine. This system actively scans and identifies malicious files, ensuring they are automatically deleted before reaching any recipient. "),(0,n.kt)("li",{parentName:"ul"},"ClamAV is a robust, open-source antivirus solution recognized for its capability to detect a wide range of threats, including trojans, malware, and viruses. Its team and vast community consistently refresh the virus databases, enabling the tool to recognize and counteract the latest risks. "),(0,n.kt)("li",{parentName:"ul"},"We've also configured our system for internal notifications on any detection events, ensuring that we're always informed of potential threats.")),(0,n.kt)("h3",{id:"email-receiving"},"Email Receiving"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"We employ SES receipt rules to handle incoming emails. "),(0,n.kt)("li",{parentName:"ul"},"These rules are configured to direct the emails to separate S3 buckets, organized by tenant. "),(0,n.kt)("li",{parentName:"ul"},"Subsequently, these emails are processed and structured as message entities along with attachments, which are then organized under their respective parent threads.")),(0,n.kt)("h2",{id:"email-addresses"},"Email Addresses"),(0,n.kt)("p",null,"[",(0,n.kt)("a",{parentName:"p",href:"/api/email-settings#tag/Settings"},"API Docs"),"]\n[",(0,n.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/@epilot/email-settings-client"},"SDK"),"]\n[",(0,n.kt)("a",{parentName:"p",href:"https://help.epilot.cloud/hc/de/articles/5573710208412-E-Mail-Konfigurationsmen%C3%BC-im-Detail-epilot-360-#h_01GA1JYT6TNQ64AJH612WN9J4V"},"Setup Docs"),"]"),(0,n.kt)("p",null,"With this setting, users have the flexibility to designate a specific email address within their subdomain for both sending and receiving messages."))}d.isMDXComponent=!0}}]);