import { computePosition, flip, shift, offset } from "@floating-ui/dom";

let isOpen = $state(false);
let menuX = $state(0);
let menuY = $state(0);
let ref: HTMLElement | null = null;

export const sessionMenu = {
    get isOpen() { return isOpen; },
    get x() { return menuX; },
    get y() { return menuY; },

    toggle(event: MouseEvent) {
        event.stopPropagation();
        isOpen = !isOpen;
        if (!isOpen) return;

        const t = event.currentTarget as HTMLElement;
        
        setTimeout(async () => {
            if (!ref || !t) return;

            const { x, y } = await computePosition(t, ref, {
                placement: "bottom-start",
                middleware: [
                    offset(8), 
                    flip(),
                    shift({ padding: 8 })
                ]
            });

            menuX = x;
            menuY = y;
        }, 0);
    },

    close() {
        isOpen = false;
    },

    register(node: HTMLElement) {
        ref = node;

        function handleOutsideClick(e: MouseEvent) {
            if (!node.contains(e.target as Node)) {
                isOpen = false;
            }
        }

        window.addEventListener("click", handleOutsideClick, true);
        return {
            destroy() {
                window.removeEventListener("click", handleOutsideClick, true);
                ref = null;
            }
        };
    }
};