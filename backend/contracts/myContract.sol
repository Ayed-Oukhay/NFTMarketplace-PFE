// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

// implements the ERC721 standard
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// keeps track of the number of tokens issued
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Here we need to get the contract object sent from the frontend React app and replace the properties of the contract hereunder
import router from "../src/routes/contractRoutes";

// Accessing the Ownable method ensures that only the creator of the smart contract can interact with it
contract myContract is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private currentTokenId;

    string name = "";
    string symbol= "";

    /// @dev Base token URI used as a prefix by tokenURI().
    string public baseTokenURI;
    
    constructor() ERC721(name, symbol) {
        name = name;
        symbol = symbol;
        baseTokenURI = "";
    }
    
    function mintTo(address recipient) public returns (uint256) {
        currentTokenId.increment();
        uint256 newItemId = currentTokenId.current();
        _safeMint(recipient, newItemId);
        return newItemId;
    }

    /// @dev Returns an URI for a given token ID
    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    /// @dev Sets the base token URI prefix.
    function setBaseTokenURI(string memory _baseTokenURI) public {
        baseTokenURI = _baseTokenURI;
    }

}