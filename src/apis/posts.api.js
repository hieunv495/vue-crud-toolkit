import faker from "faker";
import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";

const delayTime = 200;

const generateDefaultData = (numOfData = 100) => {
  const localData = [];

  for (let i = 0; i < numOfData; i++) {
    const title = faker.lorem.sentence();
    localData.push({
      id: i + "",
      title,
      description: faker.lorem.paragraph(),
      featuredImage: faker.image.avatar(),
      thumbnailImage: faker.image.avatar(),
      content: faker.lorem.paragraphs(),
      slug: slugify(title),
      tags: Array(5)
        .fill(null)
        .map(() => faker.lorem.words()),
      categories: [
        Array(2)
          .fill(null)
          .map(() => faker.random.number()),
      ],
      deleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return localData;
};

let data = generateDefaultData(125);

const normalCount = ({ q } = { q: "" }) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        data.filter((item) => !item.deleted && item.title.search(q) >= 0).length
      );
    }, delayTime);
  });
const trashCount = ({ q } = { q: "" }) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        data.filter((item) => item.deleted && item.title.search(q) >= 0).length
      );
    }, delayTime);
  });

const getList = ({ q, offset, limit }) =>
  new Promise((resolve) => {
    setTimeout(() => {
      const items = data.filter(
        (item) => !item.deleted && item.title.search(q) >= 0
      );

      const total = items.length;
      resolve({
        total,
        items: items.slice(offset, offset + limit),
      });
    }, delayTime);
  });

const getTrashList = ({ q, offset, limit }) =>
  new Promise((resolve) => {
    setTimeout(() => {
      const items = data.filter(
        (item) => item.deleted && item.title.search(q) >= 0
      );

      const total = items.length;

      resolve({
        total,
        items: items.slice(offset, offset + limit),
      });
    }, delayTime);
  });

const getOne = (id) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const item = data.find((item) => !item.deleted && item.id === id);
      if (!item) {
        return reject(new Error("404 not found"));
      }
      resolve(item);
    }, delayTime);
  });

const create = (formData) =>
  new Promise((resolve) => {
    console.log("create", formData);
    setTimeout(() => {
      const newItem = {
        id: uuidv4(),
        ...formData,
        slug: slugify(formData.title),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      data.unshift(newItem);

      resolve(newItem);
    }, delayTime);
  });

const update = (id, formData) =>
  new Promise((resolve, reject) => {
    console.log("update", id);
    setTimeout(() => {
      const index = data.findIndex((item) => !item.deleted && item.id === id);
      if (index < 0) {
        reject(new Error("404 not found"));
      }

      data[index] = {
        ...data[index],
        ...formData,
        id: data[index].id,
        slug: slugify(formData.title),
        updatedAt: new Date(),
      };

      resolve(data[index]);
    }, delayTime);
  });

const remove = (id) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = data.findIndex((item) => !item.deleted && item.id === id);
      if (index < 0) {
        reject(new Error("404 not found"));
      }

      data[index] = {
        ...data[index],
        deleted: true,
        updatedAt: new Date(),
      };

      resolve({ success: true });
    }, delayTime);
  });

const restore = (id) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = data.findIndex((item) => item.deleted && item.id === id);
      if (index < 0) {
        reject(new Error("404 not found"));
      }

      data[index] = {
        ...data[index],
        deleted: false,
        updatedAt: new Date(),
      };

      resolve({ success: true });
    }, delayTime);
  });

const purge = (id) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = data.findIndex((item) => item.deleted && item.id === id);
      if (index < 0) {
        reject(new Error("404 not found"));
      }

      data = data.filter((item) => item.id !== id);

      resolve({ success: true });
    }, delayTime);
  });

const emptyTrash = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      data = data.filter((item) => !item.deleted);
      resolve({ success: true });
    }, delayTime);
  });

export default {
  normalCount,
  trashCount,
  getList,
  getTrashList,
  getOne,
  create,
  update,
  remove,
  restore,
  purge,
  emptyTrash,
};
