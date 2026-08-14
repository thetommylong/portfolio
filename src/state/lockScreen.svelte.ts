let locked = $state(false);

const idlePeriod = 10 * 60 * 1000;
let idleTimer: ReturnType<typeof setTimeout>;

export const lockScreen = {
    get locked() { return locked; },
    set locked(val) { locked = val; },
    
    resetLockTimeout() {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => { locked = true; }, idlePeriod);
    },

    destroy() {
        clearTimeout(idleTimer);
    }
};