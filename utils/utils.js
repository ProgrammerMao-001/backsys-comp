/**
 * @Event 判断是否是空对象
 * @description:
 * @author: mhf
 * @time: 2023-10-25 00:21:25
 **/
export function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}
