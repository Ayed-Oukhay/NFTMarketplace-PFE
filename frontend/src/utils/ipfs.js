//************ IPFS configuration file ************/
const IPFS = require('ipfs-api');
// require('dotenv').config();
// const projectId = process.env.INFURA_API_ID;
// const projectSecret = process.env.INFURA_SECRET_KEY;
// const auth ='Basic' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const ipfs = new IPFS({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    // headers: {
    //     authorization: auth,
    // }
});
export default ipfs;