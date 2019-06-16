import yaml from "js-yaml";
import loai3 from "../../src/index";

test("lazy openapi provides default info", () => {
    expect(loai3(yaml.load(``)).info.title).toBe("lazy");
    expect(loai3(yaml.load(``)).info.version).toBe("0.0.0");
    expect(loai3(yaml.load(`paths: { /foo: 1 }`)).info.title).toBe("lazy");
    expect(loai3(yaml.load(`paths: { /foo: 1 }`)).info.version).toBe("0.0.0");

});

test("lazy openapi preserves existing info", () => {
    expect(loai3(yaml.load(`info: { title: foo }`)).info.title).toBe("foo");
    expect(loai3(yaml.load(`info: { title: foo }`)).info.version).toBe("0.0.0");
    expect(loai3(yaml.load(`info: { version: 0.0.1 }`)).info.title).toBe("lazy");
    expect(loai3(yaml.load(`info: { version: 0.0.1 }`)).info.version).toBe("0.0.1");
    expect(loai3(yaml.load(`info: { description: foobar }`)).info.description).toBe("foobar");
    expect(loai3(yaml.load(`info: { version: 0.0.1, description: foobar }`)).info.description).toBe("foobar");
});