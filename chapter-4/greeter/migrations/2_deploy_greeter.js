const GreeterContract = artifacts.require("Greeter");

module.exports = function(deployer) {
  // デプロイする。
  deployer.deploy(GreeterContract);
}
