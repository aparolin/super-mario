import Entity, { Trait } from '../Entity.js';
import Go from '../traits/Go.js';
import Jump from '../traits/Jump.js';
import Killable from '../traits/Killable.js';
import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import Stomper from '../traits/Stomper.js';
import {loadSpriteSheet} from '../loaders.js';
import {setupKeyboard} from '../input.js';

const SLOW_DRAG = 1/1000;
const FAST_DRAG = 1/5000;

export function loadMario() {
    return loadSpriteSheet('mario')
    .then(createMarioFactory);
}

class Behavior extends Trait {
    constructor() {
        super('behavior');
    }

    update(us, deltaTime, level) {
        if (!level.horizontalLimits.isValid(us.pos.x) || !level.verticalLimits.isValid(us.pos.y)) {
            us.killable.kill();
        }
    }
}

function createMarioFactory(sprite) {
    const runAnim = sprite.animations.get('run');

    function routeFrame(mario) {
        if (mario.jump.falling) {
            return 'jump';
        }

        if (mario.go.distance > 0) {
            if ((mario.vel.x > 0 && mario.go.dir < 0) || (mario.vel.x < 0 && mario.go.dir > 0)) {
                return 'break';
            }

            return runAnim(mario.go.distance);
        }

        return 'idle';
    }

    function setTurboState(turboOn) {
        this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
    }

    function drawMario(context) {
        sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0);
    }

    return function createMario() {
        const mario = new Entity();
        mario.size.set(14, 16);

        setupKeyboard(mario, sprite.keyboardModule);

        mario.addTrait(new Physics());
        mario.addTrait(new Solid());
        mario.addTrait(new Go());
        mario.addTrait(new Jump());
        mario.addTrait(new Killable());
        mario.addTrait(new Stomper());
        mario.addTrait(new Behavior());

        mario.killable.removeAfter = 0;

        mario.jump.sound = sprite.sounds.get('jump');
        mario.jump.sound.volume = .2;

        mario.turbo = setTurboState;
        mario.draw = drawMario;

        mario.turbo(false);

        return mario;
    }
}
