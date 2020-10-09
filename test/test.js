const assert = require("assert");
const loginController = require("../src/controller");
const expect = require("chai").expect;
const should = require("chai").should();
const chai = require("chai");

const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised).should();

beforeEach("Setting up the userList", function () {
  console.log("beforeEach");
  loginController.loadUserList(["abc123", "xyz321"]);
});

describe("Basic Mocha String Test", function () {
  it("should return number of charachters in a string", function () {
    assert.strictEqual("Hello".length, 5);
  });
  it("should return first charachter of the string", function () {
    assert.strictEqual("Hello".charAt(0), "H");
  });
});

describe("LoginController", function () {
  describe("isValidUserId", function () {
    it("should return true if valid user id", function () {
      var isValid = loginController.isValidUserId("abc123");
      //assert.equal(isValid, true);
      expect(isValid).to.be.true;
    });

    it("should return false if invalid user id", function () {
      var isValid = loginController.isValidUserId("abc1234");
      //assert.equal(isValid, false);
      isValid.should.equal(false);
    });
  });

  describe("isValidUserIdAsync", function () {
    it("should return true if valid user id", function (done) {
      loginController.isValidUserIdAsync("abc123", function (isValid) {
        //assert.equal(isValid, true);
        isValid.should.equal(true);
        done();
      });
    });
  });

  describe("isAuthorizedPromise", function () {
    it("should return true if valid user id", function () {
      return loginController.isAuthorizedPromise("abc123").should.eventually.be
        .true;
    });
  });
});
