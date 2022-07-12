import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
require('dotenv').config();

const endpoint = process.env.REACT_APP_ALCHEMY_KEY;

const NftCard = ({ image, id, title, address, description, attributes }) => {

    const [NFT, setNFT] = useState("");
    const [contractAddress, setContractAddress] = useState("0x7a1C29e5462989dB8680AaF5b9c1FeD6BDC16303");
    const [owner, setOwner] = useState("");


    // Accessing the history instance created by React
    const history = useHistory();

    const DisplayNft = () => {
        history.push(`/nft/${id}`);
    }

    useEffect(async () => {
        await fetch(`${endpoint}/getNFTs?owner=${owner}&contractAddresses%5B%5D=${contractAddress}`).then(data => data.json())
    
    }, [])

    return (
        <div className="card d-flex mt-auto" style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', width: '260px', height: '400px', float: 'left', marginLeft: '10px' }} >
            <center><img className='w-full rounded-t-md' style={{ width: '230px', height: '180px', marginTop: '10px' }} alt="Avatar" key={id} src={image}></img></center>
            <div className="container" style={{ padding: '2px 16px' }}>
                <div className="flex mb-3">
                    <div className="flex-grow">
                        <h4 className="text-xl">{title} <h6>{`${id.slice(0, 2)}...${id.slice(id.length - 3)}`}</h6></h4>
                    </div>
                    <div className="flex mr-3">
                        <a target="_blank" className="text-blue-700" href={`https://mumbai.polygonscan.com/address/${address}`}>{`${address.slice(0, 4)}...${address.slice(address.length - 4)}`}</a>
                    </div>
                </div>
                <p>{description ? description.slice(0, 50) : "No Description"}...</p>
            </div>
            <center><div className="card-footer mt-auto align-self-end">
                <input type="submit" value="Display" style={{ width: '200px' }} onClick={DisplayNft}></input>
            </div></center>
            {/* <div className="flex flex-wrap justify-center items-center p-3 ">
                {attributes?.length > 0 && attributes.map(attribute => {
                    return (
                        <div className="w-1/2 mb-2 flex justify-start flex-col">
                            <p className="mr-2 font-bold">{attribute.trait_type}:</p>
                            <p className="text-sm">{attribute.value}</p>
                        </div>
                    )
                })}
            </div> */}
        </div>
    )
}

export default NftCard