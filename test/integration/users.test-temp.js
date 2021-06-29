// const request = require('supertest');
// const apiUsers = '/api/Users';
// const mongoose = require('mongoose');

// const { Users } = require('../../models/Users');
// let server;

// describe(apiUsers, () => {
//     beforeEach( async() => { 
//         server = require('../../index');
//     });
//     beforeEach( async() => { 
//         await Users.collection.deleteMany({});
//         server.close(); 
//     });

//     describe('GET /', () => {
//         it('should return all Users', async() => {
//             // await Users.collection.deleteMany({});
//             await Users.collection.insertMany([
//                 { name: 'User1', description: 'User1'},
//                 { name: 'User2', description: 'User2'}
//             ]);
//             const res = await request(server).get(apiUsers);
//             // console.log('res: ', res);  
//             expect(res.status).toBe(200);
//             expect(res.body.length).toBe(2);
//             expect(res.body.some(g => g.name === 'User1')).toBeTruthy();
//             expect(res.body.some(g => g.name === 'User2')).toBeTruthy();
//         });
//     });

//     describe('GET /:id', () => {
//         it('should return user object using id', async() => {
//             const nameUser1 = 'User1';
//             const nameUser2 = 'User2';
//             const result = await Users.collection.insertMany([
//                 { name: nameUser1, description: nameUser1},
//                 { name: nameUser2, description: nameUser2}
//             ]);
//             const newUserId = result.insertedIds['0'];
//             // console.log('result: ', result.insertedIds['0']);
//             const res = await request(server).get(apiUsers + '/' + newUserId);
//             // console.log('res: ', res.body);
//             // expect(res.body.name).toBe(nameUser1);
//             expect(res.status).toBe(200);
//             expect(res.body).toHaveProperty('name', nameUser1); 
//             // expect(res.body.some(g => g.name === nameUser1)).toBeTruthy();
//         })
//     });

//     describe('GET /:id', (req, res) => {
//         it('should return 404 if invalid is passed', async() => {
//             const fakeParamsId = '/1'
//             const user = await request(server).get(apiUsers + fakeParamsId);
//             expect(user.status).toBe(404);
//         })
//     });
// });