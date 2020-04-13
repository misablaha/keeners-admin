import { CondOperator, RequestQueryBuilder } from '@nestjsx/crud-request';
import {
  CreateParams,
  CreateResult,
  DataProvider,
  DeleteManyParams,
  DeleteManyResult,
  DeleteParams,
  DeleteResult,
  fetchUtils,
  GetListParams,
  GetListResult,
  GetManyParams,
  GetManyReferenceParams,
  GetManyReferenceResult,
  GetManyResult,
  GetOneParams,
  GetOneResult,
  UpdateManyParams,
  UpdateManyResult,
  UpdateParams,
  UpdateResult,
} from 'ra-core';
import { QueryFilter, QuerySort } from '@nestjsx/crud-request/lib/types';

const composeFilter = (paramsFilter: any): QueryFilter[] => {
  if (paramsFilter === '' || (typeof paramsFilter.q !== 'undefined' && paramsFilter.q === '')) {
    paramsFilter = {};
  }

  const flatFilter = fetchUtils.flattenObject(paramsFilter);
  return Object.keys(flatFilter).map<QueryFilter>((key) => {
    const splitKey = key.split('||');
    const ops = (splitKey[1] ? splitKey[1] : CondOperator.CONTAINS) as CondOperator;
    let field = splitKey[0];

    if (field.indexOf('_') === 0 && field.indexOf('.') > -1) {
      field = field.split(/\.(.+)/)[1];
    }
    return { field, operator: ops, value: flatFilter[key] };
  });
};

export const fetchJsonSigned = (getTokenFn: () => Promise<string>): typeof fetchUtils.fetchJson => async (
  url: any,
  options: fetchUtils.Options = {},
) => {
  const token = await getTokenFn();
  options.user = {
    authenticated: true,
    token: `Bearer ${token}`,
  };
  return fetchUtils.fetchJson(url, options);
};

export default class NestJSCrudProvider implements DataProvider {
  constructor(private apiUrl: string, private httpClient: typeof fetchUtils.fetchJson = fetchUtils.fetchJson) {}

  create = async (resource: string, params: CreateParams): Promise<CreateResult> => {
    const response = await this.httpClient(`${this.apiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    });

    return { data: { ...response.json, ...params.data } };
  };

  delete = async (resource: string, params: DeleteParams): Promise<DeleteResult> => {
    const response = await this.httpClient(`${this.apiUrl}/${resource}/${params.id}`, {
      method: 'DELETE',
    });

    return { data: response.json };
  };

  deleteMany = async (resource: string, params: DeleteManyParams): Promise<DeleteManyResult> => {
    await Promise.all(params.ids.map((id) => this.delete(resource, { id })));

    return { data: params.ids };
  };

  getList = async (resource: string, params: GetListParams): Promise<GetListResult> => {
    const filter = composeFilter(params.filter);
    const query = RequestQueryBuilder.create({
      filter,
    })
      .setLimit(params.pagination.perPage)
      .setPage(params.pagination.page)
      .sortBy(params.sort as QuerySort)
      .setOffset((params.pagination.page - 1) * params.pagination.perPage)
      .query();

    const response = await this.httpClient(`${this.apiUrl}/${resource}?${query}`);

    return {
      data: response.json.data,
      total: response.json.total,
    };
  };

  getMany = async (resource: string, params: GetManyParams): Promise<GetManyResult> => {
    const query = RequestQueryBuilder.create()
      .setFilter({
        field: 'id',
        operator: CondOperator.IN,
        value: `${params.ids}`,
      })
      .query();

    const response = await this.httpClient(`${this.apiUrl}/${resource}?${query}`);

    return {
      data: response.json,
    };
  };

  getManyReference = async (resource: string, params: GetManyReferenceParams): Promise<GetManyReferenceResult> => {
    const filter = composeFilter(params.filter);
    filter.push({
      field: params.target,
      operator: CondOperator.EQUALS,
      value: params.id,
    });

    const query = RequestQueryBuilder.create({
      filter,
    })
      .setLimit(params.pagination.perPage)
      .sortBy(params.sort as QuerySort)
      .setOffset((params.pagination.page - 1) * params.pagination.perPage)
      .query();

    const response = await this.httpClient(`${this.apiUrl}/${resource}?${query}`);

    return {
      data: response.json.data,
      total: response.json.total,
    };
  };

  getOne = async (resource: string, params: GetOneParams): Promise<GetOneResult> => {
    const response = await this.httpClient(`${this.apiUrl}/${resource}/${params.id}`);
    return {
      data: response.json,
    };
  };

  update = async (resource: string, params: UpdateParams): Promise<UpdateResult> => {
    const response = await this.httpClient(`${this.apiUrl}/${resource}/${params.id}`, {
      method: 'PATCH',
      body: JSON.stringify(params.data),
    });

    return {
      data: response.json,
    };
  };

  updateMany = async (resource: string, params: UpdateManyParams): Promise<UpdateManyResult> => {
    const responses = await Promise.all(
      params.ids.map((id) =>
        this.httpClient(`${this.apiUrl}/${resource}/${id}`, {
          method: 'PATCH',
          body: JSON.stringify(params.data),
        }),
      ),
    );

    return {
      data: responses.map((response) => response.json.id),
    };
  };
}
