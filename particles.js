import React, { useEffect } from 'react';
import Particles from 'particles.js';

const ParticlesComponent = () => {
    useEffect(() => {
        Particles.init({
            selector: '.header__background',
            color: '#75A5B7',
            maxParticles: 130,
            connectParticles: true,
            responsive: [
                {
                    breakpoint: 768,
                    options: {
                        maxParticles: 80
                    }
                }, {
                    breakpoint: 375,
                    options: {
                        maxParticles: 50
                    }
                }
            ]
        });
    }, []);

    return null;
};

export default ParticlesComponent;
