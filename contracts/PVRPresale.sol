// SPDX-License-Identifier: MIT
pragma solidity ^0.8.35;

interface IERC20 {
    function owner() external view returns (address);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

contract PVRPresale {
    IERC20 public immutable pvrToken;
    IERC20 public immutable usdtToken;

    address public owner;

    bool public presaleActive;

    uint256 public pvrPrice;

    uint256 public totalPvrSold;

    uint256 public totalUsdtRaised;

    uint256 public maxPurchasePerWallet;

    mapping(address => uint256) public purchasedPvr;

    bool private locked;

    event TokensPurchased(address indexed buyer, uint256 usdtAmount, uint256 pvrAmount);
    event PriceUpdated(uint256 oldPrice, uint256 newPrice);
    event PresaleStatusUpdated(bool active);
    event MaxPurchaseUpdated(uint256 oldLimit, uint256 newLimit);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "Presale: not owner");
        _;
    }

    modifier nonReentrant() {
        require(!locked, "Presale: reentrant call");
        locked = true;
        _;
        locked = false;
    }

    constructor(address _pvrToken, address _usdtToken) {
        require(_pvrToken != address(0), "Presale: invalid PVR");
        require(_usdtToken != address(0), "Presale: invalid USDT");

        owner = msg.sender;

        pvrToken = IERC20(_pvrToken);
        usdtToken = IERC20(_usdtToken);

        pvrPrice = 50_000_000_000_000_000;
        maxPurchasePerWallet = 0;
        presaleActive = false;
        emit OwnershipTransferred(address(0), msg.sender);
    }

    function buyWithUSDT(uint256 usdtAmount)
        external
        nonReentrant
        returns (uint256 pvrAmount)
    {
        require(presaleActive, "Presale: inactive");
        require(usdtAmount > 0, "Presale: zero USDT");

        pvrAmount = (usdtAmount * 10 ** 18) / pvrPrice;
        require(pvrAmount > 0, "Presale: zero PVR");

        if (maxPurchasePerWallet > 0) {
            require(purchasedPvr[msg.sender] + pvrAmount <= maxPurchasePerWallet, "Presale: wallet limit exceeded");
        }

        require(pvrToken.balanceOf(address(this)) >= pvrAmount, "Presale: insufficient PVR");
        purchasedPvr[msg.sender] += pvrAmount;
        totalPvrSold += pvrAmount;

        address tokenOwner = pvrToken.owner();
        require(tokenOwner != address(0), "Presale: invalid token owner");
        require(
            usdtToken.transferFrom(msg.sender, tokenOwner, usdtAmount),
            "Presale: USDT transfer failed"
        );
        totalUsdtRaised += usdtAmount;

        require(pvrToken.transfer(msg.sender, pvrAmount), "Presale: PVR transfer failed");
        emit TokensPurchased(msg.sender, usdtAmount, pvrAmount);
        return pvrAmount;
    }

    function updatePrice(uint256 newPrice) external onlyOwner {
        require(newPrice > 0, "Presale: invalid price");

        uint256 oldPrice = pvrPrice;
        pvrPrice = newPrice;
        emit PriceUpdated(oldPrice, newPrice);
    }

    function setPresaleActive(bool active) external onlyOwner {
        presaleActive = active;
        emit PresaleStatusUpdated(active);
    }

    function setMaxPurchasePerWallet(uint256 newLimit) external onlyOwner {
        uint256 oldLimit = maxPurchasePerWallet;
        maxPurchasePerWallet = newLimit;
        emit MaxPurchaseUpdated(oldLimit, newLimit);
    }

    function withdrawPVR(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Presale: invalid address");
        require(pvrToken.balanceOf(address(this)) >= amount, "Presale: insufficient PVR");
        require(pvrToken.transfer(to, amount), "Presale: PVR withdrawal failed");
    }

    function getPvrAmount(uint256 usdtAmount) external view returns (uint256) {
        return (usdtAmount * 10 ** 18) / pvrPrice;
    }

    function getUsdtAmount(uint256 pvrAmount) external view returns (uint256) {
        return (pvrAmount * pvrPrice) / 10 ** 18;
    }

    function remainingPvr() external view returns (uint256) {
        return pvrToken.balanceOf(address(this));
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Presale: zero owner");

        address previousOwner = owner;
        owner = newOwner;
        emit OwnershipTransferred(previousOwner, newOwner);
    }
}