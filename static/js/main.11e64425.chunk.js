(this.webpackJsonptodos=this.webpackJsonptodos||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),c=n(5),l=n.n(c),r=n(1);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var u=n(6),i={nowShowing:"all",todos:[]},s=Object(u.a)((function(e,t){var n=t.type,a=t.payload;switch(console.log(n,a),t.type){case"create":return e.todos.push(a),e;case"update":return e.todos.forEach((function(e){e.id===a.id&&(e.text=a.text)})),e;case"toggle":return e.todos.forEach((function(e){e.id===a.id&&(e.completed=!e.completed)})),e;case"toggleAll":return e.todos.forEach((function(e){e.completed=a.completed})),e;case"destroy":return e.todos.splice(e.todos.findIndex((function(e){return e.id===a.id}))),e;case"clearCompleted":return e.todos=e.todos.filter((function(e){return!e.completed})),e;case"toggleShowing":return e.nowShowing=a.nowShowing,e;default:return e}})),d=n(3),m=function(){var e=Object(a.useRef)(null),t=Object(r.useDispatch)(),n=Object(a.useState)(""),c=Object(d.a)(n,2),l=c[0],u=c[1];Object(a.useEffect)((function(){e&&e.current&&e.current.focus()}),[]);return o.a.createElement("header",{className:"header"},o.a.createElement("h1",null,"todos"),o.a.createElement("input",{ref:e,className:"new-todo",placeholder:"What needs to be done?",value:l,onChange:function(e){u(e.target.value)},onKeyDown:function(e){if(13===e.keyCode){var n=l.trim();if(n){var a={id:Date.now(),text:n,completed:!1};t({type:"create",payload:a}),u("")}}}}))},p=n(2),f=n.n(p),h=function(e){var t=e.todo,n=Object(a.useRef)(null),c=Object(r.useDispatch)(),l=Object(a.useState)(t.text),u=Object(d.a)(l,2),i=u[0],s=u[1],m=Object(a.useState)(!1),p=Object(d.a)(m,2),h=p[0],g=p[1];Object(a.useEffect)((function(){h&&n&&n.current&&n.current.focus()}),[h]);var E=function(){c({type:"destroy",payload:{id:t.id}})},w=function(){var e=i.trim();e?e!==t.name&&(c({type:"update",payload:{id:t.id,text:i}}),g(!1)):E()};return o.a.createElement("li",{className:f()({completed:t.completed,editing:h})},o.a.createElement("div",{className:"view"},o.a.createElement("input",{className:"toggle",type:"checkbox",checked:t.completed,onChange:function(){c({type:"toggle",payload:{id:t.id}})}}),o.a.createElement("label",{onDoubleClick:function(){g(!0)}},t.text),o.a.createElement("button",{className:"destroy",onClick:E})),o.a.createElement("input",{ref:n,className:"edit",value:i,onChange:function(e){s(e.target.value)},onBlur:w,onKeyDown:function(e){13===e.which&&w()}}))},g=function(){var e=Object(r.useSelector)((function(e){return e})),t=e.nowShowing,n=e.todos,a=Object(r.useDispatch)(),c=n.reduce((function(e,t){return t.completed?e:e+1}),0),l=n.filter((function(e){switch(t){case"active":return!e.completed;case"completed":return e.completed;default:return!0}}));return o.a.createElement("div",{className:"main"},o.a.createElement("input",{className:"toggle-all",type:"checkbox",onChange:function(e){var t=e.target.checked;a({type:"toggleAll",payload:{completed:t}})},checked:0===c}),o.a.createElement("ul",{className:"todo-list"},l.map((function(e){return o.a.createElement(h,{key:e.id,todo:e})}))))},E=function(){var e=Object(r.useSelector)((function(e){return e})),t=e.nowShowing,n=e.todos,a=Object(r.useDispatch)(),c=n.reduce((function(e,t){return t.completed?e:e+1}),0),l=function(e){a({type:"toggleShowing",payload:{nowShowing:e}})};return n.length?o.a.createElement("footer",{className:"footer"},o.a.createElement("span",{className:"todo-count"},o.a.createElement("strong",null,c)," item",1===c?"":"s"," left"),o.a.createElement("ul",{className:"filters"},o.a.createElement("li",null,o.a.createElement("a",{onClick:function(){return l("all")},className:f()({selected:"all"===t})},"All"))," ",o.a.createElement("li",null,o.a.createElement("a",{onClick:function(){return l("active")},className:f()({selected:"active"===t})},"Active"))," ",o.a.createElement("li",null,o.a.createElement("a",{onClick:function(){return l("completed")},className:f()({selected:"completed"===t})},"Completed"))),o.a.createElement("button",{className:"clear-completed",onClick:function(){a({type:"clearCompleted"})}},"Clear completed")):null},w=function(){return o.a.createElement("div",{className:"todoapp"},o.a.createElement(m,null),o.a.createElement(g,null),o.a.createElement(E,null))},v=(n(13),Object(r.createStore)(s,i));l.a.render(o.a.createElement(r.Provider,{store:v},o.a.createElement(w,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},7:function(e,t,n){e.exports=n(14)}},[[7,1,2]]]);
//# sourceMappingURL=main.11e64425.chunk.js.map