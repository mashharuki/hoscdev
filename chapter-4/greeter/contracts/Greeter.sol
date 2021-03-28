pragma solidity >= 0.4.0 < 0.7.0;

import "openzeppelin-solidity/contracts/access/Ownable.sol";

contract Greeter is Ownable {
  // 変数を設定
  string private _greeting = "Hello, World!";
  // 所有者のアドレス
  address private _owner;

  // greet関数
  function greet() external view returns(string memory) {
    return _greeting;
  }

  // 変数をセットする関数
  function setGreeting(string calldata greeting) external onlyOwner {
    _greeting = greeting;
  }
}
