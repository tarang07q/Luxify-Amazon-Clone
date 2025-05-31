const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const checkAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Find admin user
    const adminUser = await User.findOne({ email: 'admin@luxify.com' });
    
    if (adminUser) {
      console.log('\nAdmin user found:');
      console.log('------------------');
      console.log('Name:', adminUser.name);
      console.log('Email:', adminUser.email);
      console.log('Role:', adminUser.role);
      console.log('Created at:', adminUser.createdAt);
      console.log('Last login:', adminUser.lastLogin);
      
      // If role is not admin, offer to fix it
      if (adminUser.role !== 'admin') {
        console.log('\n⚠️  Warning: User does not have admin role!');
        console.log('Would you like to update the role to admin? (y/n)');
        process.stdin.once('data', async (data) => {
          if (data.toString().trim().toLowerCase() === 'y') {
            adminUser.role = 'admin';
            await adminUser.save();
            console.log('✅ Role updated to admin successfully!');
          } else {
            console.log('Role not changed.');
          }
          process.exit(0);
        });
      } else {
        process.exit(0);
      }
    } else {
      console.log('No admin user found with email admin@luxify.com');
      process.exit(0);
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkAdminUser(); 