(function () {
    "use strict";

    var _ = require("underscore");

    var sqlValueType = function (value) {
        return _.isString(value) ? "'" + value + "'" : value;
    };

    var SelectSentence = function (columns) {
        this.op = 'select';
        this._setColumns(columns);
    };

    SelectSentence.prototype = {
        _setColumns : function (columns) {
            if (_.isUndefined(columns)) {
                this.columns = "*";
            } else {
                if (_.isArray(columns)) {
                    this.columns = columns.join(", ");
                } else {
                    this.columns = columns;
                }
            }
        },

        from : function (table) {
            this.table = table;
            return this;
        },

        build : function () {
            return "select " + this.columns + " from " + this.table;
        }
    };

    var DeleteSentence = function () {
    };

    DeleteSentence.prototype = {
        from : function (table) {
            this.table = table;
            return this;
        },

        build : function () {
            return "delete from " + this.table;
        }
    };

    var InsertSentence = function (table) {
        this.table = table;
        this.op = 'insert';
        return this;
    };

    InsertSentence.prototype = {

        _typedValues : function (values) {
            return _.map(values, sqlValueType);
        },

        _parenthesis : function (array) {
            return "(" + array.join(", ") + ")";
        },

        values : function (values) {
            this.insertColumns = this._parenthesis(_.keys(values));
            this.insertValues = this._parenthesis(this._typedValues(_.values(values)));
            return this;
        },

        build : function () {
            return "insert into " + this.table + " " + this.insertColumns + " values " + this.insertValues;
        }
    };

    var UpdateSentence = function (table) {
        this.table = table;
    };

    UpdateSentence.prototype = {
        set : function (values) {
            this.setValues = _.map(values,function (value, key) {
                return key + "=" + sqlValueType(value);
            }).join(", ");
            return this;
        },

        build : function () {
            return "update " + this.table + " set " + this.setValues;
        }
    };

    var SqlGenerator = function () {
    };

    SqlGenerator.prototype = {
        select : function (columns) {
            return new SelectSentence(columns);
        },

        delete : function () {
            return new DeleteSentence();
        },

        insert : function (table) {
            return new InsertSentence(table);
        },

        update : function (table) {
            return new UpdateSentence(table);
        }
    };

    module.exports = SqlGenerator;
}());

