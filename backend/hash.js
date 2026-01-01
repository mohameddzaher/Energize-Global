import bcrypt from 'bcryptjs';

const run = async () => {
  const hash = await bcrypt.hash('admin123', 12);
  console.log(hash);
};

run();