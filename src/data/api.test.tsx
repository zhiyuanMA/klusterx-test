import { compareAsc } from "date-fns";
import { teams } from "./api";

describe("teams", () => {
  it("should be an array", () => {
    expect(Array.isArray(teams)).toBe(true);
  });

  it("should contain at least two team", () => {
    expect(teams.length).toBeGreaterThan(1);
  });

  it("should contain Team objects", () => {
    expect(teams[0]).toMatchObject({
      key: expect.any(String),
      name: expect.any(String),
      played: expect.any(Number),
      won: expect.any(Number),
      drawn: expect.any(Number),
      lost: expect.any(Number),
      gd: expect.any(Number),
      points: expect.any(Number),
      fixtures: expect.any(Array),
    });
  });

  it("should be sorted by points in descending order", () => {
    let prevPoints = Infinity;
    for (const team of teams) {
      expect(team.points).toBeLessThanOrEqual(prevPoints);
      prevPoints = team.points;
    }
  });

  it("all the games should be sorted by date in each team", () => {
    let prevDate = new Date(1970,1,1);
    for (const game of teams[0].fixtures) {
      expect(compareAsc(prevDate, game.date)).toBeLessThanOrEqual(-1);
      prevDate = game.date;
    }
  });
});