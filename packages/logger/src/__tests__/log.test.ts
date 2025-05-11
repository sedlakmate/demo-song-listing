import { describe, it, expect, jest } from "@jest/globals";
import { log } from "..";

jest.spyOn(global.console, "log");
jest.spyOn(global.console, "error");

describe("@repo/logger", () => {
  it("prints a message", () => {
    log("hello");
    expect(console.log).toHaveBeenCalled();
  });

  it("handles error logging", () => {
    log("hello", "some error");
    expect(console.error).toHaveBeenCalled();
  });
});
