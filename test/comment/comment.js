process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

chai.should();

chai.use(chaiHttp);

describe('Comment', () => {
    describe('POST /comment/create', () => {
        it('right returns', (done) => {
            chai.request(server)
                .post("/comment/create")
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({text: 'test'})
                .end((err, res) => {
                    res.body.should.be.an("object");
                    res.body.id.should.be.an("string");

                    done();
                });
        });
    });

    describe('POST /comment/getSpecific', () => {
        it('right returns', (done) => {
            chai.request(server)
                .post("/comment/getSpecific")
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({id: '616eec557d5e9383f536e2f5'})
                .end((err, res) => {
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");

                    done();
                });
        });
    });
});