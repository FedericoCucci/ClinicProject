const contractAddress = require("./contractAddress.json")
const abi = require("./abi.json")
const ipfsConfig=require("./ipfsConfig.json")
const contracts_file=require("../../contract.json")
const providerUrl= "HTTP://192.168.16.1:7545"

module.exports = {
    contractAddress,
    abi,
    ipfsConfig,
    contracts_file,
    providerUrl
}