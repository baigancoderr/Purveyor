// SPDX-License-Identifier: MIT
pragma solidity 0.8.35;

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() {
        _owner = _msgSender();
        emit OwnershipTransferred(address(0), _owner);
    }

    function owner() public view virtual returns (address) {
        return _owner;
    }

    modifier onlyOwner() {
        require(_owner == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }

    function renounceOwnership() public virtual onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }
}

interface IERC20 {
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Transfer(address indexed from, address indexed to, uint256 value);

    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

contract PVRToken is Context, IERC20, Ownable {
    string public constant name = "Purveyor";
    string public constant symbol = "PVR";
    uint8 public constant decimals = 18;
    uint256 public constant totalSupply = 1_000_000_000 * 10 ** 18;
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    constructor() {
        _balances[_msgSender()] = totalSupply;
        emit Transfer(address(0), _msgSender(), totalSupply);
    }

    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }

    function allowance(address tokenOwner, address spender) public view override returns (uint256) {
        return _allowances[tokenOwner][spender];
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        _transfer(_msgSender(), to, amount);
        return true;
    }

    function approve(address spender, uint256 amount) public override returns (bool) {
        _approve(_msgSender(), spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        uint256 currentAllowance = _allowances[from][_msgSender()];
        require(currentAllowance >= amount, "PVR: insufficient allowance");

        unchecked {
            _allowances[from][_msgSender()] = currentAllowance - amount;
        }

        emit Approval(from, _msgSender(), currentAllowance - amount);
        _transfer(from, to, amount);
        return true;
    }

    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        uint256 newAllowance = _allowances[_msgSender()][spender] + addedValue;
        _approve(_msgSender(), spender, newAllowance);
        return true;
    }

    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        uint256 currentAllowance = _allowances[_msgSender()][spender];
        require(currentAllowance >= subtractedValue, "PVR: decreased allowance below zero");

        unchecked {
            currentAllowance -= subtractedValue;
        }

        _approve(_msgSender(), spender, currentAllowance);
        return true;
    }

    function rescueToken(address tokenAddress, address to, uint256 amount) external onlyOwner {
        require(tokenAddress != address(0), "PVR: invalid token");
        require(to != address(0), "PVR: invalid recipient");
        require(IERC20(tokenAddress).transfer(to, amount), "PVR: token transfer failed");
    }

    function rescueBNB(address payable to, uint256 amount) external onlyOwner {
        require(to != address(0), "PVR: invalid recipient");
        require(address(this).balance >= amount, "PVR: insufficient BNB");

        (bool success, ) = to.call{value: amount}("");
        require(success, "PVR: BNB transfer failed");
    }

    function _transfer(address from, address to, uint256 amount) internal {
        require(from != address(0), "PVR: transfer from zero");
        require(to != address(0), "PVR: transfer to zero");

        uint256 fromBalance = _balances[from];
        require(fromBalance >= amount, "PVR: insufficient balance");

        unchecked {
            _balances[from] = fromBalance - amount;
            _balances[to] += amount;
        }

        emit Transfer(from, to, amount);
    }

    function _approve(address tokenOwner, address spender, uint256 amount) internal {
        require(tokenOwner != address(0), "PVR: approve from zero");
        require(spender != address(0), "PVR: approve to zero");

        _allowances[tokenOwner][spender] = amount;
        emit Approval(tokenOwner, spender, amount);
    }

    receive() external payable {}
}