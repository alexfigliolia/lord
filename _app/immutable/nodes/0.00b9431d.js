import{s as Z,n as y,c as J,d as X,u as ee,g as te,e as se}from"../chunks/scheduler.b0c1c2c3.js";import{S as A,i as S,g as $,h as T,x as D,k as t,y as W,a as O,z as ae,f as d,r as B,s as M,j as _,u as I,c as k,A as v,v as N,d as H,t as V,w as Q,B as L,C as x}from"../chunks/index.b45b545b.js";import{w as re}from"../chunks/index.5e7feea3.js";const z=re(!1);class F{static toggleMenu(){z.update(e=>!e)}}function le(m){let e,a='<svg class="circ svelte-1m01lrb" version="1.1" viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet"><circle cx="250" cy="250" r="200" class="svelte-1m01lrb"></circle><defs><linearGradient id="grad" x1="0" x2="1" y1="0" y2="0"><stop stop-color="#9284fc" offset="0"></stop><stop stop-color="rgb(145, 189, 252)" offset="1"></stop></linearGradient></defs></svg> <div class="svelte-1m01lrb"><div class="bar top svelte-1m01lrb"></div> <div class="bar middle svelte-1m01lrb"></div> <div class="bar bottom svelte-1m01lrb"></div></div>',s,l;return{c(){e=$("button"),e.innerHTML=a,this.h()},l(o){e=T(o,"BUTTON",{id:!0,class:!0,"data-svelte-h":!0}),D(e)!=="svelte-1c2s3g4"&&(e.innerHTML=a),this.h()},h(){t(e,"id","burger"),t(e,"class","burger svelte-1m01lrb"),W(e,"open",m[0])},m(o,r){O(o,e,r),s||(l=ae(e,"click",F.toggleMenu.bind(F)),s=!0)},p(o,[r]){r&1&&W(e,"open",o[0])},i:y,o:y,d(o){o&&d(e),s=!1,l()}}}function ne(m,e,a){let s;return J(m,z,l=>a(0,s=l)),[s]}class ie extends A{constructor(e){super(),S(this,e,ne,le,Z,{})}}function oe(m){let e,a="Lord";return{c(){e=$("button"),e.textContent=a,this.h()},l(s){e=T(s,"BUTTON",{id:!0,class:!0,"data-svelte-h":!0}),D(e)!=="svelte-w0x5h1"&&(e.textContent=a),this.h()},h(){t(e,"id","coreLogo"),t(e,"class","svelte-1gw4en0")},m(s,l){O(s,e,l)},p:y,i:y,o:y,d(s){s&&d(e)}}}class K extends A{constructor(e){super(),S(this,e,null,oe,Z,{})}}function ce(m){let e,a,s,l,o,r;return s=new K({}),o=new ie({}),{c(){e=$("header"),a=$("div"),B(s.$$.fragment),l=M(),B(o.$$.fragment),this.h()},l(n){e=T(n,"HEADER",{id:!0,class:!0});var p=_(e);a=T(p,"DIV",{class:!0});var c=_(a);I(s.$$.fragment,c),l=k(c),I(o.$$.fragment,c),c.forEach(d),p.forEach(d),this.h()},h(){t(a,"class","svelte-1k8vmd1"),t(e,"id","coreHeader"),t(e,"class","svelte-1k8vmd1")},m(n,p){O(n,e,p),v(e,a),N(s,a,null),v(a,l),N(o,a,null),r=!0},p:y,i(n){r||(H(s.$$.fragment,n),H(o.$$.fragment,n),r=!0)},o(n){V(s.$$.fragment,n),V(o.$$.fragment,n),r=!1},d(n){n&&d(e),Q(s),Q(o)}}}class ue extends A{constructor(e){super(),S(this,e,null,ce,Z,{})}}function ve(m){let e,a,s,l,o,r,n,p,c,g,u;return{c(){e=L("svg"),a=L("g"),s=L("linearGradient"),l=L("stop"),o=L("stop"),r=L("path"),n=L("animate"),p=L("path"),c=L("animate"),g=L("path"),u=L("animate"),this.h()},l(i){e=x(i,"svg",{viewBox:!0,preserveAspectRatio:!0,class:!0});var f=_(e);a=x(f,"g",{transform:!0});var h=_(a);s=x(h,"linearGradient",{id:!0,x1:!0,x2:!0,y1:!0,y2:!0});var E=_(s);l=x(E,"stop",{"stop-color":!0,offset:!0}),_(l).forEach(d),o=x(E,"stop",{"stop-color":!0,offset:!0}),_(o).forEach(d),E.forEach(d),r=x(h,"path",{d:!0,fill:!0,opacity:!0});var C=_(r);n=x(C,"animate",{attributeName:!0,dur:!0,repeatCount:!0,keyTimes:!0,calcMode:!0,keySplines:!0,begin:!0,values:!0}),_(n).forEach(d),C.forEach(d),p=x(h,"path",{d:!0,fill:!0,opacity:!0});var U=_(p);c=x(U,"animate",{attributeName:!0,dur:!0,repeatCount:!0,keyTimes:!0,calcMode:!0,keySplines:!0,begin:!0,values:!0}),_(c).forEach(d),U.forEach(d),g=x(h,"path",{d:!0,fill:!0,opacity:!0});var G=_(g);u=x(G,"animate",{attributeName:!0,dur:!0,repeatCount:!0,keyTimes:!0,calcMode:!0,keySplines:!0,begin:!0,values:!0}),_(u).forEach(d),G.forEach(d),h.forEach(d),f.forEach(d),this.h()},h(){t(l,"stop-color","#9284fc"),t(l,"offset","0"),t(o,"stop-color","rgb(145, 189, 252)"),t(o,"offset","1"),t(s,"id","lg-0.7691468383310724"),t(s,"x1","0"),t(s,"x2","1"),t(s,"y1","0"),t(s,"y2","0"),t(n,"attributeName","d"),t(n,"dur","50s"),t(n,"repeatCount","indefinite"),t(n,"keyTimes","0;0.333;0.667;1"),t(n,"calcMode","spline"),t(n,"keySplines","0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"),t(n,"begin","0s"),t(n,"values","M0 0L 0 1043.1010547632109Q 116.2 946.2733761865207  232.4 901.6920154473428T 464.8 1065.462159131827T 697.2 831.2850075443586T 929.6 941.627170182443T 1162 859.6357835569064L 1162 0 Z;M0 0L 0 960.6230555133252Q 116.2 1077.6674491174945  232.4 1050.5696549195723T 464.8 894.9705220349806T 697.2 1049.2904970746386T 929.6 904.4819142743937T 1162 1017.5845753942992L 1162 0 Z;M0 0L 0 831.2458829288714Q 116.2 912.654650338633  232.4 865.6978834587488T 464.8 917.7389502912969T 697.2 815.917243224844T 929.6 1037.6818291611567T 1162 854.9319647200348L 1162 0 Z;M0 0L 0 1043.1010547632109Q 116.2 946.2733761865207  232.4 901.6920154473428T 464.8 1065.462159131827T 697.2 831.2850075443586T 929.6 941.627170182443T 1162 859.6357835569064L 1162 0 Z"),t(r,"d",""),t(r,"fill","url(#lg-0.7691468383310724)"),t(r,"opacity","0.4"),t(c,"attributeName","d"),t(c,"dur","50s"),t(c,"repeatCount","indefinite"),t(c,"keyTimes","0;0.333;0.667;1"),t(c,"calcMode","spline"),t(c,"keySplines","0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"),t(c,"begin","-16.666666666666668s"),t(c,"values","M0 0L 0 890.9507250642852Q 116.2 1045.8073508568118  232.4 1001.6750114456541T 464.8 889.745915093367T 697.2 908.2973081024343T 929.6 846.4204912012876T 1162 899.0628550662225L 1162 0 Z;M0 0L 0 971.2088417067489Q 116.2 980.6206952547172  232.4 940.4874540218536T 464.8 943.6860525335774T 697.2 821.8233743079452T 929.6 942.9732063736101T 1162 1007.1284164014598L 1162 0 Z;M0 0L 0 906.1804167289222Q 116.2 935.4797682332504  232.4 905.9580845594826T 464.8 1005.8449426230046T 697.2 930.1737500196926T 929.6 821.5095782036251T 1162 1034.898285286917L 1162 0 Z;M0 0L 0 890.9507250642852Q 116.2 1045.8073508568118  232.4 1001.6750114456541T 464.8 889.745915093367T 697.2 908.2973081024343T 929.6 846.4204912012876T 1162 899.0628550662225L 1162 0 Z"),t(p,"d",""),t(p,"fill","url(#lg-0.7691468383310724)"),t(p,"opacity","0.4"),t(u,"attributeName","d"),t(u,"dur","50s"),t(u,"repeatCount","indefinite"),t(u,"keyTimes","0;0.333;0.667;1"),t(u,"calcMode","spline"),t(u,"keySplines","0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"),t(u,"begin","-33.333333333333336s"),t(u,"values","M0 0L 0 957.9349520913329Q 116.2 1017.3233292153386  232.4 984.3337098943038T 464.8 884.0674464084045T 697.2 1038.639892909601T 929.6 872.8209755916673T 1162 1009.445498706214L 1162 0 Z;M0 0L 0 870.7165329190834Q 116.2 1103.6685773312506  232.4 1067.0764914053964T 464.8 1021.9902806812653T 697.2 828.6186005590602T 929.6 841.9605285125957T 1162 940.0996237558943L 1162 0 Z;M0 0L 0 891.4885359023423Q 116.2 997.8035603342729  232.4 951.1058672508816T 464.8 931.1764832489724T 697.2 1028.322533922955T 929.6 883.5630072973523T 1162 866.9268196863507L 1162 0 Z;M0 0L 0 957.9349520913329Q 116.2 1017.3233292153386  232.4 984.3337098943038T 464.8 884.0674464084045T 697.2 1038.639892909601T 929.6 872.8209755916673T 1162 1009.445498706214L 1162 0 Z"),t(g,"d",""),t(g,"fill","url(#lg-0.7691468383310724)"),t(g,"opacity","0.4"),t(a,"transform","translate(581,677) scale(1,1) translate(-581,-677)"),t(e,"viewBox","0 0 1162 1354"),t(e,"preserveAspectRatio","none"),t(e,"class","svelte-1y3fvao")},m(i,f){O(i,e,f),v(e,a),v(a,s),v(s,l),v(s,o),v(a,r),v(r,n),v(a,p),v(p,c),v(a,g),v(g,u)},p:y,i:y,o:y,d(i){i&&d(e)}}}class de extends A{constructor(e){super(),S(this,e,null,ve,Z,{})}}function fe(m){let e,a="Logout";return{c(){e=$("button"),e.textContent=a,this.h()},l(s){e=T(s,"BUTTON",{class:!0,"data-svelte-h":!0}),D(e)!=="svelte-fmt5jt"&&(e.textContent=a),this.h()},h(){t(e,"class","logout svelte-1nly6om")},m(s,l){O(s,e,l)},p:y,i:y,o:y,d(s){s&&d(e)}}}class me extends A{constructor(e){super(),S(this,e,null,fe,Z,{})}}function pe(m){let e,a,s,l,o,r,n,p='<a class="svelte-18bagcb">Overview</a>',c,g,u='<a class="svelte-18bagcb">Properties</a>',i,f,h='<a class="svelte-18bagcb">Banking</a>',E,C,U='<a class="svelte-18bagcb">Account</a>',G,q,j;return s=new de({}),q=new me({}),{c(){e=$("nav"),a=$("div"),B(s.$$.fragment),l=M(),o=$("div"),r=$("div"),n=$("div"),n.innerHTML=p,c=M(),g=$("div"),g.innerHTML=u,i=M(),f=$("div"),f.innerHTML=h,E=M(),C=$("div"),C.innerHTML=U,G=M(),B(q.$$.fragment),this.h()},l(b){e=T(b,"NAV",{class:!0});var R=_(e);a=T(R,"DIV",{class:!0});var P=_(a);I(s.$$.fragment,P),l=k(P),o=T(P,"DIV",{class:!0});var Y=_(o);r=T(Y,"DIV",{class:!0});var w=_(r);n=T(w,"DIV",{class:!0,"data-svelte-h":!0}),D(n)!=="svelte-1m1f9d7"&&(n.innerHTML=p),c=k(w),g=T(w,"DIV",{class:!0,"data-svelte-h":!0}),D(g)!=="svelte-ah1bld"&&(g.innerHTML=u),i=k(w),f=T(w,"DIV",{class:!0,"data-svelte-h":!0}),D(f)!=="svelte-1upqrr6"&&(f.innerHTML=h),E=k(w),C=T(w,"DIV",{class:!0,"data-svelte-h":!0}),D(C)!=="svelte-7rlbd7"&&(C.innerHTML=U),G=k(w),I(q.$$.fragment,w),w.forEach(d),Y.forEach(d),P.forEach(d),R.forEach(d),this.h()},h(){t(n,"class","link svelte-18bagcb"),t(g,"class","link svelte-18bagcb"),t(f,"class","link svelte-18bagcb"),t(C,"class","link svelte-18bagcb"),t(r,"class","l-group svelte-18bagcb"),t(o,"class","links svelte-18bagcb"),t(a,"class","svelte-18bagcb"),t(e,"class","mobile-menu svelte-18bagcb"),W(e,"open",m[0])},m(b,R){O(b,e,R),v(e,a),N(s,a,null),v(a,l),v(a,o),v(o,r),v(r,n),v(r,c),v(r,g),v(r,i),v(r,f),v(r,E),v(r,C),v(r,G),N(q,r,null),j=!0},p(b,[R]){(!j||R&1)&&W(e,"open",b[0])},i(b){j||(H(s.$$.fragment,b),H(q.$$.fragment,b),j=!0)},o(b){V(s.$$.fragment,b),V(q.$$.fragment,b),j=!1},d(b){b&&d(e),Q(s),Q(q)}}}function ge(m,e,a){let s;return J(m,z,l=>a(0,s=l)),[s]}class _e extends A{constructor(e){super(),S(this,e,ge,pe,Z,{})}}function he(m){let e,a,s,l,o,r,n="ADD +",p,c,g='<div class="link svelte-1tcayom"><a>Overview</a></div> <div class="link svelte-1tcayom"><a>Properties</a></div> <div class="link svelte-1tcayom"><a>Banking</a></div> <div class="link svelte-1tcayom"><a>Account</a></div>',u;return l=new K({}),{c(){e=$("nav"),a=$("div"),s=$("div"),B(l.$$.fragment),o=M(),r=$("button"),r.textContent=n,p=M(),c=$("div"),c.innerHTML=g,this.h()},l(i){e=T(i,"NAV",{class:!0});var f=_(e);a=T(f,"DIV",{class:!0});var h=_(a);s=T(h,"DIV",{class:!0});var E=_(s);I(l.$$.fragment,E),E.forEach(d),o=k(h),r=T(h,"BUTTON",{class:!0,"data-svelte-h":!0}),D(r)!=="svelte-1d6pqhc"&&(r.textContent=n),p=k(h),c=T(h,"DIV",{class:!0,"data-svelte-h":!0}),D(c)!=="svelte-qhc3nt"&&(c.innerHTML=g),h.forEach(d),f.forEach(d),this.h()},h(){t(s,"class","logo svelte-1tcayom"),t(r,"class","add svelte-1tcayom"),t(c,"class","links svelte-1tcayom"),t(a,"class","svelte-1tcayom"),t(e,"class","svelte-1tcayom")},m(i,f){O(i,e,f),v(e,a),v(a,s),N(l,s,null),v(a,o),v(a,r),v(a,p),v(a,c),u=!0},p:y,i(i){u||(H(l.$$.fragment,i),u=!0)},o(i){V(l.$$.fragment,i),u=!1},d(i){i&&d(e),Q(l)}}}class $e extends A{constructor(e){super(),S(this,e,null,he,Z,{})}}function Te(m){let e,a,s,l,o,r,n,p,c;a=new ue({}),l=new _e({}),n=new $e({});const g=m[1].default,u=X(g,m,m[0],null);return{c(){e=$("div"),B(a.$$.fragment),s=M(),B(l.$$.fragment),o=M(),r=$("div"),B(n.$$.fragment),p=M(),u&&u.c(),this.h()},l(i){e=T(i,"DIV",{id:!0,class:!0});var f=_(e);I(a.$$.fragment,f),s=k(f),I(l.$$.fragment,f),o=k(f),r=T(f,"DIV",{class:!0});var h=_(r);I(n.$$.fragment,h),p=k(h),u&&u.l(h),h.forEach(d),f.forEach(d),this.h()},h(){t(r,"class","route svelte-3actq1"),t(e,"id","coreApp"),t(e,"class","svelte-3actq1")},m(i,f){O(i,e,f),N(a,e,null),v(e,s),N(l,e,null),v(e,o),v(e,r),N(n,r,null),v(r,p),u&&u.m(r,null),c=!0},p(i,[f]){u&&u.p&&(!c||f&1)&&ee(u,g,i,i[0],c?se(g,i[0],f,null):te(i[0]),null)},i(i){c||(H(a.$$.fragment,i),H(l.$$.fragment,i),H(n.$$.fragment,i),H(u,i),c=!0)},o(i){V(a.$$.fragment,i),V(l.$$.fragment,i),V(n.$$.fragment,i),V(u,i),c=!1},d(i){i&&d(e),Q(a),Q(l),Q(n),u&&u.d(i)}}}function be(m,e,a){let{$$slots:s={},$$scope:l}=e;return m.$$set=o=>{"$$scope"in o&&a(0,l=o.$$scope)},[l,s]}class Me extends A{constructor(e){super(),S(this,e,be,Te,Z,{})}}export{Me as component};
//# sourceMappingURL=0.00b9431d.js.map