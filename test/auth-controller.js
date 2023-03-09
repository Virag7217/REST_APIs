const sinon = require('sinon');
const expect = require('chai').expect;
const AuthController = require('../controllers/auth');
const User = require('../models/user');

describe('Auth Controller login/signup', function() {
  it('should throw an error if database access denied', function() {
    sinon.stub(User, 'findOne');
    User.findOne.throws();

    const req = {
      body: {
        email: 'abcc@abc.com',
        password: 'abc'
      }
    };

    AuthController.login(req, {}, () => {}).then(result => {
      expect(result).to.be.an('error');
      expect(result).to.have.property('statusCode', 500);
    });
    User.findOne.restore();
  });
});