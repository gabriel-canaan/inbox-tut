pragma solidity ^0.4.17;


contract Inbox {
    string public message;

    function Inbox(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }
}
/*0x8CA19eCE814Be86787c84ff603Ed9053546F2220*/
