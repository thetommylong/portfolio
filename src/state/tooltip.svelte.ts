import { computePosition, flip, shift, offset } from "@floating-ui/dom";

let showTooltip = $state(false);
let tooltipText = $state("");
let tooltipAltText = $state("");
let tooltipX = $state(0);
let tooltipY = $state(0);
let timer: ReturnType<typeof setTimeout>;

let ref: HTMLElement | null = null;

export const tooltip = {
    get show() { return showTooltip; },
    get text() { return tooltipText; },
    get altText() { return tooltipAltText; },
    get x() { return tooltipX; },
    get y() { return tooltipY; },

    registerElement(node: HTMLElement) {
        ref = node;
        return {
            destroy() {
                ref = null;
            }
        };
    },

    hover(event: MouseEvent, text: string, alt: string) {
        clearTimeout(timer);
        const target = event.currentTarget as HTMLElement;
        if (!target) return;

        timer = setTimeout(async () => {
            tooltipText = text;
            tooltipAltText = alt || "";
            showTooltip = true;

            await new Promise((resolve) => setTimeout(resolve, 0));

            if (!ref) return;

            const { x, y } = await computePosition(target, ref, {
                placement: 'bottom-start', 
                middleware: [
                    offset(8),
                    flip(),
                    shift({ padding: 8 })
                ]
            });

            tooltipX = x;
            tooltipY = y;
        }, 500);
    },

    leave() {
        clearTimeout(timer);
        showTooltip = false;
    },

    destroy() {
        clearTimeout(timer);
    }
};