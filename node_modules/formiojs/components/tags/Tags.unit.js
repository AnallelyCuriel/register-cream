"use strict";

require("core-js/modules/es.string.trim.js");

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Tags = _interopRequireDefault(require("./Tags"));

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _modalTagsComponent = _interopRequireDefault(require("../../../test/formtest/modalTagsComponent"));

var _fixtures = require("./fixtures");

var _Formio = _interopRequireDefault(require("../../Formio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Tags Component', function () {
  it('Should build a tags component', function () {
    return _harness.default.testCreate(_Tags.default, _fixtures.comp1);
  });
  it('Should not allow to add non-unique tags on blur', function (done) {
    _harness.default.testCreate(_Tags.default, _fixtures.comp2).then(function (component) {
      var values = ['test', 'test1', 'test'];

      _harness.default.setTagsValue(values, component);

      _powerAssert.default.equal(component.choices.getValue(true).length, 2);

      done();
    }).catch(done);
  });
  it('Should not exceed maxTags limit', function (done) {
    _harness.default.testCreate(_Tags.default, _fixtures.comp2).then(function (component) {
      var values = ['1', '2', '3', '4', '5'];

      _harness.default.setTagsValue(values, component);

      _powerAssert.default.equal(component.choices.getValue(true).length, 4);

      done();
    }).catch(done);
  });
  it('Check getValueAsString', function (done) {
    var element = document.createElement('div');

    _Formio.default.createForm(element, _modalTagsComponent.default).then(function (form) {
      var component = form.getComponent(['tags']);
      var modalWindow = component.componentModal.refs.modalContents;

      _harness.default.setTagsValue(['test', 'test1', 'test2'], component);

      _harness.default.dispatchEvent('click', modalWindow, '[ref="modalSave"]');

      setTimeout(function () {
        var modalPreview = component.element.querySelector('[ref="openModal"]');

        _powerAssert.default.equal(modalPreview.textContent.trim(), 'test, test1, test2', 'All tags should be rendered inside Modal Preview');

        form.destroy();
        done();
      }, 150);
    }).catch(done);
  });
});