'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// sample usage:
//     <svg class="nav-header-icon" v-svg="{symbol:'icon-electron'}"></svg>
exports.default = {
  install: function install(Vue) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    var dir = {
      bind: function bind(el, binding, vnode) {

        // Get options
        opts.class = opts.class || 'icon';
        opts.url = opts.url || '/assets/svg/sprite.svg';

        // Get params
        var id = binding.value ? binding.value.symbol : binding.expression;
        var size = binding.value ? binding.value.size : null;

        // Set viewBox, widht, height attributes ?
        if (size) {
          // Normalize valid separators: / /, /,/
          size = size.replace(/( |, |,)/g, ' ');
          var sizeValues = size.split(' ');
          var l = sizeValues.length;
          var viewBox = [];

          if (l === 3 || l > 4) {
            console.warn('[vue-svg-sprite] size: ', size, ' is not valid');
          } else {
            viewBox[0] = l < 4 ? 0 : sizeValues[0];
            viewBox[1] = l < 4 ? 0 : sizeValues[1];
            var w = viewBox[2] = l < 4 ? sizeValues[0] : sizeValues[2];
            var h = viewBox[3] = sizeValues[l - 1];

            el.setAttribute('viewBox', viewBox.join(' '));
            el.setAttribute('width', w);
            el.setAttribute('height', h);
          }
        }

        // Check for existing class option (also .className--modifier)
        var isClassExisting = false;

        for (var i = 0; i < el.classList.length; i++) {
          if (el.classList.item(i).indexOf(opts.class) !== -1) {
            isClassExisting = true;
          }
        }

        if (!isClassExisting) {
          el.classList.add(opts.class);
        }

        // Add the <use> element to <svg>
        var href = opts.url + '#' + id;
        var use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', href);
        el.appendChild(use);
      }
    };

    Vue.directive('svg', dir);
  }
};