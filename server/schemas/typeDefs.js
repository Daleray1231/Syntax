const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar Date
  type Event {
    _id: ID
    title: String
    date: Date
    city: String
    state: String
    venue: String
    description: String
    ticketLink: String
  }
  type Album {
    _id: ID
    title: String
    artist: String
    releaseDate: Date
    genre: String
    tracklist: [Track]
  }

  type Track {
    trackNumber: Int
    title: String
  }

  type Query {
    events: [Event]
    albums: [Album]
  }
`;

module.exports = typeDefs;
