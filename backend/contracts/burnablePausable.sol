// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

// implements the ERC721 standard
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// keeps track of the number of tokens issued
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

// Accessing the Ownable method ensures that only the creator of the smart contract can interact with it
contract burnablePausable is ERC721, Pausable, Ownable, ERC721Burnable {
    /// @dev Base token URI used as a prefix by tokenURI().
    string public baseTokenURI;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
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

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}
