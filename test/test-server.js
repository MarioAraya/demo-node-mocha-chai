process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/app');
var should = chai.should();

var Blob = require("../server/models/blob");

chai.use(chaiHttp);

describe('Blobs', function() {
    Blob.collection.drop();

    beforeEach(function(done){
        var newBlob = new Blob({
            name: 'Bat',
            lastName: 'man'
        });
        newBlob.save(function(err) {
            done();
        });
    });
    afterEach(function(done){
        Blob.collection.drop();
        done();
    });

    it('should list ALL blobs on /blobs GET', function(done){
        chai.request(server)
            .get('/blobs')
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('name');
                res.body[0].should.have.property('lastName');
                res.body[0].name.should.equal('Bat');
                res.body[0].lastName.should.equal('man');
                done();
            });
    });
    it('should list a SINGLE blob on /blob/<id> GET');
    it('should add a SINGLE blob on /blobs POST', function(done){
        chai.request(server)
            .post('/blobs')
            .send({'name': 'Java', 'lastName': 'Script'})
            .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('SUCCESS');
            res.body.SUCCESS.should.be.a('object');
            res.body.SUCCESS.should.have.property('name');
            res.body.SUCCESS.should.have.property('lastName');
            res.body.SUCCESS.should.have.property('_id');
            res.body.SUCCESS.name.should.equal('Java');
            res.body.SUCCESS.lastName.should.equal('Script');
            done();
        });

    });
    it('should update a SINGLE blob on /blob/<id> PUT');
    it('should delete a SINGLE blob on /blob/<id> DELETE');
})