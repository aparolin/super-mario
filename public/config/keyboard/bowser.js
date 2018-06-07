export function handlers(bowser){
    return {
        KeyI: function jump(keyState){
            if (keyState) {
                bowser.jump.start();
            } else {
                bowser.jump.cancel();
            }
        },
    
        ShiftRight: function turbo(keyState){
            bowser.turbo(keyState);
        },
    
        KeyL: function goRight(keyState){
            bowser.go.dir += keyState ? 1 : -1;
        },
    
        KeyJ: function gotLeft(keyState){
            bowser.go.dir += keyState ? -1 : 1;
        }
    }
}