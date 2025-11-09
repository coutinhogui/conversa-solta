import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  locales: ['en', 'pt'],
  defaultLocale: 'en'
});
 
export const config = {
  // A list of all locales that are supported
  locales: ['en', 'pt'],
 
  // Used when no locale matches
  defaultLocale: 'en',
  
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ['/((?!api|_next|.*\\..*).*)']
};