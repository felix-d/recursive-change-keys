var equal = require("deep-equal");

describe("recursive-change-keys", function() {
  var recursiveChangeKeys = require('../index');
  var testObj, changeKeys, changeKeysReplace;

  beforeEach(function() {
    testObj = {
      key1: "test", key2: "test",
      key3: {
        key1: "test",
        key4: {
          key1: "test",
          key5: [{
            key1: "test",
            key2: "test",
            newkey: "notoverridden"
          }]
        }
      }
    };

    changeKeys = {key1: {value: "newkey"}, key2: {value: "newkey2"}};
    changeKeysReplace = {".": {value: "_", replace: true}};
  });

  it("it should recursively change the right keys", function() {
    var success = {
      newkey: "test",
      newkey2: "test",
      key3: {
        newkey: "test",
        key4: {
          newkey: "test",
          key5: [{
            key1: "test",
            newkey2: "test",
            newkey: "notoverridden"
          }]
        }
      }
    };
    testObj = recursiveChangeKeys(testObj, changeKeys);
    expect(equal(testObj, success)).toBeTruthy();
  });

  it("it should recursively change the right keys with a regex", function(){
    var success = {
      "key_key": "val"
    };
    var testObj2 = {
      "key.key": "val"
    };
    testObj2 = recursiveChangeKeys(testObj2, changeKeysReplace, {replace:true});
    expect(equal(testObj2, success)).toBeTruthy();
    
  });

});
