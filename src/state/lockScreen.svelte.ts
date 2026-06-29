let locked = $state(false);

export const lockScreen = {
    get locked() { return locked; },
    set locked(val) { locked = val; },
};