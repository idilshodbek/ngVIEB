import request from "supertest";
import app from "../src/server";
import { userOne, loginToken } from "./fixtures/db";


var token: string | undefined = undefined;
beforeAll(async ()=>{
    token = await loginToken();
});

test('Get User By Id', async () => {
        await request(app.app)
                .get('/api/users/' + userOne._id)
                .set('Authorization', `Bearer ${token}`)
                .send()
                .expect(200)
});
test('Get All Users List', async () => {
        await request(app.app)
                .get('/api/users')
                .set('Authorization', `Bearer ${token}`)
                .send()
                .expect(200)
});
test('Create User', async () => {
        await request(app.app)
                .post('/api/users')
                .set('Authorization', `Bearer ${token}`)
                .send({
                        "name": "John Wick",
                        "tel": "9067900010"+Math.floor(Math.random()*100000),
                        "role": "ceo",
                        "password": "123456#"
                })
                
                .expect(201)
});