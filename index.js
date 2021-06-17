const rust = import('./pkg/rust_3d_graphics');
const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl', { antialias: true });

rust.then(m => {
    if (!gl) {
        alert('Failed to initialise WebGL');
        return;
    }

    const FPS_THROTTLE = 1000.0 / 30.0;
    const client = new m.Client();
    const initialTime = Date.now();
    var lastDrawTime = -1;

    function render() {
        window.requestAnimationFrame(render);
        const currentTime = Date.now();
        
        if (currentTime >= lastDrawTime + FPS_THROTTLE) {
            lastDrawTime = currentTime;

            if (window.innerHeight != canvas.height || window.innerWidth != canvas.width) {
                canvas.height = window.innerHeight;
                canvas.clientHeight = window.innerHeight;
                canvas.style.height = window.innerHeight;

                canvas.width = window.innerWidth;
                canvas.clientWidth = window.innerWidth;
                canvas.style.width = window.innerWidth;

                gl.viewport(0, 0, window.innerHeight, window.innerWidth);
            }
        }

        let elapsedTime = currentTime - initialTime;
        client.update(elapsedTime, window.innerHeight, window.innerWidth);
        client.render();
    }

    render();
});