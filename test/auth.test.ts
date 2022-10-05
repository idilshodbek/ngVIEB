import request from "supertest";
import app from "../src/server";
import { loginToken } from "./fixtures/db";

var token: string | undefined = undefined;
beforeAll(async ()=>{
    token = await loginToken();
});

test('Login User', async () => {
        await request(app.app)
                .post('/api/auth/login')
                .send({
                        "tel": "906790008",
                        "password": "123456#"
                })
                .expect(200)
});