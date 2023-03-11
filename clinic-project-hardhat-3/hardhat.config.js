require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

const GANACHE_RPC_URL=process.env.GANACHE_RPC_URL
const PRIVATE_KEY= process.env.PRIVATE_KEY
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",

  networks:{
    ganache:{
     url:GANACHE_RPC_URL,
     accounts:[PRIVATE_KEY],
     chainId:1337,
    },
   },
};
