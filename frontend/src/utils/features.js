export const FeaturesList = [
    {
        name: "Mintable",
        // Privileged accounts will be able to emit new tokens.
        // If checked, the following code should be added:
        // function safeMint(address to, uint256 tokenId) public onlyOwner {
        //     _safeMint(to, tokenId);
        // }
    },
    {
        name: "Burnable",
        // Token holders will be able to destroy their tokens.
    },
    {
        name: "Pausable",
        // Keeps track of individual units for voting in on-chain governance, with a way to delegate one's voting power to a trusted account.
    },
    // {
    //     name: "Votes",
    //     // Keeps track of individual units for voting in on-chain governance, with a way to delegate one's voting power to a trusted account.
    // },
    // {
    //     name: "Enumerable",
    //     // Allows on-chain enumeration of all tokens or those owned by an account. Increases gas cost of transfers.
    // },
    // {
    //     name: "URI Storage",
    //     // Allows updating token URIs for individual token IDs.
    // },
];
