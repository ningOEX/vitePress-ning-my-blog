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

## Map

Map 是 ES6 中新增的一种数据结构，用于存储键值对。它类似于对象，但键的范围不限于字符串，各种类型的值（包括对象）都可以当作键。

```javascript
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false
```
上面代码使用 Map 结构的set方法，将对象o当作m的一个键，然后又使用get方法读取这个键，接着使用delete方法删除了这个键。

上面的例子展示了如何向 Map 添加成员。作为构造函数，Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。

```javascript
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"
```
上面代码在新建 Map 实例时，就指定了两个键name和title。

Map构造函数接受数组作为参数，实际上执行的是下面的算法。

```javascript
const items = [
  ['name', '张三'],
  ['title', 'Author']
];

const map = new Map();

items.forEach(
  ([key, value]) => map.set(key, value)
);
```

如果对同一个键多次赋值，后面的值将覆盖前面的值。

```javascript
const map = new Map();

map
  .set(1, 'aaa')
  .set(1, 'bbb');

map.get(1) // "bbb"
```

上面代码对键1连续赋值两次，后一次的值覆盖前一次的值。

注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。

```javascript
const map = new Map();

map.set(['a'], 555);
map.get(['a']) // undefined
```
### <span style="color:#80bbf2">Map.prototype.set(key, value)</span>

set方法设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。

```javascript
const m = new Map();

m.set('edition', 6) // 键是字符串
m.set(262, 'standard') // 键是数值
m.set(undefined, 'nah') // 键是undefined
```
set方法返回的是当前的Map对象，因此可以采用链式写法。

```javascript
let map = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');
```

### <span style="color:#80bbf2">（1）Map 转为数组</span>

前面已经提过，Map 转为数组最方便的方法，就是使用扩展运算符（...）。

```javascript
const myMap = new Map()
  .set(true, 7)
  .set({foo: 3}, ['abc']);

[...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
```
### <span style="color:#80bbf2">（2）数组 转为 Map</span>

将数组传入 Map 构造函数，就可以转为 Map。

```javascript
new Map([
  [true, 7],
  [{foo: 3}, ['abc']]
])
// Map {
//   true => 7,
//   Object {foo: 3} => ['abc']
// }
```
### <span style="color:#80bbf2">（3）Map 转为对象</span>

```javascript
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map().set('yes', true).set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }
```
### <span style="color:#80bbf2">（4）对象 转为 Map</span>

对象转为 Map 可以通过Object.entries()。

```javascript
let obj = {"a":1, "b":2};
let map = new Map(Object.entries(obj));
```
此外，也可以自己实现一个转换函数。

```javascript
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

objToStrMap({yes: true, no: false})
// Map { 'yes' => true, 'no' => false }
```
### <span style="color:#80bbf2">（5）Map 转为 JSON</span>

Map 转为 JSON 要区分两种情况。一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON。

```javascript
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}
let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)
// '{"yes":true,"no":false}'
```
另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON。

```javascript
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}
let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap)
// '[[true,7],[{"foo":3},["abc"]]]'
```
### <span style="color:#80bbf2">（6）JSON 转为 Map</span>

JSON 转为 Map，正常情况下，所有键名都是字符串。

```javascript
const json = '{"yes": true, "no": false}';
const map = new Map(JSON.parse(json));
map.get('yes') // true
map.get('no') // false
```
但是，有一种情况下，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为 Map。这往往是数组转为 JSON 的逆操作。

```javascript
function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}

jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
// Map {true => 7, Object {foo: 3} => ['abc']}
```

## Promise 对象

### 1.<span style="color:#80bbf2">Promise 的含义</span>
Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。

所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

Promise对象有以下两个特点。

（1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

注意，为了行文方便，本章后面的resolved统一只指fulfilled状态，不包含rejected状态。

有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供统一的接口，使得控制异步操作更加容易。

Promise也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

如果某些事件不断地反复发生，一般来说，使用 Stream 模式是比部署Promise更好的选择。

下面是异步加载图片的例子。

```javascript
const preloadImage = function (path) {
  return new Promise(function (resolve, reject) {
    const image = new Image();
    image.onload = function () {
      resolve(image);
    };
    image.onerror = function () {
      reject(new Error('Could not load image at ' + path));
    };
    image.src = path;
  });
};
```

上面代码中，使用Promise包装了一个图片加载的异步操作。如果加载成功，就调用resolve方法，否则就调用reject方法。

## 类

### 1.<span style="color:#80bbf2">constructor() 方法</span>

constructor()方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor()方法，如果没有显式定义，一个空的constructor()方法会被默认添加。

```javascript
class Point {
}

// 等同于
class Point {
  constructor() {}
}
```

上面代码中，定义了一个空的类Point，JavaScript 引擎会自动为它添加一个空的constructor()方法。


### 2.<span style="color:#80bbf2">实例属性的新写法</span>

ES2022 为类的实例属性，又规定了一种新写法。实例属性现在除了可以定义在constructor()方法里面的this上面，也可以定义在类内部的最顶层。

```javascript
// 原来的写法
class IncreasingCounter {
  constructor() {
    this._count = 0;
  }
  get value() {
    console.log('Getting the current value!');
    return this._count;
  }
  increment() {
    this._count++;
  }
}
```

上面示例中，实例属性_count定义在constructor()方法里面的this上面。

```javascript
class IncreasingCounter {
  _count = 0;
  get value() {
    console.log('Getting the current value!');
    return this._count;
  }
  increment() {
    this._count++;
  }
}
```

上面代码中，实例属性_count与取值函数value()和increment()方法，处于同一个层级。这时，不需要在实例属性前面加上this。

### 3.<span style="color:#80bbf2">属性表达式 </span>

类的属性名，可以采用表达式。

```javascript
let methodName = 'getArea';

class Square {
  constructor(length) {
    // ...
  }

  [methodName]() {
    // ...
  }
}
```

### 4.<span style="color:#80bbf2">静态方法</span>

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
```

上面代码中，Foo类的classMethod方法前有static关键字，表明该方法是一个静态方法，可以直接在Foo类上调用（Foo.classMethod()），而不是在Foo类的实例上调用。如果在实例上调用静态方法，会抛出一个错误，表示不存在该方法。

注意，如果静态方法包含this关键字，这个this指的是类，而不是实例。

```javascript
class Foo {
  static bar() {
    this.baz();
  }
  static baz() {
    console.log('hello');
  }
  baz() {
    console.log('world');
  }
}

Foo.bar() // hello
```

上面代码中，静态方法bar调用了this.baz，这里的this指的是Foo类，而不是Foo的实例，等同于调用Foo.baz。另外，从这个例子还可以看出，静态方法可以与非静态方法重名。

父类的静态方法，可以被子类继承。

```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
}

Bar.classMethod() // 'hello'
```
上面代码中，父类Foo有一个静态方法，子类Bar可以调用这个方法。

静态方法也是可以从super对象上调用的。

```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ', too';
  }
}

Bar.classMethod() // "hello, too"
```

### 5.<span style="color:#80bbf2">静态属性</span>

静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。

```javascript
class Foo {
}

Foo.prop = 1;
Foo.prop // 1
```
上面的写法为Foo类定义了一个静态属性prop。

目前，只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。现在有一个提案提供了类的静态属性，写法是在实例属性的前面，加上static关键字。

```javascript
class MyClass {
  static myStaticProp = 42;

  constructor() {
    console.log(MyClass.myStaticProp); // 42
  }
}
```
这个新写法大大方便了静态属性的表达。

```javascript
// 老写法
class Foo {
  // ...
}
Foo.prop = 1;

// 新写法
class Foo {
  static prop = 1;
}
```

### 6.<span style="color:#80bbf2">私有属性的正式写法</span>

ES2022正式为class添加了私有属性，方法是在属性名之前使用#表示。

```javascript
class IncreasingCounter {
  #count = 0;
  get value() {
    console.log('Getting the current value!');
    return this.#count;
  }
  increment() {
    this.#count++;
  }
}
```
上面代码中，#count就是私有属性，只能在类的内部使用（this.#count）。如果在类的外部使用，就会报错。

```javascript
const counter = new IncreasingCounter();
counter.#count // 报错
counter.#count = 42 // 报错
```

上面示例中，在类的外部，读取或写入私有属性#count，都会报错。

> 注意，从 Chrome 111 开始，开发者工具里面可以读写私有属性，不会报错，原因是 Chrome 团队认为这样方便调试。

另外，不管在类的内部或外部，读取一个不存在的私有属性，也都会报错。这跟公开属性的行为完全不同，如果读取一个不存在的公开属性，不会报错，只会返回undefined。

```javascript
class IncreasingCounter {
  #count = 0;
  get value() {
    console.log('Getting the current value!');
    return this.#myCount; // 报错
  }
  increment() {
    this.#count++;
  }
}

const counter = new IncreasingCounter();
counter.#myCount // 报错
```
上面示例中，#myCount是一个不存在的私有属性，不管在函数内部或外部，读取该属性都会导致报错。

注意，私有属性的属性名必须包括#，如果不带#，会被当作另一个属性。

这种写法不仅可以写私有属性，还可以用来写私有方法。

```javascript
class Foo {
  #a;
  #b;
  constructor(a, b) {
    this.#a = a;
    this.#b = b;
  }
  #sum() {
    return this.#a + this.#b;
  }
  printSum() {
    console.log(this.#sum());
  }
}
```
上面示例中，#sum()就是一个私有方法。


另外，私有属性也可以设置 getter 和 setter 方法。

```javascript
class Counter {
  #xValue = 0;

  constructor() {
    console.log(this.#x);
  }

  get #x() { return this.#xValue; }
  set #x(value) {
    this.#xValue = value;
  }
}
```
上面代码中，#x是一个私有属性，它的读写都通过get #x()和set #x()操作另一个私有属性#xValue来完成。

私有属性不限于从this引用，只要是在类的内部，实例也可以引用私有属性。

```javascript
class Foo {
  #privateValue = 42;
  static getPrivateValue(foo) {
    return foo.#privateValue;
  }
}

Foo.getPrivateValue(new Foo()); // 42
```
私有属性和私有方法前面，也可以加上static关键字，表示这是一个静态的私有属性或私有方法。

```javascript
class FakeMath {
  static PI = 22 / 7;
  static #totallyRandomNumber = 4;

  static #computeRandomNumber() {
    return FakeMath.#totallyRandomNumber;
  }

  static random() {
    console.log('I heard you like random numbers…')
    return FakeMath.#computeRandomNumber();
  }
}

FakeMath.PI // 3.142857142857143
FakeMath.random()
// I heard you like random numbers…
// 4
FakeMath.#totallyRandomNumber // 报错
FakeMath.#computeRandomNumber() // 报错
```
上面代码中，#totallyRandomNumber是私有属性，#computeRandomNumber()是私有方法，只能在FakeMath这个类的内部调用，外部调用就会报错。

### 7.<span style="color:#80bbf2">静态块</span>

ES2022 引入了静态块（static block），允许在类的内部设置一个代码块，在类生成时运行且只运行一次，主要作用是对静态属性进行初始化。以后，新建类的实例时，这个块就不运行了。

```javascript
class C {
  static x = ...;
  static y;
  static z;

  static {
    try {
      const obj = doSomethingWith(this.x);
      this.y = obj.y;
      this.z = obj.z;
    }
    catch {
      this.y = ...;
      this.z = ...;
    }
  }
}
```

上面代码中，类的内部有一个 static 代码块，这就是静态块。它的好处是将静态属性y和z的初始化逻辑，写入了类的内部，而且只运行一次。

每个类允许有多个静态块，每个静态块中只能访问之前声明的静态属性。另外，静态块的内部不能有return语句。

静态块内部可以使用类名或this，指代当前类。

```javascript
class C {
  static x = 1;
  static {
    this.x; // 1
    // 或者
    C.x; // 1
  }
}
```
上面示例中，this.x和C.x都能获取静态属性x。

除了静态属性的初始化，静态块还有一个作用，就是将私有属性与类的外部代码分享。

```javascript
let getX;

export class C {
  #x = 1;
  static {
    getX = obj => obj.#x;
  }
}

console.log(getX(new C())); // 1
```

## 类的注意点

### 1.<span style="color:#80bbf2">严格模式</span>

类和模块的内部，默认就是严格模式，所以不需要使用<span style="color:#f40;background:#f9f2f4;">use strict</span>指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。

### 2.<span style="color:#80bbf2">不存在变量提升</span>

类不存在变量提升（hoist），这一点与 ES5 完全不同。

```javascript
new Foo(); // ReferenceError
class Foo {}
```
上面代码中，Foo类使用在前，定义在后，这样会报错，因为 ES6 不会把类的声明提升到代码头部。这种规定的原因与下文要提到的继承有关，必须保证子类在父类之后定义。

```javascript
{
  let Foo = class {};
  class Bar extends Foo {
  }
}
```
###   3.<span style="color:#80bbf2">name 属性</span>

由于本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被Class继承，包括name属性。

```javascript
class Point {}
Point.name // "Point"
```
name属性总是返回紧跟在class关键字后面的类名。

## Class 的继承

- 简介
- 私有属性和私有方法的继承
- 静态属性和静态方法的继承
- Object.getPrototypeOf()
- super 关键字
- 类的 prototype 属性和__proto__属性
- 原生构造函数的继承
- Mixin 模式的实现

<a href="https://es6.ruanyifeng.com/#docs/class-extends" target="_black" style="font-size:26px">next go to official website!~</a>