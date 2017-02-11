pragma solidity ^0.4.6;

import './OrderHistoryLeg.sol';

contract OrderHistory {
    OrderHistoryLeg[] legs;

    function amountOfLegs() constant returns (uint) {
        return legs.length;
    }

    function add(OrderHistoryLeg leg) {
        legs.push(leg);
    }
}
