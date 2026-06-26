let showTooltip = $state(false);
let tooltipText = $state("");
let tooltipAltText = $state("");
let mouseX = $state(0);
let mouseY = $state(0);
let tooltipWidth = 0;
let tooltipHeight = 0;
let timer: ReturnType<typeof setTimeout>;

export const tooltip = {
    get show() { return showTooltip; },
    get text() { return tooltipText; },
    get altText() { return tooltipAltText; },
    get x() { return mouseX; },
    get y() { return mouseY; },
    get width() { return tooltipWidth; },
    get height() { return tooltipHeight; },

    measure(node: HTMLElement) {
        tooltipWidth = node.offsetWidth;
        tooltipHeight = node.offsetHeight;
    },
    updateCoords(event: MouseEvent) {
        if (!showTooltip) {
            mouseX = event.clientX;
            mouseY = event.clientY;
        }
    },
    hover(text: string, alt: string) {
        timer = setTimeout(() => {
            tooltipText = text;
            tooltipAltText = alt || "";
            showTooltip = true;
        }, 700);
    },
    leave() {
        clearTimeout(timer);
        showTooltip = false;
    },
    destroy() {
        clearTimeout(timer);
    }
}