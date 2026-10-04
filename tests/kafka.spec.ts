import { test, expect } from '@playwright/test';
import { KafkaUtil } from '../utils/KafkaUtil.ts';

test.describe('Kafka Integration', () => {
  const kafka = new KafkaUtil();

  test.beforeAll(() => kafka.init());
  test.afterAll(() => kafka.close());

  test('Produce OrderCreated -> Consume OrderFulfilled', async ({ request }) => {
    const orderId = `ORD-${Date.now()}`;

    // 1. Produce event
    await kafka.produce('orders.created.v1', orderId, { orderId, amount: 150 });

    // 2. Check API status
    const res = await request.get(`/api/v1/orders/${orderId}`);
    expect(res.status()).toBe(200);

    // 3. Consume & assert event
    const event = await kafka.waitForEvent('orders.fulfilled.v1', orderId);
    expect(event).toMatchObject({
      orderId,
      status: 'FULFILLED',
    });
  });
});