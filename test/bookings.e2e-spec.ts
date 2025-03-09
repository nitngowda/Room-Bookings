import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('Bookings API (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], 
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'admin', password: 'admin123' });

    token = loginResponse.body.accessToken;
  });

  it('/bookings (POST) should create a booking', async () => {
    return request(app.getHttpServer())
      .post('/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: 1,
        roomId: 2,
        startTime: '2025-03-10T10:00:00.000Z',
        endTime: '2025-03-10T12:00:00.000Z',
      })
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
