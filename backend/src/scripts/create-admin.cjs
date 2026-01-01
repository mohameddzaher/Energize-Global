const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '../.env.local' });

async function createAdmin() {
  console.log('🚀 Starting admin creation...');
  console.log('📡 MongoDB URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');

  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Define User Schema (مطابق للنموذج الموجود)
    const userSchema = new mongoose.Schema({
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
      },
      fullName: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
      },
      bookingPermissions: {
        smallRoom: { type: Boolean, default: true },
        largeRoom: { type: Boolean, default: false },
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    });

    // Get or create User model
    const User = mongoose.models.User || mongoose.model('User', userSchema);

    // Delete existing admin if exists
    const deleted = await User.deleteOne({ email: 'admin@energize.com' });
    if (deleted.deletedCount > 0) {
      console.log('🗑️ Deleted old admin user');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('Admin123!', 12);

    // Create new admin
    const adminUser = await User.create({
      email: 'admin@energize.com',
      fullName: 'System Administrator',
      password: hashedPassword,
      role: 'admin',
      bookingPermissions: {
        smallRoom: true,
        largeRoom: true,
      },
    });

    console.log('\n🎉 ====================================');
    console.log('✅ ADMIN USER CREATED SUCCESSFULLY!');
    console.log('====================================');
    console.log(`📧 Email: ${adminUser.email}`);
    console.log(`🔑 Password: Admin123!`);
    console.log(`👤 Role: ${adminUser.role}`);
    console.log(`🆔 ID: ${adminUser._id}`);
    console.log('====================================\n');

    // Verify creation
    const count = await User.countDocuments();
    console.log(`📊 Total users in database: ${count}`);

    await mongoose.disconnect();
    console.log('✅ Done!');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    
    if (error.code === 11000) {
      console.log('⚠️ Duplicate email error');
    }
    
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check MONGODB_URI in .env.local');
    console.log('2. Make sure MongoDB Atlas is accessible');
    console.log('3. Check IP whitelist in MongoDB Atlas');
    
    process.exit(1);
  }
}

createAdmin();