export class Queue {
    constructor() {
        this._heap = [];
    }
    add(items) {
        this._heap.push(items);
    }
    get_priority() {
        this.sort();
        let result = this._heap[0];
        this._heap.splice(this._heap.indexOf(result), 1);
        return result;
    }
    sort() {
        this._heap = this._heap.sort(function(a, b) { 
            return a[0] - b[0] || a[1] - b[1];
        });
    }
    isEmpty() {
        return this._heap.length == 0;
    }
    print() {
        for(let i = 0; i < this._heap.length; i++) {
            console.log(this._heap[i][2]);
        }
    }
}

