'use strict';/**
 * JS version of browser APIs. This library can only run in the browser.
 */
var win = window;
exports.window = win;
exports.document = window.document;
exports.location = window.location;
exports.gc = window['gc'] ? function () { return window['gc'](); } : function () { return null; };
exports.performance = window['performance'] ? window['performance'] : null;
exports.Event = window['Event'];
exports.MouseEvent = window['MouseEvent'];
exports.KeyboardEvent = window['KeyboardEvent'];
exports.EventTarget = window['EventTarget'];
exports.History = window['History'];
exports.Location = window['Location'];
exports.EventListener = window['EventListener'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtTHZaTGVBOHYudG1wL2FuZ3VsYXIyL3NyYy9mYWNhZGUvYnJvd3Nlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRztBQUNILElBQUksR0FBRyxHQUFHLE1BQU07QUFFRCxjQUFNLE9BRko7QUFHTixnQkFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7QUFDM0IsZ0JBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO0FBQzNCLFVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsY0FBTSxPQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFkLENBQWMsR0FBRyxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQztBQUN0RCxtQkFBVyxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ2pFLGFBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDeEIsa0JBQVUsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDbEMscUJBQWEsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDeEMsbUJBQVcsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDcEMsZUFBTyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM1QixnQkFBUSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM5QixxQkFBYSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogSlMgdmVyc2lvbiBvZiBicm93c2VyIEFQSXMuIFRoaXMgbGlicmFyeSBjYW4gb25seSBydW4gaW4gdGhlIGJyb3dzZXIuXG4gKi9cbnZhciB3aW4gPSB3aW5kb3c7XG5cbmV4cG9ydCB7d2luIGFzIHdpbmRvd307XG5leHBvcnQgdmFyIGRvY3VtZW50ID0gd2luZG93LmRvY3VtZW50O1xuZXhwb3J0IHZhciBsb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbjtcbmV4cG9ydCB2YXIgZ2MgPSB3aW5kb3dbJ2djJ10gPyAoKSA9PiB3aW5kb3dbJ2djJ10oKSA6ICgpID0+IG51bGw7XG5leHBvcnQgdmFyIHBlcmZvcm1hbmNlID0gd2luZG93WydwZXJmb3JtYW5jZSddID8gd2luZG93WydwZXJmb3JtYW5jZSddIDogbnVsbDtcbmV4cG9ydCBjb25zdCBFdmVudCA9IHdpbmRvd1snRXZlbnQnXTtcbmV4cG9ydCBjb25zdCBNb3VzZUV2ZW50ID0gd2luZG93WydNb3VzZUV2ZW50J107XG5leHBvcnQgY29uc3QgS2V5Ym9hcmRFdmVudCA9IHdpbmRvd1snS2V5Ym9hcmRFdmVudCddO1xuZXhwb3J0IGNvbnN0IEV2ZW50VGFyZ2V0ID0gd2luZG93WydFdmVudFRhcmdldCddO1xuZXhwb3J0IGNvbnN0IEhpc3RvcnkgPSB3aW5kb3dbJ0hpc3RvcnknXTtcbmV4cG9ydCBjb25zdCBMb2NhdGlvbiA9IHdpbmRvd1snTG9jYXRpb24nXTtcbmV4cG9ydCBjb25zdCBFdmVudExpc3RlbmVyID0gd2luZG93WydFdmVudExpc3RlbmVyJ107XG4iXX0=