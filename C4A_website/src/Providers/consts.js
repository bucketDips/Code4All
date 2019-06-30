/**
 * used at multiple places functions
 */
class Consts {
    forbiddenWords = [
    "boucle", "condition", "this", "setState", "state", "process", "window", "await",
    "async", "import", "include", "export", "debugger", "eval", "goto", "package", "super", "document", "constructor",
    "alert", "alert", "all", "anchor", "anchors", "area", "assign", "blur", "button", "checkbox", "clearInterval",
    "clearTimeout", "clientInformation", "close", "closed", "confirm", "constructor", "crypto", "decodeURI",
    "decodeURIComponent", "defaultStatus", "document", "element", "elements",   "embed", "embeds", "encodeURI",
    "encodeURIComponent", "escape", "event",    "fileUpload",   "focus",    "form", "forms", "frame",    "innerHeight",  "innerWidth",
    "layer",    "layers",   "link", "location", "mimeTypes",    "navigate", "navigator",    "frames", "frameRate",    
    "hidden",   "history",  "image", "images",   "offscreenBuffering",   "open", "opener", "option",   "outerHeight",  
    "outerWidth",   "packages", "pageXOffset",  "pageYOffset",  "parent",   "parseFloat", "parseInt", "password", "pkcs11",   
    "plugin", "prompt",   "propertyIsEnum",   "radio",    "reset", "screenX",  "screenY",  "scroll",   "secure",
    "select",   "self", "setInterval",  "setTimeout", "status",   "submit",   "taint", "textarea", "top",  "unescape", "untaint"   
    ];

    /**
     * url of the API
     */
    url() {
        return "http://212.47.235.40:3000/";
    }

    /**
     * check if a forbidden word is in the string
     */
    checkIfForbiddenWordIn(str) {
        for(var i = 0; i < this.forbiddenWords.length; i++) {
            if(str.includes(this.forbiddenWords[i])){
                throw new Error("Le mot " + this.forbiddenWords[i] + " est interdit dans le code.");
            }
        }
    }

    /**
     * safe eval of code
     */
    customEval(toEval, createGrid, createBlock, createNpc, createPc, createLabel, createFunction, synchronise, changeGridObject) {
        this.checkIfForbiddenWordIn(toEval);
        // eslint-disable-next-line
        eval(toEval);
    }

    /**
     * safe eval of code
     */
    customEvalOfCode(grid, buildedCode) {
        this.checkIfForbiddenWordIn(buildedCode);
        // eslint-disable-next-line
        eval(buildedCode);
    }

    /**
     * safe eval of tests
     */
    customEvalOfTests(grid, setTestResult, buildedCode) {
        this.checkIfForbiddenWordIn(buildedCode);
        // eslint-disable-next-line
        eval(buildedCode);
    }
}

export default new Consts();