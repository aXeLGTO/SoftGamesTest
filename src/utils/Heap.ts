export type IHeapNode<T> = T & {
    index?: number;
}

export class Heap<T> {
    private readonly items: IHeapNode<T>[];
    private readonly compare: ((a: T, b: T) => number);

    public constructor(cf: (a: T, b: T) => number) {
        this.items = [];
        this.compare = cf;
    }

    public get top(): Readonly<T> {
       return this.items[0];
    }

    public extract(): T {
        const res = this.items[0];
        this.swap(0, this.size() - 1);
        this.items.pop();
        if (!this.isEmpty()) {
            this.heapify(0);
        }
        return res;
    }

    public insert(item: IHeapNode<T>): IHeapNode<T> {
        item.index = this.items.length
        this.items.push(item);
        this.rootify(this.size() - 1);
        return item;
    }

    public remove(item: IHeapNode<T>) {
        this.swap(item.index!, this.size() - 1);
        this.items.pop();
        if (!this.isEmpty()) {
            this.heapify(0);
        }
        return item;
    }

    public clear() {
        this.items.length = 0;
    }

    public isEmpty(): boolean {
        return this.size() === 0;
    }

    public size(): number {
        return this.items.length;
    }

    protected heapify(i: number): void {
        const l = Heap.left(i);
        const r = Heap.right(i);
        let min = i;
        if (r < this.size()) {
            min = this.compare(this.items[l], this.items[r]) < 0 ? l : r;
        } else if (l < this.size()) {
            min = l;
        }
        if (this.compare(this.items[i], this.items[min]) > 0) {
            this.swap(i, min);
            this.heapify(min);
        }
    }

    protected rootify(i: number): void {
        const p = Heap.parent(i);
        const n = this.compare(this.items[i], this.items[p]);
        if (n === -1) {
            this.swap(i, p);
            this.rootify(p);
        }
    }

    protected swap(i: number, j: number): void {
        this.items[i].index = j;
        this.items[j].index = i;

        const temp = this.items[i];
        this.items[i] = this.items[j];
        this.items[j] = temp;
    }

    protected static parent(i: number): number {
        return Math.max(0, Math.ceil(i / 2) - 1);
    }

    protected static left(i: number): number {
        return 2 * i + 1;
    }

    protected static right(i: number): number {
        return 2 * i + 2;
    }
}

