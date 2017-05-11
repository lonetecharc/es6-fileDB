const fs = require('fs-extra');


class DatabaseHelper {
    
    constructor(){
        this.filePath = './db/guitarList.txt';
        this.tempFilePath = './db/temp.txt';
    }

    writeToDB(data){
        fs.appendFile(this.filePath, data, 'utf-8',(err) => {
            if(err){
                console.log('could not write to DB!');
                return;
            }
            // console.log('Written sucessfully');
        });
    }

    writeToTempDB(data){
        fs.appendFile(this.tempFilePath, data, 'utf-8',(err) => {
            if(err){
                console.log('could not write to DB!');
                return;
            }
            // console.log('Written sucessfully');
        });
    }

    readDB(){
        return fs.readFileSync(this.filePath, 'utf-8');
    }

    updateDB(primaryKey, updatedValue){
        return new Promise((resolve, reject) => {
            const currentData = this.readDB();
            const arrayedData = currentData.split('\n');

            //umatched rows
            const rowToNotUpdate = arrayedData.filter((x) => {return x.indexOf(primaryKey) < 0});
            
            rowToNotUpdate.map((rowVal) => {
                if(rowVal.trim() !== ''){
                    let rowProps = rowVal.split(' ');
                    this.writeToTempDB(`${rowProps[0]} ${rowProps[1]} ${rowProps[2]} ${rowProps[3]} \n`)
                }
            });

            // get the matched row
            const rowToUpdate = arrayedData.filter((x) => {return x.indexOf(primaryKey) >= 0});
            rowToUpdate.map((rowVal) => {
                let rowProps = rowVal.split(' ');
                this.writeToTempDB(`${rowProps[0]} ${updatedValue} ${rowProps[2]} ${rowProps[3]} \n`)
            });
            resolve();
        });
    }

    updateMasterFile(){
        fs.writeFile(this.filePath, '', (err) => {
            if(err){
                console.log('Issue in updation');
                return;
            }
            fs.copy(this.tempFilePath, this.filePath)
            .then(() => {
                fs.writeFile(this.tempFilePath, '');
            })
            .catch(err => console.error(err))
        });
        
    }
}

module.exports = DatabaseHelper;