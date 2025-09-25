import {
  NextRequest,
  NextResponse,
} from 'next/server';

import Personalize from '@contentstack/personalize-edge-sdk';

export default async function middleware(req: NextRequest) {
  const projectUid = process.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_PROJECT_UID as string;

  if (process.env.USE_NEXT_MIDDLEWARE !== 'true' || !projectUid) {
    return NextResponse.next();
  }

  // Set a custom edge API URL if specified
  if (process.env.CONTENTSTACK_PERSONALIZE_EDGE_API_URL) {
    Personalize.setEdgeApiUrl(process.env.CONTENTSTACK_PERSONALIZE_EDGE_API_URL);
  }
  
  // Initialize the SDK and pass the request as well
  const personalizeSdk = await Personalize.init(projectUid, {
    request: req,
  });
  
  // Get the variant parameter from the SDK
  const variantParam = personalizeSdk.getVariantParam();
  const parsedUrl = new URL(req.url);
  
  // Set the variant parameter as a query param in the URL
  parsedUrl.searchParams.set(personalizeSdk.VARIANT_QUERY_PARAM, variantParam);
  
  // Rewrite the request with the modified URL
  const response = NextResponse.rewrite(parsedUrl);
  
  // Add cookies to the response
  personalizeSdk.addStateToResponse(response);
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
