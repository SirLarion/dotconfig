const main = `${App.configDir}/main.js`;

try {
  await import(`file://${main}`);
} catch (error) {
  console.error(error);
  App.quit();
}

export {};
