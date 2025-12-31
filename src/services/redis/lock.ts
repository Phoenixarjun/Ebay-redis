import { randomBytes } from 'crypto';
import { client } from '../redis/client';

export const withLock = async (key: string, cb: (redisClient: Client, signal: any) => any) => {
	const retryDelayMs = 100;
	let retries = 20;
	const timeoutMs = 2000;

	const token = randomBytes(6).toString('hex');
	const lockKey = `lock:${key}`;

	while(retries >= 0){
		retries--;
		const acquired = await client.set(lockKey, token, { NX: true, PX: 2000 });
		if (acquired) {
			try {
				const signal = { expired: false };
				setTimeout(() => {
					signal.expired = true;
				}, timeoutMs);
				const proxiedClient = buildClientProxy(timeoutMs);
				return await cb(proxiedClient, signal);
			} finally {
				await client.unlock(lockKey, token);
			}
		}
		await pause(retryDelayMs);
	}

};



type Client = typeof client;
const buildClientProxy = (timeoutMs: number) => {
	const startTime = Date.now();
	const handler = {
		get(target: Client, prop: string | symbol){
			if(Date.now() >= startTime + timeoutMs) {
				throw new Error('Lock expired');
			}

			const value = target[prop as keyof Client];
			return typeof value === 'function' ? value.bind(target) : value;
		}
	}

	return new Proxy(client, handler) as Client;
};

const pause = (duration: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, duration);
	});
};
