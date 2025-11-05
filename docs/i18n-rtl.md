# i18n & RTL Quickstart

- Strings live inside `apps/web/src/lib/i18n.ts`.
- Dispatch `setLocale('he')` to enable RTL mode; the layout automatically flips via `document.documentElement.dir`.
- Wrap new UI in logical order; avoid absolute positioning that breaks under RTL.
- Use `Intl.NumberFormat` and `Intl.DateTimeFormat` for localized numeric output.
