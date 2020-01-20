const mongoose = require('mongoose');

const Grocery = require('../models/grocery');

const Ctrl = require('./groceries');

describe('Grocery Controller', () => {

    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost/groceries', { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    describe('find()', () => {
        describe('when id is passed in', () => {
            it('should find the correct gorcery', async () => {
                const groceryData = { name: 'Apple', done: false, count: 1 };

                const validGrocery = new Grocery(groceryData);
                const savedGrocery = await validGrocery.save();

                const ctx = {
                    params: {
                        id: savedGrocery._id
                    }
                }

                await Ctrl.find(ctx);                
                
                expect(ctx.body._doc).toEqual(savedGrocery._doc);
            });
        });

        describe('when id is NOT passed in', () => {
            it('should fail', async () => {

                const ctx = {
                    params: {}
                }

                let err;
                try {
                    const findWithoutId = await Ctrl.find(ctx);

                    console.log('*** ', findWithoutId);
                    
                    error = findWithoutId;
                } catch (error) {
                    err = error
                }

                expect(err).toBeDefined();
                expect(err).toBeInstanceOf(Error);
            });
        });
    });

    // NOTE: Other tests would mimic the above very closely and are not worth baking out for this example

})