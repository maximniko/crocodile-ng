import{c as k}from"./chunk-JLYI2GEB.js";import{a as j}from"./chunk-QLJSH3MI.js";import{d as M,h as F}from"./chunk-DJXHVC52.js";import{Aa as d,Ja as x,Pa as m,Pb as h,Qb as E,Wa as l,Ya as y,ab as o,bb as a,hb as g,pb as s,qb as v,sb as p,tb as b,ub as _,wb as c,yb as L,za as n,zb as P}from"./chunk-FOGYDD3O.js";var I=(e,i)=>({"alert alert-success text-success":e,"text-primary":i}),w=(e,i)=>({"btn-outline-primary":e,"btn-outline-success":i}),D=(e,i)=>({"disabled btn-outline-secondary":e,"btn-lg btn-outline-success":i});function N(e,i){if(e&1&&(o(0,"span",4),s(1),a()),e&2){g();let r=_(8);n(),v(r==null?null:r.length)}}function T(e,i){if(e&1&&(o(0,"span",4),s(1),a()),e&2){let r=g();n(),v(r.categoriesService.selected.length)}}var A=class e{constructor(i,r){this.playersService=i;this.categoriesService=r}emptyPlayers(){return this.playersService.players.length===0}emptySelectedCategories(){return this.categoriesService.selected.length===0}routeCreator=F;static \u0275fac=function(r){return new(r||e)(d(j),d(k))};static \u0275cmp=x({type:e,selectors:[["ng-component"]],hostAttrs:[1,"d-flex","flex-column","gap-5"],decls:24,vars:28,consts:[[1,"justify-content-around","d-flex",3,"ngClass"],[1,"d-flex","justify-content-center","w-100"],[1,"m-auto"],[1,"btn","btn-lg",3,"routerLink","ngClass"],[1,"badge","text-bg-primary"],[1,"justify-content-around","d-flex","flex-row-reverse",3,"ngClass"],[1,"d-flex","px-4"],[1,"btn","w-100",3,"routerLink","ngClass"]],template:function(r,t){if(r&1&&(p(0),o(1,"div",0)(2,"div",1)(3,"div",2),s(4," \u0428\u0430\u0433 1 "),a()(),o(5,"div",1)(6,"a",3),s(7," \u0418\u0433\u0440\u043E\u043A\u0438 "),p(8),L(9,"async"),m(10,N,2,1,"span",4),a()()(),p(11),o(12,"div",5)(13,"div",1)(14,"div",2),s(15," \u0428\u0430\u0433 2 "),a()(),o(16,"div",1)(17,"a",3),s(18," \u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 "),m(19,T,2,1,"span",4),a()()(),p(20),o(21,"div",6)(22,"a",7),s(23,"Play"),a()()),r&2){let u=t.emptyPlayers();n(),l("ngClass",c(13,I,u,!u)),n(5),l("routerLink",t.routeCreator.players())("ngClass",c(16,w,!u,u)),n(2);let C=b(P(9,10,t.playersService.playersSubject));n(2),y(C!=null&&C.length?10:-1);let f=t.emptySelectedCategories();n(2),l("ngClass",c(19,I,f,!f)),n(5),l("routerLink",t.routeCreator.categories())("ngClass",c(22,w,!t.emptySelectedCategories(),t.emptySelectedCategories())),n(2),y(t.categoriesService.selected.length?19:-1);let S=!t.emptyPlayers()&&!t.emptySelectedCategories();n(3),l("routerLink",t.routeCreator.game())("ngClass",c(25,D,!S,S))}},dependencies:[M,h,E],encapsulation:2})};export{A as MainComponent};