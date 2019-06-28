class Consts {
    url() {
        return "http://212.47.235.40:3000/";
    }

    customEval(toEval, createGrid, createBlock, createNpc, createPc, createLabel, createFunction, synchronise, changeGridObject) {
        eval(toEval);
    }

    customEvalOfCode(grid, saveState, end, buildedCode) {
        eval(buildedCode);
    }

    customEvalOfTests(grid, setTestResult, buildedCode) {
        eval(buildedCode);
    }
}

export default new Consts();