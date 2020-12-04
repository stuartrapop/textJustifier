const chai = require('chai');
const { assert, expect } = require('chai');

const chaiHttp = require('chai-http');

// Assertion style

chai.use(chaiHttp);

const app = require('../../index');

const justifyController = require('../../app/controllers/justifyController');

const lineInfoOneWord = {
  numberWords: 1,
  nonSpaceCharacters: 5,
  lineWords: ['hello'],
};

const lineInfoTwoWords = {
  numberWords: 2,
  nonSpaceCharacters: 10,
  lineWords: ['hello', 'hello'],
};

const lineInfoFiveWords = {
  numberWords: 5,
  nonSpaceCharacters: 25,
  lineWords: ['hello', 'hello', 'hello', 'hello', 'hello'],
};

describe('justifyController', () => {
  // for mocha chai learning
  describe('sayHello', () => {
    it('sayHello should return hello', () => {
      assert.equal(justifyController.sayHello(), 'hello');
    });
  });
  describe('makeline', () => {
    it('one word line should not be justified', () => {
      assert.notEqual(justifyController.makeline(lineInfoOneWord).length, 80);
    });

    it('type of makeline string', () => {
      assert.typeOf(justifyController.makeline(lineInfoOneWord), 'string');
    });

    it('two words should be justified 80 characters with all space in the middle', () => {
      assert.equal(justifyController.makeline(lineInfoTwoWords).length, 80);
    });

    it('hello hello should make this long line ', () => {
      assert.equal(justifyController.makeline(lineInfoTwoWords), 'hello                                                                      hello');
    });

    it('5 words should be justified too ', () => {
      assert.equal(justifyController.makeline(lineInfoFiveWords).length, 80);
    });
  });

  describe('POST /api/token', () => {
    it('posting emailJson to /api/token should return a string with a status 200', (done) => {
      const emailObject = {
        email: 'foo@bar.com',
      };
      const emailJson = JSON.stringify(emailObject);

      chai.request(app)
        .post('/api/token')
        .send({ emailJson })
        .end((err, response) => {
          console.log(response.text);
          expect(response).to.have.status(200);
          expect(response.text).to.be.a('string');
          done();
        });
    });
  });
});
