import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import Attachment from '@material-ui/icons/AttachFile';
import SortIcon from '@material-ui/icons/Sort';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import { last, sortBy, indexOf } from 'lodash';
import Table, {
  ESortOrder,
  ISortDescriptor,
} from '../../components/ui/Table/Table';
import { QuestPreviewDialog } from '../../components/QuestPreviewDialog/QuestPreviewDialog';
import Button from '@material-ui/core/Button/Button';
import TableColumn from '../../components/Table/TableColumn';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { Subheader } from 'material-ui';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import { useCurrentUser } from '@hox/frontend-utils/hooks/useCurrentUser';
import { QuestSendingModal } from './QuestSendingModal';
import { GetQuestTemplateListQuery } from './__generated__/GetQuestTemplatesQuery.generated';

const sortRows = (
  rows: GetQuestTemplateListQuery['questTemplates'],
  sortType?: ISortDescriptor
) => {
  if (sortType) {
    const sortedRows: GetQuestTemplateListQuery['questTemplates'] = sortBy(
      rows,
      sortType.key
    );
    const sortedValues: GetQuestTemplateListQuery['questTemplates'] =
      sortType.order === ESortOrder.DESC ? sortedRows.reverse() : sortedRows;
    return { sortType, sortedValues };
  } else {
    return {
      sortedValues: sortBy(rows, 'createdAt').reverse(),
      sortType: {
        key: 'createdAt',
        order: ESortOrder.DESC,
      },
    };
  }
};

const filterActiveRows = (rows: GetQuestTemplateListQuery['questTemplates']) =>
  rows.filter(row => row.isActive);

// This component is super slow for SUPER_ADMINS because the quest-list is too heavy
// For useability's sake we should explore ways to load slightly less questTemplates at once

export const SortableQuestTemplateTable: React.FC<{
  templates: GetQuestTemplateListQuery['questTemplates'];
  style: any;
}> = ({ templates, style }) => {
  const [tagToSend, setTagToSend] = useState(null);

  const sortedQuestTemplateList = useMemo(
    () => sortBy(templates, 'createdAt'),
    [templates]
  );

  const defaultQuestTemplateList = useMemo(
    () => sortedQuestTemplateList.filter(qt => !qt.softDeletedAt),
    [sortedQuestTemplateList]
  );
  const [sort, setSort] = useState<{
    sortType: ISortDescriptor;
    sortedValues: GetQuestTemplateListQuery['questTemplates'];
  }>({
    sortType: {
      key: 'createdAt',
      order: ESortOrder.ASC,
    },
    sortedValues: defaultQuestTemplateList,
  });

  const setSortedRows = (sortType?: ISortDescriptor) =>
    setSort(sortRows(sort.sortedValues, sortType));

  const setActiveRows = (showActive: boolean) => {
    setSort(
      sortRows(
        showActive
          ? filterActiveRows(sort.sortedValues)
          : defaultQuestTemplateList,
        sort.sortType
      )
    );
  };
  const showDeletedQuestTemplates = (showDeleted: boolean) => {
    setSort(
      sortRows(
        showDeleted
          ? templates.filter(qt => qt.softDeletedAt)
          : defaultQuestTemplateList,
        sort.sortType
      )
    );
  };

  const { isSuperAdmin } = useCurrentUser();

  return (
    <div>
      {tagToSend && (
        <QuestSendingModal
          questTag={tagToSend}
          onClose={() => setTagToSend(null)}
        />
      )}
      <div className={style.classes.sortContainer}>
        <Button
          variant="text"
          color="secondary"
          data-test-id="sort-latest-button"
          onClick={() => setSortedRows()}
        >
          <SortIcon className={style.classes.addButtonIcon} />
          Sort by latest
        </Button>
        {isSuperAdmin && (
          <FormControlLabel
            control={
              <Checkbox onChange={(e, isChecked) => setActiveRows(isChecked)} />
            }
            label="Show active only"
          />
        )}
        {isSuperAdmin && (
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e, isChecked) =>
                  showDeletedQuestTemplates(isChecked)
                }
              />
            }
            label="Show deleted"
          />
        )}
      </div>
      <Subheader>Visible templates: {sort.sortedValues.length}</Subheader>
      <Table
        rows={sort.sortedValues}
        padding="default"
        className={style.classes.table}
        currentSort={sort.sortType}
        onSort={newSort => setSortedRows(newSort)}
      >
        <TableColumn
          header="Preview quest"
          rowProps={{
            colSpan: 1,
            className: style.classes.tagCell,
          }}
        >
          {({ row: qt }) => <QuestPreviewDialog tag={qt.tag} />}
        </TableColumn>
        <TableColumn header="#">
          {({ row: qt }) => indexOf(sort.sortedValues, qt) + 1}
        </TableColumn>
        <TableColumn
          header="Tag"
          rowProps={{
            colSpan: 2,
            className: style.classes.tagCell,
          }}
          sortKey="tag"
        >
          {({ row: qt }) => last(qt.tag.split('hox.quest.'))}
        </TableColumn>
        <TableColumn
          header="Subject"
          rowProps={{ colSpan: 3 }}
          sortKey="emailTemplate.email.subject"
        >
          {({ row: qt }) => qt.emailTemplate.email.subject}
        </TableColumn>
        <TableColumn header="Tags" rowProps={{ colSpan: 4 }}>
          {({ row: qt }) => (
            <div className={style.classes.tagsContainer}>
              {qt.tags.map(({ name, categoryName }) => (
                <Chip
                  key={`${categoryName}: ${name}`}
                  label={`${categoryName}: ${name}`}
                  className={style.classes.tagItem}
                />
              ))}
            </div>
          )}
        </TableColumn>
        <TableColumn
          rowProps={{ align: 'right' }}
          header="Attachments"
          headerProps={{ align: 'left' }}
          sortKey="emailTemplate.email.attachments[0].filename"
        >
          {({ row: qt }) => {
            const attachmentCount = qt.emailTemplate.email.attachments.length;
            return (
              attachmentCount && (
                <div
                  className={style.classes.attachmentContainer}
                  data-test-id="attachments-count"
                >
                  <span>{attachmentCount}</span>
                  <Attachment className={style.classes.attachmentIcon} />
                </div>
              )
            );
          }}
        </TableColumn>
        <TableColumn header="Lang" sortKey="attributes.language">
          {({ row: qt }) =>
            qt.attributes.language == null
              ? 'multilingual'
              : qt.attributes.language
          }
        </TableColumn>
        <TableColumn header="Active">
          {({ row: qt }) =>
            qt.softDeletedAt ? (
              <DeleteOutline color="error" />
            ) : qt.isActive ? (
              <Check color="secondary" />
            ) : (
              <Clear color="error" />
            )
          }
        </TableColumn>
        <TableColumn header="Send to me">
          {({ row: qt }) => (
            <IconButton onClick={() => setTagToSend(qt.tag)}>
              <EmailIcon />
            </IconButton>
          )}
        </TableColumn>
        {isSuperAdmin && (
          <TableColumn header="Edit">
            {({ row: qt }) => (
              <Link to={`/questTemplates/${qt._id}`}>
                <IconButton>
                  <Edit />
                </IconButton>
              </Link>
            )}
          </TableColumn>
        )}
      </Table>
    </div>
  );
};
