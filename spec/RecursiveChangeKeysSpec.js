var equal = require("deep-equal");

describe("recursive-change-keys", function() {
  var recursiveChangeKeys = require('../index');
  var testObj;
  var changeKeys;

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
    changeKeys = {key1: "newkey", key2: "newkey2"};
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

});
