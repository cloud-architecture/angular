'use strict';var browser_static_1 = require('angular2/platform/testing/browser_static');
var browser_1 = require('angular2/platform/browser');
var lang_1 = require('angular2/src/facade/lang');
/**
 * Providers for using template cache to avoid actual XHR.
 * Re-exported here so that tests import from a single place.
 */
var browser_2 = require('angular2/platform/browser');
exports.CACHED_TEMPLATE_PROVIDER = browser_2.CACHED_TEMPLATE_PROVIDER;
/**
 * Default patform providers for testing.
 */
exports.TEST_BROWSER_PLATFORM_PROVIDERS = lang_1.CONST_EXPR([browser_static_1.TEST_BROWSER_STATIC_PLATFORM_PROVIDERS]);
/**
 * Default application providers for testing.
 */
exports.TEST_BROWSER_APPLICATION_PROVIDERS = lang_1.CONST_EXPR([browser_1.BROWSER_APP_PROVIDERS, browser_static_1.ADDITIONAL_TEST_BROWSER_PROVIDERS]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtdXhydDFvQWoudG1wL2FuZ3VsYXIyL3BsYXRmb3JtL3Rlc3RpbmcvYnJvd3Nlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFHTywwQ0FBMEMsQ0FBQyxDQUFBO0FBQ2xELHdCQUFvQywyQkFBMkIsQ0FBQyxDQUFBO0FBQ2hFLHFCQUF5QiwwQkFBMEIsQ0FBQyxDQUFBO0FBRXBEOzs7R0FHRztBQUNILHdCQUF1QywyQkFBMkIsQ0FBQztBQUEzRCxzRUFBMkQ7QUFFbkU7O0dBRUc7QUFDVSx1Q0FBK0IsR0FDeEMsaUJBQVUsQ0FBQyxDQUFDLHVEQUFzQyxDQUFDLENBQUMsQ0FBQztBQUV6RDs7R0FFRztBQUNVLDBDQUFrQyxHQUMzQyxpQkFBVSxDQUFDLENBQUMsK0JBQXFCLEVBQUUsa0RBQWlDLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgVEVTVF9CUk9XU0VSX1NUQVRJQ19QTEFURk9STV9QUk9WSURFUlMsXG4gIEFERElUSU9OQUxfVEVTVF9CUk9XU0VSX1BST1ZJREVSU1xufSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS90ZXN0aW5nL2Jyb3dzZXJfc3RhdGljJztcbmltcG9ydCB7QlJPV1NFUl9BUFBfUFJPVklERVJTfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9icm93c2VyJztcbmltcG9ydCB7Q09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuLyoqXG4gKiBQcm92aWRlcnMgZm9yIHVzaW5nIHRlbXBsYXRlIGNhY2hlIHRvIGF2b2lkIGFjdHVhbCBYSFIuXG4gKiBSZS1leHBvcnRlZCBoZXJlIHNvIHRoYXQgdGVzdHMgaW1wb3J0IGZyb20gYSBzaW5nbGUgcGxhY2UuXG4gKi9cbmV4cG9ydCB7Q0FDSEVEX1RFTVBMQVRFX1BST1ZJREVSfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9icm93c2VyJztcblxuLyoqXG4gKiBEZWZhdWx0IHBhdGZvcm0gcHJvdmlkZXJzIGZvciB0ZXN0aW5nLlxuICovXG5leHBvcnQgY29uc3QgVEVTVF9CUk9XU0VSX1BMQVRGT1JNX1BST1ZJREVSUzogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPVxuICAgIENPTlNUX0VYUFIoW1RFU1RfQlJPV1NFUl9TVEFUSUNfUExBVEZPUk1fUFJPVklERVJTXSk7XG5cbi8qKlxuICogRGVmYXVsdCBhcHBsaWNhdGlvbiBwcm92aWRlcnMgZm9yIHRlc3RpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBURVNUX0JST1dTRVJfQVBQTElDQVRJT05fUFJPVklERVJTOiBBcnJheTxhbnkgLypUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXSovPiA9XG4gICAgQ09OU1RfRVhQUihbQlJPV1NFUl9BUFBfUFJPVklERVJTLCBBRERJVElPTkFMX1RFU1RfQlJPV1NFUl9QUk9WSURFUlNdKTtcbiJdfQ==