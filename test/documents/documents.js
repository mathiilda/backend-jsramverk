process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

chai.should();

chai.use(chaiHttp);

describe('Documents', () => {
    describe('POST /docs/getSpecific', () => {
        it('right returns', (done) => {
            chai.request(server)
                .post("/docs/getSpecific")
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({id: "616e940b16a006be0e5b8174"})
                .end((err, res) => {
                    res.body.should.be.an("object");
                    
                    done();
                });
        });
    });

    describe('POST /docs/create', () => {
        it('right returns', (done) => {
            chai.request(server)
                .post("/docs/create")
                .send({title: "create", text:"create", userId:"6155c9304e2a89040dcc9050", mode:true})
                .end((err, res) => {
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("string");

                    done();
                });
        });
    });

    describe('PUT /docs/update', () => {
        it('right returns', (done) => {
            chai.request(server)
                .put("/docs/update")
                .send({id: "613f4f475201c044a9cf75c6", title: "update", text:"update"})
                .end((err, res) => {
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("string");
                    res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('PUT /docs/addUser', () => {
        it('right returns', (done) => {
            chai.request(server)
                .put("/docs/addUser")
                .send({id: "613f4f475201c044a9cf75c6", username:"test"})
                .end((err, res) => {
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("string");

                    setTimeout(done, 250);

                    // done();
                });
        });
    });
});