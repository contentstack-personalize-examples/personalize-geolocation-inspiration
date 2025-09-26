import { headers } from 'next/headers';

import { BestSellers } from '@/components/BestSellers';
import { Header } from '@/components/Header';
import { HeroBanner } from '@/components/HeroBanner';
import { ImpressionTracker } from '@/components/ImpressionTracker';
import {
  getPage,
  stack,
} from '@/lib/contentstack';
import Personalize from '@contentstack/personalize-edge-sdk';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  await headers();
  const resolvedSearchParams = await searchParams;
  const { live_preview, entry_uid, content_type_uid } = resolvedSearchParams;

  if (live_preview) {
    stack.livePreviewQuery({
      live_preview,
      contentTypeUid: content_type_uid || "",
      entryUid: entry_uid || "",
    });
  }

  // Get the variant parameter from the search params
  const variantParam = resolvedSearchParams[Personalize.VARIANT_QUERY_PARAM];
  
  const page = await getPage("/", 'home_page', ['header', 'best_sellers.best_selling_products'], variantParam);

  const variantAliases = page?.publish_details?.variants? Object.values(page.publish_details.variants).map((v) => v.alias) : [];

  // Extract header data from the page
  const headerData = page?.header?.[0];

  return (
    <ImpressionTracker variantAliases={variantAliases}>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <Header header={headerData} />

        {/* Hero Banner - Full width, no margins */}
        <HeroBanner banner={page?.banner} />

        {/* Best Sellers - With margins */}
        <BestSellers bestSellers={page?.best_sellers} />

        {/* Live Preview Debug Info */}
        {live_preview && (
          <div className="bg-yellow-100 p-4 text-sm">
            <h3 className="font-bold mb-2">Live Preview Debug Info:</h3>
            <ul className="space-y-1">
              <li>live_preview_hash: <code>{live_preview}</code></li>
              <li>content_type_uid: <code>{content_type_uid}</code></li>
              <li>entry_uid: <code>{entry_uid}</code></li>
              <li>page_title: <code>{page?.title}</code></li>
              <li>best_sellers_heading: <code>{page?.best_sellers?.section_heading}</code></li>
            </ul>
          </div>
        )}
      </div>
    </ImpressionTracker>
  );
}
