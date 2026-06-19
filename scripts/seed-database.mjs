import { Client, Databases, ID } from 'node-appwrite';

const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('sentiment')
    .setKey('standard_9e0bf634027d520310be3c586ffb7bbda0c9778187568202d73f69ba470bc7e95ff9d76aaa3a9b5934fae67f72ebf95f7481fd79de10387955ce363288ad57d3769b8dba55e4c9d029c5f6694a02733be72373a95b68a3504319b9744dedf2dfe9f4b7d9906751ecc2c0af09a7391cd9aa4ff750c136609ea4772a80b14d840c');

const databases = new Databases(client);
const DB_ID = 'sentiment_db';

async function seed() {
    try {
        console.log('Upgrading Institutions schema...');
        try { await databases.createIntegerAttribute(DB_ID, 'institutions', 'volume', false); } catch(e){}
        try { await databases.createFloatAttribute(DB_ID, 'institutions', 'negativeScore', false); } catch(e){}
        try { await databases.createStringAttribute(DB_ID, 'institutions', 'status', 50, false); } catch(e){}

        console.log('Upgrading SystemMetrics schema...');
        try { await databases.createIntegerAttribute(DB_ID, 'system_metrics', 'positive', false); } catch(e){}
        try { await databases.createIntegerAttribute(DB_ID, 'system_metrics', 'negative', false); } catch(e){}
        try { await databases.createIntegerAttribute(DB_ID, 'system_metrics', 'neutral', false); } catch(e){}
        
        console.log('Creating GlobalAnalytics collection...');
        try {
            await databases.createCollection(DB_ID, 'global_analytics', 'Global Analytics');
            await databases.createStringAttribute(DB_ID, 'global_analytics', 'distribution', 5000, false);
            await databases.createStringAttribute(DB_ID, 'global_analytics', 'platformSentiment', 5000, false);
        } catch(e) {}

        // Wait a few seconds for attributes to be available in Appwrite
        console.log('Waiting for attributes to be provisioned...');
        await new Promise(r => setTimeout(r, 3000));

        console.log('Clearing old data...');
        const instDocs = await databases.listDocuments(DB_ID, 'institutions');
        for (const doc of instDocs.documents) await databases.deleteDocument(DB_ID, 'institutions', doc.$id);
        
        const metricDocs = await databases.listDocuments(DB_ID, 'system_metrics');
        for (const doc of metricDocs.documents) await databases.deleteDocument(DB_ID, 'system_metrics', doc.$id);

        const globalDocs = await databases.listDocuments(DB_ID, 'global_analytics');
        for (const doc of globalDocs.documents) await databases.deleteDocument(DB_ID, 'global_analytics', doc.$id);

        console.log('Seeding Institutions...');
        const institutions = [
            { name: 'University of Lagos', acronym: 'UNILAG', region: 'South West', volume: 25400, negativeScore: 82.5, status: 'Critical' },
            { name: 'Obafemi Awolowo University', acronym: 'OAU', region: 'South West', volume: 18200, negativeScore: 75.0, status: 'Warning' },
            { name: 'Ahmadu Bello University', acronym: 'ABU', region: 'North West', volume: 15000, negativeScore: 45.0, status: 'Stable' },
            { name: 'University of Ibadan', acronym: 'UI', region: 'South West', volume: 12100, negativeScore: 68.2, status: 'Warning' },
            { name: 'University of Nigeria', acronym: 'UNN', region: 'South East', volume: 9800, negativeScore: 55.4, status: 'Stable' }
        ];
        for (const inst of institutions) {
            await databases.createDocument(DB_ID, 'institutions', ID.unique(), inst);
        }

        console.log('Seeding System Metrics (7-Day Trend)...');
        const metrics = [
            { date: 'Mon', positive: 4000, negative: 2400, neutral: 2400 },
            { date: 'Tue', positive: 3000, negative: 1398, neutral: 2210 },
            { date: 'Wed', positive: 2000, negative: 9800, neutral: 2290 },
            { date: 'Thu', positive: 2780, negative: 3908, neutral: 2000 },
            { date: 'Fri', positive: 1890, negative: 4800, neutral: 2181 },
            { date: 'Sat', positive: 2390, negative: 3800, neutral: 2500 },
            { date: 'Sun', positive: 3490, negative: 4300, neutral: 2100 }
        ];
        for (const metric of metrics) {
            await databases.createDocument(DB_ID, 'system_metrics', ID.unique(), metric);
        }

        console.log('Seeding Global Analytics...');
        await databases.createDocument(DB_ID, 'global_analytics', 'latest', {
            distribution: JSON.stringify([
                { name: 'Negative', value: 61.2, fill: '#f43f5e' },
                { name: 'Positive', value: 28.5, fill: '#14b8a6' },
                { name: 'Neutral', value: 10.3, fill: '#94a3b8' }
            ]),
            platformSentiment: JSON.stringify([
                { platform: 'Twitter', negative: 85, positive: 10, neutral: 5 },
                { platform: 'Facebook', negative: 65, positive: 20, neutral: 15 },
                { platform: 'News', negative: 40, positive: 40, neutral: 20 },
                { platform: 'Reddit', negative: 90, positive: 5, neutral: 5 }
            ])
        });

        console.log('Database seeded successfully!');
    } catch (e) {
        console.error('Error seeding DB:', e);
    }
}

seed();
