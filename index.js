const inventory = require('./src/inventory');
const Guitar = require('./src/guitar');
const prompt = require('prompt');
const clc = require('cli-color');

const inv = new inventory();

console.log(clc.blueBright('Welcome to Guitar Store.'));
console.log(clc.yellow('Please select a Job')+ '\n \t' + clc.blue('Add') + '\n \t' + clc.blue('ViewAll') + '\n \t' + clc.blue('ViewBySerialNo')+ '\n \t' + clc.blue('UpdatePrice'));
prompt.start();

prompt.get(['job'], function (err, result) {
    switch(result.job){
        case 'Add':
            prompt.get(['SerialNo', 'Price', 'Model', 'Type'], function (err, result) {
                inv.addGuitar(result.SerialNo, result.Price, result.Model, result.Type);
            });
            break;
        case 'ViewAll':
            const guitarList = inv.getGuitarInventory();
            console.log(clc.bgMagentaBright('Following Guitars present in Inventory'));
            console.log(guitarList);
            break;
        case 'ViewBySerialNo':
            prompt.get(['SerialNo'], function (err, result) {
                const g = inv.getGuitarBySerialNo(result.SerialNo);
                console.log(`Found Guitar with SerialNo - ${g.SerialNumber} in inventory. It costs ${g.Price} and is of Model ${g.Model} and Type ${g.Type}`);
            });
            break;
        case 'UpdatePrice':
            prompt.get(['SerialNo', 'Price'], function (err, result) {
                inv.updateGuitarPrice(result.SerialNo, result.Price);
            });
            break;
        default:
            console.log('No configured job');
            break;
    }
});