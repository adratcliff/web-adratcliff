import { defineStore } from 'pinia';
import { callApi } from '@/utils/api';
import * as endpoints from '@/endpoints';

const applyList = (store, list) => {
  list.forEach((item) => {
    if (!item.id) return;
    if (!(item.id in store.resources)) {
      store.resources[item.id] = item;
      return;
    }
    Object.assign(store.resources[item.id], item);
  });
};

const getEndpoint = (resource, request) => (resource in endpoints) ? endpoints[resource][request] : endpoints.defaultCrud[request](resource);

export const createStore = (resource, getters = {}, actions = {}) => defineStore(resource, {
  state: () => ({ loaders: { list: 0, item: [] }, resources: {} }),
  getters: {
    list(state) {
      return Object.values(state.resources);
    },
    item(state) {
      return (id) => id in state.resources ? state.resources[id] : {};
    },
    ...getters,
  },
  actions: {
    async getList() {
      try {
        this.loaders.list += 1;
        const { data: list } = await callApi(getEndpoint(resource, 'getList')());
        applyList(this, list[resource]);
        return list[resource];
      } catch (err) {
        console.warn(`Error fetching ${resource} list`, err);
      } finally {
        this.loaders.list -= 1;
      }
    },
    async getDetail(id) {
      if (this.loaders.item.includes(id)) return;
      try {
        this.loaders.item.push(id);
        const { data: item } = await callApi(getEndpoint(resource, 'getItem')(id));
        applyList(this, item[resource]);
        return item[resource][0];
      } catch (err) {
        console.warn(`Error fetching ${resource} item ${id}`, err);
      } finally {
        this.loaders.item.splice(this.loaders.item.indexOf(id), 1);
      }
    },
    // eslint-disable-next-line no-unused-vars
    updateDetail: (payload) => {},
    // eslint-disable-next-line no-unused-vars
    deleteItem: (payload) => {},
    ...actions,
  },
});