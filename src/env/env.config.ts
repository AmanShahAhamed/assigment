export default () => ({
  PORT: process.env.PORT || 3000,
  DB_CONFIG: JSON.parse(process.env.DB_CONFIG),
});
