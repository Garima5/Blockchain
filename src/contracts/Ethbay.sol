pragma solidity ^0.5.0;

/*
contract Ethbay {
    string public storeName;
    uint public totalNumber = 0;
    struct Item {
        uint itemId;
        string itemName;
        uint itemPrice;
        address payable itemOwner;
        bool isItemSold;
    }

    mapping(uint => Item) public items;

    event ItemReady(
        uint itemId,
        string itemName,
        uint itemPrice,
        address payable itemOwner,
        bool isItemSold
    );

    event ItemSold(
        uint itemId,
        string itemName,
        uint itemPrice,
        address payable itemOwner,
        bool isItemSold
    );

    constructor() public {
        storeName = "EECE571 ETHBAY.COM";
    }

    function createItem(string memory _itemName, uint _itemPrice) public {
        require(bytes(_itemName).length > 0, "Item's name is required!");
        require(_itemPrice > 0, "Item's price is required!");
        totalNumber++;
        items[totalNumber] = Item(totalNumber, _itemName, _itemPrice, msg.sender, false);
        emit ItemReady(totalNumber, _itemName, _itemPrice, msg.sender, false);  
    }

    function buyItem(uint _itemId) public payable {
        Item memory _item = items[_itemId];
        address payable _seller = _item.itemOwner;
        require(_item.itemId > 0 && _item.itemId <= totalNumber, "Item should be ready to sell!");
        require(msg.value >= _item.itemPrice, "Payment should be enough!" );
        require(!_item.isItemSold, "Item should not been sold yet!");
        require(msg.sender != _seller, "Cannot buy himself/herself");

        _item.itemOwner = msg.sender;
        _item.isItemSold = true;
        items[_itemId] = _item;
        _seller.transfer(msg.value);
        emit ItemSold(_item.itemId, _item.itemName, _item.itemPrice, msg.sender, true);
    }

}
*/
contract Ethbay{
    //hospital naame
    // owner
    //appointment
    //mapping
    //events:
    // appointment book, appointment cancel
    //functions
    //book, cancel appointments
    string public hospitalName;
    address payable owner;
    uint public totalNumber = 0;
    struct appointment{
        uint appointmentId;
        bool isBooked;
        uint price;
        string patientName; 
        address payable patient;       
    }
    mapping (address  => appointment) public appointments;
    mapping (address  => bool )public isBooked; //
    event appointmentBooked(
        uint appointmentId,
        bool isBooked,
        uint price,
        string patientName,   
        address payable patient
    );
    event appointmentCancel(
       uint appointmentId,
        bool isBooked,
        uint price,
        string patientName,   
        address payable patient  
    );
    // in book appointment - pay to owner, in cancel - pay back
    constructor() public{
        hospitalName = 'Ethbay hospital';
        owner = msg.sender;
    }
    function bookAppointment(string memory patientName, uint price)public payable{
        //patientname not empty, price not empty
        require(bytes(patientName).length >0,'patient name can not be empty');
        require(price>0, 'Price should be defined');
        //owner is not booking
        require(msg.sender!= owner, 'Owner cant make appointments');
        //isbooked nahi honi chahioe
        require(isBooked[msg.sender] == false, 'One appointment at one time');
        require(msg.value >= price,'have enough money');
        totalNumber++;
        appointments[msg.sender]= appointment(totalNumber, true, price, patientName, msg.sender);
        isBooked[msg.sender]= true;
        owner.transfer(msg.value);
        emit appointmentBooked(totalNumber, true, price, patientName, msg.sender);      

    }
    function cancelAppointment()public{
        //appointment from customer should be booked
        //patient id for the appointment should be same - same person is able to cancel the appointment
        //owner cannot cancel the appointment
        require(isBooked[msg.sender]==true,'Patient should have booked the appointment');
        appointment memory appt = appointments[msg.sender];
        require(appt.patient == msg.sender, 'Only patient can cancel the appointment');
        require(msg.sender != owner, 'owner can not cancel');
        isBooked[msg.sender]=false;
        //appt.patient = '0x0';
        appt.patientName='';
        emit appointmentCancel(appt.appointmentId, false, appt.price,'',appt.patient);

    }
    /*
    function refund(address payable patient)public{
        //owner should have enough funds
        //msg.sender = owner
        //appointment should be booked
    }
    */
    
}