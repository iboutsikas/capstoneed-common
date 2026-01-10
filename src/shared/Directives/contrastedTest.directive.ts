import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from "@angular/core";

type Color =
{

}

@Directive({
    selector: '[capContrastText]'
})
export class ContrastedTextDirective implements OnChanges
{
    private ref: ElementRef
    @Input('capContrastText') backgroundColor: string;

    constructor(elementRef: ElementRef)
    {
        this.ref = elementRef;
    }

    ngOnChanges(changes: SimpleChanges): void {
        const change = changes['backgroundColor'];
        if (change.previousValue != change.currentValue)
        {
            const newColor = this.getContrastColor(change.currentValue);
            this.ref.nativeElement.style.color = newColor;
        }
    }

    private getContrastColor(bg: string): string {
        if (bg[0] == '#')
        {
            bg = bg.slice(1);
        }
        
        // In the FFF format, we want to map it to FFFFFF
        if (bg.length == 3)
        {
            bg = bg.split('')
            .map((hex) => {
                return `${hex}${hex}`
            })
            .join('');
        }

        const r = parseInt(bg.substring(0,2), 16);
        const g = parseInt(bg.substring(2,4), 16);
        const b = parseInt(bg.substring(4,6), 16);

        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return yiq >= 128 ? "#000000" : "#FFFFFF";
    }
}