
import axios from "axios";
import { print } from "graphql";
import gql from "graphql-tag";

const DB_URL = "https://evident-lamprey-59.hasura.app/v1/graphql";

const GET_ALL_STORE = gql`
  query allStore {
    store(order_by: {score: desc, id: desc}) {
      id
      name
      url
      eaten
      title
      description
      image
      score
    }
  }
`;

const CREATE_STORE = gql`
  mutation addStore($name: String!, $url: String!) {
    insert_store_one(object: { name: $name, url: $url }) {
      id
    }
  }
`;

const UPDATE_STORE_OG = gql`
  mutation updateStoreOg($id: Int!, $title: String!, $description: String!, $image: String!) {
    update_store(where: {id: {_eq: $id}}, _set: {image: $image, title: $title, description: $description}){
      returning {
        id
      }
    }
  }
`;

const INC_STORE_SCORE = gql`
  mutation incStoreScore($id: Int!, $score: Int!) {
    update_store(where: {id: {_eq: $id}}, _inc: {score: $score}) {
      returning {
        id
        score
      }
    }
  }
`;

export default {
  createStore: function (store, resCallback) {
    var o = { name: store.name, url: store.url };
    console.log("createStore: %s", o);
    axios
      .post(DB_URL, {
        query: print(CREATE_STORE),
        variables: o,
      })
      .then((response) => resCallback && resCallback(response));
  },
  getAllStores: function (resCallback) {
    axios
      .post(DB_URL, {
        query: print(GET_ALL_STORE),
      })
      .then((response) => resCallback && resCallback(response));
  },
  updateStoreOg: function (store, resCallback) {
    var o = { id: store.id, title: store.title, description: store.description, image: store.image };
    console.log("updateStoreOg: %s", o);
    axios
      .post(DB_URL, {
        query: print(UPDATE_STORE_OG),
        variables: o,
      })
      .then((response) => resCallback && resCallback(response));
  },
  incStoreScore: function (store, resCallback) {
    var o = { id: store.id, score: store.score };
    console.log("incStoreScore: %s", o);
    axios
      .post(DB_URL, {
        query: print(INC_STORE_SCORE),
        variables: o,
      })
      .then((response) => resCallback && resCallback(response));
  },
};


