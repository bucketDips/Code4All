/**
 * class grid represents a grid in code
 */
export class Grid {

    /**
     * constructor
     */
    constructor(lines, columns, patternId) {
      this.lines = lines;
      this.columns = columns;
      this.patternId = patternId;
      this.blocks = [];
      this.npcs = [];
      this.pcs = [];
      this.labels = [];
      this.functions = [];
      this.tests = [];
      this.states = [];
    }

    /**
     * method called by the teacher
     * save the actual state of the grid in the array
     * this will be retrieved in the server to display
     * differents states of the grid
     */
    saveState() {
        this.states.push(JSON.parse(JSON.stringify({
            lines: this.lines,
            columns: this.columns,
            patternId: this.patternId,
            blocks: this.blocks,
            npcs: this.npcs,
            pcs: this.pcs,
            labels: this.labels,
        })));
    }

    /**
     * method called by the teacher
     * if message it's an error, if not it's
     * just the end of the exercice
     */
    end(message) {
        throw new Error(message);
    }

    /**
     * change the pattern of the grid
     */
    changePattern(n) {
        this.patternId = n;
    }

    /**
     * copy this grid by value
     */
    copy() {
        var grid = new Grid(this.lines, this.columns, this.patternId);
        for(var i = 0; i < this.blocks.length; i++) {
            grid.addBlock(new Block(this.blocks[i].id, this.blocks[i].row, this.blocks[i].column, this.blocks[i].width, this.blocks[i].height, this.blocks[i].patternId));
        }
        for(i = 0; i < this.npcs.length; i++) {
            grid.addNpc(new Npc(this.npcs[i].id, this.npcs[i].row, this.npcs[i].column, this.npcs[i].width, this.npcs[i].height, this.npcs[i].patternId));
        }
        for(i = 0; i < this.pcs.length; i++) {
            grid.addPc(new Pc(this.pcs[i].id, this.pcs[i].row, this.pcs[i].column, this.pcs[i].width, this.pcs[i].height, this.pcs[i].patternId));
        }
        for(i = 0; i < this.labels.length; i++) {
            grid.addLabel(new Label(this.labels[i].id, this.labels[i].row, this.labels[i].column, this.labels[i].width, this.labels[i].height, this.labels[i].text));
        }
        for(i = 0; i < this.functions.length; i++) {
            grid.addFunction(new Func(this.functions[i].name, this.functions[i].code, this.functions[i].description));
        }
        for(i = 0; i < this.tests.length; i++) {
            grid.addTest(new Func(this.tests[i].name, this.tests[i].code, this.tests[i].description));
        }
        return grid;
    }
  
    /**
     * check if an element of the id exists
     * in the array elements
     */
    checkIfIdAlreadyExists(elements, id) {
        elements.forEach(element => {
            if(element.id === id) {
                throw new Error("Il ne peut pas y avoir deux éléments avec le même id de ce type");
            }
        });
    }

    /**
     * method called by teacher
     * add a block to the grid
     */
    addBlock(block) {
        if(!(block instanceof Block)) throw new Error("L'élément ajouté doit être de type 'block'");
        this.checkIfIdAlreadyExists(this.blocks, block.id);
        this.blocks.push(block);
    };

    /**
     * method called by teacher
     * add a npc to the grid
     */
    addNpc(npc) {
        if(!(npc instanceof Npc)) throw new Error("L'élément ajouté doit être de type'npc'");
        this.checkIfIdAlreadyExists(this.npcs, npc.id);
        this.npcs.push(npc);
    };

    /**
     * method called by teacher
     * add a pc to the grid
     */
    addPc(pc) {
        if(!(pc instanceof Pc)) throw new Error("L'élément ajouté doit être de type 'pc'");
        this.checkIfIdAlreadyExists(this.pcs, pc.id);
        this.pcs.push(pc);
    };

    /**
     * method called by teacher
     * add a label to the grid
     */
    addLabel(label) {
        if(!(label instanceof Label)) throw new Error("L'élément ajouté doit être de type 'label'");
        this.checkIfIdAlreadyExists(this.labels, label.id);
        this.labels.push(label);
    };

    /**
     * check if a function name already exists
     * in the array functions
     */
    checkIfNameAlreadyExists(functions, name) {
        functions.forEach(element => {
            if(element.name === name) {
                throw new Error("Il ne peut pas y avoir deux fonctions ou tests avec ce même id");
            }
        });
    }

    /**
     * method called by teacher
     * add a function to the grid
     */
    addFunction(func) {
        if(!(func instanceof Func)) throw new Error("L'élément ajouté doit être de type 'function'");
        this.checkIfNameAlreadyExists(this.functions, func.name);
        this.functions.push(func);
    }

    /**
     * method called by teacher
     * add a test to the grid
     */
    addTest(func) {
        if(!(func instanceof Func)) throw new Error("L'élément ajouté doit être de type 'function'");
        this.checkIfNameAlreadyExists(this.tests, func.name);
        this.tests.push(func);
    }

    /**
     * remove an element by id for the grid
     */
    removeElement(elements, id) {
        for(var i = 0; i < elements.length; i++) {
            if(elements[i].id === id) {
                elements.splice(i, 1);
                return;
            }
        }
    }

    /**
     * method called by teacher
     * remove a block to the grid
     */
    removeBlock(id) {
        this.removeElement(this.blocks, id);
    }

    /**
     * method called by teacher
     * remove a npc to the grid
     */
    removeNpc(id) {
        this.removeElement(this.npcs, id);
    }

    /**
     * method called by teacher
     * remove a pc to the grid
     */
    removePc(id) {
        this.removeElement(this.pcs, id);
    }

    /**
     * method called by teacher
     * remove a label to the grid
     */
    removeLabel(id) {
        this.removeElement(this.labels, id);
    }
  
    /**
     * method called by teacher
     * get the blocks of the grid
     */
    getBlocks() {
        return this.blocks;
    }

    /**
     * method called by teacher
     * get the npcs of the grid
     */
    getNpcs() {
        return this.npcs;
    }

    /**
     * method called by teacher
     * get the pcs of the grid
     */
    getPcs() {
        return this.pcs;
    }

    /**
     * method called by teacher
     * get the labels of the grid
     */
    getLabels() {
        return this.labels;
    }

    /**
     * method called by teacher
     * get the functions of the grid
     */
    getFunctions() {
        return this.functions;
    }

    /**
     * method called by teacher
     * get the tests of the grid
     */
    getTests() {
        return this.tests;
    }

    /**
     * get an element by if from the
     * array elements
     */
    getElementById(id, elements) {
        for(var i = 0; i < elements.length; i++) {
            if(elements[i].id === id) {
                return elements[i];
            }
        }
        throw new Error("Il n'y a pas d'élément avec cet id");
    }

    /**
     * method called by teacher
     * get a block by his id
     */
    getBlock(id) {
        return this.getElementById(id, this.blocks);
    }

    /**
     * method called by teacher
     * get a npc by his id
     */
    getNpc(id) {
        return this.getElementById(id, this.npcs);
    }

    /**
     * method called by teacher
     * get a pc by his id
     */
    getPc(id) {
        return this.getElementById(id, this.pcs);
    }

    /**
     * method called by teacher
     * get a label by his id
     */
    getLabel(id) {
        return this.getElementById(id, this.labels);
    }

    /**
     * check if an element of this id
     * exists in the array elements
     */
    elementExists(id, elements) {
        for(var i = 0; i < elements.length; i++) {
            if(elements[i].id === id) {
                return true;
            }
        }
        return false;
    }

    /**
     * method called by teacher
     * check if a block of this id exists
     */
    blockExists(id) {
        return this.elementExists(id, this.blocks);
    }

    /**
     * method called by teacher
     * check if a npc of this id exists
     */
    npcExists(id) {
        return this.elementExists(id, this.npcs);
    }

    /**
     * method called by teacher
     * check if a pc of this id exists
     */
    pcExists(id) {
        return this.elementExists(id, this.pcs);
    }

    /**
     * method called by teacher
     * check if a label of this id exists
     */
    labelExists(id) {
        return this.elementExists(id, this.labels);
    }
  }
  
/**
 * class block represents a block in code
 */
export class Block {

    /**
     * constructor
     */
    constructor(id, row, column, width, height, patternId) {
        this.id = id;
        this.row = row;
        this.column = column;
        this.width = width;
        this.height = height;
        this.patternId = patternId;
    }

    /**
     * method called by teacher
     * change the starting row ot this element
     */
    changeRow(n) {
        this.row = n;
    }

    /**
     * method called by teacher
     * change the starting column ot this element
     */
    changeColumn(n) {
        this.column = n;
    }

    /**
     * method called by teacher
     * change the width ot this element
     */
    changeWidth(n) {
        this.width = n;
    }

    /**
     * method called by teacher
     * change the heigth ot this element
     */
    changeHeight(n) {
        this.height = n;
    }

    /**
     * method called by teacher
     * change the pattern id of this element
     */
    changePattern(n) {
        this.patternId = n;
    }
}

/**
 * class npc represents a pc in code
 */
export class Npc {

    /**
     * constructor
     */
    constructor(id, row, column, width, height, patternId) {
        this.id = id;
        this.row = row;
        this.column = column;
        this.width = width;
        this.height = height;
        this.patternId = patternId;
    }

    /**
     * method called by teacher
     * change the starting row ot this element
     */
    changeRow(n) {
        this.row = n;
    }

    /**
     * method called by teacher
     * change the starting column ot this element
     */
    changeColumn(n) {
        this.column = n;
    }

    /**
     * method called by teacher
     * change the width ot this element
     */
    changeWidth(n) {
        this.width = n;
    }

    /**
     * method called by teacher
     * change the heigth ot this element
     */
    changeHeight(n) {
        this.height = n;
    }

    /**
     * method called by teacher
     * change the pattern id of this element
     */
    changePattern(n) {
        this.patternId = n;
    }
}

/**
 * class pc represents a pc in code
 */
export class Pc {

    /**
     * constructor
     */
    constructor(id, row, column, width, height, patternId) {
        this.id = id;
        this.row = row;
        this.column = column;
        this.width = width;
        this.height = height;
        this.patternId = patternId;
    }

    /**
     * method called by teacher
     * change the starting row ot this element
     */
    changeRow(n) {
        this.row = n;
    }

    /**
     * method called by teacher
     * change the starting column ot this element
     */
    changeColumn(n) {
        this.column = n;
    }

    /**
     * method called by teacher
     * change the width ot this element
     */
    changeWidth(n) {
        this.width = n;
    }

    /**
     * method called by teacher
     * change the heigth ot this element
     */
    changeHeight(n) {
        this.height = n;
    }

    /**
     * method called by teacher
     * change the pattern id of this element
     */
    changePattern(n) {
        this.patternId = n;
    }
}

/**
 * class label represents a label in code
 */
export class Label {

    /**
     * constructor
     */
    constructor(id, row, column, width, height, text) {
        this.id = id;
        this.row = row;
        this.column = column;
        this.width = width;
        this.height = height;
        this.text = text;
    }

    /**
     * method called by teacher
     * change the starting row ot this element
     */
    changeRow(n) {
        this.row = n;
    }

    /**
     * method called by teacher
     * change the starting column ot this element
     */
    changeColumn(n) {
        this.column = n;
    }

    /**
     * method called by teacher
     * change the width ot this element
     */
    changeWidth(n) {
        this.width = n;
    }

    /**
     * method called by teacher
     * change the heigth ot this element
     */
    changeHeight(n) {
        this.height = n;
    }
    /**
     * method called by teacher
     * change the text of this element
     */
    changeText(n) {
        this.text = n;
    }
}

/**
 * class func represents a function or test in code
 */
export class Func {

    /**
     * constructor
     */
    constructor(name, code, description) {
        this.name = name;
        this.code = code;
        this.description = description;
    }
}
  