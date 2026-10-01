import app from './app';
import { sequelize } from './config/database';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados PostgreSQL estabelecida com sucesso.');

    // Sincroniza a tabela com o PostgreSQL
    await sequelize.sync();
    console.log('✅ Tabelas sincronizadas com o banco de dados.');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Falha ao conectar ao banco de dados:', error);
    process.exit(1);
  }
}

startServer();