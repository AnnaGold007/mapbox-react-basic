(this["webpackJsonpuse-mapbox-gl-js-with-react"]=this["webpackJsonpuse-mapbox-gl-js-with-react"]||[]).push([[0],{10:function(e,t,n){},11:function(e,t,n){},13:function(e,t,n){"use strict";n.r(t);var c=n(1),s=n.n(c),o=n(4),r=n.n(o),a=(n(9),n(10),n(2)),i=n.n(a),j=(n(11),n(0));i.a.accessToken="pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";var b=()=>{const e=Object(c.useRef)(null),[t,n]=Object(c.useState)(36.3),[s,o]=Object(c.useState)(31.4),[r,a]=Object(c.useState)(6.6);return Object(c.useEffect)((()=>{const c=new i.a.Map({container:e.current,style:"mapbox://styles/mapbox/streets-v11",center:[t,s],zoom:r});return c.addControl(new i.a.NavigationControl,"top-right"),c.on("move",(()=>{n(c.getCenter().lng.toFixed(4)),o(c.getCenter().lat.toFixed(4)),a(c.getZoom().toFixed(2))})),()=>c.remove()}),[]),Object(j.jsxs)("div",{children:[Object(j.jsx)("div",{className:"sidebarStyle",children:Object(j.jsxs)("div",{children:["Longitude: ",t," | Latitude: ",s," | Zoom: ",r]})}),Object(j.jsx)("div",{className:"map-container",ref:e})]})};var d=function(){return Object(j.jsx)("div",{children:Object(j.jsx)(b,{})})};r.a.render(Object(j.jsx)(s.a.StrictMode,{children:Object(j.jsx)(d,{})}),document.getElementById("root"))}},[[13,1,2]]]);
//# sourceMappingURL=main.04b48119.chunk.js.map