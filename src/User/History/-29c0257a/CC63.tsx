import React from 'react';
import get from 'lodash/get';
import { FormattedMessage } from 'react-intl';

import { TaskGroupProgressQuery } from '../../modules/TaskGroupProgress/TaskGroupProgressQuery';
import { GetTaskGroupProgressDocument } from './__generated__/GetTaskGroupProgress.generated';
import { FailableProgressBar } from '../../components/FailableProgressBar/FailableProgressBar';
import { PanelContent, PanelActions } from '../../components/ui/Panel/Panel';
import { Body1Text } from '../../components/ui/Typography/Typography';
import { Button } from '../../components/ui/Button/Button';
import Table from '../../components/ui/Table/Table';
import TableColumn from '../../components/ui/Table/TableColumn';

interface ITaskGroupProgressProps<T> {
  taskHeader: React.ReactNode;
  rowHeaderMapper: (taskArgs: T) => React.ReactNode;
  taskGroupId: string;
  showErrors?: boolean;
  setShowErrors: (showErrors: boolean) => void;
  additionalColumns?: (taskSignature: string) => [React.ReactNode];
}

export class TaskGroupProgress<T> extends React.Component<
  ITaskGroupProgressProps<T>
> {
  public render() {
    const {
      taskHeader,
      rowHeaderMapper,
      taskGroupId,
      showErrors,
      setShowErrors,
      additionalColumns,
    } = this.props;

    return (
      <TaskGroupProgressQuery
        query={GetTaskGroupProgressDocument}
        variables={{
          taskGroupId,
          showErrors: showErrors || false,
        }}
        pollInterval={6000}
      >
        {({ data }) => {
          const {
            estimatedTotalTaskCount = 0,
            totalTaskCount = 0,
            successCount = 0,
            failureCount = 0,
            tasks = [],
          } = get(data, 'taskGroups.0', {});

          const totalCount =
            estimatedTotalTaskCount > totalTaskCount
              ? estimatedTotalTaskCount
              : totalTaskCount;

          if (!totalCount) {
            return null;
          }

          const rowMapper = ({ row }) => {
            return rowHeaderMapper(JSON.parse(row.args));
          };

          const successPercentage = (successCount / totalCount) * 100;
          const failurePercentage = (failureCount / totalCount) * 100;
          const completionPercentage = successPercentage + failurePercentage;

          return (
            <React.Fragment>
              <FailableProgressBar
                successPercentage={successPercentage}
                failurePercentage={failurePercentage}
              />
              <PanelContent>
                <Body1Text>
                  {successCount + failureCount} / {totalCount} (
                  {Math.floor(completionPercentage)}%)
                </Body1Text>
                <Body1Text paragraph>
                  <FormattedMessage
                    id="app.components.taskGroupProgress.failureCount"
                    defaultMessage="{failureCount, plural, =0 {No failures} one {# failure} other {# failures}}"
                    description="Displays a count of failed sub tasks alongside a progress bar"
                    values={{
                      failureCount,
                    }}
                  />
                </Body1Text>
              </PanelContent>

              {failureCount > 0 && (
                <PanelActions>
                  <Button
                    color={showErrors ? 'secondary' : 'primary'}
                    onClick={() => setShowErrors(!showErrors)}
                  >
                    {showErrors ? (
                      <FormattedMessage
                        id="app.components.taskGroupProgress.hideErrors"
                        defaultMessage="Hide errors"
                        description="A toggle button that hides a list of errors in a process"
                      />
                    ) : (
                      <FormattedMessage
                        id="app.components.taskGroupProgress.showErrors"
                        defaultMessage="Show errors"
                        description="A toggle button that shows a list of errors in a process"
                      />
                    )}
                  </Button>
                </PanelActions>
              )}

              {showErrors && (
                <React.Fragment>
                  <PanelContent>
                    <Table rows={tasks}>
                      <TableColumn header={taskHeader}>{rowMapper}</TableColumn>
                      <TableColumn
                        header={
                          <FormattedMessage
                            id="app.components.taskGroupProgress.errors.message"
                            defaultMessage="Error message"
                            description="Header for a table column that shows error messages"
                          />
                        }
                        dataKey="errorMessage"
                      />
                      {additionalColumns &&
                        additionalColumns(get(tasks, '0.signature', undefined))}
                    </Table>
                  </PanelContent>
                </React.Fragment>
              )}
            </React.Fragment>
          );
        }}
      </TaskGroupProgressQuery>
    );
  }
}
