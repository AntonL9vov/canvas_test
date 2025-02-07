export interface Handler {
    handler: (...args: any[]) => void;
    event: string;
}

export const listeners = (
    canvas: HTMLCanvasElement,
    handlers: Handler[]
) => {
    handlers.forEach(({handler, event}) => {
        canvas.addEventListener(event, handler);
    });

    return () => {
        handlers.forEach(({handler, event}) => {
            canvas.removeEventListener(event, handler);
        });
    };
};
