function resolvePrecept(interfaceName) {
    var interfaceName = interfaceName;
    return function curry(value) {
        //throw new Error(`${interfaceName} equires an implementation for ${Object.keys({ value })[0]}`);
        console.warn(`${interfaceName} equires an implementation for ${value}`);
        return value;
    };
}

var AbstractClass = function AbstractClass() {
    let defaultTo = resolvePrecept('Class');
    this.prop = this.prop || defaultTo(new Number());
    this.prop2 = this.prop2 || defaultTo(new Number());
};

class ImplentationClass {
    constructor(prop = null, prop2 = null) {
        this.prop = prop;
        this.prop2 = prop2;
        AbstractClass.apply(this);
    }
}

let a = new ImplentationClass();
console.log(a.prop);

let b = new ImplentationClass(7);
console.log(b.prop);

let c = new ImplentationClass(NaN, 7);
console.log(c.prop);
console.log(c.prop2);