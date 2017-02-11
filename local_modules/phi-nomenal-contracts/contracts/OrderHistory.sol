pragma solidity ^0.4.6;

import './OrderHistoryLeg.sol';
import './Location.sol';

contract OrderHistory {
    OrderHistoryLeg[] public legs;

    function amountOfLegs() constant returns (uint) {
        return legs.length;
    }

    function add(OrderHistoryLeg leg) {
        legs.push(leg);
    }

    function addDemoData() {
        Location factoryLocation = new Location(Location.LocationType.Factory, 'Changzou');
        Location warehouseLocation = new Location(Location.LocationType.Warehouse, 'Poland');
        Location retailerLocation = new Location(Location.LocationType.Retailer, 'Groningen');
        Location consumerLocation = new Location(Location.LocationType.Consumer, 'Anja');

        OrderHistoryLeg leg1 = new OrderHistoryLeg(
            OrderHistoryLeg.Mode.Airplane, 4200, 500,
            factoryLocation, warehouseLocation);
        OrderHistoryLeg leg2 = new OrderHistoryLeg(
            OrderHistoryLeg.Mode.Truck, 700, 120,
            warehouseLocation, retailerLocation);
        OrderHistoryLeg leg3 = new OrderHistoryLeg(
            OrderHistoryLeg.Mode.Bike, 10, 2,
            retailerLocation, consumerLocation);

        legs.push(leg1);
        legs.push(leg2);
        legs.push(leg3);
    }
}
