(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[12],{"49Ex":function(t,e,a){"use strict";a.r(e);var n=a("smUt"),r=a.n(n),s=a("NTxs"),c=a.n(s),u=(a("BCev"),a("NTBb"),a("3eXy")),i=a("7Qib"),p=u["a"].queryother,o=u["a"].setother;e["default"]={namespace:"other",state:{list:[],listdata:[],flag:!0},subscriptions:{setup:function(t){var e=t.dispatch,a=t.history;a.listen(function(t){Object(i["g"])("/other",t.pathname)&&e({type:"query"})})}},effects:{query:c.a.mark(function t(e,a){var n,r,s;return c.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e.payload,n=a.call,r=a.put,t.next=4,n(p);case 4:if(s=t.sent,0!=s.code){t.next=8;break}return t.next=8,r({type:"updateState",payload:{list:s.data,listdata:s.data}});case 8:case"end":return t.stop()}},t,this)}),setother:c.a.mark(function t(e,a){var n,r,s,u;return c.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=e.payload,r=a.call,s=a.put,t.next=4,r(o,n);case 4:if(u=t.sent,0!=u.code){t.next=8;break}return t.next=8,s({type:"updateState",payload:{flag:!0}});case 8:case"end":return t.stop()}},t,this)})},reducers:{updateState:function(t,e){var a=e.payload;return r()({},t,a)}}}}}]);