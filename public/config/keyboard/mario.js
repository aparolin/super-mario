export function handlers(mario){
    return {
        KeyW: function jump(keyState){
            if (keyState) {
                mario.jump.start();
            } else {
                mario.jump.cancel();
            }
        },
    
        ShiftLeft: function turbo(keyState){
            mario.turbo(keyState);
        },
    
        KeyD: function goRight(keyState){
            mario.go.dir += keyState ? 1 : -1;
        },
    
        KeyA: function gotLeft(keyState){
            mario.go.dir += keyState ? -1 : 1;
        }
    }
}