'use strict';

const entity = { name: 'entity', exists: true, };
const aliveEntity = Object.create(entity, { name: { value: 'aliveEntity' }, isAlive: { value: true }, });
const person = Object.create(aliveEntity, { name: { value: 'person' }, firtName: { value: 'Hans' }, secondName: { value: 'Landa' }, });

const AliveEntity = { __proto__: entity, name: 'AliveEntity', isAlive: true, };
const Person = { __proto__: AliveEntity, name: 'Person', firstName: 'Isaac', secondName: 'Newton', };

class EntityClass {
    constructor() {
        this.exists = true;
    }
}
class AliveEntityClass extends EntityClass {
    constructor() {
        super();
        this.isAlive = true;
    }
}
class PersonClass extends AliveEntityClass {
    constructor() {
        super();
        this.firstName = 'Lewis';
        this.lastName = 'Hamilton';
    }
}

function prototypeChain(object) {
    let a = 0;
    do {
        a += 1;
        console.log(`${a} The prototype of null or ${object.name} is ${JSON.stringify(Object.getPrototypeOf(object))}`);
        object = Object.getPrototypeOf(object);
    } while (object !== null);
}

console.log("Using object\n");
prototypeChain(person);
console.log("\nUsing object with prototypes assigned\n");
prototypeChain(Person);
console.log("\nUsing classes\n");
prototypeChain(PersonClass);
console.log("\nUsing instanciated class\n");
prototypeChain(new PersonClass());