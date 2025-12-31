import type { CreateBidAttrs, Bid } from '$services/types';
import { client, withLock } from '$services/redis';
import { bidHistoryKey, itemsKey, itemsBypriceKey } from '$services/keys';
import { DateTime } from 'luxon';
import { getItem } from './items';

export const createBid = async (attrs: CreateBidAttrs) => {

		return withLock(attrs.itemId, async (lockedClient: typeof client, signal: any) => {

		const item = await getItem(attrs.itemId);
		if(!item) {
			throw new Error('Item not found');
		}
		if(attrs.amount <= item.price) {
			throw new Error('Bid amount must be greater than current bid');
		}

		if(item.endingAt.diff(DateTime.now()).toMillis() < 0){
			throw new Error('Bidding time has ended for this item');
		}


		const serialized = serializeHistory(attrs.amount, attrs.createdAt.toMillis());

		if(signal.expired) {
			throw new Error('Could not acquire lock, please try again');
		}
		return Promise.all([
			lockedClient.rPush(bidHistoryKey(attrs.itemId), serialized),
			lockedClient.hSet(itemsKey(item.id), {
					bids: item.bids + 1,
					price: attrs.amount,
					highestBidderId: attrs.userId
				}),
			lockedClient.zAdd(itemsBypriceKey(), {
					value: item.id,
					score: attrs.amount
				})
		]);
	});


	// return client.executeIsolated( async (isolatedClient) => {

	// 	await isolatedClient.watch(itemsKey(attrs.itemId));

	// 	const item = await getItem(attrs.itemId);
	// 	if(!item) {
	// 		throw new Error('Item not found');
	// 	}
	// 	if(attrs.amount <= item.price) {
	// 		throw new Error('Bid amount must be greater than current bid');
	// 	}

	// 	if(item.endingAt.diff(DateTime.now()).toMillis() < 0){
	// 		throw new Error('Bidding time has ended for this item');
	// 	}


	// 	const serialized = serializeHistory(attrs.amount, attrs.createdAt.toMillis());
	// 	return isolatedClient
	// 	.multi()
	// 	.rPush(bidHistoryKey(attrs.itemId), serialized)
	// 	.hSet(itemsKey(item.id), {
	// 			bids: item.bids + 1,
	// 			price: attrs.amount,
	// 			highestBidderId: attrs.userId
	// 		})
	// 		.zAdd(itemsBypriceKey(), {
	// 			value: item.id,
	// 			score: attrs.amount
	// 		})
	// 	.exec();
	// });



};

export const getBidHistory = async (itemId: string, offset = 0, count = 10): Promise<Bid[]> => {
	const startIndex = -1 * offset - count;
	const endIndex = -1 - offset;

	const range = await client.lRange(
		bidHistoryKey(itemId),
		startIndex,
		endIndex
	)

	return range.map(bid => deserializeHistory(bid));
};


const serializeHistory = (amount: number, createdAt: number) => {
	return `${amount}:${createdAt}`;
}

const deserializeHistory = (data: string): Bid => {
	const [amountStr, createdAtStr] = data.split(':');
	return {
		amount: parseFloat(amountStr),
		createdAt: DateTime.fromMillis(parseInt(createdAtStr))
	};
}