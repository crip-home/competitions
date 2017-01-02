import Ext from './../index'

export default {

    /**
     * Create new Element object
     *
     * @param {string} [options.tag ] Created element tag name
     * @param {string} [options.bg] Background color
     * @param {string} [options.text] Element text content
     * @param {string} [options.className] Element class
     * @returns {Element}
     */
    create(options) {
        const {tag = 'div', bg, text, className} = options;
        let node = document.createElement(tag);
        if (Ext.hasValue(className))
            node.className = className;

        if (Ext.hasValue(bg))
            node.style.backgroundColor = bg;

        if (Ext.hasValue(text))
            node.textContent = text;

        return node;
    }

}