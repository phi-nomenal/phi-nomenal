pragma solidity ^0.4.6;

contract Quotation {
    uint public greenness;
    uint public deliveryDate;

    function Quotation(uint greenness_, uint deliveryDate_) {
        greenness = greenness_;
        deliveryDate = deliveryDate_;
    }
}
