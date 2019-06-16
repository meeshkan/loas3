import { $InfoObject } from "../model/LazyOpenApi";
import { InfoObject } from "../model/OpenApi";

const defaults = {
    title: "lazy",
    version: "0.0.0",
}

export default (o: $InfoObject | undefined): InfoObject =>
    o ? {
        ...defaults,
        ...o,
    } : defaults;
