import { OpenAPIObject } from "../../../src/model/oai/";
import petStore from "./pet-store-expanded";
import stripe from "./stripe";
//import { PathReporter } from "io-ts/lib/PathReporter"

test("pet store", () => {
  expect(OpenAPIObject.is(petStore)).toBe(true);
});
test.skip("stripe", () => {
  expect(OpenAPIObject.is(stripe)).toBe(true);
});
