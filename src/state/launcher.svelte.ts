import { applications } from "../constants";

let isOpen = $state(false);
let searchQuery = $state("");
let pinned = $state(false);
let selectedIndex = $state(0);

let filteredApplications = $derived(
    searchQuery.trim() === "" 
        ? applications 
        : applications.filter(app => 
            app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
);

export const launcher = {
    get isOpen() { return isOpen; },
    get searchQuery() { return searchQuery; },
    set searchQuery(val) {
        searchQuery = val;
        selectedIndex = 0;
    },
    get selectedIndex() {
        return selectedIndex;
    },
    set selectedIndex(val) {
        selectedIndex = val;
    },
    get applications() { return filteredApplications; },
    get pinned() { return pinned; },

    toggle() { 
        isOpen = !isOpen; 
        if (!isOpen) searchQuery = "";
    },
    
    close() {
        if (pinned) return;
        isOpen = false;
        searchQuery = "";
    },
    
    togglePinned() {
        pinned = !pinned;
    },
}