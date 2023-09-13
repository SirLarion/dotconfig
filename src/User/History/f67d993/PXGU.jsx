import React, { Component } from 'react';
import PropTypes from '../../utils/propTypes';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter,
} from 'material-ui/Table';
import SortIcon from 'material-ui/svg-icons/action/swap-vert';
import IconButton from 'material-ui/IconButton';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import { IconCommandMenu } from '../../components/CommandMenu/IconCommandMenu';
import { RelativeLoading } from '../../components/Loading';

import {
  injectStyles,
  loading,
  compose,
} from '../../components/higherOrderComponents';

import { defaultTo, path, prop } from 'ramda';

const Styles = {
  container: {
    position: 'relative',
  },
  tableHeader: {
    height: 100,
    background: '#1d2028',
  },
  rowAlign: {
    display: 'flex',
    alignItems: 'center',
  },
  rowColumnActions: {
    padding: 0,
    width: '48px',
  },
  footerControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: '72px',
  },
  footerPrevPage: {
    padding: '12px 0px 12px 12px',
  },
  footerNextPage: {
    padding: '12px 12px 12px 0px',
  },
  sortIcon: {
    cursor: 'pointer',
    pathFill: '#9e9e9e !important',
    pathPointerEvents: 'none',
  },
};
export class SmartTableView extends Component {
  static propTypes = {
    tableHeaders: PropTypes.array,
    rowColumnActions: PropTypes.array,
    data: PropTypes.array,
    offset: PropTypes.number, // current offset
    total: PropTypes.number, // total number of rows
    limit: PropTypes.number, // num of rows in each page
    onPageClick: PropTypes.func, // what to do after clicking page number
    onRowClick: PropTypes.func,
    renderRowColumnItem: PropTypes.func, // How to render single item
    onRowSelection: PropTypes.func,
    selectedIds: PropTypes.array,
    onSort: PropTypes.func,
    isLoading: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
    styles: PropTypes.object.isRequired,
    rowIdField: PropTypes.string,
    selectable: PropTypes.bool,
    forwardedRef: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      isAsc: false,
      sortHeader: props.tableHeaders[0].dataAlias,
      muiTableRef: React.createRef(),
    };
    // note(Anssi): forwardedRef will be undefined if caller does not pass "ref" to <SmartTable>
    if (props.forwardedRef) {
      // eslint-disable-next-line no-param-reassign
      props.forwardedRef.current = {
        externalClearTableSelection: () => this.externalClearTableSelection(),
      };
    }
  }

  changeSort(selectedHeader) {
    const isAsc =
      this.state.sortHeader === selectedHeader ? !this.state.isAsc : true;

    this.props.onSort({ sortHeader: selectedHeader, isAsc });
    this.setState({
      sortHeader: selectedHeader,
      isAsc,
    });
  }

  onRowSelection = indices => {
    const getAllSelectedIds = data => data.map(d => d._id);
    const getClickedSelectedIds = data => indices.map(i => data[i]._id);

    switch (indices) {
      case 'all':
        return this.props.onRowSelection(getAllSelectedIds(this.props.data));
      case 'none':
        return this.props.onRowSelection([]);
      default:
        return this.props.onRowSelection(
          getClickedSelectedIds(this.props.data)
        );
    }
  };

  // note(Anssi): this is super ugly, but so is material ui
  externalClearTableSelection() {
    const dangerousMuiTableRef = path(['muiTableRef', 'current'], this.state);
    if (dangerousMuiTableRef) {
      const muiTableState = defaultTo({}, prop('state', dangerousMuiTableRef));
      if (muiTableState.allRowsSelected) {
        dangerousMuiTableRef.setState({ allRowsSelected: false });
      }
    }
  }

  renderRowColumnActionsHeader() {
    const { rowColumnActions, styles } = this.props;
    if (!rowColumnActions) {
      return null;
    }

    return (
      <TableHeaderColumn style={styles.rowColumnActions}>
        &nbsp;
      </TableHeaderColumn>
    );
  }

  renderRowColumnActions(row) {
    const { styles, rowColumnActions } = this.props;

    if (!rowColumnActions) {
      return null;
    }

    const finalActions = rowColumnActions
      .map(action => action(row))
      .filter(a => !!a);

    return (
      <TableRowColumn style={styles.rowColumnActions}>
        <IconCommandMenu commands={finalActions} />
      </TableRowColumn>
    );
  }

  render() {
    const {
      offset,
      limit,
      total,
      tableHeaders,
      data = [],
      styles,
      rowIdField = '_id',
      selectable,
      selectedIds = [],
      onPageClick = () => ({}),
      onRowClick = id => ({}),
    } = this.props;

    return (
      <Table
        multiSelectable={selectable}
        style={styles.container}
        selectable={selectable}
        onRowSelection={this.onRowSelection}
        onCellClick={row => {
          console.log(row);
          onRowClick(data[row][rowIdField]);
        }}
        ref={this.state.muiTableRef}
      >
        <TableHeader
          style={styles.tableHeader}
          enableSelectAll={selectable}
          displaySelectAll={selectable}
          adjustForCheckbox={selectable}
        >
          <TableRow>
            {!!tableHeaders &&
              tableHeaders.map(header => (
                <TableHeaderColumn key={header.alias}>
                  <div style={styles.rowAlign}>
                    {header.alias}
                    {header.sortable ? (
                      <IconButton
                        onClick={() => this.changeSort(header.dataAlias)}
                        iconStyle={styles.sortIcon}
                      >
                        <SortIcon />
                      </IconButton>
                    ) : null}
                  </div>
                </TableHeaderColumn>
              ))}
            {this.renderRowColumnActionsHeader()}
          </TableRow>
        </TableHeader>
        <TableBody
          deselectOnClickaway={false}
          displayRowCheckbox={selectable}
          showRowHover
        >
          {data.map(row => {
            return (
              <TableRow
                key={row[rowIdField]}
                selected={selectedIds.includes(row[rowIdField])}
              >
                {tableHeaders.map(header => (
                  <TableRowColumn
                    key={`${row[rowIdField]}-${header.dataAlias}`}
                  >
                    {this.props.renderRowColumnItem(row, header.dataAlias, {
                      styles,
                    })}
                  </TableRowColumn>
                ))}
                {this.renderRowColumnActions(row)}
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter adjustForCheckbox={selectable}>
          <TableRow>
            <TableRowColumn>
              <div style={styles.footerControls}>
                {`${Math.min(offset + 1, total)} - ${Math.min(
                  offset + limit,
                  total
                )} of ${total}`}
                <IconButton
                  disabled={offset === 0}
                  onClick={() => onPageClick(offset - limit)}
                  style={styles.footerPrevPage}
                >
                  <ChevronLeft />
                </IconButton>
                <IconButton
                  disabled={offset + limit >= total}
                  onClick={() => onPageClick(offset + limit)}
                  style={styles.footerNextPage}
                >
                  <ChevronRight />
                </IconButton>
              </div>
            </TableRowColumn>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
}

const withRef = ForwardedComponent =>
  // eslint-disable-next-line react/display-name
  React.forwardRef((props, ref) => (
    <ForwardedComponent {...props} forwardedRef={ref} />
  ));

/**
 * @type React.FC<any>
 */
const SmartTable = compose(
  withRef,
  injectStyles(Styles),
  loading(({ styles }) => (
    <div style={styles.container}>
      <RelativeLoading />
    </div>
  ))
)(SmartTableView);

export default SmartTable;
