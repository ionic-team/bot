import * as core from '@actions/core';
import * as github from '@actions/github';

import type { GitHubClient } from '../client';
import type { Task } from '../config';

export interface AssignToProjectConfig {
  readonly 'column-id': number;
}

export type AssignToProjectTask = Task<
  'assign-to-project',
  AssignToProjectConfig
>;

const run = async (
  client: GitHubClient,
  { 'column-id': columnId }: AssignToProjectConfig,
): Promise<void> => {
  await client.projects.createCard({
    column_id: columnId,
    content_type: 'Issue',
    content_id: (github.context.payload.issue as any).id,
  });

  core.info(
    `added issue #${github.context.issue.number} to project column ${columnId}`,
  );
};

export default run;
