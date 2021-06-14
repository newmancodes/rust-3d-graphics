const rust = import('./pkg/rust_3d_graphics');

rust.then(m => m.say_hello_from_rust())
    .catch(console.error);