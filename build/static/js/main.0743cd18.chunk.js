(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){e.exports=n(38)},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(13),u=n.n(c),o=n(3),l=n(2),i=n.n(l),m="/api/persons",d=function(){return i.a.get("".concat(m)).then(function(e){return e.data})},s=function(e,t){return i.a.put("".concat(m,"/").concat(e),t).then(function(e){return e.data})},f=function(e){return i.a.post("".concat(m,"/"),e).then(function(e){return e.data})},p=function(e){return i.a.delete("".concat(m,"/").concat(e)).then(function(e){return e.data})},b=function(e){var t=e.newSSHandler,n=e.filterString;return a.a.createElement("div",{className:"search"},a.a.createElement("p",null,"filter shown with: "),a.a.createElement("input",{type:"text",onChange:t,value:n}))},h=function(e){var t=e.newNameHandler,n=e.newNumberHandler,r=e.submitHandler,c=e.newName,u=e.newNumber;return a.a.createElement("form",{onSubmit:r},a.a.createElement("div",null,"Name: ",a.a.createElement("input",{type:"text",onChange:t,value:c})),a.a.createElement("div",null,"Number:"," ",a.a.createElement("input",{type:"text",onChange:n,value:u})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},"add")))},v=function(e){var t=e.persons,n=e.filterString,r=e.deleteHandler,c=t.filter(function(e){return e.name.toLowerCase().includes(n)||0===n.length}).map(function(e){return a.a.createElement("div",{key:e.id},e.name," ",e.number,a.a.createElement("button",{onClick:r(e.id)},"Delete"))});return a.a.createElement("div",null,a.a.createElement("h2",null,"Numbers"),c)},E=(n(37),function(e){var t=e.type,n=e.content;return n?a.a.createElement("div",{className:t},a.a.createElement("p",null,n)):null}),w=function(e,t){e(t),setTimeout(function(){return e({type:"",content:""})},3e3)},y=function(){var e=Object(r.useState)([]),t=Object(o.a)(e,2),n=t[0],c=t[1],u=Object(r.useState)(""),l=Object(o.a)(u,2),i=l[0],m=l[1],y=Object(r.useState)(""),g=Object(o.a)(y,2),S=g[0],N=g[1],j=Object(r.useState)(""),O=Object(o.a)(j,2),H=O[0],k=O[1],C=Object(r.useState)({type:"",content:""}),x=Object(o.a)(C,2),A=x[0],R=x[1];Object(r.useEffect)(function(){d().then(function(e){return c(e)}).catch(function(){w(R,{type:"error",content:"API connection failed, cannot get contacts from server"})})},[]);var D=function(e){var t={},r=n.map(function(n){return n.name===e.name&&(n.number=e.number,t=n),n});s(t.id,t).then(c(r)).then(w(R,{type:"success",content:"updated ".concat(t.name,"'s number to ").concat(t.number)}))};return a.a.createElement(a.a.Fragment,null,a.a.createElement(E,{type:A.type,content:A.content}),a.a.createElement("h2",null,"Phonebook"),a.a.createElement(b,{newSSHandler:function(e){return k(e.target.value.toLowerCase())}}),a.a.createElement("h2",null," Add new "),a.a.createElement(h,{newNameHandler:function(e){return m(e.target.value)},newNumberHandler:function(e){return N(e.target.value)},submitHandler:function(e){e.preventDefault();var t={name:i,number:S},r=!1,a=!0,u=!1,o=void 0;try{for(var l,d=n[Symbol.iterator]();!(a=(l=d.next()).done);a=!0)l.value.name===t.name&&(r=window.confirm("".concat(i," is already added to phonebook. Replace previous phone number?")))&&D(t)}catch(s){u=!0,o=s}finally{try{a||null==d.return||d.return()}finally{if(u)throw o}}r||f(t).then(function(e){c(n.concat(e)),m(""),N(""),w(R,{type:"success",content:"Added ".concat(t.name," to records")})}).catch(function(e){console.log("Submit handler error: ",e),w(R,{type:"error",content:e.message})})},newName:i,newNumber:S}),a.a.createElement("h1",null,"Numbers "),a.a.createElement(v,{persons:n,filterString:H,deleteHandler:function(e){return function(){var t=n.filter(function(t){return t.id!==e});p(e).then(function(){c(t),w(R,{type:"success",content:"Record deleted"})}).catch(function(){c(t),w(R,{type:"error",content:"Record already deleted on the server. Updating local records..."})})}}}))};u.a.render(a.a.createElement(y,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.0743cd18.chunk.js.map