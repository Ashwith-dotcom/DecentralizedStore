const SpecKart = artifacts.require('SpecKart')
const SpecToken = artifacts.require('SpecToken')
const Dispute = artifacts.require('DisputeContract')
let SpecTokenInstance, DisputeInstance

const admins = ['0x4cf9cD7C94EAB294b920c45C0AF5aE7C94c44710',
	'0xfbFe0d1A1411809c370eA237761cb73D53a2C799',
	'0x83e93E379BEb2717C56bF2E34FCd6e8dDD52b6e8']

module.exports = async function (deployer) {
	deployer.deploy(SpecToken).then(instance => {
		SpecTokenInstance = instance
		return deployer.deploy(Dispute,
			admins,
			SpecTokenInstance.address)
	})
		.then(instance => {
			DisputeInstance = instance
			return deployer.deploy(SpecKart, SpecTokenInstance.address, DisputeInstance.address)
		})
}

