const testServer = require('supertest');
const app = require('../server');
// const bodyParser = require('body-parser');
// const sessionMiddleware = require('../modules/session-middleware');

// // Body parser middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Passport Session Configuration //
// app.use(sessionMiddleware);

test('Server should respond 200 to LOGOUT route /api/user/logout', () => {
    return testServer(app).post('/api/user/logout').then((response) => {
        expect(response.statusCode).toBe(200);
    });
});

test('Server should protect /user ', () => {
    return testServer(app).post('/api/user/login').then((response) => {
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
});

test('Route GET /api/brewing_role should return an array', () => {
    return testServer(app).get('/api/brewing_role').then((response) => {
        // expect(response.statusCode).toBe(200);
        expect(response.json()).toBe(false);
    });
});