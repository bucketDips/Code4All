export class Grid {
    constructor(lines, columns, patternId) {
      this.lines = lines;
      this.columns = columns;
      this.patternId = patternId;
      this.blocks = [];
    }
  
    changePattern(patternId){};
  
    addBlock(block) {
        this.blocks.forEach(element => {
            if(element.id === block.id) {
                throw new Error("There can't be 2 blocks with same id.");
            }
        });
        this.blocks.push(block);
    };

    removeBlock(id) {
        this.blocks.array.forEach(element => {
            if(element.id === id) {
                this.blocks.pop(element);
                return;
            }
        });
    }
  
    getBlocks() {
      return this.blocks;
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
  