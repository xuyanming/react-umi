(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[16],{mN2d:function(e,t,a){"use strict";a.r(t);a("2A2L");var r=a("x1IR"),n=a("NTxs"),c=a.n(n),s=a("smUt"),i=a.n(s),u=a("NTBb"),o=a.n(u),p=a("7Qib"),d=a("Aeqt"),l=a("3eXy"),f=a("3Unq"),y=l["a"].quweytaxs,h=l["a"].departTree,x=l["a"].createUser,m=l["a"].finishtaxs,w=l["a"].amount,k=l["a"].yearall,b=l["a"].dealtDetail,v=l["a"].exporttaxs,g=(l["a"].exportalltaxs,l["a"].detailtaxs),_=l["a"].queryother;t["default"]=o()(f["b"],{namespace:"taxs",state:{currentItem:{},modalVisible:!1,moneymodalVisible:!1,imgmodalVisible:!1,modalType:"create",allchecked:[],selectedRowKeys:[],indeterminate:!1,checkAll:!1,departdata:[],datalist:[],yearall:{},datatime:{},imgurl:"",filters:{year_month:new Date,name:"",dept_id:""},page:{page:1,per_page:10}},subscriptions:{setup:function(e){var t=e.dispatch,a=e.history;a.listen(function(e){Object(p["g"])("/taxs",e.pathname)&&(t({type:"defSuccess",payload:{filters:{year_month:new Date,name:"",dept_id:""},page:{page:1,per_page:10}}}),t({type:"depart"}),t({type:"queryother"}))})}},effects:{query:c.a.mark(function e(t,a){var r,n,s,u,o,p,d,l,f,h,x;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,void 0===r?{}:r,n=a.call,s=a.put,u=a.select,e.next=4,u(function(e){return e.taxs});case 4:return o=e.sent,p=o.filters,d=o.page,l=o.allchecked,e.next=10,n(y,i()({},p,d));case 10:if(f=e.sent,h=f.data.result.map(function(e){return e.staff_id}),0!=f.code){e.next=18;break}return e.next=15,s({type:"querySuccess",payload:{applyid:h,list:f.data.result,pagination:{current:Number(d.page)||1,pageSize:Number(d.per_page)||10,total:f.data.total}}});case 15:return x=l.filter(function(e){return h.indexOf(e)>-1}),e.next=18,s({type:"defSuccess",payload:{selectedRowKeys:x,indeterminate:!!x.length&&x.length<h.length,checkAll:x.length===h.length}});case 18:case"end":return e.stop()}},e,this)}),queryother:c.a.mark(function e(t,a){var r,n,s;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t.payload,r=a.call,n=a.put,e.next=4,r(_);case 4:if(s=e.sent,0!=s.code){e.next=8;break}return e.next=8,n({type:"updateState",payload:{datatime:s.data}});case 8:case"end":return e.stop()}},e,this)}),depart:c.a.mark(function e(t,a){var r,n,s,i,u,o;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,n=void 0===r?{}:r,s=a.call,i=a.put,e.next=4,s(h,n);case 4:if(u=e.sent,0!=u.code){e.next=9;break}return o=Object(p["b"])(u.data,"dept_id","pid"),e.next=9,i({type:"defSuccess",payload:{departdata:o}});case 9:case"end":return e.stop()}},e,this)}),finish:c.a.mark(function e(t,a){var r,n,s,i;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,n=a.call,s=a.put,a.select,e.next=4,n(m,r);case 4:if(i=e.sent,0!=i.code){e.next=12;break}return e.next=8,s({type:"defSuccess",payload:{allchecked:[]}});case 8:return e.next=10,s({type:"query"});case 10:e.next=13;break;case 12:throw i;case 13:case"end":return e.stop()}},e,this)}),amount:c.a.mark(function e(t,a){var r,n,s,u,o,p,d;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,n=a.call,s=a.put,u=a.select,e.next=4,u(function(e){return e.taxs});case 4:return o=e.sent,p=o.currentItem,e.next=8,n(w,i()({apply_id:p.apply_id},r));case 8:if(d=e.sent,0!=d.code){e.next=16;break}return e.next=12,s({type:"hideModal",payload:{moneymodalVisible:!1}});case 12:return e.next=14,s({type:"query"});case 14:e.next=17;break;case 16:throw d;case 17:case"end":return e.stop()}},e,this)}),multi:c.a.mark(function e(t,a){var r,n,s,i;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,n=a.call,s=a.put,e.next=4,n(g,{year_month:r.year_month,staff_id:r.staff_id});case 4:if(i=e.sent,0!=i.code){e.next=10;break}return e.next=8,s({type:"defSuccess",payload:{datalist:i.data,currentItem:r.item}});case 8:e.next=11;break;case 10:throw i;case 11:case"end":return e.stop()}},e,this)}),yearall:c.a.mark(function e(t,a){var r,n,s,i;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,n=a.call,s=a.put,e.next=4,n(k,r);case 4:if(i=e.sent,0!=i.code){e.next=10;break}return e.next=8,s({type:"updateState",payload:{yearall:i.data}});case 8:e.next=11;break;case 10:throw i;case 11:case"end":return e.stop()}},e,this)}),exportall:c.a.mark(function e(t,a){var n,s,i;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n=t.payload,a.call,s=a.put;try{i=document.createElement("iframe"),i.style.display="none",i.style.height=0,i.src="".concat(d["apiPrefix"],"/ajax/deduction/info/export?staff_ids=").concat(n.staff_ids,"&year_month=").concat(n.year_month),document.body.appendChild(i),setTimeout(function(){i.remove()},12e4)}catch(e){r["a"].error("\u4e0b\u8f7d\u5f02\u5e38")}return e.next=5,s({type:"defSuccess",payload:{allchecked:[]}});case 5:return e.next=7,s({type:"query"});case 7:case"end":return e.stop()}},e,this)}),export:c.a.mark(function e(t,a){var n,s,i,u;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,s=a.call,i=a.put,e.next=4,s(v,n);case 4:if(u=e.sent,0!=u.code){e.next=13;break}return e.next=8,i({type:"defSuccess",payload:{allchecked:[]}});case 8:return e.next=10,i({type:"query"});case 10:u.data.forEach(function(e){(function(e){try{var t=document.createElement("iframe");t.style.display="none",t.style.height=0,t.src=d["apiPrefix"]+e,document.body.appendChild(t),setTimeout(function(){t.remove()},12e4)}catch(e){r["a"].error("\u4e0b\u8f7d\u5f02\u5e38")}})(e)}),e.next=14;break;case 13:throw u;case 14:case"end":return e.stop()}},e,this)}),create:c.a.mark(function e(t,a){var r,n,s,i;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,n=a.call,s=a.put,e.next=4,n(x,r);case 4:if(i=e.sent,0!=i.code){e.next=10;break}return e.next=8,s({type:"hideModal"});case 8:e.next=11;break;case 10:throw i;case 11:case"end":return e.stop()}},e,this)}),detail:c.a.mark(function e(t,a){var r,n,s,i;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,a.select,n=a.call,s=a.put,e.next=4,n(b,{staff_id:r.staff_id});case 4:if(i=e.sent,0!=i.code){e.next=10;break}return e.next=8,s({type:"defSuccess",payload:{datalist:i.data,currentItem:r}});case 8:e.next=11;break;case 10:throw i;case 11:case"end":return e.stop()}},e,this)})},reducers:{showModal:function(e,t){var a=t.payload;return i()({},e,a)},hideModal:function(e,t){var a=t.payload;return i()({},e,a)},defSuccess:function(e,t){var a=t.payload;return i()({},e,a)}}})}}]);