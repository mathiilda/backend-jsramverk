process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

describe('Documents', () => {
    describe('GET /docs/:id', () => {
        it('id that does not exist', (done) => {
            chai.request(server)
                .get("/docs/613f4702fe0f465")
                .end((err, res) => {
                    res.body.should.be.an("object");
                    res.body.error.should.be.an("object");

                    done();
                });
        });
    });

    describe('GET /docs/create', () => {
        it('all fields not included in POST', (done) => {
            chai.request(server)
                .post("/docs/create")
                .send({text:"create"})
                .end((err, res) => {
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("string");
                    res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('GET /docs/create', () => {
        it('all fields not included in PUT', (done) => {
            chai.request(server)
                .put("/docs/update")
                .send({id: "613f4f475201c044a9cf75c6", title: "update"})
                .end((err, res) => {
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("string");
                    res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });
});