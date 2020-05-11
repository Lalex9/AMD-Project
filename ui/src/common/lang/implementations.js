const abstractMethod = () => {
    throw new TypeError('Cannot call abstract methods. Must be overridden by subclasses without calling super. <abstractMethod>');
}

let Interface = (methods) => {
    let Interface = class {
        constructor() {
            if (this.constructor === Interface) {
                throw new TypeError('Cannot construct instance of an interface directly');
            }

            let self = this;
            methods.forEach((method) => {
                // check that abstract method is implemented by concrete subclasses
                if (typeof self[method] !== 'function') {
                    throw new TypeError(`Abstract methods ${method} must be implemented by concrete subclasses`);
                }
            });
        }
    };

    // create abstract methods
    methods.forEach((method) => {
        Interface.prototype[method] = abstractMethod;
    });

    return Interface;
}

let AbstractClass = (superClass, abstractMethods) => {
    let Abstract = class extends superClass {
        constructor() {
            // test methods
            if (!abstractMethods) {
                throw new TypeError('Must pass a list of abstract methods');
            }

            super();

            let self = this;

            if (this.constructor === Abstract) {
                throw new TypeError('Cannot construct instance of abstract class directly');
            }

            abstractMethods.forEach((method) => {
                if (self[method] === abstractMethod) {
                    throw new TypeError(`Abstract methods ${method} must be implemented by concrete subclasses`);
                }
            });
        }
    };

    // create abstract methods
    abstractMethods.forEach((method) => {
        Abstract.prototype[method] = abstractMethod;
    });

    return Abstract;
}

export {AbstractClass, Interface};