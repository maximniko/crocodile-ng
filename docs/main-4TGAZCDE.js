import{a as N,b as O,c as r}from"./chunk-JLYI2GEB.js";import{a as A,b as R,d as E,e as s,f as j,g as k,h as T,i as H}from"./chunk-DJXHVC52.js";import{Aa as I,Bb as F,Ja as i,Sa as S,T as g,Wa as b,Wb as P,Xb as D,Yb as M,Z as y,ab as p,bb as a,cb as m,ga as w,pb as x,r as C,za as h}from"./chunk-FOGYDD3O.js";var c=[...H];var q={scrollPositionRestoration:"top",anchorScrolling:"enabled"},G=j(q),L=s(c,k(),G);var l=class e extends r{static \u0275fac=(()=>{let t;return function(n){return(t||(t=w(e)))(n||e)}})();static \u0275prov=g({token:e,factory:e.\u0275fac,providedIn:"root"})};var B=[{provide:r,useClass:N.production?r:l}];var z=[F({eventCoalescing:!0}),s(c),L,P(M(),D()),...B,S(()=>C(y(r).categoriesSubject))];var V={providers:z};var d=class e{routeCreator=T;static \u0275fac=function(o){return new(o||e)};static \u0275cmp=i({type:e,selectors:[["app-header"]],decls:4,vars:1,consts:[[1,"navbar","navbar-dark","bg-dark"],[1,"container"],[1,"navbar-brand",3,"routerLink"]],template:function(o,n){o&1&&(p(0,"nav",0)(1,"div",1)(2,"a",2),x(3,"Crocodile"),a()()()),o&2&&(h(2),b("routerLink",n.routeCreator.main()))},dependencies:[E],encapsulation:2})};var f=class e{static \u0275fac=function(o){return new(o||e)};static \u0275cmp=i({type:e,selectors:[["app-footer"]],decls:0,vars:0,template:function(o,n){},encapsulation:2})};var u=class e{constructor(t){this.twa=t}ngOnInit(){this.twa.ready(),this.twa.expand()}static \u0275fac=function(o){return new(o||e)(I(O))};static \u0275cmp=i({type:e,selectors:[["app-root"]],decls:5,vars:0,consts:[[1,"d-flex","flex-column","h-100","justify-content-between"],[1,"overflow-auto","p-2"]],template:function(o,n){o&1&&(p(0,"main",0),m(1,"app-header"),p(2,"div",1),m(3,"router-outlet"),a(),m(4,"app-footer"),a())},dependencies:[R,d,f],encapsulation:2})};A(u,V).catch(e=>console.error(e));