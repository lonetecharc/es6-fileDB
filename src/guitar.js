class Guitar {
    constructor(serialNumber, price, model, type){
        this._serialNumber = serialNumber;
        this._price = price;
        this._model = model;
        this._type = type;
    }


    get SerialNumber(){
        return this._serialNumber;
    }

    get Model(){
        return this._model;
    }

    get Type(){
        return this._type;
    }

    get Price(){
        return this._price;
    }

    set Price(newPrice){
        this._price = newPrice;
    }

}

module.exports = Guitar;