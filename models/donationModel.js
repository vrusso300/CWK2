const dbManager = require('../data/dbManager');



// New class to handle donations
class DonationDao {

    constructor(dbManager) {

        if (dbManager) {
            this.dbManager = dbManager;
            console.log('Db connected to donation model');
        }
        else {
            throw new Error('No db manager provided');
        }
    }

    

    // Initialiser method
    async donationInitializer() {

        const expirydate = new Date();

        // Makes the food expire in 7 days
        expirydate.setDate(expirydate.getDate() + 7);

        return new Promise((resolve, reject) => {
            const donations =
                [
                 
                ]


            donations.forEach(donation => {

                this.dbManager.db.findOne({ _id: donation._id }, (err, obj) => {
                    if (err) {
                        console.error("Error finding donation:", err);
                        reject(err);
                        return;
                    }

                    // If donation exists, reject the promise
                    if (obj) {
                        console.error("Donation already exists:", donation._id);
                        reject(new Error(`Donation already exists: ${donation._id}`));
                        return;
                    }

                    // Seed some donations
                    this.dbManager.db.insert(donation, (err, objs) => {
                        if (err) {
                            console.error("Error inserting donations:", err);
                            reject(err);
                            return;
                        }

                        // Went to plan
                        console.log("Donations inserted successfully.");


                    });

                });
            });
            resolve();
        });
    }

 
    // Get all donations
    async getDonations() {

        return new Promise((resolve, reject) => {
            this.dbManager.db.find({ dataStore: 'Donation' }, (err, docs) => {
                if (err) {
                    console.error("Error getting donations:", err);
                    reject(err);
                    return;
                }

                resolve(docs);
            });
        });

    }


    // Insert donation method into database
    async makeDonation(donation) {
        return new Promise((resolve, reject) => {
            // Insert donation
            this.dbManager.db.insert(donation, (err, obj) => {
                if (err) {
                    console.error("Error inserting donation:", err);
                    reject(err);
                    return;
                }

                console.log("Donation inserted successfully:", donation);
                resolve(obj._id);
            });
        });
    }

    
    

}


// Make new donation object, pass it to dbManager constructor
const donation = new DonationDao(dbManager);
donation.donationInitializer();
module.exports = donation;