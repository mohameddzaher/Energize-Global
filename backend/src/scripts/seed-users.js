import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const SHARED_PASSWORD = 'Energize@2026!';

const SUPER_ADMINS = [
  { email: 'admin@energize.com',                     fullName: 'System Administrator' },
  { email: 'dulaim@energize-sa.com',                  fullName: 'Dulaim' },
  { email: 'mohamed.zaher@energize-logistics.com',    fullName: 'Mohamed Zaher' },
  { email: 'sameh.hassan@energize-logistics.com',     fullName: 'Sameh Hassan' },
  { email: 'nader.magdy@energize-logistics.com',      fullName: 'Nader Magdy' },
];

const REGULAR_USER_EMAILS = [
  'Ahmed.Mahmoud@energize-logistics.com',
  'Hafeez.Khan@energize-logistics.com',
  'Ahmed.Yasser@energize-logistics.com',
  'Morsy.Hassan@energize-logistics.com',
  'Ahmed.Abdelhamid@energize-logistics.com',
  'Isamel.ELSayed@energize-logistics.com',
  'Haitham.Omar@energize-logistics.com',
  'Mohab.Nabil@energize-logistics.com',
  'Mohammed.Abdelaal@energize-logistics.com',
  'Mohammed.Essam@energize-logistics.com',
  'Mahmoud.Kamal@energize-logistics.com',
  'Hossam.Elhoufy@energize-logistics.com',
  'info@energize-logistics.com',
  'hr@energize-logistics.com',
  'IT@energize-logistics.com',
  'Yasser.Helal@energize-logistics.com',
  'Sherif.Helal@energize-logistics.com',
  'Haitham.Ibrahim@energize-logistics.com',
  'Islam.Suror@energize-logistics.com',
  'Ahmed.alsharqawe@energize-logistics.com',
  'muhannad.altabaji@energize-logistics.com',
  'adel.hasaballah@energize-logistics.com',
  'mahmoud.abookeil@energize-logistics.com',
  'mohamed.safwat@energize-logistics.com',
  'mohamed.ismail@energize-logistics.com',
  'omar.abdelgawad@energize-logistics.com',
  'mai.alassar@energize-logistics.com',
  'hatim.mohamed@energize-sa.com',
  'nariman.zakaria@energize-logistics.com',
  'ehab.mohamed@energize-logistics.com',
  'khlood.alzahrani@energize-logistics.com',
  'ahmed.elsayed@energize-logistics.com',
  'helmy.ahmed@energize-logistics.com',
  'aisha.alshehri@energize-logistics.com',
  'mohamed.ashour@energize-logistics.com',
];

function nameFromEmail(email) {
  const local = email.split('@')[0];
  const specialCases = { info: 'Info', hr: 'HR', it: 'IT' };
  const key = local.toLowerCase();
  if (specialCases[key]) return specialCases[key];
  return local
    .split('.')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  bookingPermissions: {
    smallRoom: { type: Boolean, default: true },
    largeRoom: { type: Boolean, default: false },
  },
  mustChangePassword: { type: Boolean, default: false },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function run() {
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI is not set in .env');
    process.exit(1);
  }

  console.log('📡 Connecting to:', process.env.MONGODB_URI.replace(/:[^:@]+@/, ':***@'));

  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 30000 });
  console.log('✅ Connected to MongoDB Atlas (NEW Frankfurt cluster)');

  const before = await User.countDocuments();
  console.log(`👥 Users currently in DB: ${before}`);

  console.log('🧹 Wiping users collection for clean seed...');
  await User.deleteMany({});

  const hashedPassword = await bcrypt.hash(SHARED_PASSWORD, 12);

  const adminDocs = SUPER_ADMINS.map(({ email, fullName }) => ({
    email: email.toLowerCase(),
    fullName,
    password: hashedPassword,
    role: 'admin',
    bookingPermissions: { smallRoom: true, largeRoom: true },
    mustChangePassword: false,
  }));

  const userDocs = REGULAR_USER_EMAILS.map((email) => ({
    email: email.toLowerCase(),
    fullName: nameFromEmail(email),
    password: hashedPassword,
    role: 'user',
    bookingPermissions: { smallRoom: true, largeRoom: false },
    mustChangePassword: false,
  }));

  const allDocs = [...adminDocs, ...userDocs];

  const seenEmails = new Set();
  const deduped = [];
  for (const doc of allDocs) {
    if (seenEmails.has(doc.email)) {
      console.log(`⚠️  Duplicate email skipped: ${doc.email}`);
      continue;
    }
    seenEmails.add(doc.email);
    deduped.push(doc);
  }

  await User.insertMany(deduped, { ordered: false });

  const after = await User.countDocuments();
  console.log(`\n🎉 Seeded ${after} users (${adminDocs.length} super admins + ${userDocs.length} regular users)`);

  const credentials = {
    sharedPassword: SHARED_PASSWORD,
    note: 'All accounts use the same password listed above. Change it after first login.',
    superAdmins: adminDocs.map((d) => ({
      email: d.email,
      fullName: d.fullName,
      role: d.role,
      password: SHARED_PASSWORD,
    })),
    users: userDocs.map((d) => ({
      email: d.email,
      fullName: d.fullName,
      role: d.role,
      password: SHARED_PASSWORD,
    })),
  };

  const outPath = path.join(__dirname, '../../../users-credentials.json');
  fs.writeFileSync(outPath, JSON.stringify(credentials, null, 2));
  console.log(`📄 Credentials written to: ${outPath}`);

  await mongoose.disconnect();
  console.log('✅ Done.');
}

run().catch((err) => {
  console.error('❌ ERROR:', err);
  process.exit(1);
});
