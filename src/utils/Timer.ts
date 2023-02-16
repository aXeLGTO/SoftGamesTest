import { Heap } from './Heap';

interface ITimerHandler {
    id: number;
    delay: number;
    timestamp: number;
    callback: (...args: any[]) => void;
    isLoop?: boolean;
}

let ID = 0;

let internalTimestamp = Date.now();

export default class Timer {
    private handlers: Heap<ITimerHandler> = new Heap((a, b) => a.timestamp - b.timestamp);

    private handlersMap: Map<number, ITimerHandler> = new Map();

    public registerTimer(
        delay: number,
        callback: () => void,
        isLoop: boolean = false): number {

        const handler = {
            id: ++ID,
            timestamp: internalTimestamp + delay,
            delay: delay,
            callback: callback,
            isLoop: isLoop,
        };
        this.handlers.insert(handler);
        this.handlersMap.set(handler.id, handler);

        return handler.id;
    }

    public unregisterTimer(id: number) {
        if (this.handlersMap.has(id)) {
            const handler = this.handlersMap.get(id)!;
            this.handlers.remove(handler);
            this.handlersMap.delete(handler.id);
        }
    }

    public update(dt: number) {
        internalTimestamp += dt * 1000;

        while (!this.handlers.isEmpty())
        {
            if (internalTimestamp < this.handlers.top.timestamp) {
                break;
            }

            const handler = this.handlers.extract();
            if (handler.isLoop) {
                handler.timestamp = internalTimestamp + handler.delay;
                this.handlers.insert(handler);
            } else {
                this.handlersMap.delete(handler.id);
            }

            handler.callback();
        }
    }
}
