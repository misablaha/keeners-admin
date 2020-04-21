import React, { cloneElement, FC, useMemo } from 'react';
import PropTypes from 'prop-types';
import { CreateButton, ExportButton, TopToolbar } from 'react-admin';
import { sanitizeListRestProps } from 'ra-core';
import { AnyObject } from '../types/core';

interface ListActionsProps {
  basePath: string;
  className: string;
  currentSort: AnyObject;
  displayedFilters: AnyObject;
  exporter: boolean | Function;
  filterValues: AnyObject;
  filters: React.ReactElement;
  hasCreate: boolean;
  maxResults: number;
  onUnselectItems: Function;
  permanentFilter: AnyObject;
  resource: string;
  selectedIds: Array<string | number>;
  showFilter: Function;
  total: number;
}

const ListActions: FC<Partial<ListActionsProps>> = ({
  basePath,
  className,
  currentSort,
  displayedFilters,
  exporter,
  filterValues,
  filters,
  hasCreate,
  maxResults,
  onUnselectItems,
  permanentFilter,
  resource,
  selectedIds,
  showFilter,
  total,
  ...rest
}) =>
  useMemo(
    () => (
      <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
        {filters &&
          cloneElement(filters, {
            resource,
            showFilter,
            displayedFilters,
            filterValues,
            context: 'button',
          })}
        {hasCreate && <CreateButton basePath={basePath} />}
        {exporter !== false && (
          <ExportButton
            disabled={total === 0}
            resource={resource}
            sort={currentSort}
            filter={{ ...filterValues, ...permanentFilter }}
            maxResults={maxResults}
            exporter={exporter}
          />
        )}
      </TopToolbar>
    ),
    [resource, displayedFilters, filterValues, selectedIds, filters, total], // eslint-disable-line react-hooks/exhaustive-deps
  );

ListActions.propTypes = {
  basePath: PropTypes.string,
  className: PropTypes.string,
  currentSort: PropTypes.object,
  displayedFilters: PropTypes.object,
  exporter: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  filters: PropTypes.element,
  filterValues: PropTypes.object,
  hasCreate: PropTypes.bool,
  resource: PropTypes.string,
  onUnselectItems: PropTypes.func.isRequired,
  selectedIds: PropTypes.arrayOf(PropTypes.any),
  showFilter: PropTypes.func,
  total: PropTypes.number,
};

ListActions.defaultProps = {
  selectedIds: [],
  onUnselectItems: () => null,
};

export default ListActions;
