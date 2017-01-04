export default {
    // Called when the bound element has been inserted into its parent node (this only guarantees parent node presence,
    // not necessarily in-document).
    inserted: function (el, binding) {
        if (binding.value) el.focus();
        else el.blur();
    },

    // Called after the containing component and its children have updated.
    componentUpdated: function (el, binding) {
        if (binding.modifiers.lazy)
            if (Boolean(binding.value) === Boolean(binding.oldValue))
                return;

        if (binding.value) el.focus();
        else el.blur();
    },
}