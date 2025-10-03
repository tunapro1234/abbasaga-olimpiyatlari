import app from './app';
import config from './config';
import { runMigrations, seedDefaultUser, getDbHealth } from './db';

async function waitForDatabase(maxAttempts = 10, delayMs = 1500): Promise<void> {
  let attempt = 0;
  while (attempt < maxAttempts) {
    attempt += 1;
    try {
      await getDbHealth();
      return;
    } catch (error) {
      console.warn(`Veritabanı bağlantısı denemesi ${attempt}/${maxAttempts} başarısız`, error);
      if (attempt === maxAttempts) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}

async function bootstrap(): Promise<void> {
  await waitForDatabase();
  await runMigrations();
  await seedDefaultUser();

  app.listen(config.port, config.host, () => {
    console.log(`Abbasağa API listening on http://${config.host}:${config.port}`);
  });
}

void bootstrap();
