const { execSync } = require('child_process');

try {
    console.log('Installing dependencies...');
    // execSync('npm install', { stdio: 'inherit' });

    console.log('Generating Prisma Client...');
    execSync('npx prisma generate', { stdio: 'inherit' });

    console.log('Pushing Database Schema...');
    execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' });

    console.log('Seeding Database...');
    execSync('node prisma/seed.js', { stdio: 'inherit' });

    console.log('Starting Server...');
    require('./index.js');
} catch (error) {
    console.error('Setup failed:', error);
}
