import request from "supertest";
import app from "../src/server";
import { loginToken } from "./fixtures/db";

var token: string | undefined = undefined;
beforeAll(async ()=>{
    token = await loginToken();
});


test('Create Block', async () => {
        await request(app.app)
                .post('/api/exam')
                .set('Authorization', `Bearer ${token}`)
                .send({
                        "time-limit": "01:30",
                        "code": Math.floor(Math.random()*100000),
                        "name": "Final Exam Pre-Intermedate"
                    })
                .expect(201)
});