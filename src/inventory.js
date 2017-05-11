const guitar = require('./guitar');
const DatabaseHelper = require('./dbHelper');

class Inventory {

    constructor(){
        this._dbHelper = new DatabaseHelper();
    }

    

    //list all guitars in my inventory
    getGuitarInventory(){
        const allGuitars = this._dbHelper.readDB();
        return allGuitars;
    }

    // list a single guitar with serial number
    getGuitarBySerialNo(serialNumber){
        const guitarString = this.getGuitarInventory().split('\n')
            .filter((guitarList) => { 
                    return guitarList.indexOf(serialNumber) >= 0 
                });

        const guitarProps = guitarString[0].split(' ');
        const searchedGuitar = new guitar(guitarProps[0], 
                                          guitarProps[1], 
                                          guitarProps[2], 
                                          guitarProps[3]);    
        return searchedGuitar;
    }

    // method to add guitar to inventory
    addGuitar(serialNumber, price, model, type){
        const gtar = new guitar(serialNumber, price, model, type);
        this._dbHelper.writeToDB(`${serialNumber} ${price} ${model} ${type} \n`)
        console.log(`${gtar.SerialNumber} added to inventory`);
    }

    // update Guitar price by serial No
    updateGuitarPrice(serialNumber, price){
        this._dbHelper.updateDB(serialNumber, price)
                      .then(() => this._dbHelper.updateMasterFile());
    }


}

module.exports = Inventory;

