var cloneDeep = require("lodash.clonedeep"),
    _maxDepth;

function escape(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

/**
 * Traverses an object recursively and substitutes the specified keys for the given values 
 *
 * @param {Object} obj The object in which we want to change the keys
 * @param {Object} keysToChange an object of the form {oldKey1: "newKey1", oldKey2: "newKey2"}
 */
var _recursiveChangeKeys = function(obj, keysToChange, depth){
  if(depth === _maxDepth){
    return;
  }
  if(obj instanceof Object){
    for(var oldkey in obj){
      if(obj.hasOwnProperty(oldkey)){
        for(var keyToChange in keysToChange){

          // If the key in keysToChange is a replacement
          if(keysToChange[keyToChange].replace){

            var keyToChangeRe = new RegExp(escape(keyToChange), 'g');

            // We replace the matched characters in the old key with the given string
            var newkey = oldkey.replace(keyToChangeRe, keysToChange[keyToChange].value);
            if(newkey !== oldkey){
              obj[newkey] = obj[oldkey];
              delete obj[oldkey];
            }
          }
          // Else if its just a string
          else {
            if(oldkey === keyToChange && 
               // Lets assure we dont overwrite anything
               !obj.hasOwnProperty(keysToChange[keyToChange].value)){

              obj[keysToChange[keyToChange].value] = obj[oldkey];
              delete obj[oldkey];
            }
          }
        }
        _recursiveChangeKeys(obj[oldkey], keysToChange, ++depth);
      }
    }
  }
};
var recursiveChangeKeys = function(obj, keysToChange, maxDepth){
  _maxDepth = maxDepth;
  var newobj = cloneDeep(obj);
  _recursiveChangeKeys(newobj, keysToChange, 0);
  return newobj;
};

module.exports = recursiveChangeKeys;
