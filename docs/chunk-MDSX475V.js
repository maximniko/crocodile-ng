import{V as a,k as t}from"./chunk-VBMWY7NM.js";var s=class r{constructor(){this.loadPlayers()}playersSubject=new t([]);_players=[];get players(){return this._players}set players(e){this._players=e,this.playersSubject.next(e)}loadPlayers(){let e=localStorage.getItem(o);e&&(this.players=JSON.parse(e))}savePlayers(e){localStorage.setItem(o,JSON.stringify(e)),this.players=e}static \u0275fac=function(l){return new(l||r)};static \u0275prov=a({token:r,factory:r.\u0275fac,providedIn:"root"})},o="players";export{s as a};
