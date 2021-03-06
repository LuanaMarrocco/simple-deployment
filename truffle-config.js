const HDWalletProvider = require("@truffle/hdwallet-provider");
const solcconfig = require("./solcconfig.json");
const Web3 = require("web3");
const IPFS = require("ipfs-http-client");

require("dotenv").config();

let bpaasconfig = {
  mnemonic: process.env.DEMO_MNEMONIC,
  jsonRPC: process.env.DEMO_RPCENDPOINT,
  wsRPC: process.env.DEMO_WS_RPCENDPOINT,
  ipfsHost: process.env.DEMO_IPFS_HOST || "localhost",
  ipfsPathPrefix: process.env.DEMO_IPFS_PATH_PREFIX || "",
  ipfsProtocol: process.env.DEMO_IPFS_PROTOCOL || "http",
  ipfsPort: process.env.DEMO_IPFS_PORT || 5001,
  entethMiddleware: process.env.DEMO_ENTETH_MIDDLEWARE
};

module.exports = {
  test_file_extension_regexp: /.*\.ts$/,
  storeIpfsHash: async data => {
    try {
      const ipfs = new IPFS({
        host: bpaasconfig.ipfsHost,
        port: bpaasconfig.ipfsPort,
        protocol: bpaasconfig.ipfsProtocol,
        "api-path": `${bpaasconfig.ipfsPathPrefix}/api/v0/`
      });
      const dataBuff = Buffer.from(JSON.stringify(data), "utf8");
      const ipfsResponse = await ipfs.add(dataBuff);
      console.log(`--> Stored a file on IPFS: ${ipfsResponse[0].hash}`);
      return ipfsResponse[0].hash;
    } catch (error) {
      console.log(error);
    }
  },
  migrations_directory: "./dist",
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
      websockets: true // Enable EventEmitter interface for web3 (default: false)
    },
    launchpad: {
      provider: () =>
        new HDWalletProvider(
          bpaasconfig.mnemonic,
          new Web3.providers.WebsocketProvider(bpaasconfig.wsRPC)
        ),
      gasPrice: "0",
      network_id: "*",
      websockets: true,
      production: false,
      gas: "0x1dcd6400"
    }
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: solcconfig.version,
      settings: {
        optimizer: solcconfig.optimizer,
        evmVersion: solcconfig.evmVersion
      }
    }
  }
};
