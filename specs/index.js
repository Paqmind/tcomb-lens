import Tc from "tcomb";
import Chai from "chai";
import {isImmutable} from "../src/helpers";
import Lens from "../src/index";

let expect = Chai.expect;

//let Lens = require("../src/index");

// expect(isImmutable(Tc.Any)).eql(true); ???

describe("isImmutable()", function () {
  it("should know immutable types", function () {
    expect(isImmutable(Tc.Array)).eql(true);
    expect(isImmutable(Tc.Boolean)).eql(true);
    expect(isImmutable(Tc.Date)).eql(true);
    expect(isImmutable(Tc.enums.of("foo", "bar"))).eql(true);
    expect(isImmutable(Tc.Error)).eql(true);
    expect(isImmutable(Tc.Function)).eql(true);
    expect(isImmutable(Tc.Nil)).eql(true);
    expect(isImmutable(Tc.Number)).eql(true);
    expect(isImmutable(Tc.Object)).eql(true);
    expect(isImmutable(Tc.RegExp)).eql(true);
    expect(isImmutable(Tc.String)).eql(true);
    expect(isImmutable(Tc.union([Tc.String, Tc.Number]))).eql(true);

    let Min = Tc.subtype(Tc.String, s => s.length > 2);
    let Max = Tc.subtype(Tc.String, s => s.length < 5);

    expect(isImmutable(Min)).eql(true);
    expect(isImmutable(Max)).eql(true);
    expect(isImmutable(Tc.intersection([Min, Max]))).eql(true);
  });

  it("should know mutable types", function () {
    expect(isImmutable(Tc.dict(Tc.String, Tc.String))).eql(false);
    expect(isImmutable(Tc.list(Tc.String))).eql(false);
    expect(isImmutable(Tc.struct({}))).eql(false);
    expect(isImmutable(Tc.tuple([Tc.String, Tc.Number]))).eql(false);
  });
});

describe("Lens", function () {
  it("should throw for non-string keys", function () {
    expect(() => Lens(undefined)).to.throw("key must be of string type, got undefined");
    expect(() => Lens(null)).to.throw("key must be of string type, got object");
    expect(() => Lens(42)).to.throw("key must be of string type, got number");
  });

  describe(".get()", function () {
    it("should return original data for empty keys", function () {
      expect(Lens("").get(null)).eql(null);
      expect(Lens("").get({foo: "bar"})).eql({foo: "bar"});
      expect(Lens("").get(["foo", "bar"])).eql(["foo", "bar"]);
    });

    it("should return values for existing Struct keys", function () {
      let r1 = Lens("username").get(Tc.struct({username: Tc.String}));
      expect(r1.meta.name).eql("String");

      let r2 = Lens("model.username").get(Tc.struct({model: Tc.struct({username: Tc.String})}));
      expect(r2.meta.name).eql("String");

      let r3 = Lens("model").get(Tc.struct({model: Tc.struct({username: Tc.String}, "Model")}));
      expect(r3.meta.name).eql("Model");
    });

    it("should return values for Dict keys", function () {
      let r1 = Lens("username").get(Tc.dict(Tc.String, Tc.String));
      expect(r1.meta.name).eql("String");

      let r2 = Lens("model.username").get(Tc.dict(Tc.String, Tc.dict(Tc.String, Tc.String)));
      expect(r2.meta.name).eql("String");

      let r3 = Lens("model").get(Tc.dict(Tc.String, Tc.dict(Tc.String, Tc.String, "Model")));
      expect(r3.meta.name).eql("Model");
    });

    it("should return values for List offsets", function () {
      let r1 = Lens("42").get(Tc.list(Tc.String));
      expect(r1.meta.name).eql("String");

      let r3 = Lens("tags.42").get(Tc.struct({tags: Tc.list(Tc.String)}));
      expect(r3.meta.name).eql("String");
    });

    it("should return undefined for missing Struct keys", function () {
      let r1 = Lens("username").get(Tc.struct({}));
      expect(r1).eql(undefined);

      let r2 = Lens("model.username").get(Tc.struct({model: Tc.struct({})}));
      expect(r2).eql(undefined);
    });

    it("should throw for immutable data destructuring", function () {
      expect(() => Lens("model.username").get(Tc.struct({}))).to.throw(Error);
      expect(() => Lens("model.username").get(Tc.struct({model: null}))).to.throw(Error);
    });
  });
});
