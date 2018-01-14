const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  inbox = await new web3.eth.Contract(JSON.parse(interface)).deploy({data: bytecode, arguments: ['dave!']}).send({from: accounts[0], gas: '1000000'});
});

describe('inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
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
