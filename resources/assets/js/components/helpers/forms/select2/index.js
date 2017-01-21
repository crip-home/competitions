export default class Select2Options {
    constructor(options = []) {
        if (options.length > 0) {
            this.data = options;
        }

        this.asSerchable();
    }

    asAjax({url, resultMap, delay = 250}) {
        this.ajax = {
            url, delay,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            processResults({data}) {
                return {
                    results: data.map(resultMap)
                };
            }
        };

        return this;
    }

    asTagable(value = true) {
        this.tags = value;

        return this;
    }

    asSerchable(value = true) {
        if (value) {
            this.minimumResultsForSearch = 0;
        }
        else {
            this.minimumResultsForSearch = Infinity;
        }

        return this;
    }
}