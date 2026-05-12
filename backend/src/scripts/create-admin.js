const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

// ابحث عن ملف .env في المسارات المختلفة
let envPath = path.join(__dirname, '../../../.env');
if (!fs.existsSync(envPath)) {
  envPath = path.join(__dirname, '../../.env');
}
if (!fs.existsSync(envPath)) {
  envPath = path.join(__dirname, '../.env');
}
if (!fs.existsSync(envPath)) {
  envPath = '.env';
}

console.log('🔍 Looking for .env at:', envPath);
console.log('📁 File exists:', fs.existsSync(envPath));

// تحميل environment variables
require('dotenv').config({ path: envPath });

async function createAdmin() {
  console.log('\n🚀 Starting admin creation...');
  
  // استخدم URI مباشرة من المتغير أو استخدم الافتراضي
  const mongoUri = process.env.MONGODB_URI ||
                   'mongodb+srv://energizetechsolutions_db_user:RVzkyj8SlAtphWMt@energize-global-new.osvcz7e.mongodb.net/energize-meeting-system?retryWrites=true&w=majority&appName=energize-global-new';
  
  console.log('📡 Using MongoDB URI:', mongoUri.substring(0, 50) + '...');

  try {
    // الاتصال بـ MongoDB
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB Atlas');

    // تعريف نموذج المستخدم
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

    // الحصول على نموذج المستخدم
    const User = mongoose.models.User || mongoose.model('User', userSchema);

    // حذف الـ admin القديم إذا كان موجوداً
    const deleted = await User.deleteOne({ email: 'admin@energize.com' });
    if (deleted.deletedCount > 0) {
      console.log('🗑️ Deleted old admin user');
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash('Admin123!', 12);

    // إنشاء admin جديد
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

    // التحقق من الإنشاء
    const count = await User.countDocuments();
    console.log(`📊 Total users in database: ${count}`);

    // عرض جميع المستخدمين
    const allUsers = await User.find({}, 'email role createdAt');
    console.log('\n👥 All users in database:');
    allUsers.forEach(user => {
      console.log(`  - ${user.email} (${user.role}) - ${new Date(user.createdAt).toLocaleDateString()}`);
    });

    await mongoose.disconnect();
    console.log('\n✅ Done! Ready for login.');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    
    if (error.code === 11000) {
      console.log('⚠️ Duplicate email - admin already exists');
    }
    
    if (error.name === 'MongoServerSelectionError') {
      console.log('\n🔧 Connection issues:');
      console.log('1. Check if MongoDB Atlas is accessible');
      console.log('2. Verify IP is whitelisted: 176.47.42.219');
      console.log('3. Check network connection');
    }
    
    process.exit(1);
  }
}

// تشغيل الدالة
createAdmin();