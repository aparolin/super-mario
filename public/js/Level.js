import Compositor from './Compositor.js';
import EntityCollider from './EntityCollider.js';
import TileCollider from './TileCollider.js';
import { Limit } from './math.js';

export default class Level {
    constructor() {
        this.gravity = 1500;
        this.totalTime = 0;
        
        this.comp = new Compositor();
        this.entities = new Set();
        
        this.entityCollider = new EntityCollider(this.entities);
        this.tileCollider = null;

        this.horizontalLimits = new Limit(-Infinity, Infinity);
        this.verticalLimits = new Limit(0, 250);
    }

    setCollisionGrid(matrix) {
        this.tileCollider = new TileCollider(matrix);
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime, this);
        });

        this.entities.forEach(entity => {
            this.entityCollider.check(entity);
        });

        this.entities.forEach(entity => {
            entity.finalize();
        });

        this.totalTime += deltaTime;
    }
}
