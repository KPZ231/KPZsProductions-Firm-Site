import { hash } from "bcryptjs";
import { Pool } from "pg";

const connectionString =
  process.env.DATABASE_URL ||
  "postgres://903d60cc984c7e075a7f8a61bc0cc5df3010b9180908ac8c7541fa8f4acba782:sk_ub0GKP6oB857wYH0IXNt1@db.prisma.io:5432/postgres?sslmode=require";

const pool = new Pool({
  connectionString,
});

async function main() {
  try {
    // Check if admin user already exists
    const result = await pool.query(
      "SELECT * FROM admin_users WHERE email = $1",
      ["admin@kpzsproductions.com"]
    );

    if (result.rows.length > 0) {
      console.log("✓ Admin user już istnieje");
      return;
    }

    // Hash the default password
    // ZMIEŃ TO NA BEZPIECZNE HASŁO W PRODUKCJI!
    const hashedPassword = await hash("Admin123!", 10);

    // Create admin user
    const insertResult = await pool.query(
      `INSERT INTO admin_users (email, password, role, "isActive", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, NOW(), NOW())
       RETURNING id, email`,
      ["admin@kpzsproductions.com", hashedPassword, "admin", true]
    );

    const adminUser = insertResult.rows[0];

    console.log("✓ Admin user został utworzony");
    console.log("📧 Email: admin@kpzsproductions.com");
    console.log("🔐 Hasło: Admin123!");
    console.log("⚠️  WAŻNE: Zmień hasło po pierwszym zalogowaniu!");
    console.log("ID:", adminUser.id);
  } catch (error) {
    console.error("Błąd podczas tworzenia admin user:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
