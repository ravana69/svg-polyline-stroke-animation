let pts = [],
    nPts = 12,
    lineLength = 80,
    timeScale = 0.35

const radius = 180,
      tl = gsap.timeline()

for (let i=0; i<nPts; i++){
  const c = document.createElementNS("http://www.w3.org/2000/svg", "circle"),
        angle = (i/nPts * Math.PI *2)- Math.PI/2,
        x = Math.cos(angle)*radius,
        y = Math.sin(angle)*radius
  
  pts.push( x.toFixed(2) + ',' + y.toFixed(2) + ' ')

  gsap.set(c, {
    x:250,
    y:250,
    scale:0,
    opacity:0,
    attr:{class:'c'+i, r:3, cx:x, cy:y, fill:'#fff', stroke:'none'}
  })
  
  stage.appendChild(c);  
}


for (let i=0; i<=nPts; i++){ //make + animate polygons
  const p = document.createElementNS("http://www.w3.org/2000/svg", "polyline")        
  
  gsap.set(p, {
    x:250,
    y:250,
    attr:{
      class:'line'+i,
      points:gsap.utils.wrap(pts,[i-1])+','+gsap.utils.wrap(pts,[i-3]),
      'stroke-dasharray':lineLength+' '+lineLength,
      'stroke-dashoffset':lineLength
    },
  });
  
  stage.appendChild(p);
  
  const lineTL = gsap.timeline({repeat:-1, defaults:{duration:0.4}})
    .to(p, {attr:{'stroke-dashoffset':-lineLength}, ease:'expo.inOut'}, 0.6)
  
  if (i<nPts){
    lineTL.to('.c'+i, {scale:1, opacity:1, ease:'expo.inOut', duration:0.5}, 0)
    lineTL.to('.c'+i, {scale:0, opacity:0, ease:'expo'}, 0.6)
  }
  
  tl.add( lineTL, 1-i/nPts);
}

tl.play(5).timeScale(timeScale)