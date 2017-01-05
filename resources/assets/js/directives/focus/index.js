export default {
    // Called when the bound element has been inserted into its parent node (this only guarantees parent node presence,
    // not necessarily in-document).
    inserted: function (el, {def, value}) {
        if (value) el.focus() || (def.focusDone = true);
        else el.blur();
    },

    // Called after the containing component and its children have updated.
    componentUpdated: function (el, {def, value}) {
        if (def.focusDone)
            return;

        if (value) el.focus() || (def.focusDone = true);
        else el.blur();
    },
}