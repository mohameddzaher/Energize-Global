

import mongoose from 'mongoose';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const users = [
  {
    email: 'user1@energize.com',
    password: 'password123',
    fullName: 'User One',
    role: 'user',
    bookingPermissions: {
      smallRoom: true,
      largeRoom: false
    }
  },
  {
    email: 'user2@energize.com',
    password: 'password123',
    fullName: 'User Two',
    role: 'user',
    bookingPermissions: {
      smallRoom: true,
      largeRoom: true
    }
  },
  {
    email: 'admin@energize.com',
    password: 'admin123',
    fullName: 'Administrator',
    role: 'admin',
    bookingPermissions: {
      smallRoom: true,
      largeRoom: true
    }
  }
];

const createUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Delete existing users
    await User.deleteMany({});
    console.log('🗑️  Deleted existing users');

    // Create new users
    await User.create(users);
    console.log('✅ Users created successfully');

    console.log('\n👥 Created Users:');
    console.log('================');
    users.forEach(user => {
      console.log(`Email: ${user.email}`);
      console.log(`Password: ${user.password}`);
      console.log(`Full Name: ${user.fullName}`);
      console.log(`Role: ${user.role}`);
      console.log(`Small Room Permission: ${user.bookingPermissions.smallRoom}`);
      console.log(`Large Room Permission: ${user.bookingPermissions.largeRoom}`);
      console.log('---');
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

createUsers();