export class Grid {
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

    end(message) {
        throw new Error(message);
    }

    changePattern(n) {
        this.patternId = n;
    }

    copy() {
        var grid = new Grid(this.lines, this.columns, this.patternId);
        for(var i = 0; i < this.blocks.length; i++) {
            grid.addBlock(new Block(this.blocks[i].id, this.blocks[i].row, this.blocks[i].column, this.blocks[i].width, this.blocks[i].height, this.blocks[i].patternId));
        }
        for(var i = 0; i < this.npcs.length; i++) {
            grid.addNpc(new Npc(this.npcs[i].id, this.npcs[i].row, this.npcs[i].column, this.npcs[i].width, this.npcs[i].height, this.npcs[i].patternId));
        }
        for(var i = 0; i < this.pcs.length; i++) {
            grid.addPc(new Pc(this.pcs[i].id, this.pcs[i].row, this.pcs[i].column, this.pcs[i].width, this.pcs[i].height, this.pcs[i].patternId));
        }
        for(var i = 0; i < this.labels.length; i++) {
            grid.addLabel(new Label(this.labels[i].id, this.labels[i].row, this.labels[i].column, this.labels[i].width, this.labels[i].height, this.labels[i].text));
        }
        for(var i = 0; i < this.functions.length; i++) {
            grid.addFunction(new Func(this.functions[i].name, this.functions[i].code, this.functions[i].description));
        }
        for(var i = 0; i < this.tests.length; i++) {
            grid.addTest(new Func(this.tests[i].name, this.tests[i].code, this.tests[i].description));
        }
        return grid;
    }
  
    checkIfIdAlreadyExists(elements, id) {
        elements.forEach(element => {
            if(element.id === id) {
                throw new Error("There can't be 2 elements of this type with same id.");
            }
        });
    }

    addBlock(block) {
        if(!(block instanceof Block)) throw new Error("The added element should be of type 'block'");
        this.checkIfIdAlreadyExists(this.blocks, block.id);
        this.blocks.push(block);
    };

    addNpc(npc) {
        if(!(npc instanceof Npc)) throw new Error("The added element should be of type 'npc'");
        this.checkIfIdAlreadyExists(this.npcs, npc.id);
        this.npcs.push(npc);
    };

    addPc(pc) {
        if(!(pc instanceof Pc)) throw new Error("The added element should be of type 'pc'");
        this.checkIfIdAlreadyExists(this.pcs, pc.id);
        this.pcs.push(pc);
    };

    addLabel(label) {
        if(!(label instanceof Label)) throw new Error("The added element should be of type 'label'");
        this.checkIfIdAlreadyExists(this.labels, label.id);
        this.labels.push(label);
    };

    addFunction(func) {
        if(!(func instanceof Func)) throw new Error("The added element should be of type 'function'");
        //this.functions.push(new Func(name, String(code), description));
        this.functions.push(func);
    }

    addTest(func) {
        if(!(func instanceof Func)) throw new Error("The added element should be of type 'function'");
        //this.functions.push(new Func(name, String(code), description));
        this.tests.push(func);
    }

    removeElement(elements, id) {
        for(var i = 0; i < elements.length; i++) {
            if(elements[i].id === id) {
                elements.splice(i, 1);
                return;
            }
        }
    }

    removeBlock(id) {
        this.removeElement(this.blocks, id);
    }

    removeNpc(id) {
        this.removeElement(this.npcs, id);
    }

    removePc(id) {
        this.removeElement(this.pcs, id);
    }

    removeLabel(id) {
        this.removeElement(this.labels, id);
    }
  
    getBlocks() {
        return this.blocks;
    }

    getNpcs() {
        return this.npcs;
    }

    getPcs() {
        return this.pcs;
    }

    getLabels() {
        return this.labels;
    }

    getFunctions() {
        return this.functions;
    }

    getTests() {
        return this.tests;
    }

    getElementById(id, elements) {
        for(var i = 0; i < elements.length; i++) {
            if(elements[i].id === id) {
                return elements[i];
            }
        }
        throw new Error("Il n'y a pas d'élément avec cet id");
    }

    getBlock(id) {
        return this.getElementById(id, this.blocks);
    }

    getNpc(id) {
        return this.getElementById(id, this.npcs);
    }

    getPc(id) {
        return this.getElementById(id, this.pcs);
    }

    getLabel(id) {
        return this.getElementById(id, this.labels);
    }

    elementExists(id, elements) {
        for(var i = 0; i < elements.length; i++) {
            if(elements[i].id === id) {
                return true;
            }
        }
        return false;
    }

    blockExists(id) {
        return this.elementExists(id, this.blocks);
    }

    npcExists(id) {
        return this.elementExists(id, this.npcs);
    }

    pcExists(id) {
        return this.elementExists(id, this.pcs);
    }

    labelExists(id) {
        return this.elementExists(id, this.labels);
    }
  }
  
export class Block {
    constructor(id, row, column, width, height, patternId) {
        this.id = id;
        this.row = row;
        this.column = column;
        this.width = width;
        this.height = height;
        this.patternId = patternId;
    }

    changeRow(n) {
        this.row = n;
    }

    changeColumn(n) {
        this.column = n;
    }

    changeWidth(n) {
        this.width = n;
    }

    changeHeight(n) {
        this.height = n;
    }

    changePattern(n) {
        this.patternId = n;
    }
}

export class Npc {
    constructor(id, row, column, width, height, patternId) {
        this.id = id;
        this.row = row;
        this.column = column;
        this.width = width;
        this.height = height;
        this.patternId = patternId;
    }

    changeRow(n) {
        this.row = n;
    }

    changeColumn(n) {
        this.column = n;
    }

    changeWidth(n) {
        this.width = n;
    }

    changeHeight(n) {
        this.height = n;
    }

    changePattern(n) {
        this.patternId = n;
    }
}

export class Pc {
    constructor(id, row, column, width, height, patternId) {
        this.id = id;
        this.row = row;
        this.column = column;
        this.width = width;
        this.height = height;
        this.patternId = patternId;
    }

    changeRow(n) {
        this.row = n;
    }

    changeColumn(n) {
        this.column = n;
    }

    changeWidth(n) {
        this.width = n;
    }

    changeHeight(n) {
        this.height = n;
    }

    changePattern(n) {
        this.patternId = n;
    }
}

export class Label {
    constructor(id, row, column, width, height, text) {
        this.id = id;
        this.row = row;
        this.column = column;
        this.width = width;
        this.height = height;
        this.text = text;
    }

    changeRow(n) {
        this.row = n;
    }

    changeColumn(n) {
        this.column = n;
    }

    changeWidth(n) {
        this.width = n;
    }

    changeHeight(n) {
        this.height = n;
    }

    changeText(n) {
        this.text = n;
    }
}

export class Func {
    constructor(name, code, description) {
        this.name = name;
        this.code = code;
        this.description = description;
    }
}
  