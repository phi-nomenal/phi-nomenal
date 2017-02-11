pragma solidity ^0.4.6;
import './RFQ.sol';
import './Quotation.sol';

contract MatchingEngine {
    Quotation[] public quotations;

    function MatchingEngine() {
        addQuotation(new Quotation(100, 'in 3 weeks'));
        addQuotation(new Quotation(95, 'in 2 weeks'));
        addQuotation(new Quotation(25, 'in 2 hours'));
    }

    /*function getQuotations(RFQ rfq) constant returns (Quotation[]) {
        return quotations;
    }
*/
    function amountOfQuotations() constant returns (uint) {
        return quotations.length;
    }

    function addQuotation(Quotation quotation) {
        quotations.push(quotation);
    }
}
