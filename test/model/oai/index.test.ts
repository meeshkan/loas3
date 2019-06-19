import { OpenAPIObject } from "../../../src/model/oai/";
import petStore from "./pet-store-expanded";

test("pet store", () => {
  expect(OpenAPIObject.is(petStore)).toBe(true);
});
