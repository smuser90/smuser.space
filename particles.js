import * as PIXI from 'pixi.js';

let app = new PIXI.Application({
    width: window.innerWidth, 
    height: window.innerHeight, 
    transparent: true
});

document.body.appendChild(app.view);

let totalParticles = 200;
let radius = 50;
let particles = [];

for (let i = 0; i < totalParticles; i++) {
    let particle = new PIXI.Graphics();
    particle.beginFill(0xffffff);
    particle.drawCircle(0, 0, 2);
    particle.endFill();

    particle.x = Math.random() * app.screen.width;
    particle.y = Math.random() * app.screen.height;

    particles.push(particle);

    app.stage.addChild(particle);
}

app.ticker.add(() => {
    for (let i = 0; i < totalParticles; i++) {
        let particle = particles[i];

        particle.x += Math.cos(particle.rotation) * 2;
        particle.y += Math.sin(particle.rotation) * 2;

        if (particle.x < -radius) particle.x = app.screen.width + radius;
        if (particle.y < -radius) particle.y = app.screen.height + radius;
        if (particle.x > app.screen.width + radius) particle.x = -radius;
        if (particle.y > app.screen.height + radius) particle.y = -radius;
    }
});
