import type { Emitter } from 'mitt';

interface RefreshParam {
    path: string;
    name: string;
}

type Event = {
    refresh: RefreshParam;
};

declare module 'vue' {
    export interface ComponentCustomProperties {
        $bus: Emitter<Event>;
    }
}

export {};
