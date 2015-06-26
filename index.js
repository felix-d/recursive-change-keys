/**
 * Traverses an object recursively and substitutes the specified keys for the given values 
 *
 * @param {Object} obj The object in which we want to change the keys
 * @param {Object} keysToChange an object of the form {oldKey1: "newKey1", oldKey2: "newKey2"}
 */

var recursiveChangeKeys = function(obj, keysToChange){
    if(obj instanceof Object){
        for(var oldkey in obj){
            if(obj.hasOwnProperty(oldkey)){
                for(var keyToChange in keysToChange){
                    if(oldkey === keyToChange && 
                       !obj.hasOwnProperty(keysToChange[keyToChange])){
                        obj[keysToChange[keyToChange]] = obj[oldkey];
                        delete obj[oldkey];
                    }
                }
                recursiveChangeKeys(obj[oldkey], keysToChange);
            }
        }
    }
};

module.exports = recursiveChangeKeys;
