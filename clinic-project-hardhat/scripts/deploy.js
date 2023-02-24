const {ethers} = require("hardhat")
require("dotenv").config()
const fs = require("fs")
const { network } = require("hardhat")


const CONTRACT_ADDRESS_FILE=process.env.CONTRACT_ADDRESS_FILE
const ABI_FILE=process.env.ABI_FILE

async function main(){
const contractFactory= await ethers.getContractFactory("ClinicContract")
console.log("Deploying contract...")
const contract= await contractFactory.deploy()
await contract.deployed()
console.log("Deployed contract to "+contract.address)
if(process.env.UPDATE_FRONT_END){
  console.log("Updating front end")
  console.log("Write ABI")
  fs.writeFileSync(ABI_FILE, contract.interface.format(ethers.utils.FormatTypes.json))
  const currentAddress = JSON.parse(fs.readFileSync(CONTRACT_ADDRESS_FILE, "utf8"))
  const chainId=network.config.chainId.toString()
  currentAddress[chainId] = [contract.address]
  console.log("Write Contract Address")
  fs.writeFileSync(CONTRACT_ADDRESS_FILE, JSON.stringify(currentAddress))
}

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })