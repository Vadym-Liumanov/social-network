(this.webpackJsonpsocial_network=this.webpackJsonpsocial_network||[]).push([[7],{325:function(e,t,a){e.exports={message:"Message_message__1PnyW",message__authorAvatar:"Message_message__authorAvatar__DMCkV",message__authorName:"Message_message__authorName__30lxZ",message__text:"Message_message__text__2H4-g"}},326:function(e,t,a){e.exports={primaryButton:"DownButton_primaryButton__1i08F",downButton:"DownButton_downButton__3_Vn-"}},327:function(e,t,a){e.exports={messages__body:"Messages_messages__body__tmpIo",downButton__container:"Messages_downButton__container__oDh8O",downButton:"Messages_downButton__1IXKt"}},328:function(e,t,a){e.exports={form__body:"AddMessageForm_form__body__hOjSO",form__textarea:"AddMessageForm_form__textarea__3U5qD",form__button:"AddMessageForm_form__button__2I83D",form__button_disabled:"AddMessageForm_form__button_disabled__1lmZf",form__counter:"AddMessageForm_form__counter__1E1O9"}},329:function(e,t,a){e.exports={wrapper:"ChatPage_wrapper__2Y4aX",body:"ChatPage_body__1RrVH",messagesContainer:"ChatPage_messagesContainer__3hMwK",formContainer:"ChatPage_formContainer__2vhDI"}},332:function(e,t,a){"use strict";a.r(t);var s=a(0),n=a.n(s),o=a(14),r=a(4),c=a(8),_=function(e){return e.chat.messages},i=function(e){return e.chat.status},u=a(325),m=a.n(u),d=a(66),l=a(2),b=function(e){var t=e.message;return Object(l.jsxs)("div",{className:m.a.message,children:[Object(l.jsx)("img",{src:t.photo?t.photo:d.a,className:m.a.message__authorAvatar,alt:"userPhoto"}),Object(l.jsx)("span",{className:m.a.message__authorName,children:t.userName}),Object(l.jsx)("p",{className:m.a.message__text,children:t.message})]})},j=n.a.memo(b),f=a(326),g=a.n(f),O=a.p+"static/media/down_icon.eab62b20.svg",h=function(e){var t=e.onClick;return Object(l.jsx)("button",{className:g.a.downButton,onClick:t,children:Object(l.jsx)("img",{src:O,alt:""})})},x=n.a.memo(h),v=a(327),p=a.n(v),w=function(){var e=Object(o.d)(_),t=Object(s.useRef)(null),a=Object(s.useState)(!0),n=Object(c.a)(a,2),r=n[0],i=n[1];Object(s.useEffect)((function(){r&&u()}),[e]);var u=function(){var e;null===(e=t.current)||void 0===e||e.scrollIntoView({behavior:"smooth"})};return Object(l.jsxs)("div",{className:p.a.messages__wrapper,children:[Object(l.jsxs)("div",{className:p.a.messages__body,onScroll:function(e){var t=e.currentTarget;t.scrollHeight-t.scrollTop-t.clientHeight<=320?!r&&i(!0):r&&i(!1)},children:[e.map((function(e){return Object(l.jsx)(j,{message:e},e.id)})),Object(l.jsx)("div",{ref:t})]}),!r&&Object(l.jsx)("div",{className:p.a.downButton__container,children:Object(l.jsx)("div",{className:p.a.downButton,children:Object(l.jsx)(x,{onClick:u})})})]})},N=n.a.memo(w),y=a(9),C=a(41),M=a.n(C),B=a(72),k=a(328),S=a.n(k),A=function(e){var t=e.channelStatus,a=Object(o.c)(),n=Object(s.useState)(""),r=Object(c.a)(n,2),_=r[0],i=r[1],u=Object(s.useState)(0),m=Object(c.a)(u,2),d=m[0],b=m[1],j=function(){if(!_)return i(""),void b(0);a(Object(B.b)(_)),i(""),b(0)},f=function(){return 0!==d&&"ready"===t},g=function(e){f()&&e.ctrlKey&&"Enter"===e.key&&j()};return Object(s.useEffect)((function(){return document.addEventListener("keyup",g),function(){document.removeEventListener("keyup",g)}})),Object(l.jsxs)("div",{className:S.a.form__body,children:[Object(l.jsx)("textarea",{className:S.a.form__textarea,onChange:function(e){var t=e.target.value,a=t?t.length:0;a<=100&&(i(t),b(a))},value:_}),Object(l.jsx)("button",{className:M()(S.a.form__button,Object(y.a)({},S.a.form__button_disabled,0===d)),onClick:j,disabled:!f(),title:"Ctrl+Enter",children:"Send"}),Object(l.jsx)("div",{className:S.a.form__counter,children:"".concat(d,"/").concat(100)})]})},E=n.a.memo(A),F=a(34),D=a(329),P=a.n(D),I=function(){var e=Object(o.c)(),t=Object(o.d)(F.c),a=Object(o.d)(i);return Object(s.useEffect)((function(){return e(Object(B.c)()),function(){e(Object(B.d)())}}),[]),Object(l.jsx)(l.Fragment,{children:t?Object(l.jsxs)(l.Fragment,{children:["error"===a&&alert("Some error with WS-connection occured."),Object(l.jsx)("div",{className:P.a.wrapper,children:Object(l.jsxs)("div",{className:P.a.body,children:[Object(l.jsx)("div",{className:P.a.messagesContainer,children:Object(l.jsx)(N,{})}),Object(l.jsx)("div",{className:P.a.formContainer,children:Object(l.jsx)(E,{channelStatus:a})})]})})]}):Object(l.jsx)(r.a,{replace:!0,to:"/login"})})};t.default=n.a.memo(I)}}]);
//# sourceMappingURL=7.260b57ec.chunk.js.map