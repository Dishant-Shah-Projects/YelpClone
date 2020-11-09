/* eslint-disable no-undef */
const chai = require('chai');

chai.use(require('chai-http'));
const { expect } = require('chai');
const app = require('./index');
// eslint-disable-next-line import/order
const agent = require('chai').request.agent(app);

describe('Yelp Clone API TESTING', () => {
  it('API CALL 1: GET /customer/profile - Checking weather the status loads if the customerID is passed through', (done) => {
    agent.get('/customer/profile?customerID=4')
      .then((res) => {
        // console.log(res.body.end);
        expect(res.status).to.equal(200);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
  it('API CALL 2: GET /restaurant/profile - Checking weather the status loads if the customerID is passed through', (done) => {
    agent.get('/restaurant/profile?restaurantID=1')
      .then((res) => {
        // console.log(res.body.end);
        expect(res.status).to.equal(200);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
  it('API CALL 3: GET /customer/messageload loading successfullt', (done) => {
    const data = {
      custoemrID: 4,
    };
    agent.post('/customer/Messageload', data)
      .then((res) => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
  it('API CALL 4: POST /general/login Checking Login matched', (done) => {
    agent.post('/general/login').send({ UserName: 'darth@darth.com', Password: 'apple', Role: 'customer' })
      .then((res) => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
  it('API CALL 5: POST/customer/customerFollow checking if follow works', (done) => {
    agent.post('/customer/customerFollow').send({ customerID: 1, followID: 4, CustomerName: 'darth vader' })
      .then((res) => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});
