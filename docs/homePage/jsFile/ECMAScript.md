---
title: ECMAScript
description: es6规范&使用
updated: 2025-5/20
---

# ECMAScript

## <span style="color:#80bbf2">Array.prototype.flat()</span>
数组的成员有时还是数组，Array.prototype.flat()用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。
```javascript
[1, 2, [3, 4]].flat()

// [1, 2, 3, 4]
```

## <span style="color:#80bbf2">Symbol</span>
Symbol 是 ES6 中新增的一种数据类型，用于创建唯一且不可变的值。它主要用于对象属性的键，以确保属性的唯一性。

### 1.<span style="color:#80bbf2">Symbol.hasInstance</span>

该实例的Symbol.hasInstance方法，会在进行instanceof运算时自动调用，判断左侧的运算子是否为Array的实例

```javascript

class Even {
  static [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0;
  }
}

1 instanceof Even // false
2 instanceof Even // true
12345 instanceof Even // false

```

### 1.<span style="color:#80bbf2">Symbol.match</span>

对象的***Symbol.match***属性，指向一个函数。当执行***str.match(myObject)***时，如果该属性存在，会调用它，返回该方法的返回值。

```javascript
class MyMatcher {
  [Symbol.match](string) {
    return 'hello world'.indexOf(string);
  }
}

'e'.match(new MyMatcher()) // 1

```

## Set

Set 是 ES6 中新增的一种数据结构，用于存储唯一值。它类似于数组，但不允许重复的值。

### 1.<span style="color:#80bbf2">遍历操作</span>

Set 结构的实例有四个遍历方法，可以用于遍历成员。

- Set.prototype.keys()：返回键名的遍历器
- Set.prototype.values()：返回键值的遍历器
- Set.prototype.entries()：返回键值对的遍历器
- Set.prototype.forEach()：使用回调函数遍历每个成员
> 需要特别指出的是，Set的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用。

<h4>（1）keys()，values()，entries()</h4>

***keys***方法、***values***方法、***entries***方法返回的都是遍历器对象。由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。

```javascript
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

### 2.<span style="color:#80bbf2">集合运算</span>

<a style="color:#80bbf2" href="https://github.com/tc39/proposal-set-methods" target="_blank">ES2025</a> 为 Set 结构添加了以下集合运算方法。

>Set.prototype.intersection(other)：交集
>
>Set.prototype.union(other)：并集
>
>Set.prototype.difference(other)：差集
>
>Set.prototype.symmetricDifference(other)：对称差集
>
>Set.prototype.isSubsetOf(other)：判断是否为子集
>
>Set.prototype.isSupersetOf(other)：判断是否为超集
>
>Set.prototype.isDisjointFrom(other)：判断是否不相交

<span style="background-color:#f9f2f4;color:red">.union()</span>是并集运算，返回包含两个集合中存在的所有成员的集合。

```javascript
const frontEnd = new Set(["JavaScript", "HTML", "CSS"]);
const backEnd = new Set(["Python", "Java", "JavaScript"]);

const all = frontEnd.union(backEnd);
// Set {"JavaScript", "HTML", "CSS", "Python", "Java"}
```

<span style="background-color:#f9f2f4;color:red">.intersection()</span>是交集运算，返回同时包含在两个集合中的成员的集合。

```javascript
const frontEnd = new Set(["JavaScript", "HTML", "CSS"]);
const backEnd = new Set(["Python", "Java", "JavaScript"]);

const frontAndBackEnd = frontEnd.intersection(backEnd);
// Set {"JavaScript"}
```

<span style="background-color:#f9f2f4;color:red">.difference()</span>是差集运算，返回第一个集合中存在但第二个集合中不存在的所有成员的集合。

```javascript
const frontEnd = new Set(["JavaScript", "HTML", "CSS"]);
const backEnd = new Set(["Python", "Java", "JavaScript"]);

const onlyFrontEnd = frontEnd.difference(backEnd);
// Set {"HTML", "CSS"}

const onlyBackEnd = backEnd.difference(frontEnd);
// Set {"Python", "Java"}
```

<span style="background-color:#f9f2f4;color:red">.symmetryDifference()</span>是对称差集，返回两个集合的所有独一无二成员的集合，即去除了重复的成员。

```javascript
const frontEnd = new Set(["JavaScript", "HTML", "CSS"]);
const backEnd = new Set(["Python", "Java", "JavaScript"]);

const onlyFrontEnd = frontEnd.symmetricDifference(backEnd);
// Set {"HTML", "CSS", "Python", "Java"} 

const onlyBackEnd = backEnd.symmetricDifference(frontEnd);
// Set {"Python", "Java", "HTML", "CSS"}
```
注意，返回结果中的成员顺序，由添加到集合的顺序决定。

<span style="background-color:#f9f2f4;color:red">.union()</span>是并集运算，返回包含两个集合中存在的所有成员的集合。

```javascript
const frontEnd = new Set(["JavaScript", "HTML", "CSS"]);
const backEnd = new Set(["Python", "Java", "JavaScript"]);

const all = frontEnd.union(backEnd);
// Set {"JavaScript", "HTML", "CSS", "Python", "Java"}
```

<span style="background-color:#f9f2f4;color:red">.isSubsetOf()</span>返回一个布尔值，判断第一个集合是否为第二个集合的子集，即第一个集合的所有成员都是第二个集合的成员。

```javascript
const frontEnd = new Set(["JavaScript", "HTML", "CSS"]);
const backEnd = new Set(["Python", "Java", "JavaScript"]);

const all = frontEnd.union(backEnd);
// Set {"JavaScript", "HTML", "CSS", "Python", "Java"}
```
任何集合都是自身的子集。

```javascript
frontEnd.isSubsetOf(frontEnd);
// true
```

<span style="background-color:#f9f2f4;color:red">.isSupersetOf()</span>返回一个布尔值，表示第一个集合是否为第二个集合的超集，即第二个集合的所有成员都是第一个集合的成员。

```javascript
const frontEnd = new Set(["JavaScript", "HTML", "CSS"]);
const declarative = new Set(["HTML", "CSS"]);

declarative.isSupersetOf(frontEnd);
// false

frontEnd.isSupersetOf(declarative);
// true
```

任何集合都是自身的超集。

```javascript
frontEnd.isSupersetOf(frontEnd);
// true
```

<span style="background-color:#f9f2f4;color:red">.isDisjointFrom()</span>判断两个集合是否不相交，即没有共同成员。

```javascript
const frontEnd = new Set(["JavaScript", "HTML", "CSS"]);
const interpreted = new Set(["JavaScript", "Ruby", "Python"]);
const compiled = new Set(["Java", "C++", "TypeScript"]);

interpreted.isDisjointFrom(compiled);
// true

frontEnd.isDisjointFrom(interpreted);
// false
```