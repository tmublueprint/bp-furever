import dotenv from 'dotenv';
dotenv.config();

async function createAdmin() {
    const admin = (await import('../firebase.js')).default; // import run after dotenv.config

    const email = process.argv[2];
    const password = process.argv[3];

    if (!email || !password) {
        console.error('Usage: npx tsx scripts/createAdmin.ts <email> <password>');
        process.exit(1);
    }

    try {
        const userRecord = await admin.auth().createUser({ email, password});
        console.log ('Created user: ${userRecord.uid} (${userRecord.email})');

        await admin.auth().setCustomUserClaims(userRecord.uid, { admin: true});
        console.log('Set admin claim')
    } catch (err: any) {
        console.error('Failed: ', err.message || err);
    }
}

createAdmin();