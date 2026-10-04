import { Kafka } from 'kafkajs';


export class KafkaUtil {
  private kafka = new Kafka({
    clientId: 'pw-runner',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
  });

  private producer = this.kafka.producer();
  private consumer = this.kafka.consumer({ groupId: `test-${Date.now()}` });

  async init() {
    await this.producer.connect();
    await this.consumer.connect();
  }

  async close() {
    await this.producer.disconnect();
    await this.consumer.disconnect();
  }

  async produce(topic: string, key: string, payload: object) {
    await this.producer.send({
      topic,
      messages: [{ key, value: JSON.stringify(payload) }],
    });
  }

  async waitForEvent(topic: string, key: string, timeoutMs = 10000): Promise<any> {
    await this.consumer.subscribe({ topic, fromBeginning: false });

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(`Timeout waiting for ${key}`)), timeoutMs);

      this.consumer.run({
        eachMessage: async ({ message }) => {
          if (message.key?.toString() === key) {
            clearTimeout(timer);
            resolve(JSON.parse(message.value?.toString() || '{}'));
          }
        },
      });
    });
  }
}