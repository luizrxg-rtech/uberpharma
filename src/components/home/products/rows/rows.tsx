import {CUSTOM_LINE, PRODUCTS_PER_ROW} from "@/components/home/products/products";
import Row from "@/components/home/products/rows/row";
import {Product} from "@/types/product/types";
import { repeat } from "@/utils/repeat";
import {LinesFilterOptions} from "@/types/misc/types";

interface RowsProps {
  lines: string[];
  products: Product[] | undefined;
  loading: boolean;
  filterOptions: LinesFilterOptions;
  applyFilters(products: Product[]): Product[];
  handleClickLine(line: string): void;
}

export default function Rows({
  lines,
  products,
  loading,
  filterOptions,
  applyFilters,
  handleClickLine
}: RowsProps) {

  if (loading) {
    return <> {
      repeat(4).map((_, index) => (
        <Row
          key={index}
          line="Carregando..."
          products={undefined}
          loading={loading}
          handleClickLine={() => {}}
        />
      ))
    } </>
  }

  return <>
    {lines.map((line, index) => {
      let lineProducts = products || [];

      if (line === CUSTOM_LINE) {
        lineProducts = applyFilters(lineProducts);
        if (filterOptions.sortBy === 'name') {
          lineProducts.sort((a, b) => b.stock - a.stock);
        }
      } else {
        lineProducts = lineProducts.filter(product => product.line === line);
        lineProducts = applyFilters(lineProducts);
      }

      const processedProducts = lineProducts.slice(0, PRODUCTS_PER_ROW);

      if (processedProducts.length === 0) {
        return null;
      }

      return (
        <Row
          key={index}
          line={line}
          products={processedProducts}
          loading={loading}
          handleClickLine={() => handleClickLine(line)}
        />
      )
    })}
  </>
}