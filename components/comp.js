let particles=[];
function createParticle(conatiner){
    let particle = document.createElement('div');
    particle.className= Math.random()>0.7? "particle ember": "particle ash";
    
    // random size
    const size = Math.random()*8+2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // random starting point
    particle.style.left = Math.random() * window.innerWidth + 'px';
    
    // random animation duration
    let duration  = Math.random()*10 + 8;
    particle.style.animationDuration = duration + 's';

    // drift property
    conatiner.appendChild(particle);
    particles.push(particle);

    // removing particle after its completion
    setTimeout(()=>{
        particle.parentNode.removeChild(particle);
        particles = particles.filter(p=>p!==particle);
        console.log(particles);        
    },duration*1000);
}

const particleContainer = document.getElementById("particle-container")  
for (let i = 0; i < 50; i++) {
    createParticle(particleContainer);    
}
setInterval(()=>{
    if (particles.length<100) {
        createParticle(particleContainer);
    }
},300);