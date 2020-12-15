const request = require('supertest');

const app = require('../../../app');

describe('POST /api/v1/balances/reserve', () => {
  it('should return OK if amount is reserved successfully', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const response = await request(app).post('/api/v1/balances/reserve').send({
      clientId: '38c3de93-874d-444c-b83f-11e89cca252b',
      branch: '0001',
      account: '12345',
      ammount: 100,
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      branch: '0001',
      account: '12345',
      total: 1100,
      reserved: 700,
      unreserved: 400,
    });
    done();
  });

  it('should throw UnprocessableEntityError if amount is greater than balance', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const response = await request(app).post('/api/v1/balances/reserve').send({
      clientId: '38c3de93-874d-444c-b83f-11e89cca252b',
      branch: '0001',
      account: '12345',
      ammount: 100000,
    });

    expect(response.status).toBe(422);
    done();
  });
  it('should throw NotFoundError if balance not found', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables/clients');
    await request(app).post('/api/v1/populate-tables/ammounts');

    const response = await request(app).post('/api/v1/balances/reserve').send({
      clientId: '38c3de93-874d-444c-b83f-11e89cca252b',
      branch: '0001',
      account: '12345',
      ammount: 100,
    });

    expect(response.status).toBe(404);
    done();
  });
  it('should throw NotFoundError if account not found', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const response = await request(app).post('/api/v1/balances/reserve').send({
      clientId: '28c3de93-874d-444c-b83f-11e89cca252b',
      branch: '0001',
      account: '12345',
      ammount: 100,
    });

    expect(response.status).toBe(404);
    done();
  });
  it('should throw UnprocessableEntityError if amount is zero', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const response = await request(app).post('/api/v1/balances/reserve').send({
      clientId: '38c3de93-874d-444c-b83f-11e89cca252b',
      branch: '0001',
      account: '12345',
      ammount: 0,
    });

    expect(response.status).toBe(422);
    done();
  });

  it('should throw UnprocessableEntityError if amount is negative', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const response = await request(app).post('/api/v1/balances/reserve').send({
      clientId: '38c3de93-874d-444c-b83f-11e89cca252b',
      branch: '0001',
      account: '12345',
      ammount: -100,
    });

    expect(response.status).toBe(422);
    done();
  });

  it('should return BadRequestError if wrong request', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');

    const response = await request(app)
      .post('/api/v1/balances/reserve')
      .send({});

    expect(response.status).toBe(400);
    done();
  });

  it('should throw InternalServerError if an unknown error occurs', async (done) => {
    await request(app).post('/api/v1/drop-tables');
    const response = await request(app).post('/api/v1/balances/reserve').send({
      clientId: '38c3de93-874d-444c-b83f-11e89cca252b',
      branch: '0001',
      account: '12345',
      ammount: 100,
    });

    expect(response.status).toBe(500);
    done();
  });
  it('should return InternalServerError if account balance not found', async (done) => {
    const queries = require('../queries');
    const mock = jest.spyOn(queries, 'getBalance');
    mock.mockResolvedValueOnce(null);

    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const response = await request(app).post('/api/v1/balances/reserve').send({
      clientId: '38c3de93-874d-444c-b83f-11e89cca252b',
      branch: '0001',
      account: '12345',
      ammount: 100,
    });

    mock.mockRestore();
    expect(response.status).toBe(404);
    done();
  });
  it('should return InternalServerError if no account was updated', async (done) => {
    const queries = require('../queries');
    const mock = jest.spyOn(queries, 'update');
    mock.mockResolvedValueOnce([null]);

    await request(app).post('/api/v1/drop-tables');
    await request(app).post('/api/v1/create-tables');
    await request(app).post('/api/v1/populate-tables');

    const response = await request(app).post('/api/v1/balances/reserve').send({
      clientId: '38c3de93-874d-444c-b83f-11e89cca252b',
      branch: '0001',
      account: '12345',
      ammount: 100,
    });

    mock.mockRestore();
    expect(response.status).toBe(500);
    done();
  });
});