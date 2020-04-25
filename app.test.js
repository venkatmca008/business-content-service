
 const request = require('supertest')
 const app = require('./app')
 
 
 test('Check the App', async () => {
     const response = await request(app).get('/api/flightschedule/4');
     expect(response.status).toBe(200);
 });
 
 test('Health Check', async () => {
    const response = await request(app).get('/_healthcheck');
    expect(response.status).toBe(200);
});

