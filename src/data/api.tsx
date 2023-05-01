import { Score, data } from "./data";
import { compareAsc, parseISO } from "date-fns";

export interface Team {
  key: string;
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gd: number;
  points: number;
  fixtures: Game[];
}

export interface Game {
  home: string;
  guest: string;
  homeGoals: number | null;
  guestGoals: number | null;
  played: boolean;
  date: Date;
}

const now = new Date(2021, 4, 5, 14, 0, 0);

const buildTeam = (
  name: string,
  played: number,
  won: number,
  drawn: number,
  lost: number,
  gd: number,
  game: Game,
  team: Team
): Team => {
  const points = 3 * won + drawn;
  return team
    ? {
        key: name,
        name,
        played: team.played + played,
        won: team.won + won,
        drawn: team.drawn + drawn,
        lost: team.lost + lost,
        gd: team.gd + gd,
        points: team.points + points,
        fixtures: [...team.fixtures, game].sort((g1, g2) => {
          return compareAsc(g1.date, g2.date);
        }),
      }
    : {
        key: name,
        name,
        played,
        won,
        drawn,
        lost,
        gd,
        points,
        fixtures: [game],
      };
};

const validate = (score: Score, date: Date) => {
  if (Object.keys(score).length !== 2) {
    console.error("should have 2 scores");
    return false;
  }
  const thn = Object.keys(score)[0],
    tgn = Object.keys(score)[1];
  const thg = score[thn],
    tgg = score[tgn];
  if (thn === tgn) {
    console.error("home team cannot be same with guest team");
    return false;
  }
  if ((thg && tgg === null) || (thg === null && tgg)) {
    console.error("miss one score");
    return false;
  }
  if (compareAsc(date, now) < 0 && thg === null && tgg === null) {
    console.error("should have scores if date is before now");
    return false;
  }
  return true;
};

const buildData = () => {
  const matchesByTeam: { [team: string]: Team } = {};
  let i = 1;
  // Group matches by team
  for (const match of data) {
    const { score, date } = match;
    const dateObject = parseISO(date);
    if (!validate(score, dateObject)) {
      console.error(`the record line ${i++} have invalid information...`);
      continue; // skip this invalid record
    }

    const thn = Object.keys(score)[0],
      tgn = Object.keys(score)[1];
    const thg = score[thn],
      tgg = score[tgn];

    const played = thg != null && tgg != null;
    const won = played ? (thg > tgg ? 1 : 0) : 0;
    const drawn = played ? (thg === tgg ? 1 : 0) : 0;
    const lost = played ? (thg < tgg ? 1 : 0) : 0;
    const gd = played ? thg - tgg : 0;
    const game = {
      home: thn,
      guest: tgn,
      homeGoals: thg,
      guestGoals: tgg,
      played,
      date: dateObject,
    };
    const th = buildTeam(
      thn,
      played ? 1 : 0,
      won,
      drawn,
      lost,
      gd,
      game,
      matchesByTeam[thn]
    );
    const tg = buildTeam(
      tgn,
      played ? 1 : 0,
      lost,
      drawn,
      won,
      gd * -1,
      game,
      matchesByTeam[tgn]
    );

    matchesByTeam[thn] = th;
    matchesByTeam[tgn] = tg;
    i++;
  }
  return matchesByTeam;
};

export const teams = Object.values(buildData()).sort((t1, t2) => {
  return t2.points - t1.points;
});
