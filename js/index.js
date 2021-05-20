window.onload = function () {
  // 页面加载完后调用方法
  this.startmetor();
  setInterval(startmetor, 20000);
  setTimeout(hidden, 20000);
};

function startmetor() {
  const meteorNum = 24;
  let prefix = "comet"; // 前缀
  let separator = "-"; // 分割线
  let suffixArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"]; // 类名后缀可选数据
  let suffix = ""; // 后缀
  let suffixRanNum = null; // 用于调整后缀的随机号码
  let viewWidth = $(window).width(); // jquery获取视口宽高，不包括工具栏和滚动条
  var ns = "http://www.w3.org/2000/svg";
  console.info('viewWidth', viewWidth);
  let svg = document.getElementById("meteor");
  svg.innerHTML = "";
  let defs = document.createElementNS(ns, "defs");
  let radialGradient = document.createElementNS(ns, "radialGradient");
  radialGradient.setAttribute("id", "comet-gradient");
  radialGradient.setAttribute("cx", "0");
  radialGradient.setAttribute("cy", "0.5");
  radialGradient.setAttribute("r", "0.5");
  let stop1 = document.createElementNS(ns, "stop");
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("stop-color", "rgba(255,255,255,.8)");
  radialGradient.appendChild(stop1);
  let stop2 = document.createElementNS(ns, "stop");
  stop2.setAttribute("offset", "100%");
  stop2.setAttribute("stop-color", "rgba(255,255,255,0)");
  radialGradient.appendChild(stop2);
  defs.appendChild(radialGradient);
  svg.appendChild(defs);
  for (let i = 0; i < meteorNum; i++) {
    suffixRanNum = generateRandomNum(suffixArr.length - 1);
    suffix = suffixArr[suffixRanNum];
    let className = "comet";
    if (!isEmpty(suffix)) {
      className += " " + prefix + separator + suffix;
    }
    let cx = generateRandomNum(viewWidth);
    let eclipse = document.createElementNS(ns, "ellipse");
    eclipse.setAttribute("fill", "url(#comet-gradient)");
    eclipse.setAttribute("cx", cx);
    eclipse.setAttribute("cy", "0");
    eclipse.setAttribute("rx", "150");
    eclipse.setAttribute("ry", "2");
    eclipse.setAttribute("width", "150");
    eclipse.setAttribute("height", "2");
    eclipse.setAttribute("class", className);

    let g = document.createElementNS(ns, "g");
    let x = cx + 75;
    g.setAttribute("transform", "rotate(-45, " + x + " 1)");
    g.appendChild(eclipse);
    svg.appendChild(g);
  }
}

function isEmpty(obj) {
  if (typeof obj == "undefined" || obj == null || obj == "") {
    return true;
  } else {
    return false;
  }
}

function hidden() {
  let hidden = document.getElementsByClassName("hiddenDiv");
  console.log(hidden.length);
  for (let i = 0; i < hidden.length; i++) {
    console.log(hidden[i]);
    hidden[i].style.display = "none";
  }

  let block = document.getElementsByClassName("blockDiv");
  console.log(block.length);
  for (let i = 0; i < block.length; i++) {
    console.log(block[i]);
    block[i].style.display = "block";
  }

  // 使happybirthday出现时，先手动触发点击，产生动画效果
  var happybirthday = document.getElementById("happybirthday");
  fireClick(happybirthday);

}

function generateRandomNum(range) {
  var randomNum = Math.random() * range;
  return parseInt(randomNum);
}


function FadeInLinkClick() {
  var frame = document.getElementById("FadeInDivFrame");
  frame.style.display = "flex";
  frame.className = "FadeInFrame fadein";
}

function CloseFrameClick() {
  var frame = document.getElementById("FadeInDivFrame");
  frame.style.display = "none";
  var happybirthday = document.getElementById("happybirthday");
  fireClick(happybirthday);
}

function fireClick(node) {
  if (document.createEvent) {
    var evt = document.createEvent('MouseEvents');
    evt.initEvent('click', true, false);
    node.dispatchEvent(evt);
  } else if (document.createEventObject) {
    node.fireEvent('onclick');
  } else if (typeof node.onclick == 'function') {
    node.onclick();
  }
}