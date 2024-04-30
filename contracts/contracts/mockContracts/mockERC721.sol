// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MockERC721 is ERC721 {
    string public constant TOKEN_URI =
        "https://i.seadn.io/gcs/files/95c2cd0b3b7c53b17690e5a069dca5dc.png?auto=format&dpr=1&w=1000";
    uint256 private tokenCounter;

    constructor() ERC721("mock", "mock") {
        tokenCounter = 0;
    }

    function mintNft() public {
        _safeMint(msg.sender, tokenCounter);
        tokenCounter = tokenCounter + 1;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return TOKEN_URI;
    }

    function getTokenCounter() public view returns (uint256) {
        return tokenCounter;
    }
}
