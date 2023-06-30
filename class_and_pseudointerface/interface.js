function resolvePrecept(interfaceName) {
    var interfaceName = interfaceName;
    return function curry(propertyName, value) {
        /*throw new Error(`${interfaceName} equires an implementation for ${propertyName}`);*/
        console.warn(`${interfaceName} equires an implementation for ${propertyName}`);
        return value;
    };
}

let iPriceSpecs = function () {
    let defaultTo = resolvePrecept('iPriceSpecs');

    this.pricePerSqrMeter = this.pricePerSqrMeter || defaultTo('pricePerSqrMeter', new Number());
    this.roomPriceMultiplier = this.roomPriceMultiplier || defaultTo('roomPriceMultiplier', new Number());
    this.parkingSpaceAdditional = this.parkingSpaceAdditional || defaultTo('parkingSpaceAdditional', new Number());
    this.comission = this.comission || defaultTo('comission', new Number());
}

class Property {
    constructor(id, address, m2) {
        if (this.constructor == Property) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.id = id;
        this.address = address;
        this.m2 = m2;
    }

    getPrice() {
        throw new Error("Method 'getPrice()' must be implemented.");
    }

    getComission() {
        try {
            let resp = this.getPrice() * this.comission;
            return resp;
        } catch (error) {
            throw new Error(`Method 'getComission()' can't be implemented->\r\t${error.message}`);
        }
    }

}

class House extends Property {
    constructor(id = null, address = null, m2 = null, roomQuantity = null, pricePerSqrMeter = null, priceMultiplier = null) {
        super(id, address, m2);
        this.roomQuantity = roomQuantity;
        this.pricePerSqrMeter = pricePerSqrMeter;
        this.priceMultiplier = priceMultiplier;
        iPriceSpecs.apply(this);
    }
    getPrice() {
        let price = this.roomQuantity * this.roomPriceMultiplier + this.m2 * this.pricePerSqrMeter;
        return price;
    }
}

class Garage extends Property {
    constructor(id = null, address = null, m2 = null, parkingSpaces = null, pricePerSqrMeter = null, parkingSpaceAdditional = null) {
        super(id, address, m2);
        this.parkingSpaces = parkingSpaces;
        this.pricePerSqrMeter = pricePerSqrMeter;
        this.parkingSpaceAdditional = parkingSpaceAdditional;
        iPriceSpecs.apply(this);
    }
    getPrice() {
        let price = this.parkingSpaces * this.parkingSpaceAdditional + this.m2 * this.pricePerSqrMeter;
        return price;
    }
}

class Service {
    constructor(price = 0) {
        this.price = price;
    }
}

class Office extends Property {
    constructor(id = null, address = null, m2 = null, pricePerSqrMeter = null) {
        super(id, address, m2);
        this.pricePerSqrMeter = pricePerSqrMeter;
        this.services = [];
        iPriceSpecs.apply(this);
    }
    getPrice() {
        let price = this.m2 * this.pricePerSqrMeter;
        this.services.forEach(element => {
            price += element.price;
        });
        return price;
    }

}

