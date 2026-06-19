import { Client, Users } from 'node-appwrite';
const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('sentiment')
    .setKey('standard_9e0bf634027d520310be3c586ffb7bbda0c9778187568202d73f69ba470bc7e95ff9d76aaa3a9b5934fae67f72ebf95f7481fd79de10387955ce363288ad57d3769b8dba55e4c9d029c5f6694a02733be72373a95b68a3504319b9744dedf2dfe9f4b7d9906751ecc2c0af09a7391cd9aa4ff750c136609ea4772a80b14d840c');
const users = new Users(client);

async function updateRoles() {
    const allUsers = await users.list();
    for (const u of allUsers.users) {
        let role = 'viewer';
        if (u.email.includes('analyst')) role = 'analyst';
        if (u.email.includes('researcher')) role = 'researcher';
        if (u.email.includes('peter')) role = 'super_admin';
        await users.updatePrefs(u.$id, { role });
        console.log('Updated', u.email, 'to', role);
    }
}
updateRoles();
