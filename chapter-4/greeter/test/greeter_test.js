/**
 * Greeterコントラクトをテストするためのコード
 */

// コンパイル済みのコントラクトを読み込む
const GreeterContract = artifacts.require("Greeter");

contract("Greeter", (accounts) => {
  // コントラクトをデプロイできるかどうかのテスト
  describe("deployment", () => {
    it("has been deployed successfully", async () => {
      const greeter = await GreeterContract.deployed();
      assert(greeter, "contract failed to deploy");
    });
  });

  // Hello World!!が表示されるかどうかのテスト
  describe("greet()", () => {
    it("returns 'Hello, World!'", async () => {
      const greeter = await GreeterContract.deployed();
      const expected = "Hello, World!";
      // greet関数を呼び出す。
      const actual = await greeter.greet();

      assert.equal(actual, expected, "greeted with 'Hello, World!'");
    })
  });

  // 所有者が存在することのテスト
  describe("owner()", () => {
    it("returns the address of the owner", async () => {
      const greeter = await GreeterContract.deployed();
      // owner関数を呼び出す。
      const owner = await greeter.owner();
      
      assert(owner, "the current owner");
    });

    it("matches the address that originally deployed the contract", async () => {
      const greeter = await GreeterContract.deployed();
      // 所有者のアドレスを取得
      const owner = await greeter.owner();
      // テスト実行者とのアドレス
      const expected = accounts[0];
      // 等しいことを確認する。
      assert.equal(owner, expected, "matches address used to deploy contract");
    });
  });
});

// 挨拶を動的に指定するためのテスト
contract("Greeter: update greeting", (accounts) => {
  describe("setGreeting(string)", () => {
    describe("when message is sent by the owner", () => {
      it("sets greeting to passed in string", async () => {
        const greeter = await GreeterContract.deployed()
        // 挨拶文を設定する。
        const expected = "Hello World!!!";
        // setGreeting関数の呼び出し
        await greeter.setGreeting(expected);
        // greet関数の呼び出し
        const actual = await greeter.greet();

        assert.equal(actual, expected, "greeting was not updated");
      });
    });

    describe("when message is sent by another account", () => {
      it("does not set the greeting", async () => {
        const greeter = await GreeterContract.deployed()
        const expected = await greeter.greet();

        try {
          // 所有者でないことを確認する。
          await greeter.setGreeting("Not the owner", { from: accounts[1] });
        } catch(err) {
          // エラーの場合
          const errorMessage = "Ownable: caller is not the owner"
          assert.equal(err.reason, errorMessage, "greeting should not update");
          return;
        }
        assert(false, "greeting should not update");
      });
    });
  });
});
