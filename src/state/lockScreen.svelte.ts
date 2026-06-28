let locked = $state(true);

export const lockScreen = {
    get locked() { return locked; },
    set locked(val) { locked = val; },
};