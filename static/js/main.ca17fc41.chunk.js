(this["webpackJsonpsolar-system"]=this["webpackJsonpsolar-system"]||[]).push([[0],{16:function(e){e.exports=JSON.parse('{"planets":[{"name":"Mercury","perihelion":46,"aphelion":69.8,"mass":0.33,"temperature":167,"diameter":4879,"color":"#bdc3c7","image":"./mercury.jpg","orbitalPeriod":88,"dayLength":4222.6},{"name":"Venus","perihelion":107.5,"aphelion":108.9,"mass":4.87,"temperature":464,"diameter":12104,"color":"#e67e22","image":"./venus.jpg","orbitalPeriod":224.7,"dayLength":2802},{"name":"Earth","perihelion":147.1,"aphelion":152.1,"mass":5.97,"temperature":15,"diameter":12756,"color":"#1e3799","image":"./earth.jpg","orbitalPeriod":365.2,"dayLength":24},{"name":"Mars","perihelion":206.6,"aphelion":249.2,"mass":0.642,"temperature":-65,"diameter":6792,"color":"#e58e26","image":"./mars.jpg","orbitalPeriod":687,"dayLength":24.7},{"name":"Jupiter","perihelion":740.5,"aphelion":816.6,"mass":1898,"temperature":-110,"diameter":142984,"color":"#D6CFBA","image":"./jupiter.jpg","orbitalPeriod":4331,"dayLength":9.9},{"name":"Saturn","perihelion":1352.6,"aphelion":1514.5,"mass":568,"temperature":-140,"diameter":120536,"color":"#CBB272","image":"./saturn.jpg","orbitalPeriod":10747,"dayLength":10.7},{"name":"Uranus","perihelion":2741.3,"aphelion":3003.6,"mass":86.8,"temperature":-195,"diameter":51118,"color":"#81ecec","image":"./uranus.jpg","orbitalPeriod":30589,"dayLength":17.2},{"name":"Neptune","perihelion":4495.1,"aphelion":4444.5,"mass":102,"temperature":-200,"diameter":49528,"color":"#2980b9","image":"./neptune.jpg","orbitalPeriod":59800,"dayLength":16.1}]}')},21:function(e,a,t){e.exports=t(33)},26:function(e,a,t){},33:function(e,a,t){"use strict";t.r(a);var r=t(0),n=t.n(r),o=t(14),i=t.n(o),m=(t(26),t(3)),c=t(5),l=t(15),s=t(1),p=t(16);Object(c.b)({OrbitControls:l.a});var u=function(e){var a=Object(c.f)(),t=a.gl,o=a.camera,i=Object(r.useRef)();return Object(c.e)((function(){return i.current.update()})),n.a.createElement("orbitControls",Object.assign({ref:i,args:[o,t.domElement]},e))};function h(e){var a=Object(r.useRef)(),t=Object(r.useRef)(),o=[e.diameter/15e4,32,32],i=Object(c.d)(s.TextureLoader,["planets/".concat(e.image)]),l=Object(m.a)(i,1)[0],p=Math.random()*Math.PI*2,u=Math.cos(p)*e.aphelion,h=Math.sin(p)*e.aphelion,d=Object(r.useMemo)((function(){return[u/50,0,h/50]}),[u,h]);return Object(c.c)((function(){a.current.rotation.y+=1/e.orbitalPeriod,t.current.rotation.y+=1/e.dayLength})),n.a.createElement("group",{ref:a},n.a.createElement("mesh",{ref:t,position:d,castShadow:!0},n.a.createElement("sphereBufferGeometry",{attach:"geometry",args:o}),n.a.createElement("meshStandardMaterial",{attach:"material",map:l,roughness:1})))}function d(){var e=Object(c.d)(s.TextureLoader,["planets/sun.jpg"]),a=Object(m.a)(e,1)[0];return n.a.createElement("mesh",{position:[0,0,0]},n.a.createElement("sphereBufferGeometry",{attach:"geometry",args:[.557012,32,32]}),n.a.createElement("meshBasicMaterial",{attach:"material",map:a,fog:!1}),n.a.createElement("pointLight",{distance:6100,color:"white"}))}i.a.render(n.a.createElement((function(){return n.a.createElement(c.a,{shadowMap:!0,camera:{position:[0,0,3]}},n.a.createElement("ambientLight",{intensity:.2}),n.a.createElement(u,{autoRotate:!0,enablePan:!1,enableZoom:!0,enableDamping:!0,dampingFactor:.5,rotateSpeed:.5}),n.a.createElement(r.Suspense,{fallback:null},n.a.createElement(d,null),p.planets.map((function(e,a){return n.a.createElement(h,Object.assign({},e,{index:a,key:e.name}))}))))}),null),document.getElementById("root"))}},[[21,1,2]]]);
//# sourceMappingURL=main.ca17fc41.chunk.js.map