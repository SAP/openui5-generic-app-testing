module.exports = {
    docs: {
        description: "Tests whether an element is visible in a certain view",
        synopsis: "I cannot see CONTROL_ID [in VIEW_NAME view]",
        examples: [
            "I cannot see btnNext",
            "I cannot see btn-next in Detail view"
        ]
    },
    icon: "show",
    regexp: new RegExp("^I cannot see ([-a-zA-Z0-9]+)( in (.+?) view)?$"),
    action: function (sId, sViewPart, sViewName) {
        "use strict";

        var that = this,
            oWaitForOptions;

        var bFound = false;

        oWaitForOptions = {
            check: function (aAllControls) {
                bFound = (aAllControls || []).some(function (oControl) {
                    var oControlView = that.utils.getControlView(oControl);
                    return oControl.getId() === oControlView.createId(sId);
                });

                return true;
            }
        };

        if (sViewName) {
            oWaitForOptions.viewName = sViewName;
        }

        var sInView = sViewName
            ? " in " + sViewName + " view"
            : "";

        that.opa.waitFor(oWaitForOptions).done(function () {
            that.Opa5.assert.ok(!bFound, sId + " was not found" + sInView);
        });
    }
};
