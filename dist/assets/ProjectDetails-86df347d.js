import{u as p,r as m,j as e,L as h}from"./index-bb4b37b7.js";import{N as j,B as f,M as u}from"./Btn-d8090584.js";import{h as g}from"./joins-a642188f.js";import{p as l}from"./profile_placeholder-4c6a012f.js";import{a as x}from"./axios-71af5128.js";import{F as N}from"./Footer-e9b0988b.js";const b="/assets/share_icon-2a44ad0a.svg",w="/assets/bookmark-86e9c7d3.svg";function R(){const{detail:s,proj:n,setDetail:o,projects:c}=p(),i=m.useRef(null);m.useEffect(()=>{async function t(){if(c.length!=0){const r=c.find(a=>a.id==n);if(r){o(r);return}}try{const r=n||sessionStorage.getItem("proj"),{data:a}=await x.post("/api/projects/project/detail",{project:r});console.log("data",a),a.msg&&o(a.detail)}catch{console.log("something went wrong")}}t()},[]);async function d(t){t.preventDefault();try{const r=n||sessionStorage.getItem("proj"),{data:a}=await x.post("/api/comment",{project:r,comment:i.current.value})}catch{console.log("something went wrong")}}return e.jsxs(e.Fragment,{children:[e.jsxs(j,{children:[e.jsx(f,{text:"New Project",href:"/projects/new"}),e.jsx(h,{to:"/dashboard",children:e.jsx("img",{className:"w-[40px] h-[40px] rounded-full inline",src:l})})]}),e.jsx(u,{children:e.jsxs("div",{className:"flex flex-col",children:[e.jsxs("div",{className:"flex flex-row justify-between max-w-xl mx-auto w-full md:px-[30px]",children:[e.jsxs("div",{children:[e.jsx("span",{className:"cursor-pointer",children:e.jsx("img",{className:"inline w-[30px] h-[30px]",alt:"Share",src:w})}),e.jsx("span",{className:"cursor-pointer",children:e.jsx("img",{className:"inline w-[30px] h-[30px]",alt:"Share",src:b})})]}),e.jsx("div",{children:e.jsxs("button",{children:["0",e.jsx("img",{className:"inline w-[30px] h-[30px]",alt:"Share",src:g})]})})]}),s&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"max-w-lg rounded overflow-hidden shadow-lg my-8 mx-auto py-4",children:[e.jsx("div",{className:"px-6 pt-2 pb-2",children:e.jsxs("div",{className:"flex justify-between",children:[e.jsx("div",{className:"mb-[0px]",children:e.jsx("span",{className:"text-slate-500 text-sm font-thin",children:new Date(s==null?void 0:s.createdAt).toLocaleString()})}),e.jsxs("span",{className:"text-slate-500 text-sm font-thin",children:["@",s==null?void 0:s.username]})]})}),e.jsxs("div",{className:"px-6 py-4",children:[e.jsxs("div",{className:"font-bold text-xl mb-2 flex",children:[e.jsx("div",{className:"flex flex-col",children:e.jsx("img",{className:"w-10 h-10 mr-5 rounded-full",src:l,alt:`${s==null?void 0:s.user} profile pic`})}),e.jsxs("div",{className:"font-bold text-xl mb-2 flex-col",children:[s==null?void 0:s.title,e.jsxs("p",{className:"text-sm text-gray-500",children:[e.jsx("span",{children:s==null?void 0:s.ownRole}),e.jsx("span",{children:" looking for "}),e.jsx("span",{className:"underline",children:s==null?void 0:s.otherRole})]})]})]}),e.jsx("p",{className:"text-gray-700 text-base pt-10",children:s==null?void 0:s.description})]})]}),e.jsx("div",{className:"max-w-lg w-full mx-auto",children:e.jsx("section",{className:"py-8 lg:py-16",children:e.jsxs("div",{className:"mx-auto px-4",children:[e.jsx("div",{className:"flex items-center mb-6",children:e.jsx("h2",{className:"text-lg lg:text-2xl font-bold text-gray-900",children:`Discussion (${s.comments?s.comments.length:0})`})}),e.jsxs("form",{onSubmit:async t=>await d(t),children:[e.jsxs("div",{className:"py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 w-full bg-[#dddddd59]",children:[e.jsx("label",{htmlFor:"comment",className:"sr-only",children:"Your comment"}),e.jsx("textarea",{ref:i,id:"comment",rows:"3",name:"comment",className:"px-0 w-full min-w-full text-m border-0 focus:ring-0 focus:outline-none placeholder-gray-600 bg-transparent",placeholder:"Write a comment...",required:!0,onChange:t=>t.target.setAttribute("value",t.target.value)})]}),e.jsx("button",{type:"submit",className:"inline-flex mb-[50px] items-center py-2.5 px-4 text-lg font-large text-center bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800",children:"Post comment"})]}),s.comments?s==null?void 0:s.comments.map(t=>{var r,a;return e.jsxs("article",{className:"p-6 mb-6 text-base bg-[#dddddd59] rounded-lg",children:[e.jsx("footer",{className:"flex justify-between items-center mb-2",children:e.jsx("div",{className:"flex items-center",children:e.jsxs("p",{className:"inline-flex items-center mr-3 text-m",children:[e.jsx("img",{className:"w-10 h-10 mr-5 rounded-full",src:l,alt:`${(r=t.user)==null?void 0:r.displayName} profile pic`}),(a=t.user)==null?void 0:a.displayName]})})}),e.jsx("p",{className:"text-slate-950",children:t==null?void 0:t.comment})]},t.comment)}):null]})})})]})]})}),e.jsx(N,{})]})}export{R as default};