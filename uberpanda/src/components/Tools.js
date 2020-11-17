


export default {
  /**給元件加動畫class */
  addAnimate: function (element, classname) {
    element.classList.remove(classname);
    setTimeout(() => element.classList.add(classname), 0);
  },
  /** 給元件加class */
  addClass: function (element, classname) {
    element.classList.add(classname);
  },
  /** 給元件移除class */
  removeClass: function (element, classname) {
    element.classList.remove(classname);
  },
};


