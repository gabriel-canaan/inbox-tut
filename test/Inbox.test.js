const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);

const {interface, bytecode} = require('../compile');

let accounts;
let inbox;


beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  inbox = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({data: bytecode, arguments: ['dave!']})
  .send({from: accounts[0], gas: '1000000'});
  inbox.setProvider(provider);
});

describe('inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });
  it('has a default msssage', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'dave!');
  });
  it('can change the message', async () => {
    await inbox.methods.setMessage('pegs').send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, 'pegs');
  });
});


// class Car {
//   park() {
//     return 'stopped';
//   }
//   drive() {
//     return 'vroom';
//   }
// }
//
// let car;
//
// beforeEach(() => {
//   car = new Car();
// })
//
// describe('Car', () => {
//   it('can park', () => {
//     assert.equal(car.park(), 'stopped');
//   });
//   it('can drive', () => {
//     assert.equal(car.drive(), 'vroom');
//   });
// });
