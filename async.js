self.uhooksFX=function(e){"use strict";var t=Promise;let n=null,s=new Set;const a=new WeakMap,c=e=>{const{$:t,r:n,h:s}=e;p(n)&&(l.get(s).delete(e),n()),p(e.r=t())&&l.get(s).add(e)},u=()=>{const e=s;s=new Set,e.forEach((({h:e,c:t,a:n,e:s})=>{s&&e.apply(t,n)}))},l=new WeakMap,o=[],r=[];function h(e,t){return e!==this[t]}const i=()=>a.get(n),p=e=>"function"==typeof e,f=e=>{const t={h:s,c:null,a:null,e:0,i:0,s:[]};return a.set(s,t),s;function s(){const a=n;n=s,t.e=t.i=0;try{return e.apply(t.c=this,t.a=arguments)}finally{n=a,o.length&&d.then(o.forEach.bind(o.splice(0),c)),r.length&&r.splice(0).forEach(c)}}},d=new t((e=>e()));function y(e){const{_:t,value:n}=this;n!==e&&(this._=new Set,this.value=e,t.forEach((({h:e,c:t,a:n})=>{e.apply(t,n)})))}const w=(e,t)=>{const n=i(),{i:s,s:a}=n;return s!==a.length&&t&&!t.some(h,a[s]._)||(a[s]={$:e(),_:t}),a[n.i++].$},g=e=>(t,n)=>{const s=i(),{i:a,s:c,h:u}=s,o=a===c.length;s.i++,o&&(l.has(u)||l.set(u,new Set),c[a]={$:t,_:n,r:null,h:u}),(o||!n||n.some(h,c[a]._))&&e.push(c[a]),c[a].$=t,c[a]._=n},_=g(o),v=g(r),E=(e,t)=>p(t)?t(e):t,$=(e,t,n)=>{const a=i(),{i:c,s:l}=a;c===l.length&&l.push({$:p(n)?n(t):E(void 0,t),set:t=>{l[c].$=e(l[c].$,t),(e=>{s.has(e)||(e.e=1,s.add(e),d.then(u))})(a)}});const{$:o,set:r}=l[a.i++];return[o,r]},k=new WeakMap,M=e=>{const t=f(e);return k.set(n,t),n;async function n(){return await t.apply(this,arguments)}};
/*! (c) Andrea Giammarchi - ISC */
let S=null,W=null,m=null;const b=new WeakMap,C=new WeakMap,x=(e,t,n,s)=>{const a=a=>{b.has(e)||(b.set(e,0),d.then((()=>{b.delete(e),e.apply(t,n)}))),s(a)};return C.set(s,a),a},P=(e,t,n,s)=>e?[s[0],C.get(s[1])||x(e,t,n,s[1])]:s;return e.createContext=e=>({_:new Set,provide:y,value:e}),e.dropEffect=e=>(e=>{const t=l.get(e);t&&d.then((()=>{t.forEach((e=>{e.r(),e.r=null})),t.clear()}))})(k.get(e)),e.hasEffect=e=>(e=>l.has(e))(k.get(e)),e.hooked=(e,t)=>M(t?async function t(){const[n,s,a]=[S,W,m];[S,W,m]=[t,this,arguments];try{return await e.apply(W,m)}finally{[S,W,m]=[n,s,a]}}:e),e.useCallback=(e,t)=>w((()=>e),t),e.useContext=({_:e,value:t})=>(e.add(i()),t),e.useEffect=_,e.useLayoutEffect=v,e.useMemo=w,e.useReducer=(e,t,n)=>P(S,W,m,$(e,t,n)),e.useRef=e=>{const t=i(),{i:n,s:s}=t;return n===s.length&&s.push({current:e}),s[t.i++]},e.useState=e=>P(S,W,m,(e=>$(E,e))(e)),e.wait=d,e}({});