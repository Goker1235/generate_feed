import { create } from "xmlbuilder2";
import products from "@/mocks/products.json";

export function buildFeed() {
  const root = {
    
    catalog: {
      product: products.map((p) => ({
        id: p.id,
        url: p.url,
        name: { $: { cdata: true }, _: p.name },
        description: p.description
          ? { $: { cdata: true }, _: p.description }
          : null,
        price: {
          "@currency": p.currencyId,
          "#": p.price
        },
        oldPrice: p.oldPrice ?? undefined,
        available: p.available,
        images: p.picture.length
          ? { image: p.picture }
          : undefined,
        characteristics: Object.keys(p.characteristics).length
          ? {
              item: Object.entries(p.characteristics).map(([key, value]) => ({
                "@name": key,
                "#": value
              }))
            }
          : undefined
      }))
    }
  };

  return create(root).end({ prettyPrint: true });
}
