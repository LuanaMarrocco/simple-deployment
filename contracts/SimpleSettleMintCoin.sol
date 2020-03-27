pragma solidity^0.6.4;

    contract SimpleSettleMintCoin {
    	string public name = 'SimpleSettleMintCoin';

    	string public symbol = 'SMC';

    	mapping (address => uint) balancesOfUsers;

    	constructor() public {
    		balancesOfUsers[msg.sender] = 10000;
    	}

      /**
      * @notice Send coin
      * @dev Send coin
      * @param _receive address
      * @param _amount uint
      * @return boolean bool
      */
    	function sendCoin(address _receive, uint _amount) public returns(bool) {
    		if (balancesOfUsers[msg.sender] < _amount)
    			return false;
    		balancesOfUsers[msg.sender] -= _amount;
    		balancesOfUsers[_receive] += _amount;
    		return true;
    	}

      /**
      * @notice Get the Balance of an address
      * @dev Get the balance of an address
      * @param _addr address
      * @return uint uint
      */
    	function getBalance (address _addr) public view returns(uint) {
    		return balancesOfUsers[_addr];
    	}

      /**
      * @notice Get the Balance of the msg.sender address
      * @dev Get the balance of the msg.sender address
      * @return uint uint
      */
    	function getPersonalBalance() public view returns(uint) {
    		return getBalance(msg.sender);
    	}
    }
