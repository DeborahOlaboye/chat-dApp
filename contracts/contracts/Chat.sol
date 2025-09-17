// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Chat {
    string public domain;
    uint256 public registrationFee;

    struct User {
        string name;
        string imageHash;
        address userAddress;
        bool isRegistered;
    }

    struct Message {
        address sender;
        address receiver;
        string content;
        uint256 timestamp;
    }

    mapping(string => User) public nameToUser;
    mapping(address => string) public addressToName;
    mapping(address => Message[]) public messages;
    string[] public registeredNames;

    event UserRegistered(string indexed name, address indexed userAddress, string imageHash);
    event MessageSent(address indexed sender, address indexed receiver, string content, uint256 timestamp);

    constructor(string memory _domain, uint256 _registrationFee) {
        require(bytes(_domain).length > 0, "Domain cannot be empty");
        require(_registrationFee > 0, "Registration fee must be greater than 0");
        domain = _domain;
        registrationFee = _registrationFee;
        owner = msg.sender;
    }

    function registerUser(string memory _name, string memory _imageHash) external payable {
        require(msg.value >= registrationFee, "Insufficient registration fee");
        require(!nameToUser[_name].isRegistered, "Name already taken");
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(addressToName[msg.sender]).length == 0, "Address already registered");

        nameToUser[_name] = User({
            name: _name,
            imageHash: _imageHash,
            userAddress: msg.sender,
            isRegistered: true
        });
        string memory fullName = string(abi.encodePacked(_name, domain));
        addressToName[msg.sender] = fullName;
        registeredNames.push(_name);

        emit UserRegistered(_name, msg.sender, _imageHash);

        if (msg.value > registrationFee) {
            payable(msg.sender).transfer(msg.value - registrationFee);
        }
    }

    function sendMessage(string memory _receiverName, string memory _content) external {
        require(nameToUser[_receiverName].isRegistered, "Receiver not registered");
        require(bytes(addressToName[msg.sender]).length > 0, "Sender not registered");

        address receiver = nameToUser[_receiverName].userAddress;
        messages[receiver].push(Message({
            sender: msg.sender,
            receiver: receiver,
            content: _content,
            timestamp: block.timestamp
        }));

        emit MessageSent(msg.sender, receiver, _content, block.timestamp);
    }

    function getUserMessages(address _user) external view returns (Message[] memory) {
        return messages[_user];
    }

    function getAllRegisteredUsers() external view returns (User[] memory) {
        User[] memory users = new User[](registeredNames.length);
        for (uint256 i = 0; i < registeredNames.length; i++) {
            users[i] = nameToUser[registeredNames[i]];
        }
        return users;
    }

    function getFullName(address _user) external view returns (string memory) {
        return addressToName[_user];
    }

    address public owner;

    function withdraw() external {
        require(msg.sender == owner, "Only owner");
        payable(owner).transfer(address(this).balance);
    }
}