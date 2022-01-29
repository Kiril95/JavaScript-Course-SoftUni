function extensibleObject() {
    let objProto = Object.getPrototypeOf(this);
    //Get the prototype of the object and add inside it only if the value is a function

    this.extend = function (obj) {
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value == "function") {
                objProto[key] = value;
            } else {
                this[key] = value;
            }
        }
    }
    return this;
}

const template = {
    extensionMethod: function () { },
    extensionProperty: 'someString'
}
const myObj = extensibleObject();
myObj.extend(template);