
import { client } from './src/services/redis/client';
import { itemsIndexKey } from './src/services/keys';

const run = async () => {
    try {
        await client.connect();
        console.log('Connected to Redis');
        
        const indexName = itemsIndexKey();
        console.log(`Attempting to drop index: ${indexName}`);

        try {
            await client.ft.dropIndex(indexName);
            console.log('Index dropped successfully.');
        } catch (err: any) {
             console.log('Index might not exist or error:', err.message);
        }
    } catch (err) {
        console.error('Failed to run:', err);
    } finally {
        await client.disconnect();
    }
};

run();
