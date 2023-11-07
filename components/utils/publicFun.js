/**
 * @Event 判断是否是空对象
 * @description:
 * @author: mhf
 * @time: 2023-10-25 00:21:25
 **/
export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data, id, parentId, children) {
  const config = {
    id: id || "id",
    parentId: parentId || "parentId",
    childrenList: children || "children",
  };

  var childrenListMap = {};
  var nodeIds = {};
  var tree = [];

  for (const d of data) {
    const parentId = d[config.parentId];
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }

  for (const d of data) {
    const parentId = d[config.parentId];
    if (nodeIds[parentId] == null) {
      tree.push(d);
    }
  }

  for (const t of tree) {
    adaptToChildrenList(t);
  }

  function adaptToChildrenList(o) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (const c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  return tree;
}

/**
 * @Event 数组转树结构
 * @description: pid: parentId
 * @author: mhf
 * @time: 2023-11-01 16:06:18
 **/
export function arrayToTree(
    list,
    callback = () => {},
    props = { id: 'id', pid: 'pid', children: 'children' }
) {
  function sortArr(a, b) {
    return a.orderNum - b.orderNum;
  }

  list.sort(sortArr);
  const tree = [];
  const map = {};
  const listLength = list.length;
  for (let i = 0; i < listLength; i++) {
    const node = list[i];
    const nodeId = node[props.id];
    map[nodeId] = node;
    callback(node);
  }

  for (let i = 0; i < listLength; i++) {
    const node = list[i];
    const nodePid = node[props.pid];
    const parentNode = map[nodePid];
    if (parentNode) {
      parentNode[props.children] = parentNode[props.children] || [];
      parentNode[props.children].push(node);
    } else {
      tree.push(node);
    }
  }

  return tree;
}
