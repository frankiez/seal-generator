export declare class SealGenerator {
    private canvas;
    private ctx;
    private width;
    constructor();
    private resetCanvas;
    private create5star;
    createSeal(company: string, name: string): void;
    getBase64Data(company: string, name: string, width?: number): any;
}
