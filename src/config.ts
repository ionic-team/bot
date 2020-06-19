import * as yaml from 'js-yaml';

import { GitHubClient, getFileFromRepo } from './client';
import type { RemoveLabelTask } from './tasks/remove-label';
import type { AddPlatformLabelsTask } from './tasks/add-platform-labels';
import type { AddContributorsTask } from './tasks/add-contributors';

export interface TriggerObject {
  [key: string]:
    | {
        types: string[];
      }
    | null
    | undefined;
}

export type Trigger = string | string[] | TriggerObject;

export interface Task<N, C> {
  name: N;
  on: Trigger;
  config: C;
}

export type AnyTask =
  | RemoveLabelTask
  | AddPlatformLabelsTask
  | AddContributorsTask;

export interface Config {
  readonly tasks: readonly AnyTask[];
}

export const getConfig = async (
  client: GitHubClient,
  configPath: string,
): Promise<Config> => {
  const contents = await getFileFromRepo(client, configPath);
  const config = yaml.safeLoad(contents);

  // TODO: check config structure

  return config;
};
