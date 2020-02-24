const Ethbay = artifacts.require("Ethbay");
//const Hospital = artifacts.require("Hospital");
require('chai')
.use(require('chai-as-promised'))
.should();
/*
contract(Ethbay,([deployer, seller, buyer])=>{
    let ethbay;
    before(async () =>{
        ethbay = await Ethbay.deployed()
    })
    describe('Deployment', async()=>{
        it('The deployment should be done successfully',async() =>{
            const address = await ethbay.address
            assert.notEqual(address,0x0)
            assert.notEqual(address,'')
            assert.notEqual(address,null)
            assert.notEqual(address,undefined) 
        })

        it('The deployed smart contract has the correct name', async()=>{
            const name = await ethbay.storeName();
            assert.equal(name, 'EECE571 ETHBAY.COM')
        })
    })

    describe('Adding and sellig item', async()=>{
        let result, totalNumber
        
        before(async ()=>{
            result = await ethbay.createItem('T-Shirt', web3.utils.toWei('1', 'Ether'),{from: seller})
            totalNumber = await ethbay.totalNumber()
        })
        it ('Creating item should be successful if all correct', async ()=>{
            //SUCCESSFUL
            assert.equal(totalNumber,1);
            const event = result.logs[0].args;
            assert.equal(event.itemId.toNumber(), totalNumber.toNumber(), 'item id is correct');
            assert.equal(event.itemName, 'T-Shirt','item name is correct');
            assert.equal(event.itemPrice, '1000000000000000000','item price is correct');
            assert.equal(event.itemOwner, seller, 'item owner is correct');
            assert.equal(event.isItemSold, false, 'item not sold is correct');
        })

        it ('Creating item should be failed if either no name or no price', async ()=>{
            //Product must have a name
            await ethbay.createItem('', web3.utils.toWei('1','Ether'), {from: seller}).should.be.rejected;
            //Price must be greater than 0
            await ethbay.createItem('T-Shirt', web3.utils.toWei('0','Ether'), {from: seller}).should.be.rejected;
        })

        it ('Check the item created', async ()=>{
            const item = await ethbay.items(totalNumber);
            assert.equal(item.itemId.toNumber(), totalNumber.toNumber(), 'Item id is correct');
            assert.equal(item.itemName, 'T-Shirt','Item name is correct');
            assert.equal(item.itemPrice, '1000000000000000000','Item price is correct');
            assert.equal(item.itemOwner, seller, 'Item owner is correct');
            assert.equal(item.isItemSold, false, 'item not sold is correct');
        })

        it('Sell the item', async () => {
            let sellerOldBalance;
            sellerOldBalance = await web3.eth.getBalance(seller);
            sellerOldBalance = new web3.utils.BN(sellerOldBalance);

            // SUCCESS: Buyer makes purchase
            result = await ethbay.buyItem(totalNumber, {from: buyer, value: web3.utils.toWei('1', 'Ether')});

            // Check Log
            const event = result.logs[0].args;
            assert.equal(event.itemId.toNumber(), totalNumber.toNumber(), 'Item id is correct');
            assert.equal(event.itemName, 'T-Shirt','Item name is correct');
            assert.equal(event.itemPrice, '1000000000000000000','Item price is correct');
            assert.equal(event.itemOwner, buyer, 'Item owner is correct');
            assert.equal(event.isItemSold, true, 'Item sold is correct');

            // Check the seller receives the funds
            let sellerNewBalance;
            sellerNewBalance = await web3.eth.getBalance(seller);
            sellerNewBalance = await new web3.utils.BN(sellerNewBalance);

            let price;
            price = web3.utils.toWei('1', 'Ether');
            price = new web3.utils.BN(price);

            const expectedBalacne = sellerOldBalance.add(price);
            assert.equal(expectedBalacne.toString(), sellerNewBalance.toString());
        })
        it('Selling the item twice should be rejected', async () => {
            // FAILURE: Cannot be purchased twice
            await ethbay.buyItem(totalNumber, {from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
        })
        it('Selling the item with wrong Id should be rejected', async () => {
            // FAILURE: Invalid Item ID
            await ethbay.buyItem(99, {from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected; 
        })
        it('Adding another testing item should be succefully done', async () => {
            await ethbay.createItem('Something', web3.utils.toWei('1', 'Ether'),{from: seller});
        })
        it('Buying the item with insufficient fund should be failed', async () => {
            // FAILURE: Invalid Value in Payment
            await ethbay.buyItem(totalNumber, {from: buyer, value: web3.utils.toWei('0.5', 'Ether')}).should.be.rejected;
        })

        it('Seller buying item from her/hisself should be rejected', async () => {  
            // FAILURE: Invalid Buyer cannot be the Seller
            await ethbay.buyItem(totalNumber, {from: seller, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
        })


    })
});
*/

contract(Ethbay,([owner, patient1, patient2])=>{
    let hospital;
    before(async () =>{
        hospital = await Ethbay.deployed()
    })
    /* first describe block */
    describe('Deployment should be successful',async () =>{
        it('The deployment should be done successfully',async() =>{
            const address = await hospital.address
            assert.notEqual(address,0x0)
            assert.notEqual(address,'')
            assert.notEqual(address,null)
            assert.notEqual(address,undefined) 
        })

        it('The deployment contract has correct name',async() =>{
            const name = await hospital.hospitalName();
            assert.equal(name, 'Ethbay hospital')
        })

    })
    /* Second describe block */
    describe('Booking Appointment', async () => {
        let result, totalNumber, cancelresult
        
        before(async ()=>{
            result = await hospital.bookAppointment('Harry', web3.utils.toWei('1', 'Ether'),{from: patient1, value: web3.utils.toWei('1', 'Ether')} )
            totalNumber = await hospital.totalNumber()
        })

        it ('Appointment booking should be correct', async ()=>{
            //SUCCESSFUL
            assert.equal(totalNumber,1);
            const event = result.logs[0].args;
            assert.equal(event.appointmentId.toNumber(), totalNumber.toNumber(), 'item id is correct');
            assert.equal(event.isBooked, true,'Appointment not booked yet');
            assert.equal(event.price, '1000000000000000000','Appointment price is correct');
            assert.equal(event.patientName, 'Harry', 'Patient Name is correct');
            assert.equal(event.patient, patient1, 'item owner is correct');
            
        })

        it ('Appointment should not be created if name is empty or price is emplty', async ()=>{
            //Patient must have a name
            await hospital.bookAppointment('', web3.utils.toWei('1','Ether'), {from: patient1, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
            //Price must be greater than 0
            await hospital.bookAppointment('Harry', web3.utils.toWei('0','Ether'), {from: patient1, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
            
        })

        it ('Check the appointment created', async ()=>{
            const item = await hospital.appointments(patient1);
            assert.equal(item.appointmentId.toNumber(), totalNumber.toNumber(), 'Item id is correct');
            assert.equal(item.isBooked, true,'Appointment booked');
            assert.equal(item.price, '1000000000000000000','Appointment price is correct');
            assert.equal(item.patientName, 'Harry', 'Patient Name is correct');
            assert.equal(item.patient, patient1, 'item owner is correct');         

        })

        /* check cancellation */
        it('Check cancellation', async () => {
            cancelResult = await hospital.cancelAppointment( {from: patient1});
            const event = cancelResult.logs[0].args;
            assert.equal(event.isBooked, false,'Appointment cancelled');            

        })

        //check if cancelled from valid account
        it('Only booker should be able to cancel', async () => {  
            
            await hospital.cancelAppointment( {from: patient2}).should.be.rejected;
        })

        //owner should not be able to make appointment
        it('Owner should not be able to book appointment', async () => {
            
            await hospital.bookAppointment('', web3.utils.toWei('1','Ether'), {from: owner, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
        })
        //owner should not be able to cancel
        it('Only booker should be able to cancel', async () => {  
         
            await hospital.cancelAppointment( {from: owner}).should.be.rejected;
        })

    })

    

});