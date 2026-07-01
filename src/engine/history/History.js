class History {

    constructor() {

        this.undoStack = [];
        this.redoStack = [];

    }

    push(move) {

        this.undoStack.push(move);
        this.redoStack = [];

    }

    undo() {

        if (this.undoStack.length === 0)
            return null;

        const move = this.undoStack.pop();

        this.redoStack.push(move);

        return move;

    }

    redo() {

        if (this.redoStack.length === 0)
            return null;

        const move = this.redoStack.pop();

        this.undoStack.push(move);

        return move;

    }

    clear() {

        this.undoStack = [];
        this.redoStack = [];

    }

}

export default History;