(function(){const k=document.createElement("link").relList;if(k&&k.supports&&k.supports("modulepreload"))return;for(const C of document.querySelectorAll('link[rel="modulepreload"]'))_(C);new MutationObserver(C=>{for(const b of C)if(b.type==="childList")for(const $ of b.addedNodes)$.tagName==="LINK"&&$.rel==="modulepreload"&&_($)}).observe(document,{childList:!0,subtree:!0});function d(C){const b={};return C.integrity&&(b.integrity=C.integrity),C.referrerPolicy&&(b.referrerPolicy=C.referrerPolicy),C.crossOrigin==="use-credentials"?b.credentials="include":C.crossOrigin==="anonymous"?b.credentials="omit":b.credentials="same-origin",b}function _(C){if(C.ep)return;C.ep=!0;const b=d(C);fetch(C.href,b)}})();function Hu(c){return c&&c.__esModule&&Object.prototype.hasOwnProperty.call(c,"default")?c.default:c}var Ta={exports:{}},kr={},Ia={exports:{}},z={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ru;function Yd(){if(Ru)return z;Ru=1;var c=Symbol.for("react.element"),k=Symbol.for("react.portal"),d=Symbol.for("react.fragment"),_=Symbol.for("react.strict_mode"),C=Symbol.for("react.profiler"),b=Symbol.for("react.provider"),$=Symbol.for("react.context"),R=Symbol.for("react.forward_ref"),L=Symbol.for("react.suspense"),G=Symbol.for("react.memo"),he=Symbol.for("react.lazy"),le=Symbol.iterator;function te(f){return f===null||typeof f!="object"?null:(f=le&&f[le]||f["@@iterator"],typeof f=="function"?f:null)}var We={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ge=Object.assign,ne={};function Q(f,x,U){this.props=f,this.context=x,this.refs=ne,this.updater=U||We}Q.prototype.isReactComponent={},Q.prototype.setState=function(f,x){if(typeof f!="object"&&typeof f!="function"&&f!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,f,x,"setState")},Q.prototype.forceUpdate=function(f){this.updater.enqueueForceUpdate(this,f,"forceUpdate")};function xt(){}xt.prototype=Q.prototype;function ct(f,x,U){this.props=f,this.context=x,this.refs=ne,this.updater=U||We}var et=ct.prototype=new xt;et.constructor=ct,Ge(et,Q.prototype),et.isPureReactComponent=!0;var Se=Array.isArray,tt=Object.prototype.hasOwnProperty,Ee={current:null},_e={key:!0,ref:!0,__self:!0,__source:!0};function He(f,x,U){var F,q={},J=null,K=null;if(x!=null)for(F in x.ref!==void 0&&(K=x.ref),x.key!==void 0&&(J=""+x.key),x)tt.call(x,F)&&!_e.hasOwnProperty(F)&&(q[F]=x[F]);var H=arguments.length-2;if(H===1)q.children=U;else if(1<H){for(var re=Array(H),ze=0;ze<H;ze++)re[ze]=arguments[ze+2];q.children=re}if(f&&f.defaultProps)for(F in H=f.defaultProps,H)q[F]===void 0&&(q[F]=H[F]);return{$$typeof:c,type:f,key:J,ref:K,props:q,_owner:Ee.current}}function Pt(f,x){return{$$typeof:c,type:f.type,key:x,ref:f.ref,props:f.props,_owner:f._owner}}function vt(f){return typeof f=="object"&&f!==null&&f.$$typeof===c}function Qt(f){var x={"=":"=0",":":"=2"};return"$"+f.replace(/[=:]/g,function(U){return x[U]})}var dt=/\/+/g;function Ue(f,x){return typeof f=="object"&&f!==null&&f.key!=null?Qt(""+f.key):x.toString(36)}function nt(f,x,U,F,q){var J=typeof f;(J==="undefined"||J==="boolean")&&(f=null);var K=!1;if(f===null)K=!0;else switch(J){case"string":case"number":K=!0;break;case"object":switch(f.$$typeof){case c:case k:K=!0}}if(K)return K=f,q=q(K),f=F===""?"."+Ue(K,0):F,Se(q)?(U="",f!=null&&(U=f.replace(dt,"$&/")+"/"),nt(q,x,U,"",function(ze){return ze})):q!=null&&(vt(q)&&(q=Pt(q,U+(!q.key||K&&K.key===q.key?"":(""+q.key).replace(dt,"$&/")+"/")+f)),x.push(q)),1;if(K=0,F=F===""?".":F+":",Se(f))for(var H=0;H<f.length;H++){J=f[H];var re=F+Ue(J,H);K+=nt(J,x,U,re,q)}else if(re=te(f),typeof re=="function")for(f=re.call(f),H=0;!(J=f.next()).done;)J=J.value,re=F+Ue(J,H++),K+=nt(J,x,U,re,q);else if(J==="object")throw x=String(f),Error("Objects are not valid as a React child (found: "+(x==="[object Object]"?"object with keys {"+Object.keys(f).join(", ")+"}":x)+"). If you meant to render a collection of children, use an array instead.");return K}function pt(f,x,U){if(f==null)return f;var F=[],q=0;return nt(f,F,"","",function(J){return x.call(U,J,q++)}),F}function Ae(f){if(f._status===-1){var x=f._result;x=x(),x.then(function(U){(f._status===0||f._status===-1)&&(f._status=1,f._result=U)},function(U){(f._status===0||f._status===-1)&&(f._status=2,f._result=U)}),f._status===-1&&(f._status=0,f._result=x)}if(f._status===1)return f._result.default;throw f._result}var ue={current:null},N={transition:null},O={ReactCurrentDispatcher:ue,ReactCurrentBatchConfig:N,ReactCurrentOwner:Ee};function P(){throw Error("act(...) is not supported in production builds of React.")}return z.Children={map:pt,forEach:function(f,x,U){pt(f,function(){x.apply(this,arguments)},U)},count:function(f){var x=0;return pt(f,function(){x++}),x},toArray:function(f){return pt(f,function(x){return x})||[]},only:function(f){if(!vt(f))throw Error("React.Children.only expected to receive a single React element child.");return f}},z.Component=Q,z.Fragment=d,z.Profiler=C,z.PureComponent=ct,z.StrictMode=_,z.Suspense=L,z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=O,z.act=P,z.cloneElement=function(f,x,U){if(f==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+f+".");var F=Ge({},f.props),q=f.key,J=f.ref,K=f._owner;if(x!=null){if(x.ref!==void 0&&(J=x.ref,K=Ee.current),x.key!==void 0&&(q=""+x.key),f.type&&f.type.defaultProps)var H=f.type.defaultProps;for(re in x)tt.call(x,re)&&!_e.hasOwnProperty(re)&&(F[re]=x[re]===void 0&&H!==void 0?H[re]:x[re])}var re=arguments.length-2;if(re===1)F.children=U;else if(1<re){H=Array(re);for(var ze=0;ze<re;ze++)H[ze]=arguments[ze+2];F.children=H}return{$$typeof:c,type:f.type,key:q,ref:J,props:F,_owner:K}},z.createContext=function(f){return f={$$typeof:$,_currentValue:f,_currentValue2:f,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},f.Provider={$$typeof:b,_context:f},f.Consumer=f},z.createElement=He,z.createFactory=function(f){var x=He.bind(null,f);return x.type=f,x},z.createRef=function(){return{current:null}},z.forwardRef=function(f){return{$$typeof:R,render:f}},z.isValidElement=vt,z.lazy=function(f){return{$$typeof:he,_payload:{_status:-1,_result:f},_init:Ae}},z.memo=function(f,x){return{$$typeof:G,type:f,compare:x===void 0?null:x}},z.startTransition=function(f){var x=N.transition;N.transition={};try{f()}finally{N.transition=x}},z.unstable_act=P,z.useCallback=function(f,x){return ue.current.useCallback(f,x)},z.useContext=function(f){return ue.current.useContext(f)},z.useDebugValue=function(){},z.useDeferredValue=function(f){return ue.current.useDeferredValue(f)},z.useEffect=function(f,x){return ue.current.useEffect(f,x)},z.useId=function(){return ue.current.useId()},z.useImperativeHandle=function(f,x,U){return ue.current.useImperativeHandle(f,x,U)},z.useInsertionEffect=function(f,x){return ue.current.useInsertionEffect(f,x)},z.useLayoutEffect=function(f,x){return ue.current.useLayoutEffect(f,x)},z.useMemo=function(f,x){return ue.current.useMemo(f,x)},z.useReducer=function(f,x,U){return ue.current.useReducer(f,x,U)},z.useRef=function(f){return ue.current.useRef(f)},z.useState=function(f){return ue.current.useState(f)},z.useSyncExternalStore=function(f,x,U){return ue.current.useSyncExternalStore(f,x,U)},z.useTransition=function(){return ue.current.useTransition()},z.version="18.3.1",z}var Du;function Da(){return Du||(Du=1,Ia.exports=Yd()),Ia.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Bu;function Qd(){if(Bu)return kr;Bu=1;var c=Da(),k=Symbol.for("react.element"),d=Symbol.for("react.fragment"),_=Object.prototype.hasOwnProperty,C=c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,b={key:!0,ref:!0,__self:!0,__source:!0};function $(R,L,G){var he,le={},te=null,We=null;G!==void 0&&(te=""+G),L.key!==void 0&&(te=""+L.key),L.ref!==void 0&&(We=L.ref);for(he in L)_.call(L,he)&&!b.hasOwnProperty(he)&&(le[he]=L[he]);if(R&&R.defaultProps)for(he in L=R.defaultProps,L)le[he]===void 0&&(le[he]=L[he]);return{$$typeof:k,type:R,key:te,ref:We,props:le,_owner:C.current}}return kr.Fragment=d,kr.jsx=$,kr.jsxs=$,kr}var Ou;function $d(){return Ou||(Ou=1,Ta.exports=Qd()),Ta.exports}var a=$d(),Ie=Da();const Kd=Hu(Ie);var Do={},_a={exports:{}},Me={},Aa={exports:{}},Ra={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Lu;function Xd(){return Lu||(Lu=1,(function(c){function k(N,O){var P=N.length;N.push(O);e:for(;0<P;){var f=P-1>>>1,x=N[f];if(0<C(x,O))N[f]=O,N[P]=x,P=f;else break e}}function d(N){return N.length===0?null:N[0]}function _(N){if(N.length===0)return null;var O=N[0],P=N.pop();if(P!==O){N[0]=P;e:for(var f=0,x=N.length,U=x>>>1;f<U;){var F=2*(f+1)-1,q=N[F],J=F+1,K=N[J];if(0>C(q,P))J<x&&0>C(K,q)?(N[f]=K,N[J]=P,f=J):(N[f]=q,N[F]=P,f=F);else if(J<x&&0>C(K,P))N[f]=K,N[J]=P,f=J;else break e}}return O}function C(N,O){var P=N.sortIndex-O.sortIndex;return P!==0?P:N.id-O.id}if(typeof performance=="object"&&typeof performance.now=="function"){var b=performance;c.unstable_now=function(){return b.now()}}else{var $=Date,R=$.now();c.unstable_now=function(){return $.now()-R}}var L=[],G=[],he=1,le=null,te=3,We=!1,Ge=!1,ne=!1,Q=typeof setTimeout=="function"?setTimeout:null,xt=typeof clearTimeout=="function"?clearTimeout:null,ct=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function et(N){for(var O=d(G);O!==null;){if(O.callback===null)_(G);else if(O.startTime<=N)_(G),O.sortIndex=O.expirationTime,k(L,O);else break;O=d(G)}}function Se(N){if(ne=!1,et(N),!Ge)if(d(L)!==null)Ge=!0,Ae(tt);else{var O=d(G);O!==null&&ue(Se,O.startTime-N)}}function tt(N,O){Ge=!1,ne&&(ne=!1,xt(He),He=-1),We=!0;var P=te;try{for(et(O),le=d(L);le!==null&&(!(le.expirationTime>O)||N&&!Qt());){var f=le.callback;if(typeof f=="function"){le.callback=null,te=le.priorityLevel;var x=f(le.expirationTime<=O);O=c.unstable_now(),typeof x=="function"?le.callback=x:le===d(L)&&_(L),et(O)}else _(L);le=d(L)}if(le!==null)var U=!0;else{var F=d(G);F!==null&&ue(Se,F.startTime-O),U=!1}return U}finally{le=null,te=P,We=!1}}var Ee=!1,_e=null,He=-1,Pt=5,vt=-1;function Qt(){return!(c.unstable_now()-vt<Pt)}function dt(){if(_e!==null){var N=c.unstable_now();vt=N;var O=!0;try{O=_e(!0,N)}finally{O?Ue():(Ee=!1,_e=null)}}else Ee=!1}var Ue;if(typeof ct=="function")Ue=function(){ct(dt)};else if(typeof MessageChannel<"u"){var nt=new MessageChannel,pt=nt.port2;nt.port1.onmessage=dt,Ue=function(){pt.postMessage(null)}}else Ue=function(){Q(dt,0)};function Ae(N){_e=N,Ee||(Ee=!0,Ue())}function ue(N,O){He=Q(function(){N(c.unstable_now())},O)}c.unstable_IdlePriority=5,c.unstable_ImmediatePriority=1,c.unstable_LowPriority=4,c.unstable_NormalPriority=3,c.unstable_Profiling=null,c.unstable_UserBlockingPriority=2,c.unstable_cancelCallback=function(N){N.callback=null},c.unstable_continueExecution=function(){Ge||We||(Ge=!0,Ae(tt))},c.unstable_forceFrameRate=function(N){0>N||125<N?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Pt=0<N?Math.floor(1e3/N):5},c.unstable_getCurrentPriorityLevel=function(){return te},c.unstable_getFirstCallbackNode=function(){return d(L)},c.unstable_next=function(N){switch(te){case 1:case 2:case 3:var O=3;break;default:O=te}var P=te;te=O;try{return N()}finally{te=P}},c.unstable_pauseExecution=function(){},c.unstable_requestPaint=function(){},c.unstable_runWithPriority=function(N,O){switch(N){case 1:case 2:case 3:case 4:case 5:break;default:N=3}var P=te;te=N;try{return O()}finally{te=P}},c.unstable_scheduleCallback=function(N,O,P){var f=c.unstable_now();switch(typeof P=="object"&&P!==null?(P=P.delay,P=typeof P=="number"&&0<P?f+P:f):P=f,N){case 1:var x=-1;break;case 2:x=250;break;case 5:x=1073741823;break;case 4:x=1e4;break;default:x=5e3}return x=P+x,N={id:he++,callback:O,priorityLevel:N,startTime:P,expirationTime:x,sortIndex:-1},P>f?(N.sortIndex=P,k(G,N),d(L)===null&&N===d(G)&&(ne?(xt(He),He=-1):ne=!0,ue(Se,P-f))):(N.sortIndex=x,k(L,N),Ge||We||(Ge=!0,Ae(tt))),N},c.unstable_shouldYield=Qt,c.unstable_wrapCallback=function(N){var O=te;return function(){var P=te;te=O;try{return N.apply(this,arguments)}finally{te=P}}}})(Ra)),Ra}var Mu;function Zd(){return Mu||(Mu=1,Aa.exports=Xd()),Aa.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Uu;function ep(){if(Uu)return Me;Uu=1;var c=Da(),k=Zd();function d(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var _=new Set,C={};function b(e,t){$(e,t),$(e+"Capture",t)}function $(e,t){for(C[e]=t,e=0;e<t.length;e++)_.add(t[e])}var R=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),L=Object.prototype.hasOwnProperty,G=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,he={},le={};function te(e){return L.call(le,e)?!0:L.call(he,e)?!1:G.test(e)?le[e]=!0:(he[e]=!0,!1)}function We(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Ge(e,t,n,r){if(t===null||typeof t>"u"||We(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function ne(e,t,n,r,o,l,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=l,this.removeEmptyString=i}var Q={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Q[e]=new ne(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Q[t]=new ne(t,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){Q[e]=new ne(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Q[e]=new ne(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Q[e]=new ne(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){Q[e]=new ne(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){Q[e]=new ne(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){Q[e]=new ne(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){Q[e]=new ne(e,5,!1,e.toLowerCase(),null,!1,!1)});var xt=/[\-:]([a-z])/g;function ct(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(xt,ct);Q[t]=new ne(t,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(xt,ct);Q[t]=new ne(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(xt,ct);Q[t]=new ne(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){Q[e]=new ne(e,1,!1,e.toLowerCase(),null,!1,!1)}),Q.xlinkHref=new ne("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){Q[e]=new ne(e,1,!1,e.toLowerCase(),null,!0,!0)});function et(e,t,n,r){var o=Q.hasOwnProperty(t)?Q[t]:null;(o!==null?o.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Ge(t,n,o,r)&&(n=null),r||o===null?te(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):o.mustUseProperty?e[o.propertyName]=n===null?o.type===3?!1:"":n:(t=o.attributeName,r=o.attributeNamespace,n===null?e.removeAttribute(t):(o=o.type,n=o===3||o===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Se=c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,tt=Symbol.for("react.element"),Ee=Symbol.for("react.portal"),_e=Symbol.for("react.fragment"),He=Symbol.for("react.strict_mode"),Pt=Symbol.for("react.profiler"),vt=Symbol.for("react.provider"),Qt=Symbol.for("react.context"),dt=Symbol.for("react.forward_ref"),Ue=Symbol.for("react.suspense"),nt=Symbol.for("react.suspense_list"),pt=Symbol.for("react.memo"),Ae=Symbol.for("react.lazy"),ue=Symbol.for("react.offscreen"),N=Symbol.iterator;function O(e){return e===null||typeof e!="object"?null:(e=N&&e[N]||e["@@iterator"],typeof e=="function"?e:null)}var P=Object.assign,f;function x(e){if(f===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);f=t&&t[1]||""}return`
`+f+e}var U=!1;function F(e,t){if(!e||U)return"";U=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(h){var r=h}Reflect.construct(e,[],t)}else{try{t.call()}catch(h){r=h}e.call(t.prototype)}else{try{throw Error()}catch(h){r=h}e()}}catch(h){if(h&&r&&typeof h.stack=="string"){for(var o=h.stack.split(`
`),l=r.stack.split(`
`),i=o.length-1,s=l.length-1;1<=i&&0<=s&&o[i]!==l[s];)s--;for(;1<=i&&0<=s;i--,s--)if(o[i]!==l[s]){if(i!==1||s!==1)do if(i--,s--,0>s||o[i]!==l[s]){var u=`
`+o[i].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=i&&0<=s);break}}}finally{U=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?x(e):""}function q(e){switch(e.tag){case 5:return x(e.type);case 16:return x("Lazy");case 13:return x("Suspense");case 19:return x("SuspenseList");case 0:case 2:case 15:return e=F(e.type,!1),e;case 11:return e=F(e.type.render,!1),e;case 1:return e=F(e.type,!0),e;default:return""}}function J(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case _e:return"Fragment";case Ee:return"Portal";case Pt:return"Profiler";case He:return"StrictMode";case Ue:return"Suspense";case nt:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Qt:return(e.displayName||"Context")+".Consumer";case vt:return(e._context.displayName||"Context")+".Provider";case dt:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case pt:return t=e.displayName||null,t!==null?t:J(e.type)||"Memo";case Ae:t=e._payload,e=e._init;try{return J(e(t))}catch{}}return null}function K(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return J(t);case 8:return t===He?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function H(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function re(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function ze(e){var t=re(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var o=n.get,l=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(i){r=""+i,l.call(this,i)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(i){r=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function br(e){e._valueTracker||(e._valueTracker=ze(e))}function Ua(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=re(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Cr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Oo(e,t){var n=t.checked;return P({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function za(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=H(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Fa(e,t){t=t.checked,t!=null&&et(e,"checked",t,!1)}function Lo(e,t){Fa(e,t);var n=H(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Mo(e,t.type,n):t.hasOwnProperty("defaultValue")&&Mo(e,t.type,H(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Va(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Mo(e,t,n){(t!=="number"||Cr(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Bn=Array.isArray;function cn(e,t,n,r){if(e=e.options,t){t={};for(var o=0;o<n.length;o++)t["$"+n[o]]=!0;for(n=0;n<e.length;n++)o=t.hasOwnProperty("$"+e[n].value),e[n].selected!==o&&(e[n].selected=o),o&&r&&(e[n].defaultSelected=!0)}else{for(n=""+H(n),t=null,o=0;o<e.length;o++){if(e[o].value===n){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function Uo(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(d(91));return P({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function qa(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(d(92));if(Bn(n)){if(1<n.length)throw Error(d(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:H(n)}}function Ja(e,t){var n=H(t.value),r=H(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Wa(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Ga(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function zo(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Ga(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Nr,Ha=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,o){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,o)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Nr=Nr||document.createElement("div"),Nr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Nr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function On(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Ln={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Xu=["Webkit","ms","Moz","O"];Object.keys(Ln).forEach(function(e){Xu.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Ln[t]=Ln[e]})});function Ya(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Ln.hasOwnProperty(e)&&Ln[e]?(""+t).trim():t+"px"}function Qa(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,o=Ya(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,o):e[n]=o}}var Zu=P({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Fo(e,t){if(t){if(Zu[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(d(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(d(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(d(61))}if(t.style!=null&&typeof t.style!="object")throw Error(d(62))}}function Vo(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var qo=null;function Jo(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Wo=null,dn=null,pn=null;function $a(e){if(e=lr(e)){if(typeof Wo!="function")throw Error(d(280));var t=e.stateNode;t&&(t=Yr(t),Wo(e.stateNode,e.type,t))}}function Ka(e){dn?pn?pn.push(e):pn=[e]:dn=e}function Xa(){if(dn){var e=dn,t=pn;if(pn=dn=null,$a(e),t)for(e=0;e<t.length;e++)$a(t[e])}}function Za(e,t){return e(t)}function ei(){}var Go=!1;function ti(e,t,n){if(Go)return e(t,n);Go=!0;try{return Za(e,t,n)}finally{Go=!1,(dn!==null||pn!==null)&&(ei(),Xa())}}function Mn(e,t){var n=e.stateNode;if(n===null)return null;var r=Yr(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(d(231,t,typeof n));return n}var Ho=!1;if(R)try{var Un={};Object.defineProperty(Un,"passive",{get:function(){Ho=!0}}),window.addEventListener("test",Un,Un),window.removeEventListener("test",Un,Un)}catch{Ho=!1}function ec(e,t,n,r,o,l,i,s,u){var h=Array.prototype.slice.call(arguments,3);try{t.apply(n,h)}catch(v){this.onError(v)}}var zn=!1,jr=null,Er=!1,Yo=null,tc={onError:function(e){zn=!0,jr=e}};function nc(e,t,n,r,o,l,i,s,u){zn=!1,jr=null,ec.apply(tc,arguments)}function rc(e,t,n,r,o,l,i,s,u){if(nc.apply(this,arguments),zn){if(zn){var h=jr;zn=!1,jr=null}else throw Error(d(198));Er||(Er=!0,Yo=h)}}function $t(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function ni(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function ri(e){if($t(e)!==e)throw Error(d(188))}function oc(e){var t=e.alternate;if(!t){if(t=$t(e),t===null)throw Error(d(188));return t!==e?null:e}for(var n=e,r=t;;){var o=n.return;if(o===null)break;var l=o.alternate;if(l===null){if(r=o.return,r!==null){n=r;continue}break}if(o.child===l.child){for(l=o.child;l;){if(l===n)return ri(o),e;if(l===r)return ri(o),t;l=l.sibling}throw Error(d(188))}if(n.return!==r.return)n=o,r=l;else{for(var i=!1,s=o.child;s;){if(s===n){i=!0,n=o,r=l;break}if(s===r){i=!0,r=o,n=l;break}s=s.sibling}if(!i){for(s=l.child;s;){if(s===n){i=!0,n=l,r=o;break}if(s===r){i=!0,r=l,n=o;break}s=s.sibling}if(!i)throw Error(d(189))}}if(n.alternate!==r)throw Error(d(190))}if(n.tag!==3)throw Error(d(188));return n.stateNode.current===n?e:t}function oi(e){return e=oc(e),e!==null?li(e):null}function li(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=li(e);if(t!==null)return t;e=e.sibling}return null}var ai=k.unstable_scheduleCallback,ii=k.unstable_cancelCallback,lc=k.unstable_shouldYield,ac=k.unstable_requestPaint,de=k.unstable_now,ic=k.unstable_getCurrentPriorityLevel,Qo=k.unstable_ImmediatePriority,si=k.unstable_UserBlockingPriority,Pr=k.unstable_NormalPriority,sc=k.unstable_LowPriority,ui=k.unstable_IdlePriority,Tr=null,ft=null;function uc(e){if(ft&&typeof ft.onCommitFiberRoot=="function")try{ft.onCommitFiberRoot(Tr,e,void 0,(e.current.flags&128)===128)}catch{}}var rt=Math.clz32?Math.clz32:pc,cc=Math.log,dc=Math.LN2;function pc(e){return e>>>=0,e===0?32:31-(cc(e)/dc|0)|0}var Ir=64,_r=4194304;function Fn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Ar(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,o=e.suspendedLanes,l=e.pingedLanes,i=n&268435455;if(i!==0){var s=i&~o;s!==0?r=Fn(s):(l&=i,l!==0&&(r=Fn(l)))}else i=n&~o,i!==0?r=Fn(i):l!==0&&(r=Fn(l));if(r===0)return 0;if(t!==0&&t!==r&&(t&o)===0&&(o=r&-r,l=t&-t,o>=l||o===16&&(l&4194240)!==0))return t;if((r&4)!==0&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-rt(t),o=1<<n,r|=e[n],t&=~o;return r}function fc(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function mc(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,l=e.pendingLanes;0<l;){var i=31-rt(l),s=1<<i,u=o[i];u===-1?((s&n)===0||(s&r)!==0)&&(o[i]=fc(s,t)):u<=t&&(e.expiredLanes|=s),l&=~s}}function $o(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function ci(){var e=Ir;return Ir<<=1,(Ir&4194240)===0&&(Ir=64),e}function Ko(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Vn(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-rt(t),e[t]=n}function yc(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var o=31-rt(n),l=1<<o;t[o]=0,r[o]=-1,e[o]=-1,n&=~l}}function Xo(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-rt(n),o=1<<r;o&t|e[r]&t&&(e[r]|=t),n&=~o}}var Y=0;function di(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var pi,Zo,fi,mi,yi,el=!1,Rr=[],Tt=null,It=null,_t=null,qn=new Map,Jn=new Map,At=[],hc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function hi(e,t){switch(e){case"focusin":case"focusout":Tt=null;break;case"dragenter":case"dragleave":It=null;break;case"mouseover":case"mouseout":_t=null;break;case"pointerover":case"pointerout":qn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Jn.delete(t.pointerId)}}function Wn(e,t,n,r,o,l){return e===null||e.nativeEvent!==l?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:l,targetContainers:[o]},t!==null&&(t=lr(t),t!==null&&Zo(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function gc(e,t,n,r,o){switch(t){case"focusin":return Tt=Wn(Tt,e,t,n,r,o),!0;case"dragenter":return It=Wn(It,e,t,n,r,o),!0;case"mouseover":return _t=Wn(_t,e,t,n,r,o),!0;case"pointerover":var l=o.pointerId;return qn.set(l,Wn(qn.get(l)||null,e,t,n,r,o)),!0;case"gotpointercapture":return l=o.pointerId,Jn.set(l,Wn(Jn.get(l)||null,e,t,n,r,o)),!0}return!1}function gi(e){var t=Kt(e.target);if(t!==null){var n=$t(t);if(n!==null){if(t=n.tag,t===13){if(t=ni(n),t!==null){e.blockedOn=t,yi(e.priority,function(){fi(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=nl(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);qo=r,n.target.dispatchEvent(r),qo=null}else return t=lr(n),t!==null&&Zo(t),e.blockedOn=n,!1;t.shift()}return!0}function xi(e,t,n){Dr(e)&&n.delete(t)}function xc(){el=!1,Tt!==null&&Dr(Tt)&&(Tt=null),It!==null&&Dr(It)&&(It=null),_t!==null&&Dr(_t)&&(_t=null),qn.forEach(xi),Jn.forEach(xi)}function Gn(e,t){e.blockedOn===t&&(e.blockedOn=null,el||(el=!0,k.unstable_scheduleCallback(k.unstable_NormalPriority,xc)))}function Hn(e){function t(o){return Gn(o,e)}if(0<Rr.length){Gn(Rr[0],e);for(var n=1;n<Rr.length;n++){var r=Rr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Tt!==null&&Gn(Tt,e),It!==null&&Gn(It,e),_t!==null&&Gn(_t,e),qn.forEach(t),Jn.forEach(t),n=0;n<At.length;n++)r=At[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<At.length&&(n=At[0],n.blockedOn===null);)gi(n),n.blockedOn===null&&At.shift()}var fn=Se.ReactCurrentBatchConfig,Br=!0;function vc(e,t,n,r){var o=Y,l=fn.transition;fn.transition=null;try{Y=1,tl(e,t,n,r)}finally{Y=o,fn.transition=l}}function kc(e,t,n,r){var o=Y,l=fn.transition;fn.transition=null;try{Y=4,tl(e,t,n,r)}finally{Y=o,fn.transition=l}}function tl(e,t,n,r){if(Br){var o=nl(e,t,n,r);if(o===null)vl(e,t,r,Or,n),hi(e,r);else if(gc(o,e,t,n,r))r.stopPropagation();else if(hi(e,r),t&4&&-1<hc.indexOf(e)){for(;o!==null;){var l=lr(o);if(l!==null&&pi(l),l=nl(e,t,n,r),l===null&&vl(e,t,r,Or,n),l===o)break;o=l}o!==null&&r.stopPropagation()}else vl(e,t,r,null,n)}}var Or=null;function nl(e,t,n,r){if(Or=null,e=Jo(r),e=Kt(e),e!==null)if(t=$t(e),t===null)e=null;else if(n=t.tag,n===13){if(e=ni(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Or=e,null}function vi(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(ic()){case Qo:return 1;case si:return 4;case Pr:case sc:return 16;case ui:return 536870912;default:return 16}default:return 16}}var Rt=null,rl=null,Lr=null;function ki(){if(Lr)return Lr;var e,t=rl,n=t.length,r,o="value"in Rt?Rt.value:Rt.textContent,l=o.length;for(e=0;e<n&&t[e]===o[e];e++);var i=n-e;for(r=1;r<=i&&t[n-r]===o[l-r];r++);return Lr=o.slice(e,1<r?1-r:void 0)}function Mr(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ur(){return!0}function wi(){return!1}function Fe(e){function t(n,r,o,l,i){this._reactName=n,this._targetInst=o,this.type=r,this.nativeEvent=l,this.target=i,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(n=e[s],this[s]=n?n(l):l[s]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?Ur:wi,this.isPropagationStopped=wi,this}return P(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ur)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ur)},persist:function(){},isPersistent:Ur}),t}var mn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ol=Fe(mn),Yn=P({},mn,{view:0,detail:0}),wc=Fe(Yn),ll,al,Qn,zr=P({},Yn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:sl,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Qn&&(Qn&&e.type==="mousemove"?(ll=e.screenX-Qn.screenX,al=e.screenY-Qn.screenY):al=ll=0,Qn=e),ll)},movementY:function(e){return"movementY"in e?e.movementY:al}}),Si=Fe(zr),Sc=P({},zr,{dataTransfer:0}),bc=Fe(Sc),Cc=P({},Yn,{relatedTarget:0}),il=Fe(Cc),Nc=P({},mn,{animationName:0,elapsedTime:0,pseudoElement:0}),jc=Fe(Nc),Ec=P({},mn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Pc=Fe(Ec),Tc=P({},mn,{data:0}),bi=Fe(Tc),Ic={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},_c={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Ac={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Rc(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Ac[e])?!!t[e]:!1}function sl(){return Rc}var Dc=P({},Yn,{key:function(e){if(e.key){var t=Ic[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Mr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?_c[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:sl,charCode:function(e){return e.type==="keypress"?Mr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Mr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Bc=Fe(Dc),Oc=P({},zr,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ci=Fe(Oc),Lc=P({},Yn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:sl}),Mc=Fe(Lc),Uc=P({},mn,{propertyName:0,elapsedTime:0,pseudoElement:0}),zc=Fe(Uc),Fc=P({},zr,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Vc=Fe(Fc),qc=[9,13,27,32],ul=R&&"CompositionEvent"in window,$n=null;R&&"documentMode"in document&&($n=document.documentMode);var Jc=R&&"TextEvent"in window&&!$n,Ni=R&&(!ul||$n&&8<$n&&11>=$n),ji=" ",Ei=!1;function Pi(e,t){switch(e){case"keyup":return qc.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Ti(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var yn=!1;function Wc(e,t){switch(e){case"compositionend":return Ti(t);case"keypress":return t.which!==32?null:(Ei=!0,ji);case"textInput":return e=t.data,e===ji&&Ei?null:e;default:return null}}function Gc(e,t){if(yn)return e==="compositionend"||!ul&&Pi(e,t)?(e=ki(),Lr=rl=Rt=null,yn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Ni&&t.locale!=="ko"?null:t.data;default:return null}}var Hc={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ii(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Hc[e.type]:t==="textarea"}function _i(e,t,n,r){Ka(r),t=Wr(t,"onChange"),0<t.length&&(n=new ol("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Kn=null,Xn=null;function Yc(e){Qi(e,0)}function Fr(e){var t=kn(e);if(Ua(t))return e}function Qc(e,t){if(e==="change")return t}var Ai=!1;if(R){var cl;if(R){var dl="oninput"in document;if(!dl){var Ri=document.createElement("div");Ri.setAttribute("oninput","return;"),dl=typeof Ri.oninput=="function"}cl=dl}else cl=!1;Ai=cl&&(!document.documentMode||9<document.documentMode)}function Di(){Kn&&(Kn.detachEvent("onpropertychange",Bi),Xn=Kn=null)}function Bi(e){if(e.propertyName==="value"&&Fr(Xn)){var t=[];_i(t,Xn,e,Jo(e)),ti(Yc,t)}}function $c(e,t,n){e==="focusin"?(Di(),Kn=t,Xn=n,Kn.attachEvent("onpropertychange",Bi)):e==="focusout"&&Di()}function Kc(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Fr(Xn)}function Xc(e,t){if(e==="click")return Fr(t)}function Zc(e,t){if(e==="input"||e==="change")return Fr(t)}function ed(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var ot=typeof Object.is=="function"?Object.is:ed;function Zn(e,t){if(ot(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var o=n[r];if(!L.call(t,o)||!ot(e[o],t[o]))return!1}return!0}function Oi(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Li(e,t){var n=Oi(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Oi(n)}}function Mi(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Mi(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Ui(){for(var e=window,t=Cr();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Cr(e.document)}return t}function pl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function td(e){var t=Ui(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Mi(n.ownerDocument.documentElement,n)){if(r!==null&&pl(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var o=n.textContent.length,l=Math.min(r.start,o);r=r.end===void 0?l:Math.min(r.end,o),!e.extend&&l>r&&(o=r,r=l,l=o),o=Li(n,l);var i=Li(n,r);o&&i&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),e.removeAllRanges(),l>r?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var nd=R&&"documentMode"in document&&11>=document.documentMode,hn=null,fl=null,er=null,ml=!1;function zi(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ml||hn==null||hn!==Cr(r)||(r=hn,"selectionStart"in r&&pl(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),er&&Zn(er,r)||(er=r,r=Wr(fl,"onSelect"),0<r.length&&(t=new ol("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=hn)))}function Vr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var gn={animationend:Vr("Animation","AnimationEnd"),animationiteration:Vr("Animation","AnimationIteration"),animationstart:Vr("Animation","AnimationStart"),transitionend:Vr("Transition","TransitionEnd")},yl={},Fi={};R&&(Fi=document.createElement("div").style,"AnimationEvent"in window||(delete gn.animationend.animation,delete gn.animationiteration.animation,delete gn.animationstart.animation),"TransitionEvent"in window||delete gn.transitionend.transition);function qr(e){if(yl[e])return yl[e];if(!gn[e])return e;var t=gn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Fi)return yl[e]=t[n];return e}var Vi=qr("animationend"),qi=qr("animationiteration"),Ji=qr("animationstart"),Wi=qr("transitionend"),Gi=new Map,Hi="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Dt(e,t){Gi.set(e,t),b(t,[e])}for(var hl=0;hl<Hi.length;hl++){var gl=Hi[hl],rd=gl.toLowerCase(),od=gl[0].toUpperCase()+gl.slice(1);Dt(rd,"on"+od)}Dt(Vi,"onAnimationEnd"),Dt(qi,"onAnimationIteration"),Dt(Ji,"onAnimationStart"),Dt("dblclick","onDoubleClick"),Dt("focusin","onFocus"),Dt("focusout","onBlur"),Dt(Wi,"onTransitionEnd"),$("onMouseEnter",["mouseout","mouseover"]),$("onMouseLeave",["mouseout","mouseover"]),$("onPointerEnter",["pointerout","pointerover"]),$("onPointerLeave",["pointerout","pointerover"]),b("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),b("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),b("onBeforeInput",["compositionend","keypress","textInput","paste"]),b("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),b("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),b("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var tr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),ld=new Set("cancel close invalid load scroll toggle".split(" ").concat(tr));function Yi(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,rc(r,t,void 0,e),e.currentTarget=null}function Qi(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],o=r.event;r=r.listeners;e:{var l=void 0;if(t)for(var i=r.length-1;0<=i;i--){var s=r[i],u=s.instance,h=s.currentTarget;if(s=s.listener,u!==l&&o.isPropagationStopped())break e;Yi(o,s,h),l=u}else for(i=0;i<r.length;i++){if(s=r[i],u=s.instance,h=s.currentTarget,s=s.listener,u!==l&&o.isPropagationStopped())break e;Yi(o,s,h),l=u}}}if(Er)throw e=Yo,Er=!1,Yo=null,e}function Z(e,t){var n=t[Nl];n===void 0&&(n=t[Nl]=new Set);var r=e+"__bubble";n.has(r)||($i(t,e,2,!1),n.add(r))}function xl(e,t,n){var r=0;t&&(r|=4),$i(n,e,r,t)}var Jr="_reactListening"+Math.random().toString(36).slice(2);function nr(e){if(!e[Jr]){e[Jr]=!0,_.forEach(function(n){n!=="selectionchange"&&(ld.has(n)||xl(n,!1,e),xl(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Jr]||(t[Jr]=!0,xl("selectionchange",!1,t))}}function $i(e,t,n,r){switch(vi(t)){case 1:var o=vc;break;case 4:o=kc;break;default:o=tl}n=o.bind(null,t,n,e),o=void 0,!Ho||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(t,n,{capture:!0,passive:o}):e.addEventListener(t,n,!0):o!==void 0?e.addEventListener(t,n,{passive:o}):e.addEventListener(t,n,!1)}function vl(e,t,n,r,o){var l=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var i=r.tag;if(i===3||i===4){var s=r.stateNode.containerInfo;if(s===o||s.nodeType===8&&s.parentNode===o)break;if(i===4)for(i=r.return;i!==null;){var u=i.tag;if((u===3||u===4)&&(u=i.stateNode.containerInfo,u===o||u.nodeType===8&&u.parentNode===o))return;i=i.return}for(;s!==null;){if(i=Kt(s),i===null)return;if(u=i.tag,u===5||u===6){r=l=i;continue e}s=s.parentNode}}r=r.return}ti(function(){var h=l,v=Jo(n),w=[];e:{var g=Gi.get(e);if(g!==void 0){var j=ol,T=e;switch(e){case"keypress":if(Mr(n)===0)break e;case"keydown":case"keyup":j=Bc;break;case"focusin":T="focus",j=il;break;case"focusout":T="blur",j=il;break;case"beforeblur":case"afterblur":j=il;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":j=Si;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":j=bc;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":j=Mc;break;case Vi:case qi:case Ji:j=jc;break;case Wi:j=zc;break;case"scroll":j=wc;break;case"wheel":j=Vc;break;case"copy":case"cut":case"paste":j=Pc;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":j=Ci}var I=(t&4)!==0,pe=!I&&e==="scroll",m=I?g!==null?g+"Capture":null:g;I=[];for(var p=h,y;p!==null;){y=p;var S=y.stateNode;if(y.tag===5&&S!==null&&(y=S,m!==null&&(S=Mn(p,m),S!=null&&I.push(rr(p,S,y)))),pe)break;p=p.return}0<I.length&&(g=new j(g,T,null,n,v),w.push({event:g,listeners:I}))}}if((t&7)===0){e:{if(g=e==="mouseover"||e==="pointerover",j=e==="mouseout"||e==="pointerout",g&&n!==qo&&(T=n.relatedTarget||n.fromElement)&&(Kt(T)||T[kt]))break e;if((j||g)&&(g=v.window===v?v:(g=v.ownerDocument)?g.defaultView||g.parentWindow:window,j?(T=n.relatedTarget||n.toElement,j=h,T=T?Kt(T):null,T!==null&&(pe=$t(T),T!==pe||T.tag!==5&&T.tag!==6)&&(T=null)):(j=null,T=h),j!==T)){if(I=Si,S="onMouseLeave",m="onMouseEnter",p="mouse",(e==="pointerout"||e==="pointerover")&&(I=Ci,S="onPointerLeave",m="onPointerEnter",p="pointer"),pe=j==null?g:kn(j),y=T==null?g:kn(T),g=new I(S,p+"leave",j,n,v),g.target=pe,g.relatedTarget=y,S=null,Kt(v)===h&&(I=new I(m,p+"enter",T,n,v),I.target=y,I.relatedTarget=pe,S=I),pe=S,j&&T)t:{for(I=j,m=T,p=0,y=I;y;y=xn(y))p++;for(y=0,S=m;S;S=xn(S))y++;for(;0<p-y;)I=xn(I),p--;for(;0<y-p;)m=xn(m),y--;for(;p--;){if(I===m||m!==null&&I===m.alternate)break t;I=xn(I),m=xn(m)}I=null}else I=null;j!==null&&Ki(w,g,j,I,!1),T!==null&&pe!==null&&Ki(w,pe,T,I,!0)}}e:{if(g=h?kn(h):window,j=g.nodeName&&g.nodeName.toLowerCase(),j==="select"||j==="input"&&g.type==="file")var A=Qc;else if(Ii(g))if(Ai)A=Zc;else{A=Kc;var D=$c}else(j=g.nodeName)&&j.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(A=Xc);if(A&&(A=A(e,h))){_i(w,A,n,v);break e}D&&D(e,g,h),e==="focusout"&&(D=g._wrapperState)&&D.controlled&&g.type==="number"&&Mo(g,"number",g.value)}switch(D=h?kn(h):window,e){case"focusin":(Ii(D)||D.contentEditable==="true")&&(hn=D,fl=h,er=null);break;case"focusout":er=fl=hn=null;break;case"mousedown":ml=!0;break;case"contextmenu":case"mouseup":case"dragend":ml=!1,zi(w,n,v);break;case"selectionchange":if(nd)break;case"keydown":case"keyup":zi(w,n,v)}var B;if(ul)e:{switch(e){case"compositionstart":var M="onCompositionStart";break e;case"compositionend":M="onCompositionEnd";break e;case"compositionupdate":M="onCompositionUpdate";break e}M=void 0}else yn?Pi(e,n)&&(M="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(M="onCompositionStart");M&&(Ni&&n.locale!=="ko"&&(yn||M!=="onCompositionStart"?M==="onCompositionEnd"&&yn&&(B=ki()):(Rt=v,rl="value"in Rt?Rt.value:Rt.textContent,yn=!0)),D=Wr(h,M),0<D.length&&(M=new bi(M,e,null,n,v),w.push({event:M,listeners:D}),B?M.data=B:(B=Ti(n),B!==null&&(M.data=B)))),(B=Jc?Wc(e,n):Gc(e,n))&&(h=Wr(h,"onBeforeInput"),0<h.length&&(v=new bi("onBeforeInput","beforeinput",null,n,v),w.push({event:v,listeners:h}),v.data=B))}Qi(w,t)})}function rr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Wr(e,t){for(var n=t+"Capture",r=[];e!==null;){var o=e,l=o.stateNode;o.tag===5&&l!==null&&(o=l,l=Mn(e,n),l!=null&&r.unshift(rr(e,l,o)),l=Mn(e,t),l!=null&&r.push(rr(e,l,o))),e=e.return}return r}function xn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Ki(e,t,n,r,o){for(var l=t._reactName,i=[];n!==null&&n!==r;){var s=n,u=s.alternate,h=s.stateNode;if(u!==null&&u===r)break;s.tag===5&&h!==null&&(s=h,o?(u=Mn(n,l),u!=null&&i.unshift(rr(n,u,s))):o||(u=Mn(n,l),u!=null&&i.push(rr(n,u,s)))),n=n.return}i.length!==0&&e.push({event:t,listeners:i})}var ad=/\r\n?/g,id=/\u0000|\uFFFD/g;function Xi(e){return(typeof e=="string"?e:""+e).replace(ad,`
`).replace(id,"")}function Gr(e,t,n){if(t=Xi(t),Xi(e)!==t&&n)throw Error(d(425))}function Hr(){}var kl=null,wl=null;function Sl(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var bl=typeof setTimeout=="function"?setTimeout:void 0,sd=typeof clearTimeout=="function"?clearTimeout:void 0,Zi=typeof Promise=="function"?Promise:void 0,ud=typeof queueMicrotask=="function"?queueMicrotask:typeof Zi<"u"?function(e){return Zi.resolve(null).then(e).catch(cd)}:bl;function cd(e){setTimeout(function(){throw e})}function Cl(e,t){var n=t,r=0;do{var o=n.nextSibling;if(e.removeChild(n),o&&o.nodeType===8)if(n=o.data,n==="/$"){if(r===0){e.removeChild(o),Hn(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=o}while(n);Hn(t)}function Bt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function es(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var vn=Math.random().toString(36).slice(2),mt="__reactFiber$"+vn,or="__reactProps$"+vn,kt="__reactContainer$"+vn,Nl="__reactEvents$"+vn,dd="__reactListeners$"+vn,pd="__reactHandles$"+vn;function Kt(e){var t=e[mt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[kt]||n[mt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=es(e);e!==null;){if(n=e[mt])return n;e=es(e)}return t}e=n,n=e.parentNode}return null}function lr(e){return e=e[mt]||e[kt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function kn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(d(33))}function Yr(e){return e[or]||null}var jl=[],wn=-1;function Ot(e){return{current:e}}function ee(e){0>wn||(e.current=jl[wn],jl[wn]=null,wn--)}function X(e,t){wn++,jl[wn]=e.current,e.current=t}var Lt={},be=Ot(Lt),Re=Ot(!1),Xt=Lt;function Sn(e,t){var n=e.type.contextTypes;if(!n)return Lt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var o={},l;for(l in n)o[l]=t[l];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function De(e){return e=e.childContextTypes,e!=null}function Qr(){ee(Re),ee(be)}function ts(e,t,n){if(be.current!==Lt)throw Error(d(168));X(be,t),X(Re,n)}function ns(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var o in r)if(!(o in t))throw Error(d(108,K(e)||"Unknown",o));return P({},n,r)}function $r(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Lt,Xt=be.current,X(be,e),X(Re,Re.current),!0}function rs(e,t,n){var r=e.stateNode;if(!r)throw Error(d(169));n?(e=ns(e,t,Xt),r.__reactInternalMemoizedMergedChildContext=e,ee(Re),ee(be),X(be,e)):ee(Re),X(Re,n)}var wt=null,Kr=!1,El=!1;function os(e){wt===null?wt=[e]:wt.push(e)}function fd(e){Kr=!0,os(e)}function Mt(){if(!El&&wt!==null){El=!0;var e=0,t=Y;try{var n=wt;for(Y=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}wt=null,Kr=!1}catch(o){throw wt!==null&&(wt=wt.slice(e+1)),ai(Qo,Mt),o}finally{Y=t,El=!1}}return null}var bn=[],Cn=0,Xr=null,Zr=0,Ye=[],Qe=0,Zt=null,St=1,bt="";function en(e,t){bn[Cn++]=Zr,bn[Cn++]=Xr,Xr=e,Zr=t}function ls(e,t,n){Ye[Qe++]=St,Ye[Qe++]=bt,Ye[Qe++]=Zt,Zt=e;var r=St;e=bt;var o=32-rt(r)-1;r&=~(1<<o),n+=1;var l=32-rt(t)+o;if(30<l){var i=o-o%5;l=(r&(1<<i)-1).toString(32),r>>=i,o-=i,St=1<<32-rt(t)+o|n<<o|r,bt=l+e}else St=1<<l|n<<o|r,bt=e}function Pl(e){e.return!==null&&(en(e,1),ls(e,1,0))}function Tl(e){for(;e===Xr;)Xr=bn[--Cn],bn[Cn]=null,Zr=bn[--Cn],bn[Cn]=null;for(;e===Zt;)Zt=Ye[--Qe],Ye[Qe]=null,bt=Ye[--Qe],Ye[Qe]=null,St=Ye[--Qe],Ye[Qe]=null}var Ve=null,qe=null,oe=!1,lt=null;function as(e,t){var n=Ze(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function is(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ve=e,qe=Bt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ve=e,qe=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Zt!==null?{id:St,overflow:bt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Ze(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Ve=e,qe=null,!0):!1;default:return!1}}function Il(e){return(e.mode&1)!==0&&(e.flags&128)===0}function _l(e){if(oe){var t=qe;if(t){var n=t;if(!is(e,t)){if(Il(e))throw Error(d(418));t=Bt(n.nextSibling);var r=Ve;t&&is(e,t)?as(r,n):(e.flags=e.flags&-4097|2,oe=!1,Ve=e)}}else{if(Il(e))throw Error(d(418));e.flags=e.flags&-4097|2,oe=!1,Ve=e}}}function ss(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ve=e}function eo(e){if(e!==Ve)return!1;if(!oe)return ss(e),oe=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Sl(e.type,e.memoizedProps)),t&&(t=qe)){if(Il(e))throw us(),Error(d(418));for(;t;)as(e,t),t=Bt(t.nextSibling)}if(ss(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(d(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){qe=Bt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}qe=null}}else qe=Ve?Bt(e.stateNode.nextSibling):null;return!0}function us(){for(var e=qe;e;)e=Bt(e.nextSibling)}function Nn(){qe=Ve=null,oe=!1}function Al(e){lt===null?lt=[e]:lt.push(e)}var md=Se.ReactCurrentBatchConfig;function ar(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(d(309));var r=n.stateNode}if(!r)throw Error(d(147,e));var o=r,l=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===l?t.ref:(t=function(i){var s=o.refs;i===null?delete s[l]:s[l]=i},t._stringRef=l,t)}if(typeof e!="string")throw Error(d(284));if(!n._owner)throw Error(d(290,e))}return e}function to(e,t){throw e=Object.prototype.toString.call(t),Error(d(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function cs(e){var t=e._init;return t(e._payload)}function ds(e){function t(m,p){if(e){var y=m.deletions;y===null?(m.deletions=[p],m.flags|=16):y.push(p)}}function n(m,p){if(!e)return null;for(;p!==null;)t(m,p),p=p.sibling;return null}function r(m,p){for(m=new Map;p!==null;)p.key!==null?m.set(p.key,p):m.set(p.index,p),p=p.sibling;return m}function o(m,p){return m=Gt(m,p),m.index=0,m.sibling=null,m}function l(m,p,y){return m.index=y,e?(y=m.alternate,y!==null?(y=y.index,y<p?(m.flags|=2,p):y):(m.flags|=2,p)):(m.flags|=1048576,p)}function i(m){return e&&m.alternate===null&&(m.flags|=2),m}function s(m,p,y,S){return p===null||p.tag!==6?(p=ba(y,m.mode,S),p.return=m,p):(p=o(p,y),p.return=m,p)}function u(m,p,y,S){var A=y.type;return A===_e?v(m,p,y.props.children,S,y.key):p!==null&&(p.elementType===A||typeof A=="object"&&A!==null&&A.$$typeof===Ae&&cs(A)===p.type)?(S=o(p,y.props),S.ref=ar(m,p,y),S.return=m,S):(S=jo(y.type,y.key,y.props,null,m.mode,S),S.ref=ar(m,p,y),S.return=m,S)}function h(m,p,y,S){return p===null||p.tag!==4||p.stateNode.containerInfo!==y.containerInfo||p.stateNode.implementation!==y.implementation?(p=Ca(y,m.mode,S),p.return=m,p):(p=o(p,y.children||[]),p.return=m,p)}function v(m,p,y,S,A){return p===null||p.tag!==7?(p=un(y,m.mode,S,A),p.return=m,p):(p=o(p,y),p.return=m,p)}function w(m,p,y){if(typeof p=="string"&&p!==""||typeof p=="number")return p=ba(""+p,m.mode,y),p.return=m,p;if(typeof p=="object"&&p!==null){switch(p.$$typeof){case tt:return y=jo(p.type,p.key,p.props,null,m.mode,y),y.ref=ar(m,null,p),y.return=m,y;case Ee:return p=Ca(p,m.mode,y),p.return=m,p;case Ae:var S=p._init;return w(m,S(p._payload),y)}if(Bn(p)||O(p))return p=un(p,m.mode,y,null),p.return=m,p;to(m,p)}return null}function g(m,p,y,S){var A=p!==null?p.key:null;if(typeof y=="string"&&y!==""||typeof y=="number")return A!==null?null:s(m,p,""+y,S);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case tt:return y.key===A?u(m,p,y,S):null;case Ee:return y.key===A?h(m,p,y,S):null;case Ae:return A=y._init,g(m,p,A(y._payload),S)}if(Bn(y)||O(y))return A!==null?null:v(m,p,y,S,null);to(m,y)}return null}function j(m,p,y,S,A){if(typeof S=="string"&&S!==""||typeof S=="number")return m=m.get(y)||null,s(p,m,""+S,A);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case tt:return m=m.get(S.key===null?y:S.key)||null,u(p,m,S,A);case Ee:return m=m.get(S.key===null?y:S.key)||null,h(p,m,S,A);case Ae:var D=S._init;return j(m,p,y,D(S._payload),A)}if(Bn(S)||O(S))return m=m.get(y)||null,v(p,m,S,A,null);to(p,S)}return null}function T(m,p,y,S){for(var A=null,D=null,B=p,M=p=0,ve=null;B!==null&&M<y.length;M++){B.index>M?(ve=B,B=null):ve=B.sibling;var W=g(m,B,y[M],S);if(W===null){B===null&&(B=ve);break}e&&B&&W.alternate===null&&t(m,B),p=l(W,p,M),D===null?A=W:D.sibling=W,D=W,B=ve}if(M===y.length)return n(m,B),oe&&en(m,M),A;if(B===null){for(;M<y.length;M++)B=w(m,y[M],S),B!==null&&(p=l(B,p,M),D===null?A=B:D.sibling=B,D=B);return oe&&en(m,M),A}for(B=r(m,B);M<y.length;M++)ve=j(B,m,M,y[M],S),ve!==null&&(e&&ve.alternate!==null&&B.delete(ve.key===null?M:ve.key),p=l(ve,p,M),D===null?A=ve:D.sibling=ve,D=ve);return e&&B.forEach(function(Ht){return t(m,Ht)}),oe&&en(m,M),A}function I(m,p,y,S){var A=O(y);if(typeof A!="function")throw Error(d(150));if(y=A.call(y),y==null)throw Error(d(151));for(var D=A=null,B=p,M=p=0,ve=null,W=y.next();B!==null&&!W.done;M++,W=y.next()){B.index>M?(ve=B,B=null):ve=B.sibling;var Ht=g(m,B,W.value,S);if(Ht===null){B===null&&(B=ve);break}e&&B&&Ht.alternate===null&&t(m,B),p=l(Ht,p,M),D===null?A=Ht:D.sibling=Ht,D=Ht,B=ve}if(W.done)return n(m,B),oe&&en(m,M),A;if(B===null){for(;!W.done;M++,W=y.next())W=w(m,W.value,S),W!==null&&(p=l(W,p,M),D===null?A=W:D.sibling=W,D=W);return oe&&en(m,M),A}for(B=r(m,B);!W.done;M++,W=y.next())W=j(B,m,M,W.value,S),W!==null&&(e&&W.alternate!==null&&B.delete(W.key===null?M:W.key),p=l(W,p,M),D===null?A=W:D.sibling=W,D=W);return e&&B.forEach(function(Hd){return t(m,Hd)}),oe&&en(m,M),A}function pe(m,p,y,S){if(typeof y=="object"&&y!==null&&y.type===_e&&y.key===null&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case tt:e:{for(var A=y.key,D=p;D!==null;){if(D.key===A){if(A=y.type,A===_e){if(D.tag===7){n(m,D.sibling),p=o(D,y.props.children),p.return=m,m=p;break e}}else if(D.elementType===A||typeof A=="object"&&A!==null&&A.$$typeof===Ae&&cs(A)===D.type){n(m,D.sibling),p=o(D,y.props),p.ref=ar(m,D,y),p.return=m,m=p;break e}n(m,D);break}else t(m,D);D=D.sibling}y.type===_e?(p=un(y.props.children,m.mode,S,y.key),p.return=m,m=p):(S=jo(y.type,y.key,y.props,null,m.mode,S),S.ref=ar(m,p,y),S.return=m,m=S)}return i(m);case Ee:e:{for(D=y.key;p!==null;){if(p.key===D)if(p.tag===4&&p.stateNode.containerInfo===y.containerInfo&&p.stateNode.implementation===y.implementation){n(m,p.sibling),p=o(p,y.children||[]),p.return=m,m=p;break e}else{n(m,p);break}else t(m,p);p=p.sibling}p=Ca(y,m.mode,S),p.return=m,m=p}return i(m);case Ae:return D=y._init,pe(m,p,D(y._payload),S)}if(Bn(y))return T(m,p,y,S);if(O(y))return I(m,p,y,S);to(m,y)}return typeof y=="string"&&y!==""||typeof y=="number"?(y=""+y,p!==null&&p.tag===6?(n(m,p.sibling),p=o(p,y),p.return=m,m=p):(n(m,p),p=ba(y,m.mode,S),p.return=m,m=p),i(m)):n(m,p)}return pe}var jn=ds(!0),ps=ds(!1),no=Ot(null),ro=null,En=null,Rl=null;function Dl(){Rl=En=ro=null}function Bl(e){var t=no.current;ee(no),e._currentValue=t}function Ol(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Pn(e,t){ro=e,Rl=En=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(Be=!0),e.firstContext=null)}function $e(e){var t=e._currentValue;if(Rl!==e)if(e={context:e,memoizedValue:t,next:null},En===null){if(ro===null)throw Error(d(308));En=e,ro.dependencies={lanes:0,firstContext:e}}else En=En.next=e;return t}var tn=null;function Ll(e){tn===null?tn=[e]:tn.push(e)}function fs(e,t,n,r){var o=t.interleaved;return o===null?(n.next=n,Ll(t)):(n.next=o.next,o.next=n),t.interleaved=n,Ct(e,r)}function Ct(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Ut=!1;function Ml(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ms(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Nt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function zt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(V&2)!==0){var o=r.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),r.pending=t,Ct(e,n)}return o=r.interleaved,o===null?(t.next=t,Ll(r)):(t.next=o.next,o.next=t),r.interleaved=t,Ct(e,n)}function oo(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Xo(e,n)}}function ys(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var o=null,l=null;if(n=n.firstBaseUpdate,n!==null){do{var i={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};l===null?o=l=i:l=l.next=i,n=n.next}while(n!==null);l===null?o=l=t:l=l.next=t}else o=l=t;n={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:l,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function lo(e,t,n,r){var o=e.updateQueue;Ut=!1;var l=o.firstBaseUpdate,i=o.lastBaseUpdate,s=o.shared.pending;if(s!==null){o.shared.pending=null;var u=s,h=u.next;u.next=null,i===null?l=h:i.next=h,i=u;var v=e.alternate;v!==null&&(v=v.updateQueue,s=v.lastBaseUpdate,s!==i&&(s===null?v.firstBaseUpdate=h:s.next=h,v.lastBaseUpdate=u))}if(l!==null){var w=o.baseState;i=0,v=h=u=null,s=l;do{var g=s.lane,j=s.eventTime;if((r&g)===g){v!==null&&(v=v.next={eventTime:j,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var T=e,I=s;switch(g=t,j=n,I.tag){case 1:if(T=I.payload,typeof T=="function"){w=T.call(j,w,g);break e}w=T;break e;case 3:T.flags=T.flags&-65537|128;case 0:if(T=I.payload,g=typeof T=="function"?T.call(j,w,g):T,g==null)break e;w=P({},w,g);break e;case 2:Ut=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,g=o.effects,g===null?o.effects=[s]:g.push(s))}else j={eventTime:j,lane:g,tag:s.tag,payload:s.payload,callback:s.callback,next:null},v===null?(h=v=j,u=w):v=v.next=j,i|=g;if(s=s.next,s===null){if(s=o.shared.pending,s===null)break;g=s,s=g.next,g.next=null,o.lastBaseUpdate=g,o.shared.pending=null}}while(!0);if(v===null&&(u=w),o.baseState=u,o.firstBaseUpdate=h,o.lastBaseUpdate=v,t=o.shared.interleaved,t!==null){o=t;do i|=o.lane,o=o.next;while(o!==t)}else l===null&&(o.shared.lanes=0);on|=i,e.lanes=i,e.memoizedState=w}}function hs(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],o=r.callback;if(o!==null){if(r.callback=null,r=n,typeof o!="function")throw Error(d(191,o));o.call(r)}}}var ir={},yt=Ot(ir),sr=Ot(ir),ur=Ot(ir);function nn(e){if(e===ir)throw Error(d(174));return e}function Ul(e,t){switch(X(ur,t),X(sr,e),X(yt,ir),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:zo(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=zo(t,e)}ee(yt),X(yt,t)}function Tn(){ee(yt),ee(sr),ee(ur)}function gs(e){nn(ur.current);var t=nn(yt.current),n=zo(t,e.type);t!==n&&(X(sr,e),X(yt,n))}function zl(e){sr.current===e&&(ee(yt),ee(sr))}var ae=Ot(0);function ao(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Fl=[];function Vl(){for(var e=0;e<Fl.length;e++)Fl[e]._workInProgressVersionPrimary=null;Fl.length=0}var io=Se.ReactCurrentDispatcher,ql=Se.ReactCurrentBatchConfig,rn=0,ie=null,me=null,ge=null,so=!1,cr=!1,dr=0,yd=0;function Ce(){throw Error(d(321))}function Jl(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!ot(e[n],t[n]))return!1;return!0}function Wl(e,t,n,r,o,l){if(rn=l,ie=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,io.current=e===null||e.memoizedState===null?vd:kd,e=n(r,o),cr){l=0;do{if(cr=!1,dr=0,25<=l)throw Error(d(301));l+=1,ge=me=null,t.updateQueue=null,io.current=wd,e=n(r,o)}while(cr)}if(io.current=po,t=me!==null&&me.next!==null,rn=0,ge=me=ie=null,so=!1,t)throw Error(d(300));return e}function Gl(){var e=dr!==0;return dr=0,e}function ht(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ge===null?ie.memoizedState=ge=e:ge=ge.next=e,ge}function Ke(){if(me===null){var e=ie.alternate;e=e!==null?e.memoizedState:null}else e=me.next;var t=ge===null?ie.memoizedState:ge.next;if(t!==null)ge=t,me=e;else{if(e===null)throw Error(d(310));me=e,e={memoizedState:me.memoizedState,baseState:me.baseState,baseQueue:me.baseQueue,queue:me.queue,next:null},ge===null?ie.memoizedState=ge=e:ge=ge.next=e}return ge}function pr(e,t){return typeof t=="function"?t(e):t}function Hl(e){var t=Ke(),n=t.queue;if(n===null)throw Error(d(311));n.lastRenderedReducer=e;var r=me,o=r.baseQueue,l=n.pending;if(l!==null){if(o!==null){var i=o.next;o.next=l.next,l.next=i}r.baseQueue=o=l,n.pending=null}if(o!==null){l=o.next,r=r.baseState;var s=i=null,u=null,h=l;do{var v=h.lane;if((rn&v)===v)u!==null&&(u=u.next={lane:0,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null}),r=h.hasEagerState?h.eagerState:e(r,h.action);else{var w={lane:v,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null};u===null?(s=u=w,i=r):u=u.next=w,ie.lanes|=v,on|=v}h=h.next}while(h!==null&&h!==l);u===null?i=r:u.next=s,ot(r,t.memoizedState)||(Be=!0),t.memoizedState=r,t.baseState=i,t.baseQueue=u,n.lastRenderedState=r}if(e=n.interleaved,e!==null){o=e;do l=o.lane,ie.lanes|=l,on|=l,o=o.next;while(o!==e)}else o===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Yl(e){var t=Ke(),n=t.queue;if(n===null)throw Error(d(311));n.lastRenderedReducer=e;var r=n.dispatch,o=n.pending,l=t.memoizedState;if(o!==null){n.pending=null;var i=o=o.next;do l=e(l,i.action),i=i.next;while(i!==o);ot(l,t.memoizedState)||(Be=!0),t.memoizedState=l,t.baseQueue===null&&(t.baseState=l),n.lastRenderedState=l}return[l,r]}function xs(){}function vs(e,t){var n=ie,r=Ke(),o=t(),l=!ot(r.memoizedState,o);if(l&&(r.memoizedState=o,Be=!0),r=r.queue,Ql(Ss.bind(null,n,r,e),[e]),r.getSnapshot!==t||l||ge!==null&&ge.memoizedState.tag&1){if(n.flags|=2048,fr(9,ws.bind(null,n,r,o,t),void 0,null),xe===null)throw Error(d(349));(rn&30)!==0||ks(n,t,o)}return o}function ks(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ie.updateQueue,t===null?(t={lastEffect:null,stores:null},ie.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function ws(e,t,n,r){t.value=n,t.getSnapshot=r,bs(t)&&Cs(e)}function Ss(e,t,n){return n(function(){bs(t)&&Cs(e)})}function bs(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!ot(e,n)}catch{return!0}}function Cs(e){var t=Ct(e,1);t!==null&&ut(t,e,1,-1)}function Ns(e){var t=ht();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:pr,lastRenderedState:e},t.queue=e,e=e.dispatch=xd.bind(null,ie,e),[t.memoizedState,e]}function fr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=ie.updateQueue,t===null?(t={lastEffect:null,stores:null},ie.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function js(){return Ke().memoizedState}function uo(e,t,n,r){var o=ht();ie.flags|=e,o.memoizedState=fr(1|t,n,void 0,r===void 0?null:r)}function co(e,t,n,r){var o=Ke();r=r===void 0?null:r;var l=void 0;if(me!==null){var i=me.memoizedState;if(l=i.destroy,r!==null&&Jl(r,i.deps)){o.memoizedState=fr(t,n,l,r);return}}ie.flags|=e,o.memoizedState=fr(1|t,n,l,r)}function Es(e,t){return uo(8390656,8,e,t)}function Ql(e,t){return co(2048,8,e,t)}function Ps(e,t){return co(4,2,e,t)}function Ts(e,t){return co(4,4,e,t)}function Is(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function _s(e,t,n){return n=n!=null?n.concat([e]):null,co(4,4,Is.bind(null,t,e),n)}function $l(){}function As(e,t){var n=Ke();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Jl(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Rs(e,t){var n=Ke();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Jl(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Ds(e,t,n){return(rn&21)===0?(e.baseState&&(e.baseState=!1,Be=!0),e.memoizedState=n):(ot(n,t)||(n=ci(),ie.lanes|=n,on|=n,e.baseState=!0),t)}function hd(e,t){var n=Y;Y=n!==0&&4>n?n:4,e(!0);var r=ql.transition;ql.transition={};try{e(!1),t()}finally{Y=n,ql.transition=r}}function Bs(){return Ke().memoizedState}function gd(e,t,n){var r=Jt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Os(e))Ls(t,n);else if(n=fs(e,t,n,r),n!==null){var o=Te();ut(n,e,r,o),Ms(n,t,r)}}function xd(e,t,n){var r=Jt(e),o={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Os(e))Ls(t,o);else{var l=e.alternate;if(e.lanes===0&&(l===null||l.lanes===0)&&(l=t.lastRenderedReducer,l!==null))try{var i=t.lastRenderedState,s=l(i,n);if(o.hasEagerState=!0,o.eagerState=s,ot(s,i)){var u=t.interleaved;u===null?(o.next=o,Ll(t)):(o.next=u.next,u.next=o),t.interleaved=o;return}}catch{}finally{}n=fs(e,t,o,r),n!==null&&(o=Te(),ut(n,e,r,o),Ms(n,t,r))}}function Os(e){var t=e.alternate;return e===ie||t!==null&&t===ie}function Ls(e,t){cr=so=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Ms(e,t,n){if((n&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Xo(e,n)}}var po={readContext:$e,useCallback:Ce,useContext:Ce,useEffect:Ce,useImperativeHandle:Ce,useInsertionEffect:Ce,useLayoutEffect:Ce,useMemo:Ce,useReducer:Ce,useRef:Ce,useState:Ce,useDebugValue:Ce,useDeferredValue:Ce,useTransition:Ce,useMutableSource:Ce,useSyncExternalStore:Ce,useId:Ce,unstable_isNewReconciler:!1},vd={readContext:$e,useCallback:function(e,t){return ht().memoizedState=[e,t===void 0?null:t],e},useContext:$e,useEffect:Es,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,uo(4194308,4,Is.bind(null,t,e),n)},useLayoutEffect:function(e,t){return uo(4194308,4,e,t)},useInsertionEffect:function(e,t){return uo(4,2,e,t)},useMemo:function(e,t){var n=ht();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=ht();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=gd.bind(null,ie,e),[r.memoizedState,e]},useRef:function(e){var t=ht();return e={current:e},t.memoizedState=e},useState:Ns,useDebugValue:$l,useDeferredValue:function(e){return ht().memoizedState=e},useTransition:function(){var e=Ns(!1),t=e[0];return e=hd.bind(null,e[1]),ht().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=ie,o=ht();if(oe){if(n===void 0)throw Error(d(407));n=n()}else{if(n=t(),xe===null)throw Error(d(349));(rn&30)!==0||ks(r,t,n)}o.memoizedState=n;var l={value:n,getSnapshot:t};return o.queue=l,Es(Ss.bind(null,r,l,e),[e]),r.flags|=2048,fr(9,ws.bind(null,r,l,n,t),void 0,null),n},useId:function(){var e=ht(),t=xe.identifierPrefix;if(oe){var n=bt,r=St;n=(r&~(1<<32-rt(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=dr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=yd++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},kd={readContext:$e,useCallback:As,useContext:$e,useEffect:Ql,useImperativeHandle:_s,useInsertionEffect:Ps,useLayoutEffect:Ts,useMemo:Rs,useReducer:Hl,useRef:js,useState:function(){return Hl(pr)},useDebugValue:$l,useDeferredValue:function(e){var t=Ke();return Ds(t,me.memoizedState,e)},useTransition:function(){var e=Hl(pr)[0],t=Ke().memoizedState;return[e,t]},useMutableSource:xs,useSyncExternalStore:vs,useId:Bs,unstable_isNewReconciler:!1},wd={readContext:$e,useCallback:As,useContext:$e,useEffect:Ql,useImperativeHandle:_s,useInsertionEffect:Ps,useLayoutEffect:Ts,useMemo:Rs,useReducer:Yl,useRef:js,useState:function(){return Yl(pr)},useDebugValue:$l,useDeferredValue:function(e){var t=Ke();return me===null?t.memoizedState=e:Ds(t,me.memoizedState,e)},useTransition:function(){var e=Yl(pr)[0],t=Ke().memoizedState;return[e,t]},useMutableSource:xs,useSyncExternalStore:vs,useId:Bs,unstable_isNewReconciler:!1};function at(e,t){if(e&&e.defaultProps){t=P({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Kl(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:P({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var fo={isMounted:function(e){return(e=e._reactInternals)?$t(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Te(),o=Jt(e),l=Nt(r,o);l.payload=t,n!=null&&(l.callback=n),t=zt(e,l,o),t!==null&&(ut(t,e,o,r),oo(t,e,o))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Te(),o=Jt(e),l=Nt(r,o);l.tag=1,l.payload=t,n!=null&&(l.callback=n),t=zt(e,l,o),t!==null&&(ut(t,e,o,r),oo(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Te(),r=Jt(e),o=Nt(n,r);o.tag=2,t!=null&&(o.callback=t),t=zt(e,o,r),t!==null&&(ut(t,e,r,n),oo(t,e,r))}};function Us(e,t,n,r,o,l,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,l,i):t.prototype&&t.prototype.isPureReactComponent?!Zn(n,r)||!Zn(o,l):!0}function zs(e,t,n){var r=!1,o=Lt,l=t.contextType;return typeof l=="object"&&l!==null?l=$e(l):(o=De(t)?Xt:be.current,r=t.contextTypes,l=(r=r!=null)?Sn(e,o):Lt),t=new t(n,l),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=fo,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=l),t}function Fs(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&fo.enqueueReplaceState(t,t.state,null)}function Xl(e,t,n,r){var o=e.stateNode;o.props=n,o.state=e.memoizedState,o.refs={},Ml(e);var l=t.contextType;typeof l=="object"&&l!==null?o.context=$e(l):(l=De(t)?Xt:be.current,o.context=Sn(e,l)),o.state=e.memoizedState,l=t.getDerivedStateFromProps,typeof l=="function"&&(Kl(e,t,l,n),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&fo.enqueueReplaceState(o,o.state,null),lo(e,n,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function In(e,t){try{var n="",r=t;do n+=q(r),r=r.return;while(r);var o=n}catch(l){o=`
Error generating stack: `+l.message+`
`+l.stack}return{value:e,source:t,stack:o,digest:null}}function Zl(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function ea(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Sd=typeof WeakMap=="function"?WeakMap:Map;function Vs(e,t,n){n=Nt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){ko||(ko=!0,ya=r),ea(e,t)},n}function qs(e,t,n){n=Nt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=t.value;n.payload=function(){return r(o)},n.callback=function(){ea(e,t)}}var l=e.stateNode;return l!==null&&typeof l.componentDidCatch=="function"&&(n.callback=function(){ea(e,t),typeof r!="function"&&(Vt===null?Vt=new Set([this]):Vt.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),n}function Js(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Sd;var o=new Set;r.set(t,o)}else o=r.get(t),o===void 0&&(o=new Set,r.set(t,o));o.has(n)||(o.add(n),e=Od.bind(null,e,t,n),t.then(e,e))}function Ws(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Gs(e,t,n,r,o){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Nt(-1,1),t.tag=2,zt(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=o,e)}var bd=Se.ReactCurrentOwner,Be=!1;function Pe(e,t,n,r){t.child=e===null?ps(t,null,n,r):jn(t,e.child,n,r)}function Hs(e,t,n,r,o){n=n.render;var l=t.ref;return Pn(t,o),r=Wl(e,t,n,r,l,o),n=Gl(),e!==null&&!Be?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,jt(e,t,o)):(oe&&n&&Pl(t),t.flags|=1,Pe(e,t,r,o),t.child)}function Ys(e,t,n,r,o){if(e===null){var l=n.type;return typeof l=="function"&&!Sa(l)&&l.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=l,Qs(e,t,l,r,o)):(e=jo(n.type,null,r,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(l=e.child,(e.lanes&o)===0){var i=l.memoizedProps;if(n=n.compare,n=n!==null?n:Zn,n(i,r)&&e.ref===t.ref)return jt(e,t,o)}return t.flags|=1,e=Gt(l,r),e.ref=t.ref,e.return=t,t.child=e}function Qs(e,t,n,r,o){if(e!==null){var l=e.memoizedProps;if(Zn(l,r)&&e.ref===t.ref)if(Be=!1,t.pendingProps=r=l,(e.lanes&o)!==0)(e.flags&131072)!==0&&(Be=!0);else return t.lanes=e.lanes,jt(e,t,o)}return ta(e,t,n,r,o)}function $s(e,t,n){var r=t.pendingProps,o=r.children,l=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},X(An,Je),Je|=n;else{if((n&1073741824)===0)return e=l!==null?l.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,X(An,Je),Je|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=l!==null?l.baseLanes:n,X(An,Je),Je|=r}else l!==null?(r=l.baseLanes|n,t.memoizedState=null):r=n,X(An,Je),Je|=r;return Pe(e,t,o,n),t.child}function Ks(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function ta(e,t,n,r,o){var l=De(n)?Xt:be.current;return l=Sn(t,l),Pn(t,o),n=Wl(e,t,n,r,l,o),r=Gl(),e!==null&&!Be?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,jt(e,t,o)):(oe&&r&&Pl(t),t.flags|=1,Pe(e,t,n,o),t.child)}function Xs(e,t,n,r,o){if(De(n)){var l=!0;$r(t)}else l=!1;if(Pn(t,o),t.stateNode===null)yo(e,t),zs(t,n,r),Xl(t,n,r,o),r=!0;else if(e===null){var i=t.stateNode,s=t.memoizedProps;i.props=s;var u=i.context,h=n.contextType;typeof h=="object"&&h!==null?h=$e(h):(h=De(n)?Xt:be.current,h=Sn(t,h));var v=n.getDerivedStateFromProps,w=typeof v=="function"||typeof i.getSnapshotBeforeUpdate=="function";w||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s!==r||u!==h)&&Fs(t,i,r,h),Ut=!1;var g=t.memoizedState;i.state=g,lo(t,r,i,o),u=t.memoizedState,s!==r||g!==u||Re.current||Ut?(typeof v=="function"&&(Kl(t,n,v,r),u=t.memoizedState),(s=Ut||Us(t,n,s,r,g,u,h))?(w||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=u),i.props=r,i.state=u,i.context=h,r=s):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{i=t.stateNode,ms(e,t),s=t.memoizedProps,h=t.type===t.elementType?s:at(t.type,s),i.props=h,w=t.pendingProps,g=i.context,u=n.contextType,typeof u=="object"&&u!==null?u=$e(u):(u=De(n)?Xt:be.current,u=Sn(t,u));var j=n.getDerivedStateFromProps;(v=typeof j=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s!==w||g!==u)&&Fs(t,i,r,u),Ut=!1,g=t.memoizedState,i.state=g,lo(t,r,i,o);var T=t.memoizedState;s!==w||g!==T||Re.current||Ut?(typeof j=="function"&&(Kl(t,n,j,r),T=t.memoizedState),(h=Ut||Us(t,n,h,r,g,T,u)||!1)?(v||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(r,T,u),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(r,T,u)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||s===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=T),i.props=r,i.state=T,i.context=u,r=h):(typeof i.componentDidUpdate!="function"||s===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),r=!1)}return na(e,t,n,r,l,o)}function na(e,t,n,r,o,l){Ks(e,t);var i=(t.flags&128)!==0;if(!r&&!i)return o&&rs(t,n,!1),jt(e,t,l);r=t.stateNode,bd.current=t;var s=i&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&i?(t.child=jn(t,e.child,null,l),t.child=jn(t,null,s,l)):Pe(e,t,s,l),t.memoizedState=r.state,o&&rs(t,n,!0),t.child}function Zs(e){var t=e.stateNode;t.pendingContext?ts(e,t.pendingContext,t.pendingContext!==t.context):t.context&&ts(e,t.context,!1),Ul(e,t.containerInfo)}function eu(e,t,n,r,o){return Nn(),Al(o),t.flags|=256,Pe(e,t,n,r),t.child}var ra={dehydrated:null,treeContext:null,retryLane:0};function oa(e){return{baseLanes:e,cachePool:null,transitions:null}}function tu(e,t,n){var r=t.pendingProps,o=ae.current,l=!1,i=(t.flags&128)!==0,s;if((s=i)||(s=e!==null&&e.memoizedState===null?!1:(o&2)!==0),s?(l=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),X(ae,o&1),e===null)return _l(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(i=r.children,e=r.fallback,l?(r=t.mode,l=t.child,i={mode:"hidden",children:i},(r&1)===0&&l!==null?(l.childLanes=0,l.pendingProps=i):l=Eo(i,r,0,null),e=un(e,r,n,null),l.return=t,e.return=t,l.sibling=e,t.child=l,t.child.memoizedState=oa(n),t.memoizedState=ra,e):la(t,i));if(o=e.memoizedState,o!==null&&(s=o.dehydrated,s!==null))return Cd(e,t,i,r,s,o,n);if(l){l=r.fallback,i=t.mode,o=e.child,s=o.sibling;var u={mode:"hidden",children:r.children};return(i&1)===0&&t.child!==o?(r=t.child,r.childLanes=0,r.pendingProps=u,t.deletions=null):(r=Gt(o,u),r.subtreeFlags=o.subtreeFlags&14680064),s!==null?l=Gt(s,l):(l=un(l,i,n,null),l.flags|=2),l.return=t,r.return=t,r.sibling=l,t.child=r,r=l,l=t.child,i=e.child.memoizedState,i=i===null?oa(n):{baseLanes:i.baseLanes|n,cachePool:null,transitions:i.transitions},l.memoizedState=i,l.childLanes=e.childLanes&~n,t.memoizedState=ra,r}return l=e.child,e=l.sibling,r=Gt(l,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function la(e,t){return t=Eo({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function mo(e,t,n,r){return r!==null&&Al(r),jn(t,e.child,null,n),e=la(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Cd(e,t,n,r,o,l,i){if(n)return t.flags&256?(t.flags&=-257,r=Zl(Error(d(422))),mo(e,t,i,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(l=r.fallback,o=t.mode,r=Eo({mode:"visible",children:r.children},o,0,null),l=un(l,o,i,null),l.flags|=2,r.return=t,l.return=t,r.sibling=l,t.child=r,(t.mode&1)!==0&&jn(t,e.child,null,i),t.child.memoizedState=oa(i),t.memoizedState=ra,l);if((t.mode&1)===0)return mo(e,t,i,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var s=r.dgst;return r=s,l=Error(d(419)),r=Zl(l,r,void 0),mo(e,t,i,r)}if(s=(i&e.childLanes)!==0,Be||s){if(r=xe,r!==null){switch(i&-i){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=(o&(r.suspendedLanes|i))!==0?0:o,o!==0&&o!==l.retryLane&&(l.retryLane=o,Ct(e,o),ut(r,e,o,-1))}return wa(),r=Zl(Error(d(421))),mo(e,t,i,r)}return o.data==="$?"?(t.flags|=128,t.child=e.child,t=Ld.bind(null,e),o._reactRetry=t,null):(e=l.treeContext,qe=Bt(o.nextSibling),Ve=t,oe=!0,lt=null,e!==null&&(Ye[Qe++]=St,Ye[Qe++]=bt,Ye[Qe++]=Zt,St=e.id,bt=e.overflow,Zt=t),t=la(t,r.children),t.flags|=4096,t)}function nu(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Ol(e.return,t,n)}function aa(e,t,n,r,o){var l=e.memoizedState;l===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:o}:(l.isBackwards=t,l.rendering=null,l.renderingStartTime=0,l.last=r,l.tail=n,l.tailMode=o)}function ru(e,t,n){var r=t.pendingProps,o=r.revealOrder,l=r.tail;if(Pe(e,t,r.children,n),r=ae.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&nu(e,n,t);else if(e.tag===19)nu(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(X(ae,r),(t.mode&1)===0)t.memoizedState=null;else switch(o){case"forwards":for(n=t.child,o=null;n!==null;)e=n.alternate,e!==null&&ao(e)===null&&(o=n),n=n.sibling;n=o,n===null?(o=t.child,t.child=null):(o=n.sibling,n.sibling=null),aa(t,!1,o,n,l);break;case"backwards":for(n=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&ao(e)===null){t.child=o;break}e=o.sibling,o.sibling=n,n=o,o=e}aa(t,!0,n,null,l);break;case"together":aa(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function yo(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function jt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),on|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(d(153));if(t.child!==null){for(e=t.child,n=Gt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Gt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Nd(e,t,n){switch(t.tag){case 3:Zs(t),Nn();break;case 5:gs(t);break;case 1:De(t.type)&&$r(t);break;case 4:Ul(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,o=t.memoizedProps.value;X(no,r._currentValue),r._currentValue=o;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(X(ae,ae.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?tu(e,t,n):(X(ae,ae.current&1),e=jt(e,t,n),e!==null?e.sibling:null);X(ae,ae.current&1);break;case 19:if(r=(n&t.childLanes)!==0,(e.flags&128)!==0){if(r)return ru(e,t,n);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),X(ae,ae.current),r)break;return null;case 22:case 23:return t.lanes=0,$s(e,t,n)}return jt(e,t,n)}var ou,ia,lu,au;ou=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},ia=function(){},lu=function(e,t,n,r){var o=e.memoizedProps;if(o!==r){e=t.stateNode,nn(yt.current);var l=null;switch(n){case"input":o=Oo(e,o),r=Oo(e,r),l=[];break;case"select":o=P({},o,{value:void 0}),r=P({},r,{value:void 0}),l=[];break;case"textarea":o=Uo(e,o),r=Uo(e,r),l=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Hr)}Fo(n,r);var i;n=null;for(h in o)if(!r.hasOwnProperty(h)&&o.hasOwnProperty(h)&&o[h]!=null)if(h==="style"){var s=o[h];for(i in s)s.hasOwnProperty(i)&&(n||(n={}),n[i]="")}else h!=="dangerouslySetInnerHTML"&&h!=="children"&&h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&h!=="autoFocus"&&(C.hasOwnProperty(h)?l||(l=[]):(l=l||[]).push(h,null));for(h in r){var u=r[h];if(s=o!=null?o[h]:void 0,r.hasOwnProperty(h)&&u!==s&&(u!=null||s!=null))if(h==="style")if(s){for(i in s)!s.hasOwnProperty(i)||u&&u.hasOwnProperty(i)||(n||(n={}),n[i]="");for(i in u)u.hasOwnProperty(i)&&s[i]!==u[i]&&(n||(n={}),n[i]=u[i])}else n||(l||(l=[]),l.push(h,n)),n=u;else h==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,s=s?s.__html:void 0,u!=null&&s!==u&&(l=l||[]).push(h,u)):h==="children"?typeof u!="string"&&typeof u!="number"||(l=l||[]).push(h,""+u):h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&(C.hasOwnProperty(h)?(u!=null&&h==="onScroll"&&Z("scroll",e),l||s===u||(l=[])):(l=l||[]).push(h,u))}n&&(l=l||[]).push("style",n);var h=l;(t.updateQueue=h)&&(t.flags|=4)}},au=function(e,t,n,r){n!==r&&(t.flags|=4)};function mr(e,t){if(!oe)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Ne(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function jd(e,t,n){var r=t.pendingProps;switch(Tl(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ne(t),null;case 1:return De(t.type)&&Qr(),Ne(t),null;case 3:return r=t.stateNode,Tn(),ee(Re),ee(be),Vl(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(eo(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,lt!==null&&(xa(lt),lt=null))),ia(e,t),Ne(t),null;case 5:zl(t);var o=nn(ur.current);if(n=t.type,e!==null&&t.stateNode!=null)lu(e,t,n,r,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(d(166));return Ne(t),null}if(e=nn(yt.current),eo(t)){r=t.stateNode,n=t.type;var l=t.memoizedProps;switch(r[mt]=t,r[or]=l,e=(t.mode&1)!==0,n){case"dialog":Z("cancel",r),Z("close",r);break;case"iframe":case"object":case"embed":Z("load",r);break;case"video":case"audio":for(o=0;o<tr.length;o++)Z(tr[o],r);break;case"source":Z("error",r);break;case"img":case"image":case"link":Z("error",r),Z("load",r);break;case"details":Z("toggle",r);break;case"input":za(r,l),Z("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!l.multiple},Z("invalid",r);break;case"textarea":qa(r,l),Z("invalid",r)}Fo(n,l),o=null;for(var i in l)if(l.hasOwnProperty(i)){var s=l[i];i==="children"?typeof s=="string"?r.textContent!==s&&(l.suppressHydrationWarning!==!0&&Gr(r.textContent,s,e),o=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(l.suppressHydrationWarning!==!0&&Gr(r.textContent,s,e),o=["children",""+s]):C.hasOwnProperty(i)&&s!=null&&i==="onScroll"&&Z("scroll",r)}switch(n){case"input":br(r),Va(r,l,!0);break;case"textarea":br(r),Wa(r);break;case"select":case"option":break;default:typeof l.onClick=="function"&&(r.onclick=Hr)}r=o,t.updateQueue=r,r!==null&&(t.flags|=4)}else{i=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Ga(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=i.createElement(n,{is:r.is}):(e=i.createElement(n),n==="select"&&(i=e,r.multiple?i.multiple=!0:r.size&&(i.size=r.size))):e=i.createElementNS(e,n),e[mt]=t,e[or]=r,ou(e,t,!1,!1),t.stateNode=e;e:{switch(i=Vo(n,r),n){case"dialog":Z("cancel",e),Z("close",e),o=r;break;case"iframe":case"object":case"embed":Z("load",e),o=r;break;case"video":case"audio":for(o=0;o<tr.length;o++)Z(tr[o],e);o=r;break;case"source":Z("error",e),o=r;break;case"img":case"image":case"link":Z("error",e),Z("load",e),o=r;break;case"details":Z("toggle",e),o=r;break;case"input":za(e,r),o=Oo(e,r),Z("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=P({},r,{value:void 0}),Z("invalid",e);break;case"textarea":qa(e,r),o=Uo(e,r),Z("invalid",e);break;default:o=r}Fo(n,o),s=o;for(l in s)if(s.hasOwnProperty(l)){var u=s[l];l==="style"?Qa(e,u):l==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&Ha(e,u)):l==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&On(e,u):typeof u=="number"&&On(e,""+u):l!=="suppressContentEditableWarning"&&l!=="suppressHydrationWarning"&&l!=="autoFocus"&&(C.hasOwnProperty(l)?u!=null&&l==="onScroll"&&Z("scroll",e):u!=null&&et(e,l,u,i))}switch(n){case"input":br(e),Va(e,r,!1);break;case"textarea":br(e),Wa(e);break;case"option":r.value!=null&&e.setAttribute("value",""+H(r.value));break;case"select":e.multiple=!!r.multiple,l=r.value,l!=null?cn(e,!!r.multiple,l,!1):r.defaultValue!=null&&cn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=Hr)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Ne(t),null;case 6:if(e&&t.stateNode!=null)au(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(d(166));if(n=nn(ur.current),nn(yt.current),eo(t)){if(r=t.stateNode,n=t.memoizedProps,r[mt]=t,(l=r.nodeValue!==n)&&(e=Ve,e!==null))switch(e.tag){case 3:Gr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Gr(r.nodeValue,n,(e.mode&1)!==0)}l&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[mt]=t,t.stateNode=r}return Ne(t),null;case 13:if(ee(ae),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(oe&&qe!==null&&(t.mode&1)!==0&&(t.flags&128)===0)us(),Nn(),t.flags|=98560,l=!1;else if(l=eo(t),r!==null&&r.dehydrated!==null){if(e===null){if(!l)throw Error(d(318));if(l=t.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(d(317));l[mt]=t}else Nn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ne(t),l=!1}else lt!==null&&(xa(lt),lt=null),l=!0;if(!l)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(ae.current&1)!==0?ye===0&&(ye=3):wa())),t.updateQueue!==null&&(t.flags|=4),Ne(t),null);case 4:return Tn(),ia(e,t),e===null&&nr(t.stateNode.containerInfo),Ne(t),null;case 10:return Bl(t.type._context),Ne(t),null;case 17:return De(t.type)&&Qr(),Ne(t),null;case 19:if(ee(ae),l=t.memoizedState,l===null)return Ne(t),null;if(r=(t.flags&128)!==0,i=l.rendering,i===null)if(r)mr(l,!1);else{if(ye!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(i=ao(e),i!==null){for(t.flags|=128,mr(l,!1),r=i.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)l=n,e=r,l.flags&=14680066,i=l.alternate,i===null?(l.childLanes=0,l.lanes=e,l.child=null,l.subtreeFlags=0,l.memoizedProps=null,l.memoizedState=null,l.updateQueue=null,l.dependencies=null,l.stateNode=null):(l.childLanes=i.childLanes,l.lanes=i.lanes,l.child=i.child,l.subtreeFlags=0,l.deletions=null,l.memoizedProps=i.memoizedProps,l.memoizedState=i.memoizedState,l.updateQueue=i.updateQueue,l.type=i.type,e=i.dependencies,l.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return X(ae,ae.current&1|2),t.child}e=e.sibling}l.tail!==null&&de()>Rn&&(t.flags|=128,r=!0,mr(l,!1),t.lanes=4194304)}else{if(!r)if(e=ao(i),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),mr(l,!0),l.tail===null&&l.tailMode==="hidden"&&!i.alternate&&!oe)return Ne(t),null}else 2*de()-l.renderingStartTime>Rn&&n!==1073741824&&(t.flags|=128,r=!0,mr(l,!1),t.lanes=4194304);l.isBackwards?(i.sibling=t.child,t.child=i):(n=l.last,n!==null?n.sibling=i:t.child=i,l.last=i)}return l.tail!==null?(t=l.tail,l.rendering=t,l.tail=t.sibling,l.renderingStartTime=de(),t.sibling=null,n=ae.current,X(ae,r?n&1|2:n&1),t):(Ne(t),null);case 22:case 23:return ka(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(Je&1073741824)!==0&&(Ne(t),t.subtreeFlags&6&&(t.flags|=8192)):Ne(t),null;case 24:return null;case 25:return null}throw Error(d(156,t.tag))}function Ed(e,t){switch(Tl(t),t.tag){case 1:return De(t.type)&&Qr(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Tn(),ee(Re),ee(be),Vl(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return zl(t),null;case 13:if(ee(ae),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(d(340));Nn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return ee(ae),null;case 4:return Tn(),null;case 10:return Bl(t.type._context),null;case 22:case 23:return ka(),null;case 24:return null;default:return null}}var ho=!1,je=!1,Pd=typeof WeakSet=="function"?WeakSet:Set,E=null;function _n(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){ce(e,t,r)}else n.current=null}function sa(e,t,n){try{n()}catch(r){ce(e,t,r)}}var iu=!1;function Td(e,t){if(kl=Br,e=Ui(),pl(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var o=r.anchorOffset,l=r.focusNode;r=r.focusOffset;try{n.nodeType,l.nodeType}catch{n=null;break e}var i=0,s=-1,u=-1,h=0,v=0,w=e,g=null;t:for(;;){for(var j;w!==n||o!==0&&w.nodeType!==3||(s=i+o),w!==l||r!==0&&w.nodeType!==3||(u=i+r),w.nodeType===3&&(i+=w.nodeValue.length),(j=w.firstChild)!==null;)g=w,w=j;for(;;){if(w===e)break t;if(g===n&&++h===o&&(s=i),g===l&&++v===r&&(u=i),(j=w.nextSibling)!==null)break;w=g,g=w.parentNode}w=j}n=s===-1||u===-1?null:{start:s,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(wl={focusedElem:e,selectionRange:n},Br=!1,E=t;E!==null;)if(t=E,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,E=e;else for(;E!==null;){t=E;try{var T=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(T!==null){var I=T.memoizedProps,pe=T.memoizedState,m=t.stateNode,p=m.getSnapshotBeforeUpdate(t.elementType===t.type?I:at(t.type,I),pe);m.__reactInternalSnapshotBeforeUpdate=p}break;case 3:var y=t.stateNode.containerInfo;y.nodeType===1?y.textContent="":y.nodeType===9&&y.documentElement&&y.removeChild(y.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(d(163))}}catch(S){ce(t,t.return,S)}if(e=t.sibling,e!==null){e.return=t.return,E=e;break}E=t.return}return T=iu,iu=!1,T}function yr(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var l=o.destroy;o.destroy=void 0,l!==void 0&&sa(t,n,l)}o=o.next}while(o!==r)}}function go(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function ua(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function su(e){var t=e.alternate;t!==null&&(e.alternate=null,su(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[mt],delete t[or],delete t[Nl],delete t[dd],delete t[pd])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function uu(e){return e.tag===5||e.tag===3||e.tag===4}function cu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||uu(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ca(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Hr));else if(r!==4&&(e=e.child,e!==null))for(ca(e,t,n),e=e.sibling;e!==null;)ca(e,t,n),e=e.sibling}function da(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(da(e,t,n),e=e.sibling;e!==null;)da(e,t,n),e=e.sibling}var ke=null,it=!1;function Ft(e,t,n){for(n=n.child;n!==null;)du(e,t,n),n=n.sibling}function du(e,t,n){if(ft&&typeof ft.onCommitFiberUnmount=="function")try{ft.onCommitFiberUnmount(Tr,n)}catch{}switch(n.tag){case 5:je||_n(n,t);case 6:var r=ke,o=it;ke=null,Ft(e,t,n),ke=r,it=o,ke!==null&&(it?(e=ke,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):ke.removeChild(n.stateNode));break;case 18:ke!==null&&(it?(e=ke,n=n.stateNode,e.nodeType===8?Cl(e.parentNode,n):e.nodeType===1&&Cl(e,n),Hn(e)):Cl(ke,n.stateNode));break;case 4:r=ke,o=it,ke=n.stateNode.containerInfo,it=!0,Ft(e,t,n),ke=r,it=o;break;case 0:case 11:case 14:case 15:if(!je&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var l=o,i=l.destroy;l=l.tag,i!==void 0&&((l&2)!==0||(l&4)!==0)&&sa(n,t,i),o=o.next}while(o!==r)}Ft(e,t,n);break;case 1:if(!je&&(_n(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(s){ce(n,t,s)}Ft(e,t,n);break;case 21:Ft(e,t,n);break;case 22:n.mode&1?(je=(r=je)||n.memoizedState!==null,Ft(e,t,n),je=r):Ft(e,t,n);break;default:Ft(e,t,n)}}function pu(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Pd),t.forEach(function(r){var o=Md.bind(null,e,r);n.has(r)||(n.add(r),r.then(o,o))})}}function st(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var o=n[r];try{var l=e,i=t,s=i;e:for(;s!==null;){switch(s.tag){case 5:ke=s.stateNode,it=!1;break e;case 3:ke=s.stateNode.containerInfo,it=!0;break e;case 4:ke=s.stateNode.containerInfo,it=!0;break e}s=s.return}if(ke===null)throw Error(d(160));du(l,i,o),ke=null,it=!1;var u=o.alternate;u!==null&&(u.return=null),o.return=null}catch(h){ce(o,t,h)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)fu(t,e),t=t.sibling}function fu(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(st(t,e),gt(e),r&4){try{yr(3,e,e.return),go(3,e)}catch(I){ce(e,e.return,I)}try{yr(5,e,e.return)}catch(I){ce(e,e.return,I)}}break;case 1:st(t,e),gt(e),r&512&&n!==null&&_n(n,n.return);break;case 5:if(st(t,e),gt(e),r&512&&n!==null&&_n(n,n.return),e.flags&32){var o=e.stateNode;try{On(o,"")}catch(I){ce(e,e.return,I)}}if(r&4&&(o=e.stateNode,o!=null)){var l=e.memoizedProps,i=n!==null?n.memoizedProps:l,s=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{s==="input"&&l.type==="radio"&&l.name!=null&&Fa(o,l),Vo(s,i);var h=Vo(s,l);for(i=0;i<u.length;i+=2){var v=u[i],w=u[i+1];v==="style"?Qa(o,w):v==="dangerouslySetInnerHTML"?Ha(o,w):v==="children"?On(o,w):et(o,v,w,h)}switch(s){case"input":Lo(o,l);break;case"textarea":Ja(o,l);break;case"select":var g=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!l.multiple;var j=l.value;j!=null?cn(o,!!l.multiple,j,!1):g!==!!l.multiple&&(l.defaultValue!=null?cn(o,!!l.multiple,l.defaultValue,!0):cn(o,!!l.multiple,l.multiple?[]:"",!1))}o[or]=l}catch(I){ce(e,e.return,I)}}break;case 6:if(st(t,e),gt(e),r&4){if(e.stateNode===null)throw Error(d(162));o=e.stateNode,l=e.memoizedProps;try{o.nodeValue=l}catch(I){ce(e,e.return,I)}}break;case 3:if(st(t,e),gt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Hn(t.containerInfo)}catch(I){ce(e,e.return,I)}break;case 4:st(t,e),gt(e);break;case 13:st(t,e),gt(e),o=e.child,o.flags&8192&&(l=o.memoizedState!==null,o.stateNode.isHidden=l,!l||o.alternate!==null&&o.alternate.memoizedState!==null||(ma=de())),r&4&&pu(e);break;case 22:if(v=n!==null&&n.memoizedState!==null,e.mode&1?(je=(h=je)||v,st(t,e),je=h):st(t,e),gt(e),r&8192){if(h=e.memoizedState!==null,(e.stateNode.isHidden=h)&&!v&&(e.mode&1)!==0)for(E=e,v=e.child;v!==null;){for(w=E=v;E!==null;){switch(g=E,j=g.child,g.tag){case 0:case 11:case 14:case 15:yr(4,g,g.return);break;case 1:_n(g,g.return);var T=g.stateNode;if(typeof T.componentWillUnmount=="function"){r=g,n=g.return;try{t=r,T.props=t.memoizedProps,T.state=t.memoizedState,T.componentWillUnmount()}catch(I){ce(r,n,I)}}break;case 5:_n(g,g.return);break;case 22:if(g.memoizedState!==null){hu(w);continue}}j!==null?(j.return=g,E=j):hu(w)}v=v.sibling}e:for(v=null,w=e;;){if(w.tag===5){if(v===null){v=w;try{o=w.stateNode,h?(l=o.style,typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none"):(s=w.stateNode,u=w.memoizedProps.style,i=u!=null&&u.hasOwnProperty("display")?u.display:null,s.style.display=Ya("display",i))}catch(I){ce(e,e.return,I)}}}else if(w.tag===6){if(v===null)try{w.stateNode.nodeValue=h?"":w.memoizedProps}catch(I){ce(e,e.return,I)}}else if((w.tag!==22&&w.tag!==23||w.memoizedState===null||w===e)&&w.child!==null){w.child.return=w,w=w.child;continue}if(w===e)break e;for(;w.sibling===null;){if(w.return===null||w.return===e)break e;v===w&&(v=null),w=w.return}v===w&&(v=null),w.sibling.return=w.return,w=w.sibling}}break;case 19:st(t,e),gt(e),r&4&&pu(e);break;case 21:break;default:st(t,e),gt(e)}}function gt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(uu(n)){var r=n;break e}n=n.return}throw Error(d(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&(On(o,""),r.flags&=-33);var l=cu(e);da(e,l,o);break;case 3:case 4:var i=r.stateNode.containerInfo,s=cu(e);ca(e,s,i);break;default:throw Error(d(161))}}catch(u){ce(e,e.return,u)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Id(e,t,n){E=e,mu(e)}function mu(e,t,n){for(var r=(e.mode&1)!==0;E!==null;){var o=E,l=o.child;if(o.tag===22&&r){var i=o.memoizedState!==null||ho;if(!i){var s=o.alternate,u=s!==null&&s.memoizedState!==null||je;s=ho;var h=je;if(ho=i,(je=u)&&!h)for(E=o;E!==null;)i=E,u=i.child,i.tag===22&&i.memoizedState!==null?gu(o):u!==null?(u.return=i,E=u):gu(o);for(;l!==null;)E=l,mu(l),l=l.sibling;E=o,ho=s,je=h}yu(e)}else(o.subtreeFlags&8772)!==0&&l!==null?(l.return=o,E=l):yu(e)}}function yu(e){for(;E!==null;){var t=E;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:je||go(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!je)if(n===null)r.componentDidMount();else{var o=t.elementType===t.type?n.memoizedProps:at(t.type,n.memoizedProps);r.componentDidUpdate(o,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var l=t.updateQueue;l!==null&&hs(t,l,r);break;case 3:var i=t.updateQueue;if(i!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}hs(t,i,n)}break;case 5:var s=t.stateNode;if(n===null&&t.flags&4){n=s;var u=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var h=t.alternate;if(h!==null){var v=h.memoizedState;if(v!==null){var w=v.dehydrated;w!==null&&Hn(w)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(d(163))}je||t.flags&512&&ua(t)}catch(g){ce(t,t.return,g)}}if(t===e){E=null;break}if(n=t.sibling,n!==null){n.return=t.return,E=n;break}E=t.return}}function hu(e){for(;E!==null;){var t=E;if(t===e){E=null;break}var n=t.sibling;if(n!==null){n.return=t.return,E=n;break}E=t.return}}function gu(e){for(;E!==null;){var t=E;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{go(4,t)}catch(u){ce(t,n,u)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var o=t.return;try{r.componentDidMount()}catch(u){ce(t,o,u)}}var l=t.return;try{ua(t)}catch(u){ce(t,l,u)}break;case 5:var i=t.return;try{ua(t)}catch(u){ce(t,i,u)}}}catch(u){ce(t,t.return,u)}if(t===e){E=null;break}var s=t.sibling;if(s!==null){s.return=t.return,E=s;break}E=t.return}}var _d=Math.ceil,xo=Se.ReactCurrentDispatcher,pa=Se.ReactCurrentOwner,Xe=Se.ReactCurrentBatchConfig,V=0,xe=null,fe=null,we=0,Je=0,An=Ot(0),ye=0,hr=null,on=0,vo=0,fa=0,gr=null,Oe=null,ma=0,Rn=1/0,Et=null,ko=!1,ya=null,Vt=null,wo=!1,qt=null,So=0,xr=0,ha=null,bo=-1,Co=0;function Te(){return(V&6)!==0?de():bo!==-1?bo:bo=de()}function Jt(e){return(e.mode&1)===0?1:(V&2)!==0&&we!==0?we&-we:md.transition!==null?(Co===0&&(Co=ci()),Co):(e=Y,e!==0||(e=window.event,e=e===void 0?16:vi(e.type)),e)}function ut(e,t,n,r){if(50<xr)throw xr=0,ha=null,Error(d(185));Vn(e,n,r),((V&2)===0||e!==xe)&&(e===xe&&((V&2)===0&&(vo|=n),ye===4&&Wt(e,we)),Le(e,r),n===1&&V===0&&(t.mode&1)===0&&(Rn=de()+500,Kr&&Mt()))}function Le(e,t){var n=e.callbackNode;mc(e,t);var r=Ar(e,e===xe?we:0);if(r===0)n!==null&&ii(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&ii(n),t===1)e.tag===0?fd(vu.bind(null,e)):os(vu.bind(null,e)),ud(function(){(V&6)===0&&Mt()}),n=null;else{switch(di(r)){case 1:n=Qo;break;case 4:n=si;break;case 16:n=Pr;break;case 536870912:n=ui;break;default:n=Pr}n=Eu(n,xu.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function xu(e,t){if(bo=-1,Co=0,(V&6)!==0)throw Error(d(327));var n=e.callbackNode;if(Dn()&&e.callbackNode!==n)return null;var r=Ar(e,e===xe?we:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=No(e,r);else{t=r;var o=V;V|=2;var l=wu();(xe!==e||we!==t)&&(Et=null,Rn=de()+500,an(e,t));do try{Dd();break}catch(s){ku(e,s)}while(!0);Dl(),xo.current=l,V=o,fe!==null?t=0:(xe=null,we=0,t=ye)}if(t!==0){if(t===2&&(o=$o(e),o!==0&&(r=o,t=ga(e,o))),t===1)throw n=hr,an(e,0),Wt(e,r),Le(e,de()),n;if(t===6)Wt(e,r);else{if(o=e.current.alternate,(r&30)===0&&!Ad(o)&&(t=No(e,r),t===2&&(l=$o(e),l!==0&&(r=l,t=ga(e,l))),t===1))throw n=hr,an(e,0),Wt(e,r),Le(e,de()),n;switch(e.finishedWork=o,e.finishedLanes=r,t){case 0:case 1:throw Error(d(345));case 2:sn(e,Oe,Et);break;case 3:if(Wt(e,r),(r&130023424)===r&&(t=ma+500-de(),10<t)){if(Ar(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){Te(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=bl(sn.bind(null,e,Oe,Et),t);break}sn(e,Oe,Et);break;case 4:if(Wt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,o=-1;0<r;){var i=31-rt(r);l=1<<i,i=t[i],i>o&&(o=i),r&=~l}if(r=o,r=de()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*_d(r/1960))-r,10<r){e.timeoutHandle=bl(sn.bind(null,e,Oe,Et),r);break}sn(e,Oe,Et);break;case 5:sn(e,Oe,Et);break;default:throw Error(d(329))}}}return Le(e,de()),e.callbackNode===n?xu.bind(null,e):null}function ga(e,t){var n=gr;return e.current.memoizedState.isDehydrated&&(an(e,t).flags|=256),e=No(e,t),e!==2&&(t=Oe,Oe=n,t!==null&&xa(t)),e}function xa(e){Oe===null?Oe=e:Oe.push.apply(Oe,e)}function Ad(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var o=n[r],l=o.getSnapshot;o=o.value;try{if(!ot(l(),o))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Wt(e,t){for(t&=~fa,t&=~vo,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-rt(t),r=1<<n;e[n]=-1,t&=~r}}function vu(e){if((V&6)!==0)throw Error(d(327));Dn();var t=Ar(e,0);if((t&1)===0)return Le(e,de()),null;var n=No(e,t);if(e.tag!==0&&n===2){var r=$o(e);r!==0&&(t=r,n=ga(e,r))}if(n===1)throw n=hr,an(e,0),Wt(e,t),Le(e,de()),n;if(n===6)throw Error(d(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,sn(e,Oe,Et),Le(e,de()),null}function va(e,t){var n=V;V|=1;try{return e(t)}finally{V=n,V===0&&(Rn=de()+500,Kr&&Mt())}}function ln(e){qt!==null&&qt.tag===0&&(V&6)===0&&Dn();var t=V;V|=1;var n=Xe.transition,r=Y;try{if(Xe.transition=null,Y=1,e)return e()}finally{Y=r,Xe.transition=n,V=t,(V&6)===0&&Mt()}}function ka(){Je=An.current,ee(An)}function an(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,sd(n)),fe!==null)for(n=fe.return;n!==null;){var r=n;switch(Tl(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Qr();break;case 3:Tn(),ee(Re),ee(be),Vl();break;case 5:zl(r);break;case 4:Tn();break;case 13:ee(ae);break;case 19:ee(ae);break;case 10:Bl(r.type._context);break;case 22:case 23:ka()}n=n.return}if(xe=e,fe=e=Gt(e.current,null),we=Je=t,ye=0,hr=null,fa=vo=on=0,Oe=gr=null,tn!==null){for(t=0;t<tn.length;t++)if(n=tn[t],r=n.interleaved,r!==null){n.interleaved=null;var o=r.next,l=n.pending;if(l!==null){var i=l.next;l.next=o,r.next=i}n.pending=r}tn=null}return e}function ku(e,t){do{var n=fe;try{if(Dl(),io.current=po,so){for(var r=ie.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}so=!1}if(rn=0,ge=me=ie=null,cr=!1,dr=0,pa.current=null,n===null||n.return===null){ye=1,hr=t,fe=null;break}e:{var l=e,i=n.return,s=n,u=t;if(t=we,s.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var h=u,v=s,w=v.tag;if((v.mode&1)===0&&(w===0||w===11||w===15)){var g=v.alternate;g?(v.updateQueue=g.updateQueue,v.memoizedState=g.memoizedState,v.lanes=g.lanes):(v.updateQueue=null,v.memoizedState=null)}var j=Ws(i);if(j!==null){j.flags&=-257,Gs(j,i,s,l,t),j.mode&1&&Js(l,h,t),t=j,u=h;var T=t.updateQueue;if(T===null){var I=new Set;I.add(u),t.updateQueue=I}else T.add(u);break e}else{if((t&1)===0){Js(l,h,t),wa();break e}u=Error(d(426))}}else if(oe&&s.mode&1){var pe=Ws(i);if(pe!==null){(pe.flags&65536)===0&&(pe.flags|=256),Gs(pe,i,s,l,t),Al(In(u,s));break e}}l=u=In(u,s),ye!==4&&(ye=2),gr===null?gr=[l]:gr.push(l),l=i;do{switch(l.tag){case 3:l.flags|=65536,t&=-t,l.lanes|=t;var m=Vs(l,u,t);ys(l,m);break e;case 1:s=u;var p=l.type,y=l.stateNode;if((l.flags&128)===0&&(typeof p.getDerivedStateFromError=="function"||y!==null&&typeof y.componentDidCatch=="function"&&(Vt===null||!Vt.has(y)))){l.flags|=65536,t&=-t,l.lanes|=t;var S=qs(l,s,t);ys(l,S);break e}}l=l.return}while(l!==null)}bu(n)}catch(A){t=A,fe===n&&n!==null&&(fe=n=n.return);continue}break}while(!0)}function wu(){var e=xo.current;return xo.current=po,e===null?po:e}function wa(){(ye===0||ye===3||ye===2)&&(ye=4),xe===null||(on&268435455)===0&&(vo&268435455)===0||Wt(xe,we)}function No(e,t){var n=V;V|=2;var r=wu();(xe!==e||we!==t)&&(Et=null,an(e,t));do try{Rd();break}catch(o){ku(e,o)}while(!0);if(Dl(),V=n,xo.current=r,fe!==null)throw Error(d(261));return xe=null,we=0,ye}function Rd(){for(;fe!==null;)Su(fe)}function Dd(){for(;fe!==null&&!lc();)Su(fe)}function Su(e){var t=ju(e.alternate,e,Je);e.memoizedProps=e.pendingProps,t===null?bu(e):fe=t,pa.current=null}function bu(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=jd(n,t,Je),n!==null){fe=n;return}}else{if(n=Ed(n,t),n!==null){n.flags&=32767,fe=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ye=6,fe=null;return}}if(t=t.sibling,t!==null){fe=t;return}fe=t=e}while(t!==null);ye===0&&(ye=5)}function sn(e,t,n){var r=Y,o=Xe.transition;try{Xe.transition=null,Y=1,Bd(e,t,n,r)}finally{Xe.transition=o,Y=r}return null}function Bd(e,t,n,r){do Dn();while(qt!==null);if((V&6)!==0)throw Error(d(327));n=e.finishedWork;var o=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(d(177));e.callbackNode=null,e.callbackPriority=0;var l=n.lanes|n.childLanes;if(yc(e,l),e===xe&&(fe=xe=null,we=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||wo||(wo=!0,Eu(Pr,function(){return Dn(),null})),l=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||l){l=Xe.transition,Xe.transition=null;var i=Y;Y=1;var s=V;V|=4,pa.current=null,Td(e,n),fu(n,e),td(wl),Br=!!kl,wl=kl=null,e.current=n,Id(n),ac(),V=s,Y=i,Xe.transition=l}else e.current=n;if(wo&&(wo=!1,qt=e,So=o),l=e.pendingLanes,l===0&&(Vt=null),uc(n.stateNode),Le(e,de()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)o=t[n],r(o.value,{componentStack:o.stack,digest:o.digest});if(ko)throw ko=!1,e=ya,ya=null,e;return(So&1)!==0&&e.tag!==0&&Dn(),l=e.pendingLanes,(l&1)!==0?e===ha?xr++:(xr=0,ha=e):xr=0,Mt(),null}function Dn(){if(qt!==null){var e=di(So),t=Xe.transition,n=Y;try{if(Xe.transition=null,Y=16>e?16:e,qt===null)var r=!1;else{if(e=qt,qt=null,So=0,(V&6)!==0)throw Error(d(331));var o=V;for(V|=4,E=e.current;E!==null;){var l=E,i=l.child;if((E.flags&16)!==0){var s=l.deletions;if(s!==null){for(var u=0;u<s.length;u++){var h=s[u];for(E=h;E!==null;){var v=E;switch(v.tag){case 0:case 11:case 15:yr(8,v,l)}var w=v.child;if(w!==null)w.return=v,E=w;else for(;E!==null;){v=E;var g=v.sibling,j=v.return;if(su(v),v===h){E=null;break}if(g!==null){g.return=j,E=g;break}E=j}}}var T=l.alternate;if(T!==null){var I=T.child;if(I!==null){T.child=null;do{var pe=I.sibling;I.sibling=null,I=pe}while(I!==null)}}E=l}}if((l.subtreeFlags&2064)!==0&&i!==null)i.return=l,E=i;else e:for(;E!==null;){if(l=E,(l.flags&2048)!==0)switch(l.tag){case 0:case 11:case 15:yr(9,l,l.return)}var m=l.sibling;if(m!==null){m.return=l.return,E=m;break e}E=l.return}}var p=e.current;for(E=p;E!==null;){i=E;var y=i.child;if((i.subtreeFlags&2064)!==0&&y!==null)y.return=i,E=y;else e:for(i=p;E!==null;){if(s=E,(s.flags&2048)!==0)try{switch(s.tag){case 0:case 11:case 15:go(9,s)}}catch(A){ce(s,s.return,A)}if(s===i){E=null;break e}var S=s.sibling;if(S!==null){S.return=s.return,E=S;break e}E=s.return}}if(V=o,Mt(),ft&&typeof ft.onPostCommitFiberRoot=="function")try{ft.onPostCommitFiberRoot(Tr,e)}catch{}r=!0}return r}finally{Y=n,Xe.transition=t}}return!1}function Cu(e,t,n){t=In(n,t),t=Vs(e,t,1),e=zt(e,t,1),t=Te(),e!==null&&(Vn(e,1,t),Le(e,t))}function ce(e,t,n){if(e.tag===3)Cu(e,e,n);else for(;t!==null;){if(t.tag===3){Cu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Vt===null||!Vt.has(r))){e=In(n,e),e=qs(t,e,1),t=zt(t,e,1),e=Te(),t!==null&&(Vn(t,1,e),Le(t,e));break}}t=t.return}}function Od(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Te(),e.pingedLanes|=e.suspendedLanes&n,xe===e&&(we&n)===n&&(ye===4||ye===3&&(we&130023424)===we&&500>de()-ma?an(e,0):fa|=n),Le(e,t)}function Nu(e,t){t===0&&((e.mode&1)===0?t=1:(t=_r,_r<<=1,(_r&130023424)===0&&(_r=4194304)));var n=Te();e=Ct(e,t),e!==null&&(Vn(e,t,n),Le(e,n))}function Ld(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Nu(e,n)}function Md(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(n=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(d(314))}r!==null&&r.delete(t),Nu(e,n)}var ju;ju=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Re.current)Be=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return Be=!1,Nd(e,t,n);Be=(e.flags&131072)!==0}else Be=!1,oe&&(t.flags&1048576)!==0&&ls(t,Zr,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;yo(e,t),e=t.pendingProps;var o=Sn(t,be.current);Pn(t,n),o=Wl(null,t,r,e,o,n);var l=Gl();return t.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,De(r)?(l=!0,$r(t)):l=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,Ml(t),o.updater=fo,t.stateNode=o,o._reactInternals=t,Xl(t,r,e,n),t=na(null,t,r,!0,l,n)):(t.tag=0,oe&&l&&Pl(t),Pe(null,t,o,n),t=t.child),t;case 16:r=t.elementType;e:{switch(yo(e,t),e=t.pendingProps,o=r._init,r=o(r._payload),t.type=r,o=t.tag=zd(r),e=at(r,e),o){case 0:t=ta(null,t,r,e,n);break e;case 1:t=Xs(null,t,r,e,n);break e;case 11:t=Hs(null,t,r,e,n);break e;case 14:t=Ys(null,t,r,at(r.type,e),n);break e}throw Error(d(306,r,""))}return t;case 0:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:at(r,o),ta(e,t,r,o,n);case 1:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:at(r,o),Xs(e,t,r,o,n);case 3:e:{if(Zs(t),e===null)throw Error(d(387));r=t.pendingProps,l=t.memoizedState,o=l.element,ms(e,t),lo(t,r,null,n);var i=t.memoizedState;if(r=i.element,l.isDehydrated)if(l={element:r,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=l,t.memoizedState=l,t.flags&256){o=In(Error(d(423)),t),t=eu(e,t,r,n,o);break e}else if(r!==o){o=In(Error(d(424)),t),t=eu(e,t,r,n,o);break e}else for(qe=Bt(t.stateNode.containerInfo.firstChild),Ve=t,oe=!0,lt=null,n=ps(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Nn(),r===o){t=jt(e,t,n);break e}Pe(e,t,r,n)}t=t.child}return t;case 5:return gs(t),e===null&&_l(t),r=t.type,o=t.pendingProps,l=e!==null?e.memoizedProps:null,i=o.children,Sl(r,o)?i=null:l!==null&&Sl(r,l)&&(t.flags|=32),Ks(e,t),Pe(e,t,i,n),t.child;case 6:return e===null&&_l(t),null;case 13:return tu(e,t,n);case 4:return Ul(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=jn(t,null,r,n):Pe(e,t,r,n),t.child;case 11:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:at(r,o),Hs(e,t,r,o,n);case 7:return Pe(e,t,t.pendingProps,n),t.child;case 8:return Pe(e,t,t.pendingProps.children,n),t.child;case 12:return Pe(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,o=t.pendingProps,l=t.memoizedProps,i=o.value,X(no,r._currentValue),r._currentValue=i,l!==null)if(ot(l.value,i)){if(l.children===o.children&&!Re.current){t=jt(e,t,n);break e}}else for(l=t.child,l!==null&&(l.return=t);l!==null;){var s=l.dependencies;if(s!==null){i=l.child;for(var u=s.firstContext;u!==null;){if(u.context===r){if(l.tag===1){u=Nt(-1,n&-n),u.tag=2;var h=l.updateQueue;if(h!==null){h=h.shared;var v=h.pending;v===null?u.next=u:(u.next=v.next,v.next=u),h.pending=u}}l.lanes|=n,u=l.alternate,u!==null&&(u.lanes|=n),Ol(l.return,n,t),s.lanes|=n;break}u=u.next}}else if(l.tag===10)i=l.type===t.type?null:l.child;else if(l.tag===18){if(i=l.return,i===null)throw Error(d(341));i.lanes|=n,s=i.alternate,s!==null&&(s.lanes|=n),Ol(i,n,t),i=l.sibling}else i=l.child;if(i!==null)i.return=l;else for(i=l;i!==null;){if(i===t){i=null;break}if(l=i.sibling,l!==null){l.return=i.return,i=l;break}i=i.return}l=i}Pe(e,t,o.children,n),t=t.child}return t;case 9:return o=t.type,r=t.pendingProps.children,Pn(t,n),o=$e(o),r=r(o),t.flags|=1,Pe(e,t,r,n),t.child;case 14:return r=t.type,o=at(r,t.pendingProps),o=at(r.type,o),Ys(e,t,r,o,n);case 15:return Qs(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:at(r,o),yo(e,t),t.tag=1,De(r)?(e=!0,$r(t)):e=!1,Pn(t,n),zs(t,r,o),Xl(t,r,o,n),na(null,t,r,!0,e,n);case 19:return ru(e,t,n);case 22:return $s(e,t,n)}throw Error(d(156,t.tag))};function Eu(e,t){return ai(e,t)}function Ud(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ze(e,t,n,r){return new Ud(e,t,n,r)}function Sa(e){return e=e.prototype,!(!e||!e.isReactComponent)}function zd(e){if(typeof e=="function")return Sa(e)?1:0;if(e!=null){if(e=e.$$typeof,e===dt)return 11;if(e===pt)return 14}return 2}function Gt(e,t){var n=e.alternate;return n===null?(n=Ze(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function jo(e,t,n,r,o,l){var i=2;if(r=e,typeof e=="function")Sa(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case _e:return un(n.children,o,l,t);case He:i=8,o|=8;break;case Pt:return e=Ze(12,n,t,o|2),e.elementType=Pt,e.lanes=l,e;case Ue:return e=Ze(13,n,t,o),e.elementType=Ue,e.lanes=l,e;case nt:return e=Ze(19,n,t,o),e.elementType=nt,e.lanes=l,e;case ue:return Eo(n,o,l,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case vt:i=10;break e;case Qt:i=9;break e;case dt:i=11;break e;case pt:i=14;break e;case Ae:i=16,r=null;break e}throw Error(d(130,e==null?e:typeof e,""))}return t=Ze(i,n,t,o),t.elementType=e,t.type=r,t.lanes=l,t}function un(e,t,n,r){return e=Ze(7,e,r,t),e.lanes=n,e}function Eo(e,t,n,r){return e=Ze(22,e,r,t),e.elementType=ue,e.lanes=n,e.stateNode={isHidden:!1},e}function ba(e,t,n){return e=Ze(6,e,null,t),e.lanes=n,e}function Ca(e,t,n){return t=Ze(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Fd(e,t,n,r,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ko(0),this.expirationTimes=Ko(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ko(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function Na(e,t,n,r,o,l,i,s,u){return e=new Fd(e,t,n,s,u),t===1?(t=1,l===!0&&(t|=8)):t=0,l=Ze(3,null,null,t),e.current=l,l.stateNode=e,l.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ml(l),e}function Vd(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Ee,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Pu(e){if(!e)return Lt;e=e._reactInternals;e:{if($t(e)!==e||e.tag!==1)throw Error(d(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(De(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(d(171))}if(e.tag===1){var n=e.type;if(De(n))return ns(e,n,t)}return t}function Tu(e,t,n,r,o,l,i,s,u){return e=Na(n,r,!0,e,o,l,i,s,u),e.context=Pu(null),n=e.current,r=Te(),o=Jt(n),l=Nt(r,o),l.callback=t??null,zt(n,l,o),e.current.lanes=o,Vn(e,o,r),Le(e,r),e}function Po(e,t,n,r){var o=t.current,l=Te(),i=Jt(o);return n=Pu(n),t.context===null?t.context=n:t.pendingContext=n,t=Nt(l,i),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=zt(o,t,i),e!==null&&(ut(e,o,i,l),oo(e,o,i)),i}function To(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Iu(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ja(e,t){Iu(e,t),(e=e.alternate)&&Iu(e,t)}function qd(){return null}var _u=typeof reportError=="function"?reportError:function(e){console.error(e)};function Ea(e){this._internalRoot=e}Io.prototype.render=Ea.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(d(409));Po(e,t,null,null)},Io.prototype.unmount=Ea.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;ln(function(){Po(null,e,null,null)}),t[kt]=null}};function Io(e){this._internalRoot=e}Io.prototype.unstable_scheduleHydration=function(e){if(e){var t=mi();e={blockedOn:null,target:e,priority:t};for(var n=0;n<At.length&&t!==0&&t<At[n].priority;n++);At.splice(n,0,e),n===0&&gi(e)}};function Pa(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function _o(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Au(){}function Jd(e,t,n,r,o){if(o){if(typeof r=="function"){var l=r;r=function(){var h=To(i);l.call(h)}}var i=Tu(t,r,e,0,null,!1,!1,"",Au);return e._reactRootContainer=i,e[kt]=i.current,nr(e.nodeType===8?e.parentNode:e),ln(),i}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var s=r;r=function(){var h=To(u);s.call(h)}}var u=Na(e,0,!1,null,null,!1,!1,"",Au);return e._reactRootContainer=u,e[kt]=u.current,nr(e.nodeType===8?e.parentNode:e),ln(function(){Po(t,u,n,r)}),u}function Ao(e,t,n,r,o){var l=n._reactRootContainer;if(l){var i=l;if(typeof o=="function"){var s=o;o=function(){var u=To(i);s.call(u)}}Po(t,i,e,o)}else i=Jd(n,t,e,o,r);return To(i)}pi=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Fn(t.pendingLanes);n!==0&&(Xo(t,n|1),Le(t,de()),(V&6)===0&&(Rn=de()+500,Mt()))}break;case 13:ln(function(){var r=Ct(e,1);if(r!==null){var o=Te();ut(r,e,1,o)}}),ja(e,1)}},Zo=function(e){if(e.tag===13){var t=Ct(e,134217728);if(t!==null){var n=Te();ut(t,e,134217728,n)}ja(e,134217728)}},fi=function(e){if(e.tag===13){var t=Jt(e),n=Ct(e,t);if(n!==null){var r=Te();ut(n,e,t,r)}ja(e,t)}},mi=function(){return Y},yi=function(e,t){var n=Y;try{return Y=e,t()}finally{Y=n}},Wo=function(e,t,n){switch(t){case"input":if(Lo(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var o=Yr(r);if(!o)throw Error(d(90));Ua(r),Lo(r,o)}}}break;case"textarea":Ja(e,n);break;case"select":t=n.value,t!=null&&cn(e,!!n.multiple,t,!1)}},Za=va,ei=ln;var Wd={usingClientEntryPoint:!1,Events:[lr,kn,Yr,Ka,Xa,va]},vr={findFiberByHostInstance:Kt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Gd={bundleType:vr.bundleType,version:vr.version,rendererPackageName:vr.rendererPackageName,rendererConfig:vr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Se.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=oi(e),e===null?null:e.stateNode},findFiberByHostInstance:vr.findFiberByHostInstance||qd,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ro=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ro.isDisabled&&Ro.supportsFiber)try{Tr=Ro.inject(Gd),ft=Ro}catch{}}return Me.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Wd,Me.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Pa(t))throw Error(d(200));return Vd(e,t,null,n)},Me.createRoot=function(e,t){if(!Pa(e))throw Error(d(299));var n=!1,r="",o=_u;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=Na(e,1,!1,null,null,n,!1,r,o),e[kt]=t.current,nr(e.nodeType===8?e.parentNode:e),new Ea(t)},Me.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(d(188)):(e=Object.keys(e).join(","),Error(d(268,e)));return e=oi(t),e=e===null?null:e.stateNode,e},Me.flushSync=function(e){return ln(e)},Me.hydrate=function(e,t,n){if(!_o(t))throw Error(d(200));return Ao(null,e,t,!0,n)},Me.hydrateRoot=function(e,t,n){if(!Pa(e))throw Error(d(405));var r=n!=null&&n.hydratedSources||null,o=!1,l="",i=_u;if(n!=null&&(n.unstable_strictMode===!0&&(o=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),t=Tu(t,null,e,1,n??null,o,!1,l,i),e[kt]=t.current,nr(e),r)for(e=0;e<r.length;e++)n=r[e],o=n._getVersion,o=o(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,o]:t.mutableSourceEagerHydrationData.push(n,o);return new Io(t)},Me.render=function(e,t,n){if(!_o(t))throw Error(d(200));return Ao(null,e,t,!1,n)},Me.unmountComponentAtNode=function(e){if(!_o(e))throw Error(d(40));return e._reactRootContainer?(ln(function(){Ao(null,null,e,!1,function(){e._reactRootContainer=null,e[kt]=null})}),!0):!1},Me.unstable_batchedUpdates=va,Me.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!_o(n))throw Error(d(200));if(e==null||e._reactInternals===void 0)throw Error(d(38));return Ao(e,t,n,!1,r)},Me.version="18.3.1-next-f1338f8080-20240426",Me}var zu;function tp(){if(zu)return _a.exports;zu=1;function c(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c)}catch(k){console.error(k)}}return c(),_a.exports=ep(),_a.exports}var Fu;function np(){if(Fu)return Do;Fu=1;var c=tp();return Do.createRoot=c.createRoot,Do.hydrateRoot=c.hydrateRoot,Do}var rp=np();const op=Hu(rp);function Yu(c){return"group"in c}const Qu=[{id:"overview",label:"Overview",icon:"🏠"},{id:"catalog",label:"Block Catalog",icon:"🧩"},{group:"SDK Reference",items:[{id:"factories",label:"Factory Functions",icon:"🏭"},{id:"client-api",label:"JourneyClient API",icon:"⚡"}]},{group:"For AI Agents",items:[{id:"agent-guide",label:"Agent Guide",icon:"🤖"},{id:"mcp-server",label:"MCP Server",icon:"🔌"},{id:"example-journey",label:"Examples",icon:"📝"}]}];function lp(c){const k=[];for(const d of c)Yu(d)?k.push(...d.items):k.push(d);return k}const Yt=[{controlName:"PersonalInformationControl",displayName:"Personal Information",category:"composite",description:"Collects name, email, phone, birth date, and optional company details. Supports private/business/user-defined modes.",hasValue:!0,commonlyUsed:!0,icon:"👤",factory:"createPersonalInformation",valueType:`interface PersonalInformationValue {
  salutation?: string        // 'Mr' | 'Ms' | 'Diverse' | …
  title?: string             // Academic title
  firstName?: string
  lastName?: string
  email?: string
  telephone?: string | null
  birthDate?: Date | string
  customerType?: string      // 'PRIVATE' | 'BUSINESS'
  companyName?: string
  registryCourt?: string
  registerNumber?: string
}`,optionsType:`interface PersonalInformationBlockOptions {
  customerType?: 'PRIVATE' | 'BUSINESS'
  purposeLabels?: string[]   // e.g. ['customer', 'partner']
  title?: string             // Block heading
  required?: boolean
  fields?: {
    salutation?: { required?: boolean; genderType?: string }
    title?: { required?: boolean }
    firstName?: { required?: boolean }
    lastName?: { required?: boolean }
    email?: { required?: boolean }
    telephone?: { required?: boolean }
    birthDate?: { required?: boolean }
    companyName?: { required?: boolean }
    registryCourt?: { required?: boolean }
    registerNumber?: { required?: boolean }
  }
}`,codeExample:`const block = createPersonalInformation({
  name: 'Contact Info',
  required: true,
  options: {
    customerType: 'PRIVATE',
    purposeLabels: ['customer'],
    title: 'Your Details',
    fields: {
      firstName: { required: true },
      lastName: { required: true },
      email: { required: true },
      telephone: {},
    },
  },
})`,wireExample:`{
  "id": "a1b2-...",
  "type": "PersonalInformationControl",
  "scope": "#/properties/Contact Info",
  "options": {
    "showPaper": true,
    "required": true,
    "customerType": "PRIVATE",
    "purposeLabels": ["customer"],
    "fields": {
      "firstName": { "required": true },
      "lastName": { "required": true },
      "email": { "required": true }
    },
    "variablePath": "Contact_Info_Contact_Info"
  }
}`},{controlName:"ContactControl",displayName:"Contact",category:"composite",description:"Collects contact-specific fields: salutation, name, email, confirmation email, phone, birth date. Maps to an epilot Contact entity.",hasValue:!0,commonlyUsed:!0,icon:"📇",factory:"createContact",valueType:`interface ContactValue {
  salutation?: string
  title?: string
  firstName?: string
  lastName?: string
  birthDate?: Date | string
  email?: string
  confirmationEmail?: string
  telephone?: string
}`,optionsType:`interface ContactBlockOptions {
  purpose?: string[]
  title?: string
  required?: boolean
  fields?: {
    salutation?: { required?: boolean; genderType?: string }
    title?: { required?: boolean }
    firstName?: { required?: boolean }
    lastName?: { required?: boolean }
    email?: { required?: boolean }
    confirmationEmail?: { required?: boolean }
    telephone?: { required?: boolean }
    birthDate?: { required?: boolean }
  }
}`,codeExample:`const block = createContact({
  name: 'Contact',
  required: true,
  options: {
    purpose: ['customer'],
    title: 'Contact Information',
    fields: {
      firstName: { required: true },
      lastName: { required: true },
      email: { required: true },
    },
  },
})`,wireExample:`{
  "id": "a1b2-...",
  "type": "ContactControl",
  "scope": "#/properties/Contact",
  "options": {
    "showPaper": true,
    "required": true,
    "purpose": ["customer"],
    "fields": {
      "firstName": { "required": true },
      "lastName": { "required": true },
      "email": { "required": true }
    }
  }
}`},{controlName:"AccountControl",displayName:"Account",category:"composite",description:"Collects business account info: email, phone, company name, tax ID, registry court, register number. Maps to an epilot Account entity.",hasValue:!0,commonlyUsed:!1,icon:"🏢",factory:null,valueType:`interface AccountValue {
  email?: string
  confirmationEmail?: string
  telephone?: string
  companyName?: string
  taxId?: string
  registryCourt?: string
  registerNumber?: string
}`,optionsType:`// CommonBlockOptions
{
  required?: boolean
  disabled?: boolean
  placeholder?: string
  helpText?: string
}`,codeExample:`const block = createBlock('AccountControl', {
  name: 'Company',
  required: true,
  showPaper: true,
})`,wireExample:`{
  "id": "a1b2-...",
  "type": "AccountControl",
  "scope": "#/properties/Company",
  "options": { "showPaper": true, "required": true }
}`},{controlName:"AddressControl",displayName:"Address",category:"composite",description:"Collects a street address with optional autocomplete, map integration, and free-text fallback. Supports delivery/billing tagging and country-specific field rules.",hasValue:!0,commonlyUsed:!0,icon:"📍",factory:"createAddress",valueType:`interface AddressValue {
  countryCode?: string
  city?: string
  zipCode?: string
  suburb?: string | null
  streetName?: string | null
  houseNumber?: string | null
  extension?: string | null
  extention?: string | null   // legacy typo alias
  companyName?: string | null
}`,optionsType:`interface AddressBlockOptions {
  title?: string
  required?: boolean
  fields?: {
    zipCity?: { required?: boolean }
    suburb?: { required?: boolean }
    streetName?: { required?: boolean }
    houseNumber?: { required?: boolean }
    extention?: { required?: boolean }
  }
  countryAddressSettings?: {
    countryCode?: string        // e.g. 'DE'
    enableAutoComplete?: boolean
    enableFreeText?: boolean
  }
  acceptSuggestedOnly?: boolean
  isDelivery?: boolean
  isBilling?: boolean
  related_pi?: string           // link to PI block name
  labels?: string[]
}`,codeExample:`const block = createAddress({
  name: 'Address',
  required: true,
  options: {
    title: 'Delivery Address',
    countryAddressSettings: {
      countryCode: 'DE',
      enableAutoComplete: true,
      enableFreeText: false,
    },
    acceptSuggestedOnly: true,
    fields: {
      zipCity: { required: true },
      streetName: { required: true },
      houseNumber: { required: true },
    },
  },
})`,wireExample:`{
  "id": "a1b2-...",
  "type": "AddressControl",
  "scope": "#/properties/Address",
  "options": {
    "showPaper": true,
    "required": true,
    "countryAddressSettings": {
      "countryCode": "DE",
      "enableAutoComplete": true
    },
    "fields": {
      "zipCity": { "required": true },
      "streetName": { "required": true },
      "houseNumber": { "required": true }
    }
  }
}`},{controlName:"AvailabilityCheckControl",displayName:"Availability Check",category:"composite",description:"Address-based service coverage check using postal code lookup or a coverage file. Blocks journey progression if the address is outside the service area.",hasValue:!0,commonlyUsed:!0,icon:"📡",factory:null,valueType:`interface AvailabilityValue {
  countryCode?: string
  city?: string
  zipCode?: string
  suburb?: string | null
  streetName?: string | null
  streetNumber?: string | null
}`,optionsType:`{
  required?: boolean
  countryAddressSettings?: {
    countryCode?: string
    enableAutoComplete?: boolean
  }
  fields?: {
    zipCity?: { required?: boolean }
  }
}`,codeExample:`const block = createBlock('AvailabilityCheckControl', {
  name: 'availability',
  required: true,
  options: {
    countryAddressSettings: {
      countryCode: 'DE',
      enableAutoComplete: true,
    },
    fields: { zipCity: { required: true } },
  },
})`,wireExample:`{
  "type": "AvailabilityCheckControl",
  "scope": "#/properties/availability",
  "options": {
    "required": true,
    "countryAddressSettings": { "countryCode": "DE" }
  }
}`},{controlName:"EntityLookupControl",displayName:"Entity Finder",category:"composite",description:"Search and select epilot entities by slug with configurable attribute display. Useful for finding existing orders, contracts, or customer records.",hasValue:!0,commonlyUsed:!1,icon:"🔍",factory:null,valueType:`interface EntityFinderValue {
  entity: Record<string, unknown> | null
  slug?: string    // e.g. 'contact', 'order', 'contract'
}`,optionsType:`{
  required?: boolean
  slug?: string
  attributes?: string[]
  searchableAttributes?: string[]
}`,codeExample:`const block = createBlock('EntityLookupControl', {
  name: 'customer',
  label: 'Find Customer',
  options: {
    slug: 'contact',
    searchableAttributes: ['email', 'firstName', 'lastName'],
  },
})`,wireExample:`{
  "type": "EntityLookupControl",
  "scope": "#/properties/customer",
  "options": {
    "slug": "contact",
    "searchableAttributes": ["email", "firstName"]
  }
}`},{controlName:"EntityAttributeControl",displayName:"Entity Attribute",category:"composite",description:"Read/write a specific attribute of an epilot entity. Three modes: entity-based (linked entity), auth-based (logged-in portal user), context-based (journey context).",hasValue:!0,commonlyUsed:!1,icon:"🏷️",factory:null,valueType:`interface EntityAttributeValue {
  oldValue?: unknown
  newValue?: unknown
  entityId?: string
}`,optionsType:`{
  required?: boolean
  mode?: 'entity' | 'auth' | 'context'
  slug?: string
  attribute?: string
  entityId?: string
}`,codeExample:`const block = createBlock('EntityAttributeControl', {
  name: 'customerEmail',
  label: 'Customer Email',
  options: {
    mode: 'auth',
    slug: 'contact',
    attribute: 'email',
  },
})`,wireExample:`{
  "type": "EntityAttributeControl",
  "scope": "#/properties/customerEmail",
  "options": {
    "mode": "auth",
    "slug": "contact",
    "attribute": "email"
  }
}`},{controlName:"CardsControl",displayName:"Cards",category:"composite",description:"Entity cards with configurable content, table view, and selection modes (single, multi, none). Useful for selecting from a list of existing offers or orders.",hasValue:!0,commonlyUsed:!1,icon:"🃏",factory:null,valueType:`interface CardsValue {
  selected?: Array<{ entity_id: string; _schema: string }>
  searchQuery?: string
  page?: number
}`,optionsType:`{
  required?: boolean
  selectionMode?: 'single' | 'multi' | 'none'
  slug?: string
  attributes?: string[]
}`,codeExample:`const block = createBlock('CardsControl', {
  name: 'offers',
  label: 'Select Offer',
  options: {
    selectionMode: 'single',
    slug: 'order',
  },
})`,wireExample:`{
  "type": "CardsControl",
  "scope": "#/properties/offers",
  "options": {
    "selectionMode": "single",
    "slug": "order"
  }
}`},{controlName:"Control",displayName:"Text / Single Choice / Binary",category:"input",description:"Generic control that renders differently based on JSON schema type at the scope path: string → text input, enum → single choice, boolean → toggle. Three factory functions target each mode.",hasValue:!0,commonlyUsed:!0,icon:"✏️",factory:"createTextInput / createSingleChoice",valueType:`type TextInputValue = string | null
type SingleChoiceValue = string | null | undefined
type BinaryInputValue = boolean

// Schema type at scope determines rendering:
// { type: 'string' }  → text input or single choice
// { type: 'boolean' } → binary toggle`,optionsType:`// For text input:
interface TextInputBlockOptions {
  label?: string
  placeholder?: string
  multiline?: boolean
  required?: boolean
}

// For single choice:
interface SingleChoiceBlockOptions {
  uiType?: 'button' | 'radio' | 'dropdown' | 'image'
  // v3 wire format: parallel arrays
  // (factory auto-converts from a choices[] array)
  options?: string[]
  optionsLabels?: string[]
  optionsIcons?: Array<{ name: string } | undefined>
  required?: boolean
}`,codeExample:`// Text input
const notes = createTextInput({
  name: 'Notes',
  label: 'Additional Notes',
  options: { multiline: true, placeholder: 'Enter notes…' },
})

// Single choice (buttons)
const tariff = createSingleChoice({
  name: 'tariff',
  label: 'Select tariff',
  required: true,
  options: {
    uiType: 'button',
    choices: [
      { label: 'Basic', value: 'basic' },
      { label: 'Premium', value: 'premium', icon: 'star' },
    ],
  },
})`,wireExample:`// Wire format uses parallel arrays, NOT choices[]:
{
  "type": "Control",
  "scope": "#/properties/tariff",
  "options": {
    "uiType": "button",
    "options": ["basic", "premium"],
    "optionsLabels": ["Basic", "Premium"],
    "optionsIcons": [undefined, { "name": "star" }],
    "required": true
  }
}`},{controlName:"NumberInputControl",displayName:"Number Input",category:"input",description:"Numeric input with optional unit display, format constraints, min/max range validation, and pre-set suggestion chips.",hasValue:!0,commonlyUsed:!0,icon:"🔢",factory:"createNumberInput",valueType:`interface NumberInputValue {
  numberInput?: string | null   // stored as string despite being numeric
  numberUnit?: string
  frequencyUnit?: string
}`,optionsType:`interface NumberInputBlockOptions {
  unit?: { show: boolean; label: string }
  format?: {
    show?: boolean
    validate?: boolean
    digitsBeforeDecimalPoint?: number
    decimalPlaces?: number
  }
  range?: { min: number; max: number | 'Infinity' }
  suggestions?: Array<{ label: string; value: string }>
  required?: boolean
}`,codeExample:`const block = createNumberInput({
  name: 'Consumption',
  label: 'Annual Consumption',
  required: true,
  unit: { show: true, label: 'kWh' },
  range: { min: 0, max: 100000 },
  suggestions: [
    { label: 'Avg 1-person', value: '1500' },
    { label: 'Avg 2-person', value: '2500' },
    { label: 'Avg 4-person', value: '4000' },
  ],
})`,wireExample:`// Note: options are nested under fields.numberInput
{
  "type": "NumberInputControl",
  "scope": "#/properties/Consumption",
  "options": {
    "fields": {
      "numberInput": {
        "unit": { "show": true, "label": "kWh" },
        "range": { "min": 0, "max": 100000 },
        "label": "Annual Consumption"
      }
    },
    "suggestions": [
      { "label": "Avg 1-person", "value": "1500" }
    ]
  }
}`},{controlName:"DatePickerControl",displayName:"Date Picker",category:"input",description:"Date or date range picker with optional time selection, day-of-week restrictions, and configurable start/end date fields.",hasValue:!0,commonlyUsed:!0,icon:"📅",factory:"createDatePicker",valueType:`interface DatePickerValue {
  startDate?: Date | string | null
  endDate?: Date | string | null
}`,optionsType:`interface DatePickerBlockOptions {
  fields?: {
    startDate?: { display: boolean; required?: boolean }
    endDate?: { display: boolean; required?: boolean }
  }
  disableDays?: number[]     // 0=Sun … 6=Sat
  showTime?: boolean
  timeIntervals?: number     // e.g. 30 (minutes)
  required?: boolean
}`,codeExample:`const block = createDatePicker({
  name: 'moveDate',
  label: 'Moving Date',
  required: true,
  options: {
    showTime: false,
    disableDays: [0, 6],   // no weekends
    fields: {
      startDate: { display: true, required: true },
      endDate: { display: false },
    },
  },
})`,wireExample:`{
  "type": "DatePickerControl",
  "scope": "#/properties/moveDate",
  "options": {
    "required": true,
    "showTime": false,
    "disableDays": [0, 6],
    "fields": {
      "startDate": { "display": true, "required": true },
      "endDate": { "display": false }
    }
  }
}`},{controlName:"BooleanControl",displayName:"Binary / Toggle",category:"input",description:"Yes/no boolean toggle rendered as a switch or checkbox.",hasValue:!0,commonlyUsed:!0,icon:"🔘",factory:"createBinaryInput",valueType:"type BinaryInputValue = boolean",optionsType:`{
  required?: boolean
  disabled?: boolean
  helpText?: string
  label?: string
}`,codeExample:`const block = createBinaryInput({
  name: 'newsletter',
  label: 'Subscribe to newsletter',
})`,wireExample:`{
  "type": "BooleanControl",
  "scope": "#/properties/newsletter",
  "options": { "showPaper": false }
}`},{controlName:"MultichoiceControl",displayName:"Multiple Choice",category:"input",description:"Multi-select from a set of choices. Rendered as checkboxes, toggle buttons, or image cards. Uses v3 parallel arrays in wire format.",hasValue:!0,commonlyUsed:!0,icon:"☑️",factory:"createMultipleChoice",valueType:"type MultipleChoiceValue = string[] | null | undefined",optionsType:`interface MultipleChoiceBlockOptions {
  uiType?: 'checkbox' | 'button' | 'image'
  maxSelection?: number | 'Infinity'
  // v3 wire format: parallel arrays
  // (factory auto-converts from choices[])
  options?: string[]
  optionsLabels?: string[]
  optionsIcons?: Array<{ name: string } | undefined>
  required?: boolean
}`,codeExample:`const block = createMultipleChoice({
  name: 'interests',
  label: 'Select your interests',
  options: {
    uiType: 'checkbox',
    maxSelection: 3,
    choices: [
      { label: 'Solar', value: 'solar', icon: 'sun' },
      { label: 'Wind', value: 'wind', icon: 'wind' },
      { label: 'Gas', value: 'gas' },
    ],
  },
})`,wireExample:`// Choices expanded to parallel arrays:
{
  "type": "MultichoiceControl",
  "scope": "#/properties/interests",
  "options": {
    "uiType": "checkbox",
    "maxSelection": 3,
    "options": ["solar", "wind", "gas"],
    "optionsLabels": ["Solar", "Wind", "Gas"],
    "optionsIcons": [
      { "name": "sun" },
      { "name": "wind" },
      undefined
    ]
  }
}`},{controlName:"ConsentsControl",displayName:"Consents",category:"input",description:"GDPR/terms consent checkboxes. Each item has configurable topics (GTC, EMAIL_MARKETING, DATA_USAGE, etc.), required flag, and markdown text with links.",hasValue:!0,commonlyUsed:!0,icon:"✅",factory:"createConsents",valueType:`interface ConsentsValue {
  [consentItemId: string]: {
    agreed: boolean
    topic: string
    text: string | null
    time: Date
  }
}`,optionsType:`interface ConsentsBlockOptions {
  items?: Record<string, {
    required: boolean
    topics: string[]   // 'GTC' | 'DATA_USAGE' | 'EMAIL_MARKETING' | …
    text?: string | null
    order: number
  }>
  required?: boolean
}`,codeExample:`const block = createConsents({
  name: 'consents',
  label: 'Terms & Conditions',
  required: true,
  options: {
    items: {
      'gtc': {
        required: true,
        topics: ['GTC'],
        text: 'I agree to the [Terms & Conditions](https://example.com/terms)',
        order: 0,
      },
      'marketing': {
        required: false,
        topics: ['EMAIL_MARKETING'],
        text: 'I would like to receive marketing emails',
        order: 1,
      },
    },
  },
})`,wireExample:`{
  "type": "ConsentsControl",
  "scope": "#/properties/consents",
  "options": {
    "required": true,
    "items": {
      "gtc": {
        "required": true,
        "topics": ["GTC"],
        "text": "I agree to the [Terms](https://…)",
        "order": 0
      }
    }
  }
}`},{controlName:"UploadPanelControl",displayName:"File Upload",category:"input",description:"Drag-and-drop file upload with MIME type restrictions, max quantity, and auto-tagging. Files are stored in epilot S3.",hasValue:!0,commonlyUsed:!0,icon:"📎",factory:"createFileUpload",valueType:`interface FileUploadValue {
  files?: Array<{
    filename?: string
    s3ref?: { bucket: string; key: string }
    contentType?: string
    size?: number
  }>
}`,optionsType:`interface FileUploadBlockOptions {
  maxQuantity?: number
  restricted?: boolean
  supportedTypes?: string[]  // 'PDF' | 'Image' | 'Video' | 'CSV' | …
  tags?: string[]            // auto-applied tags
  zoneLabel?: string
  required?: boolean
}`,codeExample:`const block = createFileUpload({
  name: 'documents',
  label: 'Upload Documents',
  options: {
    maxQuantity: 5,
    supportedTypes: ['PDF', 'Image'],
    tags: ['contract-document'],
    zoneLabel: 'Drop files here or click to browse',
  },
})`,wireExample:`{
  "type": "UploadPanelControl",
  "scope": "#/properties/documents",
  "options": {
    "maxQuantity": 5,
    "supportedTypes": ["PDF", "Image"],
    "tags": ["contract-document"]
  }
}`},{controlName:"DigitalSignatureControl",displayName:"Digital Signature",category:"input",description:"Signature pad for capturing digital signatures. Value is stored as a Blob URL.",hasValue:!0,commonlyUsed:!1,icon:"✍️",factory:null,valueType:`interface SignatureValue {
  value?: string   // Blob URL of the signature image
}`,optionsType:"{ required?: boolean; disabled?: boolean }",codeExample:`const block = createBlock('DigitalSignatureControl', {
  name: 'signature',
  label: 'Customer Signature',
  required: true,
})`,wireExample:`{
  "type": "DigitalSignatureControl",
  "scope": "#/properties/signature",
  "options": { "required": true }
}`},{controlName:"InputCalculatorControl",displayName:"Input Calculator",category:"input",description:"Device consumption calculator. Users select devices (gas appliances, power equipment, etc.) and the block calculates total energy consumption.",hasValue:!0,commonlyUsed:!1,icon:"🧮",factory:null,valueType:`interface InputCalculatorValue {
  numberInput?: string | null
  numberUnit?: string
  frequencyUnit?: string
  devices?: Array<{
    name: string | null
    otherName?: string | null
    quantity: string
    unitaryConsumption: string
    consumption?: string
  }>
}`,optionsType:`{
  required?: boolean
  factors?: 'gas' | 'power' | 'water'
}`,codeExample:`const block = createBlock('InputCalculatorControl', {
  name: 'consumption',
  label: 'Calculate your consumption',
  options: { factors: 'power' },
})`,wireExample:`{
  "type": "InputCalculatorControl",
  "scope": "#/properties/consumption",
  "options": { "factors": "power" }
}`},{controlName:"MeterReadingControl",displayName:"Meter Reading",category:"input",description:"Meter reading entry with counter type selection (one-tariff, two-tariff, bidirectional). Captures MALO ID, meter ID, type, read-by, date, value, and reason.",hasValue:!0,commonlyUsed:!1,icon:"⚡",factory:null,valueType:`interface MeterReadingValue {
  maloId?: string
  meterId?: string
  meterType?: string      // 'ONE_TARIFF' | 'TWO_TARIFF' | 'BIDIRECTIONAL'
  readBy?: string
  readingDate?: Date | string | null
  readingValue?: number | null
  reason?: string         // 'MOVE' | 'TERMINATION' | 'CONTRACT_START'
}`,optionsType:"{ required?: boolean; meterTypes?: string[] }",codeExample:`const block = createBlock('MeterReadingControl', {
  name: 'meterReading',
  label: 'Meter Reading',
  required: true,
})`,wireExample:`{
  "type": "MeterReadingControl",
  "scope": "#/properties/meterReading",
  "options": { "required": true }
}`},{controlName:"PreviousProviderControl",displayName:"Previous Provider",category:"input",description:"Energy provider lookup with BDEW code resolution for Germany. Typeahead search with provider list. Can restrict to suggestions-only mode.",hasValue:!0,commonlyUsed:!1,icon:"🏭",factory:null,valueType:`interface PreviousProviderValue {
  company_name: string
  bdew_code?: string    // 13-digit BDEW market partner code
}`,optionsType:"{ required?: boolean; restrictToSuggestions?: boolean }",codeExample:`const block = createBlock('PreviousProviderControl', {
  name: 'previousProvider',
  label: 'Previous Energy Provider',
  required: true,
})`,wireExample:`{
  "type": "PreviousProviderControl",
  "scope": "#/properties/previousProvider",
  "options": { "required": true }
}`},{controlName:"ContractStartDateControl",displayName:"Contract Start Date",category:"input",description:"Contract start date picker with termination requirement flag and configurable start date types (earliest possible, specific date, etc.).",hasValue:!0,commonlyUsed:!1,icon:"📋",factory:null,valueType:`interface ContractStartDateValue {
  type?: string          // 'ASAP' | 'SPECIFIC_DATE' | …
  startDate: string | null
  requiresTermination?: boolean
}`,optionsType:"{ required?: boolean; dateTypes?: string[] }",codeExample:`const block = createBlock('ContractStartDateControl', {
  name: 'contractStart',
  label: 'Contract Start Date',
  required: true,
})`,wireExample:`{
  "type": "ContractStartDateControl",
  "scope": "#/properties/contractStart",
  "options": { "required": true }
}`},{controlName:"ProductSelectionControl",displayName:"Product Selection",category:"commerce",description:"Product tiles with pricing, features, and selection modes (one, each-1, each-n). Supports epilot catalog and external catalogs. Most commonly used commerce block.",hasValue:!0,commonlyUsed:!0,icon:"🛒",factory:"createProductSelection",valueType:`interface ProductValue {
  // Dynamic: keyed by product/price combination
  [key: string]: unknown
}`,optionsType:`interface ProductBlockOptions {
  catalog?: 'epilot' | 'external'
  productsType?: 'static' | 'cross-selling-all' | 'cross-selling-selected'
  products?: Array<{
    productId: string
    priceId: string
    isFeatured?: boolean
  }>
  selection?: 'one' | 'each-1' | 'each-n'
  alignment?: 'center' | 'left' | 'evenly-distributed'
  required?: boolean
}`,codeExample:`const block = createProductSelection({
  name: 'products',
  label: 'Choose your plan',
  required: true,
  options: {
    catalog: 'epilot',
    productsType: 'static',
    selection: 'one',
    products: [
      { productId: 'prod-basic', priceId: 'price-monthly' },
      { productId: 'prod-pro', priceId: 'price-monthly', isFeatured: true },
    ],
  },
})`,wireExample:`{
  "type": "ProductSelectionControl",
  "scope": "#/properties/products",
  "options": {
    "catalog": "epilot",
    "productsType": "static",
    "selection": "one",
    "products": [
      { "productId": "prod-basic", "priceId": "price-monthly" },
      { "productId": "prod-pro", "priceId": "price-monthly", "isFeatured": true }
    ]
  }
}`},{controlName:"PaymentControl",displayName:"Payment Method",category:"commerce",description:"Payment method selector supporting Bank Transfer (invoice) and SEPA Direct Debit with IBAN validation. Configurable per implementation type.",hasValue:!0,commonlyUsed:!0,icon:"💳",factory:"createPaymentMethod",valueType:`interface PaymentMethodValue {
  type: 'payment_invoice' | 'payment_sepa'
  label?: string | null
  data?: {
    fullname?: string
    iban?: string
    consent?: boolean
    bic_number?: string
    bank_name?: string
  }
}`,optionsType:`interface PaymentBlockOptions {
  initialType?: 'BankTransfer' | 'SEPA'
  title?: string
  implementations?: Array<{
    show?: boolean
    type: 'BankTransfer' | 'SEPA'
    label: string | null
    componentProps?: Record<string, unknown>
  }>
  required?: boolean
}`,codeExample:`const block = createPaymentMethod({
  name: 'payment',
  label: 'Payment Method',
  required: true,
  options: {
    implementations: [
      { type: 'SEPA', label: 'SEPA Direct Debit', show: true },
      { type: 'BankTransfer', label: 'Invoice', show: true },
    ],
  },
})`,wireExample:`{
  "type": "PaymentControl",
  "scope": "#/properties/payment",
  "options": {
    "showPaper": true,
    "required": true,
    "implementations": [
      { "type": "SEPA", "label": "SEPA Direct Debit", "show": true },
      { "type": "BankTransfer", "label": "Invoice", "show": true }
    ]
  }
}`},{controlName:"ShopCartControl",displayName:"Shopping Cart",category:"commerce",description:"Displays selected products, pricing breakdown, and components. Read-only display block that reacts to ProductSelection changes — no value submitted.",hasValue:!1,commonlyUsed:!0,icon:"🛍️",factory:"createShoppingCart",valueType:"// No value — display block only",optionsType:`{
  cartTitle?: string
  cartFootnote?: string
}`,codeExample:`const block = createShoppingCart('cart', {
  cartTitle: 'Your Order',
  cartFootnote: '* Prices include VAT',
})`,wireExample:`{
  "type": "ShopCartControl",
  "scope": "#/properties/cart",
  "options": {
    "cartTitle": "Your Order",
    "cartFootnote": "* Prices include VAT"
  }
}`},{controlName:"ProductCategoryControl",displayName:"Product Categories",category:"commerce",description:"Filters products by category on linked product selection blocks. Purely a UI filter — no value submitted.",hasValue:!1,commonlyUsed:!1,icon:"🗂️",factory:null,valueType:"// No value — display/filter block only",optionsType:"{ required?: boolean }",codeExample:`const block = createBlock('ProductCategoryControl', {
  name: 'category',
  options: {},
})`,wireExample:`{
  "type": "ProductCategoryControl",
  "scope": "#/properties/category",
  "options": {}
}`},{controlName:"ProductRecommendationsControl",displayName:"Product Recommendations",category:"commerce",description:"Shows product recommendations based on contract or recommendation entity IDs. AI/contract-based product matching.",hasValue:!0,commonlyUsed:!1,icon:"💡",factory:null,valueType:"Record<string, unknown>",optionsType:"{ contractIds?: string[]; required?: boolean }",codeExample:`const block = createBlock('ProductRecommendationsControl', {
  name: 'recommendations',
  options: { contractIds: ['contract-1'] },
})`,wireExample:`{
  "type": "ProductRecommendationsControl",
  "scope": "#/properties/recommendations",
  "options": {}
}`},{controlName:"Label",displayName:"Paragraph",category:"display",description:"Rich text content block. Text is stored as UTF-16LE base64-encoded. The factory handles encoding automatically — just pass plain text.",hasValue:!1,commonlyUsed:!0,icon:"📄",factory:"createParagraph",valueType:"// No value — display block only",optionsType:`// No options object.
// Text goes to the top-level 'text' field (base64)`,codeExample:`// createParagraph handles base64 encoding automatically
const block = createParagraph(
  'intro',
  'Welcome! Please fill out your details below.',
)`,wireExample:`// Note: 'text' is at top level, NOT inside options
{
  "type": "Label",
  "scope": "#/properties/intro",
  "text": "VwBlAGwAYwBvAG0AZQ..."  // UTF-16LE base64
}`},{controlName:"ImageControl",displayName:"Image",category:"display",description:"Image display block with alt text, responsive width (100%/50%/30%), and automatic aspect ratio preservation.",hasValue:!1,commonlyUsed:!0,icon:"🖼️",factory:"createImage",valueType:"// No value — display block only",optionsType:`{
  url: string
  altText?: string
  width?: '100%' | '50%' | '30%'
}`,codeExample:`const block = createImage('banner', 'https://cdn.example.com/banner.png', {
  altText: 'Company banner',
  width: '100%',
})`,wireExample:`{
  "type": "ImageControl",
  "scope": "#/properties/banner",
  "options": {
    "url": "https://cdn.example.com/banner.png",
    "altText": "Company banner",
    "width": "100%"
  }
}`},{controlName:"SummaryControl",displayName:"Summary",category:"display",description:"Review block showing data collected from other blocks in a read-only view. Optional title overrides per referenced block.",hasValue:!1,commonlyUsed:!0,icon:"📋",factory:"createSummary",valueType:"// No value — display block only",optionsType:`{
  blocksInSummary?: Record<string, unknown>
  subTitle?: string
  fields?: unknown[]
}`,codeExample:`const block = createSummary('Summary', {
  subTitle: 'Review your order before submitting',
})`,wireExample:`{
  "type": "SummaryControl",
  "scope": "#/properties/Summary",
  "options": {
    "showPaper": true,
    "blocksInSummary": {},
    "subTitle": "Review your order before submitting",
    "fields": []
  }
}`},{controlName:"GroupLayout",displayName:"Group",category:"display",description:"Visual grouping container for child blocks. Renders a card with a title wrapping nested blocks. Cannot be nested inside another GroupLayout.",hasValue:!1,commonlyUsed:!0,icon:"📐",factory:null,valueType:"// No value — layout container only",optionsType:`{
  label?: string
  elements?: UISchemaElement[]
}`,codeExample:`const group = {
  type: 'GroupLayout',
  label: 'Contact Details',
  elements: [
    createTextInput({ name: 'firstName', label: 'First Name' }),
    createTextInput({ name: 'lastName', label: 'Last Name' }),
  ],
}`,wireExample:`{
  "type": "GroupLayout",
  "label": "Contact Details",
  "elements": [
    { "type": "Control", "scope": "#/properties/firstName" },
    { "type": "Control", "scope": "#/properties/lastName" }
  ]
}`},{controlName:"SecondaryActionBarControl",displayName:"Hyperlinks",category:"display",description:"Renders a list of clickable hyperlinks with labels. Used as a secondary action bar.",hasValue:!1,commonlyUsed:!1,icon:"🔗",factory:null,valueType:"// No value — display block only",optionsType:`{
  links?: Array<{ label: string; url: string }>
}`,codeExample:`const block = createBlock('SecondaryActionBarControl', {
  name: 'links',
  options: {
    links: [
      { label: 'Privacy Policy', url: 'https://example.com/privacy' },
    ],
  },
})`,wireExample:`{
  "type": "SecondaryActionBarControl",
  "scope": "#/properties/links",
  "options": {
    "links": [{ "label": "Privacy Policy", "url": "https://…" }]
  }
}`},{controlName:"ActionBarControl",displayName:"Action Bar",category:"navigation",description:'Navigation bar with CTA button, optional back button, and up to 4 inline consent checkboxes. Use actionType "SubmitAndGoNext" on the final step.',hasValue:!1,commonlyUsed:!0,icon:"▶️",factory:"createActionBar",valueType:"// No value — navigation block only",optionsType:`{
  ctaButton: {
    actionType: 'GoNext' | 'SubmitAndGoNext'
    isVisible: boolean
    label: string
  }
  goBackButton: {
    actionType: 'GoBack'
    label: string
    isVisible: boolean
  }
  consents?: Array<{
    name: string
    isRequired: boolean
    isVisible: boolean
    text: string | null
  }>
}`,codeExample:`// Simple "Next" button
const next = createActionBar('Next', { label: 'Continue' })

// Submit with inline consent
const submit = createActionBar('Action bar', {
  label: 'Submit',
  actionType: 'SubmitAndGoNext',
  showBack: true,
  consents: [{
    name: 'first_consent',
    isRequired: true,
    isVisible: true,
    text: 'I agree to the [Privacy Policy](https://example.com)',
  }],
})`,wireExample:`{
  "type": "ActionBarControl",
  "scope": "#/properties/Action bar",
  "options": {
    "showPaper": false,
    "ctaButton": {
      "actionType": "SubmitAndGoNext",
      "isVisible": true,
      "label": "Submit"
    },
    "goBackButton": {
      "actionType": "GoBack",
      "label": "Back",
      "isVisible": true
    },
    "consents": [{
      "name": "first_consent",
      "isRequired": true,
      "isVisible": true,
      "text": "I agree to the [Privacy Policy](https://…)"
    }]
  }
}`},{controlName:"ConfirmationMessageControl",displayName:"Success Message",category:"navigation",description:"Success/thank-you message shown after submission. Configurable title, body text, icon, and optional close/CTA button. Always the last block on the last step.",hasValue:!1,commonlyUsed:!0,icon:"🎉",factory:"createSuccessMessage",valueType:"// No value — navigation block only",optionsType:`{
  title?: string
  text?: string
  icon?: string           // e.g. 'check-circle-fill'
  showCloseButton?: boolean
  closeButtonText?: string
}`,codeExample:`const block = createSuccessMessage('Thank you', {
  title: 'Thank you for your inquiry!',
  text: 'Our team will contact you within 24 hours.',
  icon: 'check-circle-fill',
  closeButtonText: 'Back to Homepage',
})`,wireExample:`{
  "type": "ConfirmationMessageControl",
  "scope": "#/properties/Thank you",
  "options": {
    "title": "Thank you!",
    "text": "Our team will contact you within 24 hours.",
    "icon": "check-circle-fill",
    "showCloseButton": true,
    "closeButtonText": "Back to Homepage"
  }
}`},{controlName:"AuthControl",displayName:"Authentication",category:"utility",description:"Sign-in / sign-up / skip authentication flow for portal users. Required for private journeys or when personalizing content based on the logged-in user.",hasValue:!0,commonlyUsed:!1,icon:"🔐",factory:null,valueType:"Record<string, unknown>  // auth session data",optionsType:"{ required?: boolean; allowSkip?: boolean; redirectUrl?: string }",codeExample:`const block = createBlock('AuthControl', {
  name: 'auth',
  options: { allowSkip: false },
})`,wireExample:`{
  "type": "AuthControl",
  "scope": "#/properties/auth",
  "options": { "allowSkip": false }
}`},{controlName:"PdfSummaryControl",displayName:"PDF Generator",category:"utility",description:"Generates a PDF from a DocX template with journey submission data and displays a download link. Configured with a template file ID.",hasValue:!1,commonlyUsed:!1,icon:"📑",factory:null,valueType:"// No value — utility block only",optionsType:`{
  templateFileId?: string
  fileName?: string
}`,codeExample:`const block = createBlock('PdfSummaryControl', {
  name: 'contractPdf',
  options: {
    templateFileId: 'template-abc-123',
    fileName: 'Contract.pdf',
  },
})`,wireExample:`{
  "type": "PdfSummaryControl",
  "scope": "#/properties/contractPdf",
  "options": {
    "templateFileId": "template-abc-123",
    "fileName": "Contract.pdf"
  }
}`},{controlName:"PVRoofPlannerControl",displayName:"PV Rooftop Planner",category:"utility",description:"Solar panel roof planner. Captures roof coordinates, panel count, lifetime, CO2 savings, and sunshine hours via an interactive map.",hasValue:!0,commonlyUsed:!1,icon:"☀️",factory:null,valueType:`interface PVRooftopValue {
  coordinates: string | undefined
  maxArrayAreaMeters2?: number
  maxSunshineHoursPerYear?: number
  solarPanelsUserCount?: number
  panelLifetimeYears?: number
  co2Savings?: number
  maxArrayPanelsCount?: number
}`,optionsType:"{ required?: boolean }",codeExample:`const block = createBlock('PVRoofPlannerControl', {
  name: 'roofPlanner',
  label: 'Plan Your Solar Installation',
  required: true,
})`,wireExample:`{
  "type": "PVRoofPlannerControl",
  "scope": "#/properties/roofPlanner",
  "options": { "required": true }
}`},{controlName:"JourneyLauncherControl",displayName:"Journey Launcher",category:"utility",description:"Launches sub-journeys from within a parent journey. Used in launcher-type journeys to present multiple journey options.",hasValue:!1,commonlyUsed:!1,icon:"🚀",factory:null,valueType:"// No value — navigation block only",optionsType:`{
  journeyIds?: string[]
  launchMode?: 'inline' | 'redirect'
}`,codeExample:`const block = createBlock('JourneyLauncherControl', {
  name: 'launcher',
  options: {
    journeyIds: ['journey-1', 'journey-2'],
    launchMode: 'inline',
  },
})`,wireExample:`{
  "type": "JourneyLauncherControl",
  "scope": "#/properties/launcher",
  "options": {
    "journeyIds": ["journey-1"],
    "launchMode": "inline"
  }
}`},{controlName:"DynamicMeterReadingControl",displayName:"Dynamic Meter Reading",category:"utility",description:"Enhanced meter reading with entity-updating capabilities. Dynamically fetches meter data from existing epilot entities.",hasValue:!0,commonlyUsed:!1,icon:"⚡",factory:null,valueType:`interface MeterReadingValue {
  maloId?: string
  meterId?: string
  meterType?: string
  readBy?: string
  readingDate?: Date | string | null
  readingValue?: number | null
  reason?: string
}`,optionsType:"{ required?: boolean; entitySlug?: string }",codeExample:`const block = createBlock('DynamicMeterReadingControl', {
  name: 'meterReading',
  label: 'Meter Reading',
  required: true,
  options: { entitySlug: 'meter' },
})`,wireExample:`{
  "type": "DynamicMeterReadingControl",
  "scope": "#/properties/meterReading",
  "options": { "required": true, "entitySlug": "meter" }
}`},{controlName:"AppBlockControl",displayName:"App Block",category:"third-party",description:"Renders an installed epilot app inside the journey. Configured with appId, componentId, and arbitrary args. Replaces CustomBlock.",hasValue:!0,commonlyUsed:!1,icon:"📦",factory:null,valueType:"Record<string, unknown>  // app-defined value shape",optionsType:`{
  appId?: string
  componentId?: string
  args?: Record<string, string>
}`,codeExample:`const block = createBlock('AppBlockControl', {
  name: 'calendly',
  options: {
    appId: 'calendly-app',
    componentId: 'booking-widget',
    args: { eventUrl: 'https://calendly.com/my-event' },
  },
})`,wireExample:`{
  "type": "AppBlockControl",
  "scope": "#/properties/calendly",
  "options": {
    "appId": "calendly-app",
    "componentId": "booking-widget",
    "args": { "eventUrl": "https://calendly.com/my-event" }
  }
}`},{controlName:"CustomBlockControl",displayName:"Custom Block (Legacy)",category:"third-party",description:"Custom web component rendered via tag name and bundle URL. Deprecated — use AppBlockControl for new integrations.",hasValue:!0,commonlyUsed:!1,deprecated:!0,icon:"🔧",factory:null,valueType:"Record<string, unknown>",optionsType:`{
  tagName?: string
  bundleUrl?: string
  args?: Record<string, string>
}`,codeExample:`const block = createBlock('CustomBlockControl', {
  name: 'customWidget',
  options: {
    tagName: 'my-custom-block',
    bundleUrl: 'https://cdn.example.com/block.js',
    args: { theme: 'dark' },
  },
})`,wireExample:`{
  "type": "CustomBlockControl",
  "scope": "#/properties/customWidget",
  "options": {
    "tagName": "my-custom-block",
    "bundleUrl": "https://cdn.example.com/block.js"
  }
}`}],Ba=["input","composite","commerce","display","navigation","utility","third-party"],Oa={input:"Input",composite:"Composite",commerce:"Commerce",display:"Display",navigation:"Navigation",utility:"Utility","third-party":"Third-party"},La={input:"✏️",composite:"🧩",commerce:"💰",display:"👁️",navigation:"🧭",utility:"⚙️","third-party":"🔌"},Ma={input:{bg:"bg-blue-50",text:"text-blue-700",border:"border-blue-100"},composite:{bg:"bg-emerald-50",text:"text-emerald-700",border:"border-emerald-100"},commerce:{bg:"bg-amber-50",text:"text-amber-700",border:"border-amber-100"},display:{bg:"bg-purple-50",text:"text-purple-700",border:"border-purple-100"},navigation:{bg:"bg-teal-50",text:"text-teal-700",border:"border-teal-100"},utility:{bg:"bg-gray-50",text:"text-gray-600",border:"border-gray-200"},"third-party":{bg:"bg-red-50",text:"text-red-700",border:"border-red-100"}},Vu=[{name:"new JourneyClient",group:"journey",alpha:!0,signature:"new JourneyClient({ auth, apiUrl? })",description:"Creates a headless client. Pass a static token string or an async getter function for token refresh.",returns:"JourneyClient instance",example:`import { JourneyClient } from '@epilot/epilot-journey-sdk'

// Static token
const client = new JourneyClient({ auth: 'your-api-token' })

// Async token getter (for token refresh)
const client = new JourneyClient({
  auth: async () => getAccessToken(),
  apiUrl: 'https://journey-config.dev.sls.epilot.io',
})`},{name:"getJourney",group:"journey",signature:"client.getJourney(id: string): Promise<JourneyRaw>",description:"Fetch the full configuration of a journey by UUID. Returns the complete JourneyRaw object with steps, schema, and uischema.",returns:"Promise<JourneyRaw>",example:`const journey = await client.getJourney('509cdffe-424f-457a-95c2-9708c304ce77')
console.log(journey.name)          // 'Energy Contract Signup'
console.log(journey.steps.length)  // 4`},{name:"searchJourneys",group:"journey",signature:"client.searchJourneys(options?: { query, from, size, sort }): Promise<unknown[]>",description:"Search journeys by name with pagination. Defaults to wildcard query (*), 25 results, sorted by creation date descending.",returns:"Promise<unknown[]>",example:`const results = await client.searchJourneys({ query: 'contact', size: 5 })
results.forEach((j: any) => console.log(j.journey_name))`},{name:"createJourney",group:"journey",signature:"client.createJourney(payload: Record<string, unknown>): Promise<JourneyRaw>",description:"Create a new journey from a payload. Best used together with the createJourney() factory function which builds a valid payload from steps.",returns:"Promise<JourneyRaw> — includes the assigned journeyId",example:`const payload = createJourney({
  organizationId: 'org-123',
  name: 'Energy Contract Signup',
  steps: [ /* createStep() results */ ],
})

const created = await client.createJourney(payload)
console.log(created.journeyId)`},{name:"updateJourney",group:"journey",signature:"client.updateJourney(journey: JourneyRaw): Promise<void>",description:"Fully replace a journey's configuration (PUT semantics). Typically used after fetching, modifying, and re-saving.",returns:"Promise<void>",example:`const journey = await client.getJourney('journey-id')
journey.name = 'Updated Name'
await client.updateJourney(journey)`},{name:"patchJourney",group:"journey",signature:"client.patchJourney(id: string, patch: Record<string, unknown>): Promise<JourneyRaw>",description:"Partially update a journey. Supports nested property paths in the patch keys, e.g. steps[0].uischema. More efficient than a full update.",returns:"Promise<JourneyRaw>",example:`// Update just the journey name
await client.patchJourney('journey-id', { name: 'New Name' })

// Update a nested step uischema
await client.patchJourney('journey-id', {
  'steps[0].uischema': newUischema,
})`},{name:"deleteJourney",group:"journey",signature:"client.deleteJourney(id: string): Promise<void>",description:"Delete a journey by UUID.",returns:"Promise<void>",example:"await client.deleteJourney('journey-id')"},{name:"getBlocks",group:"block",alpha:!0,signature:"client.getBlocks(journey: JourneyRaw): Array<{ stepIndex: number; block: UISchemaElement }>",description:"Returns all blocks across all steps, each tagged with its stepIndex. Does not make an API call — pass an already-fetched journey.",returns:"Array<{ stepIndex: number; block: UISchemaElement }>",example:"const journey = await client.getJourney('journey-id')\nconst blocks = client.getBlocks(journey)\n\nblocks.forEach(({ stepIndex, block }) => {\n  console.log(`Step ${stepIndex}: ${block.type} — ${block.label}`)\n})"},{name:"getStepBlocks",group:"block",alpha:!0,signature:"client.getStepBlocks(journey: JourneyRaw, stepIndex: number): UISchemaElement[]",description:"Returns all blocks from a specific step by zero-based index. Does not make an API call.",returns:"UISchemaElement[]",example:`const journey = await client.getJourney('journey-id')
const step0Blocks = client.getStepBlocks(journey, 0)
console.log(step0Blocks.map(b => b.type))`},{name:"getBlock",group:"block",alpha:!0,signature:"client.getBlock(id: string, ref: BlockRef): Promise<UISchemaElement | undefined>",description:"Fetch a journey and locate a specific block by step index and block name (scope path). Returns undefined if not found.",returns:"Promise<UISchemaElement | undefined>",example:`const block = await client.getBlock('journey-id', {
  stepIndex: 0,
  blockName: '#/properties/email',
})
if (block) {
  console.log(block.label, block.options)
}`},{name:"patchBlock",group:"block",alpha:!0,signature:"client.patchBlock(id: string, ref: BlockRef, patch: Partial<UISchemaElement>): Promise<JourneyRaw>",description:"Fetch the journey, locate the block, merge the patch into it, and save via the patch API. Only the affected step's uischema is sent.",returns:"Promise<JourneyRaw>",example:`await client.patchBlock('journey-id', {
  stepIndex: 0,
  blockName: '#/properties/email',
}, {
  label: 'Work Email',
  options: { required: true },
})`},{name:"addBlock",group:"block",alpha:!0,signature:"client.addBlock(id: string, stepIndex: number, block: UISchemaElement, position?: number): Promise<JourneyRaw>",description:"Add a block to a step at the given position (or at the end if omitted) and persist via the patch API.",returns:"Promise<JourneyRaw>",example:`await client.addBlock('journey-id', 0,
  createTextInput({ name: 'phone', label: 'Phone Number' }),
)`},{name:"removeBlock",group:"block",alpha:!0,signature:"client.removeBlock(id: string, ref: BlockRef): Promise<JourneyRaw>",description:"Remove a block from a journey step and persist via the patch API. Returns the journey unchanged if the block is not found.",returns:"Promise<JourneyRaw>",example:`await client.removeBlock('journey-id', {
  stepIndex: 0,
  blockName: '#/properties/fax',
})`},{name:"getSteps",group:"step",alpha:!0,signature:"client.getSteps(id: string): Promise<StepConfig[]>",description:"Fetch all steps from a journey.",returns:"Promise<StepConfig[]>",example:"const steps = await client.getSteps('journey-id')\nsteps.forEach((step, i) => console.log(`Step ${i}: ${step.name}`))"},{name:"getStep",group:"step",alpha:!0,signature:"client.getStep(id: string, stepIndex: number): Promise<StepConfig | undefined>",description:"Fetch a specific step by zero-based index.",returns:"Promise<StepConfig | undefined>",example:`const step = await client.getStep('journey-id', 2)
console.log(step?.name, step?.title)`}],Bo=[{name:"createBlock",alpha:!0,producesType:"Any block",description:"Low-level factory that creates any block type by control name. Use typed factories when available.",signature:"createBlock(type: ControlNameValue, opts: CreateBlockOptions): UISchemaElement",example:`const block = createBlock('AccountControl', {
  name: 'company',
  label: 'Company Details',
  required: true,
  showPaper: true,
})`},{name:"createTextInput",alpha:!0,producesType:"Control (text)",description:"Creates a free-form text input block.",signature:"createTextInput(opts: CreateBlockOptions): UISchemaElement",example:`const block = createTextInput({
  name: 'notes',
  label: 'Additional Notes',
  options: { multiline: true, placeholder: 'Enter notes…' },
})`},{name:"createSingleChoice",alpha:!0,producesType:"Control (single choice)",description:"Creates a single-choice selector. Accepts a friendly choices[] array and auto-converts to parallel arrays (v3 format).",signature:"createSingleChoice(opts: CreateBlockOptions & { options?: { choices?: Choice[] } }): UISchemaElement",example:`const block = createSingleChoice({
  name: 'tariff',
  label: 'Select tariff',
  required: true,
  options: {
    uiType: 'button',
    choices: [
      { label: 'Basic', value: 'basic' },
      { label: 'Premium', value: 'premium', icon: 'star' },
    ],
  },
})`,note:"Choices array is converted to parallel options/optionsLabels/optionsIcons arrays in the wire format."},{name:"createMultipleChoice",alpha:!0,producesType:"MultichoiceControl",description:"Creates a multi-select block. Accepts a friendly choices[] array and auto-converts to parallel arrays (v3 format).",signature:"createMultipleChoice(opts: CreateBlockOptions & { options?: { choices?: Choice[] } }): UISchemaElement",example:`const block = createMultipleChoice({
  name: 'interests',
  options: {
    uiType: 'checkbox',
    choices: [
      { label: 'Solar', value: 'solar' },
      { label: 'Wind', value: 'wind' },
    ],
  },
})`,note:"Choices array is converted to parallel options/optionsLabels/optionsIcons arrays in the wire format."},{name:"createBinaryInput",alpha:!0,producesType:"BooleanControl",description:"Creates a yes/no toggle (switch or checkbox).",signature:"createBinaryInput(opts: CreateBlockOptions): UISchemaElement",example:`const block = createBinaryInput({
  name: 'newsletter',
  label: 'Subscribe to newsletter',
})`},{name:"createNumberInput",alpha:!0,producesType:"NumberInputControl",description:"Creates a numeric input. Options for unit, range, and format are nested under fields.numberInput as required by the renderer.",signature:"createNumberInput(opts: CreateBlockOptions & { unit?, range?, format?, suggestions? }): UISchemaElement",example:`const block = createNumberInput({
  name: 'Consumption',
  label: 'Annual Consumption',
  unit: { show: true, label: 'kWh' },
  range: { min: 0, max: 100000 },
})`,note:"Unit/range/format options are automatically nested under fields.numberInput in the wire format."},{name:"createDatePicker",alpha:!0,producesType:"DatePickerControl",description:"Creates a date or date-range picker.",signature:"createDatePicker(opts: CreateBlockOptions): UISchemaElement",example:`const block = createDatePicker({
  name: 'moveDate',
  label: 'Moving Date',
  required: true,
  options: { showTime: false, disableDays: [0, 6] },
})`},{name:"createPersonalInformation",alpha:!0,producesType:"PersonalInformationControl",description:"Creates a personal info block. Defaults showPaper to true.",signature:"createPersonalInformation(opts: CreateBlockOptions): UISchemaElement",example:`const block = createPersonalInformation({
  name: 'Contact Info',
  required: true,
  options: {
    customerType: 'PRIVATE',
    fields: {
      firstName: { required: true },
      email: { required: true },
    },
  },
})`},{name:"createContact",alpha:!0,producesType:"ContactControl",description:"Creates a contact block. Defaults showPaper to true.",signature:"createContact(opts: CreateBlockOptions): UISchemaElement",example:`const block = createContact({
  name: 'Contact',
  required: true,
  options: {
    purpose: ['customer'],
    fields: { firstName: { required: true }, email: { required: true } },
  },
})`},{name:"createAddress",alpha:!0,producesType:"AddressControl",description:"Creates an address block. Defaults showPaper to true.",signature:"createAddress(opts: CreateBlockOptions): UISchemaElement",example:`const block = createAddress({
  name: 'Address',
  required: true,
  options: {
    countryAddressSettings: { countryCode: 'DE', enableAutoComplete: true },
    fields: { zipCity: { required: true }, streetName: { required: true } },
  },
})`},{name:"createProductSelection",alpha:!0,producesType:"ProductSelectionControl",description:"Creates a product selection block.",signature:"createProductSelection(opts: CreateBlockOptions): UISchemaElement",example:`const block = createProductSelection({
  name: 'products',
  label: 'Choose your plan',
  required: true,
  options: {
    catalog: 'epilot',
    productsType: 'static',
    selection: 'one',
    products: [{ productId: 'prod-1', priceId: 'price-1' }],
  },
})`},{name:"createConsents",alpha:!0,producesType:"ConsentsControl",description:"Creates a GDPR consent block.",signature:"createConsents(opts: CreateBlockOptions): UISchemaElement",example:`const block = createConsents({
  name: 'consents',
  required: true,
  options: {
    items: {
      'gtc': { required: true, topics: ['GTC'], text: 'I agree…', order: 0 },
    },
  },
})`},{name:"createFileUpload",alpha:!0,producesType:"UploadPanelControl",description:"Creates a file upload block.",signature:"createFileUpload(opts: CreateBlockOptions): UISchemaElement",example:`const block = createFileUpload({
  name: 'documents',
  options: { maxQuantity: 5, supportedTypes: ['PDF', 'Image'] },
})`},{name:"createPaymentMethod",alpha:!0,producesType:"PaymentControl",description:"Creates a payment method selector. Defaults showPaper to true.",signature:"createPaymentMethod(opts: CreateBlockOptions): UISchemaElement",example:`const block = createPaymentMethod({
  name: 'payment',
  required: true,
  options: {
    implementations: [
      { type: 'SEPA', label: 'SEPA Direct Debit', show: true },
      { type: 'BankTransfer', label: 'Invoice', show: true },
    ],
  },
})`},{name:"createParagraph",alpha:!0,producesType:"Label",description:"Creates a rich text paragraph. Text is automatically UTF-16LE base64-encoded. Do not pass HTML — the builder WYSIWYG renders raw tags as text.",signature:"createParagraph(name: string, text: string, label?: string): UISchemaElement",example:`const block = createParagraph(
  'intro',
  'Welcome! Please fill out the form below to get started.',
)`,note:'The resulting "text" field is placed at the top level of the element, not inside options. This is a v3 format requirement.'},{name:"createImage",alpha:!0,producesType:"ImageControl",description:"Creates an image display block.",signature:"createImage(name: string, url: string, opts?: { altText?, width? }): UISchemaElement",example:`const block = createImage('banner', 'https://cdn.example.com/banner.png', {
  altText: 'Company banner',
  width: '100%',
})`},{name:"createActionBar",alpha:!0,producesType:"ActionBarControl",description:"Creates a navigation bar with CTA and back buttons. Consents array defaults to 4 hidden items (required by the renderer).",signature:"createActionBar(name: string, opts?: { label?, actionType?, showBack?, consents? }): UISchemaElement",example:`// Next button
const next = createActionBar('Next', { label: 'Continue' })

// Submit + back
const submit = createActionBar('Action bar', {
  label: 'Submit',
  actionType: 'SubmitAndGoNext',
  showBack: true,
})`},{name:"createSuccessMessage",alpha:!0,producesType:"ConfirmationMessageControl",description:"Creates a success/thank-you message block.",signature:"createSuccessMessage(name: string, opts?: { title?, text?, icon?, closeButtonText? }): UISchemaElement",example:`const block = createSuccessMessage('Thank you', {
  title: 'Thank you!',
  text: 'We will be in touch soon.',
  closeButtonText: 'Back to Homepage',
})`},{name:"createSummary",alpha:!0,producesType:"SummaryControl",description:"Creates a summary/review block.",signature:"createSummary(name: string, opts?: { subTitle? }): UISchemaElement",example:`const block = createSummary('Summary', {
  subTitle: 'Review your order before submitting',
})`},{name:"createShoppingCart",alpha:!0,producesType:"ShopCartControl",description:"Creates a shopping cart display block.",signature:"createShoppingCart(name: string, opts?: { cartTitle?, cartFootnote? }): UISchemaElement",example:`const block = createShoppingCart('cart', {
  cartTitle: 'Your Order',
  cartFootnote: '* Prices include VAT',
})`},{name:"createStep",alpha:!0,producesType:"StepConfig",description:"Creates a complete step config with auto-generated schema and uischema. Extracts property names from block scopes and infers schema types. Assigns variablePath to stateful blocks.",signature:"createStep(opts: CreateStepOptions): StepConfig",example:`const step = createStep({
  name: 'Personal Details',
  showStepper: true,
  blocks: [
    createPersonalInformation({ name: 'personalInfo', required: true }),
    createAddress({ name: 'address', required: true }),
    createActionBar('Next', { label: 'Continue' }),
  ],
})`,note:'Use sidebarBlocks with layout: "MainContentCartLayout" to show a shopping cart in a sidebar column.'},{name:"createJourney",alpha:!0,producesType:"Record<string, unknown>",description:"Builds a full journey payload ready for client.createJourney().",signature:"createJourney(opts: CreateJourneyOptions): Record<string, unknown>",example:`const payload = createJourney({
  organizationId: 'org-123',
  name: 'Energy Contract Signup',
  settings: {
    designId: 'design-abc',
    language: 'de',
    runtimeEntities: ['ORDER'],
    embedOptions: { mode: 'full-screen', topBar: true },
  },
  steps: [
    createStep({ name: 'Step 1', blocks: [/* … */] }),
    createStep({ name: 'Confirmation', blocks: [/* … */] }),
  ],
})

const created = await client.createJourney(payload)`}],ap=new Set(["import","from","export","default","const","let","var","function","return","if","else","for","while","do","switch","case","break","continue","new","this","class","extends","async","await","try","catch","throw","typeof","instanceof","in","of","true","false","null","undefined","void","type","interface","enum","as"]),ip=new Set(["console","Math","JSON","Array","Object","String","Number","Boolean","Promise","Map","Set","Date","Error","RegExp"]);function sp(c){const k=[];let d=0;for(;d<c.length;){if(c[d]==="/"&&c[d+1]==="/"){const C=c.indexOf(`
`,d),b=C===-1?c.length:C;k.push({type:"comment",value:c.slice(d,b)}),d=b;continue}if(c[d]==="/"&&c[d+1]==="*"){const C=c.indexOf("*/",d+2),b=C===-1?c.length:C+2;k.push({type:"comment",value:c.slice(d,b)}),d=b;continue}if(c[d]==='"'||c[d]==="'"||c[d]==="`"){const C=c[d];let b=d+1;for(;b<c.length&&c[b]!==C;)c[b]==="\\"&&b++,b++;k.push({type:"string",value:c.slice(d,b+1)}),d=b+1;continue}if(/\d/.test(c[d])&&(d===0||!/\w/.test(c[d-1]))){let C=d;for(;C<c.length&&/[\d._eE]/.test(c[C]);)C++;k.push({type:"number",value:c.slice(d,C)}),d=C;continue}if(/[a-zA-Z_$]/.test(c[d])){let C=d;for(;C<c.length&&/[\w$]/.test(c[C]);)C++;const b=c.slice(d,C);ap.has(b)?k.push({type:"keyword",value:b}):ip.has(b)?k.push({type:"builtin",value:b}):c[C]===":"?k.push({type:"property",value:b}):k.push({type:"plain",value:b}),d=C;continue}if("=<>!+-*/%&|^~?".includes(c[d])){let C=d;for(;C<c.length&&"=<>!+-*/%&|^~?".includes(c[C]);)C++;k.push({type:"operator",value:c.slice(d,C)}),d=C;continue}if("{}[]();:.,".includes(c[d])){k.push({type:"punctuation",value:c[d]}),d++;continue}let _=d;for(;_<c.length&&!/[a-zA-Z_$\d"'`/=<>!+\-*%&|^~?{}[\]();:.,]/.test(c[_]);)_++;k.push({type:"plain",value:c.slice(d,_||d+1)}),d=_||d+1}return k}const up={keyword:"text-violet-400",string:"text-emerald-400",number:"text-amber-300",comment:"text-gray-500 italic",property:"text-sky-300",punctuation:"text-gray-500",operator:"text-pink-400",builtin:"text-yellow-300",plain:"text-gray-200"};function se({code:c,title:k,language:d="typescript"}){const[_,C]=Ie.useState(!1),b=Ie.useMemo(()=>d==="bash"?c.split(`
`).map((L,G)=>L.trimStart().startsWith("#")?a.jsx("div",{children:a.jsx("span",{className:"text-gray-500 italic",children:L})},G):a.jsx("div",{children:L},G)):sp(c).map((L,G)=>a.jsx("span",{className:up[L.type],children:L.value},G)),[c,d]),$=()=>{navigator.clipboard.writeText(c),C(!0),setTimeout(()=>C(!1),2e3)};return a.jsxs("div",{className:"rounded-xl overflow-hidden",style:{border:"1px solid rgba(99, 102, 241, 0.1)",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.06)"},children:[k&&a.jsxs("div",{className:"flex items-center justify-between px-4 py-2",style:{background:"linear-gradient(135deg, #1a1a2e 0%, #16162a 100%)",borderBottom:"1px solid rgba(255, 255, 255, 0.06)"},children:[a.jsxs("div",{className:"flex items-center gap-3",children:[a.jsxs("div",{className:"flex gap-1.5",children:[a.jsx("span",{className:"w-2.5 h-2.5 rounded-full bg-red-500/60"}),a.jsx("span",{className:"w-2.5 h-2.5 rounded-full bg-yellow-500/60"}),a.jsx("span",{className:"w-2.5 h-2.5 rounded-full bg-green-500/60"})]}),a.jsx("span",{className:"text-[11px] text-gray-400 font-mono",children:k})]}),a.jsxs("div",{className:"flex items-center gap-2",children:[d&&a.jsx("span",{className:"text-gray-600 text-[10px] uppercase font-mono",children:d}),a.jsx("button",{onClick:$,className:"text-gray-500 hover:text-gray-300 transition-colors text-[11px] font-mono px-2 py-0.5 rounded hover:bg-white/5",children:_?"copied!":"copy"})]})]}),a.jsx("pre",{className:"p-4 text-[13px] overflow-x-auto font-mono leading-relaxed whitespace-pre",style:{background:"linear-gradient(180deg, #0f0f1a 0%, #111122 100%)",color:"#e2e8f0"},children:b})]})}const cp=[{label:"Block Types",value:String(Yt.length),color:"text-blue-600"},{label:"Categories",value:String(Ba.length),color:"text-emerald-600"},{label:"Factory Fns",value:String(Bo.length),color:"text-amber-600"},{label:"Status",value:"Alpha",color:"text-violet-600"}],dp="npm install @epilot/epilot-journey-sdk",pp=`import {
  JourneyClient,
  createJourney, createStep,
  createPersonalInformation, createAddress,
  createActionBar, createSuccessMessage,
} from '@epilot/epilot-journey-sdk'

const client = new JourneyClient({ auth: process.env.EPILOT_TOKEN })

const journey = createJourney({
  organizationId: 'org-123',
  name: 'Contact Form',
  settings: { runtimeEntities: ['ORDER'] },
  steps: [
    createStep({
      name: 'Your Details',
      blocks: [
        createPersonalInformation({ name: 'pi', required: true }),
        createAddress({ name: 'address', required: true }),
        createActionBar('Next', {
          label: 'Submit',
          actionType: 'SubmitAndGoNext',
        }),
      ],
    }),
    createStep({
      name: 'Confirmation',
      showStepper: false,
      hideNextButton: true,
      blocks: [createSuccessMessage('thanks', { title: 'Thank you!' })],
    }),
  ],
})

const created = await client.createJourney(journey)
console.log('Created:', created.journeyId)`,fp=[{icon:"🧩",title:"Block Catalog",desc:"All 35+ block types with value shapes, options, and v3 wire format",nav:"catalog",accent:"from-violet-500 to-purple-600"},{icon:"🏭",title:"Factory Functions",desc:"19 typed factories that auto-produce valid API wire format",nav:"factories",accent:"from-blue-500 to-indigo-600"},{icon:"⚡",title:"Headless Client",desc:"Full CRUD + block-level patch/add/remove without a UI",nav:"client-api",accent:"from-emerald-500 to-teal-600"},{icon:"🤖",title:"Agent Guide",desc:"Wire format traps, failure modes, and proven patterns",nav:"agent-guide",accent:"from-amber-500 to-orange-600"}],mp=[{icon:"⚡",title:"Energy Signup",steps:"AvailabilityCheck → ProductSelection + Cart → PersonalInfo + Address → Payment → Consents → Confirm"},{icon:"📝",title:"Lead / Inquiry Form",steps:"Paragraph → PersonalInformation → MultiChoice → TextInput → Consents + SubmitAndGoNext → Confirm"},{icon:"☀️",title:"PV Solar Planner",steps:"Address → PVRoofPlanner → NumberInput → ProductSelection → PersonalInfo → Consents → Confirm"}];function $u({onNavigate:c}){return a.jsxs("div",{children:[a.jsxs("div",{className:"relative mb-12 -mx-8 -mt-8 px-8 pt-8 pb-6",style:{background:"linear-gradient(to bottom, #fafbff 80%, transparent 100%)"},children:[a.jsx("div",{className:"hero-glow bg-primary-500",style:{top:-100,right:-100}}),a.jsx("div",{className:"hero-glow bg-violet-500",style:{top:0,left:-150}}),a.jsxs("div",{className:"relative",children:[a.jsxs("div",{className:"inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6",style:{background:"rgba(99, 102, 241, 0.08)",border:"1px solid rgba(99, 102, 241, 0.15)",color:"#6366f1"},children:[a.jsx("span",{className:"agent-dot"}),"epilot Journey SDK"]}),a.jsxs("h1",{className:"text-5xl font-extrabold text-gray-900 mb-5 tracking-tight leading-[1.1]",children:["Build Journeys.",a.jsx("br",{}),a.jsx("span",{className:"gradient-text",children:"Programmatically."})]}),a.jsx("p",{className:"text-lg text-gray-500 max-w-xl leading-relaxed mb-8",children:"A type-safe SDK for AI agents and developers to create, inspect, and modify epilot journeys. Every block type documented. Every wire format quirk handled."}),a.jsx("div",{className:"flex flex-wrap gap-3 mb-2",children:cp.map(k=>a.jsxs("div",{className:"inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 border border-gray-200/60 text-sm",children:[a.jsx("span",{className:`font-extrabold ${k.color}`,children:k.value}),a.jsx("span",{className:"text-gray-400",children:k.label})]},k.label))})]})]}),a.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14",children:fp.map(k=>a.jsxs("button",{onClick:()=>c(k.nav),className:"card-interactive text-left group overflow-hidden",children:[a.jsx("div",{className:`h-1 w-full bg-gradient-to-r ${k.accent} rounded-t-2xl -mt-6 -mx-6 mb-5`,style:{width:"calc(100% + 3rem)"}}),a.jsx("div",{className:"w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-xl mb-3",children:k.icon}),a.jsx("h3",{className:"font-bold text-gray-900 text-sm mb-1",children:k.title}),a.jsx("p",{className:"text-xs text-gray-500 leading-relaxed",children:k.desc}),a.jsx("p",{className:"text-xs text-primary-600 font-semibold mt-3 group-hover:text-primary-500 transition-colors",children:"Explore →"})]},k.title))}),a.jsx("h2",{className:"text-2xl font-extrabold text-gray-900 mb-1 tracking-tight",children:"Block Categories"}),a.jsx("p",{className:"text-sm text-gray-400 mb-6",children:"Browse by category in the block catalog"}),a.jsx("div",{className:"grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-14",children:Ba.map(k=>{const d=Yt.filter(_=>_.category===k).length;return a.jsxs("button",{onClick:()=>c("catalog"),className:"card-interactive p-4 text-left",children:[a.jsx("div",{className:"text-2xl mb-2",children:La[k]}),a.jsx("p",{className:"text-sm font-bold text-gray-900 leading-tight",children:Oa[k]}),a.jsxs("p",{className:"text-xs text-gray-400 mt-0.5",children:[d," block",d!==1?"s":""]})]},k)})}),a.jsx("h2",{className:"text-2xl font-extrabold text-gray-900 mb-1 tracking-tight",children:"Common patterns"}),a.jsx("p",{className:"text-sm text-gray-400 mb-6",children:"Typical block sequences for different journey types"}),a.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4 mb-14",children:mp.map(k=>a.jsxs("div",{className:"card overflow-hidden",children:[a.jsxs("div",{className:"flex items-center gap-2.5 mb-3",children:[a.jsx("span",{className:"text-xl",children:k.icon}),a.jsx("h3",{className:"font-bold text-gray-900 text-sm",children:k.title})]}),a.jsx("p",{className:"text-xs text-gray-500 leading-relaxed font-mono",children:k.steps})]},k.title))}),a.jsx("h2",{className:"text-2xl font-extrabold text-gray-900 mb-6 tracking-tight",children:"Quick Start"}),a.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[a.jsx(se,{title:"Install",language:"bash",code:dp}),a.jsx(se,{title:"Create a journey in < 30 lines",language:"typescript",code:pp})]})]})}function Ku({category:c,size:k="sm"}){const d=Ma[c],_=k==="sm"?"px-2 py-0.5 text-[11px]":"px-2.5 py-1 text-xs";return a.jsxs("span",{className:`inline-flex items-center gap-1 rounded-full font-semibold ${_} ${d.bg} ${d.text} border ${d.border}`,children:[a.jsx("span",{className:"text-[10px]",children:La[c]}),Oa[c]]})}function yp({block:c,onClick:k}){const d=Ma[c.category];return a.jsx("button",{onClick:()=>k(c),className:"text-left group w-full",children:a.jsxs("div",{className:"card-interactive flex flex-col gap-3 h-full relative",children:[c.commonlyUsed&&a.jsx("div",{className:"absolute top-3 right-3 text-amber-400 text-xs",title:"Commonly used",children:"★"}),a.jsxs("div",{className:"flex items-start gap-3",children:[a.jsx("div",{className:`w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${d.bg}`,children:c.icon}),a.jsxs("div",{className:"min-w-0",children:[a.jsx("p",{className:"font-semibold text-gray-900 text-sm leading-tight",children:c.displayName}),a.jsx("p",{className:"text-[11px] text-gray-400 font-mono mt-0.5 truncate",children:c.controlName})]})]}),a.jsx("p",{className:"text-xs text-gray-500 leading-relaxed line-clamp-2 flex-1",children:c.description}),a.jsxs("div",{className:"flex flex-wrap gap-1.5 items-center",children:[a.jsx(Ku,{category:c.category}),c.hasValue?a.jsx("span",{className:"inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100",children:"submits data"}):a.jsx("span",{className:"inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-gray-50 text-gray-400 border border-gray-100",children:"display only"}),c.factory&&a.jsx("span",{className:"inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-primary-50 text-primary-600 border border-primary-100",children:"factory fn"}),c.deprecated&&a.jsx("span",{className:"inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-red-600 border border-red-100",children:"deprecated"})]}),a.jsx("p",{className:`text-[11px] font-semibold mt-auto ${d.text} group-hover:underline`,children:"View details →"})]})})}const hp=[{id:"overview",label:"Overview"},{id:"value",label:"Value Type"},{id:"options",label:"Options"},{id:"code",label:"Code"},{id:"wire",label:"Wire Format"}];function gp({block:c,onClose:k}){const[d,_]=Ie.useState("overview"),C=Ma[c.category];return a.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4",style:{background:"rgba(0, 0, 0, 0.5)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)"},children:a.jsxs("div",{className:"bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden",style:{boxShadow:"0 24px 48px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)"},children:[a.jsxs("div",{className:"flex items-start gap-4 p-5 border-b border-gray-100",children:[a.jsx("div",{className:`w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${C.bg}`,children:c.icon}),a.jsxs("div",{className:"flex-1 min-w-0",children:[a.jsx("h2",{className:"font-bold text-gray-900 text-lg leading-tight",children:c.displayName}),a.jsx("p",{className:"text-primary-600 font-mono text-xs mt-0.5",children:c.controlName})]}),a.jsx("button",{onClick:k,className:"p-2 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors flex-shrink-0",children:a.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:a.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]}),a.jsx("div",{className:"flex border-b border-gray-100 bg-surface-50 overflow-x-auto",children:hp.map(b=>a.jsx("button",{onClick:()=>_(b.id),className:`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${d===b.id?"border-primary-600 text-primary-700 bg-white font-semibold":"border-transparent text-gray-500 hover:text-gray-700"}`,children:b.label},b.id))}),a.jsxs("div",{className:"flex-1 overflow-y-auto p-5",children:[d==="overview"&&a.jsxs("div",{className:"space-y-5",children:[a.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[a.jsx(wr,{label:"Control Name",value:c.controlName,mono:!0}),a.jsx(wr,{label:"Category",value:a.jsx(Ku,{category:c.category,size:"md"})}),a.jsx(wr,{label:"Submits Data",value:c.hasValue?"Yes – included in form submission":"No – display / navigation only"}),a.jsx(wr,{label:"Commonly Used",value:c.commonlyUsed?"Yes":"No"}),c.deprecated&&a.jsx(wr,{label:"Status",value:a.jsx("span",{className:"text-red-600 font-semibold",children:"Deprecated"})})]}),c.factory&&a.jsxs("div",{children:[a.jsx("p",{className:"text-xs font-bold uppercase tracking-widest text-gray-400 mb-2",children:"Factory Function(s)"}),a.jsx("div",{className:"space-y-2",children:c.factory.split(" / ").map(b=>a.jsxs("div",{className:"rounded-xl px-4 py-3",style:{background:"rgba(99, 102, 241, 0.04)",border:"1px solid rgba(99, 102, 241, 0.1)"},children:[a.jsxs("p",{className:"font-mono text-sm text-primary-700 font-semibold",children:[b,"(opts)"]}),a.jsxs("p",{className:"text-xs text-gray-500 mt-1",children:["import ","{ ",b," }"," from '@epilot/epilot-journey-sdk'"]})]},b))})]}),a.jsxs("div",{children:[a.jsx("p",{className:"text-xs font-bold uppercase tracking-widest text-gray-400 mb-2",children:"Description"}),a.jsx("p",{className:"text-sm text-gray-600 leading-relaxed bg-surface-50 rounded-xl px-4 py-3",children:c.description})]})]}),d==="value"&&a.jsxs("div",{className:"space-y-3",children:[a.jsxs("p",{className:"text-xs text-gray-400 leading-relaxed",children:["Shape of the value submitted when the user fills this block. Accessible via"," ",a.jsx("code",{className:"bg-gray-100 px-1 rounded text-primary-700 text-[11px]",children:"BlockValueMap[controlName]"}),"."]}),a.jsx(se,{code:c.valueType,title:"TypeScript",language:"typescript"})]}),d==="options"&&a.jsxs("div",{className:"space-y-3",children:[a.jsxs("p",{className:"text-xs text-gray-400 leading-relaxed",children:["Configuration options passed to ",a.jsx("code",{className:"bg-gray-100 px-1 rounded text-primary-700 text-[11px]",children:"opts.options"})," in the factory function, or in the ",a.jsx("code",{className:"bg-gray-100 px-1 rounded text-primary-700 text-[11px]",children:"uischema.options"})," wire field."]}),a.jsx(se,{code:c.optionsType,title:"TypeScript",language:"typescript"})]}),d==="code"&&a.jsxs("div",{className:"space-y-3",children:[c.factory?a.jsxs("div",{className:"flex items-start gap-2 rounded-xl px-4 py-2.5 text-xs",style:{background:"rgba(99, 102, 241, 0.05)",border:"1px solid rgba(99, 102, 241, 0.1)",color:"#4f46e5"},children:[a.jsx("span",{children:"→"}),a.jsx("span",{children:"Use the factory function – it produces valid v3 wire format automatically."})]}):a.jsxs("div",{className:"flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-2.5 text-xs text-amber-700",children:[a.jsx("span",{children:"→"}),a.jsxs("span",{children:["No dedicated factory. Use ",a.jsxs("code",{className:"font-mono",children:["createBlock('",c.controlName,"', opts)"]})," directly."]})]}),a.jsx(se,{code:c.codeExample,title:"Usage Example",language:"typescript"})]}),d==="wire"&&a.jsxs("div",{className:"space-y-3",children:[a.jsxs("div",{className:"flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-2.5 text-xs text-amber-700",children:[a.jsx("span",{children:"→"}),a.jsxs("span",{children:["This is the v3 JSON stored in the Journey API's"," ",a.jsx("code",{className:"font-mono",children:"uischema.elements[]"}),".",c.controlName==="Label"&&" Note: text is at top level, not inside options.",(c.controlName==="Control"||c.controlName==="MultichoiceControl")&&" Note: choices use parallel arrays, not a choices[] object."]})]}),a.jsx(se,{code:c.wireExample,title:"Wire Format (v3 API)",language:"json"})]})]})]})})}function wr({label:c,value:k,mono:d}){return a.jsxs("div",{className:"flex flex-col gap-1",children:[a.jsx("p",{className:"text-[11px] font-bold uppercase tracking-widest text-gray-400",children:c}),typeof k=="string"?a.jsx("p",{className:`text-sm font-medium text-gray-700 ${d?"font-mono text-primary-700":""}`,children:k}):a.jsx("div",{children:k})]})}function xp(){const[c,k]=Ie.useState(""),[d,_]=Ie.useState("all"),[C,b]=Ie.useState(null),$=Yt.filter(R=>{const L=d==="all"||R.category===d,G=c.toLowerCase(),he=!G||R.displayName.toLowerCase().includes(G)||R.controlName.toLowerCase().includes(G)||R.description.toLowerCase().includes(G)||R.factory!==null&&R.factory.toLowerCase().includes(G);return L&&he});return a.jsxs("div",{children:[a.jsxs("div",{className:"mb-6",children:[a.jsx("h1",{className:"section-title",children:"Block Catalog"}),a.jsxs("p",{className:"section-desc",children:["All ",Yt.length," block types available in the Journey SDK. Click any block to see its value type, options, code example, and v3 wire format."]})]}),a.jsxs("div",{className:"bg-white border border-gray-100 rounded-2xl p-4 mb-6 flex flex-wrap items-center gap-3",children:[a.jsxs("div",{className:"relative flex-1 min-w-[200px] max-w-xs",children:[a.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm",children:"🔍"}),a.jsx("input",{type:"text",value:c,onChange:R=>k(R.target.value),placeholder:"Search blocks…",className:"input-field pl-8"})]}),a.jsxs("div",{className:"flex flex-wrap gap-1.5",children:[a.jsxs("button",{onClick:()=>_("all"),className:`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${d==="all"?"bg-primary-600 text-white border-primary-600":"bg-white text-gray-500 border-gray-200 hover:border-primary-300 hover:text-primary-600"}`,children:["All (",Yt.length,")"]}),Ba.map(R=>{const L=Yt.filter(G=>G.category===R).length;return a.jsxs("button",{onClick:()=>_(R),className:`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${d===R?"bg-primary-600 text-white border-primary-600":"bg-white text-gray-500 border-gray-200 hover:border-primary-300 hover:text-primary-600"}`,children:[La[R]," ",Oa[R]," (",L,")"]},R)})]}),a.jsxs("span",{className:"text-xs text-gray-400 ml-auto whitespace-nowrap",children:[$.length," of ",Yt.length," blocks"]})]}),$.length===0?a.jsxs("div",{className:"text-center py-20 text-gray-400",children:[a.jsx("div",{className:"text-4xl mb-3",children:"🔍"}),a.jsx("p",{className:"font-semibold text-gray-500",children:"No blocks found"}),a.jsx("p",{className:"text-sm mt-1",children:"Try a different search term or category"})]}):a.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",children:$.map(R=>a.jsx(yp,{block:R,onClick:b},R.controlName))}),C&&a.jsx(gp,{block:C,onClose:()=>b(null)})]})}function vp(){const[c,k]=Ie.useState(Bo[0]),d={"Block Factories":Bo.filter(_=>!["createStep","createJourney","createBlock"].includes(_.name)),"Step & Journey":Bo.filter(_=>["createBlock","createStep","createJourney"].includes(_.name))};return a.jsxs("div",{children:[a.jsxs("div",{className:"mb-8",children:[a.jsx("h1",{className:"section-title",children:"Factory Functions"}),a.jsx("p",{className:"section-desc",children:"Typed factory functions that produce valid v3 API wire format payloads. Always prefer these over raw object construction — they handle format quirks like base64 encoding, parallel arrays, and nested option paths."})]}),a.jsxs("div",{className:"flex gap-6",children:[a.jsx("div",{className:"w-56 flex-shrink-0",children:Object.entries(d).map(([_,C])=>a.jsxs("div",{className:"mb-5",children:[a.jsx("p",{className:"text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 px-1",children:_}),a.jsx("div",{className:"space-y-0.5",children:C.map(b=>a.jsxs("button",{onClick:()=>k(b),className:`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center gap-2 ${c.name===b.name?"bg-primary-50 text-primary-700 font-semibold":"text-gray-500 hover:bg-gray-50 hover:text-gray-700"}`,children:[a.jsx("span",{className:"font-mono truncate",children:b.name}),b.alpha&&a.jsx("span",{className:"flex-shrink-0 text-[9px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 rounded px-1 py-px",children:"alpha"})]},b.name))})]},_))}),a.jsxs("div",{className:"flex-1 min-w-0 space-y-5",children:[a.jsxs("div",{className:"card",children:[a.jsxs("div",{className:"flex items-center gap-2 mb-4 flex-wrap",children:[a.jsx("span",{className:"font-mono text-sm text-primary-700 font-bold",children:c.name}),a.jsx("span",{className:"text-gray-300",children:"→"}),a.jsx("span",{className:"text-xs text-amber-700 font-medium bg-amber-50 border border-amber-100 rounded-md px-2 py-0.5",children:c.producesType}),c.alpha&&a.jsx("span",{className:"text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 rounded-md px-1.5 py-0.5",children:"alpha"})]}),a.jsx("p",{className:"text-sm text-gray-600 mb-4 leading-relaxed",children:c.description}),c.note&&a.jsxs("div",{className:"flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2.5 text-xs text-blue-700 mb-4",children:[a.jsx("span",{children:"ℹ️"}),a.jsx("span",{children:c.note})]}),a.jsx(se,{code:c.signature,title:"Signature",language:"typescript"})]}),a.jsx(se,{code:c.example,title:"Example",language:"typescript"})]})]})]})}const qu={journey:"Journey CRUD",block:"Block Operations",step:"Step Operations",factory:"Factory Helpers"},Ju={journey:"🗺️",block:"🧩",step:"📄",factory:"🏭"};function kp(){const[c,k]=Ie.useState(Vu[0]),d=["journey","block","step"].map(_=>({group:_,methods:Vu.filter(C=>C.group===_)}));return a.jsxs("div",{children:[a.jsxs("div",{className:"mb-8",children:[a.jsx("h1",{className:"section-title",children:"JourneyClient API"}),a.jsx("p",{className:"section-desc",children:"The headless client wraps the epilot Journey API with block-level operations. Designed for AI assistants and scripts to configure journeys without a UI."})]}),a.jsxs("div",{className:"flex gap-6",children:[a.jsx("div",{className:"w-60 flex-shrink-0",children:d.map(({group:_,methods:C})=>a.jsxs("div",{className:"mb-5",children:[a.jsxs("p",{className:"text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 px-1",children:[Ju[_]," ",qu[_]]}),a.jsx("div",{className:"space-y-0.5",children:C.map(b=>a.jsxs("button",{onClick:()=>k(b),className:`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center gap-2 ${c.name===b.name?"bg-primary-50 text-primary-700 font-semibold":"text-gray-500 hover:bg-gray-50 hover:text-gray-700"}`,children:[a.jsx("span",{className:"font-mono truncate",children:b.name}),b.alpha&&a.jsx("span",{className:"flex-shrink-0 text-[9px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 rounded px-1 py-px",children:"alpha"})]},b.name))})]},_))}),a.jsxs("div",{className:"flex-1 min-w-0 space-y-5",children:[a.jsxs("div",{className:"card",children:[a.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[a.jsx("span",{className:"text-lg",children:Ju[c.group]}),a.jsx("span",{className:"text-[10px] font-bold uppercase tracking-widest text-gray-400",children:qu[c.group]}),c.alpha&&a.jsx("span",{className:"text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 rounded-md px-1.5 py-0.5",children:"alpha"})]}),a.jsx("h2",{className:"font-bold text-gray-900 text-lg mb-2 font-mono",children:c.name}),a.jsx("p",{className:"text-sm text-gray-600 mb-4 leading-relaxed",children:c.description}),a.jsxs("div",{className:"flex items-start gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 text-xs text-emerald-700 mb-4",children:[a.jsx("span",{children:"↩"}),a.jsxs("span",{children:[a.jsx("strong",{children:"Returns:"})," ",c.returns]})]}),a.jsx(se,{code:c.signature,title:"Signature",language:"typescript"})]}),a.jsx(se,{code:c.example,title:"Example",language:"typescript"})]})]})]})}const Wu=[{title:"Always use factory functions",explanation:"Factory functions produce valid v3 wire format automatically. Avoid constructing raw UISchemaElement objects unless no factory exists for the block type.",bad:`// Don't: raw object — easy to get wrong
{
  type: 'Control',
  scope: '#/properties/email',
  options: {
    choices: [{ label: 'A', value: 'a' }],  // WRONG
  }
}`,good:`// Do: factory handles wire format details
createSingleChoice({
  name: 'email',
  options: {
    choices: [{ label: 'A', value: 'a' }],
  },
})`},{title:"Choices use parallel arrays, not objects",explanation:"The v3 wire format stores single/multiple choice options as three parallel arrays: options[] (values), optionsLabels[] (display), optionsIcons[] (optional). The createSingleChoice() and createMultipleChoice() factories auto-convert from the friendlier choices[] format.",bad:`// Don't: choices array does NOT exist in wire format
{
  "type": "Control",
  "options": {
    "choices": [{ "label": "Basic", "value": "basic" }]
  }
}`,good:`// Do: parallel arrays (createSingleChoice handles this)
{
  "type": "Control",
  "options": {
    "options": ["basic"],
    "optionsLabels": ["Basic"]
  }
}`},{title:"Paragraph text is base64-encoded UTF-16LE",explanation:"The Label (Paragraph) block stores its text as base64-encoded UTF-16LE at the top-level text field — NOT inside options. Always use createParagraph() which handles encoding and placement automatically.",bad:`// Don't: plain text in options
{
  "type": "Label",
  "scope": "#/properties/intro",
  "options": { "text": "Welcome!" }  // WRONG placement
}`,good:`// Do: use createParagraph()
createParagraph('intro', 'Welcome!')
// → { "type": "Label", "scope": "...", "text": "VwBlAGwAYwBvAG0AZQA=" }`},{title:"Each step needs an ActionBar or hideNextButton",explanation:"Every step must have navigation. Either include a createActionBar() block (recommended) or set hideNextButton: false in createStep(). Without navigation, users cannot proceed.",bad:`// Don't: step with no navigation
createStep({
  name: 'Info',
  blocks: [
    createPersonalInformation({ name: 'pi' }),
    // No action bar!
  ],
})`,good:`// Do: include an action bar
createStep({
  name: 'Info',
  blocks: [
    createPersonalInformation({ name: 'pi' }),
    createActionBar('Next', { label: 'Continue' }),
  ],
})`},{title:"Last step uses SubmitAndGoNext, not GoNext",explanation:`The final step's ActionBar must use actionType: "SubmitAndGoNext" to trigger form submission. All other steps use the default "GoNext".`,bad:`// Don't: GoNext on the last step won't submit
createActionBar('Submit', {
  label: 'Submit',
  actionType: 'GoNext',  // WRONG — won't submit
})`,good:`// Do: SubmitAndGoNext on the last data step
createActionBar('Action bar', {
  label: 'Submit',
  actionType: 'SubmitAndGoNext',
})`},{title:"Success message on a separate final step",explanation:"The ConfirmationMessageControl should be on its own final step with showStepper: false and hideNextButton: true. It is not combined with data blocks.",bad:`// Don't: success message mixed with data blocks
createStep({
  name: 'Submit',
  blocks: [
    createSummary('summary'),
    createSuccessMessage('thanks'),  // WRONG — on same step
  ],
})`,good:`// Do: success message on its own final step
createStep({
  name: 'Confirmation',
  showStepper: false,
  hideNextButton: true,
  blocks: [createSuccessMessage('thanks', { title: 'Thank you!' })],
})`},{title:"Block names must be unique within a step",explanation:"Block names map to property keys in the step's JSON schema. Duplicate names in the same step will overwrite each other. Names can repeat across different steps.",bad:`// Don't: duplicate names in same step
createStep({
  name: 'Info',
  blocks: [
    createTextInput({ name: 'address' }),
    createAddress({ name: 'address' }),  // COLLISION
  ],
})`,good:`// Do: unique names per step
createStep({
  name: 'Info',
  blocks: [
    createTextInput({ name: 'deliveryNotes' }),
    createAddress({ name: 'deliveryAddress' }),
  ],
})`},{title:"Use MainContentCartLayout when showing a shopping cart",explanation:'If a step contains a ShoppingCart block alongside other content, use layout: "MainContentCartLayout" and put the cart in sidebarBlocks. This renders a two-column layout with the cart on the right.',bad:`// Don't: cart in main blocks with linear layout
createStep({
  name: 'Products',
  blocks: [createProductSelection({ name: 'products' }), createShoppingCart('cart')],
})`,good:`// Do: cart in sidebar with cart layout
createStep({
  name: 'Products',
  layout: 'MainContentCartLayout',
  blocks: [createProductSelection({ name: 'products' })],
  sidebarBlocks: [createShoppingCart('cart')],
})`},{title:"Set runtimeEntities in journey settings",explanation:'For journeys that create epilot entities on submission, set runtimeEntities in the journey settings. Common values: ["ORDER"] for purchase flows, ["OPPORTUNITY"] for sales leads.',good:`createJourney({
  organizationId: 'org-123',
  name: 'Energy Signup',
  settings: {
    runtimeEntities: ['ORDER'],  // creates an Order on submit
    designId: 'design-abc',
    language: 'de',
  },
  steps: [ /* … */ ],
})`}],wp=[{field:"scope",note:`Always "#/properties/{blockName}". The blockName is the key in the step's JSON schema properties.`},{field:"options.showPaper",note:"Defaults to false. Set to true for composite blocks (PI, Address, Contact, Payment) that need a card background."},{field:"options.variablePath",note:'Auto-generated by createStep() for stateful blocks. Format: "{stepName}_{blockName}" with non-alphanumeric chars replaced by "_".'},{field:"options.required",note:"Set on individual block options AND propagated to the step's JSON schema required[] array by createStep()."},{field:"id",note:"UUID auto-generated by createBlock(). Required by the renderer for element identity."}];function Sp(){const[c,k]=Ie.useState(Wu[0]);return a.jsxs("div",{children:[a.jsxs("div",{className:"mb-8",children:[a.jsxs("div",{className:"inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-xs font-semibold mb-4",children:[a.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"}),"For AI Agents"]}),a.jsx("h1",{className:"section-title",children:"Agent Guide"}),a.jsx("p",{className:"section-desc",children:"Rules, gotchas, and patterns that AI agents must follow when generating journeys with the SDK. Every rule here corresponds to a real failure mode observed in production journeys."})]}),a.jsx("h2",{className:"text-xl font-bold text-gray-900 mb-4",children:"Rules & Gotchas"}),a.jsxs("div",{className:"flex gap-6 mb-14",children:[a.jsx("div",{className:"w-64 flex-shrink-0 space-y-1",children:Wu.map((d,_)=>a.jsxs("button",{onClick:()=>k(d),className:`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all ${c.title===d.title?"bg-primary-50 text-primary-700 font-semibold border border-primary-200":"text-gray-500 hover:bg-gray-50 hover:text-gray-700"}`,children:[a.jsx("span",{className:"text-gray-300 text-xs font-mono mr-2",children:String(_+1).padStart(2,"0")}),d.title]},_))}),a.jsxs("div",{className:"flex-1 min-w-0 space-y-4",children:[a.jsxs("div",{className:"card",children:[a.jsx("h3",{className:"font-bold text-gray-900 text-base mb-2",children:c.title}),a.jsx("p",{className:"text-sm text-gray-600 leading-relaxed",children:c.explanation})]}),c.bad&&a.jsxs("div",{children:[a.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[a.jsx("span",{className:"w-5 h-5 rounded-full bg-red-100 text-red-600 text-xs flex items-center justify-center font-bold",children:"✕"}),a.jsx("span",{className:"text-xs font-bold text-red-600 uppercase tracking-wide",children:"Avoid"})]}),a.jsx(se,{code:c.bad,language:"typescript"})]}),c.good&&a.jsxs("div",{children:[a.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[a.jsx("span",{className:"w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 text-xs flex items-center justify-center font-bold",children:"✓"}),a.jsx("span",{className:"text-xs font-bold text-emerald-600 uppercase tracking-wide",children:"Do this"})]}),a.jsx(se,{code:c.good,language:"typescript"})]})]})]}),a.jsx("h2",{className:"text-xl font-bold text-gray-900 mb-1",children:"Wire Format Quick Reference"}),a.jsx("p",{className:"text-sm text-gray-400 mb-5",children:"Key fields in every v3 uischema element and what they mean"}),a.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-3 mb-14",children:wp.map(d=>a.jsxs("div",{className:"bg-white border border-gray-100 rounded-xl p-4",children:[a.jsx("p",{className:"font-mono text-sm text-primary-700 font-semibold mb-1",children:d.field}),a.jsx("p",{className:"text-xs text-gray-500 leading-relaxed",children:d.note})]},d.field))}),a.jsx("h2",{className:"text-xl font-bold text-gray-900 mb-4",children:"Anatomy of a Block (v3 Wire Format)"}),a.jsx(se,{title:"Every block element shape",language:"json",code:`{
  "id": "a1b2c3d4-...",          // UUID, auto-generated by createBlock()
  "type": "PersonalInformationControl",  // ControlName constant
  "scope": "#/properties/pi",   // "#/properties/" + block name
  "label": "Your Details",      // optional display label
  "options": {
    "showPaper": true,           // card background (default false)
    "required": true,            // propagated to step schema required[]
    "variablePath": "Step1_pi", // auto-set by createStep()
    // ... block-specific options
  }
  // For Label (Paragraph) blocks only:
  // "text": "VwBlAGwAYwBvAG0AZQ=="  (top-level, base64 UTF-16LE)
}`})]})}const bp=[{name:"create_journey",description:"Create a complete journey from a step/block specification. Each step has a name and an array of block definitions using factory names.",params:"name, steps[], organizationId?, designId?, runtimeEntities?",returns:"{ journeyId, builderUrl, previewUrl }"},{name:"get_journey",description:"Retrieve a journey's full configuration by ID. Returns all steps, blocks, schema, and settings.",params:"journeyId",returns:"Full journey JSON"},{name:"search_journeys",description:"Search for journeys by name or query. Returns matching journey names, IDs, and status.",params:"query?, size?",returns:"[{ id, name, createdAt, status }]"},{name:"delete_journey",description:"Delete a journey by ID.",params:"journeyId",returns:"Confirmation message"},{name:"list_block_types",description:"List all available block types with descriptions, categories, and factory function names.",params:"category?",returns:"[{ controlName, displayName, category, description }]"},{name:"get_blocks",description:"List all blocks in a journey grouped by step. Returns type, scope, label, and step index for each block.",params:"journeyId",returns:"[{ stepIndex, type, scope, label, id }]"},{name:"patch_block",description:"Update a specific block's properties on a live journey. Only changed fields need to be provided – they're merged into the existing block.",params:"journeyId, stepIndex, blockName, patch",returns:"{ success, message, previewUrl }"},{name:"add_block",description:"Add a new block to a step on a live journey using a factory definition. Optionally specify insert position.",params:"journeyId, stepIndex, block, position?",returns:"{ success, message, previewUrl }"},{name:"remove_block",description:"Remove a block from a live journey by its scope path or label.",params:"journeyId, stepIndex, blockName",returns:"{ success, message, previewUrl }"},{name:"patch_journey",description:"Partially update journey-level properties (name, settings, etc.) without touching blocks.",params:"journeyId, patch",returns:"{ success, message, previewUrl }"},{name:"export_journey_code",description:"Export a journey's wire format JSON into clean, readable SDK factory code. Converts the complex JSON into TypeScript with createJourney/createStep/create* calls.",params:"journeyId",returns:"TypeScript source code string"}],Cp=[{uri:"epilot://docs/claude-md",name:"CLAUDE.md",description:"Agent instructions – factories, rules, gotchas"},{uri:"epilot://docs/wire-format",name:"Wire Format Reference",description:"Exhaustive v3 block settings reference for all 35+ block types"},{uri:"epilot://blocks/catalog",name:"Block Catalog",description:"All block types as structured JSON"}],Np=`// Add to ~/.claude/settings.json (Claude Code)
// or ~/Library/Application Support/Claude/claude_desktop_config.json (Claude Desktop)

{
  "mcpServers": {
    "epilot-journeys": {
      "command": "npx",
      "args": ["tsx", "/path/to/epilot-journey-sdk/mcp/index.ts"],
      "env": {
        "EPILOT_TOKEN": "<your-token>",
        "EPILOT_ORG_ID": "739224"
      }
    }
  }
}`,jp=`// What the agent sends (MCP tool call):
{
  "name": "create_journey",
  "arguments": {
    "name": "Solar Inquiry",
    "runtimeEntities": ["OPPORTUNITY"],
    "steps": [
      {
        "name": "Your Interest",
        "blocks": [
          { "factory": "createParagraph", "args": ["intro", "Tell us about your solar project."] },
          { "factory": "createSingleChoice", "args": {
            "name": "interest",
            "label": "What are you looking for?",
            "required": true,
            "options": {
              "uiType": "button",
              "choices": [
                { "label": "Solar Panels", "value": "solar" },
                { "label": "Heat Pump", "value": "heatpump" },
                { "label": "Wallbox", "value": "wallbox" }
              ]
            }
          }},
          { "factory": "createActionBar", "args": ["Next", { "label": "Continue" }] }
        ]
      },
      {
        "name": "Contact",
        "blocks": [
          { "factory": "createPersonalInformation", "args": { "name": "pi", "required": true } },
          { "factory": "createActionBar", "args": ["submit", { "label": "Submit", "actionType": "SubmitAndGoNext" }] }
        ]
      },
      {
        "name": "Thank You",
        "showStepper": false,
        "blocks": [
          { "factory": "createSuccessMessage", "args": ["thanks", { "title": "Thank you!", "text": "We will contact you shortly." }] }
        ]
      }
    ]
  }
}`,Ep=`// MCP tool response:
{
  "journeyId": "de134910-2a42-11f1-ad12-6f9fdec9a777",
  "builderUrl": "https://portal.dev.epilot.cloud/app/journey-builder/journeys/de134910-...",
  "previewUrl": "https://portal.dev.epilot.cloud/journey-app/?journeyId=de134910-..."
}`,Pp=`// patch_block — Change a block's label and make it required
{
  "name": "patch_block",
  "arguments": {
    "journeyId": "de134910-2a42-11f1-ad12-6f9fdec9a777",
    "stepIndex": 0,
    "blockName": "#/properties/email",
    "patch": {
      "label": "Work Email Address",
      "options": { "required": true, "placeholder": "you@company.com" }
    }
  }
}`,Tp=`// add_block — Insert a phone field at position 3 in step 0
{
  "name": "add_block",
  "arguments": {
    "journeyId": "de134910-2a42-11f1-ad12-6f9fdec9a777",
    "stepIndex": 0,
    "position": 3,
    "block": {
      "factory": "createTextInput",
      "args": {
        "name": "phone",
        "label": "Phone Number",
        "required": true
      }
    }
  }
}`,Ip=`// remove_block — Remove the fax field from step 1
{
  "name": "remove_block",
  "arguments": {
    "journeyId": "de134910-2a42-11f1-ad12-6f9fdec9a777",
    "stepIndex": 1,
    "blockName": "#/properties/fax"
  }
}`,_p=`// get_blocks — Inspect all blocks in a journey
{
  "name": "get_blocks",
  "arguments": {
    "journeyId": "de134910-2a42-11f1-ad12-6f9fdec9a777"
  }
}

// Response:
[
  { "stepIndex": 0, "type": "Label", "scope": "#/properties/intro", "label": null },
  { "stepIndex": 0, "type": "Control", "scope": "#/properties/interest", "label": "What are you looking for?" },
  { "stepIndex": 0, "type": "Control", "scope": "#/properties/notes", "label": "Notes" },
  { "stepIndex": 0, "type": "ActionBarControl", "scope": "#/properties/Next1", "label": null },
  { "stepIndex": 1, "type": "PersonalInformationControl", "scope": "#/properties/pi", "label": null },
  { "stepIndex": 1, "type": "ActionBarControl", "scope": "#/properties/submit", "label": null },
  { "stepIndex": 2, "type": "ConfirmationMessageControl", "scope": "#/properties/thanks", "label": null }
]`,Ap=`// export_journey_code — Convert JSON blob to clean SDK code
{
  "name": "export_journey_code",
  "arguments": {
    "journeyId": "de134910-2a42-11f1-ad12-6f9fdec9a777"
  }
}`,Rp=`// Response — ready-to-run TypeScript:
import {
  createJourney, createStep, createParagraph,
  createSingleChoice, createTextInput, createActionBar,
  createPersonalInformation, createSuccessMessage,
  JourneyClient,
} from '@epilot/epilot-journey-sdk'

const client = new JourneyClient({
  auth: process.env.EPILOT_TOKEN!,
  apiUrl: 'https://journey-config.dev.sls.epilot.io',
})

const journey = createJourney({
  organizationId: "739224",
  name: "Solar Inquiry",
  settings: { designId: "e22481d9-...", runtimeEntities: ["OPPORTUNITY"] },
  steps: [
    createStep({
      name: "Your Interest",
      showStepper: true,
      hideNextButton: true,
      blocks: [
        createParagraph("intro", "Tell us about your solar project."),
        createSingleChoice({
          name: "interest",
          label: "What are you looking for?",
          required: true,
          options: {
            uiType: "button",
            choices: [
              { label: "Solar Panels", value: "solar" },
              { label: "Heat Pump", value: "heatpump" },
              { label: "Wallbox", value: "wallbox" },
            ],
          },
        }),
        createTextInput({ name: "notes", label: "Notes", options: { multiline: true } }),
        createActionBar("Next1", { label: "Continue" }),
      ],
    }),
    createStep({
      name: "Contact",
      blocks: [
        createPersonalInformation({ name: "pi", required: true }),
        createActionBar("submit", { label: "Submit", actionType: "SubmitAndGoNext" }),
      ],
    }),
    createStep({
      name: "Thank You",
      showStepper: false,
      hideNextButton: true,
      blocks: [
        createSuccessMessage("thanks", { title: "Thank you!", text: "We will contact you shortly." }),
      ],
    }),
  ],
})

const created = await client.createJourney(journey)
console.log('Journey created:', (created as any).journeyId)`,Dp=`User: "Create a contact form with name, email, phone and a newsletter checkbox"

Claude: [calls create_journey]
  Done! Preview: https://portal.dev.epilot.cloud/journey-app/?journeyId=abc123

User: "Change the email label to Work Email"

Claude: [calls patch_block(abc123, 0, "#/properties/email", { label: "Work Email" })]
  Block updated!

User: "Add an address field after the personal info"

Claude: [calls add_block(abc123, 0, { factory: "createAddress", args: { name: "address" } }, 2)]
  Address block added at position 2.

User: "Remove the newsletter checkbox"

Claude: [calls remove_block(abc123, 0, "#/properties/newsletter")]
  Block removed.

User: "Export this journey to code"

Claude: [calls export_journey_code(abc123)]
  Here's your journey as SDK code:

  import { createJourney, createStep, ... } from '@epilot/epilot-journey-sdk'
  const journey = createJourney({ ... })`;function Bp(){return a.jsxs("div",{children:[a.jsxs("div",{className:"mb-8",children:[a.jsxs("div",{className:"inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-xs font-semibold mb-4",children:[a.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"}),"MCP Integration"]}),a.jsx("h1",{className:"section-title",children:"MCP Server"}),a.jsx("p",{className:"section-desc",children:"Model Context Protocol server that exposes journey management as tools for AI agents. Works with Claude Code, Claude Desktop, and any MCP-compatible client."})]}),a.jsx("h2",{className:"text-xl font-bold text-gray-900 mb-4",children:"Available Tools"}),a.jsx("div",{className:"grid grid-cols-1 gap-3 mb-12",children:bp.map(c=>a.jsxs("div",{className:"card",children:[a.jsx("div",{className:"flex items-start gap-3 mb-2",children:a.jsx("span",{className:"font-mono text-sm text-primary-700 font-bold",children:c.name})}),a.jsx("p",{className:"text-sm text-gray-600 mb-3",children:c.description}),a.jsxs("div",{className:"flex flex-wrap gap-4 text-xs",children:[a.jsxs("div",{children:[a.jsx("span",{className:"font-bold text-gray-400 uppercase tracking-wider",children:"Params: "}),a.jsx("span",{className:"font-mono text-gray-600",children:c.params})]}),a.jsxs("div",{children:[a.jsx("span",{className:"font-bold text-gray-400 uppercase tracking-wider",children:"Returns: "}),a.jsx("span",{className:"font-mono text-gray-600",children:c.returns})]})]})]},c.name))}),a.jsx("h2",{className:"text-xl font-bold text-gray-900 mb-4",children:"Resources"}),a.jsx("p",{className:"text-sm text-gray-400 mb-4",children:"Documentation exposed as MCP resources that agents can read on demand."}),a.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-3 mb-12",children:Cp.map(c=>a.jsxs("div",{className:"card",children:[a.jsx("p",{className:"font-bold text-sm text-gray-900 mb-1",children:c.name}),a.jsx("p",{className:"text-xs text-gray-500 mb-2",children:c.description}),a.jsx("p",{className:"font-mono text-[11px] text-primary-600 break-all",children:c.uri})]},c.uri))}),a.jsx("h2",{className:"text-xl font-bold text-gray-900 mb-4",children:"Setup"}),a.jsxs("div",{className:"mb-4",children:[a.jsxs("div",{className:"flex items-start gap-2 rounded-xl px-4 py-2.5 text-xs mb-4",style:{background:"rgba(99, 102, 241, 0.05)",border:"1px solid rgba(99, 102, 241, 0.1)",color:"#4f46e5"},children:[a.jsx("span",{children:"1."}),a.jsxs("span",{children:["Install: ",a.jsx("code",{className:"font-mono bg-white/50 px-1 rounded",children:"cd mcp && npm install"})]})]}),a.jsxs("div",{className:"flex items-start gap-2 rounded-xl px-4 py-2.5 text-xs mb-4",style:{background:"rgba(99, 102, 241, 0.05)",border:"1px solid rgba(99, 102, 241, 0.1)",color:"#4f46e5"},children:[a.jsx("span",{children:"2."}),a.jsxs("span",{children:["Get a token: ",a.jsx("code",{className:"font-mono bg-white/50 px-1 rounded",children:"epilot auth login && export EPILOT_TOKEN=$(epilot auth token)"})]})]}),a.jsxs("div",{className:"flex items-start gap-2 rounded-xl px-4 py-2.5 text-xs mb-4",style:{background:"rgba(99, 102, 241, 0.05)",border:"1px solid rgba(99, 102, 241, 0.1)",color:"#4f46e5"},children:[a.jsx("span",{children:"3."}),a.jsx("span",{children:"Add to your Claude settings:"})]})]}),a.jsx(se,{code:Np,title:"Claude Settings",language:"json"}),a.jsx("h2",{className:"text-xl font-bold text-gray-900 mt-12 mb-4",children:"Example: Creating a Journey"}),a.jsxs("p",{className:"text-sm text-gray-400 mb-4",children:["The agent calls ",a.jsx("code",{className:"bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-primary-700",children:"create_journey"})," with a step/block spec. Block definitions reference factory names and their arguments."]}),a.jsxs("div",{className:"space-y-4 mb-12",children:[a.jsx(se,{code:jp,title:"create_journey — Tool Call",language:"json"}),a.jsx(se,{code:Ep,title:"Response",language:"json"})]}),a.jsx("h2",{className:"text-xl font-bold text-gray-900 mb-4",children:"Example: Granular Block Updates"}),a.jsx("p",{className:"text-sm text-gray-400 mb-4",children:"Edit blocks on live journeys without rewriting the whole config. Inspect, patch, add, or remove individual blocks."}),a.jsxs("div",{className:"space-y-4 mb-12",children:[a.jsx(se,{code:_p,title:"get_blocks — Inspect journey structure",language:"json"}),a.jsx(se,{code:Pp,title:"patch_block — Update a block's properties",language:"json"}),a.jsx(se,{code:Tp,title:"add_block — Insert a new block",language:"json"}),a.jsx(se,{code:Ip,title:"remove_block — Delete a block",language:"json"})]}),a.jsx("h2",{className:"text-xl font-bold text-gray-900 mb-4",children:"Example: Export Journey to Code"}),a.jsx("p",{className:"text-sm text-gray-400 mb-4",children:"Convert any journey's complex wire format JSON into clean, readable SDK factory code. Perfect for version control, creating templates, or understanding journey structure."}),a.jsxs("div",{className:"space-y-4 mb-12",children:[a.jsx(se,{code:Ap,title:"export_journey_code — Tool Call",language:"json"}),a.jsx(se,{code:Rp,title:"Response — Clean TypeScript",language:"typescript"})]}),a.jsx("h2",{className:"text-xl font-bold text-gray-900 mb-4",children:"Example Conversation"}),a.jsx("div",{className:"card mb-12",children:a.jsx("pre",{className:"text-sm text-gray-600 whitespace-pre-wrap leading-relaxed",children:Dp})}),a.jsx("h2",{className:"text-xl font-bold text-gray-900 mb-4",children:"Environment Variables"}),a.jsx("div",{className:"overflow-hidden rounded-xl border border-gray-200",children:a.jsxs("table",{className:"w-full text-sm",children:[a.jsx("thead",{children:a.jsxs("tr",{className:"bg-surface-50",children:[a.jsx("th",{className:"text-left px-4 py-2.5 font-bold text-gray-500 text-xs uppercase tracking-wider",children:"Variable"}),a.jsx("th",{className:"text-left px-4 py-2.5 font-bold text-gray-500 text-xs uppercase tracking-wider",children:"Required"}),a.jsx("th",{className:"text-left px-4 py-2.5 font-bold text-gray-500 text-xs uppercase tracking-wider",children:"Default"}),a.jsx("th",{className:"text-left px-4 py-2.5 font-bold text-gray-500 text-xs uppercase tracking-wider",children:"Description"})]})}),a.jsxs("tbody",{children:[a.jsxs("tr",{className:"border-t border-gray-100",children:[a.jsx("td",{className:"px-4 py-2.5 font-mono text-primary-700 font-semibold",children:"EPILOT_TOKEN"}),a.jsx("td",{className:"px-4 py-2.5 text-red-600 font-semibold",children:"Yes"}),a.jsx("td",{className:"px-4 py-2.5 text-gray-400",children:"-"}),a.jsx("td",{className:"px-4 py-2.5 text-gray-600",children:"Cognito ID token or API token"})]}),a.jsxs("tr",{className:"border-t border-gray-100",children:[a.jsx("td",{className:"px-4 py-2.5 font-mono text-primary-700 font-semibold",children:"EPILOT_API_URL"}),a.jsx("td",{className:"px-4 py-2.5 text-gray-400",children:"No"}),a.jsx("td",{className:"px-4 py-2.5 font-mono text-xs text-gray-500",children:"journey-config.dev.sls.epilot.io"}),a.jsx("td",{className:"px-4 py-2.5 text-gray-600",children:"Journey API base URL"})]}),a.jsxs("tr",{className:"border-t border-gray-100",children:[a.jsx("td",{className:"px-4 py-2.5 font-mono text-primary-700 font-semibold",children:"EPILOT_ORG_ID"}),a.jsx("td",{className:"px-4 py-2.5 text-gray-400",children:"No"}),a.jsx("td",{className:"px-4 py-2.5 font-mono text-xs text-gray-500",children:"739224"}),a.jsx("td",{className:"px-4 py-2.5 text-gray-600",children:"Default organization ID"})]})]})]})})]})}const Sr=[{id:"sales-inquiry",name:"Sales Inquiry",icon:"💼",tagline:"Lead capture with plan selection",description:"A 4-step lead generation journey: plan selection → business info → contact capture + GDPR consent → confirmation. Creates an OPPORTUNITY entity on submission.",highlights:["Single-choice with icon buttons for plan selection","Multiple-choice checkbox for module interests","GDPR consent inline on the ActionBar","Summary block before submit for user review","runtimeEntities: OPPORTUNITY for CRM integration"],steps:[{name:"Choose Your Plan",icon:"📋",color:"bg-blue-50 text-blue-700 border-blue-100",blocks:[{fn:"createParagraph()",note:"Intro text (auto-encoded)"},{fn:"createSingleChoice()",note:"Plan selection with icon buttons"},{fn:"createSingleChoice()",note:"Team size selection"},{fn:"createActionBar()",note:"GoNext → step 2"}]},{name:"About Your Business",icon:"🏢",color:"bg-amber-50 text-amber-700 border-amber-100",blocks:[{fn:"createParagraph()",note:"Context text"},{fn:"createTextInput()",note:"Multiline business description"},{fn:"createTextInput()",note:"Use case description"},{fn:"createMultipleChoice()",note:"Module interest (checkbox)"},{fn:"createActionBar()",note:"GoNext → step 3"}]},{name:"Contact Details",icon:"👤",color:"bg-emerald-50 text-emerald-700 border-emerald-100",blocks:[{fn:"createParagraph()",note:"Contact intro"},{fn:"createPersonalInformation()",note:"Business mode, required fields"},{fn:"createTextInput()",note:"Additional notes (optional)"},{fn:"createSummary()",note:"Review all collected data"},{fn:"createActionBar()",note:"SubmitAndGoNext with GDPR consent"}]},{name:"Confirmation",icon:"🎉",color:"bg-purple-50 text-purple-700 border-purple-100",blocks:[{fn:"createSuccessMessage()",note:"Thank-you with close button"}]}],source:`/**
 * epilot Sales Inquiry Journey – Pricing Engine Playground PoC
 *
 * Creates a journey that lets users:
 * 1. Pick their plan (Business / Professional / Enterprise)
 * 2. Tell us about their business and what they need epilot for
 * 3. Leave their contact info so sales can call them back
 * 4. Accept terms and submit
 *
 * Usage:
 *   npx tsx examples/create-sales-inquiry.ts <API_TOKEN> <ORG_ID> [DESIGN_ID]
 */

import {
  createJourney,
  createStep,
  createTextInput,
  createPersonalInformation,
  createSingleChoice,
  createMultipleChoice,
  createActionBar,
  createSuccessMessage,
  createParagraph,
  createSummary,
  JourneyClient,
} from '@epilot/epilot-journey-sdk'

const API_TOKEN = process.argv[2]
const ORG_ID = process.argv[3]
const DESIGN_ID = process.argv[4] || undefined

const client = new JourneyClient({ auth: API_TOKEN })

const journey = createJourney({
  organizationId: ORG_ID,
  name: 'epilot Sales Inquiry – Pricing Engine Playground',
  settings: {
    designId: DESIGN_ID || '',
    description: 'Sales inquiry form for the epilot Pricing Engine Playground.',
    embedOptions: { mode: 'full-screen', width: '100%', topBar: true },
    runtimeEntities: ['OPPORTUNITY'],
  },
  steps: [

    // ── Step 1: Pick your plan ────────────────────────────────
    createStep({
      name: 'Choose Your Plan',
      showStepName: true,
      showStepper: true,
      showStepperLabels: true,
      blocks: [
        createParagraph('intro',
          'Interested in epilot? Select the plan that best fits your business.'),

        createSingleChoice({
          name: 'plan',
          label: 'Which plan are you interested in?',
          required: true,
          options: {
            uiType: 'button',
            choices: [
              { label: 'Business', value: 'business', icon: 'briefcase' },
              { label: 'Professional', value: 'professional', icon: 'rocket' },
              { label: 'Enterprise', value: 'enterprise', icon: 'building' },
            ],
          },
        }),

        createSingleChoice({
          name: 'Team Size',
          label: 'How large is your team?',
          options: {
            uiType: 'button',
            choices: [
              { label: '1–10', value: '1-10' },
              { label: '11–50', value: '11-50' },
              { label: '51–200', value: '51-200' },
              { label: '200+', value: '200+' },
            ],
          },
        }),

        createActionBar('Next', { label: 'Continue' }),
      ],
    }),

    // ── Step 2: Tell us about your business ───────────────────
    createStep({
      name: 'About Your Business',
      showStepName: true,
      showStepper: true,
      showStepperLabels: true,
      blocks: [
        createParagraph('businessIntro',
          'Help us understand your business so we can tailor the conversation.'),

        createTextInput({
          name: 'businessDescription',
          label: 'What does your business do?',
          required: true,
          options: { multiline: true },
        }),

        createTextInput({
          name: 'epilotUseCase',
          label: 'What would you like to use epilot for?',
          required: true,
          options: { multiline: true },
        }),

        createMultipleChoice({
          name: 'Interested Modules',
          label: 'Which epilot modules are you most interested in?',
          options: {
            uiType: 'checkbox',
            maxSelection: 99,
            choices: [
              { label: 'Journey Builder', value: 'journey-builder' },
              { label: 'Entity Management (360)', value: 'entity-management' },
              { label: 'Workflow Automation', value: 'workflow-automation' },
              { label: 'Customer Portal', value: 'customer-portal' },
              { label: 'Product & Pricing', value: 'product-pricing' },
              { label: 'Document Generation', value: 'document-generation' },
              { label: 'Email & Messaging', value: 'email-messaging' },
              { label: 'Integrations / API', value: 'integrations-api' },
            ],
          },
        }),

        createActionBar('Next', { label: 'Continue' }),
      ],
    }),

    // ── Step 3: Contact info + submit ─────────────────────────
    createStep({
      name: 'Your Contact Details',
      showStepName: true,
      showStepper: true,
      showStepperLabels: true,
      blocks: [
        createParagraph('contactIntro',
          'Leave your contact details and our sales team will reach out within 24 hours.'),

        createPersonalInformation({
          name: 'Contact Info',
          label: 'Contact Information',
          required: true,
          options: {
            customerType: 'BUSINESS',
            purposeLabels: ['customer'],
            title: 'Contact Information',
            fields: {
              salutation: {},
              firstName: { required: true },
              lastName: { required: true },
              email: { required: true },
              telephone: { required: true },
              companyName: { required: true },
            },
          },
        }),

        createTextInput({
          name: 'additionalNotes',
          label: 'Anything else you\\'d like us to know?',
          options: { multiline: true },
        }),

        createSummary('Summary', { subTitle: 'Review your inquiry' }),

        createActionBar('Action bar', {
          label: 'Submit Inquiry',
          actionType: 'SubmitAndGoNext',
          consents: [
            { name: 'first_consent', isRequired: true, isVisible: true, text: 'I agree to the [Privacy Policy](https://epilot.cloud/privacy).' },
            { name: 'second_consent', isRequired: false, isVisible: true, text: 'I would like to receive product updates from epilot.' },
            { name: 'third_consent', isRequired: false, isVisible: false, text: null },
            { name: 'fourth_consent', isRequired: false, isVisible: false, text: null },
          ],
        }),
      ],
    }),

    // ── Step 4: Confirmation ──────────────────────────────────
    createStep({
      name: 'Confirmation',
      showStepName: false,
      showStepper: false,
      hideNextButton: true,
      blocks: [
        createSuccessMessage('Thank you', {
          title: 'Thank you for your interest in epilot!',
          text: 'Our sales team will contact you within 24 hours.',
          closeButtonText: 'Back to Playground',
        }),
      ],
    }),
  ],
})

const created = await client.createJourney(journey)
console.log('Journey created:', created.journeyId)`},{id:"product-journey",name:"Solar Product Journey",icon:"☀️",tagline:"Availability check + roof planner + products",description:"A 6-step solar installation journey: availability check → PV roof planner → product selection with cart sidebar → contact + address → review → confirmation. Uses real product IDs.",highlights:["AvailabilityCheck with Google Maps integration","PVRoofPlanner for solar panel placement","ProductSelection with pre-configured product/price IDs","MainContentCartLayout for cart sidebar on 3 steps","ShoppingCart block repeated across steps"],steps:[{name:"Check Availability",icon:"📍",color:"bg-blue-50 text-blue-700 border-blue-100",blocks:[{fn:"createParagraph()",note:"Intro text"},{fn:"createAvailabilityCheck()",note:"Postal code + Google Maps"},{fn:"createActionBar()",note:"Check & Continue"}]},{name:"Roof Planner",icon:"🏠",color:"bg-amber-50 text-amber-700 border-amber-100",blocks:[{fn:"createParagraph()",note:"Map intro"},{fn:"createPVRoofPlanner()",note:"Interactive rooftop planner"},{fn:"createActionBar()",note:"Continue to Products"}]},{name:"Select Products",icon:"📦",color:"bg-emerald-50 text-emerald-700 border-emerald-100",blocks:[{fn:"createProductSelection()",note:"3 products with pricing"},{fn:"createActionBar()",note:"Continue"},{fn:"createShoppingCart()",note:"Sidebar: Your Solar Package"}]},{name:"Your Details",icon:"👤",color:"bg-violet-50 text-violet-700 border-violet-100",blocks:[{fn:"createPersonalInformation()",note:"Private customer mode"},{fn:"createAddress()",note:"Installation address (DE)"},{fn:"createActionBar()",note:"Review Order"},{fn:"createShoppingCart()",note:"Sidebar: cart persists"}]},{name:"Review",icon:"📋",color:"bg-rose-50 text-rose-700 border-rose-100",blocks:[{fn:"createSummary()",note:"Full order review"},{fn:"createActionBar()",note:"SubmitAndGoNext + 2 consents"},{fn:"createShoppingCart()",note:"Sidebar: final cart view"}]},{name:"Confirmation",icon:"🎉",color:"bg-purple-50 text-purple-700 border-purple-100",blocks:[{fn:"createSuccessMessage()",note:"Order placed + CTA"}]}],source:`/**
 * Product Journey with Shopping Cart, Availability Check, and Map block.
 *
 * Uses real products/prices from org 739224 dev environment.
 * Creates via v1 with Cognito token for proper automation setup.
 *
 * Usage:
 *   npx tsx examples/create-product-journey.ts <COGNITO_TOKEN> <ORG_ID> [DESIGN_ID]
 */

import {
  createJourney,
  createStep,
  createAvailabilityCheck,
  createPVRoofPlanner,
  createProductSelection,
  createShoppingCart,
  createPersonalInformation,
  createAddress,
  createSummary,
  createParagraph,
  createActionBar,
  createSuccessMessage,
  JourneyClient,
} from '@epilot/epilot-journey-sdk'

const API_TOKEN = process.argv[2]
const ORG_ID = process.argv[3] ?? '739224'
const DESIGN_ID = process.argv[4] ?? 'e22481d9-256e-4d35-806b-cfbbde824392'

const client = new JourneyClient({ auth: API_TOKEN })

// Real products from org 739224 dev environment
const PRODUCTS = [
  { productId: '8e4d232b-b467-4a2b-8575-66e4b6e364cd', priceId: '2cbd6407-a316-418e-97a8-3d9e5b0a5957', isFeatured: true },
  { productId: '38211828-88e1-44ba-9b9d-6ca2f0a39a43', priceId: 'b66e1ac3-e4c0-4159-9e52-032489f76a2d', isFeatured: false },
  { productId: '9d402e77-4c88-49ab-8a07-4a81b9ba1861', priceId: '607687ac-52e8-4a3c-aa54-b78c171eb16a', isFeatured: false },
]

const journey = createJourney({
  name: 'Solar Product Journey – SDK Demo',
  organizationId: ORG_ID,
  settings: {
    designId: DESIGN_ID,
    templateId: '5aab47d0-205b-11ec-a39c-8975e6f9bf0e',
    runtimeEntities: ['ORDER'],
    safeModeAutomation: false,
  },
  steps: [

    // ── Step 1: Availability Check with Google Maps ───────────────
    createStep({
      name: 'Check Availability',
      title: 'Check Service Availability',
      showStepper: true,
      showStepperLabels: true,
      hideNextButton: true,
      blocks: [
        createParagraph('intro', 'Enter your address to check if our solar services are available in your area.'),

        createAvailabilityCheck({
          name: 'AvailabilityCheck',
          label: 'Service Availability',
          required: true,
          options: {
            countryCode: 'DE',
            availabilityMode: 'postalCode',
            enableAutoComplete: true,
            enableFreeText: false,
            googleMapsIntegrationOptions: {
              isGoogleMapsEnabled: true,
              isRepositioningAllowed: true,
            },
            fields: {
              zipCode: { required: true, label: 'Postal Code' },
            },
            postalCodeAvailabilityFields: {
              zipCity: { required: true },
              streetName: { required: true },
              houseNumber: { required: true },
            },
          },
        }),

        createActionBar('Next1', { label: 'Check & Continue' }),
      ],
    }),

    // ── Step 2: Roof Planner (Map Block) ─────────────────────────
    createStep({
      name: 'Roof Planner',
      title: 'Plan Your Solar Installation',
      showStepper: true,
      showStepperLabels: true,
      hideNextButton: true,
      blocks: [
        createParagraph('mapIntro', 'Use the map to mark your rooftop and calculate solar potential.'),

        createPVRoofPlanner({
          name: 'RoofPlanner',
          label: 'Rooftop Solar Planner',
          options: { panelLifetimeYears: 25 },
        }),

        createActionBar('Next2', { label: 'Continue to Products', showBack: true }),
      ],
    }),

    // ── Step 3: Product Selection + Cart Sidebar ─────────────────
    createStep({
      name: 'Select Products',
      title: 'Choose Your Solar Package',
      layout: 'MainContentCartLayout',
      showStepper: true,
      showStepperLabels: true,
      hideNextButton: true,
      blocks: [
        createProductSelection({
          name: 'Products',
          label: 'Available Solar Packages',
          required: true,
          options: {
            catalog: 'epilot',
            productSelectionConfiguratorType: 'product_selector',
            selectionType: 'many',
            showQuantity: false,
            showImages: true,
            displayPriceComponents: true,
            products: PRODUCTS,
          },
        }),

        createActionBar('Next3', { label: 'Continue', showBack: true }),
      ],
      sidebarBlocks: [
        createShoppingCart('Cart', {
          cartTitle: 'Your Solar Package',
          cartFootnote: 'All prices include VAT (19%).',
        }),
      ],
    }),

    // ── Step 4: Contact & Address ────────────────────────────────
    createStep({
      name: 'Your Details',
      title: 'Contact Information',
      layout: 'MainContentCartLayout',
      showStepper: true,
      showStepperLabels: true,
      hideNextButton: true,
      blocks: [
        createPersonalInformation({
          name: 'Contact Info',
          required: true,
          options: {
            customerType: 'PRIVATE',
            purposeLabels: ['customer'],
            title: 'Your Contact Details',
            fields: {
              salutation: {},
              firstName: { required: true },
              lastName: { required: true },
              email: { required: true },
              telephone: { required: true },
            },
          },
        }),

        createAddress({
          name: 'Address',
          required: true,
          options: {
            title: 'Installation Address',
            countryAddressSettings: {
              countryCode: 'DE',
              enableAutoComplete: true,
              enableFreeText: false,
            },
            fields: {
              zipCity: { required: true },
              streetName: { required: true },
              houseNumber: { required: true },
              extention: {},
            },
          },
        }),

        createActionBar('Next4', { label: 'Review Order', showBack: true }),
      ],
      sidebarBlocks: [
        createShoppingCart('Cart2', {
          cartTitle: 'Your Solar Package',
          cartFootnote: 'All prices include VAT (19%).',
        }),
      ],
    }),

    // ── Step 5: Summary & Submit ─────────────────────────────────
    createStep({
      name: 'Review',
      title: 'Review & Place Order',
      layout: 'MainContentCartLayout',
      showStepper: true,
      showStepperLabels: true,
      hideNextButton: true,
      blocks: [
        createSummary('Summary', { subTitle: 'Please review your solar installation order' }),

        createActionBar('Submit', {
          label: 'Place Order',
          actionType: 'SubmitAndGoNext',
          showBack: true,
          consents: [
            { name: 'first_consent', isRequired: true, isVisible: true, text: 'I accept the [Terms and Conditions](https://epilot.cloud/agb) and [Privacy Policy](https://epilot.cloud/privacy).' },
            { name: 'second_consent', isRequired: false, isVisible: true, text: 'I agree to receive updates about my solar installation via email.' },
            { name: 'third_consent', isRequired: false, isVisible: false, text: null },
            { name: 'fourth_consent', isRequired: false, isVisible: false, text: null },
          ],
        }),
      ],
      sidebarBlocks: [
        createShoppingCart('Cart3', {
          cartTitle: 'Your Solar Package',
          cartFootnote: 'All prices include VAT (19%).',
        }),
      ],
    }),

    // ── Step 6: Confirmation ─────────────────────────────────────
    createStep({
      name: 'Confirmation',
      showStepper: false,
      showStepName: false,
      hideNextButton: true,
      blocks: [
        createSuccessMessage('ThankYou', {
          title: 'Your solar order has been placed!',
          text: 'Thank you for choosing epilot Solar. Our team will review your rooftop assessment and contact you within 2 business days.',
          closeButtonText: 'Back to Homepage',
        }),
      ],
    }),
  ],
})

const created = await client.createJourney(journey)
console.log('Journey created:', created.journeyId)`},{id:"shopping-cart",name:"Shopping Cart",icon:"🛒",tagline:"Product selection with cart sidebar",description:"A 4-step commerce journey: product selection with cart sidebar → contact details → review + submit → confirmation. Demonstrates the MainContentCartLayout pattern.",highlights:["MainContentCartLayout for sidebar cart","ProductSelection with 3 products (multi-select)","Business customer type on PersonalInformation","ShoppingCart with custom title and footnote"],steps:[{name:"Select Products",icon:"📦",color:"bg-blue-50 text-blue-700 border-blue-100",blocks:[{fn:"createParagraph()",note:"Catalog intro"},{fn:"createProductSelection()",note:"3 products, multi-select"},{fn:"createActionBar()",note:"Continue to Checkout"},{fn:"createShoppingCart()",note:"Sidebar: Your Cart"}]},{name:"Your Details",icon:"👤",color:"bg-amber-50 text-amber-700 border-amber-100",blocks:[{fn:"createPersonalInformation()",note:"Business mode + company name"},{fn:"createActionBar()",note:"Review Order"}]},{name:"Review",icon:"📋",color:"bg-emerald-50 text-emerald-700 border-emerald-100",blocks:[{fn:"createSummary()",note:"Order details review"},{fn:"createActionBar()",note:"SubmitAndGoNext + terms consent"}]},{name:"Confirmation",icon:"🎉",color:"bg-purple-50 text-purple-700 border-purple-100",blocks:[{fn:"createSuccessMessage()",note:"Order placed + CTA"}]}],source:`/**
 * Shopping Cart Journey – demonstrates ProductSelection + ShoppingCart sidebar.
 *
 * Uses real products from org 739224 dev environment.
 *
 * Usage:
 *   npx tsx examples/create-shopping-cart-journey.ts <API_TOKEN> <ORG_ID> [DESIGN_ID]
 */

import {
  createJourney,
  createStep,
  createProductSelection,
  createShoppingCart,
  createPersonalInformation,
  createSummary,
  createParagraph,
  createActionBar,
  createSuccessMessage,
  JourneyClient,
} from '@epilot/epilot-journey-sdk'

const API_TOKEN = process.argv[2]
const ORG_ID = process.argv[3] ?? '739224'

const client = new JourneyClient({ auth: API_TOKEN })

// Real products from org 739224 dev environment
const PRODUCTS = [
  { productId: '8e4d232b-b467-4a2b-8575-66e4b6e364cd', priceId: '2cbd6407-a316-418e-97a8-3d9e5b0a5957', isFeatured: true },
  { productId: '38211828-88e1-44ba-9b9d-6ca2f0a39a43', priceId: 'b66e1ac3-e4c0-4159-9e52-032489f76a2d', isFeatured: false },
  { productId: '368e3b38-0bd9-408b-ad00-9f49e3a90974', priceId: '5cf6c586-694f-4031-8ba9-7cb9735bcc35', isFeatured: false },
]

const journey = createJourney({
  name: 'Shopping Cart Demo',
  organizationId: ORG_ID,
  steps: [

    // ── Step 1: Product Selection with Cart Sidebar ───────────────
    createStep({
      name: 'Select Products',
      title: 'Choose Your Products',
      layout: 'MainContentCartLayout',
      showStepper: true,
      showStepperLabels: true,
      hideNextButton: true,
      blocks: [
        createParagraph('intro', 'Browse our catalog and add products to your cart.'),

        createProductSelection({
          name: 'selectedProducts',
          label: 'Available Products',
          required: true,
          options: {
            catalog: 'epilot',
            productSelectionConfiguratorType: 'product_selector',
            selectionType: 'many',
            showQuantity: false,
            products: PRODUCTS,
          },
        }),

        createActionBar('Next1', { label: 'Continue to Checkout' }),
      ],
      sidebarBlocks: [
        createShoppingCart('cart', {
          cartTitle: 'Your Cart',
          cartFootnote: 'Prices include VAT where applicable.',
        }),
      ],
    }),

    // ── Step 2: Contact Details ───────────────────────────────────
    createStep({
      name: 'Your Details',
      title: 'Contact Information',
      showStepper: true,
      showStepperLabels: true,
      hideNextButton: true,
      blocks: [
        createPersonalInformation({
          name: 'Contact',
          required: true,
          options: {
            customerType: 'BUSINESS',
            purposeLabels: ['customer'],
            title: 'Your Details',
            fields: {
              firstName: { required: true },
              lastName: { required: true },
              email: { required: true },
              telephone: {},
              companyName: { required: true },
            },
          },
        }),

        createActionBar('Next2', {
          label: 'Review Order',
          showBack: true,
        }),
      ],
    }),

    // ── Step 3: Review & Submit ───────────────────────────────────
    createStep({
      name: 'Review',
      title: 'Review Your Order',
      showStepper: true,
      showStepperLabels: true,
      hideNextButton: true,
      blocks: [
        createSummary('orderSummary', { subTitle: 'Please review your order details' }),

        createActionBar('Submit', {
          label: 'Place Order',
          actionType: 'SubmitAndGoNext',
          showBack: true,
          consents: [
            { name: 'first_consent', isRequired: true, isVisible: true, text: 'I accept the [Terms and Conditions](https://epilot.cloud/agb) and [Privacy Policy](https://epilot.cloud/privacy).' },
            { name: 'second_consent', isRequired: false, isVisible: false, text: null },
            { name: 'third_consent', isRequired: false, isVisible: false, text: null },
            { name: 'fourth_consent', isRequired: false, isVisible: false, text: null },
          ],
        }),
      ],
    }),

    // ── Step 4: Confirmation ─────────────────────────────────────
    createStep({
      name: 'Confirmation',
      showStepper: false,
      showStepName: false,
      hideNextButton: true,
      blocks: [
        createSuccessMessage('thankYou', {
          title: 'Order Placed!',
          text: 'Thank you for your order. We will process it and send you a confirmation email shortly.',
          closeButtonText: 'Back to Shop',
        }),
      ],
    }),
  ],
})

const created = await client.createJourney(journey)
console.log('Journey created:', created.journeyId)`}];function Op({step:c}){return a.jsxs("div",{className:"bg-white border rounded-2xl overflow-hidden shadow-sm",children:[a.jsxs("div",{className:`px-4 py-3 flex items-center gap-2 border-b ${c.color} border-opacity-50`,children:[a.jsx("span",{className:"text-lg",children:c.icon}),a.jsx("p",{className:"font-bold text-sm",children:c.name})]}),a.jsx("div",{className:"p-3 space-y-2",children:c.blocks.map((k,d)=>a.jsxs("div",{className:"text-xs",children:[a.jsx("p",{className:"font-mono text-primary-600 font-semibold",children:k.fn}),a.jsx("p",{className:"text-gray-400 mt-0.5",children:k.note})]},d))})]})}function Lp({example:c}){return a.jsxs("div",{children:[a.jsxs("div",{className:"mb-8",children:[a.jsxs("div",{className:"flex items-center gap-3 mb-3",children:[a.jsx("span",{className:"text-3xl",children:c.icon}),a.jsxs("div",{children:[a.jsx("h2",{className:"text-xl font-bold text-gray-900",children:c.name}),a.jsx("p",{className:"text-sm text-gray-400",children:c.tagline})]})]}),a.jsx("p",{className:"text-sm text-gray-600 leading-relaxed max-w-3xl",children:c.description})]}),a.jsxs("div",{className:"mb-8",children:[a.jsx("h3",{className:"text-sm font-bold text-gray-700 uppercase tracking-wider mb-3",children:"Key Patterns"}),a.jsx("div",{className:"flex flex-wrap gap-2",children:c.highlights.map(k=>a.jsx("span",{className:"inline-flex items-center px-2.5 py-1 rounded-lg bg-primary-50 border border-primary-100 text-xs text-primary-700 font-medium",children:k},k))})]}),a.jsx("h3",{className:"text-sm font-bold text-gray-700 uppercase tracking-wider mb-3",children:"Step Breakdown"}),a.jsx("div",{className:`grid grid-cols-1 gap-4 mb-10 ${c.steps.length<=4?"md:grid-cols-2 lg:grid-cols-4":c.steps.length<=6?"md:grid-cols-2 lg:grid-cols-3":"md:grid-cols-2 lg:grid-cols-4"}`,children:c.steps.map(k=>a.jsx(Op,{step:k},k.name))}),a.jsx("h3",{className:"text-sm font-bold text-gray-700 uppercase tracking-wider mb-2",children:"Full Source"}),a.jsx(se,{code:c.source,title:`${c.id}.ts`,language:"typescript"})]})}function Mp(){const[c,k]=Ie.useState(Sr[0].id),d=Sr.find(_=>_.id===c)??Sr[0];return a.jsxs("div",{children:[a.jsxs("div",{className:"mb-8",children:[a.jsxs("div",{className:"inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-xs font-semibold mb-4",children:[a.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"}),Sr.length," End-to-End Examples"]}),a.jsx("h1",{className:"section-title",children:"Example Journeys"}),a.jsx("p",{className:"section-desc",children:"Complete journey scripts built with the SDK factory functions. Each example is a runnable script that creates a real journey via the API."})]}),a.jsx("div",{className:"flex flex-wrap gap-2 mb-8",children:Sr.map(_=>a.jsxs("button",{onClick:()=>k(_.id),className:`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${c===_.id?"bg-primary-600 text-white shadow-md shadow-primary-200":"bg-white text-gray-600 border border-gray-200 hover:border-primary-200 hover:text-primary-700"}`,children:[a.jsx("span",{children:_.icon}),a.jsx("span",{children:_.name})]},_.id))}),a.jsx(Lp,{example:d})]})}const Up={overview:$u,catalog:xp,factories:vp,"client-api":kp,"agent-guide":Sp,"mcp-server":Bp,"example-journey":Mp},zp=lp(Qu),Gu=()=>window.matchMedia("(max-width: 767px)").matches;function Fp(){const[c,k]=Ie.useState("overview"),[d,_]=Ie.useState(()=>!Gu());Ie.useEffect(()=>{const R=window.matchMedia("(max-width: 767px)"),L=G=>{G.matches&&_(!1)};return R.addEventListener("change",L),()=>R.removeEventListener("change",L)},[]);const C=Ie.useCallback(R=>{k(R),Gu()&&_(!1)},[]),b=zp.find(R=>R.id===c),$=Up[c]??$u;return a.jsxs("div",{className:"flex h-screen overflow-hidden bg-surface-50",children:[a.jsxs("aside",{className:`ai-sidebar ${d?"w-72":"w-0 overflow-hidden"} flex-shrink-0 flex flex-col transition-all duration-300`,children:[a.jsxs("div",{className:"sb-brand",children:[a.jsxs("div",{className:"flex items-center gap-3",children:[a.jsx("div",{className:"sb-logo",children:a.jsx("svg",{className:"w-5 h-5 text-white",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:a.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"})})}),a.jsxs("div",{children:[a.jsx("div",{className:"sb-title",children:"Journey SDK"}),a.jsxs("div",{className:"sb-subtitle",children:["Agentic Ready",a.jsx("span",{className:"sb-cursor"})]})]})]}),a.jsxs("a",{href:"https://docs.epilot.io/docs/journeys/journey-builder",className:"flex items-center gap-1.5 text-[11px] hover:text-primary-400 transition-colors mt-3 group",style:{color:"rgba(255,255,255,0.35)"},children:[a.jsx("svg",{className:"w-3.5 h-3.5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:a.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M10 19l-7-7m0 0l7-7m-7 7h18"})}),a.jsx("span",{className:"group-hover:underline",children:"Back to Dev Center"})]}),a.jsxs("div",{className:"flex items-center gap-2 mt-2",children:[a.jsxs("span",{className:"sb-chip",children:[a.jsx("strong",{children:Yt.length})," Blocks"]}),a.jsxs("span",{className:"sb-chip",children:[a.jsx("strong",{children:"19"})," Factories"]})]})]}),a.jsx("nav",{className:"flex-1 overflow-y-auto py-3 px-3",children:Qu.map(R=>Yu(R)?a.jsxs("div",{className:"mt-5 first:mt-0",children:[a.jsx("div",{className:"sb-group",children:R.group}),a.jsx("div",{className:"space-y-0.5",children:R.items.map(L=>a.jsxs("button",{onClick:()=>C(L.id),className:`sb-nav-item ${c===L.id?"active":""}`,children:[a.jsx("span",{className:"sb-dot"}),a.jsx("span",{className:"sb-nav-icon",children:L.icon}),a.jsx("span",{children:L.label})]},L.id))})]},R.group):a.jsxs("button",{onClick:()=>C(R.id),className:`sb-nav-item ${c===R.id?"active":""}`,children:[a.jsx("span",{className:"sb-dot"}),a.jsx("span",{className:"sb-nav-icon",children:R.icon}),a.jsx("span",{children:R.label})]},R.id))}),a.jsxs("div",{className:"sb-footer",children:[a.jsxs("div",{className:"sb-status-line",children:[a.jsx("span",{className:"agent-dot"}),a.jsx("span",{className:"sb-version",children:"v1.0.7"}),a.jsx("span",{style:{opacity:.5},children:"ready"})]}),a.jsxs("div",{className:"sb-credit",children:["Built by"," ",a.jsx("a",{href:"https://github.com/jpinho",target:"_blank",rel:"noopener noreferrer",children:"@jpinho"})]})]})]}),a.jsxs("main",{className:"flex-1 overflow-y-auto bg-grid-pattern bg-grid",children:[a.jsxs("div",{className:"topbar",children:[a.jsx("button",{onClick:()=>_(!d),className:"p-2 rounded-xl hover:bg-gray-100 text-gray-400 transition-colors",children:a.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:a.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 6h16M4 12h16M4 18h16"})})}),a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx("span",{className:"text-lg",children:b==null?void 0:b.icon}),a.jsx("h2",{className:"text-sm font-bold text-gray-700",children:b==null?void 0:b.label})]}),a.jsxs("div",{className:"ml-auto hidden md:flex items-center gap-2.5",children:[a.jsxs("div",{className:"flex items-center gap-1.5 text-[11px] text-gray-400",children:[a.jsx("span",{className:"agent-dot"}),a.jsx("span",{children:"AI-ready SDK"})]}),a.jsx("a",{href:"https://github.com/epilot-dev/epilot-journey-sdk",target:"_blank",rel:"noopener noreferrer",className:"p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors",children:a.jsx("svg",{className:"w-4 h-4",fill:"currentColor",viewBox:"0 0 24 24",children:a.jsx("path",{d:"M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"})})})]})]}),a.jsx("div",{className:"p-8 max-w-7xl mx-auto",children:a.jsx($,{onNavigate:C})})]})]})}op.createRoot(document.getElementById("root")).render(a.jsx(Kd.StrictMode,{children:a.jsx(Fp,{})}));
