## 坐标系

```javascript
/**
 * 配置参数
 * title: 坐标轴标题，默认'标题'
 * yAxis: 是否显示y轴，默认true
 * xAxis: 是否显示x轴，默认true
 * color: 坐标轴颜色，默认#ccc
 * id: svg的id选择器，必填
 * yMax: 配置y轴刻度，传入数据最大值 (选填)
 * xText: 配置x轴刻度文本， string[] (选填)
 * part：配置x轴刻度数量，理想应该和xText长度一致（选填）
 */
function draw(arg) {
  function calcUpLimit(maxValue) {
    const len = String(maxValue).length;
    const unit = Math.pow(10, len - 1);
    return maxValue % unit === 0
      ? maxValue
      : (Math.floor(maxValue / unit) + 1) * unit;
  }
  function drawBox(arg) {
    // 判断是否是字符串，如果是字符串则转换为对象
    if (arg === "string") {
      arg = { id: arg };
    }
    // 至此，arg是一个对象
    const config = {
      title: "标题",
      color: "#ccc",
      yAxis: true,
      xAxis: true,
      ...arg,
    };
    const NS = "http://www.w3.org/2000/svg";

    const svg = document.querySelector(config.id);
    const path = document.createElementNS(NS, "path");
    const g = document.createElementNS(NS, "g");
    const title = document.createElementNS(NS, "text");

    // svg
    svg.setAttribute("viewBox", "0 0 250 250");

    // title
    title.setAttribute("x", "10");
    title.setAttribute("y", "16");
    title.textContent = config.title;
    title.setAttribute("font-size", "8");
    g.appendChild(title);

    // path
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", config.color);
    path.setAttribute("stroke-width", "1");

    // 创建坐标轴
    let d = "";
    for (let i = 0; i < 11; i++) {
      if (config.xAxis) d += `M25 ${25 + i * 20} H225 `;
      if (config.yAxis) d += `M${25 + i * 20} 25 V225 `;
    }
    // 设置path的d属性
    path.setAttribute("d", d);
    g.appendChild(path);

    // 判断svg是否有子元素
    const children = svg.children;
    if (children && children.length > 0) {
      svg.insertBefore(g, children[0]);
      return;
    }
    svg.appendChild(g);
  }

  function drawViewSpace(arg) {
    const config = {
      ...arg,
    };

    // 准备
    const NS = "http://www.w3.org/2000/svg";
    const svg = document.querySelector("#coord");
    const boxSize = 200; //坐标大小 200 × 200
    const yCount = 5; //刻度总数
    const upLimit = calcUpLimit(config.yMax); // 计算上限最大值
    const yDataSpace = upLimit / yCount; // y轴的刻度间距
    const ySpace = boxSize / yCount; // x轴的刻度间距
    const xSpace = boxSize / config.xText?.length;
    let g;

    // 需要配置x轴文字
    if (config.xText && config.xText.length > 0) {
      g = document.createElementNS(NS, "g");
      g.setAttribute("class", "x-text");
      svg.appendChild(g);
      for (let i = 0; i < config.xText.length; i++) {
        const text = document.createElementNS(NS, "text");
        text.setAttribute("x", 25 + xSpace / 2 + i * xSpace);
        text.setAttribute("y", 235);
        text.innerHTML = config.xText[i];
        g.appendChild(text);
      }
    }

    // 需要配置x轴刻度数量
    if (config.part) {
      g = document.createElementNS(NS, "g");
      g.setAttribute("class", "x-line");
      svg.appendChild(g);
      let d = "";
      for (let index = 0; index <= config.part; index++) {
        d += `M${25 + index * xSpace} 225 V230`;
      }
      const path = document.createElementNS(NS, "path");
      path.setAttribute("d", d);
      path.setAttribute("stroke", "#b9b9b9");
      path.setAttribute("stroke-width", "0.5");
      g.appendChild(path);
    }

    // 需要配置y轴刻度
    if (config.yMax) {
      g = document.createElementNS(NS, "g");
      g.setAttribute("class", "y-text");
      svg.appendChild(g);
      for (let i = 0; i <= yCount; i++) {
        const text = document.createElementNS(NS, "text");
        text.setAttribute("x", 22);
        text.setAttribute("y", 227 - i * ySpace);
        text.innerHTML = i * yDataSpace;
        g.appendChild(text);
      }
    }
  }
  drawBox(arg);
  drawViewSpace(arg);
}

```

## 折线图
```javascript

  // 数据
  const data = [
    {
      value: 200,
      text: "周一",
    },
    {
      value: 420,
      text: "周二",
    },
    {
      value: 150,
      text: "周三",
    },
    {
      value: 470,
      text: "周四",
    },
    {
      value: 280,
      text: "周五",
    },
    {
      value: 120,
      text: "周六",
    },
    {
      value: 370,
      text: "周日",
    },
  ];

  draw({
    id: "#coord",
    yAxis: false,
    title: "访问量（天）",
    color: "#3d9bf0",
  });

  const count = 5; // y轴刻度的数量

  /**
   * y轴刻度设计：
   * 找到数据的最大值，将其分成5份，绘制6个y轴刻度
   * 假设最大值是500， 那么每份就是100，y轴刻度就是0,100,200,300,400,500
   * 让折线不顶边，做一个向上取整处理
   * max(500) --> 500
   * max(450) --> 500
   * max(1800) --> 2000
   * 三位数的基准为100
   * 四位数的基准为1000
   */
  function calcUpLimit (maxValue){
    const len = String(maxValue).length;
    const unit = Math.pow(10, len - 1);
    return maxValue%unit === 0 ? maxValue : (Math.floor(maxValue/unit) + 1) * unit;
  }

  // 获取数据的最大值
    const maxValue = Math.max(...data.map(item => item.value));
    const upLimit = calcUpLimit(maxValue);

    const NS = "http://www.w3.org/2000/svg";
    const svg = document.querySelector("#coord");

    // 绘制左侧数值
    const yDataSpace = upLimit / count; // y轴刻度的间距
    const ySpace = 200 / count; // y轴刻度的间距

    // 绘制y轴刻度
    let g = document.createElementNS(NS, "g");
    g.setAttribute("class", "y-text");
    for (let i = 0; i <= count; i++) {
        const text = document.createElementNS(NS, "text");
        text.setAttribute("x", "22");
        text.setAttribute("y", 227 - (i * ySpace));
        text.textContent = yDataSpace * i;
        g.appendChild(text);
    }
    svg.appendChild(g);

    // 绘制x轴刻度
    const xSpace = 200 / data.length; // x轴刻度的间距
    g = document.createElementNS(NS, "g");
    g.setAttribute("class", "x-line");
    let d = ""
    for (let i = 0; i <= data.length; i++) {
        d += `M${25 + i * xSpace} 225 V230 `
    }
    const path = document.createElementNS(NS, "path");
    path.setAttribute("d", d);
    path.setAttribute("stroke", "#6e6b6b");
    path.setAttribute("stroke-width", "0.5");
    g.appendChild(path);
    svg.appendChild(g);

    // 绘制x轴刻度文字
    g = document.createElementNS(NS, "g");
    g.setAttribute("class", "x-text");
    for (let i = 0; i < data.length; i++) {
        const text = document.createElementNS(NS, "text");
        text.setAttribute('x',(25 + xSpace/2) + i * xSpace)
        text.setAttribute("y", 235);
        text.textContent = data[i].text;
        g.appendChild(text);
    }
    svg.appendChild(g);

    // 绘制折线
    g = document.createElementNS(NS, "g");
    g.setAttribute("class", "line");
    const polyline = document.createElementNS(NS, "polyline");
    let points = "";
    for (let i = 0; i < data.length; i++) {
        const x = 25 + xSpace / 2 + i * xSpace;
        const y = 225 - (data[i].value / upLimit) * 200;
        points += `${x} ${y}`;
        if (i !== data.length - 1) {
            points += ", ";
        }
    }
    polyline.setAttribute("points", points);
    polyline.setAttribute("stroke", "#db0c1e");
    polyline.setAttribute("stroke-width", "1");
    polyline.setAttribute("fill", "none");
    g.appendChild(polyline);
    svg.appendChild(g);

    // 绘制折线圆点，添加过渡动画
    g = document.createElementNS(NS, "g");
    for (let i = 0; i < data.length; i++) {
        const x = 25 + xSpace / 2 + i * xSpace;
        const y = 225 - (data[i].value / upLimit) * 200;
        const circle = document.createElementNS(NS, "circle");
        circle.setAttribute('class', 'circle');
        circle.setAttribute('data-value', data[i].value);
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", "1.5");
        circle.setAttribute("fill", "#db0c1e");
        g.appendChild(circle);
    }
    svg.appendChild(g);


    // 鼠标移上去圆点的数据框
    const tooltip = document.querySelector('.data-tooltip');
    svg.addEventListener('mousemove', (e) => {
        if(e.target.tagName === 'circle'){
            const left = e.clientX + 10 + 'px';
            const top = e.clientY - 10 + 'px';
            tooltip.style.display = 'block';
            tooltip.style.left = left;
            tooltip.style.top = top;
            tooltip.textContent = e.target.getAttribute('data-value');
            // 鼠标移出
            e.target.addEventListener('mouseleave', () => {
                tooltip.style.display = 'none';
            })
        }
    })
    
    
```