// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

// implements the ERC721 standard
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// keeps track of the number of tokens issued
import "@openzeppelin/contracts/access/Ownable.sol";

// Accessing the Ownable method ensures that only the creator of the smart contract can interact with it
contract myContract is ERC721, Ownable {

    /// @dev Base token URI used as a prefix by tokenURI().
    string public baseTokenURI;
    
    constructor() ERC721(_name,_symbol) {
        _name = _name;
        _symbol = _symbol;
        baseTokenURI = "";
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