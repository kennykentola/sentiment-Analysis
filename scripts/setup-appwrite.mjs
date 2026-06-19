import { Client, Databases, ID } from 'node-appwrite';

const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('sentiment')
    .setKey('standard_9e0bf634027d520310be3c586ffb7bbda0c9778187568202d73f69ba470bc7e95ff9d76aaa3a9b5934fae67f72ebf95f7481fd79de10387955ce363288ad57d3769b8dba55e4c9d029c5f6694a02733be72373a95b68a3504319b9744dedf2dfe9f4b7d9906751ecc2c0af09a7391cd9aa4ff750c136609ea4772a80b14d840c');

const databases = new Databases(client);

async function setup() {
    try {
        console.log('Creating database...');
        let dbId = 'sentiment_db';
        try {
            await databases.create(dbId, 'Sentiment Analysis DB');
            console.log('Database created.');
        } catch (e) {
            if (e.code === 409) console.log('Database already exists.');
            else throw e;
        }

        console.log('Creating Institutions collection...');
        try {
            await databases.createCollection(dbId, 'institutions', 'Institutions');
            await databases.createStringAttribute(dbId, 'institutions', 'name', 255, true);
            await databases.createStringAttribute(dbId, 'institutions', 'acronym', 50, false);
            await databases.createStringAttribute(dbId, 'institutions', 'region', 100, false);
            console.log('Institutions collection configured.');
        } catch (e) {
            if (e.code === 409) console.log('Institutions collection already exists.');
            else throw e;
        }

        console.log('Creating Opinions collection...');
        try {
            await databases.createCollection(dbId, 'opinions', 'Opinions');
            await databases.createStringAttribute(dbId, 'opinions', 'content', 10000, true);
            await databases.createStringAttribute(dbId, 'opinions', 'source', 100, true);
            await databases.createFloatAttribute(dbId, 'opinions', 'sentiment_score', false);
            await databases.createStringAttribute(dbId, 'opinions', 'sentiment_label', 50, false);
            await databases.createStringAttribute(dbId, 'opinions', 'institution_id', 50, false);
            console.log('Opinions collection configured.');
        } catch (e) {
            if (e.code === 409) console.log('Opinions collection already exists.');
            else throw e;
        }

        console.log('Creating SystemMetrics collection...');
        try {
            await databases.createCollection(dbId, 'system_metrics', 'System Metrics');
            await databases.createIntegerAttribute(dbId, 'system_metrics', 'total_posts', false);
            await databases.createFloatAttribute(dbId, 'system_metrics', 'avg_sentiment', false);
            await databases.createStringAttribute(dbId, 'system_metrics', 'date', 50, true);
            console.log('SystemMetrics collection configured.');
        } catch (e) {
            if (e.code === 409) console.log('SystemMetrics collection already exists.');
            else throw e;
        }

        console.log('All done!');
    } catch (error) {
        console.error('Error setting up Appwrite:', error);
    }
}

setup();
