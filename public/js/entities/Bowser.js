import Entity, {Trait, Sides} from '../Entity.js';
import Go from '../traits/Go.js';
import Killable from '../traits/Killable.js';
import PendulumMove from '../traits/PendulumMove.js';
import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import Jump from '../traits/Jump.js';
import {loadSpriteSheet} from '../loaders.js';
import {setupKeyboard} from '../input.js';

export function loadBowser() {
    return loadSpriteSheet('bowser')
    .then(createBowserFactory);
}


class Behavior extends Trait {
    constructor() {
        super('behavior');
    }

    collides(us, them) {
        if (us.killable.dead) {
            return;
        }

        if (them.stomper) {
            if (them.vel.y > us.vel.y) {
                us.killable.kill();
                us.pendulumMove.speed = 0;
            } else {
                them.killable.kill();
            }
        }
    }
}


function createBowserFactory(sprite) {
    const walkAnim = sprite.animations.get('walk');

    function routeAnim(bowser) {
        if (bowser.killable.dead) {
            return 'walk-1';
        }

        return walkAnim(bowser.lifetime);
    }

    function drawBowser(context) {
        sprite.draw(routeAnim(this), context, 0, 0, this.go.heading < 0);
    }

    return function createBowser() {
        const bowser = new Entity('bowser');
        bowser.size.set(36, 36);
        bowser.offset.y = -1;

        setupKeyboard(bowser, sprite.keyboardModule);

        bowser.addTrait(new Physics());
        bowser.addTrait(new Solid());
        bowser.addTrait(new Go());
        
        //for now, let's manually control browser
        //bowser.addTrait(new PendulumMove());
        //also, let's make him jump
        bowser.addTrait(new Jump());

        bowser.addTrait(new Behavior());
        bowser.addTrait(new Killable());

        bowser.draw = drawBowser;

        //as we are now controlling bowser, no need to tell him where to go
        //bowser.go.dir = -1;

        return bowser;
    }
}
