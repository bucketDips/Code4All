export class Grid {
    constructor(lines, columns, patternId) {
      this.lines = lines;
      this.columns = columns;
      this.patternId = patternId;
      this.blocks = [];
      this.npcs = [];
      this.pcs = [];
      this.labels = [];
    }
  
    changePattern(patternId){};
  
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

    removeElement(elements, id) {
        elements.array.forEach(element => {
            if(element.id === id) {
                elements.pop(element);
                return;
            }
        });
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
}

export class Pc {
    constructor(id, row, column, width, height, patternId) {
        this.id = id;
        this.row = row;
        this.column = column;
        this.width = width;
        this.height = height;
        this.patternId = patternId;
        this.functions = [];
    }

    addFunction(name, code, description) {
        this.functions.push(new Func(name, String(code), description));
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
}

export class Func {
    constructor(name, code, description) {
        this.name = name;
        this.code = code;
        this.description = description;
    }
}
  