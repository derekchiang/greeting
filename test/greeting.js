var Greeting = artifacts.require("./Greeting.sol");

contract('Greeting', function(accounts) {

  it("should store the correct greeting.", async function() {
    const instance = await Greeting.deployed()
    assert.equal(await instance.text(), "Hello Thunder!", "Unexpected greeting")
  });

});
