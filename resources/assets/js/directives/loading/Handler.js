export default class {
    constructor(el, binding) {
        this.el = el;
        this.binding = binding;

        this.static = false;
        this.loadingBox = null;
        this.first = true;
        this.text = this.getAttrOrDefault(el, 'text', 'Loading ...');
        this.bg = this.getAttrOrDefault(el, 'bg', 'rgba(230, 233, 236, 0.8)');
    }

    bind() {
        this.binding.def.onChange = value => {
            if (value) {
                this.first = false;
                this.show();
            } else {
                if (this.first) {
                    this.first = false;
                    return;
                }
                this.hide();
            }
        }
    }

    getAttrOrDefault(el, dataAttr, defaultVal) {
        return el.getAttribute(`data-${dataAttr}`) || defaultVal;
    }

    createNode(tag, className, bg = null, text = null) {
        let node = document.createElement(tag);
        node.className = className;

        if (bg)
            node.style.backgroundColor = bg;

        if(text)
            node.textContent = text;

        return node;
    }

    show() {
        let position = window.getComputedStyle(this.el).position;
        if (position === 'static' || position === '') {
            this.static = true;
            this.el.style.position = 'relative';
        }

        let box = this.createNode('div', 'v-loading', this.bg);
        this.el.appendChild(box);

        let msg = this.createNode('div', 'v-loading-msg', null, this.text);
        box.appendChild(msg);

        window.requestAnimationFrame(() => {
            box.style.opacity = 1;
        });

        this.loadingBox = box;
    }

    hide() {
        this.loadingBox.addEventListener('transitionend', _ => {
            this.loadingBox.parentElement.removeChild(this.loadingBox);

            if (this.static) {
                this.el.style.removeProperty('position');
            }
        });

        this.loadingBox.style.opacity = 0.01;
    }
}