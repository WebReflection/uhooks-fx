self.uhooksFX=function(e){"use strict";var t=Promise;let n=null,s=new Set;const a=new WeakMap,c=e=>{const{$:t,r:n,h:s}=e;f(n)&&(o.get(s).delete(e),n()),f(e.r=t())&&o.get(s).add(e)},l=()=>{const e=s;s=new Set,e.forEach((({h:e,c:t,a:n,e:s})=>{s&&e.apply(t,n)}))},o=new WeakMap,u=[],r=[];function h(e,t){return e!==this[t]}const i=()=>a.get(n),f=e=>"function"==typeof e,p=e=>{const t={h:s,c:null,a:null,e:0,i:0,s:[]};return a.set(s,t),s;function s(){const a=n;n=s,t.e=t.i=0;try{return e.apply(t.c=this,t.a=arguments)}finally{n=a,u.length&&d.then(u.forEach.bind(u.splice(0),c)),r.length&&r.splice(0).forEach(c)}}},d=new t((e=>e()));function y(e){const{_:t,value:n}=this;n!==e&&(this._=new Set,this.value=e,t.forEach((({h:e,c:t,a:n})=>{e.apply(t,n)})))}const g=(e,t)=>{const n=i(),{i:s,s:a}=n;return s!==a.length&&t&&!t.some(h,a[s]._)||(a[s]={$:e(),_:t}),a[n.i++].$},w=e=>(t,n)=>{const s=i(),{i:a,s:c,h:l}=s,u=a===c.length;s.i++,u&&(o.has(l)||o.set(l,new Set),c[a]={$:t,_:n,r:null,h:l}),(u||!n||n.some(h,c[a]._))&&e.push(c[a]),c[a].$=t,c[a]._=n},_=w(u),v=w(r),E=(e,t)=>f(t)?t(e):t,$=(e,t,n)=>{const a=i(),{i:c,s:o}=a;c===o.length&&o.push({$:f(n)?n(t):E(void 0,t),set:t=>{o[c].$=e(o[c].$,t),(e=>{s.has(e)||(e.e=1,s.add(e),d.then(l))})(a)}});const{$:u,set:r}=o[a.i++];return[u,r]};
/*! (c) Andrea Giammarchi - ISC */
let k=null,M=null,S=null;const m=new WeakMap,W=new WeakMap,b=(e,t,n,s)=>{const a=a=>{m.has(e)||(m.set(e,0),d.then((()=>{m.delete(e),e.apply(t,n)}))),s(a)};return W.set(s,a),a},C=(e,t,n,s)=>e?[s[0],W.get(s[1])||b(e,t,n,s[1])]:s;return e.createContext=e=>({_:new Set,provide:y,value:e}),e.dropEffect=e=>{const t=o.get(e);t&&d.then((()=>{t.forEach((e=>{e.r(),e.r=null})),t.clear()}))},e.hasEffect=e=>o.has(e),e.hooked=(e,t)=>{const n=p(t?function(){const[t,s,a]=[k,M,S];[k,M,S]=[n,this,arguments];try{return e.apply(M,S)}finally{[k,M,S]=[t,s,a]}}:e);return n},e.useCallback=(e,t)=>g((()=>e),t),e.useContext=({_:e,value:t})=>(e.add(i()),t),e.useEffect=_,e.useLayoutEffect=v,e.useMemo=g,e.useReducer=(e,t,n)=>C(k,M,S,$(e,t,n)),e.useRef=e=>{const t=i(),{i:n,s:s}=t;return n===s.length&&s.push({current:e}),s[t.i++]},e.useState=e=>C(k,M,S,(e=>$(E,e))(e)),e.wait=d,e}({});
