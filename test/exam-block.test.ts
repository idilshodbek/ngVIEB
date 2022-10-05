import request from "supertest";
import app from "../src/server";
import { userOne, loginToken } from "./fixtures/db";


var token: string | undefined = undefined;
beforeAll(async ()=>{
    token = await loginToken();
});

// test('Get User By Id', async () => {
//         await request(app.app)
//                 .get('/api/users/' + userOne._id)
//                 .set('Authorization', `Bearer ${token}`)
//                 .send()
//                 .expect(200)
// });
// test('Get All Users List', async () => {
//         await request(app.app)
//                 .get('/api/users')
//                 .set('Authorization', `Bearer ${token}`)
//                 .send()
//                 .expect(200)
// });
test('Create Exam Block', async () => {
        await request(app.app)
                .post('/api/exam/block')
                .set('Authorization', `Bearer ${token}`)
                .send({
                        "time-limit": "01:30",
                        "code": Math.floor(Math.random()*100000),
                        "name": "Final Exam Pre-Intermedate"
                    })
                .expect(201)
});