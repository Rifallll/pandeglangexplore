import{c as u,N as p,r as c}from"./index-cuFoYVxF.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=u("Volume2",[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=u("VolumeX",[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=u("Waves",[["path",{d:"M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"knzxuh"}],["path",{d:"M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"2jd2cc"}],["path",{d:"M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"rd2r6e"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=u("Wind",[["path",{d:"M12.8 19.6A2 2 0 1 0 14 16H2",key:"148xed"}],["path",{d:"M17.5 8a2.5 2.5 0 1 1 2 4H2",key:"1u4tom"}],["path",{d:"M9.8 4.4A2 2 0 1 1 11 8H2",key:"75valh"}]]),x=()=>{const{isMuted:r,volume:i}=p(),n=c.useRef(null),l=c.useCallback(()=>{if(!(typeof window>"u")){if(!n.current){const s=window.AudioContext||window.webkitAudioContext;s&&(n.current=new s)}n.current&&n.current.state==="suspended"&&n.current.resume()}},[]);return{playSound:c.useCallback(s=>{if(!r)try{l();const o=n.current,t=o.createOscillator(),a=o.createGain();t.connect(a),a.connect(o.destination);const e=o.currentTime;switch(s){case"click":t.type="sine",t.frequency.setValueAtTime(800,e),t.frequency.exponentialRampToValueAtTime(300,e+.15),a.gain.setValueAtTime(i,e),a.gain.exponentialRampToValueAtTime(.01,e+.15),t.start(e),t.stop(e+.15);break;case"hover":t.type="triangle",t.frequency.setValueAtTime(300,e),t.frequency.exponentialRampToValueAtTime(500,e+.1),a.gain.setValueAtTime(i*.3,e),a.gain.exponentialRampToValueAtTime(.01,e+.1),t.start(e),t.stop(e+.1);break;case"whoosh":t.type="sine",t.frequency.setValueAtTime(200,e),t.frequency.exponentialRampToValueAtTime(600,e+.3),a.gain.setValueAtTime(i*.4,e),a.gain.exponentialRampToValueAtTime(.01,e+.3),t.start(e),t.stop(e+.3);break;case"success":t.type="sine",t.frequency.setValueAtTime(440,e),t.frequency.exponentialRampToValueAtTime(880,e+.1),a.gain.setValueAtTime(i*.2,e),a.gain.exponentialRampToValueAtTime(.01,e+.2),t.start(e),t.stop(e+.2);break}}catch(o){console.warn("Audio Context hindered by browser policy",o)}},[r,i,l])}};export{m as V,T as W,A as a,k as b,x as u};
