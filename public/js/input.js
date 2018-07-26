import Keyboard from './KeyboardState.js';

export function setupKeyboard(entity, handlerModule) {
    import(handlerModule).then(module => {
        const handlers = module.handlers(entity);
        
        const input = new Keyboard();
        for (const key in handlers){
            let handler = handlers[key];
            input.addMapping(key, handler);
        }
        
        input.listenTo(window);
    });
}