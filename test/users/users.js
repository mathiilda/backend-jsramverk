process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

chai.should();

chai.use(chaiHttp);

describe('Users', () => {
    describe('POST /users/create', () => {
        it('right returns', (done) => {
            chai.request(server)
                .post("/users/create")
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({username: 'test', password: "pass"})
                .end((err, res) => {
                    res.body.should.be.an("object");
                    res.body.should.be.an("object");

                    done();
                });
        });
    });

    describe('POST /users/getSpecific', () => {
        it('right returns', (done) => {
            chai.request(server)
                .post("/users/getSpecific")
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({username: 'test'})
                .end((err, res) => {
                    res.body.should.be.an("object");
                    res.body.should.be.an("object");

                    done();
                });
        });
    });

    describe('POST /users/login', () => {
        it('right returns', (done) => {
            chai.request(server)
                .post("/users/login")
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({username: 'test', password: "pass"})
                .end((err, res) => {
                    res.body.should.be.an("object");
                    res.body.should.be.an("object");

                    done();
                });
        });
    });
});