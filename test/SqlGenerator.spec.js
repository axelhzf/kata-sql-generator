var SqlGenerator = require('../src/SqlGenerator.js');

describe("SqlGenerator", function () {

    describe("should select", function () {

        it("*", function () {
            var result = new SqlGenerator().select().from('table1').build();
            expect(result).toEqual("select * from table1");
        });

        it("single column", function () {
            var result = new SqlGenerator().select("column1").from('table1').build();
            expect(result).toEqual("select column1 from table1");
        });

        it("multiple columns", function () {
            var result = new SqlGenerator().select(["column1", "column2"]).from('table1').build();
            expect(result).toEqual("select column1, column2 from table1");
        });

    });

    describe("should delete", function () {
        it("a table", function () {
            var result = new SqlGenerator().delete().from('table1').build();
            expect(result).toEqual("delete from table1");
        });
    });

    describe("should insert", function () {
        it("number values", function () {
            var values = { a : 1, b : 2, c : 3};
            var result = new SqlGenerator().insert("table1").values(values).build();
            expect(result).toEqual("insert into table1 (a, b, c) values (1, 2, 3)");
        });

        it("string values", function () {
            var values = { a : "A", b : "B", c : "C"};
            var result = new SqlGenerator().insert("table1").values(values).build();
            expect(result).toEqual("insert into table1 (a, b, c) values ('A', 'B', 'C')");
        });

        it("boolean values", function () {
            var values = { a : true, b : true, c : false};
            var result = new SqlGenerator().insert("table1").values(values).build();
            expect(result).toEqual("insert into table1 (a, b, c) values (true, true, false)");
        });

    });

    describe("should update", function () {
        it("set number values", function () {
            var values = { a : 1, b : 2, c : 3};
            var result = new SqlGenerator().update('table1').set(values).build();
            expect(result).toEqual("update table1 set a=1, b=2, c=3");
        });

        it("set string values", function () {
            var values = { a : "A", b : "B", c : "C"};
            var result = new SqlGenerator().update('table1').set(values).build();
            expect(result).toEqual("update table1 set a='A', b='B', c='C'");
        });

        it("set boolean values", function () {
            var values = { a : true, b : true, c : false};
            var result = new SqlGenerator().update("table1").set(values).build();
            expect(result).toEqual("update table1 set a=true, b=true, c=false");
        });

    });

});