import configs from "../../configs.js";
export { default as messageFilter } from "./messageFilter.js";
export { default as messageLock } from "./messageLock.js";

export const isAnchor = (uid) => uid === configs.anchorUid;
