import { Grid2, Typography } from '@mui/material';
import { useEffect } from 'react';
import AppPagination from '../../app/shared/components/AppPagination';
import { useAppDispatch, useAppSelector } from '../../app/store/store';
import { useLazyFetchFiltersQuery, useLazyFetchProductsQuery } from './catalogApi';
import { setPageNumber } from './catalogSlice';
import Filters from './Filters';
import ProductList from './ProductList';

export default function Catalog() {
  const productParams = useAppSelector((state) => state.catalog);
  const [triggerFetchProducts, { data, isLoading: productsLoading }] = useLazyFetchProductsQuery();
  const [triggerFetchFilters, { data: filtersData, isLoading: filtersLoading }] =
    useLazyFetchFiltersQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    triggerFetchProducts(productParams);
    triggerFetchFilters();
  }, [triggerFetchFilters, triggerFetchProducts, productParams]);

  if (productsLoading || filtersLoading || !data || !filtersData) return <div>Loading...</div>;

  return (
    <Grid2 container spacing={4}>
      <Grid2 size={3}>
        <Filters data={filtersData} />
      </Grid2>
      <Grid2 size={9}>
        {data.items && data.items.length > 0 ? (
          <>
            <ProductList products={data.items} />
            <AppPagination
              metadata={data.pagination}
              onPageChange={(page: number) => {
                dispatch(setPageNumber(page));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </>
        ) : (
          <Typography variant="h5">There are no results for this filter</Typography>
        )}
      </Grid2>
    </Grid2>
  );
}
