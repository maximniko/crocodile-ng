import{a as O}from"./chunk-TOK7MGCF.js";import{a as N}from"./chunk-2OPUGC6W.js";import{$ as g,$a as D,Ca as c,Ea as j,Fa as k,K as n,L as u,La as w,Ma as F,Q as M,V as v,Va as T,Z as s,_a as B,ab as A,da as o,ea as r,ka as C,ta as l,ua as p,va as f,xa as y,ya as S,za as x}from"./chunk-ODBTYP5G.js";var R=(t,a)=>({"alert alert-success mb-0 text-success":t,"tg-color-accent":a}),q=(t,a)=>({"tg-btn-outline":t,"btn-outline-success":a}),H=(t,a)=>({"disabled btn-outline-secondary":t,"btn-lg tg-btn":a}),G=(t,a)=>({"text-bg-success":t,"tg-btn":a});function J(t,a){if(t&1&&(o(0,"div",1)(1,"span",11),l(2),r()()),t&2){let i,e=C();n(2),p((i=e.l.messages.SelectPlayers)!==null&&i!==void 0?i:"Select players")}}function K(t,a){if(t&1&&(o(0,"span",6),l(1),r()),t&2){C();let i=x(0),e=x(10);s("ngClass",c(2,G,i,!i)),n(),p(e==null?null:e.length)}}function Q(t,a){if(t&1&&(o(0,"div",1)(1,"span",11),l(2),r()()),t&2){let i,e=C();n(2),p((i=e.l.messages.ChooseCategories)!==null&&i!==void 0?i:"Choose categories")}}function U(t,a){if(t&1&&(o(0,"span",6),l(1),r()),t&2){let i=C(),e=x(13);s("ngClass",c(2,G,e,!e)),n(),p(i.categoriesService.selected.length)}}var z=class t{constructor(a,i,e,_){this.twa=a;this.l=i;this.playersService=e;this.categoriesService=_}ngOnInit(){this.twa.visibleBackButton(!1)}emptyPlayers(){return this.playersService.players.length===0}emptySelectedCategories(){return this.categoriesService.selected.length===0}routeCreator=A;static \u0275fac=function(i){return new(i||t)(u(B),u(D),u(N),u(O))};static \u0275cmp=M({type:t,selectors:[["ng-component"]],hostAttrs:[1,"d-flex","flex-column","gap-5"],decls:28,vars:37,consts:[[1,"vstack",3,"ngClass"],[1,"d-flex","justify-content-center"],[1,"d-flex","justify-content-around"],[1,"d-flex","ms-3"],[1,"m-auto"],[1,"btn","btn-lg",3,"routerLink","ngClass"],[1,"badge",3,"ngClass"],[1,"d-flex","justify-content-around","flex-row-reverse"],[1,"d-flex","me-3"],[1,"m-auto","tg-color-accent"],[1,"btn","rounded-5","w-75",3,"routerLink","ngClass"],[1,"text-center","pb-1"]],template:function(i,e){if(i&1&&(y(0),o(1,"div",0),v(2,J,3,1,"div",1),o(3,"div",2)(4,"div",3)(5,"div",4),l(6),r()(),o(7,"div",1)(8,"a",5),l(9),y(10),j(11,"async"),v(12,K,2,5,"span",6),r()()()(),y(13),o(14,"div",0),v(15,Q,3,1,"div",1),o(16,"div",7)(17,"div",8)(18,"div",9),l(19),r()(),o(20,"div",1)(21,"a",5),l(22),v(23,U,2,5,"span",6),r()()()(),y(24),o(25,"div",1)(26,"a",10),l(27),r()()),i&2){let _,b,L,I,P,d=S(e.emptyPlayers());n(),s("ngClass",c(22,R,d,!d)),n(),g(d?2:-1),n(4),f(" ",(_=e.l.messages.Step)!==null&&_!==void 0?_:"Step"," 1 "),n(2),s("routerLink",e.routeCreator.players())("ngClass",c(25,q,!d,d)),n(),f(" ",(b=e.l.messages.Players)!==null&&b!==void 0?b:"Players"," "),n();let h=S(k(11,18,e.playersService.playersSubject));n(2),g(h!=null&&h.length?12:-1),n();let m=S(e.emptySelectedCategories());n(),s("ngClass",c(28,R,m,!m)),n(),g(m?15:-1),n(4),f(" ",(L=e.l.messages.Step)!==null&&L!==void 0?L:"Step"," 2 "),n(2),s("routerLink",e.routeCreator.categories())("ngClass",c(31,q,!m,m)),n(),f(" ",(I=e.l.messages.Categories)!==null&&I!==void 0?I:"Categories"," "),n(),g(e.categoriesService.selected.length?23:-1);let E=!e.emptyPlayers()&&!e.emptySelectedCategories();n(3),s("routerLink",e.routeCreator.game())("ngClass",c(34,H,!E,E)),n(),p((P=e.l.messages.Play)!==null&&P!==void 0?P:"Play")}},dependencies:[T,w,F],encapsulation:2})};export{z as MainComponent};
