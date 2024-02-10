import { getServices } from "./api.js";

// Инициализация
const init = async () => {
  try {
    const { services } = await getServices();

    if (services.length) {
      const tree = treeCreation(services);

      const sortedTree = treeSorting(tree);

      console.log(sortedTree);

      const renderTree = treeRender(sortedTree);

      document.body.appendChild(renderTree);
    }
  } catch (error) {
    throw new Error(error);
  }
};

// Создаем древо
const treeCreation = (services) => {
  const dataObj = services.reduce((acc, service) => {
    service.children = [];
    acc[service.id] = service;
    return acc;
  }, {});

  const result = services.reduce((acc, service) => {
    if (!service.head) acc.push(dataObj[service.id]);
    else if (dataObj[service.head])
      dataObj[service.head].children.push(dataObj[service.id]);
    return acc;
  }, []);

  return result;
};

// Сортируем дерево по sorthead
const treeSorting = (tree) => {
  return tree.sort((a, b) => a.sorthead - b.sorthead);
};

// Рендерим полученнео дерево
const treeRender = (tree) => {
  const ul = document.createElement("ul");

  tree.forEach((node) => {
    const li = document.createElement("li");

    if (!node.node) li.classList.add("link");

    li.textContent = node.name;

    if (node.children.length > 0) li.appendChild(treeRender(node.children));

    ul.appendChild(li);
  });

  return ul;
};

init();
