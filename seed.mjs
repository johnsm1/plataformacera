import { MongoClient } from 'mongodb'

// URL de conexão com o MongoDB
const url = 'mongodb://admin:secret@localhost:27017'
const dbName = 'test'

// Dados a serem inseridos
const roles = [
  { name: 'ADMIN', permissions: ['READ', 'WRITE', 'DELETE'] },
  { name: 'USER', permissions: ['READ'] },
  { name: 'Moderator', permissions: ['READ', 'WRITE'] },
]

const clientData = {
  name: 'John Doe',
}

const vehicle = {
  numberPlate: 'XYZ 1234',
  year: '2023',
  model: 'Toyota Corolla',
  timestamps: {
    createdAt: '2024-09-15T12:34:56Z',
    updatedAt: '2024-09-16T15:00:00Z',
  },
}

async function seedDatabase() {
  const client = new MongoClient(url, { useUnifiedTopology: true })

  try {
    // Conecta ao cliente
    await client.connect()
    console.log('Conectado ao MongoDB')

    const db = client.db(dbName)

    // Insere dados na coleção 'role'
    const roleCollection = db.collection('roles')
    await roleCollection.insertMany(roles)
    console.log('Dados inseridos na coleção "role" com sucesso')

    // Insere dados na coleção 'client'
    const clientCollection = db.collection('customers')
    await clientCollection.insertOne(clientData)
    console.log('Dados inseridos na coleção "client" com sucesso')

    // Insere dados na coleção 'vehicle'
    const vehicleCollection = db.collection('vehicles')
    await vehicleCollection.insertOne(vehicle)
    console.log('Dados inseridos na coleção "vehicle" com sucesso')
  } catch (err) {
    console.error('Erro ao inserir dados', err)
  } finally {
    // Fecha a conexão
    await client.close()
  }
}

// Executa a função de seed
seedDatabase()
