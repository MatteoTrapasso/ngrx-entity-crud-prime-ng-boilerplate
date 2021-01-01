import {createFeatureSelector, MemoizedSelector} from '@ngrx/store';

import {adapter, State} from './state';
import {Names} from './names';
import {childEntity, rootEntity} from 'ngrx-entity-relationship';
import {UserStoreSelectors} from '@root-store/user-store';

export const selectState: MemoizedSelector<object, State> = createFeatureSelector<State>(Names.NAME);
export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
    selectItemSelected,
    selectItemsSelected,
    selectLastCriteria,
    selectError,
    selectIsLoading,
    selectIsLoaded,
    selectFilters,
    selectFilteredItems
} = adapter.getCrudSelectors(selectState);

const companyWithEmployees = rootEntity(
  selectState,
  childEntity( // childEntity searches for suitable users based on companyId == company.id.
    UserStoreSelectors.selectState,
    'companyId',
    'staff',
  ),
);