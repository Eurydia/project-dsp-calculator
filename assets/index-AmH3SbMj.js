import{r as j,j as e}from"./react-c7x3VyAv.js";import{c as Ie}from"./react-dom-nwdlp_2f.js";import{c as Re,a as Pe,T as Ce,M as ue,L as g,b as C,I as pe,S as M,D as ve,u as Te,d as Ne,P as T,G as w,B as Fe,e as z,f as B,E as we,g as Le,C as Ae,h as b,R as D,i as he,j as xe,k as me,l as L,m as f,n as je,o as H,A as ye,p as q,q as S,F as V,r as Ee,s as ke,t as J,U as $e,v as Q,w as ze,x as Be,y as We,z as De,H as qe}from"./@mui-ESgC0MI8.js";import{f as Z,F as Ve}from"./facility.mts-9F1cMPI5.js";import{r as K,a as ee}from"./recipes-vJH84A5G.js";import{p as te,P as fe,a as ge}from"./proliferator.mts-9Q72QBkP.js";import{i as A}from"./ingredient.mts-X1CMNI85.js";import{s as Je}from"./sorter.mts-RHRkJXms.js";import{G as _e}from"./index.mts-A8Z50Fi-.js";/* empty css                    */import"./hoist-non-react-statics-bbVbV8Pa.js";import"./scheduler-jfnXNWZW.js";import"./prop-types-pmxPFTpu.js";import"./react-is-D0-Nh74l.js";import"./@babel-R4VyUtW_.js";import"./@emotion-KQWZ46Z_.js";import"./stylis-UTZzoVRx.js";import"./clsx-Zbgk8kpT.js";import"./react-transition-group-qcJNKqm1.js";import"./@popperjs-v-la0Vhf.js";(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const p of a.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&l(p)}).observe(document,{childList:!0,subtree:!0});function i(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(n){if(n.ep)return;n.ep=!0;const a=i(n);fetch(n.href,a)}})();const Ge=Re({components:{MuiTypography:{styleOverrides:{root:{userSelect:"none","&.MuiTypography-h1":{fontSize:"1.4rem",fontWeight:"500",color:"#C8AA81"},"&.MuiTypography-h2":{fontSize:"1.2rem",fontWeight:"400",color:"#C8AA81"},"&.MuiTypography-subtitle1":{fontSize:"0.9rem"}}}},MuiTableCell:{styleOverrides:{root:{"&.MuiTableCell-head":{color:"#C8AA81"}}}},MuiList:{styleOverrides:{root:{"&.MuiList-subheader":{color:"#C8AA81"}}}},MuiListItemIcon:{styleOverrides:{root:{color:"#CEB697"}}},MuiIconButton:{styleOverrides:{root:{color:"#7ABBAD"}}},MuiListItemText:{styleOverrides:{root:({theme:s})=>({color:s.palette.text.primary})}}},palette:{mode:"dark",text:{primary:Pe("#fff",.87)},primary:{main:"#7ABBAD"},background:{paper:"#181D22"}}}),re=s=>{const{showIcon:c,sortOptions:i,label:l,value:n,onValueChange:a,options:p,disabledOptions:y}=s,d=j.useMemo(()=>i?p.sort():p,[p,i]),m=j.useMemo(()=>i?y.sort():y,[y,i]);return e.jsxs(Ce,{select:!0,fullWidth:!0,label:l,value:n,onChange:r=>a(r.target.value),SelectProps:{SelectDisplayProps:{style:{display:"flex",alignItems:"center"}}},children:[d.filter(r=>!m.includes(r)).map(r=>e.jsxs(ue,{value:r,children:[c?e.jsx(g,{children:e.jsx("img",{loading:"lazy",width:"auto",height:"40px",src:A(r)})}):e.jsx(j.Fragment,{}),e.jsx(C,{children:r})]},r)),m.map(r=>e.jsx(ue,{disabled:!0,value:r,children:r},r))]})},_=s=>{const{disabled:c,maxLength:i,prefix:l,suffix:n,label:a,value:p,onChange:y}=s,d=m=>{const r=m.target.value.slice(0,i).normalize();y(r)};return e.jsx(Ce,{fullWidth:!0,disabled:c,label:a,value:p,onChange:d,InputProps:{startAdornment:e.jsx(pe,{position:"start",children:e.jsxs(M,{direction:"row",alignItems:"center",justifyContent:"center",spacing:1,children:[l,e.jsx(ve,{flexItem:!0,orientation:"vertical"})]})}),endAdornment:e.jsx(pe,{position:"end",children:n})}})},k=(s,c,i)=>{const l=Number.parseInt(s);return Number.isNaN(l)?c:l>i?i:l<c?c:l},W=s=>s.reduce((c,i)=>c+i,0),O=s=>Number.parseFloat(s.toPrecision(6)).toLocaleString(),ne=(s,c,i)=>{const l=localStorage.getItem(s);if(l===null)return i;try{return c(JSON.parse(l))}catch{return i}},Ue=s=>s===12?"Proliferator Mk.I":s===24?"Proliferator Mk.II":s===60?"Proliferator Mk.III":"None",Ye=(s,c,i,l,n,a)=>{const p=Object.fromEntries(Object.entries(l).filter(([u,P])=>{const F=Number.parseInt(P);return!Number.isNaN(F)&&F!==0}).map(([u,P])=>{const F=Number.parseInt(P);return[u,F]})),y=60/s*c,d=Object.entries(n).filter(([u])=>p[u]!==void 0);let m=0;d.length>0&&(m=Math.min(...d.map(([u,P])=>p[u]/(P*y))));const r=Object.entries(a).filter(([u])=>p[u]!==void 0);let R=0;return r.length>0&&(R=Math.min(...r.map(([u,P])=>p[u]/(P*y*i)))),m>0&&R===0?m:R>0&&m===0?R:Math.min(m,R)},Xe=(s,c,i,l,n)=>{const a=Object.fromEntries(Object.entries(n).map(([d,m])=>{let r=Number.parseInt(m);return Number.isNaN(r)&&(r=0),[d,r]}));if(Object.values(a).every(d=>d===0))return 0;const p=60/s*c;return Math.max(...Object.entries(l).map(([d,m])=>{const r=m*p*i;return a[d]/r}))},Se=s=>{const c=Object.fromEntries(Object.entries(s).map(([l,n])=>{let a=Number.parseInt(n);return Number.isNaN(a)&&(a=0),[l,a]}));return W(Object.entries(c).map(([l,n])=>Je(l).idleConsumptionMW*n))},He=(s,c)=>{const i=Se(c);return s+i},Qe=(s,c,i)=>{const l=Se(i);return s*c+l},Ze=(s,c,i,l,n,a,p)=>{const y=60/s*c,d=Object.fromEntries(Object.entries(l).map(([r,R])=>[r,R*y])),m=Number.parseInt(p);return!Number.isNaN(m)&&m>0&&(d[`${a} (materials)`]=W(Object.values(l).map(r=>y*r))/m,d[`${a} (products)`]=W(Object.values(n).map(r=>y*r*i))/m),d},Ke=(s,c,i,l)=>{const n=60/s*c;return Object.fromEntries(Object.entries(l).map(([p,y])=>[p,y*n*i]))},et=s=>{const{slotSide:c,children:i,slotMain:l}=s;return e.jsxs(M,{padding:2,spacing:2,children:[e.jsx(T,{square:!0,elevation:1,sx:{padding:2},children:c}),l,j.Children.toArray(i).map((n,a)=>e.jsx(T,{square:!0,elevation:2,sx:{padding:2},children:n},`main-col-item-${a}`))]})},tt=s=>{const{children:c,slotMain:i,slotSide:l}=s;return e.jsxs(w,{container:!0,columns:10,children:[e.jsx(w,{item:!0,md:!0,children:e.jsx(Fe,{padding:4,sx:{height:"100vh",overflowY:"auto",scrollbarWidth:"thin"},children:e.jsxs(w,{container:!0,spacing:2,children:[e.jsx(w,{item:!0,md:12,children:i}),[0,1].map(n=>e.jsx(w,{item:!0,md:6,children:e.jsx(M,{spacing:2,children:j.Children.toArray(c).filter((a,p)=>p%2===n).map((a,p)=>e.jsx(T,{square:!0,elevation:2,sx:{padding:2},children:a},`main-col-${n}-item-${p}`))})},`col-${n}`))]})})}),e.jsx(w,{item:!0,md:3,children:e.jsx(T,{square:!0,elevation:1,sx:{height:"100vh",overflowY:"auto",scrollbarWidth:"thin",padding:2},children:l})})]})},rt=s=>{const{slotSide:c,slotMain:i,children:l}=s,n=Te(),a=Ne(n.breakpoints.down("md"));return e.jsxs(j.Fragment,{children:[e.jsx(T,{square:!0,elevation:0,sx:{display:a?"block":"none"},children:e.jsx(et,{children:l,slotMain:i,slotSide:c})}),e.jsx(T,{square:!0,elevation:0,sx:{display:a?"none":"block"},children:e.jsx(tt,{children:l,slotMain:i,slotSide:c})})]})},nt=(s,c)=>{const[i,l]=j.useState(()=>{const n=localStorage.getItem(c);if(n===null)return s;try{return JSON.parse(n)}catch{return s}});return j.useEffect(()=>{localStorage.setItem(c,JSON.stringify(i))},[c,i]),{content:i,setContent:l}},se=(s,c)=>{const[i,l]=j.useState(()=>{const n=localStorage.getItem(c);if(n===null)return s;try{return JSON.parse(n)}catch{return s}});return j.useEffect(()=>{localStorage.setItem(c,JSON.stringify(i))},[i,c]),{content:i,setContent:l}},$=s=>{const{title:c,children:i}=s,[l,n]=j.useState(!1),a=()=>{n(!l)};return e.jsxs(j.Fragment,{children:[e.jsxs(M,{direction:"row",alignItems:"center",justifyContent:"space-between",children:[c,e.jsx(z,{describeChild:!0,title:l?"Expand":"Collapse",children:e.jsx(B,{onClick:a,children:l?e.jsx(we,{}):e.jsx(Le,{})})})]}),e.jsx(Ae,{in:!l,children:i})]})},st=()=>{const{content:s,setContent:c}=se({"Sorter Mk.I":"0","Sorter Mk.II":"0","Sorter Mk.III":"0","Pile Sorter":"0"},"sorters"),{content:i,setContent:l}=se({},"flowrates"),{content:n,setContent:a}=se({},"desiredProduction"),{content:p,setContent:y}=nt("0","sprayCount"),[d,m]=j.useState(ne("activeFacility",Z,Z("Arc Smelter"))),[r,R]=j.useState(ne("activeRecipe",K,K("Copper Ingot"))),[u,P]=j.useState(ne("activeProlif",te,te("None"))),F=t=>{const o=Z(t);if(m(o),localStorage.setItem("activeFacility",JSON.stringify(o.label)),r.recipeType===o.recipeType)return;let x="Uh oh";const h=Object.values(ee).filter(({recipeType:I})=>I===o.recipeType).map(({label:I})=>I);h.length>0&&(x=h[0]),ie(x)},ie=t=>{const o=K(t);o.speedupOnly&&u.mode===ge.EXTRA_PRODUCTS&&oe("None"),R(o),localStorage.setItem("activeRecipe",JSON.stringify(o.label)),a(x=>{const h={};for(const I of Object.keys(o.productRecord))h[I]=x[I]??"0";return h}),l(()=>{const x={};for(const h of Object.keys(o.materialRecord))x[h]="360";for(const h of Object.keys(o.productRecord))x[h]="360";return x})},oe=t=>{const o=te(t);y(o.sprayCount.toString()),P(o),localStorage.setItem("activeProlif",JSON.stringify(o.label))},ce=(t,o)=>{a(x=>{const h={...x};return o===""?(h[t]="",h):(h[t]=k(o,0,1e7).toString(),h)})},le=(t,o)=>{l(x=>{const h={...x};if(o==="")return h[t]="",h;const I=d.connectionCount*7200,E=W(Object.entries(x).filter(([X])=>X!==t).map(([,X])=>k(X,360,I)));return h[t]=k(o,0,I-E).toString(),h})},ae=(t,o)=>{c(x=>{const h={...x};if(o==="")return h[t]="",h;const I=W(Object.entries(x).filter(([E])=>E!==t).map(([,E])=>k(E,0,d.connectionCount)));return h[t]=k(o,0,d.connectionCount-I).toString(),h})},de=Ue(u.sprayCount),N=j.useMemo(()=>Xe(r.cycleTimeSecond,d.cycleMultiplier*u.cycleMultiplier,u.productMultiplier,r.productRecord,n),[r.cycleTimeSecond,d.cycleMultiplier,u.cycleMultiplier,u.productMultiplier,r.productRecord,n]),v=j.useMemo(()=>Ye(r.cycleTimeSecond,d.cycleMultiplier*u.cycleMultiplier,u.productMultiplier,i,r.materialRecord,r.productRecord),[r.cycleTimeSecond,d.cycleMultiplier,u.cycleMultiplier,u.productMultiplier,i,r.materialRecord,r.productRecord]),be=j.useMemo(()=>Ze(r.cycleTimeSecond,u.cycleMultiplier*d.cycleMultiplier,u.productMultiplier,r.materialRecord,r.productRecord,de,p),[r.cycleTimeSecond,u.cycleMultiplier,d.cycleMultiplier,u.productMultiplier,r.materialRecord,r.productRecord,de,p]),Me=j.useMemo(()=>Ke(r.cycleTimeSecond,u.cycleMultiplier*d.cycleMultiplier,u.productMultiplier,r.productRecord),[r.cycleTimeSecond,u.cycleMultiplier,d.cycleMultiplier,u.productMultiplier,r.productRecord]);let G=0;v>0&&(G=Math.floor(N/v));const Oe=N-G*v,U=Qe(d.workConsumptionMW,u.workConsumptionMultiplier,s),Y=He(d.idleConsumptionMW,s);return e.jsxs(rt,{slotSide:e.jsxs(M,{spacing:2,children:[e.jsx(b,{variant:"h1",children:"Configuration"}),e.jsxs(b,{variant:"subtitle1",component:"p",children:["DSP version: ",_e]}),e.jsx($,{title:e.jsx(b,{variant:"h2",children:"Manufacturing"}),children:e.jsxs(M,{spacing:2,children:[e.jsx(re,{showIcon:!0,sortOptions:!0,label:"Facility",value:d.label,onValueChange:F,options:Object.keys(Ve),disabledOptions:[]}),e.jsx(re,{showIcon:!0,sortOptions:!0,label:"Recipe",value:r.label,onValueChange:ie,options:Object.keys(ee),disabledOptions:Object.values(ee).filter(t=>t.recipeType!==d.recipeType).map(t=>t.label)})]})}),e.jsx($,{title:e.jsx(b,{variant:"h2",children:"Production target"}),children:e.jsxs(M,{spacing:2,children:[e.jsx(b,{variant:"subtitle1",component:"p",children:"Copnfigure production targets."}),Object.entries(n).map(([t,o])=>e.jsxs(M,{spacing:2,direction:"row",alignItems:"center",justifyContent:"left",children:[e.jsx(_,{prefix:e.jsx("img",{loading:"lazy",width:"auto",height:"40px",src:A(t)}),label:t,maxLength:8,suffix:"/min",value:o,onChange:x=>ce(t,x)}),e.jsx(z,{describeChild:!0,title:"Reset",children:e.jsx(B,{disabled:o==="0",onClick:()=>ce(t,"0"),children:e.jsx(D,{})})})]},t))]})}),e.jsx($,{title:e.jsx(b,{variant:"h2",children:"Transport capacity"}),children:e.jsxs(M,{spacing:2,children:[e.jsx(b,{variant:"subtitle1",component:"p",children:"Configure transport capacities."}),Object.entries(i).map(([t,o])=>e.jsxs(M,{spacing:2,direction:"row",alignItems:"center",justifyContent:"left",children:[e.jsx(_,{prefix:e.jsx("img",{loading:"lazy",width:"auto",height:"40px",src:A(t)}),label:t,maxLength:8,suffix:"/min",value:o,onChange:x=>le(t,x)}),e.jsx(z,{describeChild:!0,title:"Reset",children:e.jsx(B,{disabled:o==="360",onClick:()=>le(t,"360"),children:e.jsx(D,{})})})]},t))]})}),e.jsx($,{title:e.jsx(b,{variant:"h2",children:"Proliferation"}),children:e.jsxs(M,{spacing:2,children:[e.jsx(b,{variant:"subtitle1",component:"p",children:"Configure prolifetor bonus and number of sprays."}),e.jsx(re,{label:"Proliferator",value:u.label,onValueChange:oe,options:Object.keys(fe),disabledOptions:Object.values(fe).filter(t=>r.speedupOnly&&t.mode===ge.EXTRA_PRODUCTS).map(t=>t.label)}),e.jsxs(M,{spacing:2,direction:"row",alignItems:"center",justifyContent:"left",children:[e.jsx(_,{disabled:u.sprayCount<=0,maxLength:9,suffix:"sprays",label:"Uses",value:p,onChange:y}),e.jsx(z,{describeChild:!0,title:"Reset",children:e.jsx(B,{disabled:u.sprayCount<=0||u.sprayCount.toString()===p,onClick:()=>y(u.sprayCount.toString()),children:e.jsx(D,{})})})]})]})}),e.jsx($,{title:e.jsx(b,{variant:"h2",children:"Sorter connections"}),children:e.jsxs(M,{spacing:2,children:[e.jsx(b,{variant:"subtitle1",component:"p",children:"Only affect power consumption."}),Object.entries(s).map(([t,o])=>e.jsxs(M,{spacing:2,direction:"row",alignItems:"center",justifyContent:"left",children:[e.jsx(_,{prefix:e.jsx("img",{loading:"lazy",width:"auto",height:"40px",alt:t,src:A(t)}),label:t,maxLength:6,suffix:`/${d.connectionCount}`,value:o,onChange:x=>ae(t,x)}),e.jsx(z,{describeChild:!0,title:"Reset",children:e.jsx(B,{disabled:o==="0",onClick:()=>ae(t,"0"),children:e.jsx(D,{})})})]},t))]})})]}),slotMain:e.jsxs(M,{spacing:2,children:[e.jsx(T,{square:!0,elevation:2,sx:{padding:2},children:e.jsx(he,{children:e.jsxs(xe,{children:[e.jsx(me,{children:e.jsxs(L,{children:[e.jsx(f,{colSpan:1}),e.jsx(f,{colSpan:2,children:"Item (per minute)"}),e.jsx(f,{colSpan:1,align:"right",children:"Total"}),e.jsx(f,{colSpan:1,align:"right",children:"Per Array"}),e.jsx(f,{colSpan:1,align:"right",children:"Per Facility"})]})}),e.jsxs(je,{children:[Object.entries(be).map(([t,o])=>e.jsxs(L,{children:[e.jsx(f,{colSpan:1,children:e.jsx("img",{loading:"lazy",width:"auto",height:"40px",alt:t,src:A(t.replace(" (materials)","").replace(" (products)",""))})}),e.jsx(f,{colSpan:2,children:t}),[o*N,o*v,o].map((x,h)=>e.jsx(f,{colSpan:1,children:e.jsxs(b,{display:"flex",alignItems:"center",justifyContent:"flex-end",fontSize:"inherit",children:[e.jsx(H,{fontSize:"inherit"}),O(x)]})},`demand-${h}`))]},t)),Object.entries(Me).map(([t,o])=>e.jsxs(L,{children:[e.jsx(f,{colSpan:1,children:e.jsx("img",{loading:"lazy",width:"auto",height:"40px",alt:t,src:A(t)})}),e.jsx(f,{colSpan:2,children:t}),[o*N,o*v,o].map((x,h)=>e.jsx(f,{colSpan:1,children:e.jsxs(b,{display:"flex",alignItems:"center",justifyContent:"flex-end",fontSize:"inherit",children:[e.jsx(ye,{fontSize:"inherit"}),O(x)]})},`supply-${h}`))]},t))]})]})})}),e.jsx(T,{square:!0,elevation:2,sx:{padding:2},children:e.jsx(he,{children:e.jsxs(xe,{children:[e.jsx(me,{children:e.jsxs(L,{children:[e.jsx(f,{colSpan:3,children:"Power consumption (MW)"}),e.jsx(f,{colSpan:1,align:"right",children:"Total"}),e.jsx(f,{colSpan:1,align:"right",children:"Per array"}),e.jsx(f,{colSpan:1,align:"right",children:"Per facility"})]})}),e.jsxs(je,{children:[e.jsxs(L,{children:[e.jsx(f,{colSpan:3,children:"Work"}),[U*N,U*v,U].map((t,o)=>e.jsx(f,{colSpan:1,children:e.jsxs(b,{display:"flex",alignItems:"center",justifyContent:"flex-end",fontSize:"inherit",children:[e.jsx(H,{fontSize:"inherit"}),O(t)]})},`supply-${o}`))]}),e.jsxs(L,{children:[e.jsx(f,{colSpan:3,children:"Idle"}),[Y*N,Y*v,Y].map((t,o)=>e.jsx(f,{colSpan:1,children:e.jsxs(b,{display:"flex",alignItems:"center",justifyContent:"flex-end",fontSize:"inherit",children:[e.jsx(H,{fontSize:"inherit"}),O(t)]})},`supply-${o}`))]})]})]})})})]}),children:[e.jsxs(q,{subheader:"Layout",dense:!0,children:[e.jsxs(S,{children:[e.jsx(g,{children:e.jsx(V,{})}),e.jsx(C,{primary:v,secondary:"Facilities per array"})]}),e.jsxs(S,{children:[e.jsx(g,{children:e.jsx(V,{})}),e.jsx(C,{primary:G,secondary:"Arrays"})]}),e.jsxs(S,{children:[e.jsx(g,{children:e.jsx(V,{})}),e.jsx(C,{primary:N,secondary:"Total facilities"})]}),e.jsxs(S,{children:[e.jsx(g,{children:e.jsx(V,{})}),e.jsx(C,{primary:Oe,secondary:"Leftover facilities"})]})]}),e.jsxs(q,{subheader:"Facility information",dense:!0,children:[e.jsxs(S,{children:[e.jsx(g,{children:e.jsx(Ee,{})}),e.jsx(C,{primary:d.label,secondary:"Name"})]}),e.jsxs(S,{children:[e.jsx(g,{children:e.jsx(ke,{})}),e.jsx(C,{primary:d.recipeType,secondary:"Category"})]}),e.jsxs(S,{children:[e.jsx(g,{children:e.jsx(J,{})}),e.jsx(C,{primary:`${O(d.cycleMultiplier*100)}%`,secondary:"Cycle speed"})]}),e.jsxs(S,{children:[e.jsx(g,{children:e.jsx($e,{})}),e.jsx(C,{primary:d.connectionCount,secondary:"Sorter connections"})]}),e.jsxs(S,{children:[e.jsx(g,{children:e.jsx(Q,{})}),e.jsx(C,{primary:`${O(d.workConsumptionMW)} MW`,secondary:"Work comsumption"})]}),e.jsxs(S,{children:[e.jsx(g,{children:e.jsx(Q,{})}),e.jsx(C,{primary:`${O(d.idleConsumptionMW)} MW`,secondary:"Idle comsumption"})]})]}),e.jsxs(q,{subheader:"Recipe infomation",dense:!0,children:[e.jsxs(S,{children:[e.jsx(g,{children:e.jsx(J,{})}),e.jsx(C,{primary:`${O(r.cycleTimeSecond)} s`,secondary:"Cycle time"})]}),e.jsxs(S,{children:[e.jsx(g,{children:e.jsx(ze,{})}),e.jsx(C,{primary:r.speedupOnly?"No":"Yes",secondary:"Extra products bonus"})]}),e.jsxs(S,{children:[e.jsx(g,{children:e.jsx(Be,{})}),e.jsx(C,{primary:Object.entries(r.materialRecord).map(([t,o])=>e.jsx(b,{fontSize:"inherit",children:`${o} ${t}`},t)),secondary:"Materials"})]}),e.jsxs(S,{children:[e.jsx(g,{children:e.jsx(ye,{})}),e.jsx(C,{primary:Object.entries(r.productRecord).map(([t,o])=>e.jsx(b,{fontSize:"inherit",children:`${o} ${t}`},t)),secondary:"Products"})]})]}),e.jsxs(q,{dense:!0,subheader:"Proliferator effects",children:[e.jsxs(S,{children:[e.jsx(g,{children:e.jsx(J,{})}),e.jsx(C,{primary:`${O((u.cycleMultiplier-1)*100)}%`,secondary:"Bonus cycle speed"})]}),e.jsxs(S,{children:[e.jsx(g,{children:e.jsx(J,{})}),e.jsx(C,{primary:`${O((u.productMultiplier-1)*100)}%`,secondary:"Bonus products per cycle"})]}),e.jsxs(S,{children:[e.jsx(g,{children:e.jsx(Q,{})}),e.jsx(C,{primary:`${O((u.workConsumptionMultiplier-1)*100)}%`,secondary:"Additional work consumption"})]}),e.jsxs(S,{children:[e.jsx(g,{children:e.jsx(We,{})}),e.jsx(C,{primary:O(p===""?0:Number.parseInt(p)),secondary:"Sprays"})]})]})]})},it=()=>e.jsxs(De,{theme:Ge,children:[e.jsx(qe,{}),e.jsx(st,{})]});Ie.createRoot(document.getElementById("root")).render(e.jsx(j.StrictMode,{children:e.jsx(it,{})}));
