const rust = import('./pkg/rust_3d_graphics');
const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl', { antialias: true });

rust.then(m => {
    if (!gl) {
        alert('Failed to initialise WebGL');
        return;
    }

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const FPS_THROTTLE = 1000.0 / 30.0;
    const client = new m.Client();
    const initialTime = Date.UTC;
    var lastDrawTime = -1;

    function render() {
        window.requestAnimationFrame(render);
        const currentTime = Date.UTC;
        
        if (currentTime >= lastDrawTime + FPS_THROTTLE) {
            lastDrawTime = currentTime;

            if (window.innerHeight != canvas.height || window.innerWidth != canvas.width) {
                canvas.height = window.innerHeight;
                canvas.clientHeight = window.innerHeight;
                canvas.style.height = window;innerHeight;

                canvas.width = window.innerWidth;
                canvas.clientWidth = window.innerWidth;
                canvas.style.width = window;innerWidths;

                gl.viewport(0, 0, window.innerHeight, window.innerWidth);
            }
        }

        let elapsedTime = currentTime - initialTime;
        client.update(elapsedTime, window.innerHeight, window.innerWidth);
        client.render();
    }

    render();
});