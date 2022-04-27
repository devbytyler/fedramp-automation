import {
  getXSpecScenarioSummaries,
  ScenarioSummary,
  XSpec,
} from '../domain/xspec';
import type { FormatXml } from '@asap/shared/domain/xml';

type Context = {
  formatXml: FormatXml;
  getSspXspec: () => Promise<string>;
  parseXspec: (xspec: string) => XSpec;
  writeSummary: (data: string) => void;
};

export const createXSpecScenarioSummaryWriter = (ctx: Context) => async () => {
  const xspecString = await ctx.getSspXspec();
  const xspec = ctx.parseXspec(xspecString);
  return getXSpecScenarioSummaries(xspec, ctx.formatXml).then(scenarios => {
    ctx.writeSummary(JSON.stringify(scenarios));
  });
};
export type XSpecScenarioSummaryWriter = ReturnType<
  typeof createXSpecScenarioSummaryWriter
>;

export type GetXSpecScenarioSummaries = () => Promise<ScenarioSummary[]>;
