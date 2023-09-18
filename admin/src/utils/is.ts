const toString = Object.prototype.toString;

// 检查值是否为指定类型
export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

// 检查值是否已定义
export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined';
}

// 检查值是否未定义
export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val);
}

// 检查值是否为对象
export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object');
}

// 检查值是否为空
export function isEmpty<T = unknown>(val: T): val is T {
  if (isArray(val) || isString(val)) {
    return val.length === 0;
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0;
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0;
  }

  return false;
}

// 检查值是否为日期
export function isDate(val: unknown): val is Date {
  return is(val, 'Date');
}

// 检查值是否为null
export function isNull(val: unknown): val is null {
  return val === null;
}

// 检查值是否为null或未定义
export function isNullAndUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) && isNull(val);
}

// 检查值是否为null或未定义
export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val);
}

// 检查值是否为数字
export function isNumber(val: unknown): val is number {
  return is(val, 'Number');
}

// 检查值是否为Promise
export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

// 检查值是否为字符串
export function isString(val: unknown): val is string {
  return is(val, 'String');
}

// 检查值是否为函数
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

// 检查值是否为布尔值
export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean');
}

// 检查值是否为正则表达式
export function isRegExp(val: unknown): val is RegExp {
  return is(val, 'RegExp');
}

// 检查值是否为数组
export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

// 检查值是否为浏览器窗口对象
export function isWindow(val: any): val is Window {
  return typeof window !== 'undefined' && is(val, 'Window');
}

// 检查值是否为DOM元素
export function isElement(val: unknown): val is Element {
  return isObject(val) && !!val.tagName;
}

// 检查值是否为Map对象
export function isMap(val: unknown): val is Map<any, any> {
  return is(val, 'Map');
}

// 检查是否在服务器环境中
export const isServer = typeof window === 'undefined';

// 检查是否在客户端环境中
export const isClient = !isServer;

// 检查字符串是否为URL
export function isUrl(path: string): boolean {
  const reg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/;
  return reg.test(path);
}
