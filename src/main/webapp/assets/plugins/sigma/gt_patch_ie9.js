Sigma.doc._createElement = Sigma.doc.createElement;
Sigma.doc.createElement = function (tag) {
    var el;
    try {
        el = Sigma.doc._createElement(tag);
        
    // for IE9
    } catch (e) {
        // <tag> -> tag
        tag = tag.replace(/^[ \t\r\n]*<[ \t\r\n]*/, "");
        tag = tag.replace(/[ \t\r\n]*>[ \t\r\n]*$/, "");
        
        // Create
        var tagSplit = tag.split(/[ \t\r\n]+/);
        el = Sigma.doc._createElement(tagSplit[0]);
        
        // Attributes
        for (var i = 1; i < tagSplit.length; i++) {
            var attr = tagSplit[i]
                .replace(/([^="' \r\n\t]+)[^ \r\n\t]*=[^ \r\n\t]*(:?"?([^"]*)"|'?([^']*)')?/, "$1__split__$2")
                .split("__split__");//'
            el.setAttribute(attr[0], attr[1]);
        }
    }
    return el;
};