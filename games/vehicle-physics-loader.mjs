import createVehiclePhysics from './vehicle-physics.mjs';

createVehiclePhysics()
    .then(module => {
        window.dispatchEvent(new CustomEvent('vehicle-physics-ready', { detail: { module } }));
    })
    .catch(() => {});
