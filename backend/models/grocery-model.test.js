const mongoose = require('mongoose');

const Grocery = require('./grocery');

describe('Grocery Model', () => {

    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost/groceries', { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    afterAll(() => {
        mongoose.connection.db.dropDatabase();
    });

    describe('when all required fields are passed in', () => {
        it('should create & save grocery successfully', async () => {
            const groceryData = { name: 'Apple', done: false, count: 1 };

            const validGrocery = new Grocery(groceryData);
            const savedGrocery = await validGrocery.save();
            // Object Id should be defined when successfully saved to MongoDB.
            expect(savedGrocery._id).toBeDefined();
            expect(savedGrocery.name).toBe(groceryData.name);
            expect(savedGrocery.done).toBe(groceryData.done);
            expect(savedGrocery.count).toBe(groceryData.count);
        });
    });

    describe('when fields not in the schema are passed in', () => {
        it('should not save undefined fields to the DB', async () => {
            const groceryWithInvalidField = new Grocery({ name: 'Bread', done: false, count: 2, color: 'Purple' });
            const savedGroceryWithInvalidField = await groceryWithInvalidField.save();
            expect(savedGroceryWithInvalidField._id).toBeDefined();
            expect(savedGroceryWithInvalidField.color).toBeUndefined();
        });
    });

    describe('when not all required fields are passed in', () => {
        it('should fail without requied fields', async () => {
            const groceryWithoutRequiredField = new Grocery({ name: 'Taco' });
            let err;
            try {
                const savedGroceryWithoutRequiredField = await groceryWithoutRequiredField.save();
                error = savedGroceryWithoutRequiredField;
            } catch (error) {
                err = error
            }
            expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
            expect(err.errors.count).toBeDefined();
            expect(err.errors.done).toBeDefined();
        });
    });


})