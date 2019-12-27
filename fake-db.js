const Messege = require('./models/messege');
const User = require('./models/user');

const fakeDbData = require('./data.json');

class FakeDb {

    constructor() {
        this.messeges = fakeDbData.messeges;
        this.users = fakeDbData.users;
    }

    async cleanDb() {
        await User.deleteMany({});
        await Messege.deleteMany({});
    }

    pushDataToDb() {
        const user = new User(this.users[0]);
        const user2 = new User(this.users[1]);

        this.messeges.forEach((messege) => {
            const newMessege = new Messege(messege);
            newMessege.user = user;

            user.messeges.push(newMessege);
            newMessege.save();
        });

        user.save();
        user2.save();
    }

    async seedDb() {
        await this.cleanDb();
        this.pushDataToDb();
    }
}

module.exports = FakeDb;
