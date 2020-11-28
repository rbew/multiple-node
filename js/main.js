!function(){"use strict";var e,t,n,i,o={init:function(t){(function(t){var n=window.webkitAudioContext?window.webkitAudioContext:window.AudioContext;if(n){if(!(e=new n))throw new Error("Could not create Audio Context")}else i=document.createElement("audio")})(),n=t,navigator.userAgent.match(/mobile/i)?(console.log("We're on mobile and wait for touch to init AudioContext."),document.body.addEventListener("touchstart",a,!1)):a()},play:r,stop:function(){if(i)return void i.pause();if(!e)return;e.request&&(s("Cancelling existing request."),e.request.abort(),delete e.request);if(e.source){var t={gain:e.gain,source:e.source};s("Fading out old sound");var n=t.gain.gain,o=n.value;n.cancelScheduledValues(e.currentTime),n.setValueAtTime(o,e.currentTime),setTimeout(function(){n.linearRampToValueAtTime(0,e.currentTime+1)},0),setTimeout(function(){s("Stopping and disconnecting old sound"),t.source.stop(),t.source.disconnect(),t.gain.disconnect()},4e3),delete e.source,delete e.gain}},ready:!1};function a(s){if(o.ready=!0,document.body.removeEventListener("touchstart",a,!1),!i){console.log("Starting audio context to play some fancy chart sound.");var c=e.createBuffer(1,1,22050),l=e.createBufferSource();l.buffer=c,l.connect(e.destination),l.start?l.start(0):l.play?l.play(0):l.noteOn&&l.noteOn(0),t&&(r(t),t=null),n&&n()}}function r(n){if(i)return i.src=n,void i.play();if(e){var o=new XMLHttpRequest;e.request=o,o.open("GET",function(e){var t=e.split("/");return location.host.indexOf("hitparade")>0?"map/audio/"+t.pop():"//go.hinderlingvolkart.com/hitparade/song.php?"+e}(n),!0),o.responseType="arraybuffer",o.onload=function(){console.log("Loaded",n),e.decodeAudioData(o.response,a)},console.log("Requesting",n),o.send()}else t=n;function a(t){0!==o.status?(e.request==o&&delete e.request,console.log("Decoded - will now play",n),e.gain=e.createGain(),e.gain.connect(e.destination),e.gain.gain.setValueAtTime(0,e.currentTime),e.gain.gain.linearRampToValueAtTime(1,e.currentTime+2),e.source=e.createBufferSource(),e.source.connect(e.gain),e.source.buffer=t,e.source.start()):console.log("Decoded - but request was cancelled",n)}}function s(){console.log.apply(console,arguments)}var c=new THREE.Matrix4;function l(e){return e.clone().applyMatrix4(c)}var u={updateCamera:function(e){c.multiplyMatrices(e.projectionMatrix,c.getInverse(e.matrixWorld))},project:l,projectToScreen:function(e,t,n){return(e=l(e)).x=t/2+e.x*(t/2),e.y=n/2-e.y*(n/2),e}},d=[];window.canvasfactory=d;var h={put:function(e){d.push(e)},get:function(e,t){for(var n,i=d.length-1;i>=0;i--)if((n=d[i]).width===e&&n.height===t)return d.splice(i,1),n.getContext("2d").clearRect(0,0,e,t),n;return d.length?((n=d.pop()).width=e,n.height=t,n):function(e,t){var n=document.createElement("canvas");return n.width=e,n.height=t,n}(e,t)}},m=document.createElement("canvas").getContext("2d"),f={scale:.1,precision:1};function p(e,t){for(var n in t)m[n]=t[n];var i=m.measureText(e),o=i.width,a=t.lineHeight;return a||(a=(i=m.measureText("M")).width),{width:o,height:a}}window.textSpriteStats={created:0,rendered:0,disposed:0};var v={artist:{font:"900 12px Avenir",lineHeight:16},title:{font:"500 20px Avenir",lineHeight:24},date:{font:"500 12px Avenir",lineHeight:32}};function g(e,t,n){textSpriteStats.created++;var i,o=f.precision,a=THREE.Math.ceilPowerOfTwo(e),r=THREE.Math.ceilPowerOfTwo(t),s=new THREE.MeshBasicMaterial({map:null,transparent:!0,visible:!1}),c=!0,l=new THREE.Mesh(new THREE.PlaneGeometry(a,r),s);return l.__update=function(){if(c){textSpriteStats.rendered++;var e=h.get(a*o,r*o),t=e.getContext("2d");t.save(),t.scale(o,o),n(t,a,r),t.restore(),(i=new THREE.Texture(e)).needsUpdate=!0,c=!1,s.map=i,s.visible=!0}},l.__dispose=function(){c||(i&&(textSpriteStats.disposed++,i.dispose(),i.image&&h.put(i.image),i.image=null),i=null,s.map=null,s.visible=!1,c=!0)},l.contentWidth=e,l.contentHeight=t,l.scale.set(f.scale,f.scale,f.scale),l}var E,w,T={make:function(e,t){var n="object"==typeof e?e:[e],i="";n.forEach(function(e){e.length>i.length&&(i=e)});var o=p(i,t);return delete t.lineHeight,g(o.width,o.height*n.length+.6*o.height+24,function(e,i,a){var r=o.height,s=0;for(var c in"center"===t.textAlign?s=i/2:"right"===t.textAlign&&(s=i),t)e[c]=t[c];n.forEach(function(t){e.fillText(t,s,r),r+=o.height})})},song:function(e,t){var n={artist:e.artist.toUpperCase(),title:e.title,date:new Date(e.best.date).toLocaleDateString("en",{day:"numeric",month:"short",year:"numeric"}).toUpperCase()},i=0,o=0;for(var a in n){var r=p(n[a],v[a]);"date"===a&&(r.width+=34),o+=r.height,r.width>i&&(i=r.width)}return delete t.lineHeight,g(i,o,function(i,o,a){function r(e){for(var n in t)i[n]=t[n];for(var n in v[e])i[n]=v[e][n]}var s=0;s+=16,r("artist"),i.fillText(n.artist,0,s),s+=23,r("title"),i.fillText(n.title,0,s),s+=17,i.beginPath(),i.arc(12,s+3,12,0,2*Math.PI,!0),i.fillStyle=t.fillStyle,i.fill();var c=p(e.best.rank,v.artist);r("artist"),i.fillStyle="#050129",i.fillText(e.best.rank,12-c.width/2,s+8),r("date"),i.fillText(n.date,34,s+8)})},rank:function(e,t){return g(24,24,function(n,i,o){var a=0,r=0;r+=(i-24)/2,a+=(o-24)/2,a+=12,n.beginPath(),n.arc(r+12,a,12,0,2*Math.PI,!0),n.fillStyle=t.fillStyle,n.fill();var s=p(e.rank,v.artist);!function(e){for(var i in t)n[i]=t[i];for(var i in v[e])n[i]=v[e][i]}("artist"),n.fillStyle="#050129",n.fillText(e.rank,r+12-s.width/2,a+4.5)})},config:f},y={particle:{vertex:"\n\tuniform float size;\n\tattribute vec3 color;\n\tvarying vec3 vColor;\n\tuniform float scale;\n\t"+THREE.ShaderChunk.common+"\n\t"+THREE.ShaderChunk.fog_pars_vertex+"\n\n\tvoid main() {\n\t\tvColor = color;\n\t\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\t\tgl_PointSize = 2000.0 / length( mvPosition.xyz );\n\t\tgl_Position = projectionMatrix * mvPosition;\n\t\t"+THREE.ShaderChunk.fog_vertex+"\n\t}\n",fragment:"\n\tuniform sampler2D texture;\n\tvarying vec3 vColor;\n\t"+THREE.ShaderChunk.common+"\n\t"+THREE.ShaderChunk.fog_pars_fragment+"\n\n\tvoid main() {\n\t\tvec4 texColor = texture2D( texture, gl_PointCoord );\n\n\t\tfloat fogFactor = 0.0;\n\n\t\t#ifdef USE_FOG\n\t\t\t#ifdef FOG_EXP2\n\t\t\t\tfogFactor = whiteCompliment( exp2( - fogDensity * fogDensity * fogDepth * fogDepth * LOG2 ) );\n\t\t\t#else\n\t\t\t\tfogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\t\t\t#endif\n\t\t#endif\n\n\t\tgl_FragColor = texColor * vec4(vColor, 1.0 - fogFactor);\n\t}\n"}},b=0,S=4e3,x=25e3,M=10368e6,R=46656e6,H=2592e6;var D,L,C,O,I={init:function(e){E=e,w=!1},requestAt:function(e,t){var n=(new Date).getTime(),i=n-b,o=w?M:R;if(!(i<S))return i>x||!t||t&&Math.abs(e-t.best.timestamp)>o?(b=n,function(e,t){var n=Object.values(E.songs).filter(function(t){return Math.abs(t.best.timestamp-e)<H&&function(e){for(var t=0,n=0;n<e.entries.length;n++){var i=u.project(e.entries[n].vertex);Math.abs(i.x)<=1&&Math.abs(i.y)<=1&&t++}return t>=e.entries.length/3}(t)});if(n.indexOf(t)>=0&&n.splice(n.indexOf(t),1),console.log("Found",n.length,"around",new Date(e)),n.length)return n[Math.floor(Math.random()*n.length)]}(e,t)):void 0},disable:function(){w=!1},enable:function(){w=!0}},q=function(e,t){this.camera=e,this.quaternion=new THREE.Quaternion,this.element=t||document,this.freeze=!0,this.enableManualDrag=!1,this.enableManualZoom=!1,this.deviceOrientation={},this.screenOrientation=window.orientation||0;var n,i,o,a,r,s=0,c=0,l=0,u=0,d=new THREE.Quaternion,h=1,m=1,f=new THREE.Vector2,p=new THREE.Vector2,v=0,g=1,E=2,w=v,T="compassneedscalibration",y="orientationchange",b="userinteraction",S="zoom",x="rotate",M=window.innerHeight,R=2e3*Math.tan(THREE.Math.degToRad((this.camera.fov||75)/2)),H=new THREE.Quaternion,D=function(){var e;return function(t){(e=arguments||{}).type=t,e.target=this,this.dispatchEvent(e)}.bind(this)}.bind(this)();this.constrainObjectFOV=function(){a=R*(window.innerHeight/M),r=THREE.Math.radToDeg(2*Math.atan(a/2e3)),this.camera.fov=r}.bind(this),this.onDeviceOrientationChange=function(e){this.deviceOrientation=e}.bind(this),this.onScreenOrientationChange=function(){this.screenOrientation=window.orientation||0,D(y)}.bind(this),this.onCompassNeedsCalibration=function(e){e.preventDefault(),D(T)}.bind(this),this.onDocumentMouseDown=function(e){!0===this.enableManualDrag&&(e.preventDefault(),w=g,this.freeze=!0,d.copy(this.quaternion),s=l=e.pageX,c=u=e.pageY,n=1200/window.innerWidth*.2,i=800/window.innerHeight*.2,this.element.addEventListener("mousemove",this.onDocumentMouseMove,!1),this.element.addEventListener("mouseup",this.onDocumentMouseUp,!1),D(b+"start"),D(x+"start"))}.bind(this),this.onDocumentMouseMove=function(e){l=e.pageX,u=e.pageY}.bind(this),this.onDocumentMouseUp=function(e){this.element.removeEventListener("mousemove",this.onDocumentMouseMove,!1),this.element.removeEventListener("mouseup",this.onDocumentMouseUp,!1),w=v,this.freeze=!1,D(b+"end"),D(x+"end")}.bind(this),this.onDocumentTouchStart=function(e){if(this.enableManualDrag||this.enableManualZoom)switch(e.preventDefault(),e.stopPropagation(),e.touches.length){case 1:if(!0!==this.enableManualDrag)return;w=g,this.freeze=!0,d.copy(this.quaternion),s=l=e.touches[0].pageX,c=u=e.touches[0].pageY,n=1200/window.innerWidth*.1,i=800/window.innerHeight*.1,this.element.addEventListener("touchmove",this.onDocumentTouchMove,!1),this.element.addEventListener("touchend",this.onDocumentTouchEnd,!1),D(b+"start"),D(x+"start");break;case 2:if(!0!==this.enableManualZoom)return;w=E,this.freeze=!0,o=this.camera.fov,f.set(e.touches[0].pageX,e.touches[0].pageY),p.set(e.touches[1].pageX,e.touches[1].pageY),h=m=f.distanceTo(p),this.element.addEventListener("touchmove",this.onDocumentTouchMove,!1),this.element.addEventListener("touchend",this.onDocumentTouchEnd,!1),D(b+"start"),D(S+"start")}}.bind(this),this.onDocumentTouchMove=function(e){switch(e.touches.length){case 1:l=e.touches[0].pageX,u=e.touches[0].pageY;break;case 2:f.set(e.touches[0].pageX,e.touches[0].pageY),p.set(e.touches[1].pageX,e.touches[1].pageY)}}.bind(this),this.onDocumentTouchEnd=function(e){this.element.removeEventListener("touchmove",this.onDocumentTouchMove,!1),this.element.removeEventListener("touchend",this.onDocumentTouchEnd,!1),w===g?(w=v,this.freeze=!1,D(b+"end"),D(x+"end")):w===E&&(this.constrainObjectFOV(),w=v,this.freeze=!1,D(b+"end"),D(S+"end"))}.bind(this);var L,C,O,I,q,N,_,z,P,F,A,j,k,V,Q,W,Y,X,G,Z,B=(L=new THREE.Quaternion,C=new THREE.Euler,O=new THREE.Quaternion,I=new THREE.Quaternion(-Math.sqrt(.5),0,0,Math.sqrt(.5)),q=0,function(e,t,n,i){return C.set(t,e,-n,"YXZ"),L.setFromEuler(C),q=-i/2,O.set(0,Math.sin(q),0,Math.cos(q)),L.multiply(O),L.multiply(I),L});!function(){var e=new THREE.Matrix4,t=new THREE.Euler,n=new THREE.Euler,i=new THREE.Euler(-Math.PI/2,0,0,"YXZ"),o=new THREE.Matrix4,a=new THREE.Matrix4;a.makeRotationFromEuler(i)}();this.updateManualMove=(V=new THREE.Euler(0,0,0,"YXZ"),Q=new THREE.Quaternion,W=new THREE.Quaternion,function(){W.copy(d),w===g?(N=(c-u)*i,_=(s-l)*n,z=THREE.Math.degToRad(N),P=THREE.Math.degToRad(_),Q.set(0,Math.sin(P/2),0,Math.cos(P/2)),W.multiply(Q),Q.set(Math.sin(z/2),0,0,Math.cos(z/2)),W.multiply(Q),F=V.setFromQuaternion(d,"YXZ").z,A=V.setFromQuaternion(W,"YXZ").z,j=V.setFromQuaternion(H||d,"YXZ").z,Q.set(0,0,Math.sin((j-F)/2),Math.cos((j-F)/2)),d.multiply(Q),Q.set(0,0,Math.sin((j-A)/2),Math.cos((j-A)/2)),W.multiply(Q),this.quaternion.copy(W)):w===E&&(m=f.distanceTo(p),(k=h/m)<=1&&(this.camera.fov=o*k,this.camera.updateProjectionMatrix()),H&&(F=V.setFromQuaternion(d,"YXZ").z,j=V.setFromQuaternion(H,"YXZ").z,Q.set(0,0,Math.sin((j-F)/2),Math.cos((j-F)/2)),d.multiply(Q),this.quaternion.copy(d)))}),this.updateDeviceMove=function(){if(Y=THREE.Math.degToRad(this.deviceOrientation.alpha||0),X=THREE.Math.degToRad(this.deviceOrientation.beta||0),G=THREE.Math.degToRad(this.deviceOrientation.gamma||0),Z=THREE.Math.degToRad(this.screenOrientation||0),0!==Y&&0!==X&&0!==G){if(H=B(Y,X,G,Z),this.initialQuat||(this.initialQuat=H.clone().conjugate()),this.freeze)return;this.quaternion.copy(H.clone().premultiply(this.initialQuat))}},this.update=function(){this.updateDeviceMove(),w!==v&&this.updateManualMove()},this.connect=function(){window.addEventListener("resize",this.constrainObjectFOV,!1),window.addEventListener("orientationchange",this.onScreenOrientationChange,!1),window.addEventListener("deviceorientation",this.onDeviceOrientationChange,!1),window.addEventListener("compassneedscalibration",this.onCompassNeedsCalibration,!1),this.element.addEventListener("mousedown",this.onDocumentMouseDown,!1),this.element.addEventListener("touchstart",this.onDocumentTouchStart,!1),this.freeze=!1},this.disconnect=function(){this.freeze=!0,window.removeEventListener("resize",this.constrainObjectFOV,!1),window.removeEventListener("orientationchange",this.onScreenOrientationChange,!1),window.removeEventListener("deviceorientation",this.onDeviceOrientationChange,!1),window.removeEventListener("compassneedscalibration",this.onCompassNeedsCalibration,!1),this.element.removeEventListener("mousedown",this.onDocumentMouseDown,!1),this.element.removeEventListener("touchstart",this.onDocumentTouchStart,!1)}};function N(e){e.preventDefault();var t=e.currentTarget.getAttribute("href");z(document.querySelector(t))}function _(e){e.preventDefault(),P(e.target.parentNode)}function z(e){D.classList.add("has-overlay"),e.classList.add("is-active"),setTimeout(function(){e.classList.add("is-appearing")},50),setTimeout(function(){e.classList.add("is-visible")},550),O=e}function P(e){(e=e||O)&&(e.classList.remove("is-visible","is-appearing"),setTimeout(function(){e.classList.remove("is-active"),D.classList.remove("has-overlay"),O=void 0},250))}q.prototype=Object.create(THREE.EventDispatcher.prototype);var F,A={init:function(){D=document.querySelector("html"),L=document.querySelectorAll("#nav a"),C=document.querySelectorAll(".Overlay--close"),function(){for(var e=0;e<L.length;e++){var t=L[e];t.addEventListener("click",N)}for(var e=0;e<C.length;e++){var n=C[e];n.addEventListener("click",_)}}()},open:z,close:P};function j(){}j.delay=1e3,j.speed=1e3,j.init=function(e){this.options=e},j.scrollTo=function(e,t){var n=new TWEEN.Tween(document.scrollingElement||document.documentElement).to({scrollTop:e},j.speed).easing(TWEEN.Easing.Quadratic.InOut);return t||n.start(),n},j.scrollToTime=function(e){return this.scrollTo(this.options.timeToScroll(e))},j.scrollMany=function(e,t){var n,i;e.forEach(function(e){var o=j.scrollTo(e,!0);n&&n.chain(o),i||(i=o),o.delay(t||j.delay),n=o}),i&&i.start()},j.scrollSong=function(){this.scrollMany(Array.prototype.map.call(arguments,function(e){var t=j.options.songs[e].best.timestamp;return j.options.timeToScroll(t-432e7)}))};var k={init:function(e){F=e,document.body.addEventListener("keydown",function(e){107!==e.keyCode&&65!==e.keyCode||function(e){if(F.favorites||(F.favorites={},localStorage.getItem("favorites")&&(F.favorites=JSON.parse(localStorage.getItem("favorites")))),F.favorites[e.id])return function(e){F.favorites||(F.favorites={}),delete F.favorites[e.id],console.log("Favorite removed. You have ",Object.values(F.favorites).length,"songs saved.",F.favorites)}(e);F.favorites[e.id]=e,console.log("Favortes saved. You have ",Object.values(F.favorites).length,"songs saved.",F.favorites)}(F.selectedSong)})}};function V(){return new Promise(function(e,t){var n=document.querySelector("html"),i=document.querySelector("body"),o=document.querySelector("#logo"),a=document.querySelector(".YearLabel"),r=(document.querySelector(".Stage--canvas"),document.querySelector("#nav")),s=function(){this.steps=[],this.hasRunningSteps=!1};s.prototype.add=function(e,t){this.steps.push({fn:e,delay:t}),this.hasRunningSteps||this.next()},s.prototype.next=function(){if(0!==this.steps.length){this.hasRunningSteps=!0;var e=this.steps[0];this.steps.splice(0,1),setTimeout(function(){e.fn(this.next.bind(this))}.bind(this),e.delay)}else this.hasRunningSteps=!1};var c=new s;c.add(function(e){var t;(t=document.querySelector(".js-yearCount")).actualNumber=t.textContent,t.textContent=1,e()},0),c.add(function(e){i.classList.add("has-background"),a.classList.add("is-appearing"),e()},250),c.add(function(e){!function(){var e=document.querySelector(".js-yearCount"),t=parseInt(e.actualNumber,10),n=!1,i=new TWEEN.Tween({count:1});i.to({count:t},2e3),i.easing(TWEEN.Easing.Quartic.Out),i.onUpdate(function(t){e.textContent=Math.round(t.count)}),i.onComplete(function(){n=!0}),i.start(),requestAnimationFrame(function e(t){if(n)return;requestAnimationFrame(e);i.update(t)})}(),e()},400),c.add(function(e){a.classList.add("is-disappearing"),e()},2100),c.add(function(t){n.classList.remove("has-intro"),e(),t()},1250),c.add(function(e){a.classList.add("is-active"),e()},1e3),c.add(function(e){o.classList.add("is-active"),r.classList.add("is-active"),e()},1e3)})}var Q,W=new THREE.Euler,Y=Math.PI/3,X=!1,G={};function Z(){G.orientation.initialQuat=null}var B={init:function(e,t){G.camera=e,G.orientation=t,(Q=document.querySelector(".js-reset-orientation")).addEventListener("click",Z)},validate:function(){W.setFromQuaternion(G.camera.quaternion);var e=G.orientation.initialQuat&&(Math.abs(W.x)>Y||Math.abs(W.y)>Y||Math.abs(W.z)>Y);e!==!!X&&(e?(X=!0,Q.classList.add("is-visible")):(X=!1,Q.classList.remove("is-visible")))}},U=function(e,t){function n(t){var n,i,o=this;this.eyeSeparation=3,this.focalLength=15,Object.defineProperties(this,{separation:{get:function(){return o.eyeSeparation},set:function(e){console.warn("THREE.StereoEffect: .separation is now .eyeSeparation."),o.eyeSeparation=e}},targetDistance:{get:function(){return o.focalLength},set:function(e){console.warn("THREE.StereoEffect: .targetDistance is now .focalLength."),o.focalLength=e}}});var a,r,s,c,l,u,d,h,m,f=new e.Vector3,p=new e.Quaternion,v=new e.Vector3,g=new e.PerspectiveCamera,E=new e.PerspectiveCamera;t.autoClear=!1,this.setSize=function(e,o){n=e/2,i=o,t.setSize(e,o)},this.render=function(o,w){o.updateMatrixWorld(),null===w.parent&&w.updateMatrixWorld(),w.matrixWorld.decompose(f,p,v),a=e.Math.radToDeg(2*Math.atan(Math.tan(.5*e.Math.degToRad(w.fov))/w.zoom)),u=w.near/this.focalLength,h=Math.tan(.5*e.Math.degToRad(a))*this.focalLength,d=.5*h*w.aspect,l=-(c=h*u),m=(d+this.eyeSeparation/2)/(2*d),r=2*d*u*(1-m),s=2*d*u*m,g.projectionMatrix.makeFrustum(-r,s,l,c,w.near,w.far),g.position.copy(f),g.quaternion.copy(p),g.translateX(-this.eyeSeparation/2),E.projectionMatrix.makeFrustum(-s,r,l,c,w.near,w.far),E.position.copy(f),E.quaternion.copy(p),E.translateX(this.eyeSeparation/2),t.clear(),t.setScissorTest(!0),t.setScissor(0,0,n,i),t.setViewport(0,0,n,i),t.render(o,g),t.setScissor(n,0,n,i),t.setViewport(n,0,n,i),t.render(o,E),t.setScissorTest(!1)}}return n.prototype=Object.create(e.EventDispatcher.prototype),n.prototype.constructor=n,n}(THREE);window.onload=function(){new THREE.Raycaster;var e,t,n,i,a,r,s,c,l,d,h,m,f=new THREE.Vector2,p=(new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,[]),v=864e5,g=2,E=!1,w=!1;T.config.precision=1,A.init();var b=V(),S=new Promise(function(t,n){var i=new XMLHttpRequest;i.open("GET","data.json",!0),i.onload=function(){if(i.status>=200&&i.status<400){var n=i.responseText;e=JSON.parse(n),t(e)}},i.onerror=n,i.send()});function x(){h=window.innerWidth,m=window.innerHeight,t.setSize(h,m),i.aspect=h/m,r.setSize(h,m),i.updateProjectionMatrix(),document.body.style.height=(e.maxDate-e.minDate)/v+m+"px"}function M(e){var t=h>>1,n=m>>1;return e.x=(e.x-t)/t,e.y=(e.y-n)/n,e}function R(t){return e.minDate-t/g*v}function H(t){return-(t-e.minDate)/v*g}function D(e){return R(-e*g)}function L(e){return-H(e)/g}function C(){requestAnimationFrame(C),w&&((document.scrollingElement||document.documentElement).scrollTop+=10),a.update(),i.position.z+=(-(document.scrollingElement||document.documentElement).scrollTop*g-i.position.z)/10,window.vr?i.quaternion.copy(a.quaternion):i.quaternion.slerp(a.quaternion,.1);var o,c,d=R(i.position.z);if(u.updateCamera(i),B.validate(),p.forEach(function(e){var t=i.position.z-e.position.z-50;e.visible=t>0&&t<800,e.visible?(e.__update&&e.__update(),e.material.opacity=Math.min(.2,t/1e3)):e.__dispose&&e.__dispose()}),Object.values(e.songs).forEach(function(e){var t=i.position.z-e.label.position.z;e.label.visible=t>-100&&t<900,e.label.visible?(e.label.__update&&e.label.__update(),e.label.quaternion.copy(i.quaternion),e.label.material.opacity=.7,e.line.material.opacity=.25):e.label.__dispose&&e.label.__dispose(),e.line.visible=e.label.visible}),f.active){o=null;var E=function(e){for(var t=[],n=e.length-1;n>=0;n--){var i=e[n];N(f,i)&&t.push({object:i})}return t.sort(function(e,t){return t.object.position.z-e.object.position.z}),t}(Object.values(e.songs).map(function(e){return e.label}).filter(function(e){return e.visible}));E.length&&(o=E[0].object.song);var T=function(e,t,n){for(var i,o,a=h/2,r=m/2,s=new THREE.Vector2,c=30/a,l=30/r,d=Number.POSITIVE_INFINITY,f=-1,f=[],p=n+365*v,g=n-100*v,E=e.length-1;E>=0;E--)(o=e[E]).entry.timestamp<g||o.entry.timestamp>p||(i=u.project(o),o.world=i,i.z>=.997||i.z<0||(s.x=i.x-t.x,s.x<-c||s.x>c||(s.y=i.y+t.y,s.y<-l||s.y>l||(s.x*=a,s.y*=r,s.len=s.lengthSq()*i.z*i.z,s.len<10||s.len<d&&(d=s.len,f=[E])))));return f}(s.geometry.vertices,f,d),y=s.geometry.vertices[T];!o&&y&&(o=y.entry.song),"once"===f.active&&(f.active=!1),o?I.disable():I.enable(),O(o)}else(o=I.requestAt(d+150*v,e.selectedSong))&&O(o);if(e.selectedSong){e.selectedSong.label.visible=!1;var b=e.selectedSong.line.material,S=l.getElapsedTime()*e.selectedSong.tempo*1.4/60%1.4;b.opacity=e.selectedSong.tempo<0?1:S<.7?.3+S:1.7-S,e.selectedSong.tempo<0&&(b.opacity=1),(c=e.selectedSong).circles&&c.circles.forEach(function(e,t){e.quaternion.copy(i.quaternion)})}TWEEN.update(),t.clear(),window.vr?r.render(n,i):t.render(n,i)}function O(t){if(e.selectedSong!==t&&(e.selectedSong&&(_(e.selectedSong.line.material.color).to(new THREE.Color(16777215),1e3).start(),_(e.selectedSong.label.position).to(e.selectedSong.label.origPosition,1e3).easing(TWEEN.Easing.Quintic.InOut).start(),_(e.selectedSong.label.material).to({opacity:1},1e3).easing(TWEEN.Easing.Quintic.InOut).start(),_(e.selectedSong.label.scale).to(e.selectedSong.label.origScale,1e3).easing(TWEEN.Easing.Quintic.InOut).start(),_(e.selectedSong.circles.label.position).to(e.selectedSong.label.origPosition,1e3).easing(TWEEN.Easing.Quintic.InOut).start(),_(e.selectedSong.circles.label.scale).to(e.selectedSong.label.origScale,1e3).easing(TWEEN.Easing.Quintic.InOut).start(),(r=e.selectedSong).circles&&(r.circles.forEach(function(e,t){_(e.material).delay(100*t).to({opacity:0},500).start().onComplete(function(){e.material&&(e.material.texture&&e.material.texture.dispose(),e.material.dispose()),e.__dispose&&e.__dispose(),e.geometry&&e.geometry.dispose(),e.dispose&&e.dispose(),n.remove(e)})}),delete r.circles)),e.selectedSong=t,t)){var i=e.selectedSong.label;console.log(t.tempo,t.dance,t.valence,t),o.stop(),o.play(t.audio),function(e){T.config.precision=1,e.circles=e.entries.map(function(e,t){var i=T.rank(e,{font:"500 16px Avenir",fillStyle:"#ffffff"});return i.__update&&i.__update(),i.position.copy(e.vertex),n.add(i),i.scale.set(.001,.001,.001),_(i.scale).delay(70*t).to(new THREE.Vector3(.125,.125,.125),800).easing(TWEEN.Easing.Elastic.Out).start(),i}),T.config.precision=4;var t=T.song(e,{font:"500 16px Avenir",fillStyle:"#ffffff",lineHeight:24,textAlign:"left"});t.material.depthTest=!1,t.__update(),t.position.copy(e.label.position),n.add(t),e.circles.label=t,e.circles.push(t)}(t),i.origPosition=i.origPosition||i.position.clone(),i.origScale=i.origScale||i.scale.clone();var a={x:(i.geometry.parameters.width/2-20)*i.scale.x,y:0,z:i.position.z};_(i.position).to(a,1e3).easing(TWEEN.Easing.Quintic.InOut).start(),_(i.material).to({opacity:0},1e3).easing(TWEEN.Easing.Quintic.InOut).start(),_(e.selectedSong.circles.label.position).to(a,1e3).easing(TWEEN.Easing.Quintic.InOut).start(),_(e.selectedSong.label.scale).to(i.origScale.clone().multiplyScalar(3),1e3).easing(TWEEN.Easing.Quintic.InOut).start(),_(e.selectedSong.circles.label.scale).to(i.origScale.clone().multiplyScalar(3),1e3).easing(TWEEN.Easing.Quintic.InOut).start()}var r}function N(e,t){var n=new THREE.Vector3(Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,0),i=(t.geometry.vertices.forEach(function(e){e.x<=n.x&&e.y>=n.y&&(n=e)}),new THREE.Vector3(t.contentWidth,-t.contentHeight,0).add(n));n=u.project(n.clone().applyMatrix4(t.matrixWorld)),i=u.project(i.clone().applyMatrix4(t.matrixWorld)),n.y=-n.y,i.y=-i.y;var o=Math.min(n.x,i.x),a=Math.max(n.x,i.x),r=Math.min(n.y,i.y),s=Math.max(n.y,i.y),c=e.x,l=e.y;return c>=o&&c<=a&&l>=r&&l<=s}function _(e){return e.tween||(e.tween=new TWEEN.Tween(e)),e.tween.stop(),e.tween}Promise.all([S]).then(function(){console.log("Loaded")}),Promise.all([b]).then(function(){document.getElementById("loading").classList.add("is-active"),setTimeout(function(){if(function(){n=new THREE.Scene,(i=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,2e3)).position.set(0,0,0),u.updateCamera(i),(t=new THREE.WebGLRenderer({alpha:!0})).autoClear=!1,t.setClearColor(0,0),t.setPixelRatio(window.devicePixelRatio||window.webkitDevicePixelRatio||1),(r=new U(t)).eyeSeparation=1,document.querySelector(".Stage--canvas").appendChild(t.domElement),window.addEventListener("resize",x),n.fog=new THREE.Fog(5048870,1,1e3),d=(new THREE.TextureLoader).load("media/circle.png");var o=new THREE.ShaderMaterial({uniforms:{size:{type:"f",value:10},texture:{type:"t",value:d},fogColor:{type:"c",value:n.fog.color},fogNear:{type:"f",value:n.fog.near},fogFar:{type:"f",value:n.fog.far}},vertexShader:y.particle.vertex,fragmentShader:y.particle.fragment,blending:THREE.AdditiveBlending,transparent:!0,fog:!0,depthTest:!1});for(var h in c=new THREE.Geometry,e.minDate=Number.POSITIVE_INFINITY,e.maxDate=Number.NEGATIVE_INFINITY,e.songs)e.songs[h].id=h;e.entries.forEach(function(t){var n=e.songs[t.song];n.entries||(n.entries=[],n.minDate=Number.POSITIVE_INFINITY,n.maxDate=Number.NEGATIVE_INFINITY,n.best={rank:Number.POSITIVE_INFINITY}),n.entries.push(t),t.song=n,t.timestamp=new Date(t.date).getTime(),t.rank<n.best.rank&&(n.best=t),t.timestamp<e.minDate&&(e.minDate=t.timestamp),t.timestamp>e.maxDate&&(e.maxDate=t.timestamp),t.timestamp<n.minDate&&(n.minDate=t.timestamp),t.timestamp>n.maxDate&&(n.maxDate=t.timestamp)}),x(),e.entries.forEach(function(e){var t=e.song;t.dance<0&&(t.dance=.5+.2*Math.random()-.1),t.valence<0&&(t.valence=.5+.2*Math.random()-.1);var n=(t.dance+t.valence)/2,i=(n=2*Math.pow(n,1.5)-1)*Math.PI-.15+.3*Math.random(),o=30+15*e.rank,a=new THREE.Vector3(Math.sin(i)*o,Math.cos(i)*o,H(e.timestamp)-100);e.vertex=a,a.entry=e,e.color=new THREE.Color(16777215),c.vertices.push(a),c.colors.push(e.color)});var m=performance.now();console.log("Creating a universe for "+Object.values(e.songs).length+" songs ranked "+e.entries.length+" times."),Object.values(e.songs).forEach(function(e){e.entries=e.entries.sort(function(e,t){return t.timestamp-e.timestamp});var t=new THREE.LineBasicMaterial({color:16777215,transparent:!0,depthTest:!1});t.opacity=.3;var i=new THREE.Geometry;e.entries.forEach(function(e){i.vertices.push(e.vertex)});var o=new THREE.Line(i,t);o.visible=!1,e.line=o,n.add(o);var a=T.song(e,{font:"500 16px Avenir",fillStyle:"#ff7daf",lineHeight:24,textAlign:"left"});a.material.opacity=.6,a.material.depthTest=!1,a.position.copy(e.best.vertex),a.position.x+=(a.geometry.parameters.width-a.contentWidth)*a.scale.x/2,a.position.y+=(a.geometry.parameters.height-a.contentHeight)*a.scale.x/2,e.label=a,a.song=e,a.title=e.artist+" - "+e.title,a.visible=!1,n.add(a)}),console.log("Creating labels and lines (ms):",performance.now()-m),s=new THREE.Points(c,o),c=s.geometry.vertices,n.add(s);for(var v=1968;v<=2017;v++){var g=T.make([String(v)],{font:"900 128px Avenir",fillStyle:"#ff7daf",lineHeight:128,textAlign:"center"});g.material.depthTest=!1,g.scale.set(.35,.35,.35),g.position.z=H(new Date(v+"-10-01").getTime()),g.position.y=-20,g.material.opacity=.15,n.add(g),p.push(g)}l=new THREE.Clock,I.init(e),j.init({timeToScroll:L,scrollToTime:D,songs:e.songs}),window.Autoplay=I,window.Autoscroll=j,document.addEventListener("mousemove",function(e){if(!E){var t=new THREE.Vector2(e.clientX,e.clientY);M(t),a.quaternion.setFromEuler(new THREE.Euler(-t.y,-t.x,0))}},!1),document.addEventListener("touchstart",function(e){E||document.querySelector("html").classList.add("touch"),E=!0,w=!0},!1),document.addEventListener("touchend",function(e){w=!1},!1),t.domElement.addEventListener("click",function(e){f.set(e.clientX,e.clientY),M(f),f.active="once"},!1),document.querySelector(".js-vr")&&document.querySelector(".js-vr").addEventListener("click",function(e){!function(e){var t=document.querySelector("html");e?(t.classList.add("vr"),window.vr=!0):(t.classList.remove("vr"),window.vr=!1);x()}(!window.vr)});(a=new q(i,t.domElement)).connect(),a.addEventListener("change",function(e){}),B.init(i,a)}(),o.init(function(){R(i.position.z);e.selectedSong||I.enable()}),k.init(e),C(),document.getElementById("loading").classList.remove("is-active"),document.querySelector(".Stage--canvas").classList.add("is-active"),navigator.userAgent.match(/mobile/i)){var h=document.getElementById("mobile");h.addEventListener("click",function(){A.close(h)}),A.open(h)}},400)}),Promise.all([S,b]).then(function(){var e,t,n,i;console.log("Introduced"),e=!1,t=document.querySelector(".TutorialText"),n=0,i=!1,setInterval(function(){var o=3e4,a=(document.scrollingElement||document.documentElement).scrollTop;if(a===n){if(i||(i=Date.now()),Date.now()-i>=o){if(e)return;e=!0,t.classList.add("is-active")}}else{if(i=!1,n=a,!e)return;e=!1,t.classList.remove("is-active")}},500)}),document.body.addEventListener("touchstart",function(e){e.touches.length>1&&e.preventDefault()}),document.body.addEventListener("touchmove",function(e){e.scale>1&&(e.preventDefault(),alert("Use one finger to scroll through the experience."))})}}();