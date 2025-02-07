import {WorldObject} from "../main.ts";
import {StaticLine} from "./staticLine.ts";

export interface Static extends WorldObject {
    toLines: () => StaticLine[];
}