$(document).ready(function () {
    casePage.init();
});


var casePage = {
    init: function () {
        var $target = $('#target'),
            $source = $('#source'),
            $tabs = $('#method-tabs a'),
            self = this;

        function go() {
            var val = $source.val(),
                result = val;
            switch($tabs.filter('.selected').data('val')) {
                case 0: {
                    result = self.toUpper(val);
                    break;
                }
                case 1: {
                    result = self.toLower(val);
                    break;
                }
                case 2: {
                    result = self.formatTitle(val);
                    break;
                }
                case 3: {
                    result = self.formatToggle(val);
                    break;
                }
                case 4:
                    result = self.formatBySentence(val);
                    break;
            }
            $target.val(result).trigger('change');
        }
        $source.bind('input', go);
        $tabs.click(function () {
            if (!$(this).hasClass('selected')) {
                $(this).siblings('.selected').removeClass('selected');
                $(this).addClass('selected');
                go();
            }
        });
        go();
    },
    toUpper: function(c) {
        return c.toUpperCase();
    },
    toLower: function (c) {
        return c.toLowerCase();
    },
    formatTitle: function (s) {
        var t = new String(),
            sc = s.length,
            c,
            doUpperFlag = true;
        for (var i = 0; i < sc; i++) {
            c = s.charAt(i);
            if ( doUpperFlag ) { c = this.toUpper(c) } else { c = this.toLower(c) }
            if ( c == ' ' ) { doUpperFlag = true } else { doUpperFlag = false }
            t = t + c
        }
        return t
    },
    formatToggle: function (s) {
        var self = this;
        function isLower(c) { return self.toLower(c) == c }
        function isUpper(c) { return self.toUpper(c) == c }

        var t = new String(),
            sc = s.length,
            c;
        for (var i = 0; i < sc; i++) {
            c = s.charAt(i);
            if ( isLower(c) ) { c = this.toUpper(c) } else { if ( isUpper(c) ) c = this.toLower(c) }
            t = t + c
        }
        return t
    },
    formatBySentence: function (s) {
        return s.length > 0 && s.replace(/.+?[\.\?\!](\s|$)/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }) || '';
    }
};
