
import axios from "axios";
import { print } from "graphql";
import gql from "graphql-tag";

const DB_URL = "https://evident-lamprey-59.hasura.app/v1/graphql";

const GET_ALL_STORE = gql`
  query allStore {
    store(order_by: {id: desc}) {
      id
      name
      url
      eaten
      title
      description
      image
      score
      score_count
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

const FIND_ONE_STORE_SCORE = gql`
  query findOneStoreScore($store_id: Int!, $user_id: String!) {
    store_score_by_pk(store_id: $store_id, user_id: $user_id) {
        user_id
        store_id
        score
        comment
    }
    store_score(where: {store_id: {_eq: $store_id}}) {
      user_id
      store_id
      comment
      score
      user_name
    }
  }
`;

const SAVE_STORE_SCORE = gql`
  mutation saveStoreScore($user_id: String!, $store_id: Int!, $score: Int!, $comment: String) {
    insert_store_score_one(object: {user_id: $user_id, store_id: $store_id, score: $score, comment: $comment}, 
                           on_conflict: {constraint: store_score_pkey, update_columns: [score, comment]}) {
        user_id
        store_id
        score
        comment
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
  getOneStoreScore: async function (store, resCallback) {
    var o = { user_id: store.user_id, store_id: store.store_id };
    console.log("getOneStoreScore: %s", o);
    var rtn = { singleComment: {}, allComment: [] };
    await axios
      .post(DB_URL, {
        query: print(FIND_ONE_STORE_SCORE),
        variables: o,
      })
      .then((response) => resCallback && resCallback(response));
    // rtn.singleComment = response.data.data.store_score_by_pk;
    // rtn.allComment = response.data.data.store_score;
  },
  saveStoreScore: async function (store, resCallback) {
    var o = { user_id: store.user_id, store_id: store.store_id, score: store.score, comment: store.comment };
    console.log("saveStoreScore: %s", o);
   await axios
      .post(DB_URL, {
        query: print(SAVE_STORE_SCORE),
        variables: o,
      })
      .then((response) => resCallback && resCallback(response));
  },
};


