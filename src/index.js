const { ApolloServer, gql } = require('apollo-server');
const { Bitcoins, sequelize } = require('../models');

const port = process.env.PORT || 4000;

const typeDefs = `
  type Bitcoin { name: String!, symbol: String!, price: String!, imageUrl: String!, favorite: Boolean }
  type Query { bitcoins(offset: Int, limit: Int): [Bitcoin], favorites: [Bitcoin] }
  type Mutation { addCoin(symbol: String!): Bitcoin, removeCoin(symbol: String!): Bitcoin }
`;

const resolvers = {
  Query: {
    bitcoins: async (_, { offset = 0, limit = 10 }) => {
      const bitcoins = await Bitcoins.findAll({
        limit,
        offset,
        order: [
          ['id', 'ASC'],
        ],
      })
      return bitcoins;
    },
    favorites: async (_, {}) => {
      const bitcoins = await Bitcoins.findAll({
        where: { favorite: true },
      })
      return bitcoins;
    },
  },
  Mutation: {
    addCoin: async (_, { symbol }) => {
        const [updated] = await Bitcoins.update({favorite: true}, {
          where: { symbol: symbol }
        });
        if (updated) {
            const updatedCoin = await Bitcoins.findOne({ where: { symbol: symbol } });
            return updatedCoin;
        }
        return new Error('Bitcoin not updated');
    },
    removeCoin: async (_, { symbol }) => {
        const [updated] = await Bitcoins.update({favorite: false}, {
          where: { symbol: symbol }
        });
        if (updated) {
            const updatedCoin = await Bitcoins.findOne({ where: { symbol: symbol } });
            return updatedCoin;
        }
        return new Error('Bitcoin not updated');
    },
  },
};

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
});

server.listen({port}, () => console.log(`Server is running at http://localhost:${port}`))