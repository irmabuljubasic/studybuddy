const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      firstName: "Max",
      lastName: "Mustermann",
      email: "max@example.com",
      password: "geheim123", 
    },
  });

  console.log("✅ Test-Benutzer erstellt!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
