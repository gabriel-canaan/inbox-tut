const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
  'floor joy identify poverty aisle enough custom turkey vintage medal come under',
  'https://rinkeby.infura.io/14oe6jqRVkJfwU14fRyl'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('attempting to deploy from acc', accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({ data: bytecode, arguments: ['Dave !'] })
  .send({ gas: '1000000', from: accounts[0] });
  console.log('Contract deployed to', result.options.address);
};
deploy();
