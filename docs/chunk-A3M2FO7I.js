import{a as V,b as O,c as F,d as $,e as B,f as M}from"./chunk-JJNJJHYY.js";import{c as D}from"./chunk-JVK5JYTY.js";import"./chunk-RACICZ5R.js";import{a as k}from"./chunk-MDSX475V.js";import{d as I,h as Y}from"./chunk-T22ABTVN.js";import{$ as E,Bb as A,Ca as s,Cb as h,Da as S,Ma as N,Sa as x,Wb as R,Za as C,ab as y,cb as P,db as f,eb as o,fb as a,ga as d,gb as T,ha as _,ib as g,kb as p,lb as u,ub as l,vb as m,wb as v,xb as b,yb as w,za as G,zb as L}from"./chunk-VBMWY7NM.js";var j=(n,t)=>t.title,z=(n,t)=>t.gamePlayer.player.name,q=(n,t)=>({"btn-success":n,"btn-secondary":t}),U=(n,t,e,i)=>({"text-gold":n,"text-silver":t,"text-bronze":e,"text-secondary":i});function J(n,t){n&1&&l(0," Loading ")}function K(n,t){if(n&1){let e=g();o(0,"h2",0),l(1,"\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0438\u0433\u0440\u043E\u043A"),a(),o(2,"h1",0),l(3),a(),o(4,"button",1),p("click",function(){d(e);let c=u();return _(c.playing())}),l(5,"\u0421\u0442\u0430\u0440\u0442!"),a()}if(n&2){let e=u();s(3),m(e.currentPlayer.name)}}function Q(n,t){if(n&1){let e=g();b(0),o(1,"button",5),p("click",function(){let c=d(e).$implicit,r=u(2);return _(r.toggleWord(c))}),o(2,"div",6),l(3),a(),o(4,"div",7),l(5),a(),o(6,"div",8),l(7),a()()}if(n&2){let e=t.$implicit,i=t.$index,c=u(2).isWordSelected(e);s(),C("ngClass",A(4,q,c,!c)),s(2),m(i+1),s(2),m(e.title),s(2),m(e.level)}}function Z(n,t){n&1&&l(0," \u0420\u0430\u0443\u043D\u0434! ")}function ee(n,t){n&1&&l(0," \u0421\u043B\u0435\u0434 \u0438\u0433\u0440\u043E\u043A! ")}function te(n,t){if(n&1){let e=g();o(0,"h1",0),l(1),a(),o(2,"div",2),P(3,Q,8,7,"button",3,j),a(),b(5),o(6,"button",4),p("click",function(){d(e);let c=L(5),r=u();return _(c?r.endRound():r.nextPlayer())}),x(7,Z,1,0)(8,ee,1,0),a()}if(n&2){let e=u();s(),v("",e.currentPlayer.name,", \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0439"),s(2),f(e.currentGamePlayer.currentWords),s(2);let i=w(e.isLastPlayerInRound());s(2),y(i?7:8)}}function ne(n,t){if(n&1){let e=g();l(0),o(1,"div",9)(2,"button",10),p("click",function(){d(e);let c=u();return _(c.toResult())}),l(3,"\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B!"),a(),o(4,"button",11),p("click",function(){d(e);let c=u();return _(c.nextPlayer())}),l(5,"\u0418\u0433\u0440\u0430\u0442\u044C \u0435\u0449\u0451!"),a()()}if(n&2){let e=u();v(" \u0420\u0430\u0443\u043D\u0434 ",e.round," \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D! ")}}function ie(n,t){if(n&1&&(o(0,"li",25)(1,"div",26),l(2),a(),o(3,"span",27),l(4),a()()),n&2){let e=t.$implicit;s(2),m(e.title),s(2),m(e.level)}}function re(n,t){if(n&1&&P(0,ie,5,2,"li",25,j),n&2){let e=u(2).$implicit;f(e.gamePlayer.successWords)}}function oe(n,t){}function ae(n,t){if(n&1&&(o(0,"ul",24),x(1,re,2,0)(2,oe,0,0),a()),n&2){let e=u().$implicit;s(),y(e.gamePlayer.successWords.length?1:2)}}function le(n,t){if(n&1&&(o(0,"div",13)(1,"h2",16)(2,"button",17)(3,"div",18),b(4),o(5,"span",19)(6,"b"),l(7),a()(),o(8,"div"),T(9,"span",20),o(10,"span",21),l(11),a()()()()(),o(12,"div",22)(13,"div",23),x(14,ae,3,1,"ng-template"),a()()()),n&2){let e=t.$implicit,i=t.$index,c=u(2),r=3-i;s(5),C("ngClass",h(5,U,r==3,r==2,r==1,r<1)),s(2),m(e.gamePlayer.player.name),s(2),C("ngClass",h(10,U,r==3,r==2,r==1,r<1))("innerHTML",c.stars(r),G),s(2),m(e.sum)}}function se(n,t){if(n&1){let e=g();o(0,"div",12),P(1,le,15,15,"div",13,z),a(),o(3,"div",9)(4,"a",14),l(5,"\u041D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E"),a(),o(6,"button",15),p("click",function(){d(e);let c=u();return _(c.nextPlayer())}),l(7,"\u0418\u0433\u0440\u0430\u0442\u044C \u0435\u0449\u0451!"),a()()}if(n&2){let e=u();s(),f(e.gamePlayerResults),s(3),C("routerLink",e.routeCreator.main())}}var H=class n{constructor(t){this.playersService=t;this.gameWordsProvider=new W(E(D))}round=1;state=0;currentPlayerNo=0;gameWordsProvider;gamePlayers=[];gamePlayerResults=[];ngOnInit(){this.initGamePlayers()}isLastPlayerInRound(){return this.gamePlayers.length==this.currentPlayerNo+1}playing(){this.state=2}nextPlayer(){this.currentPlayerNo=(this.currentPlayerNo+1)%this.gamePlayers.length,this.currentPlayerNo==0&&(this.resetCurrentWords(),this.round+=1),this.state=1}toResult(){this.gamePlayerResults=this.gamePlayers.map(t=>({gamePlayer:t,sum:t.successWords.reduce((e,i)=>(e+=i.level,e),0)})).sort((t,e)=>e.sum-t.sum),this.state=4}endRound(){this.state=3,console.log(this.gamePlayers)}get currentPlayer(){return this.currentGamePlayer.player}get currentGamePlayer(){return this.gamePlayers[this.currentPlayerNo]}toggleWord(t){let e=this.gamePlayers[this.currentPlayerNo].successWords.indexOf(t);e==-1?this.gamePlayers[this.currentPlayerNo].successWords.push(t):this.gamePlayers[this.currentPlayerNo].successWords.splice(e,1)}isWordSelected(t){return this.gamePlayers[this.currentPlayerNo].successWords.includes(t)}stars(t){return t>0?Array(t).fill("&#9733;").join(""):""}resetCurrentWords(){this.gamePlayers.forEach(t=>{t.currentWords=this.gameWordsProvider.nextWords(5)})}initGamePlayers(){this.gamePlayers=this.playersService.players.map(t=>({player:t,successWords:[],currentWords:this.gameWordsProvider.nextWords(5)})),this.state=1}routeCreator=Y;State=X;static \u0275fac=function(e){return new(e||n)(S(k))};static \u0275cmp=N({type:n,selectors:[["ng-component"]],hostAttrs:[1,"d-flex","flex-column","gap-5"],decls:5,vars:1,consts:[[1,"text-center"],[1,"btn","btn-lg","btn-warning","d-inline-flex",3,"click"],[1,"d-flex","flex-column","gap-1","h-100"],[1,"d-flex","btn","btn-lg",3,"ngClass"],[1,"overflow-hidden","btn","btn-lg","btn-warning",3,"click"],[1,"d-flex","btn","btn-lg",3,"click","ngClass"],[1,"my-auto"],[1,"m-auto"],[1,"sm-auto"],[1,"d-flex"],[1,"btn","btn-lg","btn-outline-primary",3,"click"],[1,"btn","btn-lg","btn-success",3,"click"],["ngbAccordion",""],["ngbAccordionItem",""],[1,"btn","btn-lg","btn-outline-primary","w-100",3,"routerLink"],[1,"btn","btn-lg","btn-success","w-100",3,"click"],["ngbAccordionHeader",""],["ngbAccordionButton",""],[1,"d-flex","w-100"],[1,"ms-2","me-auto",3,"ngClass"],[1,"me-2",3,"ngClass","innerHTML"],[1,"badge","text-bg-danger","rounded-pill"],["ngbAccordionCollapse",""],["ngbAccordionBody",""],[1,"list-group"],[1,"list-group-item","d-flex","justify-content-between"],[1,"ms-2","me-auto"],[1,"badge","text-bg-primary","rounded-pill"]],template:function(e,i){e&1&&x(0,J,1,0)(1,K,6,1)(2,te,9,3)(3,ne,6,1)(4,se,8,1),e&2&&y(i.state==i.State.LOADING?0:i.state==i.State.NEXT_PLAYER?1:i.state==i.State.PLAYING?2:i.state==i.State.END_ROUND?3:i.state==i.State.TO_RESULT?4:-1)},dependencies:[R,I,B,$,F,V,O,M],styles:[".text-gold[_ngcontent-%COMP%]{color:#ffd63f}.text-silver[_ngcontent-%COMP%]{color:#e4e4e4}.text-blonze[_ngcontent-%COMP%]{color:#cda132}"]})},X=(r=>(r[r.LOADING=0]="LOADING",r[r.NEXT_PLAYER=1]="NEXT_PLAYER",r[r.PLAYING=2]="PLAYING",r[r.END_ROUND=3]="END_ROUND",r[r.TO_RESULT=4]="TO_RESULT",r))(X||{}),W=class{constructor(t){this.categoriesService=t}existingWords=[];isWordExisted(t){return this.existingWords.includes(t)}nextWords(t=5){let e=[];for(;t>e.length;){let i=this.categoriesService.getRandomWord();this.isWordExisted(i)||e.includes(i)||e.push(i)}return this.existingWords.push(...e),e.sort((i,c)=>i.level-c.level)}};export{H as GameComponent};
