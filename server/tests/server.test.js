const testServer = require('supertest');
const app = require('../server');

test('Server should respond 200 to LOGOUT route /api/user/logout', () => {
    return testServer(app).post('/api/user/logout').then((response) => {
        expect(response.statusCode).toBe(200);
    });
});

test('Server should protect /user ', () => {
    testServer(app).post('/api/user/login').then((response) => {
        expect(response.statusCode).toBe(400);
    });
});

test('Server should allow logged in users access', () => {
    let agent = testServer.agent(app);
    return agent
        .post('/api/user/login')
        .send({ username: 'michael', password: '123' })
        .then((response) => {
            expect(response.statusCode).toBe(200);
            return agent.get('/api/user').then((userResponse) => {
                expect(userResponse.statusCode).toBe(200);
            });
        });
})