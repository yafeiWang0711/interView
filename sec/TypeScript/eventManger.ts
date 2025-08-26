// 事件管理类
// on 注册事件监听函数
// once 注册事件监听函数，只触发一次
// emit 触发事件
// off 注销事件监听函数

interface IEmitter <Event>{
    on(event: Event, callback: (data: any) => void): void;
    once(event: Event, callback: (data: any) => void): void;
    emit(event: Event, data?: any): void;
    off(event: Event, callback: (data: any) => void): void;
}

export class Emitter<T> implements IEmitter<T>{
    //  内部存储 事件名 -> 处理函数
    private events = new Map<string,Array<{callback:(e:T)=>void;once:Boolean}>>();

    // 注册事件监听函数
    on(event: string, callback: (e: T) => void): void {
        let handlers = this.events.get(event);
        if (!handlers) {
            handlers = [];
            this.events.set(event, handlers);
        }
        handlers.push({ callback, once: false });
    }

    // 注册事件监听函数，只触发一次
    once(event: string, callback: (e: T) => void): void {
        let handlers = this.events.get(event);
        if (!handlers) {
            handlers = [];
            this.events.set(event, handlers);
        }
        handlers.push({ callback, once: true });
    }

    // 触发事件
    emit(event: string, data?: T): void {
        let handlers = this.events.get(event);
        if (handlers) {
            for (let i = 0; i < handlers.length; i++) {
                const handler = handlers[i];
                handler.callback(data);
                if (handler.once) {
                    handlers.splice(i, 1);
                    i--;
                }
            }
        }
    }

    // 注销事件监听函数
    off(event: string, callback: (e: T) => void): void {
        let handlers = this.events.get(event);
        if (handlers) {
            for (let i = 0; i < handlers.length; i++) {
                const handler = handlers[i];
                if (handler.callback === callback) {
                    handlers.splice(i, 1);
                    i--;
                }
            }
        }
    }

}

