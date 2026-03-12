import { config } from 'dotenv';
import { hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

config();

async function resetPassword() {
  const email = process.argv[2];
  const newPassword = process.argv[3];

  if (!email || !newPassword) {
    console.error(
      '❌ Błąd: Podaj email i hasło\n\nUżycie: npm run reset-password -- <email> <nowe_hasło>\n\nPrzykład: npm run reset-password -- admin@example.com mojasuperhasla123'
    );
    process.exit(1);
  }

  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({
      adapter,
    });

    // Sprawdzenie czy użytkownik istnieje
    const user = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (!user) {
      console.error(`❌ Użytkownik z emailem "${email}" nie istnieje`);
      await prisma.$disconnect();
      process.exit(1);
    }

    // Zahashowanie nowego hasła
    const hashedPassword = await hash(newPassword, 10);

    // Aktualizacja hasła w bazie
    await prisma.adminUser.update({
      where: { email },
      data: { password: hashedPassword },
    });

    await prisma.$disconnect();

    console.log(`✅ Hasło dla użytkownika "${email}" zostało pomyślnie zresetowane`);
    console.log(`📝 Nowe hasło: ${newPassword}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Błąd podczas resetowania hasła:', error);
    process.exit(1);
  }
}

resetPassword();
