"use strict";

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _DateTime = _interopRequireDefault(require("./DateTime"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('DateTime Component', function () {
  it('Should build a date time component', function () {
    return _harness.default.testCreate(_DateTime.default, _fixtures.comp1).then(function (dateTime) {
      return dateTime.destroy();
    });
  });
  it('Test formatting', function (done) {
    _harness.default.testCreate(_DateTime.default, _fixtures.comp2).then(function (dateTime) {
      var value = '2020-09-22T00:00:00';
      var formattedValue = '2020-09-22';
      dateTime.setValue(value);
      setTimeout(function () {
        _powerAssert.default.equal(dateTime.getValueAsString(value), formattedValue, 'getValueAsString should return formatted value');

        dateTime.destroy();
        done();
      }, 250);
    }).catch(done);
  });
  it('Should format value', function () {
    _fixtures.comp2.format = 'yyyy-MM-dd hh:mm a';
    return _harness.default.testCreate(_DateTime.default, _fixtures.comp2).then(function (dateTime) {
      _powerAssert.default.equal(dateTime.getValueAsString('2020-09-18T12:12:00'), '2020-09-18 12:12 PM');

      dateTime.destroy();
    });
  }); // it('Test Shortcut Buttons', (done) => {
  //   // eslint-disable-next-line no-debugger
  //   debugger;
  //   window.flatpickr = Flatpickr;
  //   window.ShortcutButtonsPlugin = ShortcutButtonsPlugin;
  //   const formElement = document.createElement('div');
  //   const form = new Webform(formElement);
  //   form.setForm({ display: 'form', type: 'form', components: [comp2] })
  //     .then(() => {
  //       const dateTime = form.components[0];
  //       const buttonsWrappers = document.querySelectorAll('.shortcut-buttons-flatpickr-wrapper');
  //       const shortcutButtons = buttonsWrappers[buttonsWrappers.length - 1].querySelectorAll('.shortcut-buttons-flatpickr-button');
  //       assert.equal(shortcutButtons.length, 1);
  //       const input = dateTime.refs.input[0];
  //       Harness.clickElement(dateTime, shortcutButtons[0]);
  //       setTimeout(() => {
  //         input.widget.calendar.close();
  //         setTimeout(() => {
  //           assert.equal(form.data.date, '2020-10-10T00:00:00+00:00');
  //           dateTime.destroy();
  //           done();
  //         }, 250);
  //       }, 150);
  //     }).catch(done);
  // });
});