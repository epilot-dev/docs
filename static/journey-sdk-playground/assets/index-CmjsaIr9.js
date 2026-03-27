(function(){const w=document.createElement("link").relList;if(w&&w.supports&&w.supports("modulepreload"))return;for(const N of document.querySelectorAll('link[rel="modulepreload"]'))A(N);new MutationObserver(N=>{for(const C of N)if(C.type==="childList")for(const Y of C.addedNodes)Y.tagName==="LINK"&&Y.rel==="modulepreload"&&A(Y)}).observe(document,{childList:!0,subtree:!0});function c(N){const C={};return N.integrity&&(C.integrity=N.integrity),N.referrerPolicy&&(C.referrerPolicy=N.referrerPolicy),N.crossOrigin==="use-credentials"?C.credentials="include":N.crossOrigin==="anonymous"?C.credentials="omit":C.credentials="same-origin",C}function A(N){if(N.ep)return;N.ep=!0;const C=c(N);fetch(N.href,C)}})();function Hu(d){return d&&d.__esModule&&Object.prototype.hasOwnProperty.call(d,"default")?d.default:d}var Ti={exports:{}},wr={},Ii={exports:{}},z={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ru;function Qd(){if(Ru)return z;Ru=1;var d=Symbol.for("react.element"),w=Symbol.for("react.portal"),c=Symbol.for("react.fragment"),A=Symbol.for("react.strict_mode"),N=Symbol.for("react.profiler"),C=Symbol.for("react.provider"),Y=Symbol.for("react.context"),R=Symbol.for("react.forward_ref"),O=Symbol.for("react.suspense"),J=Symbol.for("react.memo"),he=Symbol.for("react.lazy"),le=Symbol.iterator;function te(f){return f===null||typeof f!="object"?null:(f=le&&f[le]||f["@@iterator"],typeof f=="function"?f:null)}var We={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Je=Object.assign,ne={};function $(f,v,U){this.props=f,this.context=v,this.refs=ne,this.updater=U||We}$.prototype.isReactComponent={},$.prototype.setState=function(f,v){if(typeof f!="object"&&typeof f!="function"&&f!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,f,v,"setState")},$.prototype.forceUpdate=function(f){this.updater.enqueueForceUpdate(this,f,"forceUpdate")};function vt(){}vt.prototype=$.prototype;function ct(f,v,U){this.props=f,this.context=v,this.refs=ne,this.updater=U||We}var et=ct.prototype=new vt;et.constructor=ct,Je(et,$.prototype),et.isPureReactComponent=!0;var ke=Array.isArray,tt=Object.prototype.hasOwnProperty,Ee={current:null},Ie={key:!0,ref:!0,__self:!0,__source:!0};function He(f,v,U){var F,q={},G=null,K=null;if(v!=null)for(F in v.ref!==void 0&&(K=v.ref),v.key!==void 0&&(G=""+v.key),v)tt.call(v,F)&&!Ie.hasOwnProperty(F)&&(q[F]=v[F]);var H=arguments.length-2;if(H===1)q.children=U;else if(1<H){for(var re=Array(H),ze=0;ze<H;ze++)re[ze]=arguments[ze+2];q.children=re}if(f&&f.defaultProps)for(F in H=f.defaultProps,H)q[F]===void 0&&(q[F]=H[F]);return{$$typeof:d,type:f,key:G,ref:K,props:q,_owner:Ee.current}}function jt(f,v){return{$$typeof:d,type:f.type,key:v,ref:f.ref,props:f.props,_owner:f._owner}}function xt(f){return typeof f=="object"&&f!==null&&f.$$typeof===d}function $t(f){var v={"=":"=0",":":"=2"};return"$"+f.replace(/[=:]/g,function(U){return v[U]})}var dt=/\/+/g;function Ue(f,v){return typeof f=="object"&&f!==null&&f.key!=null?$t(""+f.key):v.toString(36)}function nt(f,v,U,F,q){var G=typeof f;(G==="undefined"||G==="boolean")&&(f=null);var K=!1;if(f===null)K=!0;else switch(G){case"string":case"number":K=!0;break;case"object":switch(f.$$typeof){case d:case w:K=!0}}if(K)return K=f,q=q(K),f=F===""?"."+Ue(K,0):F,ke(q)?(U="",f!=null&&(U=f.replace(dt,"$&/")+"/"),nt(q,v,U,"",function(ze){return ze})):q!=null&&(xt(q)&&(q=jt(q,U+(!q.key||K&&K.key===q.key?"":(""+q.key).replace(dt,"$&/")+"/")+f)),v.push(q)),1;if(K=0,F=F===""?".":F+":",ke(f))for(var H=0;H<f.length;H++){G=f[H];var re=F+Ue(G,H);K+=nt(G,v,U,re,q)}else if(re=te(f),typeof re=="function")for(f=re.call(f),H=0;!(G=f.next()).done;)G=G.value,re=F+Ue(G,H++),K+=nt(G,v,U,re,q);else if(G==="object")throw v=String(f),Error("Objects are not valid as a React child (found: "+(v==="[object Object]"?"object with keys {"+Object.keys(f).join(", ")+"}":v)+"). If you meant to render a collection of children, use an array instead.");return K}function pt(f,v,U){if(f==null)return f;var F=[],q=0;return nt(f,F,"","",function(G){return v.call(U,G,q++)}),F}function Ae(f){if(f._status===-1){var v=f._result;v=v(),v.then(function(U){(f._status===0||f._status===-1)&&(f._status=1,f._result=U)},function(U){(f._status===0||f._status===-1)&&(f._status=2,f._result=U)}),f._status===-1&&(f._status=0,f._result=v)}if(f._status===1)return f._result.default;throw f._result}var se={current:null},b={transition:null},L={ReactCurrentDispatcher:se,ReactCurrentBatchConfig:b,ReactCurrentOwner:Ee};function j(){throw Error("act(...) is not supported in production builds of React.")}return z.Children={map:pt,forEach:function(f,v,U){pt(f,function(){v.apply(this,arguments)},U)},count:function(f){var v=0;return pt(f,function(){v++}),v},toArray:function(f){return pt(f,function(v){return v})||[]},only:function(f){if(!xt(f))throw Error("React.Children.only expected to receive a single React element child.");return f}},z.Component=$,z.Fragment=c,z.Profiler=N,z.PureComponent=ct,z.StrictMode=A,z.Suspense=O,z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=L,z.act=j,z.cloneElement=function(f,v,U){if(f==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+f+".");var F=Je({},f.props),q=f.key,G=f.ref,K=f._owner;if(v!=null){if(v.ref!==void 0&&(G=v.ref,K=Ee.current),v.key!==void 0&&(q=""+v.key),f.type&&f.type.defaultProps)var H=f.type.defaultProps;for(re in v)tt.call(v,re)&&!Ie.hasOwnProperty(re)&&(F[re]=v[re]===void 0&&H!==void 0?H[re]:v[re])}var re=arguments.length-2;if(re===1)F.children=U;else if(1<re){H=Array(re);for(var ze=0;ze<re;ze++)H[ze]=arguments[ze+2];F.children=H}return{$$typeof:d,type:f.type,key:q,ref:G,props:F,_owner:K}},z.createContext=function(f){return f={$$typeof:Y,_currentValue:f,_currentValue2:f,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},f.Provider={$$typeof:C,_context:f},f.Consumer=f},z.createElement=He,z.createFactory=function(f){var v=He.bind(null,f);return v.type=f,v},z.createRef=function(){return{current:null}},z.forwardRef=function(f){return{$$typeof:R,render:f}},z.isValidElement=xt,z.lazy=function(f){return{$$typeof:he,_payload:{_status:-1,_result:f},_init:Ae}},z.memo=function(f,v){return{$$typeof:J,type:f,compare:v===void 0?null:v}},z.startTransition=function(f){var v=b.transition;b.transition={};try{f()}finally{b.transition=v}},z.unstable_act=j,z.useCallback=function(f,v){return se.current.useCallback(f,v)},z.useContext=function(f){return se.current.useContext(f)},z.useDebugValue=function(){},z.useDeferredValue=function(f){return se.current.useDeferredValue(f)},z.useEffect=function(f,v){return se.current.useEffect(f,v)},z.useId=function(){return se.current.useId()},z.useImperativeHandle=function(f,v,U){return se.current.useImperativeHandle(f,v,U)},z.useInsertionEffect=function(f,v){return se.current.useInsertionEffect(f,v)},z.useLayoutEffect=function(f,v){return se.current.useLayoutEffect(f,v)},z.useMemo=function(f,v){return se.current.useMemo(f,v)},z.useReducer=function(f,v,U){return se.current.useReducer(f,v,U)},z.useRef=function(f){return se.current.useRef(f)},z.useState=function(f){return se.current.useState(f)},z.useSyncExternalStore=function(f,v,U){return se.current.useSyncExternalStore(f,v,U)},z.useTransition=function(){return se.current.useTransition()},z.version="18.3.1",z}var Du;function Di(){return Du||(Du=1,Ii.exports=Qd()),Ii.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Bu;function $d(){if(Bu)return wr;Bu=1;var d=Di(),w=Symbol.for("react.element"),c=Symbol.for("react.fragment"),A=Object.prototype.hasOwnProperty,N=d.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,C={key:!0,ref:!0,__self:!0,__source:!0};function Y(R,O,J){var he,le={},te=null,We=null;J!==void 0&&(te=""+J),O.key!==void 0&&(te=""+O.key),O.ref!==void 0&&(We=O.ref);for(he in O)A.call(O,he)&&!C.hasOwnProperty(he)&&(le[he]=O[he]);if(R&&R.defaultProps)for(he in O=R.defaultProps,O)le[he]===void 0&&(le[he]=O[he]);return{$$typeof:w,type:R,key:te,ref:We,props:le,_owner:N.current}}return wr.Fragment=c,wr.jsx=Y,wr.jsxs=Y,wr}var Lu;function Yd(){return Lu||(Lu=1,Ti.exports=$d()),Ti.exports}var a=Yd(),Te=Di();const Kd=Hu(Te);var Do={},Ai={exports:{}},Oe={},_i={exports:{}},Ri={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ou;function Xd(){return Ou||(Ou=1,(function(d){function w(b,L){var j=b.length;b.push(L);e:for(;0<j;){var f=j-1>>>1,v=b[f];if(0<N(v,L))b[f]=L,b[j]=v,j=f;else break e}}function c(b){return b.length===0?null:b[0]}function A(b){if(b.length===0)return null;var L=b[0],j=b.pop();if(j!==L){b[0]=j;e:for(var f=0,v=b.length,U=v>>>1;f<U;){var F=2*(f+1)-1,q=b[F],G=F+1,K=b[G];if(0>N(q,j))G<v&&0>N(K,q)?(b[f]=K,b[G]=j,f=G):(b[f]=q,b[F]=j,f=F);else if(G<v&&0>N(K,j))b[f]=K,b[G]=j,f=G;else break e}}return L}function N(b,L){var j=b.sortIndex-L.sortIndex;return j!==0?j:b.id-L.id}if(typeof performance=="object"&&typeof performance.now=="function"){var C=performance;d.unstable_now=function(){return C.now()}}else{var Y=Date,R=Y.now();d.unstable_now=function(){return Y.now()-R}}var O=[],J=[],he=1,le=null,te=3,We=!1,Je=!1,ne=!1,$=typeof setTimeout=="function"?setTimeout:null,vt=typeof clearTimeout=="function"?clearTimeout:null,ct=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function et(b){for(var L=c(J);L!==null;){if(L.callback===null)A(J);else if(L.startTime<=b)A(J),L.sortIndex=L.expirationTime,w(O,L);else break;L=c(J)}}function ke(b){if(ne=!1,et(b),!Je)if(c(O)!==null)Je=!0,Ae(tt);else{var L=c(J);L!==null&&se(ke,L.startTime-b)}}function tt(b,L){Je=!1,ne&&(ne=!1,vt(He),He=-1),We=!0;var j=te;try{for(et(L),le=c(O);le!==null&&(!(le.expirationTime>L)||b&&!$t());){var f=le.callback;if(typeof f=="function"){le.callback=null,te=le.priorityLevel;var v=f(le.expirationTime<=L);L=d.unstable_now(),typeof v=="function"?le.callback=v:le===c(O)&&A(O),et(L)}else A(O);le=c(O)}if(le!==null)var U=!0;else{var F=c(J);F!==null&&se(ke,F.startTime-L),U=!1}return U}finally{le=null,te=j,We=!1}}var Ee=!1,Ie=null,He=-1,jt=5,xt=-1;function $t(){return!(d.unstable_now()-xt<jt)}function dt(){if(Ie!==null){var b=d.unstable_now();xt=b;var L=!0;try{L=Ie(!0,b)}finally{L?Ue():(Ee=!1,Ie=null)}}else Ee=!1}var Ue;if(typeof ct=="function")Ue=function(){ct(dt)};else if(typeof MessageChannel<"u"){var nt=new MessageChannel,pt=nt.port2;nt.port1.onmessage=dt,Ue=function(){pt.postMessage(null)}}else Ue=function(){$(dt,0)};function Ae(b){Ie=b,Ee||(Ee=!0,Ue())}function se(b,L){He=$(function(){b(d.unstable_now())},L)}d.unstable_IdlePriority=5,d.unstable_ImmediatePriority=1,d.unstable_LowPriority=4,d.unstable_NormalPriority=3,d.unstable_Profiling=null,d.unstable_UserBlockingPriority=2,d.unstable_cancelCallback=function(b){b.callback=null},d.unstable_continueExecution=function(){Je||We||(Je=!0,Ae(tt))},d.unstable_forceFrameRate=function(b){0>b||125<b?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):jt=0<b?Math.floor(1e3/b):5},d.unstable_getCurrentPriorityLevel=function(){return te},d.unstable_getFirstCallbackNode=function(){return c(O)},d.unstable_next=function(b){switch(te){case 1:case 2:case 3:var L=3;break;default:L=te}var j=te;te=L;try{return b()}finally{te=j}},d.unstable_pauseExecution=function(){},d.unstable_requestPaint=function(){},d.unstable_runWithPriority=function(b,L){switch(b){case 1:case 2:case 3:case 4:case 5:break;default:b=3}var j=te;te=b;try{return L()}finally{te=j}},d.unstable_scheduleCallback=function(b,L,j){var f=d.unstable_now();switch(typeof j=="object"&&j!==null?(j=j.delay,j=typeof j=="number"&&0<j?f+j:f):j=f,b){case 1:var v=-1;break;case 2:v=250;break;case 5:v=1073741823;break;case 4:v=1e4;break;default:v=5e3}return v=j+v,b={id:he++,callback:L,priorityLevel:b,startTime:j,expirationTime:v,sortIndex:-1},j>f?(b.sortIndex=j,w(J,b),c(O)===null&&b===c(J)&&(ne?(vt(He),He=-1):ne=!0,se(ke,j-f))):(b.sortIndex=v,w(O,b),Je||We||(Je=!0,Ae(tt))),b},d.unstable_shouldYield=$t,d.unstable_wrapCallback=function(b){var L=te;return function(){var j=te;te=L;try{return b.apply(this,arguments)}finally{te=j}}}})(Ri)),Ri}var Mu;function Zd(){return Mu||(Mu=1,_i.exports=Xd()),_i.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Uu;function ep(){if(Uu)return Oe;Uu=1;var d=Di(),w=Zd();function c(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var A=new Set,N={};function C(e,t){Y(e,t),Y(e+"Capture",t)}function Y(e,t){for(N[e]=t,e=0;e<t.length;e++)A.add(t[e])}var R=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),O=Object.prototype.hasOwnProperty,J=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,he={},le={};function te(e){return O.call(le,e)?!0:O.call(he,e)?!1:J.test(e)?le[e]=!0:(he[e]=!0,!1)}function We(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Je(e,t,n,r){if(t===null||typeof t>"u"||We(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function ne(e,t,n,r,o,l,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=l,this.removeEmptyString=i}var $={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){$[e]=new ne(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];$[t]=new ne(t,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){$[e]=new ne(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){$[e]=new ne(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){$[e]=new ne(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){$[e]=new ne(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){$[e]=new ne(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){$[e]=new ne(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){$[e]=new ne(e,5,!1,e.toLowerCase(),null,!1,!1)});var vt=/[\-:]([a-z])/g;function ct(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(vt,ct);$[t]=new ne(t,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(vt,ct);$[t]=new ne(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(vt,ct);$[t]=new ne(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){$[e]=new ne(e,1,!1,e.toLowerCase(),null,!1,!1)}),$.xlinkHref=new ne("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){$[e]=new ne(e,1,!1,e.toLowerCase(),null,!0,!0)});function et(e,t,n,r){var o=$.hasOwnProperty(t)?$[t]:null;(o!==null?o.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Je(t,n,o,r)&&(n=null),r||o===null?te(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):o.mustUseProperty?e[o.propertyName]=n===null?o.type===3?!1:"":n:(t=o.attributeName,r=o.attributeNamespace,n===null?e.removeAttribute(t):(o=o.type,n=o===3||o===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var ke=d.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,tt=Symbol.for("react.element"),Ee=Symbol.for("react.portal"),Ie=Symbol.for("react.fragment"),He=Symbol.for("react.strict_mode"),jt=Symbol.for("react.profiler"),xt=Symbol.for("react.provider"),$t=Symbol.for("react.context"),dt=Symbol.for("react.forward_ref"),Ue=Symbol.for("react.suspense"),nt=Symbol.for("react.suspense_list"),pt=Symbol.for("react.memo"),Ae=Symbol.for("react.lazy"),se=Symbol.for("react.offscreen"),b=Symbol.iterator;function L(e){return e===null||typeof e!="object"?null:(e=b&&e[b]||e["@@iterator"],typeof e=="function"?e:null)}var j=Object.assign,f;function v(e){if(f===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);f=t&&t[1]||""}return`
`+f+e}var U=!1;function F(e,t){if(!e||U)return"";U=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(y){var r=y}Reflect.construct(e,[],t)}else{try{t.call()}catch(y){r=y}e.call(t.prototype)}else{try{throw Error()}catch(y){r=y}e()}}catch(y){if(y&&r&&typeof y.stack=="string"){for(var o=y.stack.split(`
`),l=r.stack.split(`
`),i=o.length-1,s=l.length-1;1<=i&&0<=s&&o[i]!==l[s];)s--;for(;1<=i&&0<=s;i--,s--)if(o[i]!==l[s]){if(i!==1||s!==1)do if(i--,s--,0>s||o[i]!==l[s]){var u=`
`+o[i].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=i&&0<=s);break}}}finally{U=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?v(e):""}function q(e){switch(e.tag){case 5:return v(e.type);case 16:return v("Lazy");case 13:return v("Suspense");case 19:return v("SuspenseList");case 0:case 2:case 15:return e=F(e.type,!1),e;case 11:return e=F(e.type.render,!1),e;case 1:return e=F(e.type,!0),e;default:return""}}function G(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Ie:return"Fragment";case Ee:return"Portal";case jt:return"Profiler";case He:return"StrictMode";case Ue:return"Suspense";case nt:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case $t:return(e.displayName||"Context")+".Consumer";case xt:return(e._context.displayName||"Context")+".Provider";case dt:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case pt:return t=e.displayName||null,t!==null?t:G(e.type)||"Memo";case Ae:t=e._payload,e=e._init;try{return G(e(t))}catch{}}return null}function K(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return G(t);case 8:return t===He?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function H(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function re(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function ze(e){var t=re(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var o=n.get,l=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(i){r=""+i,l.call(this,i)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(i){r=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Cr(e){e._valueTracker||(e._valueTracker=ze(e))}function Ui(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=re(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Nr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Lo(e,t){var n=t.checked;return j({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function zi(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=H(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Fi(e,t){t=t.checked,t!=null&&et(e,"checked",t,!1)}function Oo(e,t){Fi(e,t);var n=H(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Mo(e,t.type,n):t.hasOwnProperty("defaultValue")&&Mo(e,t.type,H(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Vi(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Mo(e,t,n){(t!=="number"||Nr(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Bn=Array.isArray;function cn(e,t,n,r){if(e=e.options,t){t={};for(var o=0;o<n.length;o++)t["$"+n[o]]=!0;for(n=0;n<e.length;n++)o=t.hasOwnProperty("$"+e[n].value),e[n].selected!==o&&(e[n].selected=o),o&&r&&(e[n].defaultSelected=!0)}else{for(n=""+H(n),t=null,o=0;o<e.length;o++){if(e[o].value===n){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function Uo(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(c(91));return j({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function qi(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(c(92));if(Bn(n)){if(1<n.length)throw Error(c(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:H(n)}}function Gi(e,t){var n=H(t.value),r=H(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Wi(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Ji(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function zo(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Ji(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var br,Hi=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,o){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,o)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(br=br||document.createElement("div"),br.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=br.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Ln(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var On={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Xu=["Webkit","ms","Moz","O"];Object.keys(On).forEach(function(e){Xu.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),On[t]=On[e]})});function Qi(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||On.hasOwnProperty(e)&&On[e]?(""+t).trim():t+"px"}function $i(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,o=Qi(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,o):e[n]=o}}var Zu=j({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Fo(e,t){if(t){if(Zu[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(c(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(c(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(c(61))}if(t.style!=null&&typeof t.style!="object")throw Error(c(62))}}function Vo(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var qo=null;function Go(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Wo=null,dn=null,pn=null;function Yi(e){if(e=lr(e)){if(typeof Wo!="function")throw Error(c(280));var t=e.stateNode;t&&(t=Qr(t),Wo(e.stateNode,e.type,t))}}function Ki(e){dn?pn?pn.push(e):pn=[e]:dn=e}function Xi(){if(dn){var e=dn,t=pn;if(pn=dn=null,Yi(e),t)for(e=0;e<t.length;e++)Yi(t[e])}}function Zi(e,t){return e(t)}function ea(){}var Jo=!1;function ta(e,t,n){if(Jo)return e(t,n);Jo=!0;try{return Zi(e,t,n)}finally{Jo=!1,(dn!==null||pn!==null)&&(ea(),Xi())}}function Mn(e,t){var n=e.stateNode;if(n===null)return null;var r=Qr(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(c(231,t,typeof n));return n}var Ho=!1;if(R)try{var Un={};Object.defineProperty(Un,"passive",{get:function(){Ho=!0}}),window.addEventListener("test",Un,Un),window.removeEventListener("test",Un,Un)}catch{Ho=!1}function ec(e,t,n,r,o,l,i,s,u){var y=Array.prototype.slice.call(arguments,3);try{t.apply(n,y)}catch(x){this.onError(x)}}var zn=!1,Er=null,Pr=!1,Qo=null,tc={onError:function(e){zn=!0,Er=e}};function nc(e,t,n,r,o,l,i,s,u){zn=!1,Er=null,ec.apply(tc,arguments)}function rc(e,t,n,r,o,l,i,s,u){if(nc.apply(this,arguments),zn){if(zn){var y=Er;zn=!1,Er=null}else throw Error(c(198));Pr||(Pr=!0,Qo=y)}}function Yt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function na(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function ra(e){if(Yt(e)!==e)throw Error(c(188))}function oc(e){var t=e.alternate;if(!t){if(t=Yt(e),t===null)throw Error(c(188));return t!==e?null:e}for(var n=e,r=t;;){var o=n.return;if(o===null)break;var l=o.alternate;if(l===null){if(r=o.return,r!==null){n=r;continue}break}if(o.child===l.child){for(l=o.child;l;){if(l===n)return ra(o),e;if(l===r)return ra(o),t;l=l.sibling}throw Error(c(188))}if(n.return!==r.return)n=o,r=l;else{for(var i=!1,s=o.child;s;){if(s===n){i=!0,n=o,r=l;break}if(s===r){i=!0,r=o,n=l;break}s=s.sibling}if(!i){for(s=l.child;s;){if(s===n){i=!0,n=l,r=o;break}if(s===r){i=!0,r=l,n=o;break}s=s.sibling}if(!i)throw Error(c(189))}}if(n.alternate!==r)throw Error(c(190))}if(n.tag!==3)throw Error(c(188));return n.stateNode.current===n?e:t}function oa(e){return e=oc(e),e!==null?la(e):null}function la(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=la(e);if(t!==null)return t;e=e.sibling}return null}var ia=w.unstable_scheduleCallback,aa=w.unstable_cancelCallback,lc=w.unstable_shouldYield,ic=w.unstable_requestPaint,ce=w.unstable_now,ac=w.unstable_getCurrentPriorityLevel,$o=w.unstable_ImmediatePriority,sa=w.unstable_UserBlockingPriority,jr=w.unstable_NormalPriority,sc=w.unstable_LowPriority,ua=w.unstable_IdlePriority,Tr=null,ft=null;function uc(e){if(ft&&typeof ft.onCommitFiberRoot=="function")try{ft.onCommitFiberRoot(Tr,e,void 0,(e.current.flags&128)===128)}catch{}}var rt=Math.clz32?Math.clz32:pc,cc=Math.log,dc=Math.LN2;function pc(e){return e>>>=0,e===0?32:31-(cc(e)/dc|0)|0}var Ir=64,Ar=4194304;function Fn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function _r(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,o=e.suspendedLanes,l=e.pingedLanes,i=n&268435455;if(i!==0){var s=i&~o;s!==0?r=Fn(s):(l&=i,l!==0&&(r=Fn(l)))}else i=n&~o,i!==0?r=Fn(i):l!==0&&(r=Fn(l));if(r===0)return 0;if(t!==0&&t!==r&&(t&o)===0&&(o=r&-r,l=t&-t,o>=l||o===16&&(l&4194240)!==0))return t;if((r&4)!==0&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-rt(t),o=1<<n,r|=e[n],t&=~o;return r}function fc(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function mc(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,l=e.pendingLanes;0<l;){var i=31-rt(l),s=1<<i,u=o[i];u===-1?((s&n)===0||(s&r)!==0)&&(o[i]=fc(s,t)):u<=t&&(e.expiredLanes|=s),l&=~s}}function Yo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function ca(){var e=Ir;return Ir<<=1,(Ir&4194240)===0&&(Ir=64),e}function Ko(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Vn(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-rt(t),e[t]=n}function hc(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var o=31-rt(n),l=1<<o;t[o]=0,r[o]=-1,e[o]=-1,n&=~l}}function Xo(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-rt(n),o=1<<r;o&t|e[r]&t&&(e[r]|=t),n&=~o}}var Q=0;function da(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var pa,Zo,fa,ma,ha,el=!1,Rr=[],Tt=null,It=null,At=null,qn=new Map,Gn=new Map,_t=[],yc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ya(e,t){switch(e){case"focusin":case"focusout":Tt=null;break;case"dragenter":case"dragleave":It=null;break;case"mouseover":case"mouseout":At=null;break;case"pointerover":case"pointerout":qn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Gn.delete(t.pointerId)}}function Wn(e,t,n,r,o,l){return e===null||e.nativeEvent!==l?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:l,targetContainers:[o]},t!==null&&(t=lr(t),t!==null&&Zo(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function gc(e,t,n,r,o){switch(t){case"focusin":return Tt=Wn(Tt,e,t,n,r,o),!0;case"dragenter":return It=Wn(It,e,t,n,r,o),!0;case"mouseover":return At=Wn(At,e,t,n,r,o),!0;case"pointerover":var l=o.pointerId;return qn.set(l,Wn(qn.get(l)||null,e,t,n,r,o)),!0;case"gotpointercapture":return l=o.pointerId,Gn.set(l,Wn(Gn.get(l)||null,e,t,n,r,o)),!0}return!1}function ga(e){var t=Kt(e.target);if(t!==null){var n=Yt(t);if(n!==null){if(t=n.tag,t===13){if(t=na(n),t!==null){e.blockedOn=t,ha(e.priority,function(){fa(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=nl(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);qo=r,n.target.dispatchEvent(r),qo=null}else return t=lr(n),t!==null&&Zo(t),e.blockedOn=n,!1;t.shift()}return!0}function va(e,t,n){Dr(e)&&n.delete(t)}function vc(){el=!1,Tt!==null&&Dr(Tt)&&(Tt=null),It!==null&&Dr(It)&&(It=null),At!==null&&Dr(At)&&(At=null),qn.forEach(va),Gn.forEach(va)}function Jn(e,t){e.blockedOn===t&&(e.blockedOn=null,el||(el=!0,w.unstable_scheduleCallback(w.unstable_NormalPriority,vc)))}function Hn(e){function t(o){return Jn(o,e)}if(0<Rr.length){Jn(Rr[0],e);for(var n=1;n<Rr.length;n++){var r=Rr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Tt!==null&&Jn(Tt,e),It!==null&&Jn(It,e),At!==null&&Jn(At,e),qn.forEach(t),Gn.forEach(t),n=0;n<_t.length;n++)r=_t[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<_t.length&&(n=_t[0],n.blockedOn===null);)ga(n),n.blockedOn===null&&_t.shift()}var fn=ke.ReactCurrentBatchConfig,Br=!0;function xc(e,t,n,r){var o=Q,l=fn.transition;fn.transition=null;try{Q=1,tl(e,t,n,r)}finally{Q=o,fn.transition=l}}function wc(e,t,n,r){var o=Q,l=fn.transition;fn.transition=null;try{Q=4,tl(e,t,n,r)}finally{Q=o,fn.transition=l}}function tl(e,t,n,r){if(Br){var o=nl(e,t,n,r);if(o===null)xl(e,t,r,Lr,n),ya(e,r);else if(gc(o,e,t,n,r))r.stopPropagation();else if(ya(e,r),t&4&&-1<yc.indexOf(e)){for(;o!==null;){var l=lr(o);if(l!==null&&pa(l),l=nl(e,t,n,r),l===null&&xl(e,t,r,Lr,n),l===o)break;o=l}o!==null&&r.stopPropagation()}else xl(e,t,r,null,n)}}var Lr=null;function nl(e,t,n,r){if(Lr=null,e=Go(r),e=Kt(e),e!==null)if(t=Yt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=na(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Lr=e,null}function xa(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(ac()){case $o:return 1;case sa:return 4;case jr:case sc:return 16;case ua:return 536870912;default:return 16}default:return 16}}var Rt=null,rl=null,Or=null;function wa(){if(Or)return Or;var e,t=rl,n=t.length,r,o="value"in Rt?Rt.value:Rt.textContent,l=o.length;for(e=0;e<n&&t[e]===o[e];e++);var i=n-e;for(r=1;r<=i&&t[n-r]===o[l-r];r++);return Or=o.slice(e,1<r?1-r:void 0)}function Mr(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ur(){return!0}function ka(){return!1}function Fe(e){function t(n,r,o,l,i){this._reactName=n,this._targetInst=o,this.type=r,this.nativeEvent=l,this.target=i,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(n=e[s],this[s]=n?n(l):l[s]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?Ur:ka,this.isPropagationStopped=ka,this}return j(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ur)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ur)},persist:function(){},isPersistent:Ur}),t}var mn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ol=Fe(mn),Qn=j({},mn,{view:0,detail:0}),kc=Fe(Qn),ll,il,$n,zr=j({},Qn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:sl,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==$n&&($n&&e.type==="mousemove"?(ll=e.screenX-$n.screenX,il=e.screenY-$n.screenY):il=ll=0,$n=e),ll)},movementY:function(e){return"movementY"in e?e.movementY:il}}),Sa=Fe(zr),Sc=j({},zr,{dataTransfer:0}),Cc=Fe(Sc),Nc=j({},Qn,{relatedTarget:0}),al=Fe(Nc),bc=j({},mn,{animationName:0,elapsedTime:0,pseudoElement:0}),Ec=Fe(bc),Pc=j({},mn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),jc=Fe(Pc),Tc=j({},mn,{data:0}),Ca=Fe(Tc),Ic={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Ac={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},_c={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Rc(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=_c[e])?!!t[e]:!1}function sl(){return Rc}var Dc=j({},Qn,{key:function(e){if(e.key){var t=Ic[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Mr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Ac[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:sl,charCode:function(e){return e.type==="keypress"?Mr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Mr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Bc=Fe(Dc),Lc=j({},zr,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Na=Fe(Lc),Oc=j({},Qn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:sl}),Mc=Fe(Oc),Uc=j({},mn,{propertyName:0,elapsedTime:0,pseudoElement:0}),zc=Fe(Uc),Fc=j({},zr,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Vc=Fe(Fc),qc=[9,13,27,32],ul=R&&"CompositionEvent"in window,Yn=null;R&&"documentMode"in document&&(Yn=document.documentMode);var Gc=R&&"TextEvent"in window&&!Yn,ba=R&&(!ul||Yn&&8<Yn&&11>=Yn),Ea=" ",Pa=!1;function ja(e,t){switch(e){case"keyup":return qc.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Ta(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var hn=!1;function Wc(e,t){switch(e){case"compositionend":return Ta(t);case"keypress":return t.which!==32?null:(Pa=!0,Ea);case"textInput":return e=t.data,e===Ea&&Pa?null:e;default:return null}}function Jc(e,t){if(hn)return e==="compositionend"||!ul&&ja(e,t)?(e=wa(),Or=rl=Rt=null,hn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return ba&&t.locale!=="ko"?null:t.data;default:return null}}var Hc={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ia(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Hc[e.type]:t==="textarea"}function Aa(e,t,n,r){Ki(r),t=Wr(t,"onChange"),0<t.length&&(n=new ol("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Kn=null,Xn=null;function Qc(e){$a(e,0)}function Fr(e){var t=wn(e);if(Ui(t))return e}function $c(e,t){if(e==="change")return t}var _a=!1;if(R){var cl;if(R){var dl="oninput"in document;if(!dl){var Ra=document.createElement("div");Ra.setAttribute("oninput","return;"),dl=typeof Ra.oninput=="function"}cl=dl}else cl=!1;_a=cl&&(!document.documentMode||9<document.documentMode)}function Da(){Kn&&(Kn.detachEvent("onpropertychange",Ba),Xn=Kn=null)}function Ba(e){if(e.propertyName==="value"&&Fr(Xn)){var t=[];Aa(t,Xn,e,Go(e)),ta(Qc,t)}}function Yc(e,t,n){e==="focusin"?(Da(),Kn=t,Xn=n,Kn.attachEvent("onpropertychange",Ba)):e==="focusout"&&Da()}function Kc(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Fr(Xn)}function Xc(e,t){if(e==="click")return Fr(t)}function Zc(e,t){if(e==="input"||e==="change")return Fr(t)}function ed(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var ot=typeof Object.is=="function"?Object.is:ed;function Zn(e,t){if(ot(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var o=n[r];if(!O.call(t,o)||!ot(e[o],t[o]))return!1}return!0}function La(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Oa(e,t){var n=La(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=La(n)}}function Ma(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Ma(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Ua(){for(var e=window,t=Nr();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Nr(e.document)}return t}function pl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function td(e){var t=Ua(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Ma(n.ownerDocument.documentElement,n)){if(r!==null&&pl(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var o=n.textContent.length,l=Math.min(r.start,o);r=r.end===void 0?l:Math.min(r.end,o),!e.extend&&l>r&&(o=r,r=l,l=o),o=Oa(n,l);var i=Oa(n,r);o&&i&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),e.removeAllRanges(),l>r?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var nd=R&&"documentMode"in document&&11>=document.documentMode,yn=null,fl=null,er=null,ml=!1;function za(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ml||yn==null||yn!==Nr(r)||(r=yn,"selectionStart"in r&&pl(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),er&&Zn(er,r)||(er=r,r=Wr(fl,"onSelect"),0<r.length&&(t=new ol("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=yn)))}function Vr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var gn={animationend:Vr("Animation","AnimationEnd"),animationiteration:Vr("Animation","AnimationIteration"),animationstart:Vr("Animation","AnimationStart"),transitionend:Vr("Transition","TransitionEnd")},hl={},Fa={};R&&(Fa=document.createElement("div").style,"AnimationEvent"in window||(delete gn.animationend.animation,delete gn.animationiteration.animation,delete gn.animationstart.animation),"TransitionEvent"in window||delete gn.transitionend.transition);function qr(e){if(hl[e])return hl[e];if(!gn[e])return e;var t=gn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Fa)return hl[e]=t[n];return e}var Va=qr("animationend"),qa=qr("animationiteration"),Ga=qr("animationstart"),Wa=qr("transitionend"),Ja=new Map,Ha="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Dt(e,t){Ja.set(e,t),C(t,[e])}for(var yl=0;yl<Ha.length;yl++){var gl=Ha[yl],rd=gl.toLowerCase(),od=gl[0].toUpperCase()+gl.slice(1);Dt(rd,"on"+od)}Dt(Va,"onAnimationEnd"),Dt(qa,"onAnimationIteration"),Dt(Ga,"onAnimationStart"),Dt("dblclick","onDoubleClick"),Dt("focusin","onFocus"),Dt("focusout","onBlur"),Dt(Wa,"onTransitionEnd"),Y("onMouseEnter",["mouseout","mouseover"]),Y("onMouseLeave",["mouseout","mouseover"]),Y("onPointerEnter",["pointerout","pointerover"]),Y("onPointerLeave",["pointerout","pointerover"]),C("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),C("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),C("onBeforeInput",["compositionend","keypress","textInput","paste"]),C("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),C("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),C("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var tr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),ld=new Set("cancel close invalid load scroll toggle".split(" ").concat(tr));function Qa(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,rc(r,t,void 0,e),e.currentTarget=null}function $a(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],o=r.event;r=r.listeners;e:{var l=void 0;if(t)for(var i=r.length-1;0<=i;i--){var s=r[i],u=s.instance,y=s.currentTarget;if(s=s.listener,u!==l&&o.isPropagationStopped())break e;Qa(o,s,y),l=u}else for(i=0;i<r.length;i++){if(s=r[i],u=s.instance,y=s.currentTarget,s=s.listener,u!==l&&o.isPropagationStopped())break e;Qa(o,s,y),l=u}}}if(Pr)throw e=Qo,Pr=!1,Qo=null,e}function Z(e,t){var n=t[bl];n===void 0&&(n=t[bl]=new Set);var r=e+"__bubble";n.has(r)||(Ya(t,e,2,!1),n.add(r))}function vl(e,t,n){var r=0;t&&(r|=4),Ya(n,e,r,t)}var Gr="_reactListening"+Math.random().toString(36).slice(2);function nr(e){if(!e[Gr]){e[Gr]=!0,A.forEach(function(n){n!=="selectionchange"&&(ld.has(n)||vl(n,!1,e),vl(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Gr]||(t[Gr]=!0,vl("selectionchange",!1,t))}}function Ya(e,t,n,r){switch(xa(t)){case 1:var o=xc;break;case 4:o=wc;break;default:o=tl}n=o.bind(null,t,n,e),o=void 0,!Ho||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(t,n,{capture:!0,passive:o}):e.addEventListener(t,n,!0):o!==void 0?e.addEventListener(t,n,{passive:o}):e.addEventListener(t,n,!1)}function xl(e,t,n,r,o){var l=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var i=r.tag;if(i===3||i===4){var s=r.stateNode.containerInfo;if(s===o||s.nodeType===8&&s.parentNode===o)break;if(i===4)for(i=r.return;i!==null;){var u=i.tag;if((u===3||u===4)&&(u=i.stateNode.containerInfo,u===o||u.nodeType===8&&u.parentNode===o))return;i=i.return}for(;s!==null;){if(i=Kt(s),i===null)return;if(u=i.tag,u===5||u===6){r=l=i;continue e}s=s.parentNode}}r=r.return}ta(function(){var y=l,x=Go(n),k=[];e:{var g=Ja.get(e);if(g!==void 0){var E=ol,T=e;switch(e){case"keypress":if(Mr(n)===0)break e;case"keydown":case"keyup":E=Bc;break;case"focusin":T="focus",E=al;break;case"focusout":T="blur",E=al;break;case"beforeblur":case"afterblur":E=al;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":E=Sa;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":E=Cc;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":E=Mc;break;case Va:case qa:case Ga:E=Ec;break;case Wa:E=zc;break;case"scroll":E=kc;break;case"wheel":E=Vc;break;case"copy":case"cut":case"paste":E=jc;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":E=Na}var I=(t&4)!==0,de=!I&&e==="scroll",m=I?g!==null?g+"Capture":null:g;I=[];for(var p=y,h;p!==null;){h=p;var S=h.stateNode;if(h.tag===5&&S!==null&&(h=S,m!==null&&(S=Mn(p,m),S!=null&&I.push(rr(p,S,h)))),de)break;p=p.return}0<I.length&&(g=new E(g,T,null,n,x),k.push({event:g,listeners:I}))}}if((t&7)===0){e:{if(g=e==="mouseover"||e==="pointerover",E=e==="mouseout"||e==="pointerout",g&&n!==qo&&(T=n.relatedTarget||n.fromElement)&&(Kt(T)||T[wt]))break e;if((E||g)&&(g=x.window===x?x:(g=x.ownerDocument)?g.defaultView||g.parentWindow:window,E?(T=n.relatedTarget||n.toElement,E=y,T=T?Kt(T):null,T!==null&&(de=Yt(T),T!==de||T.tag!==5&&T.tag!==6)&&(T=null)):(E=null,T=y),E!==T)){if(I=Sa,S="onMouseLeave",m="onMouseEnter",p="mouse",(e==="pointerout"||e==="pointerover")&&(I=Na,S="onPointerLeave",m="onPointerEnter",p="pointer"),de=E==null?g:wn(E),h=T==null?g:wn(T),g=new I(S,p+"leave",E,n,x),g.target=de,g.relatedTarget=h,S=null,Kt(x)===y&&(I=new I(m,p+"enter",T,n,x),I.target=h,I.relatedTarget=de,S=I),de=S,E&&T)t:{for(I=E,m=T,p=0,h=I;h;h=vn(h))p++;for(h=0,S=m;S;S=vn(S))h++;for(;0<p-h;)I=vn(I),p--;for(;0<h-p;)m=vn(m),h--;for(;p--;){if(I===m||m!==null&&I===m.alternate)break t;I=vn(I),m=vn(m)}I=null}else I=null;E!==null&&Ka(k,g,E,I,!1),T!==null&&de!==null&&Ka(k,de,T,I,!0)}}e:{if(g=y?wn(y):window,E=g.nodeName&&g.nodeName.toLowerCase(),E==="select"||E==="input"&&g.type==="file")var _=$c;else if(Ia(g))if(_a)_=Zc;else{_=Kc;var D=Yc}else(E=g.nodeName)&&E.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(_=Xc);if(_&&(_=_(e,y))){Aa(k,_,n,x);break e}D&&D(e,g,y),e==="focusout"&&(D=g._wrapperState)&&D.controlled&&g.type==="number"&&Mo(g,"number",g.value)}switch(D=y?wn(y):window,e){case"focusin":(Ia(D)||D.contentEditable==="true")&&(yn=D,fl=y,er=null);break;case"focusout":er=fl=yn=null;break;case"mousedown":ml=!0;break;case"contextmenu":case"mouseup":case"dragend":ml=!1,za(k,n,x);break;case"selectionchange":if(nd)break;case"keydown":case"keyup":za(k,n,x)}var B;if(ul)e:{switch(e){case"compositionstart":var M="onCompositionStart";break e;case"compositionend":M="onCompositionEnd";break e;case"compositionupdate":M="onCompositionUpdate";break e}M=void 0}else hn?ja(e,n)&&(M="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(M="onCompositionStart");M&&(ba&&n.locale!=="ko"&&(hn||M!=="onCompositionStart"?M==="onCompositionEnd"&&hn&&(B=wa()):(Rt=x,rl="value"in Rt?Rt.value:Rt.textContent,hn=!0)),D=Wr(y,M),0<D.length&&(M=new Ca(M,e,null,n,x),k.push({event:M,listeners:D}),B?M.data=B:(B=Ta(n),B!==null&&(M.data=B)))),(B=Gc?Wc(e,n):Jc(e,n))&&(y=Wr(y,"onBeforeInput"),0<y.length&&(x=new Ca("onBeforeInput","beforeinput",null,n,x),k.push({event:x,listeners:y}),x.data=B))}$a(k,t)})}function rr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Wr(e,t){for(var n=t+"Capture",r=[];e!==null;){var o=e,l=o.stateNode;o.tag===5&&l!==null&&(o=l,l=Mn(e,n),l!=null&&r.unshift(rr(e,l,o)),l=Mn(e,t),l!=null&&r.push(rr(e,l,o))),e=e.return}return r}function vn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Ka(e,t,n,r,o){for(var l=t._reactName,i=[];n!==null&&n!==r;){var s=n,u=s.alternate,y=s.stateNode;if(u!==null&&u===r)break;s.tag===5&&y!==null&&(s=y,o?(u=Mn(n,l),u!=null&&i.unshift(rr(n,u,s))):o||(u=Mn(n,l),u!=null&&i.push(rr(n,u,s)))),n=n.return}i.length!==0&&e.push({event:t,listeners:i})}var id=/\r\n?/g,ad=/\u0000|\uFFFD/g;function Xa(e){return(typeof e=="string"?e:""+e).replace(id,`
`).replace(ad,"")}function Jr(e,t,n){if(t=Xa(t),Xa(e)!==t&&n)throw Error(c(425))}function Hr(){}var wl=null,kl=null;function Sl(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Cl=typeof setTimeout=="function"?setTimeout:void 0,sd=typeof clearTimeout=="function"?clearTimeout:void 0,Za=typeof Promise=="function"?Promise:void 0,ud=typeof queueMicrotask=="function"?queueMicrotask:typeof Za<"u"?function(e){return Za.resolve(null).then(e).catch(cd)}:Cl;function cd(e){setTimeout(function(){throw e})}function Nl(e,t){var n=t,r=0;do{var o=n.nextSibling;if(e.removeChild(n),o&&o.nodeType===8)if(n=o.data,n==="/$"){if(r===0){e.removeChild(o),Hn(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=o}while(n);Hn(t)}function Bt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function es(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var xn=Math.random().toString(36).slice(2),mt="__reactFiber$"+xn,or="__reactProps$"+xn,wt="__reactContainer$"+xn,bl="__reactEvents$"+xn,dd="__reactListeners$"+xn,pd="__reactHandles$"+xn;function Kt(e){var t=e[mt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[wt]||n[mt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=es(e);e!==null;){if(n=e[mt])return n;e=es(e)}return t}e=n,n=e.parentNode}return null}function lr(e){return e=e[mt]||e[wt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function wn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(c(33))}function Qr(e){return e[or]||null}var El=[],kn=-1;function Lt(e){return{current:e}}function ee(e){0>kn||(e.current=El[kn],El[kn]=null,kn--)}function X(e,t){kn++,El[kn]=e.current,e.current=t}var Ot={},Se=Lt(Ot),_e=Lt(!1),Xt=Ot;function Sn(e,t){var n=e.type.contextTypes;if(!n)return Ot;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var o={},l;for(l in n)o[l]=t[l];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function Re(e){return e=e.childContextTypes,e!=null}function $r(){ee(_e),ee(Se)}function ts(e,t,n){if(Se.current!==Ot)throw Error(c(168));X(Se,t),X(_e,n)}function ns(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var o in r)if(!(o in t))throw Error(c(108,K(e)||"Unknown",o));return j({},n,r)}function Yr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Ot,Xt=Se.current,X(Se,e),X(_e,_e.current),!0}function rs(e,t,n){var r=e.stateNode;if(!r)throw Error(c(169));n?(e=ns(e,t,Xt),r.__reactInternalMemoizedMergedChildContext=e,ee(_e),ee(Se),X(Se,e)):ee(_e),X(_e,n)}var kt=null,Kr=!1,Pl=!1;function os(e){kt===null?kt=[e]:kt.push(e)}function fd(e){Kr=!0,os(e)}function Mt(){if(!Pl&&kt!==null){Pl=!0;var e=0,t=Q;try{var n=kt;for(Q=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}kt=null,Kr=!1}catch(o){throw kt!==null&&(kt=kt.slice(e+1)),ia($o,Mt),o}finally{Q=t,Pl=!1}}return null}var Cn=[],Nn=0,Xr=null,Zr=0,Qe=[],$e=0,Zt=null,St=1,Ct="";function en(e,t){Cn[Nn++]=Zr,Cn[Nn++]=Xr,Xr=e,Zr=t}function ls(e,t,n){Qe[$e++]=St,Qe[$e++]=Ct,Qe[$e++]=Zt,Zt=e;var r=St;e=Ct;var o=32-rt(r)-1;r&=~(1<<o),n+=1;var l=32-rt(t)+o;if(30<l){var i=o-o%5;l=(r&(1<<i)-1).toString(32),r>>=i,o-=i,St=1<<32-rt(t)+o|n<<o|r,Ct=l+e}else St=1<<l|n<<o|r,Ct=e}function jl(e){e.return!==null&&(en(e,1),ls(e,1,0))}function Tl(e){for(;e===Xr;)Xr=Cn[--Nn],Cn[Nn]=null,Zr=Cn[--Nn],Cn[Nn]=null;for(;e===Zt;)Zt=Qe[--$e],Qe[$e]=null,Ct=Qe[--$e],Qe[$e]=null,St=Qe[--$e],Qe[$e]=null}var Ve=null,qe=null,oe=!1,lt=null;function is(e,t){var n=Ze(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function as(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ve=e,qe=Bt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ve=e,qe=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Zt!==null?{id:St,overflow:Ct}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Ze(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Ve=e,qe=null,!0):!1;default:return!1}}function Il(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Al(e){if(oe){var t=qe;if(t){var n=t;if(!as(e,t)){if(Il(e))throw Error(c(418));t=Bt(n.nextSibling);var r=Ve;t&&as(e,t)?is(r,n):(e.flags=e.flags&-4097|2,oe=!1,Ve=e)}}else{if(Il(e))throw Error(c(418));e.flags=e.flags&-4097|2,oe=!1,Ve=e}}}function ss(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ve=e}function eo(e){if(e!==Ve)return!1;if(!oe)return ss(e),oe=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Sl(e.type,e.memoizedProps)),t&&(t=qe)){if(Il(e))throw us(),Error(c(418));for(;t;)is(e,t),t=Bt(t.nextSibling)}if(ss(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(c(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){qe=Bt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}qe=null}}else qe=Ve?Bt(e.stateNode.nextSibling):null;return!0}function us(){for(var e=qe;e;)e=Bt(e.nextSibling)}function bn(){qe=Ve=null,oe=!1}function _l(e){lt===null?lt=[e]:lt.push(e)}var md=ke.ReactCurrentBatchConfig;function ir(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(c(309));var r=n.stateNode}if(!r)throw Error(c(147,e));var o=r,l=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===l?t.ref:(t=function(i){var s=o.refs;i===null?delete s[l]:s[l]=i},t._stringRef=l,t)}if(typeof e!="string")throw Error(c(284));if(!n._owner)throw Error(c(290,e))}return e}function to(e,t){throw e=Object.prototype.toString.call(t),Error(c(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function cs(e){var t=e._init;return t(e._payload)}function ds(e){function t(m,p){if(e){var h=m.deletions;h===null?(m.deletions=[p],m.flags|=16):h.push(p)}}function n(m,p){if(!e)return null;for(;p!==null;)t(m,p),p=p.sibling;return null}function r(m,p){for(m=new Map;p!==null;)p.key!==null?m.set(p.key,p):m.set(p.index,p),p=p.sibling;return m}function o(m,p){return m=Jt(m,p),m.index=0,m.sibling=null,m}function l(m,p,h){return m.index=h,e?(h=m.alternate,h!==null?(h=h.index,h<p?(m.flags|=2,p):h):(m.flags|=2,p)):(m.flags|=1048576,p)}function i(m){return e&&m.alternate===null&&(m.flags|=2),m}function s(m,p,h,S){return p===null||p.tag!==6?(p=Ci(h,m.mode,S),p.return=m,p):(p=o(p,h),p.return=m,p)}function u(m,p,h,S){var _=h.type;return _===Ie?x(m,p,h.props.children,S,h.key):p!==null&&(p.elementType===_||typeof _=="object"&&_!==null&&_.$$typeof===Ae&&cs(_)===p.type)?(S=o(p,h.props),S.ref=ir(m,p,h),S.return=m,S):(S=Eo(h.type,h.key,h.props,null,m.mode,S),S.ref=ir(m,p,h),S.return=m,S)}function y(m,p,h,S){return p===null||p.tag!==4||p.stateNode.containerInfo!==h.containerInfo||p.stateNode.implementation!==h.implementation?(p=Ni(h,m.mode,S),p.return=m,p):(p=o(p,h.children||[]),p.return=m,p)}function x(m,p,h,S,_){return p===null||p.tag!==7?(p=un(h,m.mode,S,_),p.return=m,p):(p=o(p,h),p.return=m,p)}function k(m,p,h){if(typeof p=="string"&&p!==""||typeof p=="number")return p=Ci(""+p,m.mode,h),p.return=m,p;if(typeof p=="object"&&p!==null){switch(p.$$typeof){case tt:return h=Eo(p.type,p.key,p.props,null,m.mode,h),h.ref=ir(m,null,p),h.return=m,h;case Ee:return p=Ni(p,m.mode,h),p.return=m,p;case Ae:var S=p._init;return k(m,S(p._payload),h)}if(Bn(p)||L(p))return p=un(p,m.mode,h,null),p.return=m,p;to(m,p)}return null}function g(m,p,h,S){var _=p!==null?p.key:null;if(typeof h=="string"&&h!==""||typeof h=="number")return _!==null?null:s(m,p,""+h,S);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case tt:return h.key===_?u(m,p,h,S):null;case Ee:return h.key===_?y(m,p,h,S):null;case Ae:return _=h._init,g(m,p,_(h._payload),S)}if(Bn(h)||L(h))return _!==null?null:x(m,p,h,S,null);to(m,h)}return null}function E(m,p,h,S,_){if(typeof S=="string"&&S!==""||typeof S=="number")return m=m.get(h)||null,s(p,m,""+S,_);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case tt:return m=m.get(S.key===null?h:S.key)||null,u(p,m,S,_);case Ee:return m=m.get(S.key===null?h:S.key)||null,y(p,m,S,_);case Ae:var D=S._init;return E(m,p,h,D(S._payload),_)}if(Bn(S)||L(S))return m=m.get(h)||null,x(p,m,S,_,null);to(p,S)}return null}function T(m,p,h,S){for(var _=null,D=null,B=p,M=p=0,ve=null;B!==null&&M<h.length;M++){B.index>M?(ve=B,B=null):ve=B.sibling;var W=g(m,B,h[M],S);if(W===null){B===null&&(B=ve);break}e&&B&&W.alternate===null&&t(m,B),p=l(W,p,M),D===null?_=W:D.sibling=W,D=W,B=ve}if(M===h.length)return n(m,B),oe&&en(m,M),_;if(B===null){for(;M<h.length;M++)B=k(m,h[M],S),B!==null&&(p=l(B,p,M),D===null?_=B:D.sibling=B,D=B);return oe&&en(m,M),_}for(B=r(m,B);M<h.length;M++)ve=E(B,m,M,h[M],S),ve!==null&&(e&&ve.alternate!==null&&B.delete(ve.key===null?M:ve.key),p=l(ve,p,M),D===null?_=ve:D.sibling=ve,D=ve);return e&&B.forEach(function(Ht){return t(m,Ht)}),oe&&en(m,M),_}function I(m,p,h,S){var _=L(h);if(typeof _!="function")throw Error(c(150));if(h=_.call(h),h==null)throw Error(c(151));for(var D=_=null,B=p,M=p=0,ve=null,W=h.next();B!==null&&!W.done;M++,W=h.next()){B.index>M?(ve=B,B=null):ve=B.sibling;var Ht=g(m,B,W.value,S);if(Ht===null){B===null&&(B=ve);break}e&&B&&Ht.alternate===null&&t(m,B),p=l(Ht,p,M),D===null?_=Ht:D.sibling=Ht,D=Ht,B=ve}if(W.done)return n(m,B),oe&&en(m,M),_;if(B===null){for(;!W.done;M++,W=h.next())W=k(m,W.value,S),W!==null&&(p=l(W,p,M),D===null?_=W:D.sibling=W,D=W);return oe&&en(m,M),_}for(B=r(m,B);!W.done;M++,W=h.next())W=E(B,m,M,W.value,S),W!==null&&(e&&W.alternate!==null&&B.delete(W.key===null?M:W.key),p=l(W,p,M),D===null?_=W:D.sibling=W,D=W);return e&&B.forEach(function(Hd){return t(m,Hd)}),oe&&en(m,M),_}function de(m,p,h,S){if(typeof h=="object"&&h!==null&&h.type===Ie&&h.key===null&&(h=h.props.children),typeof h=="object"&&h!==null){switch(h.$$typeof){case tt:e:{for(var _=h.key,D=p;D!==null;){if(D.key===_){if(_=h.type,_===Ie){if(D.tag===7){n(m,D.sibling),p=o(D,h.props.children),p.return=m,m=p;break e}}else if(D.elementType===_||typeof _=="object"&&_!==null&&_.$$typeof===Ae&&cs(_)===D.type){n(m,D.sibling),p=o(D,h.props),p.ref=ir(m,D,h),p.return=m,m=p;break e}n(m,D);break}else t(m,D);D=D.sibling}h.type===Ie?(p=un(h.props.children,m.mode,S,h.key),p.return=m,m=p):(S=Eo(h.type,h.key,h.props,null,m.mode,S),S.ref=ir(m,p,h),S.return=m,m=S)}return i(m);case Ee:e:{for(D=h.key;p!==null;){if(p.key===D)if(p.tag===4&&p.stateNode.containerInfo===h.containerInfo&&p.stateNode.implementation===h.implementation){n(m,p.sibling),p=o(p,h.children||[]),p.return=m,m=p;break e}else{n(m,p);break}else t(m,p);p=p.sibling}p=Ni(h,m.mode,S),p.return=m,m=p}return i(m);case Ae:return D=h._init,de(m,p,D(h._payload),S)}if(Bn(h))return T(m,p,h,S);if(L(h))return I(m,p,h,S);to(m,h)}return typeof h=="string"&&h!==""||typeof h=="number"?(h=""+h,p!==null&&p.tag===6?(n(m,p.sibling),p=o(p,h),p.return=m,m=p):(n(m,p),p=Ci(h,m.mode,S),p.return=m,m=p),i(m)):n(m,p)}return de}var En=ds(!0),ps=ds(!1),no=Lt(null),ro=null,Pn=null,Rl=null;function Dl(){Rl=Pn=ro=null}function Bl(e){var t=no.current;ee(no),e._currentValue=t}function Ll(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function jn(e,t){ro=e,Rl=Pn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(De=!0),e.firstContext=null)}function Ye(e){var t=e._currentValue;if(Rl!==e)if(e={context:e,memoizedValue:t,next:null},Pn===null){if(ro===null)throw Error(c(308));Pn=e,ro.dependencies={lanes:0,firstContext:e}}else Pn=Pn.next=e;return t}var tn=null;function Ol(e){tn===null?tn=[e]:tn.push(e)}function fs(e,t,n,r){var o=t.interleaved;return o===null?(n.next=n,Ol(t)):(n.next=o.next,o.next=n),t.interleaved=n,Nt(e,r)}function Nt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Ut=!1;function Ml(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ms(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function bt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function zt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(V&2)!==0){var o=r.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),r.pending=t,Nt(e,n)}return o=r.interleaved,o===null?(t.next=t,Ol(r)):(t.next=o.next,o.next=t),r.interleaved=t,Nt(e,n)}function oo(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Xo(e,n)}}function hs(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var o=null,l=null;if(n=n.firstBaseUpdate,n!==null){do{var i={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};l===null?o=l=i:l=l.next=i,n=n.next}while(n!==null);l===null?o=l=t:l=l.next=t}else o=l=t;n={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:l,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function lo(e,t,n,r){var o=e.updateQueue;Ut=!1;var l=o.firstBaseUpdate,i=o.lastBaseUpdate,s=o.shared.pending;if(s!==null){o.shared.pending=null;var u=s,y=u.next;u.next=null,i===null?l=y:i.next=y,i=u;var x=e.alternate;x!==null&&(x=x.updateQueue,s=x.lastBaseUpdate,s!==i&&(s===null?x.firstBaseUpdate=y:s.next=y,x.lastBaseUpdate=u))}if(l!==null){var k=o.baseState;i=0,x=y=u=null,s=l;do{var g=s.lane,E=s.eventTime;if((r&g)===g){x!==null&&(x=x.next={eventTime:E,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var T=e,I=s;switch(g=t,E=n,I.tag){case 1:if(T=I.payload,typeof T=="function"){k=T.call(E,k,g);break e}k=T;break e;case 3:T.flags=T.flags&-65537|128;case 0:if(T=I.payload,g=typeof T=="function"?T.call(E,k,g):T,g==null)break e;k=j({},k,g);break e;case 2:Ut=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,g=o.effects,g===null?o.effects=[s]:g.push(s))}else E={eventTime:E,lane:g,tag:s.tag,payload:s.payload,callback:s.callback,next:null},x===null?(y=x=E,u=k):x=x.next=E,i|=g;if(s=s.next,s===null){if(s=o.shared.pending,s===null)break;g=s,s=g.next,g.next=null,o.lastBaseUpdate=g,o.shared.pending=null}}while(!0);if(x===null&&(u=k),o.baseState=u,o.firstBaseUpdate=y,o.lastBaseUpdate=x,t=o.shared.interleaved,t!==null){o=t;do i|=o.lane,o=o.next;while(o!==t)}else l===null&&(o.shared.lanes=0);on|=i,e.lanes=i,e.memoizedState=k}}function ys(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],o=r.callback;if(o!==null){if(r.callback=null,r=n,typeof o!="function")throw Error(c(191,o));o.call(r)}}}var ar={},ht=Lt(ar),sr=Lt(ar),ur=Lt(ar);function nn(e){if(e===ar)throw Error(c(174));return e}function Ul(e,t){switch(X(ur,t),X(sr,e),X(ht,ar),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:zo(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=zo(t,e)}ee(ht),X(ht,t)}function Tn(){ee(ht),ee(sr),ee(ur)}function gs(e){nn(ur.current);var t=nn(ht.current),n=zo(t,e.type);t!==n&&(X(sr,e),X(ht,n))}function zl(e){sr.current===e&&(ee(ht),ee(sr))}var ie=Lt(0);function io(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Fl=[];function Vl(){for(var e=0;e<Fl.length;e++)Fl[e]._workInProgressVersionPrimary=null;Fl.length=0}var ao=ke.ReactCurrentDispatcher,ql=ke.ReactCurrentBatchConfig,rn=0,ae=null,fe=null,ye=null,so=!1,cr=!1,dr=0,hd=0;function Ce(){throw Error(c(321))}function Gl(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!ot(e[n],t[n]))return!1;return!0}function Wl(e,t,n,r,o,l){if(rn=l,ae=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,ao.current=e===null||e.memoizedState===null?xd:wd,e=n(r,o),cr){l=0;do{if(cr=!1,dr=0,25<=l)throw Error(c(301));l+=1,ye=fe=null,t.updateQueue=null,ao.current=kd,e=n(r,o)}while(cr)}if(ao.current=po,t=fe!==null&&fe.next!==null,rn=0,ye=fe=ae=null,so=!1,t)throw Error(c(300));return e}function Jl(){var e=dr!==0;return dr=0,e}function yt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ye===null?ae.memoizedState=ye=e:ye=ye.next=e,ye}function Ke(){if(fe===null){var e=ae.alternate;e=e!==null?e.memoizedState:null}else e=fe.next;var t=ye===null?ae.memoizedState:ye.next;if(t!==null)ye=t,fe=e;else{if(e===null)throw Error(c(310));fe=e,e={memoizedState:fe.memoizedState,baseState:fe.baseState,baseQueue:fe.baseQueue,queue:fe.queue,next:null},ye===null?ae.memoizedState=ye=e:ye=ye.next=e}return ye}function pr(e,t){return typeof t=="function"?t(e):t}function Hl(e){var t=Ke(),n=t.queue;if(n===null)throw Error(c(311));n.lastRenderedReducer=e;var r=fe,o=r.baseQueue,l=n.pending;if(l!==null){if(o!==null){var i=o.next;o.next=l.next,l.next=i}r.baseQueue=o=l,n.pending=null}if(o!==null){l=o.next,r=r.baseState;var s=i=null,u=null,y=l;do{var x=y.lane;if((rn&x)===x)u!==null&&(u=u.next={lane:0,action:y.action,hasEagerState:y.hasEagerState,eagerState:y.eagerState,next:null}),r=y.hasEagerState?y.eagerState:e(r,y.action);else{var k={lane:x,action:y.action,hasEagerState:y.hasEagerState,eagerState:y.eagerState,next:null};u===null?(s=u=k,i=r):u=u.next=k,ae.lanes|=x,on|=x}y=y.next}while(y!==null&&y!==l);u===null?i=r:u.next=s,ot(r,t.memoizedState)||(De=!0),t.memoizedState=r,t.baseState=i,t.baseQueue=u,n.lastRenderedState=r}if(e=n.interleaved,e!==null){o=e;do l=o.lane,ae.lanes|=l,on|=l,o=o.next;while(o!==e)}else o===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Ql(e){var t=Ke(),n=t.queue;if(n===null)throw Error(c(311));n.lastRenderedReducer=e;var r=n.dispatch,o=n.pending,l=t.memoizedState;if(o!==null){n.pending=null;var i=o=o.next;do l=e(l,i.action),i=i.next;while(i!==o);ot(l,t.memoizedState)||(De=!0),t.memoizedState=l,t.baseQueue===null&&(t.baseState=l),n.lastRenderedState=l}return[l,r]}function vs(){}function xs(e,t){var n=ae,r=Ke(),o=t(),l=!ot(r.memoizedState,o);if(l&&(r.memoizedState=o,De=!0),r=r.queue,$l(Ss.bind(null,n,r,e),[e]),r.getSnapshot!==t||l||ye!==null&&ye.memoizedState.tag&1){if(n.flags|=2048,fr(9,ks.bind(null,n,r,o,t),void 0,null),ge===null)throw Error(c(349));(rn&30)!==0||ws(n,t,o)}return o}function ws(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ae.updateQueue,t===null?(t={lastEffect:null,stores:null},ae.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function ks(e,t,n,r){t.value=n,t.getSnapshot=r,Cs(t)&&Ns(e)}function Ss(e,t,n){return n(function(){Cs(t)&&Ns(e)})}function Cs(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!ot(e,n)}catch{return!0}}function Ns(e){var t=Nt(e,1);t!==null&&ut(t,e,1,-1)}function bs(e){var t=yt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:pr,lastRenderedState:e},t.queue=e,e=e.dispatch=vd.bind(null,ae,e),[t.memoizedState,e]}function fr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=ae.updateQueue,t===null?(t={lastEffect:null,stores:null},ae.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Es(){return Ke().memoizedState}function uo(e,t,n,r){var o=yt();ae.flags|=e,o.memoizedState=fr(1|t,n,void 0,r===void 0?null:r)}function co(e,t,n,r){var o=Ke();r=r===void 0?null:r;var l=void 0;if(fe!==null){var i=fe.memoizedState;if(l=i.destroy,r!==null&&Gl(r,i.deps)){o.memoizedState=fr(t,n,l,r);return}}ae.flags|=e,o.memoizedState=fr(1|t,n,l,r)}function Ps(e,t){return uo(8390656,8,e,t)}function $l(e,t){return co(2048,8,e,t)}function js(e,t){return co(4,2,e,t)}function Ts(e,t){return co(4,4,e,t)}function Is(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function As(e,t,n){return n=n!=null?n.concat([e]):null,co(4,4,Is.bind(null,t,e),n)}function Yl(){}function _s(e,t){var n=Ke();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Gl(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Rs(e,t){var n=Ke();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Gl(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Ds(e,t,n){return(rn&21)===0?(e.baseState&&(e.baseState=!1,De=!0),e.memoizedState=n):(ot(n,t)||(n=ca(),ae.lanes|=n,on|=n,e.baseState=!0),t)}function yd(e,t){var n=Q;Q=n!==0&&4>n?n:4,e(!0);var r=ql.transition;ql.transition={};try{e(!1),t()}finally{Q=n,ql.transition=r}}function Bs(){return Ke().memoizedState}function gd(e,t,n){var r=Gt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Ls(e))Os(t,n);else if(n=fs(e,t,n,r),n!==null){var o=je();ut(n,e,r,o),Ms(n,t,r)}}function vd(e,t,n){var r=Gt(e),o={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Ls(e))Os(t,o);else{var l=e.alternate;if(e.lanes===0&&(l===null||l.lanes===0)&&(l=t.lastRenderedReducer,l!==null))try{var i=t.lastRenderedState,s=l(i,n);if(o.hasEagerState=!0,o.eagerState=s,ot(s,i)){var u=t.interleaved;u===null?(o.next=o,Ol(t)):(o.next=u.next,u.next=o),t.interleaved=o;return}}catch{}finally{}n=fs(e,t,o,r),n!==null&&(o=je(),ut(n,e,r,o),Ms(n,t,r))}}function Ls(e){var t=e.alternate;return e===ae||t!==null&&t===ae}function Os(e,t){cr=so=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Ms(e,t,n){if((n&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Xo(e,n)}}var po={readContext:Ye,useCallback:Ce,useContext:Ce,useEffect:Ce,useImperativeHandle:Ce,useInsertionEffect:Ce,useLayoutEffect:Ce,useMemo:Ce,useReducer:Ce,useRef:Ce,useState:Ce,useDebugValue:Ce,useDeferredValue:Ce,useTransition:Ce,useMutableSource:Ce,useSyncExternalStore:Ce,useId:Ce,unstable_isNewReconciler:!1},xd={readContext:Ye,useCallback:function(e,t){return yt().memoizedState=[e,t===void 0?null:t],e},useContext:Ye,useEffect:Ps,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,uo(4194308,4,Is.bind(null,t,e),n)},useLayoutEffect:function(e,t){return uo(4194308,4,e,t)},useInsertionEffect:function(e,t){return uo(4,2,e,t)},useMemo:function(e,t){var n=yt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=yt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=gd.bind(null,ae,e),[r.memoizedState,e]},useRef:function(e){var t=yt();return e={current:e},t.memoizedState=e},useState:bs,useDebugValue:Yl,useDeferredValue:function(e){return yt().memoizedState=e},useTransition:function(){var e=bs(!1),t=e[0];return e=yd.bind(null,e[1]),yt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=ae,o=yt();if(oe){if(n===void 0)throw Error(c(407));n=n()}else{if(n=t(),ge===null)throw Error(c(349));(rn&30)!==0||ws(r,t,n)}o.memoizedState=n;var l={value:n,getSnapshot:t};return o.queue=l,Ps(Ss.bind(null,r,l,e),[e]),r.flags|=2048,fr(9,ks.bind(null,r,l,n,t),void 0,null),n},useId:function(){var e=yt(),t=ge.identifierPrefix;if(oe){var n=Ct,r=St;n=(r&~(1<<32-rt(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=dr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=hd++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},wd={readContext:Ye,useCallback:_s,useContext:Ye,useEffect:$l,useImperativeHandle:As,useInsertionEffect:js,useLayoutEffect:Ts,useMemo:Rs,useReducer:Hl,useRef:Es,useState:function(){return Hl(pr)},useDebugValue:Yl,useDeferredValue:function(e){var t=Ke();return Ds(t,fe.memoizedState,e)},useTransition:function(){var e=Hl(pr)[0],t=Ke().memoizedState;return[e,t]},useMutableSource:vs,useSyncExternalStore:xs,useId:Bs,unstable_isNewReconciler:!1},kd={readContext:Ye,useCallback:_s,useContext:Ye,useEffect:$l,useImperativeHandle:As,useInsertionEffect:js,useLayoutEffect:Ts,useMemo:Rs,useReducer:Ql,useRef:Es,useState:function(){return Ql(pr)},useDebugValue:Yl,useDeferredValue:function(e){var t=Ke();return fe===null?t.memoizedState=e:Ds(t,fe.memoizedState,e)},useTransition:function(){var e=Ql(pr)[0],t=Ke().memoizedState;return[e,t]},useMutableSource:vs,useSyncExternalStore:xs,useId:Bs,unstable_isNewReconciler:!1};function it(e,t){if(e&&e.defaultProps){t=j({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Kl(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:j({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var fo={isMounted:function(e){return(e=e._reactInternals)?Yt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=je(),o=Gt(e),l=bt(r,o);l.payload=t,n!=null&&(l.callback=n),t=zt(e,l,o),t!==null&&(ut(t,e,o,r),oo(t,e,o))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=je(),o=Gt(e),l=bt(r,o);l.tag=1,l.payload=t,n!=null&&(l.callback=n),t=zt(e,l,o),t!==null&&(ut(t,e,o,r),oo(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=je(),r=Gt(e),o=bt(n,r);o.tag=2,t!=null&&(o.callback=t),t=zt(e,o,r),t!==null&&(ut(t,e,r,n),oo(t,e,r))}};function Us(e,t,n,r,o,l,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,l,i):t.prototype&&t.prototype.isPureReactComponent?!Zn(n,r)||!Zn(o,l):!0}function zs(e,t,n){var r=!1,o=Ot,l=t.contextType;return typeof l=="object"&&l!==null?l=Ye(l):(o=Re(t)?Xt:Se.current,r=t.contextTypes,l=(r=r!=null)?Sn(e,o):Ot),t=new t(n,l),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=fo,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=l),t}function Fs(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&fo.enqueueReplaceState(t,t.state,null)}function Xl(e,t,n,r){var o=e.stateNode;o.props=n,o.state=e.memoizedState,o.refs={},Ml(e);var l=t.contextType;typeof l=="object"&&l!==null?o.context=Ye(l):(l=Re(t)?Xt:Se.current,o.context=Sn(e,l)),o.state=e.memoizedState,l=t.getDerivedStateFromProps,typeof l=="function"&&(Kl(e,t,l,n),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&fo.enqueueReplaceState(o,o.state,null),lo(e,n,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function In(e,t){try{var n="",r=t;do n+=q(r),r=r.return;while(r);var o=n}catch(l){o=`
Error generating stack: `+l.message+`
`+l.stack}return{value:e,source:t,stack:o,digest:null}}function Zl(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function ei(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Sd=typeof WeakMap=="function"?WeakMap:Map;function Vs(e,t,n){n=bt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){wo||(wo=!0,hi=r),ei(e,t)},n}function qs(e,t,n){n=bt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=t.value;n.payload=function(){return r(o)},n.callback=function(){ei(e,t)}}var l=e.stateNode;return l!==null&&typeof l.componentDidCatch=="function"&&(n.callback=function(){ei(e,t),typeof r!="function"&&(Vt===null?Vt=new Set([this]):Vt.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),n}function Gs(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Sd;var o=new Set;r.set(t,o)}else o=r.get(t),o===void 0&&(o=new Set,r.set(t,o));o.has(n)||(o.add(n),e=Ld.bind(null,e,t,n),t.then(e,e))}function Ws(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Js(e,t,n,r,o){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=bt(-1,1),t.tag=2,zt(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=o,e)}var Cd=ke.ReactCurrentOwner,De=!1;function Pe(e,t,n,r){t.child=e===null?ps(t,null,n,r):En(t,e.child,n,r)}function Hs(e,t,n,r,o){n=n.render;var l=t.ref;return jn(t,o),r=Wl(e,t,n,r,l,o),n=Jl(),e!==null&&!De?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,Et(e,t,o)):(oe&&n&&jl(t),t.flags|=1,Pe(e,t,r,o),t.child)}function Qs(e,t,n,r,o){if(e===null){var l=n.type;return typeof l=="function"&&!Si(l)&&l.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=l,$s(e,t,l,r,o)):(e=Eo(n.type,null,r,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(l=e.child,(e.lanes&o)===0){var i=l.memoizedProps;if(n=n.compare,n=n!==null?n:Zn,n(i,r)&&e.ref===t.ref)return Et(e,t,o)}return t.flags|=1,e=Jt(l,r),e.ref=t.ref,e.return=t,t.child=e}function $s(e,t,n,r,o){if(e!==null){var l=e.memoizedProps;if(Zn(l,r)&&e.ref===t.ref)if(De=!1,t.pendingProps=r=l,(e.lanes&o)!==0)(e.flags&131072)!==0&&(De=!0);else return t.lanes=e.lanes,Et(e,t,o)}return ti(e,t,n,r,o)}function Ys(e,t,n){var r=t.pendingProps,o=r.children,l=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},X(_n,Ge),Ge|=n;else{if((n&1073741824)===0)return e=l!==null?l.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,X(_n,Ge),Ge|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=l!==null?l.baseLanes:n,X(_n,Ge),Ge|=r}else l!==null?(r=l.baseLanes|n,t.memoizedState=null):r=n,X(_n,Ge),Ge|=r;return Pe(e,t,o,n),t.child}function Ks(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function ti(e,t,n,r,o){var l=Re(n)?Xt:Se.current;return l=Sn(t,l),jn(t,o),n=Wl(e,t,n,r,l,o),r=Jl(),e!==null&&!De?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,Et(e,t,o)):(oe&&r&&jl(t),t.flags|=1,Pe(e,t,n,o),t.child)}function Xs(e,t,n,r,o){if(Re(n)){var l=!0;Yr(t)}else l=!1;if(jn(t,o),t.stateNode===null)ho(e,t),zs(t,n,r),Xl(t,n,r,o),r=!0;else if(e===null){var i=t.stateNode,s=t.memoizedProps;i.props=s;var u=i.context,y=n.contextType;typeof y=="object"&&y!==null?y=Ye(y):(y=Re(n)?Xt:Se.current,y=Sn(t,y));var x=n.getDerivedStateFromProps,k=typeof x=="function"||typeof i.getSnapshotBeforeUpdate=="function";k||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s!==r||u!==y)&&Fs(t,i,r,y),Ut=!1;var g=t.memoizedState;i.state=g,lo(t,r,i,o),u=t.memoizedState,s!==r||g!==u||_e.current||Ut?(typeof x=="function"&&(Kl(t,n,x,r),u=t.memoizedState),(s=Ut||Us(t,n,s,r,g,u,y))?(k||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=u),i.props=r,i.state=u,i.context=y,r=s):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{i=t.stateNode,ms(e,t),s=t.memoizedProps,y=t.type===t.elementType?s:it(t.type,s),i.props=y,k=t.pendingProps,g=i.context,u=n.contextType,typeof u=="object"&&u!==null?u=Ye(u):(u=Re(n)?Xt:Se.current,u=Sn(t,u));var E=n.getDerivedStateFromProps;(x=typeof E=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s!==k||g!==u)&&Fs(t,i,r,u),Ut=!1,g=t.memoizedState,i.state=g,lo(t,r,i,o);var T=t.memoizedState;s!==k||g!==T||_e.current||Ut?(typeof E=="function"&&(Kl(t,n,E,r),T=t.memoizedState),(y=Ut||Us(t,n,y,r,g,T,u)||!1)?(x||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(r,T,u),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(r,T,u)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||s===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=T),i.props=r,i.state=T,i.context=u,r=y):(typeof i.componentDidUpdate!="function"||s===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),r=!1)}return ni(e,t,n,r,l,o)}function ni(e,t,n,r,o,l){Ks(e,t);var i=(t.flags&128)!==0;if(!r&&!i)return o&&rs(t,n,!1),Et(e,t,l);r=t.stateNode,Cd.current=t;var s=i&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&i?(t.child=En(t,e.child,null,l),t.child=En(t,null,s,l)):Pe(e,t,s,l),t.memoizedState=r.state,o&&rs(t,n,!0),t.child}function Zs(e){var t=e.stateNode;t.pendingContext?ts(e,t.pendingContext,t.pendingContext!==t.context):t.context&&ts(e,t.context,!1),Ul(e,t.containerInfo)}function eu(e,t,n,r,o){return bn(),_l(o),t.flags|=256,Pe(e,t,n,r),t.child}var ri={dehydrated:null,treeContext:null,retryLane:0};function oi(e){return{baseLanes:e,cachePool:null,transitions:null}}function tu(e,t,n){var r=t.pendingProps,o=ie.current,l=!1,i=(t.flags&128)!==0,s;if((s=i)||(s=e!==null&&e.memoizedState===null?!1:(o&2)!==0),s?(l=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),X(ie,o&1),e===null)return Al(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(i=r.children,e=r.fallback,l?(r=t.mode,l=t.child,i={mode:"hidden",children:i},(r&1)===0&&l!==null?(l.childLanes=0,l.pendingProps=i):l=Po(i,r,0,null),e=un(e,r,n,null),l.return=t,e.return=t,l.sibling=e,t.child=l,t.child.memoizedState=oi(n),t.memoizedState=ri,e):li(t,i));if(o=e.memoizedState,o!==null&&(s=o.dehydrated,s!==null))return Nd(e,t,i,r,s,o,n);if(l){l=r.fallback,i=t.mode,o=e.child,s=o.sibling;var u={mode:"hidden",children:r.children};return(i&1)===0&&t.child!==o?(r=t.child,r.childLanes=0,r.pendingProps=u,t.deletions=null):(r=Jt(o,u),r.subtreeFlags=o.subtreeFlags&14680064),s!==null?l=Jt(s,l):(l=un(l,i,n,null),l.flags|=2),l.return=t,r.return=t,r.sibling=l,t.child=r,r=l,l=t.child,i=e.child.memoizedState,i=i===null?oi(n):{baseLanes:i.baseLanes|n,cachePool:null,transitions:i.transitions},l.memoizedState=i,l.childLanes=e.childLanes&~n,t.memoizedState=ri,r}return l=e.child,e=l.sibling,r=Jt(l,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function li(e,t){return t=Po({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function mo(e,t,n,r){return r!==null&&_l(r),En(t,e.child,null,n),e=li(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Nd(e,t,n,r,o,l,i){if(n)return t.flags&256?(t.flags&=-257,r=Zl(Error(c(422))),mo(e,t,i,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(l=r.fallback,o=t.mode,r=Po({mode:"visible",children:r.children},o,0,null),l=un(l,o,i,null),l.flags|=2,r.return=t,l.return=t,r.sibling=l,t.child=r,(t.mode&1)!==0&&En(t,e.child,null,i),t.child.memoizedState=oi(i),t.memoizedState=ri,l);if((t.mode&1)===0)return mo(e,t,i,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var s=r.dgst;return r=s,l=Error(c(419)),r=Zl(l,r,void 0),mo(e,t,i,r)}if(s=(i&e.childLanes)!==0,De||s){if(r=ge,r!==null){switch(i&-i){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=(o&(r.suspendedLanes|i))!==0?0:o,o!==0&&o!==l.retryLane&&(l.retryLane=o,Nt(e,o),ut(r,e,o,-1))}return ki(),r=Zl(Error(c(421))),mo(e,t,i,r)}return o.data==="$?"?(t.flags|=128,t.child=e.child,t=Od.bind(null,e),o._reactRetry=t,null):(e=l.treeContext,qe=Bt(o.nextSibling),Ve=t,oe=!0,lt=null,e!==null&&(Qe[$e++]=St,Qe[$e++]=Ct,Qe[$e++]=Zt,St=e.id,Ct=e.overflow,Zt=t),t=li(t,r.children),t.flags|=4096,t)}function nu(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Ll(e.return,t,n)}function ii(e,t,n,r,o){var l=e.memoizedState;l===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:o}:(l.isBackwards=t,l.rendering=null,l.renderingStartTime=0,l.last=r,l.tail=n,l.tailMode=o)}function ru(e,t,n){var r=t.pendingProps,o=r.revealOrder,l=r.tail;if(Pe(e,t,r.children,n),r=ie.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&nu(e,n,t);else if(e.tag===19)nu(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(X(ie,r),(t.mode&1)===0)t.memoizedState=null;else switch(o){case"forwards":for(n=t.child,o=null;n!==null;)e=n.alternate,e!==null&&io(e)===null&&(o=n),n=n.sibling;n=o,n===null?(o=t.child,t.child=null):(o=n.sibling,n.sibling=null),ii(t,!1,o,n,l);break;case"backwards":for(n=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&io(e)===null){t.child=o;break}e=o.sibling,o.sibling=n,n=o,o=e}ii(t,!0,n,null,l);break;case"together":ii(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function ho(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Et(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),on|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(c(153));if(t.child!==null){for(e=t.child,n=Jt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Jt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function bd(e,t,n){switch(t.tag){case 3:Zs(t),bn();break;case 5:gs(t);break;case 1:Re(t.type)&&Yr(t);break;case 4:Ul(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,o=t.memoizedProps.value;X(no,r._currentValue),r._currentValue=o;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(X(ie,ie.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?tu(e,t,n):(X(ie,ie.current&1),e=Et(e,t,n),e!==null?e.sibling:null);X(ie,ie.current&1);break;case 19:if(r=(n&t.childLanes)!==0,(e.flags&128)!==0){if(r)return ru(e,t,n);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),X(ie,ie.current),r)break;return null;case 22:case 23:return t.lanes=0,Ys(e,t,n)}return Et(e,t,n)}var ou,ai,lu,iu;ou=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},ai=function(){},lu=function(e,t,n,r){var o=e.memoizedProps;if(o!==r){e=t.stateNode,nn(ht.current);var l=null;switch(n){case"input":o=Lo(e,o),r=Lo(e,r),l=[];break;case"select":o=j({},o,{value:void 0}),r=j({},r,{value:void 0}),l=[];break;case"textarea":o=Uo(e,o),r=Uo(e,r),l=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Hr)}Fo(n,r);var i;n=null;for(y in o)if(!r.hasOwnProperty(y)&&o.hasOwnProperty(y)&&o[y]!=null)if(y==="style"){var s=o[y];for(i in s)s.hasOwnProperty(i)&&(n||(n={}),n[i]="")}else y!=="dangerouslySetInnerHTML"&&y!=="children"&&y!=="suppressContentEditableWarning"&&y!=="suppressHydrationWarning"&&y!=="autoFocus"&&(N.hasOwnProperty(y)?l||(l=[]):(l=l||[]).push(y,null));for(y in r){var u=r[y];if(s=o!=null?o[y]:void 0,r.hasOwnProperty(y)&&u!==s&&(u!=null||s!=null))if(y==="style")if(s){for(i in s)!s.hasOwnProperty(i)||u&&u.hasOwnProperty(i)||(n||(n={}),n[i]="");for(i in u)u.hasOwnProperty(i)&&s[i]!==u[i]&&(n||(n={}),n[i]=u[i])}else n||(l||(l=[]),l.push(y,n)),n=u;else y==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,s=s?s.__html:void 0,u!=null&&s!==u&&(l=l||[]).push(y,u)):y==="children"?typeof u!="string"&&typeof u!="number"||(l=l||[]).push(y,""+u):y!=="suppressContentEditableWarning"&&y!=="suppressHydrationWarning"&&(N.hasOwnProperty(y)?(u!=null&&y==="onScroll"&&Z("scroll",e),l||s===u||(l=[])):(l=l||[]).push(y,u))}n&&(l=l||[]).push("style",n);var y=l;(t.updateQueue=y)&&(t.flags|=4)}},iu=function(e,t,n,r){n!==r&&(t.flags|=4)};function mr(e,t){if(!oe)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Ne(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Ed(e,t,n){var r=t.pendingProps;switch(Tl(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ne(t),null;case 1:return Re(t.type)&&$r(),Ne(t),null;case 3:return r=t.stateNode,Tn(),ee(_e),ee(Se),Vl(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(eo(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,lt!==null&&(vi(lt),lt=null))),ai(e,t),Ne(t),null;case 5:zl(t);var o=nn(ur.current);if(n=t.type,e!==null&&t.stateNode!=null)lu(e,t,n,r,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(c(166));return Ne(t),null}if(e=nn(ht.current),eo(t)){r=t.stateNode,n=t.type;var l=t.memoizedProps;switch(r[mt]=t,r[or]=l,e=(t.mode&1)!==0,n){case"dialog":Z("cancel",r),Z("close",r);break;case"iframe":case"object":case"embed":Z("load",r);break;case"video":case"audio":for(o=0;o<tr.length;o++)Z(tr[o],r);break;case"source":Z("error",r);break;case"img":case"image":case"link":Z("error",r),Z("load",r);break;case"details":Z("toggle",r);break;case"input":zi(r,l),Z("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!l.multiple},Z("invalid",r);break;case"textarea":qi(r,l),Z("invalid",r)}Fo(n,l),o=null;for(var i in l)if(l.hasOwnProperty(i)){var s=l[i];i==="children"?typeof s=="string"?r.textContent!==s&&(l.suppressHydrationWarning!==!0&&Jr(r.textContent,s,e),o=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(l.suppressHydrationWarning!==!0&&Jr(r.textContent,s,e),o=["children",""+s]):N.hasOwnProperty(i)&&s!=null&&i==="onScroll"&&Z("scroll",r)}switch(n){case"input":Cr(r),Vi(r,l,!0);break;case"textarea":Cr(r),Wi(r);break;case"select":case"option":break;default:typeof l.onClick=="function"&&(r.onclick=Hr)}r=o,t.updateQueue=r,r!==null&&(t.flags|=4)}else{i=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Ji(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=i.createElement(n,{is:r.is}):(e=i.createElement(n),n==="select"&&(i=e,r.multiple?i.multiple=!0:r.size&&(i.size=r.size))):e=i.createElementNS(e,n),e[mt]=t,e[or]=r,ou(e,t,!1,!1),t.stateNode=e;e:{switch(i=Vo(n,r),n){case"dialog":Z("cancel",e),Z("close",e),o=r;break;case"iframe":case"object":case"embed":Z("load",e),o=r;break;case"video":case"audio":for(o=0;o<tr.length;o++)Z(tr[o],e);o=r;break;case"source":Z("error",e),o=r;break;case"img":case"image":case"link":Z("error",e),Z("load",e),o=r;break;case"details":Z("toggle",e),o=r;break;case"input":zi(e,r),o=Lo(e,r),Z("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=j({},r,{value:void 0}),Z("invalid",e);break;case"textarea":qi(e,r),o=Uo(e,r),Z("invalid",e);break;default:o=r}Fo(n,o),s=o;for(l in s)if(s.hasOwnProperty(l)){var u=s[l];l==="style"?$i(e,u):l==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&Hi(e,u)):l==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&Ln(e,u):typeof u=="number"&&Ln(e,""+u):l!=="suppressContentEditableWarning"&&l!=="suppressHydrationWarning"&&l!=="autoFocus"&&(N.hasOwnProperty(l)?u!=null&&l==="onScroll"&&Z("scroll",e):u!=null&&et(e,l,u,i))}switch(n){case"input":Cr(e),Vi(e,r,!1);break;case"textarea":Cr(e),Wi(e);break;case"option":r.value!=null&&e.setAttribute("value",""+H(r.value));break;case"select":e.multiple=!!r.multiple,l=r.value,l!=null?cn(e,!!r.multiple,l,!1):r.defaultValue!=null&&cn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=Hr)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Ne(t),null;case 6:if(e&&t.stateNode!=null)iu(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(c(166));if(n=nn(ur.current),nn(ht.current),eo(t)){if(r=t.stateNode,n=t.memoizedProps,r[mt]=t,(l=r.nodeValue!==n)&&(e=Ve,e!==null))switch(e.tag){case 3:Jr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Jr(r.nodeValue,n,(e.mode&1)!==0)}l&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[mt]=t,t.stateNode=r}return Ne(t),null;case 13:if(ee(ie),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(oe&&qe!==null&&(t.mode&1)!==0&&(t.flags&128)===0)us(),bn(),t.flags|=98560,l=!1;else if(l=eo(t),r!==null&&r.dehydrated!==null){if(e===null){if(!l)throw Error(c(318));if(l=t.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(c(317));l[mt]=t}else bn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ne(t),l=!1}else lt!==null&&(vi(lt),lt=null),l=!0;if(!l)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(ie.current&1)!==0?me===0&&(me=3):ki())),t.updateQueue!==null&&(t.flags|=4),Ne(t),null);case 4:return Tn(),ai(e,t),e===null&&nr(t.stateNode.containerInfo),Ne(t),null;case 10:return Bl(t.type._context),Ne(t),null;case 17:return Re(t.type)&&$r(),Ne(t),null;case 19:if(ee(ie),l=t.memoizedState,l===null)return Ne(t),null;if(r=(t.flags&128)!==0,i=l.rendering,i===null)if(r)mr(l,!1);else{if(me!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(i=io(e),i!==null){for(t.flags|=128,mr(l,!1),r=i.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)l=n,e=r,l.flags&=14680066,i=l.alternate,i===null?(l.childLanes=0,l.lanes=e,l.child=null,l.subtreeFlags=0,l.memoizedProps=null,l.memoizedState=null,l.updateQueue=null,l.dependencies=null,l.stateNode=null):(l.childLanes=i.childLanes,l.lanes=i.lanes,l.child=i.child,l.subtreeFlags=0,l.deletions=null,l.memoizedProps=i.memoizedProps,l.memoizedState=i.memoizedState,l.updateQueue=i.updateQueue,l.type=i.type,e=i.dependencies,l.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return X(ie,ie.current&1|2),t.child}e=e.sibling}l.tail!==null&&ce()>Rn&&(t.flags|=128,r=!0,mr(l,!1),t.lanes=4194304)}else{if(!r)if(e=io(i),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),mr(l,!0),l.tail===null&&l.tailMode==="hidden"&&!i.alternate&&!oe)return Ne(t),null}else 2*ce()-l.renderingStartTime>Rn&&n!==1073741824&&(t.flags|=128,r=!0,mr(l,!1),t.lanes=4194304);l.isBackwards?(i.sibling=t.child,t.child=i):(n=l.last,n!==null?n.sibling=i:t.child=i,l.last=i)}return l.tail!==null?(t=l.tail,l.rendering=t,l.tail=t.sibling,l.renderingStartTime=ce(),t.sibling=null,n=ie.current,X(ie,r?n&1|2:n&1),t):(Ne(t),null);case 22:case 23:return wi(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(Ge&1073741824)!==0&&(Ne(t),t.subtreeFlags&6&&(t.flags|=8192)):Ne(t),null;case 24:return null;case 25:return null}throw Error(c(156,t.tag))}function Pd(e,t){switch(Tl(t),t.tag){case 1:return Re(t.type)&&$r(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Tn(),ee(_e),ee(Se),Vl(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return zl(t),null;case 13:if(ee(ie),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(c(340));bn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return ee(ie),null;case 4:return Tn(),null;case 10:return Bl(t.type._context),null;case 22:case 23:return wi(),null;case 24:return null;default:return null}}var yo=!1,be=!1,jd=typeof WeakSet=="function"?WeakSet:Set,P=null;function An(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){ue(e,t,r)}else n.current=null}function si(e,t,n){try{n()}catch(r){ue(e,t,r)}}var au=!1;function Td(e,t){if(wl=Br,e=Ua(),pl(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var o=r.anchorOffset,l=r.focusNode;r=r.focusOffset;try{n.nodeType,l.nodeType}catch{n=null;break e}var i=0,s=-1,u=-1,y=0,x=0,k=e,g=null;t:for(;;){for(var E;k!==n||o!==0&&k.nodeType!==3||(s=i+o),k!==l||r!==0&&k.nodeType!==3||(u=i+r),k.nodeType===3&&(i+=k.nodeValue.length),(E=k.firstChild)!==null;)g=k,k=E;for(;;){if(k===e)break t;if(g===n&&++y===o&&(s=i),g===l&&++x===r&&(u=i),(E=k.nextSibling)!==null)break;k=g,g=k.parentNode}k=E}n=s===-1||u===-1?null:{start:s,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(kl={focusedElem:e,selectionRange:n},Br=!1,P=t;P!==null;)if(t=P,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,P=e;else for(;P!==null;){t=P;try{var T=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(T!==null){var I=T.memoizedProps,de=T.memoizedState,m=t.stateNode,p=m.getSnapshotBeforeUpdate(t.elementType===t.type?I:it(t.type,I),de);m.__reactInternalSnapshotBeforeUpdate=p}break;case 3:var h=t.stateNode.containerInfo;h.nodeType===1?h.textContent="":h.nodeType===9&&h.documentElement&&h.removeChild(h.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(c(163))}}catch(S){ue(t,t.return,S)}if(e=t.sibling,e!==null){e.return=t.return,P=e;break}P=t.return}return T=au,au=!1,T}function hr(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var l=o.destroy;o.destroy=void 0,l!==void 0&&si(t,n,l)}o=o.next}while(o!==r)}}function go(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function ui(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function su(e){var t=e.alternate;t!==null&&(e.alternate=null,su(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[mt],delete t[or],delete t[bl],delete t[dd],delete t[pd])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function uu(e){return e.tag===5||e.tag===3||e.tag===4}function cu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||uu(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ci(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Hr));else if(r!==4&&(e=e.child,e!==null))for(ci(e,t,n),e=e.sibling;e!==null;)ci(e,t,n),e=e.sibling}function di(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(di(e,t,n),e=e.sibling;e!==null;)di(e,t,n),e=e.sibling}var xe=null,at=!1;function Ft(e,t,n){for(n=n.child;n!==null;)du(e,t,n),n=n.sibling}function du(e,t,n){if(ft&&typeof ft.onCommitFiberUnmount=="function")try{ft.onCommitFiberUnmount(Tr,n)}catch{}switch(n.tag){case 5:be||An(n,t);case 6:var r=xe,o=at;xe=null,Ft(e,t,n),xe=r,at=o,xe!==null&&(at?(e=xe,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):xe.removeChild(n.stateNode));break;case 18:xe!==null&&(at?(e=xe,n=n.stateNode,e.nodeType===8?Nl(e.parentNode,n):e.nodeType===1&&Nl(e,n),Hn(e)):Nl(xe,n.stateNode));break;case 4:r=xe,o=at,xe=n.stateNode.containerInfo,at=!0,Ft(e,t,n),xe=r,at=o;break;case 0:case 11:case 14:case 15:if(!be&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var l=o,i=l.destroy;l=l.tag,i!==void 0&&((l&2)!==0||(l&4)!==0)&&si(n,t,i),o=o.next}while(o!==r)}Ft(e,t,n);break;case 1:if(!be&&(An(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(s){ue(n,t,s)}Ft(e,t,n);break;case 21:Ft(e,t,n);break;case 22:n.mode&1?(be=(r=be)||n.memoizedState!==null,Ft(e,t,n),be=r):Ft(e,t,n);break;default:Ft(e,t,n)}}function pu(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new jd),t.forEach(function(r){var o=Md.bind(null,e,r);n.has(r)||(n.add(r),r.then(o,o))})}}function st(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var o=n[r];try{var l=e,i=t,s=i;e:for(;s!==null;){switch(s.tag){case 5:xe=s.stateNode,at=!1;break e;case 3:xe=s.stateNode.containerInfo,at=!0;break e;case 4:xe=s.stateNode.containerInfo,at=!0;break e}s=s.return}if(xe===null)throw Error(c(160));du(l,i,o),xe=null,at=!1;var u=o.alternate;u!==null&&(u.return=null),o.return=null}catch(y){ue(o,t,y)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)fu(t,e),t=t.sibling}function fu(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(st(t,e),gt(e),r&4){try{hr(3,e,e.return),go(3,e)}catch(I){ue(e,e.return,I)}try{hr(5,e,e.return)}catch(I){ue(e,e.return,I)}}break;case 1:st(t,e),gt(e),r&512&&n!==null&&An(n,n.return);break;case 5:if(st(t,e),gt(e),r&512&&n!==null&&An(n,n.return),e.flags&32){var o=e.stateNode;try{Ln(o,"")}catch(I){ue(e,e.return,I)}}if(r&4&&(o=e.stateNode,o!=null)){var l=e.memoizedProps,i=n!==null?n.memoizedProps:l,s=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{s==="input"&&l.type==="radio"&&l.name!=null&&Fi(o,l),Vo(s,i);var y=Vo(s,l);for(i=0;i<u.length;i+=2){var x=u[i],k=u[i+1];x==="style"?$i(o,k):x==="dangerouslySetInnerHTML"?Hi(o,k):x==="children"?Ln(o,k):et(o,x,k,y)}switch(s){case"input":Oo(o,l);break;case"textarea":Gi(o,l);break;case"select":var g=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!l.multiple;var E=l.value;E!=null?cn(o,!!l.multiple,E,!1):g!==!!l.multiple&&(l.defaultValue!=null?cn(o,!!l.multiple,l.defaultValue,!0):cn(o,!!l.multiple,l.multiple?[]:"",!1))}o[or]=l}catch(I){ue(e,e.return,I)}}break;case 6:if(st(t,e),gt(e),r&4){if(e.stateNode===null)throw Error(c(162));o=e.stateNode,l=e.memoizedProps;try{o.nodeValue=l}catch(I){ue(e,e.return,I)}}break;case 3:if(st(t,e),gt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Hn(t.containerInfo)}catch(I){ue(e,e.return,I)}break;case 4:st(t,e),gt(e);break;case 13:st(t,e),gt(e),o=e.child,o.flags&8192&&(l=o.memoizedState!==null,o.stateNode.isHidden=l,!l||o.alternate!==null&&o.alternate.memoizedState!==null||(mi=ce())),r&4&&pu(e);break;case 22:if(x=n!==null&&n.memoizedState!==null,e.mode&1?(be=(y=be)||x,st(t,e),be=y):st(t,e),gt(e),r&8192){if(y=e.memoizedState!==null,(e.stateNode.isHidden=y)&&!x&&(e.mode&1)!==0)for(P=e,x=e.child;x!==null;){for(k=P=x;P!==null;){switch(g=P,E=g.child,g.tag){case 0:case 11:case 14:case 15:hr(4,g,g.return);break;case 1:An(g,g.return);var T=g.stateNode;if(typeof T.componentWillUnmount=="function"){r=g,n=g.return;try{t=r,T.props=t.memoizedProps,T.state=t.memoizedState,T.componentWillUnmount()}catch(I){ue(r,n,I)}}break;case 5:An(g,g.return);break;case 22:if(g.memoizedState!==null){yu(k);continue}}E!==null?(E.return=g,P=E):yu(k)}x=x.sibling}e:for(x=null,k=e;;){if(k.tag===5){if(x===null){x=k;try{o=k.stateNode,y?(l=o.style,typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none"):(s=k.stateNode,u=k.memoizedProps.style,i=u!=null&&u.hasOwnProperty("display")?u.display:null,s.style.display=Qi("display",i))}catch(I){ue(e,e.return,I)}}}else if(k.tag===6){if(x===null)try{k.stateNode.nodeValue=y?"":k.memoizedProps}catch(I){ue(e,e.return,I)}}else if((k.tag!==22&&k.tag!==23||k.memoizedState===null||k===e)&&k.child!==null){k.child.return=k,k=k.child;continue}if(k===e)break e;for(;k.sibling===null;){if(k.return===null||k.return===e)break e;x===k&&(x=null),k=k.return}x===k&&(x=null),k.sibling.return=k.return,k=k.sibling}}break;case 19:st(t,e),gt(e),r&4&&pu(e);break;case 21:break;default:st(t,e),gt(e)}}function gt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(uu(n)){var r=n;break e}n=n.return}throw Error(c(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&(Ln(o,""),r.flags&=-33);var l=cu(e);di(e,l,o);break;case 3:case 4:var i=r.stateNode.containerInfo,s=cu(e);ci(e,s,i);break;default:throw Error(c(161))}}catch(u){ue(e,e.return,u)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Id(e,t,n){P=e,mu(e)}function mu(e,t,n){for(var r=(e.mode&1)!==0;P!==null;){var o=P,l=o.child;if(o.tag===22&&r){var i=o.memoizedState!==null||yo;if(!i){var s=o.alternate,u=s!==null&&s.memoizedState!==null||be;s=yo;var y=be;if(yo=i,(be=u)&&!y)for(P=o;P!==null;)i=P,u=i.child,i.tag===22&&i.memoizedState!==null?gu(o):u!==null?(u.return=i,P=u):gu(o);for(;l!==null;)P=l,mu(l),l=l.sibling;P=o,yo=s,be=y}hu(e)}else(o.subtreeFlags&8772)!==0&&l!==null?(l.return=o,P=l):hu(e)}}function hu(e){for(;P!==null;){var t=P;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:be||go(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!be)if(n===null)r.componentDidMount();else{var o=t.elementType===t.type?n.memoizedProps:it(t.type,n.memoizedProps);r.componentDidUpdate(o,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var l=t.updateQueue;l!==null&&ys(t,l,r);break;case 3:var i=t.updateQueue;if(i!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}ys(t,i,n)}break;case 5:var s=t.stateNode;if(n===null&&t.flags&4){n=s;var u=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var y=t.alternate;if(y!==null){var x=y.memoizedState;if(x!==null){var k=x.dehydrated;k!==null&&Hn(k)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(c(163))}be||t.flags&512&&ui(t)}catch(g){ue(t,t.return,g)}}if(t===e){P=null;break}if(n=t.sibling,n!==null){n.return=t.return,P=n;break}P=t.return}}function yu(e){for(;P!==null;){var t=P;if(t===e){P=null;break}var n=t.sibling;if(n!==null){n.return=t.return,P=n;break}P=t.return}}function gu(e){for(;P!==null;){var t=P;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{go(4,t)}catch(u){ue(t,n,u)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var o=t.return;try{r.componentDidMount()}catch(u){ue(t,o,u)}}var l=t.return;try{ui(t)}catch(u){ue(t,l,u)}break;case 5:var i=t.return;try{ui(t)}catch(u){ue(t,i,u)}}}catch(u){ue(t,t.return,u)}if(t===e){P=null;break}var s=t.sibling;if(s!==null){s.return=t.return,P=s;break}P=t.return}}var Ad=Math.ceil,vo=ke.ReactCurrentDispatcher,pi=ke.ReactCurrentOwner,Xe=ke.ReactCurrentBatchConfig,V=0,ge=null,pe=null,we=0,Ge=0,_n=Lt(0),me=0,yr=null,on=0,xo=0,fi=0,gr=null,Be=null,mi=0,Rn=1/0,Pt=null,wo=!1,hi=null,Vt=null,ko=!1,qt=null,So=0,vr=0,yi=null,Co=-1,No=0;function je(){return(V&6)!==0?ce():Co!==-1?Co:Co=ce()}function Gt(e){return(e.mode&1)===0?1:(V&2)!==0&&we!==0?we&-we:md.transition!==null?(No===0&&(No=ca()),No):(e=Q,e!==0||(e=window.event,e=e===void 0?16:xa(e.type)),e)}function ut(e,t,n,r){if(50<vr)throw vr=0,yi=null,Error(c(185));Vn(e,n,r),((V&2)===0||e!==ge)&&(e===ge&&((V&2)===0&&(xo|=n),me===4&&Wt(e,we)),Le(e,r),n===1&&V===0&&(t.mode&1)===0&&(Rn=ce()+500,Kr&&Mt()))}function Le(e,t){var n=e.callbackNode;mc(e,t);var r=_r(e,e===ge?we:0);if(r===0)n!==null&&aa(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&aa(n),t===1)e.tag===0?fd(xu.bind(null,e)):os(xu.bind(null,e)),ud(function(){(V&6)===0&&Mt()}),n=null;else{switch(da(r)){case 1:n=$o;break;case 4:n=sa;break;case 16:n=jr;break;case 536870912:n=ua;break;default:n=jr}n=Pu(n,vu.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function vu(e,t){if(Co=-1,No=0,(V&6)!==0)throw Error(c(327));var n=e.callbackNode;if(Dn()&&e.callbackNode!==n)return null;var r=_r(e,e===ge?we:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=bo(e,r);else{t=r;var o=V;V|=2;var l=ku();(ge!==e||we!==t)&&(Pt=null,Rn=ce()+500,an(e,t));do try{Dd();break}catch(s){wu(e,s)}while(!0);Dl(),vo.current=l,V=o,pe!==null?t=0:(ge=null,we=0,t=me)}if(t!==0){if(t===2&&(o=Yo(e),o!==0&&(r=o,t=gi(e,o))),t===1)throw n=yr,an(e,0),Wt(e,r),Le(e,ce()),n;if(t===6)Wt(e,r);else{if(o=e.current.alternate,(r&30)===0&&!_d(o)&&(t=bo(e,r),t===2&&(l=Yo(e),l!==0&&(r=l,t=gi(e,l))),t===1))throw n=yr,an(e,0),Wt(e,r),Le(e,ce()),n;switch(e.finishedWork=o,e.finishedLanes=r,t){case 0:case 1:throw Error(c(345));case 2:sn(e,Be,Pt);break;case 3:if(Wt(e,r),(r&130023424)===r&&(t=mi+500-ce(),10<t)){if(_r(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){je(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=Cl(sn.bind(null,e,Be,Pt),t);break}sn(e,Be,Pt);break;case 4:if(Wt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,o=-1;0<r;){var i=31-rt(r);l=1<<i,i=t[i],i>o&&(o=i),r&=~l}if(r=o,r=ce()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Ad(r/1960))-r,10<r){e.timeoutHandle=Cl(sn.bind(null,e,Be,Pt),r);break}sn(e,Be,Pt);break;case 5:sn(e,Be,Pt);break;default:throw Error(c(329))}}}return Le(e,ce()),e.callbackNode===n?vu.bind(null,e):null}function gi(e,t){var n=gr;return e.current.memoizedState.isDehydrated&&(an(e,t).flags|=256),e=bo(e,t),e!==2&&(t=Be,Be=n,t!==null&&vi(t)),e}function vi(e){Be===null?Be=e:Be.push.apply(Be,e)}function _d(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var o=n[r],l=o.getSnapshot;o=o.value;try{if(!ot(l(),o))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Wt(e,t){for(t&=~fi,t&=~xo,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-rt(t),r=1<<n;e[n]=-1,t&=~r}}function xu(e){if((V&6)!==0)throw Error(c(327));Dn();var t=_r(e,0);if((t&1)===0)return Le(e,ce()),null;var n=bo(e,t);if(e.tag!==0&&n===2){var r=Yo(e);r!==0&&(t=r,n=gi(e,r))}if(n===1)throw n=yr,an(e,0),Wt(e,t),Le(e,ce()),n;if(n===6)throw Error(c(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,sn(e,Be,Pt),Le(e,ce()),null}function xi(e,t){var n=V;V|=1;try{return e(t)}finally{V=n,V===0&&(Rn=ce()+500,Kr&&Mt())}}function ln(e){qt!==null&&qt.tag===0&&(V&6)===0&&Dn();var t=V;V|=1;var n=Xe.transition,r=Q;try{if(Xe.transition=null,Q=1,e)return e()}finally{Q=r,Xe.transition=n,V=t,(V&6)===0&&Mt()}}function wi(){Ge=_n.current,ee(_n)}function an(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,sd(n)),pe!==null)for(n=pe.return;n!==null;){var r=n;switch(Tl(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&$r();break;case 3:Tn(),ee(_e),ee(Se),Vl();break;case 5:zl(r);break;case 4:Tn();break;case 13:ee(ie);break;case 19:ee(ie);break;case 10:Bl(r.type._context);break;case 22:case 23:wi()}n=n.return}if(ge=e,pe=e=Jt(e.current,null),we=Ge=t,me=0,yr=null,fi=xo=on=0,Be=gr=null,tn!==null){for(t=0;t<tn.length;t++)if(n=tn[t],r=n.interleaved,r!==null){n.interleaved=null;var o=r.next,l=n.pending;if(l!==null){var i=l.next;l.next=o,r.next=i}n.pending=r}tn=null}return e}function wu(e,t){do{var n=pe;try{if(Dl(),ao.current=po,so){for(var r=ae.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}so=!1}if(rn=0,ye=fe=ae=null,cr=!1,dr=0,pi.current=null,n===null||n.return===null){me=1,yr=t,pe=null;break}e:{var l=e,i=n.return,s=n,u=t;if(t=we,s.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var y=u,x=s,k=x.tag;if((x.mode&1)===0&&(k===0||k===11||k===15)){var g=x.alternate;g?(x.updateQueue=g.updateQueue,x.memoizedState=g.memoizedState,x.lanes=g.lanes):(x.updateQueue=null,x.memoizedState=null)}var E=Ws(i);if(E!==null){E.flags&=-257,Js(E,i,s,l,t),E.mode&1&&Gs(l,y,t),t=E,u=y;var T=t.updateQueue;if(T===null){var I=new Set;I.add(u),t.updateQueue=I}else T.add(u);break e}else{if((t&1)===0){Gs(l,y,t),ki();break e}u=Error(c(426))}}else if(oe&&s.mode&1){var de=Ws(i);if(de!==null){(de.flags&65536)===0&&(de.flags|=256),Js(de,i,s,l,t),_l(In(u,s));break e}}l=u=In(u,s),me!==4&&(me=2),gr===null?gr=[l]:gr.push(l),l=i;do{switch(l.tag){case 3:l.flags|=65536,t&=-t,l.lanes|=t;var m=Vs(l,u,t);hs(l,m);break e;case 1:s=u;var p=l.type,h=l.stateNode;if((l.flags&128)===0&&(typeof p.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(Vt===null||!Vt.has(h)))){l.flags|=65536,t&=-t,l.lanes|=t;var S=qs(l,s,t);hs(l,S);break e}}l=l.return}while(l!==null)}Cu(n)}catch(_){t=_,pe===n&&n!==null&&(pe=n=n.return);continue}break}while(!0)}function ku(){var e=vo.current;return vo.current=po,e===null?po:e}function ki(){(me===0||me===3||me===2)&&(me=4),ge===null||(on&268435455)===0&&(xo&268435455)===0||Wt(ge,we)}function bo(e,t){var n=V;V|=2;var r=ku();(ge!==e||we!==t)&&(Pt=null,an(e,t));do try{Rd();break}catch(o){wu(e,o)}while(!0);if(Dl(),V=n,vo.current=r,pe!==null)throw Error(c(261));return ge=null,we=0,me}function Rd(){for(;pe!==null;)Su(pe)}function Dd(){for(;pe!==null&&!lc();)Su(pe)}function Su(e){var t=Eu(e.alternate,e,Ge);e.memoizedProps=e.pendingProps,t===null?Cu(e):pe=t,pi.current=null}function Cu(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=Ed(n,t,Ge),n!==null){pe=n;return}}else{if(n=Pd(n,t),n!==null){n.flags&=32767,pe=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{me=6,pe=null;return}}if(t=t.sibling,t!==null){pe=t;return}pe=t=e}while(t!==null);me===0&&(me=5)}function sn(e,t,n){var r=Q,o=Xe.transition;try{Xe.transition=null,Q=1,Bd(e,t,n,r)}finally{Xe.transition=o,Q=r}return null}function Bd(e,t,n,r){do Dn();while(qt!==null);if((V&6)!==0)throw Error(c(327));n=e.finishedWork;var o=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(c(177));e.callbackNode=null,e.callbackPriority=0;var l=n.lanes|n.childLanes;if(hc(e,l),e===ge&&(pe=ge=null,we=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||ko||(ko=!0,Pu(jr,function(){return Dn(),null})),l=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||l){l=Xe.transition,Xe.transition=null;var i=Q;Q=1;var s=V;V|=4,pi.current=null,Td(e,n),fu(n,e),td(kl),Br=!!wl,kl=wl=null,e.current=n,Id(n),ic(),V=s,Q=i,Xe.transition=l}else e.current=n;if(ko&&(ko=!1,qt=e,So=o),l=e.pendingLanes,l===0&&(Vt=null),uc(n.stateNode),Le(e,ce()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)o=t[n],r(o.value,{componentStack:o.stack,digest:o.digest});if(wo)throw wo=!1,e=hi,hi=null,e;return(So&1)!==0&&e.tag!==0&&Dn(),l=e.pendingLanes,(l&1)!==0?e===yi?vr++:(vr=0,yi=e):vr=0,Mt(),null}function Dn(){if(qt!==null){var e=da(So),t=Xe.transition,n=Q;try{if(Xe.transition=null,Q=16>e?16:e,qt===null)var r=!1;else{if(e=qt,qt=null,So=0,(V&6)!==0)throw Error(c(331));var o=V;for(V|=4,P=e.current;P!==null;){var l=P,i=l.child;if((P.flags&16)!==0){var s=l.deletions;if(s!==null){for(var u=0;u<s.length;u++){var y=s[u];for(P=y;P!==null;){var x=P;switch(x.tag){case 0:case 11:case 15:hr(8,x,l)}var k=x.child;if(k!==null)k.return=x,P=k;else for(;P!==null;){x=P;var g=x.sibling,E=x.return;if(su(x),x===y){P=null;break}if(g!==null){g.return=E,P=g;break}P=E}}}var T=l.alternate;if(T!==null){var I=T.child;if(I!==null){T.child=null;do{var de=I.sibling;I.sibling=null,I=de}while(I!==null)}}P=l}}if((l.subtreeFlags&2064)!==0&&i!==null)i.return=l,P=i;else e:for(;P!==null;){if(l=P,(l.flags&2048)!==0)switch(l.tag){case 0:case 11:case 15:hr(9,l,l.return)}var m=l.sibling;if(m!==null){m.return=l.return,P=m;break e}P=l.return}}var p=e.current;for(P=p;P!==null;){i=P;var h=i.child;if((i.subtreeFlags&2064)!==0&&h!==null)h.return=i,P=h;else e:for(i=p;P!==null;){if(s=P,(s.flags&2048)!==0)try{switch(s.tag){case 0:case 11:case 15:go(9,s)}}catch(_){ue(s,s.return,_)}if(s===i){P=null;break e}var S=s.sibling;if(S!==null){S.return=s.return,P=S;break e}P=s.return}}if(V=o,Mt(),ft&&typeof ft.onPostCommitFiberRoot=="function")try{ft.onPostCommitFiberRoot(Tr,e)}catch{}r=!0}return r}finally{Q=n,Xe.transition=t}}return!1}function Nu(e,t,n){t=In(n,t),t=Vs(e,t,1),e=zt(e,t,1),t=je(),e!==null&&(Vn(e,1,t),Le(e,t))}function ue(e,t,n){if(e.tag===3)Nu(e,e,n);else for(;t!==null;){if(t.tag===3){Nu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Vt===null||!Vt.has(r))){e=In(n,e),e=qs(t,e,1),t=zt(t,e,1),e=je(),t!==null&&(Vn(t,1,e),Le(t,e));break}}t=t.return}}function Ld(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=je(),e.pingedLanes|=e.suspendedLanes&n,ge===e&&(we&n)===n&&(me===4||me===3&&(we&130023424)===we&&500>ce()-mi?an(e,0):fi|=n),Le(e,t)}function bu(e,t){t===0&&((e.mode&1)===0?t=1:(t=Ar,Ar<<=1,(Ar&130023424)===0&&(Ar=4194304)));var n=je();e=Nt(e,t),e!==null&&(Vn(e,t,n),Le(e,n))}function Od(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),bu(e,n)}function Md(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(n=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(c(314))}r!==null&&r.delete(t),bu(e,n)}var Eu;Eu=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||_e.current)De=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return De=!1,bd(e,t,n);De=(e.flags&131072)!==0}else De=!1,oe&&(t.flags&1048576)!==0&&ls(t,Zr,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;ho(e,t),e=t.pendingProps;var o=Sn(t,Se.current);jn(t,n),o=Wl(null,t,r,e,o,n);var l=Jl();return t.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Re(r)?(l=!0,Yr(t)):l=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,Ml(t),o.updater=fo,t.stateNode=o,o._reactInternals=t,Xl(t,r,e,n),t=ni(null,t,r,!0,l,n)):(t.tag=0,oe&&l&&jl(t),Pe(null,t,o,n),t=t.child),t;case 16:r=t.elementType;e:{switch(ho(e,t),e=t.pendingProps,o=r._init,r=o(r._payload),t.type=r,o=t.tag=zd(r),e=it(r,e),o){case 0:t=ti(null,t,r,e,n);break e;case 1:t=Xs(null,t,r,e,n);break e;case 11:t=Hs(null,t,r,e,n);break e;case 14:t=Qs(null,t,r,it(r.type,e),n);break e}throw Error(c(306,r,""))}return t;case 0:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:it(r,o),ti(e,t,r,o,n);case 1:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:it(r,o),Xs(e,t,r,o,n);case 3:e:{if(Zs(t),e===null)throw Error(c(387));r=t.pendingProps,l=t.memoizedState,o=l.element,ms(e,t),lo(t,r,null,n);var i=t.memoizedState;if(r=i.element,l.isDehydrated)if(l={element:r,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=l,t.memoizedState=l,t.flags&256){o=In(Error(c(423)),t),t=eu(e,t,r,n,o);break e}else if(r!==o){o=In(Error(c(424)),t),t=eu(e,t,r,n,o);break e}else for(qe=Bt(t.stateNode.containerInfo.firstChild),Ve=t,oe=!0,lt=null,n=ps(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(bn(),r===o){t=Et(e,t,n);break e}Pe(e,t,r,n)}t=t.child}return t;case 5:return gs(t),e===null&&Al(t),r=t.type,o=t.pendingProps,l=e!==null?e.memoizedProps:null,i=o.children,Sl(r,o)?i=null:l!==null&&Sl(r,l)&&(t.flags|=32),Ks(e,t),Pe(e,t,i,n),t.child;case 6:return e===null&&Al(t),null;case 13:return tu(e,t,n);case 4:return Ul(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=En(t,null,r,n):Pe(e,t,r,n),t.child;case 11:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:it(r,o),Hs(e,t,r,o,n);case 7:return Pe(e,t,t.pendingProps,n),t.child;case 8:return Pe(e,t,t.pendingProps.children,n),t.child;case 12:return Pe(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,o=t.pendingProps,l=t.memoizedProps,i=o.value,X(no,r._currentValue),r._currentValue=i,l!==null)if(ot(l.value,i)){if(l.children===o.children&&!_e.current){t=Et(e,t,n);break e}}else for(l=t.child,l!==null&&(l.return=t);l!==null;){var s=l.dependencies;if(s!==null){i=l.child;for(var u=s.firstContext;u!==null;){if(u.context===r){if(l.tag===1){u=bt(-1,n&-n),u.tag=2;var y=l.updateQueue;if(y!==null){y=y.shared;var x=y.pending;x===null?u.next=u:(u.next=x.next,x.next=u),y.pending=u}}l.lanes|=n,u=l.alternate,u!==null&&(u.lanes|=n),Ll(l.return,n,t),s.lanes|=n;break}u=u.next}}else if(l.tag===10)i=l.type===t.type?null:l.child;else if(l.tag===18){if(i=l.return,i===null)throw Error(c(341));i.lanes|=n,s=i.alternate,s!==null&&(s.lanes|=n),Ll(i,n,t),i=l.sibling}else i=l.child;if(i!==null)i.return=l;else for(i=l;i!==null;){if(i===t){i=null;break}if(l=i.sibling,l!==null){l.return=i.return,i=l;break}i=i.return}l=i}Pe(e,t,o.children,n),t=t.child}return t;case 9:return o=t.type,r=t.pendingProps.children,jn(t,n),o=Ye(o),r=r(o),t.flags|=1,Pe(e,t,r,n),t.child;case 14:return r=t.type,o=it(r,t.pendingProps),o=it(r.type,o),Qs(e,t,r,o,n);case 15:return $s(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:it(r,o),ho(e,t),t.tag=1,Re(r)?(e=!0,Yr(t)):e=!1,jn(t,n),zs(t,r,o),Xl(t,r,o,n),ni(null,t,r,!0,e,n);case 19:return ru(e,t,n);case 22:return Ys(e,t,n)}throw Error(c(156,t.tag))};function Pu(e,t){return ia(e,t)}function Ud(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ze(e,t,n,r){return new Ud(e,t,n,r)}function Si(e){return e=e.prototype,!(!e||!e.isReactComponent)}function zd(e){if(typeof e=="function")return Si(e)?1:0;if(e!=null){if(e=e.$$typeof,e===dt)return 11;if(e===pt)return 14}return 2}function Jt(e,t){var n=e.alternate;return n===null?(n=Ze(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Eo(e,t,n,r,o,l){var i=2;if(r=e,typeof e=="function")Si(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case Ie:return un(n.children,o,l,t);case He:i=8,o|=8;break;case jt:return e=Ze(12,n,t,o|2),e.elementType=jt,e.lanes=l,e;case Ue:return e=Ze(13,n,t,o),e.elementType=Ue,e.lanes=l,e;case nt:return e=Ze(19,n,t,o),e.elementType=nt,e.lanes=l,e;case se:return Po(n,o,l,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case xt:i=10;break e;case $t:i=9;break e;case dt:i=11;break e;case pt:i=14;break e;case Ae:i=16,r=null;break e}throw Error(c(130,e==null?e:typeof e,""))}return t=Ze(i,n,t,o),t.elementType=e,t.type=r,t.lanes=l,t}function un(e,t,n,r){return e=Ze(7,e,r,t),e.lanes=n,e}function Po(e,t,n,r){return e=Ze(22,e,r,t),e.elementType=se,e.lanes=n,e.stateNode={isHidden:!1},e}function Ci(e,t,n){return e=Ze(6,e,null,t),e.lanes=n,e}function Ni(e,t,n){return t=Ze(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Fd(e,t,n,r,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ko(0),this.expirationTimes=Ko(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ko(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function bi(e,t,n,r,o,l,i,s,u){return e=new Fd(e,t,n,s,u),t===1?(t=1,l===!0&&(t|=8)):t=0,l=Ze(3,null,null,t),e.current=l,l.stateNode=e,l.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ml(l),e}function Vd(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Ee,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function ju(e){if(!e)return Ot;e=e._reactInternals;e:{if(Yt(e)!==e||e.tag!==1)throw Error(c(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Re(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(c(171))}if(e.tag===1){var n=e.type;if(Re(n))return ns(e,n,t)}return t}function Tu(e,t,n,r,o,l,i,s,u){return e=bi(n,r,!0,e,o,l,i,s,u),e.context=ju(null),n=e.current,r=je(),o=Gt(n),l=bt(r,o),l.callback=t??null,zt(n,l,o),e.current.lanes=o,Vn(e,o,r),Le(e,r),e}function jo(e,t,n,r){var o=t.current,l=je(),i=Gt(o);return n=ju(n),t.context===null?t.context=n:t.pendingContext=n,t=bt(l,i),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=zt(o,t,i),e!==null&&(ut(e,o,i,l),oo(e,o,i)),i}function To(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Iu(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Ei(e,t){Iu(e,t),(e=e.alternate)&&Iu(e,t)}function qd(){return null}var Au=typeof reportError=="function"?reportError:function(e){console.error(e)};function Pi(e){this._internalRoot=e}Io.prototype.render=Pi.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(c(409));jo(e,t,null,null)},Io.prototype.unmount=Pi.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;ln(function(){jo(null,e,null,null)}),t[wt]=null}};function Io(e){this._internalRoot=e}Io.prototype.unstable_scheduleHydration=function(e){if(e){var t=ma();e={blockedOn:null,target:e,priority:t};for(var n=0;n<_t.length&&t!==0&&t<_t[n].priority;n++);_t.splice(n,0,e),n===0&&ga(e)}};function ji(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Ao(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function _u(){}function Gd(e,t,n,r,o){if(o){if(typeof r=="function"){var l=r;r=function(){var y=To(i);l.call(y)}}var i=Tu(t,r,e,0,null,!1,!1,"",_u);return e._reactRootContainer=i,e[wt]=i.current,nr(e.nodeType===8?e.parentNode:e),ln(),i}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var s=r;r=function(){var y=To(u);s.call(y)}}var u=bi(e,0,!1,null,null,!1,!1,"",_u);return e._reactRootContainer=u,e[wt]=u.current,nr(e.nodeType===8?e.parentNode:e),ln(function(){jo(t,u,n,r)}),u}function _o(e,t,n,r,o){var l=n._reactRootContainer;if(l){var i=l;if(typeof o=="function"){var s=o;o=function(){var u=To(i);s.call(u)}}jo(t,i,e,o)}else i=Gd(n,t,e,o,r);return To(i)}pa=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Fn(t.pendingLanes);n!==0&&(Xo(t,n|1),Le(t,ce()),(V&6)===0&&(Rn=ce()+500,Mt()))}break;case 13:ln(function(){var r=Nt(e,1);if(r!==null){var o=je();ut(r,e,1,o)}}),Ei(e,1)}},Zo=function(e){if(e.tag===13){var t=Nt(e,134217728);if(t!==null){var n=je();ut(t,e,134217728,n)}Ei(e,134217728)}},fa=function(e){if(e.tag===13){var t=Gt(e),n=Nt(e,t);if(n!==null){var r=je();ut(n,e,t,r)}Ei(e,t)}},ma=function(){return Q},ha=function(e,t){var n=Q;try{return Q=e,t()}finally{Q=n}},Wo=function(e,t,n){switch(t){case"input":if(Oo(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var o=Qr(r);if(!o)throw Error(c(90));Ui(r),Oo(r,o)}}}break;case"textarea":Gi(e,n);break;case"select":t=n.value,t!=null&&cn(e,!!n.multiple,t,!1)}},Zi=xi,ea=ln;var Wd={usingClientEntryPoint:!1,Events:[lr,wn,Qr,Ki,Xi,xi]},xr={findFiberByHostInstance:Kt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Jd={bundleType:xr.bundleType,version:xr.version,rendererPackageName:xr.rendererPackageName,rendererConfig:xr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ke.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=oa(e),e===null?null:e.stateNode},findFiberByHostInstance:xr.findFiberByHostInstance||qd,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ro=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ro.isDisabled&&Ro.supportsFiber)try{Tr=Ro.inject(Jd),ft=Ro}catch{}}return Oe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Wd,Oe.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ji(t))throw Error(c(200));return Vd(e,t,null,n)},Oe.createRoot=function(e,t){if(!ji(e))throw Error(c(299));var n=!1,r="",o=Au;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=bi(e,1,!1,null,null,n,!1,r,o),e[wt]=t.current,nr(e.nodeType===8?e.parentNode:e),new Pi(t)},Oe.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(c(188)):(e=Object.keys(e).join(","),Error(c(268,e)));return e=oa(t),e=e===null?null:e.stateNode,e},Oe.flushSync=function(e){return ln(e)},Oe.hydrate=function(e,t,n){if(!Ao(t))throw Error(c(200));return _o(null,e,t,!0,n)},Oe.hydrateRoot=function(e,t,n){if(!ji(e))throw Error(c(405));var r=n!=null&&n.hydratedSources||null,o=!1,l="",i=Au;if(n!=null&&(n.unstable_strictMode===!0&&(o=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),t=Tu(t,null,e,1,n??null,o,!1,l,i),e[wt]=t.current,nr(e),r)for(e=0;e<r.length;e++)n=r[e],o=n._getVersion,o=o(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,o]:t.mutableSourceEagerHydrationData.push(n,o);return new Io(t)},Oe.render=function(e,t,n){if(!Ao(t))throw Error(c(200));return _o(null,e,t,!1,n)},Oe.unmountComponentAtNode=function(e){if(!Ao(e))throw Error(c(40));return e._reactRootContainer?(ln(function(){_o(null,null,e,!1,function(){e._reactRootContainer=null,e[wt]=null})}),!0):!1},Oe.unstable_batchedUpdates=xi,Oe.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Ao(n))throw Error(c(200));if(e==null||e._reactInternals===void 0)throw Error(c(38));return _o(e,t,n,!1,r)},Oe.version="18.3.1-next-f1338f8080-20240426",Oe}var zu;function tp(){if(zu)return Ai.exports;zu=1;function d(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(d)}catch(w){console.error(w)}}return d(),Ai.exports=ep(),Ai.exports}var Fu;function np(){if(Fu)return Do;Fu=1;var d=tp();return Do.createRoot=d.createRoot,Do.hydrateRoot=d.hydrateRoot,Do}var rp=np();const op=Hu(rp);function Qu(d){return"group"in d}const $u=[{id:"overview",label:"Overview",icon:"🏠"},{id:"catalog",label:"Block Catalog",icon:"🧩"},{group:"SDK Reference",items:[{id:"factories",label:"Factory Functions",icon:"🏭"},{id:"client-api",label:"JourneyClient API",icon:"⚡"}]},{group:"For AI Agents",items:[{id:"agent-guide",label:"Agent Guide",icon:"🤖"},{id:"example-journey",label:"Examples",icon:"📝"}]}];function lp(d){const w=[];for(const c of d)Qu(c)?w.push(...c.items):w.push(c);return w}const Qt=[{controlName:"PersonalInformationControl",displayName:"Personal Information",category:"composite",description:"Collects name, email, phone, birth date, and optional company details. Supports private/business/user-defined modes.",hasValue:!0,commonlyUsed:!0,icon:"👤",factory:"createPersonalInformation",valueType:`interface PersonalInformationValue {
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
}`}],Bi=["input","composite","commerce","display","navigation","utility","third-party"],Li={input:"Input",composite:"Composite",commerce:"Commerce",display:"Display",navigation:"Navigation",utility:"Utility","third-party":"Third-party"},Oi={input:"✏️",composite:"🧩",commerce:"💰",display:"👁️",navigation:"🧭",utility:"⚙️","third-party":"🔌"},Mi={input:{bg:"bg-blue-50",text:"text-blue-700",border:"border-blue-100"},composite:{bg:"bg-emerald-50",text:"text-emerald-700",border:"border-emerald-100"},commerce:{bg:"bg-amber-50",text:"text-amber-700",border:"border-amber-100"},display:{bg:"bg-purple-50",text:"text-purple-700",border:"border-purple-100"},navigation:{bg:"bg-teal-50",text:"text-teal-700",border:"border-teal-100"},utility:{bg:"bg-gray-50",text:"text-gray-600",border:"border-gray-200"},"third-party":{bg:"bg-red-50",text:"text-red-700",border:"border-red-100"}},Vu=[{name:"new JourneyClient",group:"journey",alpha:!0,signature:"new JourneyClient({ auth, apiUrl? })",description:"Creates a headless client. Pass a static token string or an async getter function for token refresh.",returns:"JourneyClient instance",example:`import { JourneyClient } from '@epilot/epilot-journey-sdk'

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

const created = await client.createJourney(payload)`}],ip=new Set(["import","from","export","default","const","let","var","function","return","if","else","for","while","do","switch","case","break","continue","new","this","class","extends","async","await","try","catch","throw","typeof","instanceof","in","of","true","false","null","undefined","void","type","interface","enum","as"]),ap=new Set(["console","Math","JSON","Array","Object","String","Number","Boolean","Promise","Map","Set","Date","Error","RegExp"]);function sp(d){const w=[];let c=0;for(;c<d.length;){if(d[c]==="/"&&d[c+1]==="/"){const N=d.indexOf(`
`,c),C=N===-1?d.length:N;w.push({type:"comment",value:d.slice(c,C)}),c=C;continue}if(d[c]==="/"&&d[c+1]==="*"){const N=d.indexOf("*/",c+2),C=N===-1?d.length:N+2;w.push({type:"comment",value:d.slice(c,C)}),c=C;continue}if(d[c]==='"'||d[c]==="'"||d[c]==="`"){const N=d[c];let C=c+1;for(;C<d.length&&d[C]!==N;)d[C]==="\\"&&C++,C++;w.push({type:"string",value:d.slice(c,C+1)}),c=C+1;continue}if(/\d/.test(d[c])&&(c===0||!/\w/.test(d[c-1]))){let N=c;for(;N<d.length&&/[\d._eE]/.test(d[N]);)N++;w.push({type:"number",value:d.slice(c,N)}),c=N;continue}if(/[a-zA-Z_$]/.test(d[c])){let N=c;for(;N<d.length&&/[\w$]/.test(d[N]);)N++;const C=d.slice(c,N);ip.has(C)?w.push({type:"keyword",value:C}):ap.has(C)?w.push({type:"builtin",value:C}):d[N]===":"?w.push({type:"property",value:C}):w.push({type:"plain",value:C}),c=N;continue}if("=<>!+-*/%&|^~?".includes(d[c])){let N=c;for(;N<d.length&&"=<>!+-*/%&|^~?".includes(d[N]);)N++;w.push({type:"operator",value:d.slice(c,N)}),c=N;continue}if("{}[]();:.,".includes(d[c])){w.push({type:"punctuation",value:d[c]}),c++;continue}let A=c;for(;A<d.length&&!/[a-zA-Z_$\d"'`/=<>!+\-*%&|^~?{}[\]();:.,]/.test(d[A]);)A++;w.push({type:"plain",value:d.slice(c,A||c+1)}),c=A||c+1}return w}const up={keyword:"text-violet-400",string:"text-emerald-400",number:"text-amber-300",comment:"text-gray-500 italic",property:"text-sky-300",punctuation:"text-gray-500",operator:"text-pink-400",builtin:"text-yellow-300",plain:"text-gray-200"};function Me({code:d,title:w,language:c="typescript"}){const[A,N]=Te.useState(!1),C=Te.useMemo(()=>c==="bash"?d.split(`
`).map((O,J)=>O.trimStart().startsWith("#")?a.jsx("div",{children:a.jsx("span",{className:"text-gray-500 italic",children:O})},J):a.jsx("div",{children:O},J)):sp(d).map((O,J)=>a.jsx("span",{className:up[O.type],children:O.value},J)),[d,c]),Y=()=>{navigator.clipboard.writeText(d),N(!0),setTimeout(()=>N(!1),2e3)};return a.jsxs("div",{className:"rounded-xl overflow-hidden",style:{border:"1px solid rgba(99, 102, 241, 0.1)",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.06)"},children:[w&&a.jsxs("div",{className:"flex items-center justify-between px-4 py-2",style:{background:"linear-gradient(135deg, #1a1a2e 0%, #16162a 100%)",borderBottom:"1px solid rgba(255, 255, 255, 0.06)"},children:[a.jsxs("div",{className:"flex items-center gap-3",children:[a.jsxs("div",{className:"flex gap-1.5",children:[a.jsx("span",{className:"w-2.5 h-2.5 rounded-full bg-red-500/60"}),a.jsx("span",{className:"w-2.5 h-2.5 rounded-full bg-yellow-500/60"}),a.jsx("span",{className:"w-2.5 h-2.5 rounded-full bg-green-500/60"})]}),a.jsx("span",{className:"text-[11px] text-gray-400 font-mono",children:w})]}),a.jsxs("div",{className:"flex items-center gap-2",children:[c&&a.jsx("span",{className:"text-gray-600 text-[10px] uppercase font-mono",children:c}),a.jsx("button",{onClick:Y,className:"text-gray-500 hover:text-gray-300 transition-colors text-[11px] font-mono px-2 py-0.5 rounded hover:bg-white/5",children:A?"copied!":"copy"})]})]}),a.jsx("pre",{className:"p-4 text-[13px] overflow-x-auto font-mono leading-relaxed whitespace-pre",style:{background:"linear-gradient(180deg, #0f0f1a 0%, #111122 100%)",color:"#e2e8f0"},children:C})]})}const cp=[{label:"Block Types",value:String(Qt.length)},{label:"Categories",value:String(Bi.length)},{label:"Factory Fns",value:String(Bo.length)},{label:"Status",value:"Alpha"}],dp="npm install @epilot/epilot-journey-sdk",pp=`import {
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
console.log('Created:', created.journeyId)`,fp=[{icon:"🧩",title:"Block Catalog",desc:"All 35+ block types with value shapes, options, and v3 wire format",nav:"catalog",accent:"from-violet-500 to-purple-600"},{icon:"🏭",title:"Factory Functions",desc:"19 typed factories that auto-produce valid API wire format",nav:"factories",accent:"from-blue-500 to-indigo-600"},{icon:"⚡",title:"Headless Client",desc:"Full CRUD + block-level patch/add/remove without a UI",nav:"client-api",accent:"from-emerald-500 to-teal-600"},{icon:"🤖",title:"Agent Guide",desc:"Wire format traps, failure modes, and proven patterns",nav:"agent-guide",accent:"from-amber-500 to-orange-600"}],mp=[{icon:"⚡",title:"Energy Signup",steps:"AvailabilityCheck → ProductSelection + Cart → PersonalInfo + Address → Payment → Consents → Confirm"},{icon:"📝",title:"Lead / Inquiry Form",steps:"Paragraph → PersonalInformation → MultiChoice → TextInput → Consents + SubmitAndGoNext → Confirm"},{icon:"☀️",title:"PV Solar Planner",steps:"Address → PVRoofPlanner → NumberInput → ProductSelection → PersonalInfo → Consents → Confirm"}];function Yu({onNavigate:d}){return a.jsxs("div",{children:[a.jsxs("div",{className:"relative mb-12",children:[a.jsx("div",{className:"hero-glow bg-primary-500",style:{top:-100,right:-100}}),a.jsx("div",{className:"hero-glow bg-violet-500",style:{top:0,left:-150}}),a.jsxs("div",{className:"relative",children:[a.jsxs("div",{className:"inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6",style:{background:"rgba(99, 102, 241, 0.08)",border:"1px solid rgba(99, 102, 241, 0.15)",color:"#6366f1"},children:[a.jsx("span",{className:"agent-dot"}),"epilot Journey SDK"]}),a.jsxs("h1",{className:"text-5xl font-extrabold text-gray-900 mb-5 tracking-tight leading-[1.1]",children:["Build Journeys.",a.jsx("br",{}),a.jsx("span",{className:"gradient-text",children:"Programmatically."})]}),a.jsx("p",{className:"text-lg text-gray-500 max-w-xl leading-relaxed mb-8",children:"A type-safe SDK for AI agents and developers to create, inspect, and modify epilot journeys. Every block type documented. Every wire format quirk handled."}),a.jsx("div",{className:"flex gap-6 mb-2",children:cp.map(w=>a.jsxs("div",{className:"text-center",children:[a.jsx("div",{className:"text-2xl font-extrabold text-gray-900",children:w.value}),a.jsx("div",{className:"text-[11px] font-medium text-gray-400 uppercase tracking-wider",children:w.label})]},w.label))})]})]}),a.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14",children:fp.map(w=>a.jsxs("button",{onClick:()=>d(w.nav),className:"card-interactive text-left group overflow-hidden",children:[a.jsx("div",{className:`h-1 w-full bg-gradient-to-r ${w.accent} rounded-t-2xl -mt-6 -mx-6 mb-5`,style:{width:"calc(100% + 3rem)"}}),a.jsx("div",{className:"w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-xl mb-3",children:w.icon}),a.jsx("h3",{className:"font-bold text-gray-900 text-sm mb-1",children:w.title}),a.jsx("p",{className:"text-xs text-gray-500 leading-relaxed",children:w.desc}),a.jsx("p",{className:"text-xs text-primary-600 font-semibold mt-3 group-hover:text-primary-500 transition-colors",children:"Explore →"})]},w.title))}),a.jsx("h2",{className:"text-2xl font-extrabold text-gray-900 mb-1 tracking-tight",children:"Block Categories"}),a.jsx("p",{className:"text-sm text-gray-400 mb-6",children:"Browse by category in the block catalog"}),a.jsx("div",{className:"grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-14",children:Bi.map(w=>{const c=Qt.filter(A=>A.category===w).length;return a.jsxs("button",{onClick:()=>d("catalog"),className:"card-interactive p-4 text-left",children:[a.jsx("div",{className:"text-2xl mb-2",children:Oi[w]}),a.jsx("p",{className:"text-sm font-bold text-gray-900 leading-tight",children:Li[w]}),a.jsxs("p",{className:"text-xs text-gray-400 mt-0.5",children:[c," block",c!==1?"s":""]})]},w)})}),a.jsx("h2",{className:"text-2xl font-extrabold text-gray-900 mb-1 tracking-tight",children:"Common patterns"}),a.jsx("p",{className:"text-sm text-gray-400 mb-6",children:"Typical block sequences for different journey types"}),a.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4 mb-14",children:mp.map(w=>a.jsxs("div",{className:"card overflow-hidden",children:[a.jsxs("div",{className:"flex items-center gap-2.5 mb-3",children:[a.jsx("span",{className:"text-xl",children:w.icon}),a.jsx("h3",{className:"font-bold text-gray-900 text-sm",children:w.title})]}),a.jsx("p",{className:"text-xs text-gray-500 leading-relaxed font-mono",children:w.steps})]},w.title))}),a.jsx("h2",{className:"text-2xl font-extrabold text-gray-900 mb-6 tracking-tight",children:"Quick Start"}),a.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[a.jsx(Me,{title:"Install",language:"bash",code:dp}),a.jsx(Me,{title:"Create a journey in < 30 lines",language:"typescript",code:pp})]})]})}function Ku({category:d,size:w="sm"}){const c=Mi[d],A=w==="sm"?"px-2 py-0.5 text-[11px]":"px-2.5 py-1 text-xs";return a.jsxs("span",{className:`inline-flex items-center gap-1 rounded-full font-semibold ${A} ${c.bg} ${c.text} border ${c.border}`,children:[a.jsx("span",{className:"text-[10px]",children:Oi[d]}),Li[d]]})}function hp({block:d,onClick:w}){const c=Mi[d.category];return a.jsx("button",{onClick:()=>w(d),className:"text-left group w-full",children:a.jsxs("div",{className:"card-interactive flex flex-col gap-3 h-full relative",children:[d.commonlyUsed&&a.jsx("div",{className:"absolute top-3 right-3 text-amber-400 text-xs",title:"Commonly used",children:"★"}),a.jsxs("div",{className:"flex items-start gap-3",children:[a.jsx("div",{className:`w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${c.bg}`,children:d.icon}),a.jsxs("div",{className:"min-w-0",children:[a.jsx("p",{className:"font-semibold text-gray-900 text-sm leading-tight",children:d.displayName}),a.jsx("p",{className:"text-[11px] text-gray-400 font-mono mt-0.5 truncate",children:d.controlName})]})]}),a.jsx("p",{className:"text-xs text-gray-500 leading-relaxed line-clamp-2 flex-1",children:d.description}),a.jsxs("div",{className:"flex flex-wrap gap-1.5 items-center",children:[a.jsx(Ku,{category:d.category}),d.hasValue?a.jsx("span",{className:"inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100",children:"has value"}):a.jsx("span",{className:"inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-gray-50 text-gray-400 border border-gray-100",children:"display only"}),d.factory&&a.jsx("span",{className:"inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-primary-50 text-primary-600 border border-primary-100",children:"factory fn"}),d.deprecated&&a.jsx("span",{className:"inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-red-600 border border-red-100",children:"deprecated"})]}),a.jsx("p",{className:`text-[11px] font-semibold mt-auto ${c.text} group-hover:underline`,children:"View details →"})]})})}const yp=[{id:"overview",label:"Overview"},{id:"value",label:"Value Type"},{id:"options",label:"Options"},{id:"code",label:"Code"},{id:"wire",label:"Wire Format"}];function gp({block:d,onClose:w}){const[c,A]=Te.useState("overview"),N=Mi[d.category];return a.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4",style:{background:"rgba(0, 0, 0, 0.5)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)"},children:a.jsxs("div",{className:"bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden",style:{boxShadow:"0 24px 48px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)"},children:[a.jsxs("div",{className:"flex items-start gap-4 p-5 border-b border-gray-100",children:[a.jsx("div",{className:`w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${N.bg}`,children:d.icon}),a.jsxs("div",{className:"flex-1 min-w-0",children:[a.jsx("h2",{className:"font-bold text-gray-900 text-lg leading-tight",children:d.displayName}),a.jsx("p",{className:"text-primary-600 font-mono text-xs mt-0.5",children:d.controlName})]}),a.jsx("button",{onClick:w,className:"p-2 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors flex-shrink-0",children:a.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:a.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]}),a.jsx("div",{className:"flex border-b border-gray-100 bg-surface-50 overflow-x-auto",children:yp.map(C=>a.jsx("button",{onClick:()=>A(C.id),className:`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${c===C.id?"border-primary-600 text-primary-700 bg-white font-semibold":"border-transparent text-gray-500 hover:text-gray-700"}`,children:C.label},C.id))}),a.jsxs("div",{className:"flex-1 overflow-y-auto p-5",children:[c==="overview"&&a.jsxs("div",{className:"space-y-5",children:[a.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[a.jsx(kr,{label:"Control Name",value:d.controlName,mono:!0}),a.jsx(kr,{label:"Category",value:a.jsx(Ku,{category:d.category,size:"md"})}),a.jsx(kr,{label:"Has Value",value:d.hasValue?"Yes – submits data":"Display / navigation only"}),a.jsx(kr,{label:"Commonly Used",value:d.commonlyUsed?"Yes":"No"}),d.deprecated&&a.jsx(kr,{label:"Status",value:a.jsx("span",{className:"text-red-600 font-semibold",children:"Deprecated"})})]}),d.factory&&a.jsxs("div",{children:[a.jsx("p",{className:"text-xs font-bold uppercase tracking-widest text-gray-400 mb-2",children:"Factory Function(s)"}),a.jsx("div",{className:"space-y-2",children:d.factory.split(" / ").map(C=>a.jsxs("div",{className:"rounded-xl px-4 py-3",style:{background:"rgba(99, 102, 241, 0.04)",border:"1px solid rgba(99, 102, 241, 0.1)"},children:[a.jsxs("p",{className:"font-mono text-sm text-primary-700 font-semibold",children:[C,"(opts)"]}),a.jsxs("p",{className:"text-xs text-gray-500 mt-1",children:["import ","{ ",C," }"," from '@epilot/epilot-journey-sdk'"]})]},C))})]}),a.jsxs("div",{children:[a.jsx("p",{className:"text-xs font-bold uppercase tracking-widest text-gray-400 mb-2",children:"Description"}),a.jsx("p",{className:"text-sm text-gray-600 leading-relaxed bg-surface-50 rounded-xl px-4 py-3",children:d.description})]})]}),c==="value"&&a.jsxs("div",{className:"space-y-3",children:[a.jsxs("p",{className:"text-xs text-gray-400 leading-relaxed",children:["Shape of the value submitted when the user fills this block. Accessible via"," ",a.jsx("code",{className:"bg-gray-100 px-1 rounded text-primary-700 text-[11px]",children:"BlockValueMap[controlName]"}),"."]}),a.jsx(Me,{code:d.valueType,title:"TypeScript",language:"typescript"})]}),c==="options"&&a.jsxs("div",{className:"space-y-3",children:[a.jsxs("p",{className:"text-xs text-gray-400 leading-relaxed",children:["Configuration options passed to ",a.jsx("code",{className:"bg-gray-100 px-1 rounded text-primary-700 text-[11px]",children:"opts.options"})," in the factory function, or in the ",a.jsx("code",{className:"bg-gray-100 px-1 rounded text-primary-700 text-[11px]",children:"uischema.options"})," wire field."]}),a.jsx(Me,{code:d.optionsType,title:"TypeScript",language:"typescript"})]}),c==="code"&&a.jsxs("div",{className:"space-y-3",children:[d.factory?a.jsxs("div",{className:"flex items-start gap-2 rounded-xl px-4 py-2.5 text-xs",style:{background:"rgba(99, 102, 241, 0.05)",border:"1px solid rgba(99, 102, 241, 0.1)",color:"#4f46e5"},children:[a.jsx("span",{children:"→"}),a.jsx("span",{children:"Use the factory function – it produces valid v3 wire format automatically."})]}):a.jsxs("div",{className:"flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-2.5 text-xs text-amber-700",children:[a.jsx("span",{children:"→"}),a.jsxs("span",{children:["No dedicated factory. Use ",a.jsxs("code",{className:"font-mono",children:["createBlock('",d.controlName,"', opts)"]})," directly."]})]}),a.jsx(Me,{code:d.codeExample,title:"Usage Example",language:"typescript"})]}),c==="wire"&&a.jsxs("div",{className:"space-y-3",children:[a.jsxs("div",{className:"flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-2.5 text-xs text-amber-700",children:[a.jsx("span",{children:"→"}),a.jsxs("span",{children:["This is the v3 JSON stored in the Journey API's"," ",a.jsx("code",{className:"font-mono",children:"uischema.elements[]"}),".",d.controlName==="Label"&&" Note: text is at top level, not inside options.",(d.controlName==="Control"||d.controlName==="MultichoiceControl")&&" Note: choices use parallel arrays, not a choices[] object."]})]}),a.jsx(Me,{code:d.wireExample,title:"Wire Format (v3 API)",language:"json"})]})]})]})})}function kr({label:d,value:w,mono:c}){return a.jsxs("div",{className:"flex flex-col gap-1",children:[a.jsx("p",{className:"text-[11px] font-bold uppercase tracking-widest text-gray-400",children:d}),typeof w=="string"?a.jsx("p",{className:`text-sm font-medium text-gray-700 ${c?"font-mono text-primary-700":""}`,children:w}):a.jsx("div",{children:w})]})}function vp(){const[d,w]=Te.useState(""),[c,A]=Te.useState("all"),[N,C]=Te.useState(null),Y=Qt.filter(R=>{const O=c==="all"||R.category===c,J=d.toLowerCase(),he=!J||R.displayName.toLowerCase().includes(J)||R.controlName.toLowerCase().includes(J)||R.description.toLowerCase().includes(J)||R.factory!==null&&R.factory.toLowerCase().includes(J);return O&&he});return a.jsxs("div",{children:[a.jsxs("div",{className:"mb-6",children:[a.jsx("h1",{className:"section-title",children:"Block Catalog"}),a.jsxs("p",{className:"section-desc",children:["All ",Qt.length," block types available in the Journey SDK. Click any block to see its value type, options, code example, and v3 wire format."]})]}),a.jsxs("div",{className:"bg-white border border-gray-100 rounded-2xl p-4 mb-6 flex flex-wrap items-center gap-3",children:[a.jsxs("div",{className:"relative flex-1 min-w-[200px] max-w-xs",children:[a.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm",children:"🔍"}),a.jsx("input",{type:"text",value:d,onChange:R=>w(R.target.value),placeholder:"Search blocks…",className:"input-field pl-8"})]}),a.jsxs("div",{className:"flex flex-wrap gap-1.5",children:[a.jsxs("button",{onClick:()=>A("all"),className:`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${c==="all"?"bg-primary-600 text-white border-primary-600":"bg-white text-gray-500 border-gray-200 hover:border-primary-300 hover:text-primary-600"}`,children:["All (",Qt.length,")"]}),Bi.map(R=>{const O=Qt.filter(J=>J.category===R).length;return a.jsxs("button",{onClick:()=>A(R),className:`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${c===R?"bg-primary-600 text-white border-primary-600":"bg-white text-gray-500 border-gray-200 hover:border-primary-300 hover:text-primary-600"}`,children:[Oi[R]," ",Li[R]," (",O,")"]},R)})]}),a.jsxs("span",{className:"text-xs text-gray-400 ml-auto whitespace-nowrap",children:[Y.length," of ",Qt.length," blocks"]})]}),Y.length===0?a.jsxs("div",{className:"text-center py-20 text-gray-400",children:[a.jsx("div",{className:"text-4xl mb-3",children:"🔍"}),a.jsx("p",{className:"font-semibold text-gray-500",children:"No blocks found"}),a.jsx("p",{className:"text-sm mt-1",children:"Try a different search term or category"})]}):a.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",children:Y.map(R=>a.jsx(hp,{block:R,onClick:C},R.controlName))}),N&&a.jsx(gp,{block:N,onClose:()=>C(null)})]})}function xp(){const[d,w]=Te.useState(Bo[0]),c={"Block Factories":Bo.filter(A=>!["createStep","createJourney","createBlock"].includes(A.name)),"Step & Journey":Bo.filter(A=>["createBlock","createStep","createJourney"].includes(A.name))};return a.jsxs("div",{children:[a.jsxs("div",{className:"mb-8",children:[a.jsx("h1",{className:"section-title",children:"Factory Functions"}),a.jsx("p",{className:"section-desc",children:"Typed factory functions that produce valid v3 API wire format payloads. Always prefer these over raw object construction — they handle format quirks like base64 encoding, parallel arrays, and nested option paths."})]}),a.jsxs("div",{className:"flex gap-6",children:[a.jsx("div",{className:"w-56 flex-shrink-0",children:Object.entries(c).map(([A,N])=>a.jsxs("div",{className:"mb-5",children:[a.jsx("p",{className:"text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 px-1",children:A}),a.jsx("div",{className:"space-y-0.5",children:N.map(C=>a.jsxs("button",{onClick:()=>w(C),className:`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center gap-2 ${d.name===C.name?"bg-primary-50 text-primary-700 font-semibold":"text-gray-500 hover:bg-gray-50 hover:text-gray-700"}`,children:[a.jsx("span",{className:"font-mono truncate",children:C.name}),C.alpha&&a.jsx("span",{className:"flex-shrink-0 text-[9px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 rounded px-1 py-px",children:"alpha"})]},C.name))})]},A))}),a.jsxs("div",{className:"flex-1 min-w-0 space-y-5",children:[a.jsxs("div",{className:"card",children:[a.jsxs("div",{className:"flex items-center gap-2 mb-4 flex-wrap",children:[a.jsx("span",{className:"font-mono text-sm text-primary-700 font-bold",children:d.name}),a.jsx("span",{className:"text-gray-300",children:"→"}),a.jsx("span",{className:"text-xs text-amber-700 font-medium bg-amber-50 border border-amber-100 rounded-md px-2 py-0.5",children:d.producesType}),d.alpha&&a.jsx("span",{className:"text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 rounded-md px-1.5 py-0.5",children:"alpha"})]}),a.jsx("p",{className:"text-sm text-gray-600 mb-4 leading-relaxed",children:d.description}),d.note&&a.jsxs("div",{className:"flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2.5 text-xs text-blue-700 mb-4",children:[a.jsx("span",{children:"ℹ️"}),a.jsx("span",{children:d.note})]}),a.jsx(Me,{code:d.signature,title:"Signature",language:"typescript"})]}),a.jsx(Me,{code:d.example,title:"Example",language:"typescript"})]})]})]})}const qu={journey:"Journey CRUD",block:"Block Operations",step:"Step Operations",factory:"Factory Helpers"},Gu={journey:"🗺️",block:"🧩",step:"📄",factory:"🏭"};function wp(){const[d,w]=Te.useState(Vu[0]),c=["journey","block","step"].map(A=>({group:A,methods:Vu.filter(N=>N.group===A)}));return a.jsxs("div",{children:[a.jsxs("div",{className:"mb-8",children:[a.jsx("h1",{className:"section-title",children:"JourneyClient API"}),a.jsx("p",{className:"section-desc",children:"The headless client wraps the epilot Journey API with block-level operations. Designed for AI assistants and scripts to configure journeys without a UI."})]}),a.jsxs("div",{className:"flex gap-6",children:[a.jsx("div",{className:"w-60 flex-shrink-0",children:c.map(({group:A,methods:N})=>a.jsxs("div",{className:"mb-5",children:[a.jsxs("p",{className:"text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 px-1",children:[Gu[A]," ",qu[A]]}),a.jsx("div",{className:"space-y-0.5",children:N.map(C=>a.jsxs("button",{onClick:()=>w(C),className:`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center gap-2 ${d.name===C.name?"bg-primary-50 text-primary-700 font-semibold":"text-gray-500 hover:bg-gray-50 hover:text-gray-700"}`,children:[a.jsx("span",{className:"font-mono truncate",children:C.name}),C.alpha&&a.jsx("span",{className:"flex-shrink-0 text-[9px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 rounded px-1 py-px",children:"alpha"})]},C.name))})]},A))}),a.jsxs("div",{className:"flex-1 min-w-0 space-y-5",children:[a.jsxs("div",{className:"card",children:[a.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[a.jsx("span",{className:"text-lg",children:Gu[d.group]}),a.jsx("span",{className:"text-[10px] font-bold uppercase tracking-widest text-gray-400",children:qu[d.group]}),d.alpha&&a.jsx("span",{className:"text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 rounded-md px-1.5 py-0.5",children:"alpha"})]}),a.jsx("h2",{className:"font-bold text-gray-900 text-lg mb-2 font-mono",children:d.name}),a.jsx("p",{className:"text-sm text-gray-600 mb-4 leading-relaxed",children:d.description}),a.jsxs("div",{className:"flex items-start gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 text-xs text-emerald-700 mb-4",children:[a.jsx("span",{children:"↩"}),a.jsxs("span",{children:[a.jsx("strong",{children:"Returns:"})," ",d.returns]})]}),a.jsx(Me,{code:d.signature,title:"Signature",language:"typescript"})]}),a.jsx(Me,{code:d.example,title:"Example",language:"typescript"})]})]})]})}const Wu=[{title:"Always use factory functions",explanation:"Factory functions produce valid v3 wire format automatically. Avoid constructing raw UISchemaElement objects unless no factory exists for the block type.",bad:`// Don't: raw object — easy to get wrong
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
})`}],kp=[{field:"scope",note:`Always "#/properties/{blockName}". The blockName is the key in the step's JSON schema properties.`},{field:"options.showPaper",note:"Defaults to false. Set to true for composite blocks (PI, Address, Contact, Payment) that need a card background."},{field:"options.variablePath",note:'Auto-generated by createStep() for stateful blocks. Format: "{stepName}_{blockName}" with non-alphanumeric chars replaced by "_".'},{field:"options.required",note:"Set on individual block options AND propagated to the step's JSON schema required[] array by createStep()."},{field:"id",note:"UUID auto-generated by createBlock(). Required by the renderer for element identity."}];function Sp(){const[d,w]=Te.useState(Wu[0]);return a.jsxs("div",{children:[a.jsxs("div",{className:"mb-8",children:[a.jsxs("div",{className:"inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-xs font-semibold mb-4",children:[a.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"}),"For AI Agents"]}),a.jsx("h1",{className:"section-title",children:"Agent Guide"}),a.jsx("p",{className:"section-desc",children:"Rules, gotchas, and patterns that AI agents must follow when generating journeys with the SDK. Every rule here corresponds to a real failure mode observed in production journeys."})]}),a.jsx("h2",{className:"text-xl font-bold text-gray-900 mb-4",children:"Rules & Gotchas"}),a.jsxs("div",{className:"flex gap-6 mb-14",children:[a.jsx("div",{className:"w-64 flex-shrink-0 space-y-1",children:Wu.map((c,A)=>a.jsxs("button",{onClick:()=>w(c),className:`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all ${d.title===c.title?"bg-primary-50 text-primary-700 font-semibold border border-primary-200":"text-gray-500 hover:bg-gray-50 hover:text-gray-700"}`,children:[a.jsx("span",{className:"text-gray-300 text-xs font-mono mr-2",children:String(A+1).padStart(2,"0")}),c.title]},A))}),a.jsxs("div",{className:"flex-1 min-w-0 space-y-4",children:[a.jsxs("div",{className:"card",children:[a.jsx("h3",{className:"font-bold text-gray-900 text-base mb-2",children:d.title}),a.jsx("p",{className:"text-sm text-gray-600 leading-relaxed",children:d.explanation})]}),d.bad&&a.jsxs("div",{children:[a.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[a.jsx("span",{className:"w-5 h-5 rounded-full bg-red-100 text-red-600 text-xs flex items-center justify-center font-bold",children:"✕"}),a.jsx("span",{className:"text-xs font-bold text-red-600 uppercase tracking-wide",children:"Avoid"})]}),a.jsx(Me,{code:d.bad,language:"typescript"})]}),d.good&&a.jsxs("div",{children:[a.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[a.jsx("span",{className:"w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 text-xs flex items-center justify-center font-bold",children:"✓"}),a.jsx("span",{className:"text-xs font-bold text-emerald-600 uppercase tracking-wide",children:"Do this"})]}),a.jsx(Me,{code:d.good,language:"typescript"})]})]})]}),a.jsx("h2",{className:"text-xl font-bold text-gray-900 mb-1",children:"Wire Format Quick Reference"}),a.jsx("p",{className:"text-sm text-gray-400 mb-5",children:"Key fields in every v3 uischema element and what they mean"}),a.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-3 mb-14",children:kp.map(c=>a.jsxs("div",{className:"bg-white border border-gray-100 rounded-xl p-4",children:[a.jsx("p",{className:"font-mono text-sm text-primary-700 font-semibold mb-1",children:c.field}),a.jsx("p",{className:"text-xs text-gray-500 leading-relaxed",children:c.note})]},c.field))}),a.jsx("h2",{className:"text-xl font-bold text-gray-900 mb-4",children:"Anatomy of a Block (v3 Wire Format)"}),a.jsx(Me,{title:"Every block element shape",language:"json",code:`{
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
}`})]})}const Sr=[{id:"sales-inquiry",name:"Sales Inquiry",icon:"💼",tagline:"Lead capture with plan selection",description:"A 4-step lead generation journey: plan selection → business info → contact capture + GDPR consent → confirmation. Creates an OPPORTUNITY entity on submission.",highlights:["Single-choice with icon buttons for plan selection","Multiple-choice checkbox for module interests","GDPR consent inline on the ActionBar","Summary block before submit for user review","runtimeEntities: OPPORTUNITY for CRM integration"],steps:[{name:"Choose Your Plan",icon:"📋",color:"bg-blue-50 text-blue-700 border-blue-100",blocks:[{fn:"createParagraph()",note:"Intro text (auto-encoded)"},{fn:"createSingleChoice()",note:"Plan selection with icon buttons"},{fn:"createSingleChoice()",note:"Team size selection"},{fn:"createActionBar()",note:"GoNext → step 2"}]},{name:"About Your Business",icon:"🏢",color:"bg-amber-50 text-amber-700 border-amber-100",blocks:[{fn:"createParagraph()",note:"Context text"},{fn:"createTextInput()",note:"Multiline business description"},{fn:"createTextInput()",note:"Use case description"},{fn:"createMultipleChoice()",note:"Module interest (checkbox)"},{fn:"createActionBar()",note:"GoNext → step 3"}]},{name:"Contact Details",icon:"👤",color:"bg-emerald-50 text-emerald-700 border-emerald-100",blocks:[{fn:"createParagraph()",note:"Contact intro"},{fn:"createPersonalInformation()",note:"Business mode, required fields"},{fn:"createTextInput()",note:"Additional notes (optional)"},{fn:"createSummary()",note:"Review all collected data"},{fn:"createActionBar()",note:"SubmitAndGoNext with GDPR consent"}]},{name:"Confirmation",icon:"🎉",color:"bg-purple-50 text-purple-700 border-purple-100",blocks:[{fn:"createSuccessMessage()",note:"Thank-you with close button"}]}],source:`/**
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
console.log('Journey created:', created.journeyId)`}];function Cp({step:d}){return a.jsxs("div",{className:"bg-white border rounded-2xl overflow-hidden shadow-sm",children:[a.jsxs("div",{className:`px-4 py-3 flex items-center gap-2 border-b ${d.color} border-opacity-50`,children:[a.jsx("span",{className:"text-lg",children:d.icon}),a.jsx("p",{className:"font-bold text-sm",children:d.name})]}),a.jsx("div",{className:"p-3 space-y-2",children:d.blocks.map((w,c)=>a.jsxs("div",{className:"text-xs",children:[a.jsx("p",{className:"font-mono text-primary-600 font-semibold",children:w.fn}),a.jsx("p",{className:"text-gray-400 mt-0.5",children:w.note})]},c))})]})}function Np({example:d}){return a.jsxs("div",{children:[a.jsxs("div",{className:"mb-8",children:[a.jsxs("div",{className:"flex items-center gap-3 mb-3",children:[a.jsx("span",{className:"text-3xl",children:d.icon}),a.jsxs("div",{children:[a.jsx("h2",{className:"text-xl font-bold text-gray-900",children:d.name}),a.jsx("p",{className:"text-sm text-gray-400",children:d.tagline})]})]}),a.jsx("p",{className:"text-sm text-gray-600 leading-relaxed max-w-3xl",children:d.description})]}),a.jsxs("div",{className:"mb-8",children:[a.jsx("h3",{className:"text-sm font-bold text-gray-700 uppercase tracking-wider mb-3",children:"Key Patterns"}),a.jsx("div",{className:"flex flex-wrap gap-2",children:d.highlights.map(w=>a.jsx("span",{className:"inline-flex items-center px-2.5 py-1 rounded-lg bg-primary-50 border border-primary-100 text-xs text-primary-700 font-medium",children:w},w))})]}),a.jsx("h3",{className:"text-sm font-bold text-gray-700 uppercase tracking-wider mb-3",children:"Step Breakdown"}),a.jsx("div",{className:`grid grid-cols-1 gap-4 mb-10 ${d.steps.length<=4?"md:grid-cols-2 lg:grid-cols-4":d.steps.length<=6?"md:grid-cols-2 lg:grid-cols-3":"md:grid-cols-2 lg:grid-cols-4"}`,children:d.steps.map(w=>a.jsx(Cp,{step:w},w.name))}),a.jsx("h3",{className:"text-sm font-bold text-gray-700 uppercase tracking-wider mb-2",children:"Full Source"}),a.jsx(Me,{code:d.source,title:`${d.id}.ts`,language:"typescript"})]})}function bp(){const[d,w]=Te.useState(Sr[0].id),c=Sr.find(A=>A.id===d)??Sr[0];return a.jsxs("div",{children:[a.jsxs("div",{className:"mb-8",children:[a.jsxs("div",{className:"inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-xs font-semibold mb-4",children:[a.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"}),Sr.length," End-to-End Examples"]}),a.jsx("h1",{className:"section-title",children:"Example Journeys"}),a.jsx("p",{className:"section-desc",children:"Complete journey scripts built with the SDK factory functions. Each example is a runnable script that creates a real journey via the API."})]}),a.jsx("div",{className:"flex flex-wrap gap-2 mb-8",children:Sr.map(A=>a.jsxs("button",{onClick:()=>w(A.id),className:`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${d===A.id?"bg-primary-600 text-white shadow-md shadow-primary-200":"bg-white text-gray-600 border border-gray-200 hover:border-primary-200 hover:text-primary-700"}`,children:[a.jsx("span",{children:A.icon}),a.jsx("span",{children:A.name})]},A.id))}),a.jsx(Np,{example:c})]})}const Ep={overview:Yu,catalog:vp,factories:xp,"client-api":wp,"agent-guide":Sp,"example-journey":bp},Pp=lp($u),Ju=()=>window.matchMedia("(max-width: 767px)").matches;function jp(){const[d,w]=Te.useState("overview"),[c,A]=Te.useState(()=>!Ju());Te.useEffect(()=>{const R=window.matchMedia("(max-width: 767px)"),O=J=>{J.matches&&A(!1)};return R.addEventListener("change",O),()=>R.removeEventListener("change",O)},[]);const N=Te.useCallback(R=>{w(R),Ju()&&A(!1)},[]),C=Pp.find(R=>R.id===d),Y=Ep[d]??Yu;return a.jsxs("div",{className:"flex h-screen overflow-hidden bg-surface-50",children:[a.jsxs("aside",{className:`ai-sidebar ${c?"w-72":"w-0 overflow-hidden"} flex-shrink-0 flex flex-col transition-all duration-300`,children:[a.jsxs("div",{className:"sb-brand",children:[a.jsxs("div",{className:"flex items-center gap-3",children:[a.jsx("div",{className:"sb-logo",children:a.jsx("svg",{className:"w-5 h-5 text-white",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:a.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"})})}),a.jsxs("div",{children:[a.jsx("div",{className:"sb-title",children:"Journey SDK"}),a.jsxs("div",{className:"sb-subtitle",children:["Agentic Ready",a.jsx("span",{className:"sb-cursor"})]})]})]}),a.jsxs("a",{href:"https://docs.epilot.io/docs/journeys/journey-builder",className:"flex items-center gap-1.5 text-[11px] hover:text-primary-400 transition-colors mt-3 group",style:{color:"rgba(255,255,255,0.35)"},children:[a.jsx("svg",{className:"w-3.5 h-3.5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:a.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M10 19l-7-7m0 0l7-7m-7 7h18"})}),a.jsx("span",{className:"group-hover:underline",children:"Back to Dev Center"})]}),a.jsxs("div",{className:"flex items-center gap-2 mt-2",children:[a.jsxs("span",{className:"sb-chip",children:[a.jsx("strong",{children:Qt.length})," Blocks"]}),a.jsxs("span",{className:"sb-chip",children:[a.jsx("strong",{children:"19"})," Factories"]})]})]}),a.jsx("nav",{className:"flex-1 overflow-y-auto py-3 px-3",children:$u.map(R=>Qu(R)?a.jsxs("div",{className:"mt-5 first:mt-0",children:[a.jsx("div",{className:"sb-group",children:R.group}),a.jsx("div",{className:"space-y-0.5",children:R.items.map(O=>a.jsxs("button",{onClick:()=>N(O.id),className:`sb-nav-item ${d===O.id?"active":""}`,children:[a.jsx("span",{className:"sb-dot"}),a.jsx("span",{className:"sb-nav-icon",children:O.icon}),a.jsx("span",{children:O.label})]},O.id))})]},R.group):a.jsxs("button",{onClick:()=>N(R.id),className:`sb-nav-item ${d===R.id?"active":""}`,children:[a.jsx("span",{className:"sb-dot"}),a.jsx("span",{className:"sb-nav-icon",children:R.icon}),a.jsx("span",{children:R.label})]},R.id))}),a.jsxs("div",{className:"sb-footer",children:[a.jsxs("div",{className:"sb-status-line",children:[a.jsx("span",{className:"agent-dot"}),a.jsx("span",{className:"sb-version",children:"v1.0.7"}),a.jsx("span",{style:{opacity:.5},children:"ready"})]}),a.jsxs("div",{className:"sb-credit",children:["Built by"," ",a.jsx("a",{href:"https://github.com/jpinho",target:"_blank",rel:"noopener noreferrer",children:"@jpinho"})]})]})]}),a.jsxs("main",{className:"flex-1 overflow-y-auto bg-grid-pattern bg-grid",children:[a.jsxs("div",{className:"topbar",children:[a.jsx("button",{onClick:()=>A(!c),className:"p-2 rounded-xl hover:bg-gray-100 text-gray-400 transition-colors",children:a.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:a.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 6h16M4 12h16M4 18h16"})})}),a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx("span",{className:"text-lg",children:C==null?void 0:C.icon}),a.jsx("h2",{className:"text-sm font-bold text-gray-700",children:C==null?void 0:C.label})]}),a.jsxs("div",{className:"ml-auto hidden md:flex items-center gap-2.5",children:[a.jsxs("div",{className:"flex items-center gap-1.5 text-[11px] text-gray-400",children:[a.jsx("span",{className:"agent-dot"}),a.jsx("span",{children:"AI-ready SDK"})]}),a.jsx("a",{href:"https://github.com/epilot-dev/epilot-journey-sdk",target:"_blank",rel:"noopener noreferrer",className:"p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors",children:a.jsx("svg",{className:"w-4 h-4",fill:"currentColor",viewBox:"0 0 24 24",children:a.jsx("path",{d:"M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"})})})]})]}),a.jsx("div",{className:"p-8 max-w-7xl mx-auto",children:a.jsx(Y,{onNavigate:N})})]})]})}op.createRoot(document.getElementById("root")).render(a.jsx(Kd.StrictMode,{children:a.jsx(jp,{})}));
